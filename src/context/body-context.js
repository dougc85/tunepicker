import React, { useState } from 'react';

const defaultContext = {
  modalBodyStyles: `
  `,
  setModalBodyStyles: undefined,
}

const BodyContext = React.createContext(defaultContext);

export const BodyContextProvider = (props) => {

  const [modalBodyStyles, setModalBodyStyles] = useState(defaultContext.bodyStyles);

  return (
    <BodyContext.Provider
      value={{
        modalBodyStyles,
        setModalBodyStyles
      }}>
      {props.children}
    </BodyContext.Provider>
  )
}

export default BodyContext;