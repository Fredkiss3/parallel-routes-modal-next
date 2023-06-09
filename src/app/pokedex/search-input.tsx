"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
import { cn } from "../_lib/utils";

export type SearchInputProps = {};

export function SearchInput({}: SearchInputProps) {
  const router = useRouter();
  const sParams = useSearchParams();
  const path = usePathname();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(
          `${path}?${new URLSearchParams(
            // @ts-expect-error URLSearchParams can accept FormData
            new FormData(e.currentTarget)
          ).toString()}`
        );
      }}
      className="flex md:items-center gap-4 justify-center flex-col md:flex-row"
    >
      <fieldset>
        <label htmlFor="wait" className="flex gap-2 items-center">
          <input
            type="checkbox"
            name="wait"
            id="wait"
            className="sr-only peer"
            defaultChecked={sParams.get("wait") === "on"}
          />

          <div
            className={cn(
              "h-4 w-4 inline-flex flex-col items-center justify-center",
              "border-[1.5px] border-black  bg-white rounded-sm text-black",
              "peer-focus:ring-2 ring-primary [&>svg]:hidden peer-checked:[&>svg]:block"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 256 256"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <rect width="256" height="256" fill="none" />
              <polyline
                points="40 144 96 200 224 72"
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="24"
              />
            </svg>
          </div>
          <span>Wait ?</span>
        </label>
      </fieldset>

      <fieldset>
        <label htmlFor="search" className="sr-only">
          The name of the pokemon you are searching
        </label>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="ex: pikachu"
          className="flex items-center w-full max-w-72 text-left space-x-3 px-4 h-12 bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400 dark:bg-slate-800 dark:ring-0 dark:text-slate-300 dark:highlight-white/5 dark:hover:bg-slate-700"
          defaultValue={sParams.get("search") ?? ""}
        />
      </fieldset>

      <button className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400">
        Submit
      </button>
    </form>
  );
}
