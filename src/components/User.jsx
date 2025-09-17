import { Center, AppShell, Image, Flex } from "@mantine/core";
import { Outlet } from "react-router-dom";

const User = () => {
  return (
    <AppShell h={"100vh"} w={"100vw"} p={0}>
      <Flex h={"100%"}>
        <Center w={"60%"} bg="black" h={"100%"}>
          <Image src="/logo.png" alt="Kai Vista Logo" />
        </Center>
        <Center w={"40%"} h={"100%"}>
          <Outlet />
        </Center>
      </Flex>
    </AppShell>
  );
};

export default User;
