const SessionReducer = (state, action) => {
  switch (action.type) {
    case "GET_SESSION_START":
      return {
        sessions: [],
        isFetching: true,
        error: false,
      };
    case "GET_SESSION_SUCCESS":
      return {
        sessions: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_SESSION_FAILURE":
      return {
        sessions: [],
        isFetching: false,
        error: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default SessionReducer;
