export const getSessionsStart = () => ({
  type: "GET_SESSION_START",
});

export const getSessionsSuccess = (sessions) => ({
  type: "GET_SESSION_SUCCESS",
  payload: sessions,
});

export const getSessionFailure = () => ({
  type: "GET_SESSION_FAILURE",
});
