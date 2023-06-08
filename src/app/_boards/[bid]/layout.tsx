import * as React from "react";
import { ShowHideModal } from "./show-hide-modal";

export default function BoardDetailsLayout({
  children,
  card_modal,
}: {
  children: React.ReactNode;
  card_modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      <ShowHideModal>{card_modal}</ShowHideModal>
    </>
  );
}
