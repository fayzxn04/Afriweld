/** @format */

import PropTypes from "prop-types";
import { Flex, TextInput, Button, FileButton } from "@mantine/core";

const FileUpload = ({
  file,
  data,
  setFile,
  setModalImage,
  setOpenModal,
  name,
  mediaType = "Image",
  imageLoading = false,
  multiple = false,
}) => {
  const handleClick = () => {
    if (data !== "") {
      setModalImage(data);
    } else {
      setModalImage(URL.createObjectURL(file));
    }
    setOpenModal(true);
  };

  return (
    <Flex display="column" justify={"start"} align={"end"} w="100%">
      {!multiple && (
        <TextInput
          required
          label={`Upload ${mediaType}`}
          placeholder="File Name"
          defaultValue={file?.name ? file.name : file}
          w={"75%"}
          onClick={handleClick}
        />
      )}
      {imageLoading ? (
        <Button color="black" w={200} disabled>
          Loading...
        </Button>
      ) : (
        <FileButton
          onChange={setFile}
          accept={
            mediaType.split(" ").includes("Image")
              ? "image/*"
              : "video/*, image/*"
          }
          w="25%"
          name={name}
          multiple={multiple}
        >
          {(props) => (
            <Button {...props} color="black" w={200} disabled={imageLoading}>
              Click to Upload
            </Button>
          )}
        </FileButton>
      )}
    </Flex>
  );
};

FileUpload.propTypes = {
  file: PropTypes.object,
  data: PropTypes.string,
  setFile: PropTypes.func.isRequired,
  setModalImage: PropTypes.func,
  setOpenModal: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  mediaType: PropTypes.string,
  imageLoading: PropTypes.bool,
  multiple: PropTypes.bool,
};

export default FileUpload;
