export const getParticipantsStart = () => ({
  type: "GET_PARTICIPANTS_START",
});

export const getParticipantsSuccess = (participants) => ({
  type: "GET_PARTICIPANTS_SUCCESS",
  payload: participants,
});

export const getParticipantsFailure = () => ({
  type: "GET_PARTICIPANTS_FAILURE",
});
