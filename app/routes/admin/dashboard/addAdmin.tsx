import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import { denominations, memberSignupValidator } from "~/src/constants";
import { ValidatedForm } from "remix-validated-form";
//import { FormHelperText } from "@mui/material";
import { FormInputText } from "~/src/FormInputText";
import SubmitButton from "~/src/SubmitButton";
//import { useMediaQuery, useTheme } from "@mui/material";
import { FormInputDropdown } from "~/src/FormInputDropdown";
import { Denomination, Role, User } from "@prisma/client";
import theme from "~/src/theme";
import { ActionFunction, Link, useActionData } from "remix";
import { uploadAvatar } from "~/lib/avatarHandler.server";
import toast, { Toaster } from "react-hot-toast";
import { Alert } from "~/src/components/CustomAlert";

const AddAdmin = () => {
  const data = useActionData<Omit<User, "password">>();

  React.useEffect(() => {
    data &&
      toast.custom(
        <Alert severity="success">
          {`New admin ${data.name} added successfully`}{" "}
        </Alert>,
        {
          position: "bottom-right",
        }
      );
  }, [data]);
  //const theme = useTheme();
  return (
    <Container maxWidth="lg" sx={{ mt: 12 }}>
      <Card square>
        <CardHeader
          title={
            <Box display="flex" alignItems="center">
              <Typography sx={{ fontSize: 17, fontWeight: "bold" }}>
                Add New Admin
              </Typography>
            </Box>
          }
          action={
            <Button
              component={Link}
              to="/admin/dashboard"
              size="small"
              variant="contained"
              sx={{ textTransform: "capitalize" }}
            >
              Back to dashboard
            </Button>
          }
        />

        <CardContent sx={{ borderTop: "1px solid lightgray" }}>
          <Container maxWidth="sm">
            <Box
              sx={{
                width: "100%",
                mt: theme.spacing(1),
              }}
              method="post"
              resetAfterSubmit={true}
              encType="multipart/form-data"
              defaultValues={{
                denomination: "PENSA",
              }}
              id="member_signup"
              validator={memberSignupValidator}
              component={ValidatedForm}
            >
              <FormInputText name="name" label="User Name" />
              <FormInputText name="email" label="Email" styles={{ mt: 2 }} />
              {/*error && (
                <FormHelperText sx={{ color: "red" }}>
                  {error.message}
                </FormHelperText>
              )*/}
              <FormInputText
                name="password"
                label="Password"
                type="password"
                styles={{ mt: 2 }}
              />
              <FormInputText
                name="confirm"
                label="Password Confirmation"
                type="password"
                styles={{ mt: 2, mb: 2 }}
              />

              <FormInputDropdown
                name="denomination"
                styles={{ width: "100%" }}
                label="Denomination"
                options={denominations.map(
                  (item: Denomination, index: number) => {
                    return { label: item, value: item };
                  }
                )}
              />
              <input
                name="role"
                defaultValue={"ADMIN" as Role}
                style={{ display: "none" }}
              />
              <Input name="avatar" type="file" sx={{ mt: 2 }} />
              <SubmitButton title="Register Admin" formId="member_signup" />
            </Box>
          </Container>
        </CardContent>
      </Card>
      <Toaster />
    </Container>
  );
};

export default AddAdmin;

export const action: ActionFunction = async ({ request }) => {
  const formData = await uploadAvatar(request);

  return formData;
};
