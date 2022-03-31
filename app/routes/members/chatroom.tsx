import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import React from "react";
import BottomAppBar from "~/src/members/BottomAppBar";
import MessageBox from "~/src/members/MessageBox";
import { ActionFunction, json, LoaderFunction, useLoaderData } from "remix";
import { getSession } from "~/lib/session.server";
import {
  createMessage,
  getDenominationMessages,
  MessageWithUserType,
} from "~/controllers/messageController";
import { Denomination, User } from "@prisma/client";

const ChatRoom = () => {
  const messages = useLoaderData<MessageWithUserType>();

  return (
    <Box sx={{ minHeight: "100vh", background: 'url("/bg.jpg") repeat ' }}>
      <Container maxWidth="md" sx={{ pb: 2 }}>
        <Stack
          sx={{ pt: 4, pb: 10 }}
          spacing={2}
          alignItems="flex-start"
          direction="column-reverse"
        >
          {messages?.map((message) => (
            <MessageBox
              key={message.id}
              name={message.user.name}
              time={message.createdAt}
              message={message.body}
            />
          ))}
        </Stack>
      </Container>
      <BottomAppBar />
    </Box>
  );
};

export default ChatRoom;

export const loader: LoaderFunction = async ({ request }) => {
  // If the user is already authenticated redirect to /dashboard directly
  const session = await getSession(request.headers.get("Cookie"));
  const user: Omit<User, "password"> = session.get("user");

  const messages = await getDenominationMessages(user.denomination);
  return json<MessageWithUserType>(messages);
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const body = formData.get("message") as string;
  const userId = formData.get("userId") as string;
  const denomination = formData.get("denomination") as Denomination;

  return await createMessage({ body, userId, denomination });
};
