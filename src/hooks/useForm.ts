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
  formState: ReturnType<Accessor<T>>;
  formErrors: ReturnType<Accessor<{ [k in keyof T]: JSX.Element }>>;
  setFormState: SetStoreFunction<T>;
  setFormErrors: SetStoreFunction<{ [k in keyof T]: JSX.Element }>;
}

function useForm<T extends object>(
  props: Prettify<FormPropsType<T>>,
): Prettify<FormOutput<T>> {
  const [formState, setFormState] = createStore<T>(props.initial as T);
  const [formErrors, setFormErrors] = createStore<{
    [k in keyof T]: JSX.Element;
  }>(
    Object.fromEntries(
      Object.entries(props.initial).map((v) => [v[0], false]),
    ) as any,
  );

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
