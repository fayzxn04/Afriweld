import {
  Button,
  Flex,
  Stack,
  Text,
  TextInput,
  PasswordInput,
  Center,
} from "@mantine/core";
import { useState } from "react";
import { getPortalUser } from "../services/user";
import { signInUser } from "../services/auth";
import { useDispatch } from "react-redux";
import { setAppUser } from "../redux/reducers/appReducer";
import { useNavigate } from "react-router-dom";
import { companyColor } from "../utils/utilConst";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    setIsError(false);
    setLoading(true);
    try {
      const res = await signInUser(email, password);
      const userExist = await getPortalUser(res.uid);
      if (!userExist) {
        setIsError(true);
        return;
      }
      dispatch(setAppUser(userExist));
      navigate("/", { replace: true });
    } catch (err) {
      setIsError(true);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" gap={40} w={350}>
      <Text fz={24} fw={600}>
        Log In
      </Text>
      <form onSubmit={loginHandler}>
        <Stack className="login-form">
          <TextInput
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => {
              setIsError(false);
              setEmail(event.currentTarget.value);
            }}
          />
          <PasswordInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => {
              setIsError(false);
              setPassword(event.currentTarget.value);
            }}
            error={
              password &&
              password.length < 6 &&
              "Password must be at least 6 characters"
            }
          />
          <Text
            c={companyColor}
            fz={14}
            fw={600}
            onClick={() => navigate("/user/resetPassword")}
            style={{ cursor: "pointer" }}
          >
            Forgot Password?
          </Text>
        </Stack>
        <Button
          w="100%"
          color={companyColor}
          p={16}
          h={56}
          mt={40}
          type="submit"
          loading={loading}
          disabled={password.length < 6 || !email.includes("@")}
        >
          LOGIN
        </Button>
      </form>
      <Center>
        {isError && (
          <Text c="red" fw={600}>
            Invalid Credentials
          </Text>
        )}
      </Center>
    </Flex>
  );
};

export default Login;
