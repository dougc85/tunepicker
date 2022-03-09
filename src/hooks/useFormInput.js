import { useState } from 'react';

function useFormInput(initialVal) {
  const [state, setState] = useState(initialVal);

  function handleChange(e) {
    setState(e.target.value);
  }

  function resetInput(e) {
    setState("");
  }


  return [
    state,
    handleChange,
    resetInput
  ]
}

export default useFormInput;