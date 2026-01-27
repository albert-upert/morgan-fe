import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Typography from "@/components/typography/typography";
import { Callout } from "./callout";

const meta = {
  title: "Components/Callout",
  component: Callout,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["red", "blue", "gray", "yellow"],
    },
    showIcon: {
      control: "boolean",
    },
    showClose: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Red: Story = {
  args: {
    variant: "red",
    message: "Placeholder",
    action: "Action",
  },
};

export const Blue: Story = {
  args: {
    variant: "blue",
    message: "Placeholder",
    action: "Action",
  },
};

export const Gray: Story = {
  args: {
    variant: "gray",
    message: "Placeholder",
    action: "Action",
  },
};

export const Yellow: Story = {
  args: {
    variant: "yellow",
    message: "Placeholder",
    action: "Action",
  },
};

export const WithoutIcon: Story = {
  args: {
    variant: "red",
    message: "This callout doesn't have an icon",
    action: "Action",
    showIcon: false,
  },
};

export const WithoutAction: Story = {
  args: {
    variant: "blue",
    message: "This callout doesn't have an action button",
    showClose: true,
  },
};

export const WithoutClose: Story = {
  args: {
    variant: "yellow",
    message: "This callout cannot be closed",
    action: "Learn More",
    showClose: false,
  },
};

export const AllVariants: Story = {
  args: {
    message: "",
  },
  render: () => (
    <div className="w-[600px] space-y-4">
      <h3 className="text-lg font-semibold">All Callout Variants</h3>
      <Callout variant="red" message="This is a red callout" action="Action" />
      <Callout
        variant="blue"
        message="This is a blue callout"
        action="Action"
      />
      <Callout
        variant="gray"
        message="This is a gray callout"
        action="Action"
      />
      <Callout
        variant="yellow"
        message="This is a yellow callout"
        action="Action"
      />
    </div>
  ),
};

export const ErrorMessage: Story = {
  args: {
    variant: "red",
    message: "Your session has expired. Please log in again to continue.",
    action: "Login",
    onActionClick: () => alert("Navigating to login..."),
  },
};

export const InfoMessage: Story = {
  args: {
    variant: "blue",
    message:
      "A new version of the application is available. Update now to get the latest features.",
    action: "Update",
    onActionClick: () => alert("Starting update..."),
  },
};

export const WarningMessage: Story = {
  args: {
    variant: "yellow",
    message:
      "Your storage is almost full. Please delete some files to free up space.",
    action: "Manage Storage",
    onActionClick: () => alert("Opening storage management..."),
  },
};

export const NeutralMessage: Story = {
  args: {
    variant: "gray",
    message:
      "This feature is currently in beta. Your feedback helps us improve.",
    action: "Give Feedback",
    onActionClick: () => alert("Opening feedback form..."),
  },
};

export const LongMessage: Story = {
  args: {
    variant: "red",
    message:
      "We've detected unusual activity on your account. To ensure your account's security, we recommend changing your password and reviewing your recent activity. If you did not authorize these actions, please contact our support team immediately.",
    action: "Secure Account",
  },
};

export const RealWorldExample: Story = {
  args: {
    message: "",
  },
  render: () => {
    const [callouts, setCallouts] = useState({
      error: true,
      info: true,
      warning: true,
      neutral: true,
    });

    return (
      <div className="w-[700px] space-y-6">
        <h3 className="text-lg font-semibold">Dashboard Notifications</h3>

        <div className="space-y-4">
          {callouts.error && (
            <Callout
              variant="red"
              message="Payment failed. Please update your payment method to continue using our services."
              action="Update Payment"
              onClose={() => setCallouts((prev) => ({ ...prev, error: false }))}
              onActionClick={() => alert("Opening payment settings...")}
            />
          )}

          {callouts.info && (
            <Callout
              variant="blue"
              message="New features are now available! Check out our latest updates."
              action="View Updates"
              onClose={() => setCallouts((prev) => ({ ...prev, info: false }))}
              onActionClick={() => alert("Showing updates...")}
            />
          )}

          {callouts.warning && (
            <Callout
              variant="yellow"
              message="Your trial period ends in 3 days. Upgrade now to keep all your features."
              action="Upgrade Now"
              onClose={() =>
                setCallouts((prev) => ({ ...prev, warning: false }))
              }
              onActionClick={() => alert("Opening upgrade page...")}
            />
          )}

          {callouts.neutral && (
            <Callout
              variant="gray"
              message="Scheduled maintenance on Sunday, 2:00 AM - 4:00 AM EST."
              action="Learn More"
              onClose={() =>
                setCallouts((prev) => ({ ...prev, neutral: false }))
              }
              onActionClick={() => alert("Showing maintenance details...")}
            />
          )}
        </div>
      </div>
    );
  },
};

