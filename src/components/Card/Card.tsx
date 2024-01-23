import { Component, JSX, Show } from "solid-js";
import Form, { FormComponentProps } from "../../layouts/Form/Form";

interface CardProps<T extends object> {
  title: JSX.Element;
  content: JSX.Element;
  action : JSX.Element;
}

function Card<T extends object>(props: CardProps<T>) {
  return (
    <div class="w-full p-md2">
      <div class="w-full mt-sm0 text-gray-300">{props.title}</div>
      <div class="w-full mt-sm0">{props.content}</div>
      <Show when={Boolean(props.action)} fallback={<></>}>
          <div>{props.action}</div>
      </Show>
    </div>
  );
}

export default Card;
