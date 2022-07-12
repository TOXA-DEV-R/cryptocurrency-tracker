/** @format */

import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  makeStyles,
} from "@material-ui/core";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  ThemeProvider,
} from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createTheme } from "@material-ui/core";
import { useAppDispatch } from "../../app/hooks";
import { controlCurrency } from "../../features/control-money/controlMoneySlice";
import AuthModal from "../authentication/auth-modal";

const useStyle = makeStyles(() => ({
  select: {
    width: 100,
    height: 40,
  },
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "'Montserrat', sans-serif",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const Header: FC = () => {
  const [controlMoney, setControlMoney] = useState<string>("USD");
  const classes = useStyle();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  const handleChange = (event: SelectChangeEvent) => {
    const value: string = event.target.value;
    setControlMoney(value);
    dispatch(controlCurrency(value));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              className={classes.title}
              variant="h5"
              onClick={() => navigate("/")}
            >
              Crypto Hunter
            </Typography>
            <Select
              value={controlMoney}
              variant="outlined"
              className={classes.select}
              onChange={handleChange}
            >
              <MenuItem value="USD">USD</MenuItem>
              <MenuItem value="INR">INR</MenuItem>
            </Select>
            <AuthModal />
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
