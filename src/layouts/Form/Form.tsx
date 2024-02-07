import {
  Accessor,
  Component,
  JSX,
  ParentProps,
  Setter,
  Show,
  children,
  createEffect,
  createMemo,
} from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";
import useForm, { FormOutput, FormPropsType } from "../../hooks/useForm";
import { Dynamic } from "solid-js/web";
import { Prettify } from "../../types/types";

export type FormComponentProps<T extends object> = {
  children: Component<FormOutput<T>>;
} & FormPropsType<T>;

function Form<T extends object>(props: Prettify<FormComponentProps<T>>) {
  const form = useForm<T>(props);

  createEffect(() => {
    console.log("adf", form.formErrors());
  });
  return (
    // @ts-ignore to prevent form from submitting when it has button input type sumbmit in its content
    <form onsubmit="return false" class="p-md1 bg-gray-900 rounded-lg w-full">
      <Show when={Boolean(props.children)} fallback={<></>}>
        <Dynamic component={props.children} {...form} />
      </Show>
    </form>
  );
}
export default Form;
