import { Outlet, Link, useLocation } from "react-router-dom";
import {
  AppShell,
  Avatar,
  Button,
  Center,
  Flex,
  Group,
  Image,
  NavLink,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import {
  Users,
  Tag,
  MapPin,
  Layers,
  Box,
  ShoppingCart,
  Headphones,
  Settings,
  Layout,
} from "react-feather";
import { companyColor } from "./utils/utilConst";
import Logo from "/logoBlack.png";

const App = () => {
  const location = useLocation();

  return (
    <div className="appWrapper">
      <AppShell
        navbar={{ width: "240px" }}
        main={{
          width: "calc(100vw - 240px)",
          height: "calc(100vh - 88px)",
        }}
      >
        <AppShell.Navbar>
          <Center h={70} mb={10}>
            <Link to="/">
              <Image
                src={Logo}
                alt="Kai Vista logo"
                w={200}
                h={40}
                fit="contain"
              />
            </Link>
          </Center>
          <ScrollArea h={"100vh"} px={"md"}>
            {navLinks.map((link) => (
              <NavLink
                key={link.id}
                label={link.name}
                leftSection={link.icon}
                active={location.pathname.startsWith(link.path)}
                // onClick={() => navigate(link.path)}
                fz="sm"
                fw={500}
                color={companyColor}
                mb={"xs"}
                style={{ borderRadius: "3px" }}
                component={Link}
                to={link.path}
              />
            ))}
          </ScrollArea>
          <Stack display="column" gap={0} align="center" p={"24px"}>
            <Text fz="sm" fw={700} c="black">
              Powered by
            </Text>
            <Link to="https://dotsyndicate.com/" target="_blank">
              <Image
                src="/dotsyndicateLogo.svg"
                alt="DotSyndicate Logo"
                w={178}
                h={32}
                fit="contain"
              />
            </Link>
          </Stack>
        </AppShell.Navbar>
        <AppShell.Main>
          <Flex
            h={88}
            display="row"
            justify="space-between"
            align="center"
            p={"24px"}
            bg="white"
            gap={16}
            style={{ borderBottom: "1px solid #e0e0e0" }}
          >
            <Button
              px={16}
              py={8}
              h={42}
              variant="outline"
              color={companyColor}
              // onClick={logoutHandler}
            >
              Logout
            </Button>
            <Group>
              <Stack gap={0} align="flex-end">
                <Text fz={14}>
                  {/* {user?.name} */}
                  Hello
                </Text>
                <Text fz={14} fw={600}>
                  {/* {user?.role} */} Admin
                </Text>
              </Stack>
              <Avatar size={60} radius="xl" />
            </Group>
          </Flex>
          <Outlet />
        </AppShell.Main>
      </AppShell>
      {/* )} */}
    </div>
  );
};

export default App;

const navLinks = [
  {
    id: 1,
    name: "Users",
    path: "/users",
    icon: <Users />,
  },

  {
    id: 2,
    name: "Address",
    path: "/address",
    icon: <MapPin />,
  },

  {
    id: 3,
    name: "Categories",
    path: "/categories",
    icon: <Layers />,
  },

  {
    id: 4,
    name: "Banners",
    path: "/banners",
    icon: <Layout />,
  },

  {
    id: 5,
    name: "Product",
    path: "/products",
    icon: <Box />,
  },

  {
    id: 6,
    name: "Coupon",
    path: "/coupons",
    icon: <Tag />,
  },

  {
    id: 7,
    name: "Orders",
    path: "/orders",
    icon: <ShoppingCart />,
  },

  {
    id: 8,
    name: "Support",
    path: "/support",
    icon: <Headphones />,
  },

  {
    id: 9,
    name: "Settings",
    path: "/settings",
    icon: <Settings />,
  },
];
