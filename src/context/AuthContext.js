import React, { createContext, useReducer } from "react";

export const Auth = createContext();

const AuthProvider = (props) => {
  const initialState = {
    data: {
      isAuthenticated: false,
    },
  };

  const reducer = (currentState, action) => {
    switch (action.type) {
      case "LOGIN":
        console.log("LOGIN");

        return {
          data: {
            isAuthenticated: true,
          },
        };
      case "LOG_OUT":
        console.log("LOGOUT");
        return {
          data: {
            isAuthenticated: false,
          },
        };

      default:
        return {
          data: {
            isAuthenticated: false,
          },
        };
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Auth.Provider value={{ state, dispatch }}>{props.children}</Auth.Provider>
  );
};

export default AuthProvider;
