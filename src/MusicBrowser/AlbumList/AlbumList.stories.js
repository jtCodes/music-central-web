import React from "react";

import AlbumList from "./AlbumList.js";
import { commonCase } from "./TestData.js";

export default {
  title: "Example/AlbumList",
  component: AlbumList,
};

const Template = (args) => <AlbumList {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: commonCase[1],
  width: 340
};
