import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col gap-4">
      <Link className="underline" href={`/boards`}>
        Go to boards with parallel route
      </Link>
      <Link className="underline" href={`/boards_search`}>
        Go to boards with search Param
      </Link>
    </div>
  );
}
