import {
  createEffect,
  createSignal,
  createUniqueId,
  on,
  onCleanup,
  onMount,
  splitProps,
} from "solid-js";
import {
  SmoothCaret,
  passwordChar,
  getTextWidth,
} from "../helpers/smoothCaret";
import { waitForElem } from "../helpers/element";

const useSmoothCaret = () => {

  const inputId = createUniqueId();
  const caretId = createUniqueId();

  const [textWidth, setTextWidth] = createSignal<number>(2);

  createEffect(async () => {
    const inputEl = await waitForElem<HTMLInputElement>(`#${inputId}`);
    const caretEl = await waitForElem<HTMLDivElement>(`#${caretId}`);

    const smoothcaret = new SmoothCaret(caretEl, inputEl, 0);
    const { releaseEvnt } = smoothcaret.init();

    onCleanup(() => {
      releaseEvnt();
    });
  });
  return { inputId, caretId, textWidth };
};
export default useSmoothCaret;
