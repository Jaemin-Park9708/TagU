import { StoryObj, Meta } from "@storybook/react";
import Test from "./Test";

// eslint-disable-next-line storybook/story-exports
export default {
  title: "Test",
  component: Test,
} as Meta<typeof Test>;

type Story = StoryObj<typeof Test>;

const Template: Story = {
  name: "Default",
  args: {},
  render: () => <Test />,
};

export const AppStory: Story = {
  ...Template,
  name: "태그명",
  args: {
    ...Template.args,
  },
};
