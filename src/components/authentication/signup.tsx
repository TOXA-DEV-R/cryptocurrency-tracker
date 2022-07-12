/** @format */

import { Box, TextField } from "@mui/material";
import { ChangeEvent, FC, useState } from "react";
import { AuthModalCloseTypes } from "../../types";

const Signup: FC<AuthModalCloseTypes> = ({ handleClose }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const changeEmail = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setEmail(e.target.value);
  };
  const changePassword = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setPassword(e.target.value);
  };
  const changeConfirmPassword = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setConfirmPassword(e.target.value);
  };

  return (
    <Box
      p={3}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        fullWidth
        onChange={changeEmail}
      />
      <TextField
        variant="outlined"
        type="password"
        label="Enter Password"
        value={password}
        fullWidth
        onChange={changePassword}
      />
      <TextField
        variant="outlined"
        type="email"
        label="Confirm Password"
        value={confirmPassword}
        fullWidth
        onChange={changeConfirmPassword}
      />
    </Box>
  );
};

export default Signup;
