import { For, JSX, ParentProps, Show, createSignal } from "solid-js";
import SidebarItem from "../../components/SidebarItem";
import { SidebarItemProps } from "../../components/SidebarItem/SidebarItem";

const list = [
  { name: "Home", icon: "", path: "" },
  {
    name: "Planning",
    icon: "",
    path: "",
    items: [{ name: "Sessions", path: "" }],
  },
  {
    name: "Attendees",
    icon: "",
    path: "",
    items: [
      {
        name: "YOU",
        items: [
          {
            name: "CAN",
            items: [
              { name: "Nest", items: [{ name: "AS MUCH AS YOU F want" }] },
            ],
          },
        ],
      },
    ],
  },
  { name: "Settings", icon: "", path: "" },
];

interface AppDrawerProps {
  open: boolean;
}

const AppDrawer = (props: ParentProps<AppDrawerProps>) => {
  const [openedItem, setOpenedItem] = createSignal<string>("");

  const onItemClick = (item: { name: string; path: string }) => {
    setOpenedItem((old) => {
      if (old == item.name) {
        return "";
      }
      return item.name;
    });
  };

  const items = (
    <For
      each={list}
      children={(v, i) => {
        return (
          <div>
            <SidebarItem
              name={v.name}
              path={v.path}
              icon={v.icon as unknown as JSX.Element}
              selected={v.name == openedItem()}
              onClick={onItemClick}
              items={v.items as SidebarItemProps[]}
            />
            <Show when={i() != list.length - 1}>
              <div class="border-[1px] border-gray-700 mt-[5px] mb-[5px]" />
            </Show>
          </div>
        );
      }}
    />
  );

  return (
    <div class="flex transition ease-in-out items-stretch">
      <div
        class={`${
          !props.open ? "w-0" : "w-full"
        } relative max-w-[20.8rem] bg-gray-700 overflow-hidden min-h-[100vh]`}
      >
        <ul class="w-full pt-md0 px-sm0 pb-xs1">{items}</ul>
      </div>
      <div class="w-full bg-gray-1000">{props.children}</div>
    </div>
  );
};

export default AppDrawer;
