import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Textarea } from "./textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-[331px]">
      <Textarea
        label="Label"
        placeholder="Placeholder"
        helperText="Helper text"
      />
    </div>
  ),
};

export const WithValue: Story = {
  render: () => (
    <div className="w-[331px]">
      <Textarea
        label="Label"
        placeholder="Placeholder"
        defaultValue="This is some text content that the user has entered into the textarea."
        helperText="Helper text"
      />
    </div>
  ),
};

export const WithCharacterCount: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="w-[331px]">
        <Textarea
          label="Label"
          placeholder="Enter your message..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={100}
          showCount
          helperText="Helper text"
        />
      </div>
    );
  },
};

export const WithClearButton: Story = {
  render: () => {
    const [value, setValue] = useState(
      "This is some text that can be cleared by clicking the X button."
    );
    return (
      <div className="w-[331px]">
        <Textarea
          label="Label"
          placeholder="Placeholder"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onClear={() => setValue("")}
          helperText="Helper text"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="w-[331px]">
      <Textarea
        label="Label"
        placeholder="Placeholder"
        disabled
        helperText="Helper text"
      />
    </div>
  ),
};

export const ErrorState: Story = {
  render: () => (
    <div className="w-[331px]">
      <Textarea
        label="Label"
        placeholder="Placeholder"
        defaultValue="This text has an error."
        error
        helperText="Helper text"
      />
    </div>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="w-[1200px] space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <h4 className="mb-2 text-sm font-medium">Default</h4>
          <Textarea
            label="Label"
            placeholder="Placeholder"
            helperText="Helper text"
          />
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium">Typing</h4>
          <Textarea
            label="Label"
            placeholder="Placeholder"
            defaultValue="User is typing..."
            helperText="Helper text"
          />
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium">Filled</h4>
          <Textarea
            label="Label"
            placeholder="Placeholder"
            defaultValue="This is filled content that the user has entered."
            helperText="Helper text"
          />
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium">Disabled</h4>
          <Textarea
            label="Label"
            placeholder="Placeholder"
            disabled
            helperText="Helper text"
          />
        </div>
        <div>
          <h4 className="mb-2 text-sm font-medium">Error</h4>
          <Textarea
            label="Label"
            placeholder="Placeholder"
            defaultValue="Invalid content."
            error
            helperText="Helper text"
          />
        </div>
      </div>
    </div>
  ),
};

export const RealWorldExample: Story = {
  render: () => {
    const [feedback, setFeedback] = useState("");
    const [description, setDescription] = useState("");
    const [notes, setNotes] = useState(
      "These are some existing notes that were previously saved."
    );
    const [comment, setComment] = useState("");
    const [commentError, setCommentError] = useState(false);

    const validateComment = (text: string) => {
      if (text.length > 0 && text.length < 10) {
        setCommentError(true);
      } else {
        setCommentError(false);
      }
    };

    return (
      <div className="w-[600px] space-y-6">
        <h3 className="text-lg font-semibold">Feedback Form</h3>

        <Textarea
          label="General Feedback"
          placeholder="Share your thoughts..."
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          onClear={() => setFeedback("")}
          maxLength={500}
          showCount
          helperText="Tell us what you think about our service"
        />

        <Textarea
          label="Description"
          placeholder="Describe the issue or suggestion..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          helperText="Be as detailed as possible"
        />

        <Textarea
          label="Additional Notes"
          placeholder="Any additional information..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          onClear={() => setNotes("")}
          helperText="Optional notes or comments"
        />

        <Textarea
          label="Public Comment"
          placeholder="Write your comment (minimum 10 characters)..."
          value={comment}
          onChange={(e) => {
            setComment(e.target.value);
            validateComment(e.target.value);
          }}
          error={commentError}
          maxLength={200}
          showCount
          helperText={
            commentError
              ? "Comment must be at least 10 characters"
              : "This will be visible to other users"
          }
        />

        <Textarea
          label="Admin Notes"
          placeholder="Internal notes (disabled)"
          defaultValue="This field is locked for regular users."
          disabled
          helperText="Contact administrator to edit"
        />
      </div>
    );
  },
};
