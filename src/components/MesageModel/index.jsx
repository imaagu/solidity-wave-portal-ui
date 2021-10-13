import React, { useState } from "react";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const MessageModel = (props) => {
  const { open, onClose, wave } = props;
  const [text, setText] = useState("");

  const handleClose = () => {
    setText("");
    onClose();
  };

  const handleSend = () => {
    onClose();
    wave(text);
  };

  const handleChange = (e) => {
    const { currentTarget: input } = e;
    setText(input.value);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className="border-bottom  border-secondary mb-4 mx-2 d-flex flex-row justify-content-between">
          <span> Message</span>
          <span onClick={handleClose}> x</span>
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Hey! what's up, send me your message
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="text"
            label="Message"
            type="text"
            fullWidth
            onChange={handleChange}
            variant="standard"
            value={text}
          />
        </DialogContent>
        <DialogActions className="text-center justify-content-center">
          <button
            disabled={text === ""}
            className="btn btn-sm btn-primary text-center"
            onClick={handleSend}
          >
            Send
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MessageModel;
