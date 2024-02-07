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
      children={(v) => {
        return (
          <SidebarItem
            name={v.name}
            path={v.path}
            icon={v.icon as unknown as JSX.Element}
            selected={v.name == openedItem()}
            onClick={onItemClick}
            items={v.items as SidebarItemProps[]}
          />
        );
      }}
    />
  );

  return (
    <div class="flex items-stretch">
      <div
        class={`${
          !props.open ? "w-0" : "w-full"
        } relative md:max-w-[20.8rem] bg-gray-700 overflow-hidden min-h-[100vh] transition-all ease-linear rounded-r-lg`}
      >
        <ul class="w-full pt-md0 px-sm0 pb-xs1">{items}</ul>
      </div>
      <div
        class={`${!props.open ? "w-full" : "w-0"} md:w-full transition-all ease-linear overflow-hidden bg-gray-1000`}
      >
        {props.children}
      </div>
    </div>
  );
};

export default AppDrawer;
