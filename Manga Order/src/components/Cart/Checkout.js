import { useRef, useReducer, useState, useEffect } from "react";
import classes from "./Checkout.module.css";

const isInputEmpty = (value) => {
  return value.trim() === "";
};

const defaultFormState = {
  name: true,
  email: true,
  address: true,
  creditNu: true,
};

const formReducer = (state, action) => {
  if (action.type === "CHECK_NAME") {
    const isNameEmpty = isInputEmpty(action.enteredName);
    return {
      name: isNameEmpty ? false : action.enteredName,
      email: state.email,
      address: state.address,
      creditNu: state.creditNu,
    };
  }
  if (action.type === "CHECK_EMAIL") {
    const isEmailValid = /^\S+@\S+\.\S+$/.exec(action.enteredEmail);
    return {
      name: state.name,
      email: isEmailValid ? action.enteredEmail : false,
      address: state.address,
      creditNu: state.creditNu,
    };
  }
  if (action.type === "CHECK_ADDRESS") {
    const isAddressEmpty = isInputEmpty(action.enteredAddress);
    return {
      name: state.name,
      email: state.email,
      address: isAddressEmpty ? false : action.enteredAddress,
      creditNu: state.creditNu,
    };
  }
  if (action.type === "CHECK_CREDIT") {
    let isCreditValid;
    if (action.enteredCreditNu.length === 16 && +action.enteredCreditNu) {
      isCreditValid = true;
    } else {
      isCreditValid = false;
    }

    return {
      name: state.name,
      email: state.email,
      address: state.address,
      creditNu: isCreditValid ? action.enteredCreditNu : false,
    };
  }

  return defaultFormState;
};

const Checkout = (props) => {
  const [formInputState, dispatchFormAction] = useReducer(
    formReducer,
    defaultFormState
  );

  const [didSubmit, setDidSubmit] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const creditNuRef = useRef();

  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredName = nameRef.current.value;
    const enteredEmail = emailRef.current.value;
    const enteredAddress = addressRef.current.value;
    const enteredCreditNu = creditNuRef.current.value;

    const checkValidity= () => {
      
      checkNameValidity(enteredName);
      checkEmailValidity(enteredEmail);
      chechkAddressValidity(enteredAddress);
      checkCreditNuValidity(enteredCreditNu);
    }

    checkValidity();
    setDidSubmit(true);
  };

  if(didSubmit) {
    console.log(formInputState)
    if(formInputState.name && formInputState.email && formInputState.address && formInputState.creditNu) {
      props.onConfirm(formInputState);
    }
  }

  const checkNameValidity = (enteredName) => {
    dispatchFormAction({ type: "CHECK_NAME", enteredName: enteredName });
  };

  const checkEmailValidity = (enteredEmail) => {
    dispatchFormAction({ type: "CHECK_EMAIL", enteredEmail: enteredEmail });
  };

  const chechkAddressValidity = (enteredAddress) => {
    dispatchFormAction({
      type: "CHECK_ADDRESS",
      enteredAddress: enteredAddress,
    });
  };

  const checkCreditNuValidity = (enteredCreditNu) => {
    dispatchFormAction({
      type: "CHECK_CREDIT",
      enteredCreditNu: enteredCreditNu,
    });
  };

  const nameClasses = `${classes.control} ${
    !formInputState.name ? classes.invalid : ""
  }`;
  const emailClasses = `${classes.control} ${
    !formInputState.email ? classes.invalid : ""
  }`;
  const addressClasses = `${classes.control} ${
    !formInputState.address ? classes.invalid : ""
  }`;
  const creditNuClasses = `${classes.control} ${
    !formInputState.creditNu ? classes.invalid : ""
  }`;

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={nameClasses}>
        <label htmlFor="name">Name and Surname</label>
        <input type="text" id="name" ref={nameRef} />
        {!formInputState.name && <p>Invalid Name</p>}
      </div>
      <div className={emailClasses}>
        <label htmlFor="email">E-mail</label>
        <input type="text" id="email" ref={emailRef} />
        {!formInputState.email && <p>Invalid email</p>}
      </div>
      <div className={addressClasses}>
        <label htmlFor="address">Address</label>
        <input type="text" id="address" ref={addressRef} />
        {!formInputState.address && <p>Invalid Address</p>}
      </div>
      <div className={creditNuClasses}>
        <label htmlFor="creditCardNu">Credit Card Number</label>
        <input type="text" id="creditCardNu" ref={creditNuRef} />
        {!formInputState.creditNu && <p>Invalid Credit Card Number</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.hideForm}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
