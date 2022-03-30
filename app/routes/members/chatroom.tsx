import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import React from "react";
import BottomAppBar from "~/src/members/BottomAppBar";
import MessageBox from "~/src/members/MessageBox";

const ChatRoom = () => {
  return (
    <Box sx={{ minHeight: "100vh", background: 'url("/bg.jpg") repeat ' }}>
      <Container maxWidth="md" sx={{ pb: 2 }}>
        <Stack
          sx={{ pt: 4, pb: 10 }}
          spacing={2}
          alignItems="flex-start"
          direction="column-reverse"
        >
          <MessageBox
            name="Luka@Toni"
            time={new Date()}
            message="To be or not to be ; That is the question"
          />
          <MessageBox
            name="asampana@1234"
            time={new Date()}
            message="the height at which great  men reach today "
          />
          <MessageBox
            name="nanaKote31"
            time={new Date()}
            message="an african proverb innit"
          />
        </Stack>
      </Container>
      <BottomAppBar />
    </Box>
  );
};

export default ChatRoom;
