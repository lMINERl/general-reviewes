import {
  Accessor,
  Component,
  For,
  JSX,
  createEffect,
  createSignal,
  onCleanup,
} from "solid-js";
interface AccordionDataType {
  title: JSX.Element | string;
  content: JSX.Element | string;
  onOpen?: () => void;
}
interface AccordionProps {
  data: AccordionDataType[];
  singleOpen?: boolean; // controls if the accordion list should only open one accordion and close others
}
const Accordion: Component<AccordionProps> = (props) => {
  const [opend, setOpend] = createSignal([]);
  const detailedEls: HTMLDetailsElement[] = [];
  createEffect(() => {
    function onSummaryClick(e: MouseEvent) {
      
      detailedEls.forEach((details) => {
        if (props.singleOpen && details.open && e.target != details) {
          details.open = false;
        }
      });
    }

    detailedEls.forEach((v) => {
      v.querySelector("summary").addEventListener("click", onSummaryClick);
    });

    onCleanup(() => {
      detailedEls.forEach((v) => {
        v.querySelector("summary").removeEventListener("click", onSummaryClick);
      });
    });
  });

  return (
    <div>
      <For
        each={props.data ?? []}
        fallback={<div> loading ...</div>}
        children={(item, index) => {
          return (
            <details ref={detailedEls[index()]} class="text-white text-sm">
              <summary
                onClick={() => {
                  if (!detailedEls[index()]?.open) {
                    item.onOpen && item.onOpen();
                  }
                }}
              >
                {item.title}
              </summary>
              <div>{item.content}</div>
            </details>
          );
        }}
      />
    </div>
  );
};
export default Accordion;
