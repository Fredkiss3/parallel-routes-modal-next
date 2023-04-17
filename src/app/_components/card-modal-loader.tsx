"use client";

import { LoadingIndicator } from "~/app/_components/loading-indicator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/app/_components/dialog";
import { useRouter } from "next/navigation";

export function CardModalLoader() {
  const router = useRouter();
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) {
          router.back();
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
