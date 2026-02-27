import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import RepeatDaily from "../RepeatDaily";
import useBuilderStore, { BuilderStoreProvider } from "../../../store/builderStore";

export default {
  title: "Repeat/RepeatDaily",
  component: RepeatDaily,
  decorators: [(Story: React.ComponentType) => (<BuilderStoreProvider><Story /></BuilderStoreProvider>)],
  argTypes: {
    inputSize: {
      control: "select",
      options: ["small", "medium"],
    },
    inputVariant: {
      control: "select",
      options: ["standard", "outlined", "filled"],
    },
  },
  args: {
    inputSize: "small",
    inputVariant: "outlined",
  },
} as Meta<typeof RepeatDaily>;

const Template: StoryFn<typeof RepeatDaily> = () => {
  const builderStore = useBuilderStore();
  return (
    <RepeatDaily value={builderStore.repeatDetails} onChange={builderStore.setRepeatDetails} inputVariant="outlined" inputSize="small" />
  );
};

export const Primary = Template;
