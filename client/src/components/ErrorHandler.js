import React from "react";
import { useRouteError } from "react-router-dom";
import { Box } from "@mui/material";

const ErrorHandler = () => {
  const error = useRouteError();
  console.log(error);
  return <Box sx={{ padding: "20px" }}>{error?.data}</Box>;
};

export default ErrorHandler;
