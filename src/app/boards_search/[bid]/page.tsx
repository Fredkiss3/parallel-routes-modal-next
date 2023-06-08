import * as React from "react";
import type { ApiResult, BoardDetails, Card, CardDetails } from "../../types";
import { notFound } from "next/navigation";
import { renderMarkdown, wait } from "~/app/_lib/utils";
import { CardModal } from "~/app/_components/card-modal";
import { CardList } from "./card-list";
import { CardModalLoader } from "~/app/_components/card-modal-loader";

export default async function BoardsPage({
  params: { bid },
  searchParams,
}: {
  params: { bid: string };
  searchParams?: Record<string, string | undefined>;
}) {
  const { data: board } = (await fetch(
    `https://thullo.fredkiss.dev/api/boards/${bid}`
  ).then((r) => r.json())) as ApiResult<BoardDetails>;

  if (!board) {
    notFound();
  }

  const cid = searchParams?.cardId;

  const allCards = board.lists.reduce((cards, list) => {
    return cards.concat(list.cards);
  }, [] as Card[]);

  return (
    <div className="w-full h-full">
      {cid && (
        <React.Suspense fallback={<CardModalLoader />} key={searchParams.cid}>
          <CardDetail bid={bid} cid={cid} />
        </React.Suspense>
      )}

      <CardList cards={allCards} boardId={bid} />
    </div>
  );
}

async function CardDetail(props: { bid: string; cid: string }) {
  await wait(1000);
  const { data: card } = (await fetch(
    `https://thullo.fredkiss.dev/api/boards/${props.bid}/cards/${props.cid}`
  ).then((r) => r.json())) as ApiResult<CardDetails | null>;

  return (
    <>
      {card && (
        <CardModal
          title={card.title}
          description={
            card.description ? renderMarkdown(card.description) : null
          }
          cover={card.coverURL}
          boardId={props.bid}
        />
      )}
    </>
  );
}

export async function generateMetadata(props: {
  params: { bid: string };
  searchParams?: Record<string, any>;
}) {
  const { data: board } = (await fetch(
    `https://thullo.fredkiss.dev/api/boards/${props.params.bid}`
  ).then((r) => r.json())) as ApiResult<BoardDetails>;

  const cid = props.searchParams?.cardId;

  if (cid) {
    const { data: card } = (await fetch(
      `https://thullo.fredkiss.dev/api/boards/${props.params.bid}/cards/${cid}`
    ).then((r) => r.json())) as ApiResult<CardDetails | null>;

    if (!card) {
      notFound();
    }

    return {
      title: card?.title,
    };
  }

  return {
    title: board.name,
  };
}
