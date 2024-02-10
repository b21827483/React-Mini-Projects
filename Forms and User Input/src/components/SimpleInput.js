import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: typedName,
    hasError: nameHasError,
    isInputValid: isNameValid,
    InputChangeHandler: nameInputChangeHandler,
    InputFocusHandler: nameInputFocusHandler,
    reset: resetName,
  } = useInput((value) => value.trim() !== "");

  const {value: typedEmail,
    hasError: emailHasError,
    isInputValid: isEmailValid,
    InputChangeHandler: emailInputChangeHandler,
    InputFocusHandler: emailInputFocusHandler,
    reset: resetEmail,} = useInput(value => value.includes("@"));

  let isFormValid = false;

  if (isNameValid && isEmailValid) {
    isFormValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!typedName) {
      return;
    }

    resetName();
    resetEmail();
  };

  const nameInputClasses = nameHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailHasError
  ? "form-control invalid"
  : "form-control";

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputFocusHandler}
          value={typedName}
        />
        {nameHasError && <p className="error-text">Name must not be empty.</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your E-mail</label>
        <input
          type="text"
          id="email"
          onChange={emailInputChangeHandler}
          onBlur={emailInputFocusHandler}
          value={typedEmail}
        />
        {emailHasError && <p className="error-text">Please enter a valid e-mail.</p>}
      </div>


      <div className="form-actions">
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
