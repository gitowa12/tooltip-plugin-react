import * as React from "react";
import Autocomplete from "@mui/joy/Autocomplete";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import FormHelperText from "@mui/joy/FormHelperText";
import Input from "@mui/joy/Input";
import { memo } from "react";

const AutoComplete = memo(({ id, value, options, label, stackId, onChange, placeholder }) => {
  return (
    <FormControl sx={{ width: 300 }}>
      <FormLabel>{label}</FormLabel>
      <Autocomplete
        sx={{ height: "26px", pl: "4px" }}
        size="small"
        placeholder={placeholder}
        value={value}
        options={options}
        getOptionKey={(option) => {
          return option.fieldId;
        }}
        isOptionEqualToValue={(option, value) => {
          return option.fieldId === value.fieldId;
        }}
        onChange={(event, newValue) => {
          // console.log(newValue);
          onChange(newValue, stackId);
        }}
      />
      {/* <FormHelperText></FormHelperText> */}
    </FormControl>
  );
});
export default AutoComplete;
