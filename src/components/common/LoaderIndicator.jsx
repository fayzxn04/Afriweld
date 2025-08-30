import { Center, Loader } from "@mantine/core";
import { companyColor } from "../../utils/utilConst";

const LoaderIndicator = () => {
  return (
    <Center style={{ height: "calc(100vh - 89px)" }}>
      <Loader color={companyColor} type="bars" />
    </Center>
  );
};

export default LoaderIndicator;
