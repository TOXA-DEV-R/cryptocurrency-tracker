/** @format */

import { FC, Fragment } from "react";
import Snackbar from "@mui/material/Snackbar";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { controlAlertModal } from "../../features/alert-modal/alert-modal-slice";
import MuiAlert from "@mui/material/Alert";

const AlertModal: FC = () => {
  const { alertModal } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  const handleClose = (): void => {
    dispatch(
      controlAlertModal({
        open: false,
        message: "",
        type: "info",
      })
    );
  };

  return (
    <Snackbar open={alertModal.open} autoHideDuration={3000}>
      <MuiAlert
        onClose={handleClose}
        elevation={10}
        variant="filled"
        severity={alertModal.type}
      >
        {alertModal.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default AlertModal;
