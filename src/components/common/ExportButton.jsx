import { Button } from "@mantine/core";
import { CSVLink } from "react-csv";
import { Download } from "react-feather";
import PropTypes from "prop-types";

const ExportButton = ({ filename, data }) => {
  return (
    <div>
      <CSVLink data={data} filename={`${filename}_${Date.now()}`}>
        <Button variant="outline" color="#1A0F00" leftSection={<Download />}>
          Export Data
        </Button>
      </CSVLink>
    </div>
  );
};

ExportButton.propTypes = {
  filename: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default ExportButton;
