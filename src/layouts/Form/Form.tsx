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
  splitProps,
} from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";
import useForm, { FormOutput, FormPropsType } from "../../hooks/useForm";
import { Dynamic } from "solid-js/web";
import { Prettify } from "../../types/types";

export type FormComponentProps<T extends object> = {
  children: Component<FormOutput<T>>;
} & FormPropsType<T>;

function Form<T extends object>(props: Prettify<FormComponentProps<T>>) {
  const [formProps, childrenProps] = splitProps(props, [
    "initial",
    "validation",
  ]);

  const form = useForm<T>({
    initial: props.initial,
    validation: props.validation,
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
