import React, { useState, useEffect, useContext } from "react";
import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { SessionContext } from "../../context/sessionContext/SessionContext";
import { downloadFile } from "../../context/sessionContext/apiCalls";
import { formatBytes } from "../../util/helperFunctions";

const Datatable = ({ sessionIdx }) => {
  const { sessions, isFetchingSession, errorSession, dispatchSession } =
    useContext(SessionContext);

  const [data, setData] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    if (sessions.length > sessionIdx) {
      const session = sessions[sessionIdx];
      const logs = session.logs;
      for (let logInfo of logs) {
        logInfo.id = logInfo._id;
      }
      setData(logs);
      setSessionId(sessions[sessionIdx]._id);
    }
  }, [sessions, sessionIdx]);

  async function handleDownload(fileId, fileName) {
    console.log(`SessionId : ${sessionId} Log id : ${fileId}`);
    console.log("downloading...");
    await downloadFile(sessionId, fileId, fileName, dispatchSession);
    console.log("downloaded");
  }

  function handleDelete(id) {
    console.log(`SessionId : ${sessionId} Log id : ${id}`);
  }

  const userColumns = [
    {
      field: "filePath",
      headerName: "FileName",
      width: 280,
      renderCell: (params) => {
        return <div>{params.row.filePath.split("/").pop()}</div>;
      },
    },
    {
      field: "fileSize",
      headerName: "FileSize",
      width: 100,
      renderCell: (params) => {
        return <div>{formatBytes(Number(params.row.fileSize))}</div>;
      },
    },
    {
      field: "deviceType",
      headerName: "DeviceType",
      width: 120,
      renderCell: (params) => {
        return <div>{params.row.deviceType.toUpperCase()} </div>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="downloadButton"
              onClick={() =>
                handleDownload(
                  params.row._id,
                  params.row.filePath.split("/").pop()
                )
              }
            >
              Download
            </div>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <div className="datatable">
      {/* {sessions.length > sessionIdx
        ? sessions[sessionIdx]._id
        : "No Session records found"} */}
      {data && (
        <DataGrid
          sx={{
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
          }}
          className="datagrid"
          rows={data}
          columns={userColumns}
          pageSize={9}
          rowsPerPageOptions={[9]}
          disableColumnSelector
          disableDensitySelector
          disableColumnFilter
          disableColumnMenu
          hideFooterSelectedRowCount
        />
      )}
    </div>
  );
};

export default Datatable;