export const FormValidation: Story = {
  args: {
    message: "",
  },
  render: () => (
    <div className="w-[600px] space-y-6">
      <h3 className="text-lg font-semibold">Form Validation</h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full rounded-md border border-input px-3 py-2 text-sm"
            placeholder="Enter your email"
          />
          <Callout
            variant="red"
            message="Please enter a valid email address"
            showClose={false}
            showIcon={true}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Password</label>
          <input
            type="password"
            className="w-full rounded-md border border-input px-3 py-2 text-sm"
            placeholder="Enter your password"
          />
          <Callout
            variant="yellow"
            message="Password must be at least 8 characters"
            showClose={false}
            showIcon={true}
          />
        </div>
      </div>
    </div>
  ),
};

export const OnboardingSteps: Story = {
  args: {
    message: "",
  },
  render: () => (
    <div className="w-[600px] space-y-6">
      <h3 className="text-lg font-semibold">Onboarding Guide</h3>

      <div className="space-y-4">
        <Callout
          variant="blue"
          message="Welcome! Let's set up your profile to get started."
          action="Start Setup"
          showClose={false}
          onActionClick={() => alert("Starting setup...")}
        />

        <Callout
          variant="gray"
          message="Connect your social accounts to find friends easily."
          action="Connect"
          showClose={true}
        />

        <Callout
          variant="yellow"
          message="Enable notifications to stay updated on important events."
          action="Enable"
          showClose={true}
        />
      </div>
    </div>
  ),
};

export const PermissionRequests: Story = {
  args: {
    message: "",
  },
  render: () => (
    <div className="w-[600px] space-y-4">
      <h3 className="text-lg font-semibold">Permission Requests</h3>

      <Callout
        variant="blue"
        message="This app would like to access your camera to scan QR codes."
        action="Allow"
        onActionClick={() => alert("Camera permission granted")}
      />

      <Callout
        variant="blue"
        message="Enable location services to find nearby stores and services."
        action="Enable"
        onActionClick={() => alert("Location enabled")}
      />

      <Callout
        variant="yellow"
        message="We use cookies to improve your experience. By continuing, you agree to our cookie policy."
        action="Accept"
        showIcon={false}
        onActionClick={() => alert("Cookies accepted")}
      />
    </div>
  ),
};

