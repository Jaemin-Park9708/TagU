import { StoryObj, Meta } from "@storybook/react";
import Main from "./Main";

export default {
  title: "Main",
  component: Main,
} as Meta<typeof Main>;

type Story = StoryObj<typeof Main>;

const Template: Story = {
  name: "Default",
  args: {},
  render: () => <Main />,
};

export const AppStory: Story = {
  ...Template,
  name: "태그명",
  args: {
    ...Template.args,
  },
};
