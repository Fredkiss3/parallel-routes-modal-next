import { Page } from "../common-page";

export function generateMetadata(props: {
  searchParams?: Record<string, string | undefined>;
}) {
  const query = props.searchParams?.search;
  return {
    title: query ? `Searching for ${query}` : "Search page",
  };
}

export default Page;