export const SystemStatus: Story = {
  args: {
    message: "",
  },
  render: () => (
    <div className="w-[600px] space-y-4">
      <h3 className="text-lg font-semibold">System Status</h3>

      <Callout
        variant="red"
        message="Database connection failed. Some features may not be available."
        action="Retry"
        onActionClick={() => alert("Retrying connection...")}
      />

      <Callout
        variant="yellow"
        message="High server load detected. Performance may be slower than usual."
        action="Details"
        showClose={true}
      />

      <Callout
        variant="gray"
        message="All systems operational. No issues detected."
        showClose={false}
        showIcon={false}
      />
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    message: "",
  },
  render: () => {
    const [dismissed, setDismissed] = useState<Array<string>>([]);

    const callouts = [
      {
        id: "error",
        variant: "red" as const,
        message: "Action required: Please verify your email address",
        action: "Verify Email",
      },
      {
        id: "warning",
        variant: "yellow" as const,
        message: "Your subscription renews in 7 days",
        action: "Manage Subscription",
      },
      {
        id: "info",
        variant: "blue" as const,
        message: "New feature: Dark mode is now available!",
        action: "Try It",
      },
      {
        id: "neutral",
        variant: "gray" as const,
        message: "Tip: Use keyboard shortcuts to work faster",
        action: "View Shortcuts",
      },
    ];

    return (
      <div className="w-[600px] space-y-6">
        <h3 className="text-lg font-semibold">Interactive Callouts</h3>

        <div className="space-y-4">
          {callouts
            .filter((c) => !dismissed.includes(c.id))
            .map((callout) => (
              <Callout
                key={callout.id}
                variant={callout.variant}
                message={callout.message}
                action={callout.action}
                onClose={() => setDismissed([...dismissed, callout.id])}
                onActionClick={() => alert(`Action clicked: ${callout.action}`)}
              />
            ))}

          {dismissed.length === callouts.length && (
            <div className="rounded-lg border border-dashed border-border p-8 text-center">
              <p className="text-sm text-muted-foreground">
                All callouts dismissed
              </p>
              <button
                onClick={() => setDismissed([])}
                className="mt-4 rounded-md bg-primary px-4 py-2 text-sm text-white"
              >
                Reset All
              </button>
            </div>
          )}
        </div>
      </div>
    );
  },
};

export const CustomMessageWithTypography: Story = {
  args: {
    message: "",
  },
  render: () => (
    <div className="w-[700px] space-y-6">
      <h3 className="text-lg font-semibold">
        Custom Messages with Combined Typography
      </h3>

      <div className="space-y-4">
        <Callout
          variant="red"
          message={
            <span>
              <Typography variant="body-medium-bold" as="span">
                Pembayaran Gagal!
              </Typography>{" "}
              <Typography variant="body-medium" as="span">
                Silakan perbarui metode pembayaran Anda untuk melanjutkan
                layanan.
              </Typography>
            </span>
          }
          action="Perbarui"
        />

        <Callout
          variant="blue"
          message={
            <span>
              <Typography variant="body-medium" as="span">
                Selamat datang,
              </Typography>{" "}
              <Typography
                variant="body-medium-bold"
                as="span"
                className="text-accent"
              >
                John Doe
              </Typography>
              <Typography variant="body-medium" as="span">
                ! Anda memiliki
              </Typography>{" "}
              <Typography
                variant="body-medium-bold"
                as="span"
                className="text-accent"
              >
                3 tugas baru
              </Typography>{" "}
              <Typography variant="body-medium" as="span">
                yang menunggu persetujuan.
              </Typography>
            </span>
          }
          action="Lihat Tugas"
        />

        <Callout
          variant="yellow"
          message={
            <span>
              <Typography variant="body-medium-bold" as="span">
                Perhatian:
              </Typography>{" "}
              <Typography variant="body-medium" as="span">
                Batas waktu pengumpulan
              </Typography>{" "}
              <Typography
                variant="body-medium-bold"
                as="span"
                className="text-red-600"
              >
                KRS Semester Ganjil 2024/2025
              </Typography>{" "}
              <Typography variant="body-medium" as="span">
                adalah
              </Typography>{" "}
              <Typography variant="body-medium-bold" as="span">
                15 Januari 2025
              </Typography>
              <Typography variant="body-medium" as="span">
                .
              </Typography>
            </span>
          }
          action="Lihat Detail"
        />

        <Callout
          variant="gray"
          message={
            <span>
              <Typography variant="body-medium" as="span">
                Total SKS yang diambil:
              </Typography>{" "}
              <Typography
                variant="body-medium-bold"
                as="span"
                className="text-primary"
              >
                24 SKS
              </Typography>{" "}
              <Typography variant="body-medium" as="span">
                dari maksimal
              </Typography>{" "}
              <Typography variant="body-medium-bold" as="span">
                24 SKS
              </Typography>
              <Typography variant="body-medium" as="span">
                . Kuota sudah penuh.
              </Typography>
            </span>
          }
          showClose={false}
        />

        <Callout
          variant="blue"
          message={
            <span>
              <Typography variant="body-medium" as="span">
                Mata kuliah
              </Typography>{" "}
              <Typography variant="body-medium-bold" as="span">
                "Pemrograman Web"
              </Typography>{" "}
              <Typography variant="body-medium" as="span">
                telah
              </Typography>{" "}
              <Typography
                variant="body-medium-bold"
                as="span"
                className="text-green-600"
              >
                disetujui
              </Typography>{" "}
              <Typography variant="body-medium" as="span">
                oleh Dosen PA.
              </Typography>
            </span>
          }
          showClose={true}
        />

        <Callout
          variant="red"
          message={
            <span>
              <Typography variant="body-medium" as="span">
                Pengajuan mata kuliah
              </Typography>{" "}
              <Typography variant="body-medium-bold" as="span">
                "Kalkulus II"
              </Typography>{" "}
              <Typography variant="body-medium" as="span">
                telah
              </Typography>{" "}
              <Typography
                variant="body-medium-bold"
                as="span"
                className="text-red-600"
              >
                ditolak
              </Typography>
              <Typography variant="body-medium" as="span">
                . Alasan:
              </Typography>{" "}
              <Typography variant="body-medium-italic" as="span">
                "Prasyarat belum terpenuhi"
              </Typography>
            </span>
          }
          action="Ajukan Banding"
        />
      </div>
    </div>
  ),
};

