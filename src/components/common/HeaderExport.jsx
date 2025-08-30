import { Button, Flex, Group, Text } from "@mantine/core";
import ExportButton from "./ExportButton";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { PlusSquare } from "react-feather";
import { companyColor } from "../../utils/utilConst";

const HeaderExport = ({
  data,
  page,
  link,
  setShowModal,
  showDeleteBtn,
  hasButtonAccess,
}) => {
  const navigate = useNavigate();
  return (
    <Flex px={24} py={16} justify="space-between" align="center">
      <Text fz={24} fw={600}>
        {page}
      </Text>
      <Group>
        {hasButtonAccess && (
          <>
            <Button
              variant="outline"
              color="red"
              onClick={() => setShowModal(true)}
              disabled={!showDeleteBtn}
            >
              Delete {page}
            </Button>
            <Button
              variant="outline"
              color={companyColor}
              onClick={() => navigate(link)}
              leftSection={<PlusSquare />}
            >
              Add {page}
            </Button>
          </>
        )}
        <ExportButton data={data} filename={page.toLowerCase()} />
      </Group>
    </Flex>
  );
};

HeaderExport.propTypes = {
  data: PropTypes.array.isRequired,
  page: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  setShowModal: PropTypes.func.isRequired,
  showDeleteBtn: PropTypes.bool,
  hasButtonAccess: PropTypes.bool,
};

export default HeaderExport;
