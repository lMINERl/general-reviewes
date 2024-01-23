import { Component, JSX, Show, splitProps } from "solid-js";

interface InputPropTypes {
  input?: JSX.InputHTMLAttributes<HTMLInputElement>;
  label?: JSX.LabelHTMLAttributes<HTMLLabelElement> & { value: JSX.Element };
  error?: JSX.Element;
}

const Input: Component<InputPropTypes> = (props) => {

  return (
    <div class="flex flex-col w-full mb-3 items-start">
      <Show when={props.label?.value} fallback={<></>}>
        <label class="text-gray-200 mb-2 text-base" for={props.input.name} {...props.label}>
          {props.label.value}
        </label>
      </Show>
      <input
        class="text-base rounded-sm w-full outline-none self-start  py-1 px-2 bg-gray-800 text-gray-50"
        {...props.input}
      />
      <Show when={Boolean(props.error)} fallback={<></>}>
        <div class="text-danger">{props.error}</div>
      </Show>
    </div>
  );
};

export default Input;
