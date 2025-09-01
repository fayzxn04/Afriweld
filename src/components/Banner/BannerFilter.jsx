import React from "react";
import { BannerType } from "../../utils/utilConst";
import { Flex, Group, Select, Text } from "@mantine/core";

const BannerFilter = ({ filters, setFilters }) => {
  const bannerTypesDropDown = [
    {
      label: "All",
      value: "All",
    },
    ...BannerType,
  ];
  return (
    <Flex
      justify="space-between"
      align="center"
      px={24}
      py={16}
      style={{ borderTop: "1px solid #e0e0e0" }}
      gap={16}
    >
      <Group>
        <Text fz={14} fw={600}>
          Filter By:
        </Text>
        <Select
          value={filters.bannerType}
          onChange={(val) => {
            setFilters({ bannerType: val });
          }}
          data={bannerTypesDropDown}
        />
      </Group>
    </Flex>
  );
};

export default BannerFilter;
