/** @format */

import { Box, Button, TextField } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FC, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { controlAlertModal } from "../../features/alert-modal/alert-modal-slice";
import { auth } from "../../firebase";
import { ChangeEventInput, AuthModalCloseTypes } from "../../types";

const Signup: FC<AuthModalCloseTypes> = ({ handleClose }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const dispatch = useAppDispatch();

  const changeEmail = (e: ChangeEventInput): void => {
    setEmail(e.target.value);
  };
  const changePassword = (e: ChangeEventInput): void => {
    setPassword(e.target.value);
  };
  const changeConfirmPassword = (e: ChangeEventInput): void => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (): Promise<void> => {
    if (password !== confirmPassword) {
      dispatch(
        controlAlertModal({
          open: true,
          message: "Password do not match",
          type: "error",
        })
      );
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(result);
      dispatch(
        controlAlertModal({
          open: true,
          message: `Sign Up Successful. Welcome ${result.user.email}`,
          type: "success",
        })
      );
      handleClose();
    } catch (error) {
      dispatch(
        controlAlertModal({
          open: true,
          message: "A big error",
          type: "error",
        })
      );
    }
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
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        fullWidth
        onChange={changeConfirmPassword}
      />
      <Button
        variant="contained"
        size="large"
        sx={{
          backgroundColor: "#EEBC1D",
        }}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </Box>
  );
};

export default Signup;
