import {useEffect, useState} from "react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/router";

import classes from './LoginSignupForm.module.css';
import Status from "../notifications/Status";

const createNewUser = async (credentials) => {
    const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message || 'Could not manage to create an account.');
    }

    return data;
}

const LoginSingupForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [reqStatus, setReqStatus] = useState();
    const [resError, setResError] = useState();

    const router = useRouter();

    useEffect(() => {
        if (reqStatus === 'Success' || reqStatus === 'Error') {
            const timer = setTimeout(() => {
                setReqStatus(null)
                setResError(null)}, 3000);

            return () => clearTimeout(timer);
        }

    }, [reqStatus]);

    const toggleLoginHandler = () => {
        setIsLogin((prevState) => !prevState);
    }

    const formSubmitHandler = async event => {
        event.preventDefault();
        setReqStatus('Loading');

        if (isLogin) {
            const res = await signIn('credentials', {
                email: email,
                password: password,
                redirect: false
            });

            if (res.error) {
                setReqStatus('Error');
                setResError(res.error)
            }

            if (!res.error) {
                setReqStatus('Success')
                await router.replace('/');
            }

        } else {
            try {
                await createNewUser({email: email, password: password});
                setReqStatus('Success');
            } catch (err) {
                setReqStatus('Error');
                setResError(err.message);
            }
        }
    };

    let status;

    if (reqStatus === 'Loading') {
        status = {
            title: 'Loading',
            message: 'Checking credentials.',
            status: 'loading'
        }
    }

    else if (reqStatus === 'Success') {
        status = {
            title: 'Success',
            message: isLogin ? 'Successfully logged in' : 'Successfully created account',
            status: 'success'
        }
    }

    else if (reqStatus === 'Error') {
        status = {
            title: 'Error',
            message: resError,
            status: 'error'
        }
    }

    return (
        <section className={classes.section}>
            <div>
                <h1>{isLogin ? 'Login' : 'Sign up'}</h1>
            </div>
            <form onSubmit={formSubmitHandler}>
                <div className={classes.contentContainer}>
                    <div className={classes.content}>
                        <label htmlFor='email' id='email'>Email</label>
                        <input id='email' name='email' onChange={event => setEmail(event.target.value)}/>
                    </div>
                    <div className={classes.content}>
                        <label htmlFor='password' id='password'>Password</label>
                        <input id='password' name='password' onChange={event => setPassword(event.target.value)}/>
                    </div>
                </div>
                <div className={classes.actions}>
                    <button type='button' onClick={toggleLoginHandler} className={classes.toggle}>{isLogin ? 'Create new account' : 'Login'}</button>
                    <button>{isLogin ? 'Login' : 'Signup'}</button>
                </div>
            </form>
            {status &&
                <Status title={status.title} message={status.message} status={status.status}/>
            }
        </section>
    )
}

export default LoginSingupForm