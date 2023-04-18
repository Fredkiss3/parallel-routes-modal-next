import * as React from "react";
import { ApiResult, Board, BoardDetails, CardDetails } from "../../types";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn, renderMarkdown, wait } from "~/app/_lib/utils";
import { CardModal } from "~/app/_components/card-modal";
import { CardModalLoader } from "~/app/_components/card-modal-loader";

export default async function BoardsPage({
  params: { bid },
  searchParams,
}: {
  params: { bid: string };
  searchParams?: Record<string, string | undefined>;
}) {
  const { data: board } = (await fetch(
    `https://thullo.fredkiss.dev/api/boards/${bid}`,
    {
      cache: "no-cache",
    }
  ).then((r) => r.json())) as ApiResult<BoardDetails>;

  if (!board) {
    notFound();
  }

  const cid = searchParams?.cardId;

  return (
    <div className="w-full h-full">
      <ul
        className={cn(
          "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 py-4",
          board.lists.length === 0 &&
            "w-full h-hull items-center justify-center"
        )}
      >
        {cid && (
          <React.Suspense fallback={<CardModalLoader />}>
            {/* @ts-expect-error */}
            <CardDetail bid={bid} cid={cid} />
          </React.Suspense>
        )}

        {board.lists.length === 0 ? (
          <h1 className="text-2xl font-bold">NO CARDS IN THE BOARD</h1>
        ) : (
          board.lists.map((lis) => (
            <React.Fragment key={lis.id}>
              {lis.cards.map((card) => (
                <Link
                  href={`/boards_search/${bid}?cardId=${card.id}`}
                  key={card.id}
                  prefetch={false}
                >
                  <div className="h-[150px] max-w-[250px] rounded-md">
                    {card.coverURL ? (
                      <Image
                        src={card.coverURL}
                        alt={`Cover ${card.title}`}
                        height={400}
                        width={400}
                        className="object-cover object-center rounded-md w-full h-full"
                      />
                    ) : (
                      <div className="h-full max-w-[250px] bg-gray-500 flex items-center justify-center rounded-md">
                        NO COVER
                      </div>
                    )}
                  </div>

                  {card.title}
                </Link>
              ))}
            </React.Fragment>
          ))
        )}
      </ul>
    </div>
  );
}

async function CardDetail(props: { bid: string; cid: string }) {
  await wait(1000);
  const { data: card } = (await fetch(
    `https://thullo.fredkiss.dev/api/boards/${props.bid}/cards/${props.cid}`,
    {
      cache: "no-cache",
    }
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
    `https://thullo.fredkiss.dev/api/boards/${props.params.bid}`,
    {
      cache: "no-cache",
    }
  ).then((r) => r.json())) as ApiResult<BoardDetails>;

  const cid = props.searchParams?.cardId;

  if (cid) {
    const { data: card } = (await fetch(
      `https://thullo.fredkiss.dev/api/boards/${props.params.bid}/cards/${cid}`,
      {
        cache: "no-cache",
      }
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
