import React from "react";

import ArtistPage from "./ArtistPage.js";
import { iu as iuData, blackpink as blackpinkData } from "./TestData.js";

export default {
  title: "Example/ArtistPage",
  component: ArtistPage,
};

const Template = (args) => <ArtistPage {...args} />;

export const IU = Template.bind({});
IU.args = {
  data: iuData,
};

export const BLACKPINK = Template.bind({});
BLACKPINK.args = {
  data: blackpinkData,
};
