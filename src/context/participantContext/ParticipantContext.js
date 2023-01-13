import { createContext, useReducer } from "react";
import ParticipantReducer from "./ParticipantReducer";

const INITIAL_STATE = {
  participants: [],
  isfetching: false,
  error: false,
};

export const ParticipantContext = createContext(INITIAL_STATE);

export const ParticipantContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ParticipantReducer, INITIAL_STATE);

  return (
    <ParticipantContext.Provider
      value={{
        participants: state.participants,
        isFetching: state.isfetching,
        error: state.error,
        dispatchParticipant: dispatch,
      }}
    >
      {children}
    </ParticipantContext.Provider>
  );
};
