import React, { useState, useEffect } from "react";
import "./navbar.scss";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import moment from "moment";

const Navbar = () => {
  const [dateState, setDateState] = useState(new Date());

  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);

  return (
    <div className="navbar">
      <div className="logoWrapper">
        <span className="title">RPM Sandbox Logs</span>
      </div>
      {/* <span className="dateTime">{moment().format("DD-MM-YYYY hh:mm:ss")}</span> */}
      <div className="dateTime">
        <CalendarMonthIcon />
        <span className="date">
          {dateState.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
        <AccessTimeIcon />
        <span className="time">
          {dateState.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
