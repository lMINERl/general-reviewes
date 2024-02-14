import { Accessor, For, JSX, Show, createEffect, createSignal } from "solid-js";
import { Prettify } from "../../types/types";
import { useNavigate } from "@solidjs/router";

export interface SidebarItemProps {
  selected?: boolean;
  disabled?: boolean;
  name: string;
  path: string;
  onClick?: (item: { name: string; path: string }) => void;
  icon?: JSX.Element;
  items?: SidebarItemProps[];
}

const SidebarItem = (props: Prettify<SidebarItemProps>) => {
  const [selected, setSelected] = createSignal("");
  const navigate = useNavigate();
  const onItemClick = (item: SidebarItemProps) => {
    if (!item.items?.length) {
    console.log('route to about')
      navigate(item.path);
    }
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
        class="w-full bg-gray-800 flex justify-start items-center p-xs1 rounded-lg"
        onClick={() => {
          props.onClick && props.onClick(props);
        }}
      >
        <div class="ml-sm1 w-md1 h-md1">{props.icon}</div>
        <div
          class={`overflow-hidden text-sm ml-xs0 ${
            props.selected ? "text-gray-200" : "text-gray-300"
          } ${props.disabled ? "text-gray-400" : ""} `}
        >
          {props.name}
        </div>
        <Show when={props.items?.length}>
          <div class="w-md1 h-md1 ml-auto">
            <svg
              class={`w-full fill-accent transition-[transform] transform ${props.selected ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
            </svg>
          </div>
        </Show>
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