export const AcademicNotifications: Story = {
  args: {
    message: "",
  },
  render: () => (
    <div className="w-[700px] space-y-6">
      <h3 className="text-lg font-semibold">Academic Notifications</h3>

      <div className="space-y-4">
        <Callout
          variant="yellow"
          message={
            <span>
              <Typography variant="body-medium-bold" as="span">
                Jadwal UAS
              </Typography>{" "}
              <Typography variant="body-medium" as="span">
                untuk mata kuliah
              </Typography>{" "}
              <Typography variant="body-medium-bold" as="span">
                Basis Data
              </Typography>{" "}
              <Typography variant="body-medium" as="span">
                adalah
              </Typography>{" "}
              <Typography
                variant="body-medium-bold"
                as="span"
                className="text-primary"
              >
                Senin, 20 Januari 2025, 08:00 WIB
              </Typography>
              <Typography variant="body-medium" as="span">
                . Ruangan:
              </Typography>{" "}
              <Typography variant="body-medium-bold" as="span">
                Lab Komputer 3
              </Typography>
            </span>
          }
          action="Tambah ke Kalender"
        />

        <Callout
          variant="blue"
          message={
            <span>
              <Typography variant="body-medium" as="span">
                IPK Anda saat ini:
              </Typography>{" "}
              <Typography
                variant="body-large-bold"
                as="span"
                className="text-green-600"
              >
                3.75
              </Typography>{" "}
              <Typography variant="body-medium" as="span">
                (
              </Typography>
              <Typography
                variant="body-medium-bold"
                as="span"
                className="text-green-600"
              >
                Cum Laude
              </Typography>
              <Typography variant="body-medium" as="span">
                ). Pertahankan prestasi Anda!
              </Typography>
            </span>
          }
          showClose={false}
          showIcon={false}
        />

        <Callout
          variant="gray"
          message={
            <span>
              <Typography variant="body-medium" as="span">
                Dosen pembimbing Anda:
              </Typography>{" "}
              <Typography variant="body-medium-bold" as="span">
                Dr. Ahmad Fauzi, M.Kom
              </Typography>{" "}
              <Typography variant="body-medium" as="span">
                | Email:
              </Typography>{" "}
              <Typography
                variant="body-medium"
                as="span"
                className="text-accent underline"
              >
                ahmad.fauzi@univ.ac.id
              </Typography>
            </span>
          }
          action="Kirim Pesan"
        />
      </div>
    </div>
  ),
};
