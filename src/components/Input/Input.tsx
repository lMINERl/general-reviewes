import {
  Component,
  JSX,
  Show,
  children,
  createEffect,
  createMemo,
  createSignal,
  mergeProps,
  splitProps,
} from "solid-js";
import { Dynamic, createComponent } from "solid-js/web";
import useSmoothCaret from "../../hooks/useSmoothCaret";

interface InputPropTypes {
  input?:
    | JSX.InputHTMLAttributes<HTMLInputElement>
    | Component<JSX.InputHTMLAttributes<HTMLInputElement>>;
  label?: JSX.LabelHTMLAttributes<HTMLLabelElement> & {
    value: JSX.Element | Component;
  };
  error?: JSX.Element | Component;
}

const Input: Component<InputPropTypes> = (props) => {
  const { inputId, caretId } = useSmoothCaret();

  return (
    <>
      <div
        class={`flex flex-col w-full ${props.error ? "mb-3" : ""} items-start`}
      >
        <Show when={props.label?.value} fallback={<></>}>
          <label
            class="text-gray-200 mb-2 text-base"
            for={inputId}
            {...props.label}
          >
            <Show when={typeof props.label == "string"}>
              {props.label.value}
            </Show>
          </label>
        </Show>

        <div data-sc="" class="sc-container w-full">
          <Dynamic
            component={typeof props.input == "function" ? props.input : "input"}
            {...(typeof props.input == "object" ? props.input : {})}
            id={inputId}
            class={`smoothCaretInput text-base rounded-sm w-full outline-none self-start  py-1 bg-gray-700 text-gray-50 px-2`}
          />
          <div
            id={caretId}
            class={`caret bg-success h-[80%] rounded-lg`}
            // style={{ width: `${textWidth()}px` }}
            style={{ width: `2px` }}
          ></div>
        </div>
      </div>
      <div class="text-danger">{props.error as any}</div>
    </>
  );
};

export default Input;
