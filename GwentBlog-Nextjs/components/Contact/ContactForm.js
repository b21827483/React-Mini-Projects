import {useEffect, useState} from "react";
import classes from './ContactForm.module.css';
import Status from "../UI/Status";

const sendContactInfo = async (contactObj) => {
    const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(contactObj),
        headers: {'Content-Type': 'application/json'}
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Could not send the message.');
    }
}

const ContactForm = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [reqStatus, setReqStatus] = useState('');
  const [resError, setReserror] = useState();

    useEffect(() => {
        if (reqStatus === 'Success' || reqStatus === 'Error') {
            const timer = setTimeout(() => {
                setReqStatus(null);
                setReserror(null);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [reqStatus]);

  const resetInputHandler = () => {
      setName('');
      setEmail('');
      setMessage('');
  }

  const inputHandler = event => {
      switch (event.target.id) {
          case 'name':
              setName(event.target.value);
              break;
          case 'email':
              setEmail(event.target.value);
              break;
          case 'message':
              setMessage(event.target.value);

      }
  }

  const submitFormHandler = async event => {
    event.preventDefault();

    setReqStatus('Loading');

    try {
        const contactObj = {
            name: name,
            email: email,
            message: message
        };
        await sendContactInfo(contactObj);
        setReqStatus('Success');
        resetInputHandler();

    } catch (err) {
        setReqStatus('Error');
        setReserror(err.message);
    }
  }

  let status;

    if (reqStatus === 'Loading') {
        status = {
            status: 'pending',
            title: 'Sending message...',
            message: 'Your message is on its way!',
        };
    }

    if (reqStatus === 'Success') {
        status = {
            status: 'success',
            title: 'Success!',
            message: 'Message sent successfully!',
        };
    }

    if (reqStatus === 'Error') {
        status = {
            status: 'error',
            title: 'Error!',
            message: resError,
        };
    }

  return (
    <section className={classes.section}>
      <h1>Contact Me</h1>
      <form className={classes.form} onSubmit={submitFormHandler}>
        <div className={classes.container}>
            <div className={classes.inputarea}>
              <label htmlFor='name'>Your Name</label>
              <input name='name' id='name' onChange={inputHandler} value={name} required />
            </div>
            <div className={classes.inputarea}>
              <label htmlFor='email'>Your E-mail</label>
              <input name='email' id='email' onChange={inputHandler} value={email} required />
            </div>
        </div>
        <div className={classes.container}>
            <div className={classes.inputarea}>
                <label htmlFor='message'>Your Message</label>
                <textarea name='message' id='message' onChange={inputHandler} value={message} required  rows='5' cols='48' />
            </div>
        </div>
        <div className={classes.buttonCont}>
          <button type='button' onClick={resetInputHandler}>Reset</button>
          <button>Send</button>
        </div>
      </form>
        {status && (
            <Status
                status={status.status}
                title={status.title}
                message={status.message}
            />
        )}
    </section>
  )
}

export default ContactForm;