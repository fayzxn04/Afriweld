import {
  Button,
  Center,
  Flex,
  Image,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetLoginPassword } from "../services/auth";
import { getPortalUserByEmail } from "../services/user";
import { companyColor } from "../utils/utilConst";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const resetPasswordHandler = async (e) => {
    e.preventDefault();
    setIsError(false);
    setLoading(true);
    try {
      const userExist = await getPortalUserByEmail(email);
      if (!userExist) {
        setIsError(true);
        return;
      }
      const res = await resetLoginPassword(email);
      setIsReset(res);
    } catch (err) {
      setIsError(true);
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return isReset ? (
    <Flex direction="column" justify="center" align="center" gap={40} w={350}>
      <Image src="/right_sign.webp" w={174} />
      <Stack justify="center" align="center" gap={8}>
        <Text fz={24} fw={600}>
          Email sent successfully
        </Text>
        <Text fz={14} fw={500}>
          Check your email ID to reset your password
        </Text>
      </Stack>
      <Button
        w="100%"
        color={companyColor}
        p={16}
        h={56}
        onClick={() => navigate("/user/login", { replace: true })}
        loading={loading}
      >
        LOGIN
      </Button>
    </Flex>
  ) : (
    <Flex direction="column" gap={40} w={350}>
      <Text fz={24} fw={600}>
        Reset Password
      </Text>
      <form onSubmit={resetPasswordHandler}>
        <Stack>
          <TextInput
            type="email"
            label="Email Address"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => {
              setIsError(false);
              setEmail(event.currentTarget.value);
            }}
            className="reset-form"
            error={isError && "No user exists with this email"}
          />
          <Button
            color={companyColor}
            p={16}
            h={56}
            loading={loading}
            type="submit"
            disabled={!emailRegex.test(email)}
          >
            Reset Password
          </Button>
        </Stack>
      </form>
      <Center>
        <Text fz={14} fw={600} color="#A9A9A9" style={{ cursor: "pointer" }}>
          Already a user?{" "}
          <span
            style={{ color: companyColor }}
            onClick={() => navigate("/user/login")}
          >
            Login
          </span>
        </Text>
      </Center>
    </Flex>
  );
};

export default ResetPassword;
