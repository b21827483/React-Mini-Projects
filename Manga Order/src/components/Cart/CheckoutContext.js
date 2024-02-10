import React from "react";

const formContext = React.createContext({ 
  name: true,
  email: true,
  address: true,
  creditNu: true,
});

export default formContext; 