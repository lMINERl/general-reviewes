import { Accessor, For, JSX, createEffect, createSignal } from "solid-js";

export interface SidebarItemProps {
  selected?: boolean;
  disabled?: boolean;
  name: string;
  path: string;
  onClick?: (item: { name: string; path: string }) => void;
  icon?: JSX.Element;
  items?: SidebarItemProps[];
}

const SidebarItem = (props: SidebarItemProps) => {
  const [selected, setSelected] = createSignal("");

  const onItemClick = (item: { name: string; path: string }) => {
    setSelected((old) => {
      if (old == item.name) {
        return "";
      }
      return item.name;
    });
  };

  const items = (
    <>
      <For
        each={props.items}
        children={(v) => {
          return (
            <SidebarItem
              name={v.name}
              path={v.path}
              selected={v.name == selected()}
              onClick={onItemClick}
              items={v.items}
            />
          );
        }}
      />
    </>
  );

  createEffect(() => {
    if (!props.selected) {
      setSelected("");
    }
  }, [props.selected]);

  return (
    <li class="w-full flex flex-col justify-start items-start overflow-hidden">
      <button
        class="w-full bg-gray-800 flex justify-center items-start p-xs1 rounded-lg"
        onClick={() => {
          props.onClick && props.onClick(props);
        }}
      >
        <div class="w-[24px] h-[24px]">{props.icon}</div>
        <div
          class={`overflow-hidden text-sm ml-xs0 ${
            props.selected ? "text-gray-200" : "text-gray-300"
          } ${props.disabled ? "text-gray-400" : ""} `}
        >
          {props.name}
        </div>
        <div class="w-[24] h-[24] ml-[4.3rem]"></div>
      </button>
      <ul
        class={`flex justify-start flex-col items-start overflow-hidden w-full ${
          props.selected ? "h-full" : "h-0"
        }`}
      >
        {items}
      </ul>
    </li>
  );
};

export default SidebarItem;
