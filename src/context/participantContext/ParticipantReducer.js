const ParticipantReducer = (state, action) => {
  switch (action.type) {
    case "GET_PARTICIPANTS_START":
      return {
        participants: [],
        isFetching: true,
        error: false,
      };
    case "GET_PARTICIPANTS_SUCCESS":
      return {
        participants: action.payload,
        isFetching: false,
        error: false,
      };
    case "GET_PARTICIPANTS_FAILURE":
      return {
        participants: [],
        isFetching: false,
        error: true,
      };
    default:
      return {
        ...state,
      };
  }
};

export default ParticipantReducer;
