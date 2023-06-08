import * as React from "react";
import { ApiResult, Board, BoardDetails } from "../../types";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "~/app/_lib/utils";

export default async function BoardsPage({
  params: { bid },
}: {
  params: { bid: string };
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
  return (
    <div className="w-full h-full">
      <ul
        className={cn(
          "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 py-4",
          board.lists.length === 0 &&
            "w-full h-hull items-center justify-center"
        )}
      >
        {board.lists.length === 0 ? (
          <h1 className="text-2xl font-bold">NO CARDS IN THE BOARD</h1>
        ) : (
          board.lists.map((lis) => (
            <React.Fragment key={lis.id}>
              {lis.cards.map((card) => (
                <Link
                  href={`/boards/${bid}/cards/${card.id}`}
                  key={card.id}
                  // prefetch={false}
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

export async function generateMetadata(props: { params: { bid: string } }) {
  const { data: board } = (await fetch(
    `https://thullo.fredkiss.dev/api/boards/${props.params.bid}`,
    {
      cache: "no-cache",
    }
  ).then((r) => r.json())) as ApiResult<BoardDetails>;

  return {
    title: board.name,
  };
}
