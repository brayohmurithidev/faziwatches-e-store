import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import { TabContext, TabPanel } from "@mui/lab";

const TabsPanel = (props) => {
  const [value, setValue] = useState(props?.content[0]?.tabName);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <TabContext value={value}>
        <Tabs
          textColor="primary"
          indicatorColor="secondary"
          value={value}
          onChange={handleChange}
        >
          {props.content?.map((item, index) => (
            <Tab key={index} value={item.tabName} label={item.tabName} />
          ))}
        </Tabs>
        {props.content?.map((item, index) => (
          <TabPanel key={index} value={item.tabName}>
            {item.tabContent}
          </TabPanel>
        ))}
      </TabContext>
    </>
  );
};

export default TabsPanel;
