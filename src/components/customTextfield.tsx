import React, { type ReactNode, useState } from "react";
import {
  Stack,
  TextField,
  InputAdornment,
  type TextFieldProps,
  Button,
  Box,
} from "@mui/material";
import { MailIcon, CloseEye, OpenEye, PasswordIcon } from "./icons";

interface CustomTextFieldProps extends Omit<TextFieldProps, "select"> {
  field?:
    | "email"
    | "search"
    | "password"
    | "text"
    | "date"
    | "button"
    | "color";

  icon?: ReactNode;
  button?: string;
  selectedColor?: string;
  handleClickOpen?: () => void;
  handleSelectColor?: ()=>void
  shrink?: boolean;
  maxLength?: number;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  type,
  label,
  placeholder,
  error,
  helperText,
  name,
  value,
  onChange,
  defaultValue,
  disabled,
  field,
  size,
  onKeyDown,
  multiline,
  icon,
  button,
  handleClickOpen,
  shrink,
  maxLength,
  handleSelectColor,
  selectedColor,
  ...restProps
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Stack>
      <TextField
        {...restProps}
        name={name}
        label={label}
        multiline={multiline}
        error={error}
        onKeyDown={onKeyDown}
        value={value}
        type={
          field === "password"
            ? showPassword
              ? "text"
              : "password"
            : type === "date"
            ? "date"
            : field
        }
        defaultValue={defaultValue}
        variant="outlined"
        size={size}
        placeholder={placeholder}
        helperText={helperText}
        onChange={onChange}
        disabled={disabled}
        sx={{
          mb: 2,
          "& .MuiInputBase-input": {
            textAlign: field === "button" ? "left" : "inherit",
          },
          "& .MuiInputBase-root": {
            justifyContent: field === "button" ? "space-between" : "inherit",
          },
        }}
        InputLabelProps={{ shrink: shrink }}
        slotProps={{
          htmlInput: {
            maxLength: maxLength,
          },
          input: {
            startAdornment: (field === "email" || field === "password") && (
              <InputAdornment position="start">
                {field === "email" && <MailIcon fontSize="medium" />}
                {field === "password" && <PasswordIcon />}
              </InputAdornment>
            ),
            endAdornment:
              field === "password" ? (
                <InputAdornment
                  position="end"
                  onClick={handleTogglePassword}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? <CloseEye /> : <OpenEye />}
                </InputAdornment>
              ) : field === "button" ? (
                <InputAdornment position="end">
                  <Button
                    variant="outlined"
                    startIcon={icon}
                    size="small"
                    onClick={handleClickOpen}
                  >
                    {button}
                  </Button>
                </InputAdornment>
              ) : (
                type === "color" && (
                  <InputAdornment position="end">
                    <Box
                      sx={{
                        width: 45,
                        height: 20,
                        borderRadius: 1,
                        backgroundColor: selectedColor || "red",
                        cursor: "pointer",
                      }}
                      onClick={handleSelectColor}
                    />
                  </InputAdornment>
                )
              ),
          },
        }}
      />
    </Stack>
  );
};

export default CustomTextField;
