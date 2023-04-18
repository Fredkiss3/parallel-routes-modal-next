import * as React from "react";
import type { ApiResult, Board } from "../types";
import Link from "next/link";
import Image from "next/image";

export default async function BoardsPage() {
  const boards = (await fetch(`https://thullo.fredkiss.dev/api/boards/`, {
    cache: "no-cache",
  }).then((r) => r.json())) as ApiResult<Board[]>;

  return (
    <div className="overflow-scroll">
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-4">
        {boards.data.map((b) => (
          <li key={b.id}>
            <Link
              href={`/boards_search/${b.id}`}
              className="rounded-md overflow-hidden"
            >
              <div className="h-[150px] max-w-[250px] w-full overflow-hidden rounded-md">
                <Image
                  src={b.cover.url}
                  alt={`Cover ${b.name}`}
                  height={400}
                  width={400}
                  className="object-cover object-center h-full w-full"
                />
              </div>
              {b.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
