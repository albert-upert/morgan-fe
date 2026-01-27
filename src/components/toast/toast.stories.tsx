import type { Meta, StoryObj } from "@storybook/react";
import { useCallback } from "react";
import type { FormEvent } from "react";
import { Button } from "@/components/button";
import { Toaster, toast } from "./toast";

const meta = {
  title: "Components/Toast",
  component: Toaster,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="space-y-4">
      <Toaster />
      <Button
        onClick={() =>
          toast.default("This is a default toast notification", {
            action: {
              label: "Oke",
              onClick: () => {},
            },
          })
        }
      >
        Show Default Toast
      </Button>
    </div>
  ),
};

export const Error: Story = {
  render: () => (
    <div className="space-y-4">
      <Toaster />
      <Button
        onClick={() =>
          toast.error("An error occurred while processing your request", {
            action: {
              label: "Oke",
              onClick: () => {},
            },
          })
        }
        variant="destructive"
      >
        Show Error Toast
      </Button>
    </div>
  ),
};

export const Success: Story = {
  render: () => (
    <div className="space-y-4">
      <Toaster />
      <Button
        onClick={() =>
          toast.success("Your changes have been saved successfully", {
            action: {
              label: "Oke",
              onClick: () => {},
            },
          })
        }
      >
        Show Success Toast
      </Button>
    </div>
  ),
};

export const Info: Story = {
  render: () => (
    <div className="space-y-4">
      <Toaster />
      <Button
        onClick={() =>
          toast.info("Please check your email for verification", {
            action: {
              label: "Oke",
              onClick: () => {},
            },
          })
        }
      >
        Show Info Toast
      </Button>
    </div>
  ),
};

export const Warning: Story = {
  render: () => (
    <div className="space-y-4">
      <Toaster />
      <Button
        onClick={() =>
          toast.warning("Your session will expire in 5 minutes", {
            action: {
              label: "Oke",
              onClick: () => {},
            },
          })
        }
      >
        Show Warning Toast
      </Button>
    </div>
  ),
};

export const CustomAction: Story = {
  render: () => (
    <div className="space-y-4">
      <Toaster />
      <Button
        onClick={() =>
          toast.default("File uploaded successfully", {
            action: {
              label: "View",
              onClick: () => alert("Viewing file..."),
            },
          })
        }
      >
        Show Toast with Custom Action
      </Button>
    </div>
  ),
};

export const LongMessage: Story = {
  render: () => (
    <div className="space-y-4">
      <Toaster />
      <Button
        onClick={() =>
          toast.default(
            "This is a very long message that demonstrates how the toast component handles lengthy content. The message should wrap properly and maintain good readability.",
            {
              action: {
                label: "Oke",
                onClick: () => {},
              },
            }
          )
        }
      >
        Show Long Message Toast
      </Button>
    </div>
  ),
};

export const MultipleToasts: Story = {
  render: () => (
    <div className="space-y-4">
      <Toaster />
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => {
            toast.default("First notification");
            setTimeout(() => toast.info("Second notification"), 500);
            setTimeout(() => toast.success("Third notification"), 1000);
          }}
        >
          Show Multiple Toasts
        </Button>
        <Button onClick={() => toast.dismiss()} variant="outline">
          Dismiss All
        </Button>
      </div>
    </div>
  ),
};

export const AllTypes: Story = {
  render: () => (
    <div className="space-y-4">
      <Toaster />
      <h3 className="text-lg font-semibold">Toast Types</h3>
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => toast.default("Default notification")}
          variant="outline"
        >
          Default
        </Button>
        <Button
          onClick={() => toast.error("Error notification")}
          variant="destructive"
        >
          Error
        </Button>
        <Button
          onClick={() => toast.success("Success notification")}
          variant="primary"
        >
          Success
        </Button>
        <Button
          onClick={() => toast.info("Info notification")}
          variant="secondary"
        >
          Info
        </Button>
        <Button
          onClick={() => toast.warning("Warning notification")}
          variant="outline"
        >
          Warning
        </Button>
      </div>
    </div>
  ),
};

export const WithDuration: Story = {
  render: () => (
    <div className="space-y-4">
      <Toaster />
      <div className="flex flex-col gap-3">
        <Button
          onClick={() =>
            toast.default("This toast will dismiss in 2 seconds", {
              duration: 2000,
            })
          }
        >
          2 Second Duration
        </Button>
        <Button
          onClick={() =>
            toast.default("This toast will dismiss in 5 seconds", {
              duration: 5000,
            })
          }
        >
          5 Second Duration
        </Button>
        <Button
          onClick={() =>
            toast.default("This toast will stay until manually dismissed", {
              duration: Infinity,
            })
          }
        >
          Infinite Duration
        </Button>
      </div>
    </div>
  ),
};

