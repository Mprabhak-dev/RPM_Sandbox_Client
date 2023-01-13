import { publicRequest } from "../../requestMethods";
import {
  getSessionsStart,
  getSessionsSuccess,
  getSessionFailure,
} from "./SessionActions";
import download from "downloadjs";

export const getSessions = async (id, dispatch) => {
  dispatch(getSessionsStart());
  try {
    console.log(`userId:${id}`);
    const { data } = await publicRequest.get(`/sessions/${id}`);
    console.log(data);
    dispatch(getSessionsSuccess(data));
  } catch (err) {
    dispatch(getSessionFailure());
  }
};

export const downloadFile = async (sessionId, fileId, fileName, dispatch) => {
  //dispatch(getSessionsStart());
  try {
    console.log(`sessionId:${sessionId} fileId:${fileId} fileName:${fileName}`);
    const { data } = await publicRequest.get(
      `/sessions/${sessionId}/download/${fileId}`,
      {
        responseType: "blob",
      }
    );
    console.log(data);
    return download(data, fileName, "text/csv");
  } catch (err) {
    // dispatch(getSessionFailure());
  }
};
