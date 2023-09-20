import { StoryObj, Meta } from "@storybook/react";
import Dropdown_Adr from "./Dropdown_Adr";

// eslint-disable-next-line storybook/story-exports
export default {
  title: "Dropdown_Adr",
  component: Dropdown_Adr,
} as Meta<typeof Dropdown_Adr>;

type Story = StoryObj<typeof Dropdown_Adr>;
 
const Template: Story = {
  name: "Default", 
  args: {},
  render: () => <Dropdown_Adr />, 
};

export const AppStory: Story = {
  ...Template,
  name: "태그명",
  args: {
    ...Template.args,
  },
};
