import { FormControl, TextField } from "@mui/material";
import React from "react";

const MessageInput = ({ handleChange, stackId, value }) => {
  return (
    <FormControl>
      <TextField
        sx={{
          width: 240,
          padding: 1,
        }}
        id="message"
        label="メッセージ"
        size="small"
        value={value}
        onChange={(e) => handleChange(e, stackId, "message")}
      />
    </FormControl>
  );
};

export default MessageInput;
