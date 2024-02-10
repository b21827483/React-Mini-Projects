import { useState } from "react";

const useInput = (validityFunc) => {
  const [typedInput, setTypedInput] = useState("");
  const [isInputFocused, setInputFocused] = useState(false);

  const isInputValid = validityFunc(typedInput);
  const hasError = !isInputValid && isInputFocused;

  const InputChangeHandler = (event) => {
    setTypedInput(event.target.value);
  };

  const InputFocusHandler = (event) => {
    setInputFocused(true);
  };

  const reset = () => {
    setTypedInput("");
    setInputFocused(false);
  };

  return { value: typedInput, hasError, isInputValid, InputChangeHandler, InputFocusHandler, reset };
};

export default useInput;
