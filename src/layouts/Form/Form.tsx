import {
  Accessor,
  Component,
  JSX,
  ParentComponent,
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

// export type FormComponentProps<T extends object> = {
//   children: Component<FormOutput<T>>;
// } & FormPropsType<T>;

function Form(props: ParentProps<{}>) {
  const resolved = children(() => props.children);
  return (
    // @ts-ignore to prevent form from submitting when it has button input type sumbmit in its content
    <form onsubmit="return false" class="p-md1 bg-gray-900 rounded-lg w-full">
      <Show when={Boolean(props.children)} fallback={<></>}>
        {resolved()}
      </Show>
    </form>
  );
}
export default Form;
