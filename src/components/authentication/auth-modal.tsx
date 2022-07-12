/** @format */

import { FC, SyntheticEvent, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Login from "./login";
import Signup from "./signup";

const AuthModal: FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState("one");

  const handleOpen = (): void => setOpen(true);
  const handleClose = (): void => setOpen(false);

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          width: 85,
          height: 40,
          marginLeft: 15,
          backgroundColor: "#EEBC1D",
        }}
        onClick={handleOpen}
      >
        Login
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute" as "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            bgcolor: "background.paper",
            border: "2px solid #000",
            borderRadius: "16px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            sx={{
              borderRadius: "8px",
              marginBottom: "10px",
              boxShadow: "0 0 10px -7px black",
            }}
          >
            <Tab
              sx={{
                fontSize: 20,
                width: "50%",
              }}
              value="one"
              label="Login"
            />
            <Tab
              sx={{
                fontSize: 20,
                width: "50%",
              }}
              value="two"
              label="Signup"
            />
          </Tabs>
          {value === "one" && <Login handleClose={handleClose} />}
          {value === "two" && <Signup handleClose={handleClose} />}
        </Box>
      </Modal>
    </div>
  );
};

export default AuthModal;
