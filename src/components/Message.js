import { Alert } from "@mui/material";
import React, { useState, useEffect } from "react";

const Message = ({ severity, message }) => {
  const [upTime, setUpTime] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setUpTime(false);
    }, 3000);
  }, []);

  return <>{upTime && <Alert severity={severity}>{message}</Alert>}</>;
};

export default Message;
