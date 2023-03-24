import { Controller } from "react-hook-form";
import { TextField } from "@mui/material"

const TextFieldComp = ({
    name,
    label,
    ...textFieldProps
}) => {
  return (
   <Controller
      name={name}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...textFieldProps}
          value={field.value}
          className="form-textfield"
          style={{ width: 230 }}
          label={label}
          onChange={(e) => {
            field.onChange(e);
          }}
          error={!!fieldState?.error}
          // Here if you remove the react fragment gives error do you know why?
          helperText={fieldState?.error?.message || ""}
        ></TextField>
      )}
    />
  )
}

export default TextFieldComp
