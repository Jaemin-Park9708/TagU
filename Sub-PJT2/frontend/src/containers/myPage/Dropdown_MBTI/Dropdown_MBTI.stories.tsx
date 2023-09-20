import { StoryObj, Meta } from "@storybook/react";
import Dropdown_MBTI from "./Dropdown_MBTI";

// eslint-disable-next-line storybook/story-exports
export default {
  title: "Dropdown_MBTI",
  component: Dropdown_MBTI,
} as Meta<typeof Dropdown_MBTI>;

type Story = StoryObj<typeof Dropdown_MBTI>;

const Template: Story = { 
  name: "Default",
  args: {},
  render: () => <Dropdown_MBTI />,
};

export const AppStory: Story = {
  ...Template,
  name: "태그명",
  args: { 
    ...Template.args,
  },
}; 
