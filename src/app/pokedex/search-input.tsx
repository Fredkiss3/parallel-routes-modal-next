"use client";

import { useRouter } from "next/navigation";
import * as React from "react";

export type SearchInputProps = {
  defaultValue?: string;
};

export function SearchInput({ defaultValue }: SearchInputProps) {
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(
          `/pokedex?${new URLSearchParams(
            // @ts-expect-error URLSearchParams can accept FormData
            new FormData(e.currentTarget)
          ).toString()}`
        );
      }}
      className="flex items-center gap-4 justify-center"
    >
      <fieldset className="flex flex-col gap-2">
        <label htmlFor="search" className="sr-only">
          The name of the pokemon you are searching
        </label>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="ex: pikachu"
          className="flex items-center w-72 text-left space-x-3 px-4 h-12 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700"
          defaultValue={defaultValue}
        />
      </fieldset>

      <button className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400">
        Submit
      </button>
    </form>
  );
}
