/** @format */

import { Box, Button, TextField } from "@mui/material";
import { FC, useState } from "react";
import { AuthModalCloseTypes, ChangeEventInput } from "../../types/index";
import { controlAlertModal } from "../../features/alert-modal/alert-modal-slice";
import { useAppDispatch } from "../../app/hooks";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const Login: FC<AuthModalCloseTypes> = ({ handleClose }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const dispatch = useAppDispatch();

  const changeEmail = (e: ChangeEventInput): void => {
    setEmail(e.target.value);
  };
  const changePassword = (e: ChangeEventInput): void => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (): Promise<void> => {
    if (!email || !password) {
      dispatch(
        controlAlertModal({
          open: true,
          message: "Please fill all the Fields",
          type: "error",
        })
      );
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      dispatch(
        controlAlertModal({
          open: true,
          message: `Login Successful. Welcome ${result.user.email}`,
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

export default Login;
