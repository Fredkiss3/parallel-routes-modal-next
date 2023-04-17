import * as React from "react";

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
      {card_modal}
    </>
  );
}
