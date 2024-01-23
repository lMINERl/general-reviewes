import {
  Accessor,
  Component,
  JSX,
  ParentProps,
  Setter,
  Show,
  createEffect,
  createMemo,
} from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";
import useForm, { FormOutput, FormPropsType } from "../../hooks/useForm";

export type FormComponentProps<T extends object> = {
  children: Component<FormOutput<T>>;
} & FormPropsType<T>;

function Form<T extends object>(props: FormComponentProps<T>) {
  const formData = useForm<T>(props);
  const Content = props.children;
  return (
    <form class="p-md1 bg-gray-900 rounded-lg w-full">
      <Show when={Boolean(Content)} fallback={<></>}>
        <Content {...formData} />
      </Show>
    </form>
  );
}
export default Form;
