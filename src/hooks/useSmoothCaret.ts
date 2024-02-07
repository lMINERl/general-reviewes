import { createEffect, createSignal, on, onCleanup } from "solid-js";
import {
  SmoothCaret,
  passwordChar,
  getTextWidth,
} from "../helpers/smoothCaret";

const useSmoothCaret = () => {
  const [container, setContainer] = createSignal<HTMLDivElement>(undefined);
  const [textWidth, setTextWidth] = createSignal<number>(2);

  createEffect(
    on(
      container,
      (container) => {
        if (
          !container ||
          !container.children?.[0] ||
          !container.children?.[1]
        ) {
          return;
        }
        const smoothcaret = new SmoothCaret(
          container.children[1] as HTMLDivElement,
          container.children[0] as HTMLInputElement,
          0,
        );
        const { releaseEvnt } = smoothcaret.init();

        let caretPosString = "";
        let minWidth = getTextWidth("a");
        let width = 0;
        const intervalId = setInterval(() => {
          if (
            document.activeElement.getAttribute("data-sc") &&
            document.activeElement instanceof HTMLInputElement
          ) {
            width = getTextWidth(
              document.activeElement.value[
                document.activeElement.selectionStart
              ],
            );
            setTextWidth(width);

            caretPosString =
              document.activeElement.type === "password"
                ? (caretPosString = Array(
                    document.activeElement.value.length + 1,
                  )
                    .join(passwordChar)
                    .slice(0, document.activeElement.selectionStart))
                : (caretPosString = document.activeElement.value.slice(
                    0,
                    document.activeElement.selectionStart,
                  ));
            smoothcaret.update(caretPosString);
          }
        });

        onCleanup(() => {
          releaseEvnt();
          clearInterval(intervalId);
        });
      },
      { defer: true },
    ),
  );
  return { setContainer, textWidth };
};
export default useSmoothCaret;
