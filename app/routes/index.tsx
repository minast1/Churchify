import React from "react";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import theme from "~/src/theme";
import Box from "@mui/material/Box";
import {
  ActionFunction,
  json,
  Link,
  LoaderFunction,
  Session,
  useLoaderData,
} from "remix";
import SubmitButton from "~/src/SubmitButton";
import { FormInputText } from "~/src/FormInputText";
import { authenticator } from "~/lib/auth.server";
import { commitSession, getSession } from "~/lib/session.server";
import FormHelperText from "@mui/material/FormHelperText";
import { memberLoginValidator } from "~/src/constants";
import { ValidatedForm } from "remix-validated-form";
//import Button from "@mui/material/Button";

const MemberSignIn = () => {
  const { error } = useLoaderData();
  return (
    <Container component="main" maxWidth="xs" sx={{ pt: 10 }}>
      <CssBaseline />
      <Paper
        sx={{
          //marginTop: theme.spacing(8),
          p: theme.spacing(3),
          backgroundColor: "background.paper",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        elevation={5}
        square
      >
        <Avatar
          sx={{ margin: theme.spacing(1), width: 80, height: 80 }}
          alt="ItsaLogo"
          src="/avatar-1.jpg"
        />
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>
        <Box
          sx={{ width: "90%", mt: theme.spacing(1) }}
          method="post"
          id="member_signIn"
          validator={memberLoginValidator}
          component={ValidatedForm}
        >
          <FormInputText name="email" label="Email" styles={{ mt: 2 }} />
          {error && (
            <FormHelperText
              sx={{
                color: "red",
              }}
            >
              {error.message}
            </FormHelperText>
          )}
          <FormInputText
            name="password"
            label="Password"
            type="password"
            styles={{ mt: 2 }}
          />

          <SubmitButton title="Sign In" formId="member_signIn" />

          <Grid container direction="column">
            <Grid item xs></Grid>
            <Grid item>
              <Link to="/register" style={{ color: "blue", fontSize: 13 }}>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
            <Grid item>
              <Link to="/admin/?index" style={{ color: "blue", fontSize: 13 }}>
                Admin SignIn
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default MemberSignIn;

export const loader: LoaderFunction = async ({ request }) => {
  let session: Session = await getSession(request.headers.get("cookie"));
  let error = session.get(authenticator.sessionErrorKey);
  const data = json(
    { error },
    {
      headers: {
        // only necessary with cookieSessionStorage
        "Set-Cookie": await commitSession(session),
      },
    }
  );
  return data;
};

export const action: ActionFunction = async ({ request }) => {
  await authenticator.authenticate("user-pass", request, {
    successRedirect: "/members/",
    failureRedirect: "/",
  });

  return null;
};
