import { SetStoreFunction, createStore } from "solid-js/store";
import {
  Accessor,
  JSX,
  Setter,
  createEffect,
  createReaction,
  createSignal,
} from "solid-js";

export interface FormPropsType<T extends object> {
  initial: T;
  validation?: {
    [k in keyof T]?: (value: any) => JSX.Element;
  };
}

export interface Output<T extends object> {
  onInput: (
    field: keyof T,
    value: (
      e: Parameters<
        // @ts-ignore
        JSX.CustomEventHandlersCamelCase<HTMLInputElement>["onInput"]
      >[0],
    ) => any,
  ) => JSX.CustomEventHandlersCamelCase<HTMLInputElement>["onInput"];
  formState: T;
  formErrors: { [k in keyof T]: JSX.Element };
  setFormState: SetStoreFunction<T>;
  setFormErros: SetStoreFunction<{ [k in keyof T]: JSX.Element }>;
}

function useForm<T extends object>(props: FormPropsType<T>): Output<T> {
  const [formState, setFormState] = createStore<T>(props.initial as T);
  const [formErrors, setFormErros] = createStore<{
    [k in keyof T]: JSX.Element;
  }>({} as any);

  const onInput = (field: keyof T, value: (event: any) => any) => {
    return (event: any) => {
      setFormState((old) => {
        return { ...old, [field]: value(event) };
      });

      if (props.validation?.[field]) {
        setFormErros((old) => {
          return { ...old, [field]: props.validation[field](value(event)) };
        });
      }
    };
  };

  return {
    onInput,
    formState,
    formErrors,
    setFormState,
    setFormErros,
  };
}

export default useForm;
