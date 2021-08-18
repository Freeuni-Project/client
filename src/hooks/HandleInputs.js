const useHandleInputs = (e, inputValues, setInputValues) => {
  const name = e.target.name;
  const value = e.target.value;

  setInputValues({ ...inputValues, [name]: value });
};

export const HandleInputs = (e, inputValues, setInputValues) => {
  return useHandleInputs(e, inputValues, setInputValues);
};
