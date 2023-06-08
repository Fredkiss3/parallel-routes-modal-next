import { redirect } from "next/navigation";

export default function DefaultPage() {
  return null;
}

export function generateMetadata(props: {
  searchParams?: Record<string, string | undefined>;
}) {
  const sParams = new URLSearchParams();
  if (props.searchParams?.search) {
    sParams.append("search", props.searchParams?.search);
  }
  if (props.searchParams?.wait) {
    sParams.append("wait", props.searchParams?.wait);
  }
  redirect(`/pokedex/node?${sParams.toString()}`);
}
