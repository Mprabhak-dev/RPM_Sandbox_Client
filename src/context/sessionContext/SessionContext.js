import { createContext, useReducer } from "react";
import SessionReducer from "./SessionReducer";

const INITIAL_STATE1 = {
  sessions: [],
  isfetching: false,
  error: false,
};

export const SessionContext = createContext(INITIAL_STATE1);

export const SessionContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SessionReducer, INITIAL_STATE1);

  return (
    <SessionContext.Provider
      value={{
        sessions: state.sessions,
        isFetchingSession: state.isfetching,
        errorSession: state.error,
        dispatchSession: dispatch,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};
