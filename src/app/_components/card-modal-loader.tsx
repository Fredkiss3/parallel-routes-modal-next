"use client";

import { LoadingIndicator } from "~/app/_components/loading-indicator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/app/_components/dialog";

export type CardModalLoaderProps = {
  onClose?: () => void;
};

export function CardModalLoader(props: CardModalLoaderProps) {
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) {
          props.onClose?.();
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Loading Card...</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4 p-10 items-center justify-center">
          <LoadingIndicator className="h-10 w-10" />
        </div>
      </DialogContent>
    </Dialog>
  );
}
