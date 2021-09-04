const useHandleValidation = (inputValues, setValidationError, callBack) => {
  let formIsValid = true;

  console.log(callBack);
  if (inputValues.title < 5) {
    formIsValid = false;
    setValidationError((val) => {
      return {
        ...val,
        title: "The ticket title must be 5 letters long",
      };
    });
  } else {
    setValidationError((val) => {
      return {
        ...val,
        title: "",
      };
    });
  }
  if (inputValues.reporter === "" || inputValues.reporter === "reporter") {
    formIsValid = false;
    setValidationError((val) => {
      return {
        ...val,
        reporter: "You must enter reporter of ticket",
      };
    });
  } else {
    setValidationError((val) => {
      return {
        ...val,
        reporter: "",
      };
    });
  }
  if (formIsValid) {
    return callBack();
  }
  return formIsValid;
};

export const TicketValidation = (inputValues, setValidationError, callBack) => {
  return useHandleValidation(inputValues, setValidationError, callBack);
};
