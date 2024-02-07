import { For, JSX, createEffect, createSignal } from "solid-js";

interface AccordionProps<T> {
  selected?: boolean;
  disabled?: boolean;
  name: JSX.Element;
  data?: T;
  onClick?: (item: AccordionProps<T>, toggle?: () => void) => void;
  items?: AccordionProps<T>[];
}

function Accordion<T>(props: AccordionProps<T>) {
  const [selected, setSelected] = createSignal<JSX.Element>("");

  const onItemClick = (item: AccordionProps<T>) => {
    setSelected((old) => {
      if (old == item.name) {
        return "";
      }
      return item.name;
    });
  };

  const items = (
    <div class="w-full">
      <For
        each={props.items}
        children={(v) => {
          return (
            <Accordion
              name={v.name}
              selected={v.name == selected()}
              onClick={
                v.onClick
                  ? () => v.onClick(v, () => onItemClick(v))
                  : onItemClick
              }
              items={v.items}
            />
          );
        }}
      />
    </div>
  );

  createEffect(() => {
    if (!props.selected) {
      setSelected("");
    }
  }, [props.selected]);

  return (
    <ul>
      <li class="w-full flex flex-col justify-start items-start overflow-hidden">
        <button
          class="w-full bg-gray-800 flex justify-center items-start p-xs1"
          onClick={() => {
            props.onClick && props.onClick(props);
          }}
        >
          <div
            class={`overflow-hidden text-sm ml-xs0 ${
              props.selected ? "text-gray-200" : "text-gray-300"
            } ${props.disabled ? "text-gray-400" : ""} `}
          >
            {props.name}
          </div>
          <div class="w-[24px] h-[24px] ml-[4.3rem]"></div>
        </button>
        <ul
          class={`flex justify-start flex-col items-start overflow-hidden w-full ${
            props.selected ? "h-[100%]" : "h-[0]"
          }`}
        >
          {items}
        </ul>
      </li>
    </ul>
  );
}

export default Accordion;
