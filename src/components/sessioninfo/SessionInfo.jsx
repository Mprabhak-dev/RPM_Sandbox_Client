import React, { useState, useEffect, useContext } from "react";
import { SessionContext } from "../../context/sessionContext/SessionContext";
import { ParticipantContext } from "../../context/participantContext/ParticipantContext";
import "./sessioninfo.scss";

const timeDistance = (date1, date2) => {
  let distance = Math.abs(date1 - date2);
  const hours = Math.floor(distance / 3600000);
  distance -= hours * 3600000;
  const minutes = Math.floor(distance / 60000);
  distance -= minutes * 60000;
  const seconds = Math.floor(distance / 1000);
  let timeStr = "";
  if (hours > 0) {
    timeStr = `${hours} hrs ${("0" + minutes).slice(-2)} min ${(
      "0" + seconds
    ).slice(-2)} sec`;
  } else if (minutes > 0) {
    timeStr = `${("0" + minutes).slice(-2)} min ${("0" + seconds).slice(
      -2
    )} sec`;
  } else {
    timeStr = `${("0" + seconds).slice(-2)} sec`;
  }

  return timeStr;
};

const SessionInfo = ({ sessionIdx, participantIdx }) => {
  const { participants, dispatchParticipant } = useContext(ParticipantContext);

  const { sessions, isFetchingSession, errorSession, dispatchSession } =
    useContext(SessionContext);

  const [sessionInfo, setSessionInfo] = useState({
    startTime: "",
    endTime: "",
    duration: "",
    timeZone: "",
  });

  const [participantInfo, setParticipantInfo] = useState({
    userName: "",
    gender: "",
    age: "",
    height: "",
    weight: "",
  });

  useEffect(() => {
    if (sessions.length > sessionIdx) {
      const session = sessions[sessionIdx];
      const logs = session.logs;
      for (let logInfo of logs) {
        logInfo.id = logInfo._id;
      }
      const sessionInfo = sessions[sessionIdx];
      const data = {};

      var options = {
        // weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      };
      let startTime = new Date(sessionInfo.startTime).toLocaleDateString(
        "en-us",
        options
      );
      let endTime = new Date(sessionInfo.endTime).toLocaleDateString(
        "en-us",
        options
      );

      const duration = timeDistance(
        new Date(sessionInfo.startTime),
        new Date(sessionInfo.endTime)
      );

      console.log(`Duration : ${duration}`);

      data.sessionId = sessionInfo._id;
      data.userId = sessionInfo.userId;
      data.startTime = startTime;
      data.endTime = endTime;
      data.duration = duration;
      data.timeZone = sessionInfo.timeZoneInSec;
      setSessionInfo(data);
    }
  }, [sessions, sessionIdx]);

  useEffect(() => {
    if (participants.length > participantIdx) {
      const user = participants[participantIdx];
      const userData = {};
      userData.userName = user.userName;
      userData.gender = user.gender;
      userData.age = user.age;
      userData.height = user.height;
      userData.weight = user.weight;
      setParticipantInfo(userData);
    }
  }, [participants, participantIdx]);

  return (
    <div className="sessionWrapper">
      <div className="sessionInfoLeft">
        <div className="itemInfo">
          <div className="infoName">Username</div>
          <div className="infoValue">{participantInfo.userName}</div>
        </div>
        <div className="itemInfo">
          <div className="infoName">Gender</div>
          <div className="infoValue">{participantInfo.gender}</div>
        </div>
        <div className="itemInfo">
          <div className="infoName">Age</div>
          <div className="infoValue">{participantInfo.age} years old</div>
        </div>
        <div className="itemInfo">
          <div className="infoName">Height</div>
          <div className="infoValue">{participantInfo.height} cm</div>
        </div>
        <div className="itemInfo">
          <div className="infoName">Weight</div>
          <div className="infoValue">{participantInfo.weight} kg</div>
        </div>
      </div>
      <div className="sessionInfoRight">
        <div className="itemInfo">
          <div className="infoName">Start Time</div>
          <div className="infoValue">{sessionInfo.startTime}</div>
        </div>
        <div className="itemInfo">
          <div className="infoName">End Time</div>
          <div className="infoValue">{sessionInfo.endTime}</div>
        </div>
        <div className="itemInfo">
          <div className="infoName">Duration</div>
          <div className="infoValue">{sessionInfo.duration}</div>
        </div>
        <div className="itemInfo">
          <div className="infoName">TimeZone</div>
          <div className="infoValue">{sessionInfo.timeZone} seconds</div>
        </div>
      </div>
    </div>
  );
};

export default SessionInfo;