export const RealWorldExample: Story = {
  render: () => {
    const handleSave = () => {
      toast.success("Profile updated successfully", {
        action: {
          label: "View",
          onClick: () => alert("Viewing profile..."),
        },
      });
    };

    const handleDelete = () => {
      toast.error("Failed to delete item", {
        action: {
          label: "Retry",
          onClick: () => alert("Retrying..."),
        },
      });
    };

    const handleUpload = () => {
      toast.default("Uploading file...", {
        duration: 2000,
      });
      setTimeout(() => {
        toast.success("File uploaded successfully", {
          action: {
            label: "View",
            onClick: () => alert("Viewing file..."),
          },
        });
      }, 2000);
    };

    return (
      <div className="w-[400px] space-y-6">
        <Toaster />
        <h3 className="text-lg font-semibold">User Actions</h3>

        <div className="rounded-lg border border-border bg-white p-4">
          <div className="mb-3">
            <h4 className="text-sm font-medium">Save Profile</h4>
            <p className="text-xs text-muted-foreground">
              Updates your profile information
            </p>
          </div>
          <Button onClick={handleSave} className="w-full">
            Save Changes
          </Button>
        </div>

        <div className="rounded-lg border border-border bg-white p-4">
          <div className="mb-3">
            <h4 className="text-sm font-medium">Delete Item</h4>
            <p className="text-xs text-muted-foreground">
              Permanently remove this item
            </p>
          </div>
          <Button
            onClick={handleDelete}
            variant="destructive"
            className="w-full"
          >
            Delete
          </Button>
        </div>

        <div className="rounded-lg border border-border bg-white p-4">
          <div className="mb-3">
            <h4 className="text-sm font-medium">Upload File</h4>
            <p className="text-xs text-muted-foreground">
              Upload a new document
            </p>
          </div>
          <Button onClick={handleUpload} className="w-full">
            Upload
          </Button>
        </div>
      </div>
    );
  },
};

export const FormValidationExample: Story = {
  render: () => {
    const handleSubmit = useCallback((event: FormEvent) => {
      event.preventDefault();
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      if (!email || !password) {
        toast.error("Please fill in all required fields", {
          action: {
            label: "Oke",
            onClick: () => {},
          },
        });
        return;
      }

      if (password.length < 8) {
        toast.error("Password must be at least 8 characters", {
          action: {
            label: "Oke",
            onClick: () => {},
          },
        });
        return;
      }

      toast.success("Account created successfully", {
        action: {
          label: "Login",
          onClick: () => alert("Redirecting to login..."),
        },
      });
      form.reset();
    }, []);

    return (
      <div className="w-[400px]">
        <Toaster />
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Create Account</h3>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input
                name="email"
                type="email"
                className="w-full rounded-md border border-input px-3 py-2 text-sm"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <input
                name="password"
                type="password"
                className="w-full rounded-md border border-input px-3 py-2 text-sm"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>
      </div>
    );
  },
};

export const LoadingExample: Story = {
  render: () => {
    const handleAsyncOperation = async () => {
      const toastId = toast.loading("Processing your request...");

      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 3000));

      toast.dismiss(toastId);
      toast.success("Operation completed successfully", {
        action: {
          label: "Oke",
          onClick: () => {},
        },
      });
    };

    return (
      <div className="space-y-4">
        <Toaster />
        <Button onClick={handleAsyncOperation}>Start Async Operation</Button>
      </div>
    );
  },
};

export const InteractiveDemo: Story = {
  render: () => {
    return (
      <div className="w-[500px] space-y-6">
        <Toaster />
        <h3 className="text-lg font-semibold">Toast Notification Demo</h3>

        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-white p-4">
            <h4 className="mb-3 text-sm font-medium">Basic Notifications</h4>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => toast.default("Default message")}
                variant="outline"
                size="md"
              >
                Default
              </Button>
              <Button
                onClick={() => toast.error("Error message")}
                variant="destructive"
                size="md"
              >
                Error
              </Button>
              <Button
                onClick={() => toast.success("Success message")}
                size="md"
              >
                Success
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-white p-4">
            <h4 className="mb-3 text-sm font-medium">With Custom Actions</h4>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() =>
                  toast.default("Changes saved", {
                    action: {
                      label: "Undo",
                      onClick: () => alert("Undoing..."),
                    },
                  })
                }
                variant="outline"
                size="md"
              >
                Save with Undo
              </Button>
              <Button
                onClick={() =>
                  toast.error("Delete failed", {
                    action: {
                      label: "Retry",
                      onClick: () => alert("Retrying..."),
                    },
                  })
                }
                variant="destructive"
                size="md"
              >
                Delete with Retry
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-white p-4">
            <h4 className="mb-3 text-sm font-medium">Duration Control</h4>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() =>
                  toast.default("Quick message", { duration: 1000 })
                }
                variant="outline"
                size="md"
              >
                1 Second
              </Button>
              <Button
                onClick={() =>
                  toast.default("Standard message", { duration: 3000 })
                }
                variant="outline"
                size="md"
              >
                3 Seconds
              </Button>
              <Button
                onClick={() =>
                  toast.default("Persistent message", { duration: Infinity })
                }
                variant="outline"
                size="md"
              >
                Until Dismissed
              </Button>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-white p-4">
            <h4 className="mb-3 text-sm font-medium">Dismiss</h4>
            <Button onClick={() => toast.dismiss()} variant="outline" size="md">
              Dismiss All Toasts
            </Button>
          </div>
        </div>
      </div>
    );
  },
};
