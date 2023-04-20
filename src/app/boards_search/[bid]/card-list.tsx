"use client";

import * as React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import type { Card } from "~/app/types";
import { CardModalLoader } from "~/app/_components/card-modal-loader";
import { cn } from "~/app/_lib/utils";

export type CardListProps = {
  cards: Card[];
  boardId: string;
};

export function CardList({ cards, boardId }: CardListProps) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  return (
    <ul
      className={cn(
        "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 py-4 pb-52",
        cards.length === 0 && "w-full h-hull items-center justify-center"
      )}
    >
      {isPending && (
        <CardModalLoader
          onClose={() => {
            router.replace(`/boards_search/${boardId}`);
          }}
        />
      )}
      {cards.length === 0 ? (
        <h1 className="text-2xl font-bold">NO CARDS IN THE BOARD</h1>
      ) : (
        cards.map((card) => (
          <a
            href={`/boards_search/${boardId}?cardId=${card.id}`}
            key={card.id}
            onClick={(e) => {
              e.preventDefault();
              startTransition(() => {
                router.push(`/boards_search/${boardId}?cardId=${card.id}`, {
                  forceOptimisticNavigation: true,
                });
              });
            }}
            className="flex flex-col gap-2"
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
          </a>
        ))
      )}
    </ul>
  );
}
