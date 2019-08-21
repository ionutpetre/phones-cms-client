import React from "react";
import {
  Button,
  Dialog,
  Slide,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import { TransitionProps } from "@material-ui/core/transitions";

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

const ConfirmDialog: React.FunctionComponent<{
  title: string;
  descrition: string;
  open: boolean;
  onSuccess: Function;
  onCancel: Function;
}> = props => {
  const { title, descrition, open, onSuccess, onCancel } = props;
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => {
        onCancel();
      }}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {descrition}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            onSuccess();
          }}
          color="primary"
        >
          YES
        </Button>
        <Button
          onClick={() => {
            onCancel();
          }}
          color="primary"
        >
          NO
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
