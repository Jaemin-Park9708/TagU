import { StoryObj, Meta } from "@storybook/react";
import RightContainer from "./index";

export default {
  title: "RightContainer",
  component: RightContainer,
} as Meta<typeof RightContainer>;

type Story = StoryObj<typeof RightContainer>;

const Template: Story = {
  name: "Default",
  args: {},
  render: () => <RightContainer />,
};

export const AppStory: Story = {
  ...Template,
  name: "태그명",
  args: {
    ...Template.args,
  },
};
