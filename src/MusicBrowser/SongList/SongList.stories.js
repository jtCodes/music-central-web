import React from "react";

import SongList from "./SongList.js";
import { commonCase } from "./TestData.js";

export default {
  title: "Example/SongList",
  component: SongList,
};

const Template = (args) => <SongList {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: commonCase[1],
};
