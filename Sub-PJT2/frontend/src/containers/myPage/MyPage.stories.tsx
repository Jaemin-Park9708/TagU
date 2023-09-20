import { StoryObj, Meta } from "@storybook/react";
import MyPage from "./MyPage";

// eslint-disable-next-line storybook/story-exports
export default {
  title: "MyPage",
  component: MyPage,
} as Meta<typeof MyPage>;

type Story = StoryObj<typeof MyPage>;
 
const Template: Story = {
  name: "Default",
  args: {},
  render: () => <MyPage />,
};

export const AppStory: Story = {
  ...Template,
  name: "태그명",
  args: {
    ...Template.args,
  },
}; 
 