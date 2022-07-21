/** @format */

import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Anchor } from "../../types/index";
import { Avatar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { controlAlertModal } from "../../features/alert-modal/alert-modal-slice";
import { doc, setDoc } from "firebase/firestore";
import { numberWithCommas } from "../../helper/number-with-commas";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGlobalContext } from "../../context/context";

const UserSidebar: React.FC = () => {
  const [state, setState] = React.useState(false);
  const { watchList, controlMoney } = useAppSelector((state) => state);
  const { user } = useGlobalContext();
  const dispatch = useAppDispatch();

  const toggleDrawer =
    () => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState((prev) => !prev);
    };

  const logOut = () => {
    signOut(auth);
    dispatch(
      controlAlertModal({
        open: true,
        type: "success",
        message: "Logout Successfull !",
      })
    );

    toggleDrawer();
  };

  const removeFromWatchlist = async (coin: any) => {
    const coinRef = doc(db, "watchList", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchList.filter((wish) => wish !== coin?.id) },
        { merge: true }
      );

      dispatch(
        controlAlertModal({
          open: true,
          message: `${coin.name} Removed from the Watchlist !`,
          type: "success",
        })
      );
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
    <div>
      <React.Fragment>
        <Avatar
          sx={{
            height: 38,
            width: 38,
            marginLeft: 15,
            cursor: "pointer",
            backgroundColor: "#EEBC1D",
          }}
          onClick={toggleDrawer()}
          src={user?.photoURL}
          alt={user?.displayName || user?.email}
        />
        <Drawer anchor="right" open={state} onClose={toggleDrawer()}>
          <div
            style={{
              width: 350,
              padding: 25,
              height: "100%",
              display: "flex",
              flexDirection: "column",
              fontFamily: "monospace",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "20px",
                height: "92%",
              }}
            >
              <Avatar
                sx={{
                  width: 200,
                  height: 200,
                  cursor: "pointer",
                  backgroundColor: "#EEBC1D",
                  objectFit: "contain",
                }}
                src={user?.photoURL}
                alt={user?.displayName || user?.email}
              />
              <span
                style={{
                  width: "100%",
                  fontSize: 25,
                  textAlign: "center",
                  fontWeight: "bolder",
                  wordWrap: "break-word",
                }}
              >
                {user?.displayName || user?.email}
              </span>
              <div
                style={{
                  flex: 1,
                  width: "100%",
                  backgroundColor: "grey",
                  borderRadius: 10,
                  padding: 15,
                  paddingTop: 10,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                  overflowY: "scroll",
                }}
              >
                <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                  Watchlist
                </span>
                {watchList.map((coin) => {
                  if (watchList.includes(coin.id)) {
                    return (
                      <div
                        style={{
                          padding: 10,
                          borderRadius: 5,
                          color: "black",
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          backgroundColor: "#EEBC1D",
                          boxShadow: "0 0 3px black",
                        }}
                        key={coin.id}
                      >
                        <span>{coin.name}</span>
                        <span style={{ display: "flex", gap: 8 }}>
                          {controlMoney.symbol}{" "}
                          {numberWithCommas(coin.current_price.toFixed(2))}
                          <DeleteIcon
                            sx={{ cursor: "pointer" }}
                            onClick={() => removeFromWatchlist(coin)}
                          />
                        </span>
                      </div>
                    );
                  } else {
                    return <div key={coin.id}></div>;
                  }
                })}
              </div>
              <Button
                variant="contained"
                sx={{
                  height: "8%",
                  width: "100%",
                  backgroundColor: "#EEBC1D",
                  marginTop: 20,
                }}
                onClick={logOut}
              >
                Log Out
              </Button>
            </div>
          </div>
        </Drawer>
      </React.Fragment>
    </div>
  );
};

export default UserSidebar;
