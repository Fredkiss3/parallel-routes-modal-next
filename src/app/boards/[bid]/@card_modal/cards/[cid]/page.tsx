import * as React from "react";
import { ApiResult, CardDetails } from "~/app/types";
import { CardModal } from "./card-modal";
import { renderMarkdown, wait } from "~/app/_lib/utils";

export default async function CardDetailsPage({
  params,
}: {
  params: { bid: string; cid: string };
}) {
  const { data: card } = (await fetch(
    `https://thullo.fredkiss.dev/api/boards/${params.bid}/cards/${params.cid}`,
    {
      cache: "no-cache",
    }
  ).then((r) => r.json())) as ApiResult<CardDetails>;

  return (
    <CardModal
      title={card.title}
      description={card.description ? renderMarkdown(card.description) : null}
      cover={card.coverURL}
    />
  );
}
