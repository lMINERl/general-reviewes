import { Show, Switch, createEffect, createSignal, onCleanup } from "solid-js";
import useSnackbar from "../../components/SnackBar/useSnackbar";
import Snackbar from "../../components/SnackBar/Snackbar";
import Form from "../../layouts/Form";
import { createStore } from "solid-js/store";
import Input from "../../components/Input";
import useForm from "../../hooks/useForm";
import Checkbox from "../../components/Checkbox";

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
      const hours =
        f.getHours() - (f.getHours() % 10) > 0
          ? f.getHours().toString()
          : `0${f.getHours()}`;

      const minutes =
        f.getMinutes() - (f.getMinutes() % 10) > 0
          ? f.getMinutes().toString()
          : `0${f.getMinutes()}`;
      const seconds =
        f.getSeconds() - (f.getSeconds() % 10) > 0
          ? f.getSeconds().toString()
          : `0${f.getSeconds()}`;
      setDate(`${hours}:${minutes}:${seconds}`);

      current.setHours(current.getHours() - hoursOffset);
      requestAnimationFrame(setup);
    }
    requestAnimationFrame(setup);
  });

  const [formTask, setFormTask] = createStore<{ title: string }>({ title: "" });

  return (
    <section class="bg-gray-100 text-gray-700 p-8">
      <h1 class="text-2xl font-bold">Tasks</h1>
      <Form
        initial={{ title: "", check: true }}
        validation={{
          title: (value) => {
            return value == "123" ? <p class="text-success"> YES </p> : false;
          },
        }}
      >
        {(props) => {
          return (
            <>
              <Checkbox
                label="switch"
                input={{
                  checked: props.formState.check,
                  onClick: (e) => props.onInput("check", e.target.checked),
                }}
              />
              <div class="flex flex-row items-center justify-between">
                <div class="mx-xs1 flex items-center w-full">
                  <Show when={props.formState.check}>
                    <Input
                      label={{ value: props.formState.title }}
                      input={{
                        type: "text",
                        title: "Input Title",
                        value: props.formState.title,
                        onInput: (e: any) =>
                          props.onInput("title", e.target.value),
                      }}
                      error={props.formErrors.title}
                    />
                  </Show>
                </div>
                <button
                  type="submit"
                  class="border border-gray-600 rounded-lg py-xs0 px-xs1 bg-gray-600 text-gray-50 text-sm hover:border-gray-700 hover:bg-gray-700"
                  onClick={() => {
                    console.log(props.formState, props.formErrors);
                  }}
                >
                  Add
                </button>
              </div>
            </>
          );
        }}
      </Form>
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
