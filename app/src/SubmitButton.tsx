import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import theme from "~/src/theme";
import { useIsSubmitting } from "remix-validated-form";
//import { useMediaQuery, useTheme } from "@mui/material";

type AppProps = {
  formId: string;
  title: string;
  styles?: {};
  value?: string;
};

const SubmitButton = ({ formId, title, styles, value }: AppProps) => {
  const isSubmitting = useIsSubmitting(formId);
  //console.log(formId);

  return (
    <Button
      type="submit"
      fullWidth
      name="button"
      size="small"
      value={value}
      variant="contained"
      color="primary"
      sx={{
        ...styles,
        margin: theme.spacing(3, 0, 2),
      }}
    >
      {isSubmitting ? <CircularProgress color="inherit" size={20} /> : title}
    </Button>
  );
};

export default SubmitButton;
