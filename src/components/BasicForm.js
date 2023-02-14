import useInput from "../hooks/use-input";

const BasicForm = (props) => {
  //Instead of using the useInput hook, we can use Formik library

  //Variables used for submitting the form
  let formIsValid = false;
  //Entered first name and validity (must not be empty)
  const {
    value: enteredFName,
    isValid: enteredFNameIsValid,
    hasError: fNameInputHasError,
    valueChangeHandler: fNameChangeHandler,
    inputBlurHandler: fNameBlurHandler,
    reset: resetFNameInput,
  } = useInput((value) => value.trim() !== "");
  //Entered last name and validity (must not be empty)
  const {
    value: enteredLName,
    isValid: enteredLNameIsValid,
    hasError: lNameInputHasError,
    valueChangeHandler: lNameChangeHandler,
    inputBlurHandler: lNameBlurHandler,
    reset: resetLNameInput,
  } = useInput((value) => value.trim() !== "");
  //Email use input with checking of email validity
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  });
  //Submit handler
  function formSubmitHandler(event) {
    event.preventDefault();
    if (!enteredFNameIsValid) {
      return;
    }
    //Log of input to console
    console.log(
      `Uživatel má jméno ${enteredFName} ${enteredLName} a email: ${enteredEmail}`
    );

    //Reset inputs
    resetFNameInput();
    resetLNameInput();
    resetEmailInput();
  }
  //If which allowed click submit button
  if (enteredFNameIsValid && enteredLNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }
  //Conditional css. Makes inputs red and also used for show error message in P tag
  const showErrorFName = fNameInputHasError
    ? "form-control invalid"
    : "form-control";
  const showErrorLName = lNameInputHasError
    ? "form-control invalid"
    : "form-control";
  const showErrorEmail = emailInputHasError
    ? "form-control invalid"
    : "form-control";
  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={showErrorFName}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            onBlur={fNameBlurHandler}
            onChange={fNameChangeHandler}
            value={enteredFName}
          />
          {fNameInputHasError && <p>Vložte prosím validní jméno.</p>}
        </div>
        <div className={showErrorLName}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            onBlur={lNameBlurHandler}
            onChange={lNameChangeHandler}
            value={enteredLName}
          />
          {lNameInputHasError && <p>Vložte prosím validní příjmení.</p>}
        </div>
      </div>
      <div className={showErrorEmail}>
        <label htmlFor="email">E-Mail Address</label>
        <input
          type="email"
          id="email"
          onBlur={emailBlurHandler}
          onChange={emailChangeHandler}
          value={enteredEmail}
        />
        {emailInputHasError && <p>Vložte prosím validní email.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
