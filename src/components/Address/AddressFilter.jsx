/** @format */

import { Flex, TextInput } from "@mantine/core";
import { Search } from "react-feather";

const AddressFilter = ({ filters, setFilters }) => {
  return (
    <Flex
      justify={"space-between"}
      align={"center"}
      px={24}
      py={16}
      style={{ borderTop: "1px solid #e0e0e0" }}
      gap={16}
    >
      <TextInput
        w={360}
        placeholder="Search Address by name"
        value={filters.searchQuery}
        onChange={(e) =>
          setFilters({
            searchQuery: e.currentTarget.value,
          })
        }
        leftSection={<Search size={18} />}
      />
    </Flex>
  );
};

export default AddressFilter;
