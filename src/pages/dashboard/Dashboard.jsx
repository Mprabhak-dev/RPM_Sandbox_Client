import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../components/navbar/Navbar";
import "./dashboard.scss";
import { ParticipantContext } from "../../context/participantContext/ParticipantContext";
import { SessionContext } from "../../context/sessionContext/SessionContext";
import { getParticipants } from "../../context/participantContext/apiCalls";
import { getSessions } from "../../context/sessionContext/apiCalls";
import Datatable from "../../components/datatable/Datatable";
import SessionInfo from "../../components/sessioninfo/SessionInfo";
import { ChevronRight } from "@mui/icons-material";

const Dashboard = () => {
  const { participants, dispatchParticipant } = useContext(ParticipantContext);

  const { sessions, isFetchingSession, errorSession, dispatchSession } =
    useContext(SessionContext);

  const resetIndex = 0;
  const [pid, setPid] = useState(resetIndex);
  const [sid, setSid] = useState(resetIndex);

  const [sessionInfo, setSessionInfo] = useState("");

  var options = {
    // weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  useEffect(() => {
    console.log("get Participants");
    getParticipants(dispatchParticipant);
  }, [dispatchParticipant]);

  useEffect(() => {
    if (participants.length > pid) {
      // console.log(`participants : ${participants}`);
      console.log(`data: ${JSON.stringify(participants[pid])}`);
      // console.log(`pid: ${participants[pid].userName}`);
      getSessions(participants[pid]["_id"], dispatchSession);
    }
  }, [participants, pid, dispatchSession]);

  useEffect(() => {
    if (sessions) {
      // console.log(sessions[sid]);
      setSessionInfo(JSON.stringify(sessions[sid]));
    }
  }, [sid, sessions]);

  return (
    <div className="homePage">
      <Navbar />
      <div className="container">
        <div className="participantList">
          <span className="heading">Participants</span>
          <hr />
          <ul>
            {participants.map((item, index) => (
              <div
                className={`liItemWrapper ${index === pid ? "selected" : ""}`}
              >
                <li
                  key={item._id}
                  className={`liItem`}
                  onClick={() => {
                    setPid(index);
                    setSid(resetIndex);
                  }}
                >
                  {item.userName}
                </li>
                <ChevronRight
                  className={`${index === pid ? "show" : "hide"}`}
                />
              </div>
            ))}
          </ul>
        </div>
        <div className="sessionList">
          <span className="heading">Sessions</span>
          <hr />
          <ul>
            {isFetchingSession ? (
              <span>fetching sessions</span>
            ) : (
              sessions.map((item, index) => (
                <div
                  className={`liItemWrapper ${index === sid ? "selected" : ""}`}
                >
                  <li
                    key={item._id}
                    className="liItem"
                    onClick={() => {
                      setSid(index);
                    }}
                  >
                    {new Date(item.startTime).toLocaleDateString(
                      "en-us",
                      options
                    )}
                  </li>
                  <ChevronRight
                    className={`${index === sid ? "show" : "hide"}`}
                  />
                </div>
              ))
            )}
          </ul>
        </div>
        <div className="sessionInfoWrapper">
          <span className="sessionInfoHeading">Session Informations</span>
          <hr />
          <div className="sessionInfoContainer">
            <SessionInfo sessionIdx={sid} participantIdx={pid} />
          </div>

          <Datatable sessionIdx={sid} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
