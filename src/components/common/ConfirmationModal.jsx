import PropTypes from "prop-types";
import { Modal, Text, Space, Group, Button } from "@mantine/core";

const ConfirmationModal = ({
  showModal,
  setShowModal,
  onConfirm,
  loading,
  confirmText,
  children,
}) => {
  return (
    <Modal opened={showModal} onClose={() => setShowModal(false)}>
      <Text>{children}</Text>
      <Space h={10} />
      <Group>
        <Button
          variant="outline"
          color="gray"
          onClick={() => setShowModal(false)}
        >
          Back
        </Button>
        <Button color="red" loading={loading} onClick={onConfirm}>
          {confirmText}
        </Button>
      </Group>
    </Modal>
  );
};

ConfirmationModal.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  confirmText: PropTypes.string,
  children: PropTypes.node.isRequired,
};

ConfirmationModal.defaultProps = {
  loading: false,
  confirmText: "Confirm",
};

export default ConfirmationModal;
