import { Button, Flex, Modal, Text, Group, Space } from "@mantine/core";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  ArrowLeft,
  PlusSquare,
  RefreshCcw,
  Trash2,
  Upload,
} from "react-feather";
// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { companyColor } from "../../utils/utilConst";

const FormFooter = ({ data, resetHandler, addHandler, loading, page }) => {
  //   const { user } = useSelector((state) => state.app);
  const navigate = useNavigate();
  //   const [showDeleteBtn, setShowDeleteBtn] = useState(true);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalUpdate, setShowModalUpdate] = useState(false);

  //   useEffect(() => {
  //     if (user?.role === "staff") {
  //       setShowDeleteBtn(false);
  //     }
  //   }, [user, data]);
  return (
    <Flex
      justify="space-between"
      p={24}
      style={{ borderTop: "1px solid #e0e0e0" }}
    >
      <Button
        variant="outline"
        color="#A9A9A9"
        p={16}
        h={52}
        onClick={() => navigate(-1)}
        leftSection={<ArrowLeft size={16} />}
      >
        Go Back
      </Button>
      <Flex gap={20}>
        <Button
          color="black"
          p={16}
          h={52}
          leftSection={
            data[1].includes("Add") ? (
              <RefreshCcw size={16} />
            ) : (
              <Trash2 size={16} />
            )
          }
          onClick={
            data[1].includes("Add")
              ? resetHandler
              : () => setShowModalDelete(true)
          }
          loading={data[1].includes("Add") ? "" : loading.delete}
          //   disabled={!data[1].includes("Add") && !showDeleteBtn}
        >
          {data[1].includes("Add") ? `Reset ${page}` : `Delete ${page}`}
        </Button>
        <Button
          color={companyColor}
          p={16}
          h={52}
          leftSection={
            data[1].includes("Add") ? (
              <PlusSquare size={16} />
            ) : (
              <Upload size={16} />
            )
          }
          onClick={
            data[1].includes("Add")
              ? addHandler
              : () => setShowModalUpdate(true)
          }
          loading={data[1].includes("Add") ? loading.add : loading.edit}
        >
          {data[1].includes("Add") ? data[1] : `Update ${page}`}
        </Button>
      </Flex>
      <Modal opened={showModalDelete} onClose={() => setShowModalDelete(false)}>
        <Text>Are you sure you want to delete the {page}?</Text>
        <Space h={10} />
        <Group>
          <Button
            variant="outline"
            color="gray"
            onClick={() => setShowModalDelete(false)}
          >
            Back
          </Button>
          {/* <Button
            color="red"
            onClick={() => {
              deleteHandler();
              setShowModalDelete(false);
            }}
          >
            Delete
          </Button> */}
        </Group>
      </Modal>
      <Modal opened={showModalUpdate} onClose={() => setShowModalUpdate(false)}>
        <Text>Are you sure you want to update the {page}?</Text>
        <Space h={10} />
        <Group>
          <Button
            variant="outline"
            color="gray"
            onClick={() => setShowModalUpdate(false)}
          >
            Back
          </Button>
          {/* <Button
            color={companyColor}
            onClick={() => {
              updateHandler();
              setShowModalUpdate(false);
            }}
          >
            Update
          </Button> */}
        </Group>
      </Modal>
    </Flex>
  );
};

export default FormFooter;

FormFooter.propTypes = {
  data: PropTypes.array.isRequired,
  resetHandler: PropTypes.func,
  addHandler: PropTypes.func,
  loading: PropTypes.object,
  //   deleteHandler: PropTypes.func,
  //   updateHandler: PropTypes.func,
  page: PropTypes.string,
};
