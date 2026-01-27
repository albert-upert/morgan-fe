# Storybook Documentation

Storybook has been successfully added to your React project!

## What is Storybook?

Storybook is a frontend workshop for building UI components and pages in isolation. It helps you develop and test components independently from your app's business logic and context.

## Getting Started

### Running Storybook

To start Storybook in development mode:

```bash
pnpm storybook
```

This will start Storybook on `http://localhost:6006`

### Building Storybook

To build a static version of Storybook:

```bash
pnpm build-storybook
```

The static files will be generated in the `storybook-static` directory.

## Project Structure

```
.storybook/
├── main.ts          # Storybook configuration
└── preview.ts       # Global decorators and parameters

src/
└── components/
    ├── badge/
    │   ├── badge.tsx
    │   ├── badge.stories.tsx
    │   └── index.ts
    ├── button/
    │   ├── button.tsx
    │   ├── button.stories.tsx
    │   └── index.ts
    ├── card/
    │   ├── card.tsx
    │   ├── card.stories.tsx
    │   └── index.ts
    └── ... (other components)
```

Each component has its own folder containing:

- The component file (e.g., `button.tsx`)
- The story file (e.g., `button.stories.tsx`)
- An index file for exports (e.g., `index.ts`)

## Writing Stories

Stories are written using the Component Story Format (CSF). Here's an example:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Button",
    variant: "default",
  },
};
```

## Features Included

- **Addon Essentials**: Controls, Actions, Viewport, Backgrounds, Toolbars, Measure, Outline
- **Addon Interactions**: Test user interactions within Storybook
- **Addon Onboarding**: Interactive guide for new users
- **Chromatic**: Visual testing integration
- **Tailwind CSS**: Your project's Tailwind styles are automatically included

## Creating Stories for Your Components

To create a story for any component:

1. Create a file named `ComponentName.stories.tsx` next to your component
2. Import your component and Storybook types
3. Define the meta object with component configuration
4. Export story variations

Example for a Card component:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./card";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // your props here
  },
};
```

## Tips

- Use the Controls addon to dynamically change component props
- Use the Actions addon to log component events
- Group related stories using the `title` field (e.g., "Components/Forms/Input")
- Add JSDoc comments to your component props for automatic documentation

## Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [Component Story Format](https://storybook.js.org/docs/api/csf)
- [Writing Stories](https://storybook.js.org/docs/writing-stories)
- [Storybook Addons](https://storybook.js.org/addons)
