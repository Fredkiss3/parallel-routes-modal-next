import * as React from "react";
import { ApiResult, Board, BoardDetails } from "../../types";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

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
    <div>
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
        {board.lists.map((lis) => (
          <React.Fragment key={lis.id}>
            {lis.cards.map((card) => (
              <Link
                href={`/boards/${bid}/cards/${card.id}`}
                className="rounded-md overflow-hidden"
                key={card.id}
                prefetch={false}
              >
                <div className="h-[150px] w-[250px] overflow-hidden rounded-md">
                  {card.coverURL ? (
                    <Image
                      src={card.coverURL}
                      alt={`Cover ${card.title}`}
                      height={400}
                      width={400}
                      className="object-cover object-center"
                    />
                  ) : (
                    <div className="h-[150px] w-[250px] bg-gray-500 flex items-center justify-center">
                      NO COVER
                    </div>
                  )}
                </div>
                {card.title}
              </Link>
            ))}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}
