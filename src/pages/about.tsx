import { Component, createEffect, createMemo, Suspense } from "solid-js";
import { useRouteData } from "@solidjs/router";
import type { AboutDataType } from "./about.data";
import { useSelector } from "../Store";

export default function About() {
  const name = useRouteData<AboutDataType>();
  const get = createMemo(useSelector((s) => s.task.selected));

  createEffect(() => {
    console.log(name());
  });

  return (
    <section class="bg-pink-100 text-gray-700 p-8">
      <h1 class="text-2xl font-bold">About</h1>

      <p class="mt-4">A page all about this website.</p>

      <p>
        {get().selected}
        <span>We love</span>
        <Suspense fallback={<span>...</span>}>
          <span>&nbsp;{name()}</span>
        </Suspense>
      </p>
    </section>
  );
}
