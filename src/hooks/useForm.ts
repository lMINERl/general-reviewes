import { SetStoreFunction, createStore } from "solid-js/store";
import { Accessor, JSX, Setter, batch, createSignal } from "solid-js";
import { Prettify } from "../types/types";

export interface FormPropsType<T extends object> {
  initial: T;
  validation?: {
    [k in keyof T]?: (value: any) => JSX.Element;
  };
}

export interface FormOutput<T extends object> {
  onInput: (field: keyof T, value: any) => void;
  formState: Accessor<T>;
  formErrors: Accessor<{ [k in keyof T]: JSX.Element }>;
  setFormState: Setter<T>;
  setFormErrors: Setter<{ [k in keyof T]: JSX.Element }>;
}

function useForm<T extends object>(
  props: Prettify<FormPropsType<T>>,
): Prettify<FormOutput<T>> {
  const [formState, setFormState] = createSignal<T>(props.initial as T);
  const [formErrors, setFormErrors] = createSignal<{
    [k in keyof T]: JSX.Element;
  }>({} as any);

  const onInput = (field: keyof T, value: any) => {
    batch(() => {
      setFormState((old) => {
        return { ...old, [field]: value };
      });

      if (props.validation?.[field]) {
        setFormErrors((old) => {
          return { ...old, [field]: props.validation[field](value) };
        });
      }
    });
  };

  return {
    onInput,
    formState,
    formErrors,
    setFormState,
    setFormErrors,
  };
}

export default useForm;
