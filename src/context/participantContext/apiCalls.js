import { publicRequest } from "../../requestMethods";
import {
  getParticipantsStart,
  getParticipantsSuccess,
  getParticipantsFailure,
} from "./ParticipantActions";

export const getParticipants = async (dispatch) => {
  dispatch(getParticipantsStart());
  try {
    const { data } = await publicRequest.get("/users");
    console.log(`api call : ${JSON.stringify(data)}`);
    dispatch(getParticipantsSuccess(data));
  } catch (err) {
    dispatch(getParticipantsFailure());
  }
};
