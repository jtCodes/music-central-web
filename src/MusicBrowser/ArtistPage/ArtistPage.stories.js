import React from "react";

import ArtistPage from "./ArtistPage.js";

export default {
  title: "Example/ArtistPage",
  component: ArtistPage,
};

const Template = (args) => <ArtistPage {...args} />;

export const Default = Template.bind({});
Default.args = {};
