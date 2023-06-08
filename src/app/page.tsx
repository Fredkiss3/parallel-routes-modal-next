import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <Link className="underline" href={`/pokedex`}>
        Go to Pokedex
      </Link>
      <Link className="underline" href={`/boards_search`}>
        Go to boards with search Param
      </Link>
    </div>
  );
}
