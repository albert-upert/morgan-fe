import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/button/button";
import { InfoIcon } from "@/components/icon";
import {
  Dialog,
  DialogBody,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent side="center" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Tunggu Sebentar</DialogTitle>
          <InfoIcon className="absolute right-5 size-8 text-muted-foreground" />
        </DialogHeader>
        <DialogBody>
          <DialogDescription>
            Apakah anda yakin informasi anda sudah benar?
          </DialogDescription>
          <DialogFooter>
            <Button
              variant="outline"
              size="lg"
              className="w-full border-destructive text-destructive hover:bg-destructive/10"
            >
              Cek Kembali
            </Button>
            <Button variant="primary" size="lg" className="w-full">
              Ya, Simpan Sekarang
            </Button>
          </DialogFooter>
        </DialogBody>
      </DialogContent>
    </Dialog>
  ),
};

export const ConfirmationDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Show Confirmation</Button>
      </DialogTrigger>
      <DialogContent
        side="center"
        showCloseButton={false}
        className="max-w-[542px]"
      >
        <DialogHeader>
          <DialogTitle>Tunggu Sebentar</DialogTitle>
          <InfoIcon className="absolute right-5 size-8 text-muted-foreground" />
        </DialogHeader>
        <DialogBody>
          <DialogDescription>
            Apakah anda yakin informasi anda sudah benar?
          </DialogDescription>
          <DialogFooter className="w-full">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
            >
              Cek Kembali
            </Button>
            <Button variant="primary" size="lg" className="flex-1">
              Ya, Simpan Sekarang
            </Button>
          </DialogFooter>
        </DialogBody>
      </DialogContent>
    </Dialog>
  ),
};

export const LeftSide: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Left Dialog</Button>
      </DialogTrigger>
      <DialogContent side="left">
        <DialogHeader>
          <DialogTitle>Left Side Dialog</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <DialogDescription>
            This dialog slides in from the left side.
          </DialogDescription>
        </DialogBody>
      </DialogContent>
    </Dialog>
  ),
};

export const RightSide: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Right Dialog</Button>
      </DialogTrigger>
      <DialogContent side="right">
        <DialogHeader>
          <DialogTitle>Right Side Dialog</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <DialogDescription>
            This dialog slides in from the right side.
          </DialogDescription>
        </DialogBody>
      </DialogContent>
    </Dialog>
  ),
};

export const TopSide: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Top Dialog</Button>
      </DialogTrigger>
      <DialogContent side="top">
        <DialogHeader>
          <DialogTitle>Top Side Dialog</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <DialogDescription>
            This dialog slides in from the top.
          </DialogDescription>
        </DialogBody>
      </DialogContent>
    </Dialog>
  ),
};
