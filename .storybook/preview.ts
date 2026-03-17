import type { Preview } from "@storybook/react";

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ["Welcome", "RRuleBuilder", "*", "End"],
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
