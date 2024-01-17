import React, { useState } from "react";
import { Tab } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const TabsPanel = (props) => {
  const [value, setValue] = useState(props?.content[0]?.tabName);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <TabContext value={value}>
        <TabList value={value} onChange={handleChange}>
          {props.content?.map((item, index) => (
            <Tab key={index} value={item.tabName} label={item.tabName} />
          ))}
        </TabList>
        {props.content?.map((item, index) => (
          <TabPanel value={item.tabName}>{item.tabContent}</TabPanel>
        ))}
      </TabContext>
    </>
  );
};

export default TabsPanel;
