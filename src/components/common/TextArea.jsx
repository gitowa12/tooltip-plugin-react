import * as React from "react";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { styled } from "@mui/system";
import { FormControl, InputLabel } from "@mui/material";

const TextArea = ({ id, label }) => {
  return (
    <FormControl>
      <InputLabel htmlFor={id} shrink>
        {label}
      </InputLabel>
      <TextareaAutosize
        id={id}
        aria-label="empty textarea"
        placeholder={`Enter `}
        // style={{ width: "100%" }}
      />
    </FormControl>
  );
};

export default TextArea;
