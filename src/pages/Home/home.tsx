import { createEffect, createSignal, onCleanup } from "solid-js";

export default function Home() {
  const [count, setCount] = createSignal(0);

  const [date, setDate] = createSignal<any>("");

  createEffect(() => {
    const current = new Date();
    current.setMinutes(current.getMinutes() + 0);
    current.setSeconds(current.getSeconds() + 10);
    current.setHours(current.getHours() + 0);

    const hoursOffset = current.getTimezoneOffset() / 60;
    function setup() {
      const f = new Date();

      if (f.getTime() - current.getTime() >= 0) {
        return;
      }

      current.setHours(current.getHours() + hoursOffset);

      f.setTime(current.getTime() - f.getTime());
      const hours =  f.getHours() - f.getHours() % 10 > 0 ? f.getHours().toString() : `0${f.getHours()}`;

      const minutes =  f.getMinutes() - f.getMinutes() % 10 > 0 ? f.getMinutes().toString() : `0${f.getMinutes()}`;
      const seconds =  f.getSeconds() - f.getSeconds() % 10 > 0 ? f.getSeconds().toString() : `0${f.getSeconds()}`;
      setDate(`${hours}:${minutes}:${seconds}`);

      current.setHours(current.getHours() - hoursOffset);
      requestAnimationFrame(setup);
    }
    requestAnimationFrame(setup);
  });

  return (
    <section class="bg-gray-100 text-gray-700 p-8 min-w-full overflow-hidden">
      <h1 class="text-2xl font-bold">Home</h1>
      <p class="mt-4">This is the home page.</p>

      <div class="flex items-center space-x-2">
        <button
          class="border rounded-lg px-2 border-gray-900"
          onClick={() => setCount(count() - 1)}
        >
          -
        </button>

        <output class="p-10px">Count: {date()}</output>

        <output class="p-10px">Count: {count()}</output>

        <button
          class="border rounded-lg px-2 border-gray-900"
          onClick={() => setCount(count() + 1)}
        >
          +
        </button>
      </div>
    </section>
  );
}
