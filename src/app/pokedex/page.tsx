import * as React from "react";
import { SearchInput } from "./search-input";
import { cn, wait } from "~/app/_lib/utils";
import { headers } from "next/headers";

type Pokemon = {
  name: string;
  id: number;
};

export function generateMetadata(props: {
  searchParams?: Record<string, string | undefined>;
}) {
  const query = props.searchParams?.search;
  return {
    title: query ? `Searching for ${query}` : "Search page",
  };
}

function isSSR() {
  return headers().get("accept")?.includes("text/html"); // for RSC navigations, it uses either `Accept: text/x-component` or `Accept: */*`, for SSR browsers and other client use `Accept: text/html`
}

export default function Page(props: {
  searchParams?: Record<string, string | undefined>;
}) {
  const keyString = `search=${props.searchParams?.search}`;
  return (
    <main className="flex flex-col">
      <SearchInput defaultValue={props.searchParams?.search} />

      {props.searchParams?.search &&
        (isSSR() ? (
          <PokemonList name={props.searchParams?.search} />
        ) : (
          <React.Suspense
            key={keyString}
            fallback={
              <ul className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 py-4 pb-52 place-items-stretch">
                <PokemonCardSkeleton />
                <PokemonCardSkeleton />
                <PokemonCardSkeleton />
                <PokemonCardSkeleton />
              </ul>
            }
          >
            <PokemonList name={props.searchParams?.search} />
          </React.Suspense>
        ))}
    </main>
  );
}

async function PokemonList(props: { name: string }) {
  await wait(1000);
  const pokemons = await fetch(`https://beta.pokeapi.co/graphql/v1beta`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: /* GraphQL */ `
        query ($name: String!) {
          pokemons: pokemon_v2_pokemon(
            where: { name: { _ilike: $name } }
            limit: 20
          ) {
            name
            id
          }
        }
      `,
      variables: {
        name: `${props.name}%`,
      },
    }),
  })
    .then(
      (r) =>
        r.json() as Promise<{
          data: { pokemons: Array<Pokemon> };
        }>
    )
    .then((result) => result.data?.pokemons ?? []);

  console.log({
    pokemons,
  });
  return (
    <ul
      className={cn(
        "grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 py-4 pb-52 place-items-stretch",
        pokemons.length === 0 && "w-full h-hull items-center justify-center"
      )}
    >
      {pokemons.map((p) => (
        <li key={p.id}>
          <PokemonCard pokemon={p} />
        </li>
      ))}
    </ul>
  );
}

function PokemonCardSkeleton() {
  return (
    <div className="border rounded-md bg-gray-600 border-gray-200 font-normal p-2 flex flex-col gap-4">
      <span className="sr-only">Loading pokemon...</span>
      <div className="flex gap-2 bg-slate-400 h-4 rounded animate-pulse" />

      <div className="h-[200px] w-full bg-slate-400 rounded animate-pulse" />

      <div className="flex gap-2 bg-slate-400 h-4 rounded animate-pulse" />
    </div>
  );
}

function PokemonCard({ pokemon }: { pokemon: Pokemon }) {
  const pokemonSVGURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  return (
    <dl className="border rounded-md bg-gray-600 border-gray-200 font-normal p-2 flex flex-col gap-4">
      <div className="flex gap-2 justify-center items-center">
        <dt>ID : </dt>
        <dd>
          <strong>{pokemon.id}</strong>
        </dd>
      </div>

      <img
        src={pokemonSVGURL}
        alt={pokemon.name}
        className="h-[200px] w-[200px] self-center drop-shadow-md relative z-1"
      />

      <div className="flex gap-2 justify-center items-center">
        <dt>Name: </dt>
        <dd>{pokemon.name}</dd>
      </div>
    </dl>
  );
}
