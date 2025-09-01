import { useNavigate } from "react-router-dom";
import { Flex, Group } from "@mantine/core";
import PropTypes from "prop-types";
import { ChevronRight } from "react-feather";
import { convertToCamelCase } from "../../utils/utilFunction";

const FormHeader = ({ data }) => {
  const navigate = useNavigate();
  return (
    <Flex
      m={0}
      justify="flex-start"
      align="center"
      direction="row"
      gap={16}
      px={24}
      style={{ borderBottom: "1px solid #e0e0e0" }}
    >
      {data.map((item, index) => (
        <Group key={index}>
          <h2
            onClick={() =>
              index === 0 && navigate(`/${convertToCamelCase(item)}`)
            }
            style={{
              color: index === 0 ? "rgba(169, 169, 169, 1)" : "black",
              cursor: index === 0 ? "pointer" : "default",
            }}
          >
            {item}
          </h2>
          {index < data.length - 1 && (
            <ChevronRight color="#A9A9A9" size={32} />
          )}
        </Group>
      ))}
    </Flex>
  );
};
export default FormHeader;

FormHeader.propTypes = {
  data: PropTypes.array.isRequired,
};
