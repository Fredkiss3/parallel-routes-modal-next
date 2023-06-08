"use client";
import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/app/_components/dialog";
import { useRouter } from "next/navigation";

export function CardModal(props: {
  title: string;
  cover: string | null;
  description: string | null;
  boardId: string;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    setIsOpen(true);
  }, [router]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          // router.push(`/boards/${props.boardId}`)
          router.back();
        }
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {props.cover && (
            <div className="h-[150px] w-full rounded-md">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={props.cover}
                alt={`Cover ${props.title}`}
                height={400}
                width={400}
                className="object-cover object-center w-full h-full rounded-md"
              />
            </div>
          )}
          <DialogTitle>{props.title}</DialogTitle>
          <DialogDescription asChild>
            {props.description ? (
              <article
                dangerouslySetInnerHTML={{
                  __html: props.description,
                }}
              />
            ) : (
              <span className="italic">No description</span>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
