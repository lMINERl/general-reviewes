import { JSX, createSignal } from "solid-js";

const useAccordion = () => {
  const [openedItem, setOpenedItem] = createSignal<JSX.Element>("");

  const onItemClick = (item: { name: JSX.Element }) => {
    setOpenedItem((old) => {
      if( old instanceof HTMLElement && item.name instanceof HTMLElement){
        if(old.isEqualNode(item.name)){
          return ""
        }
        return item.name;
      }
      if (old == item.name) {
        return "";
      }
      return item.name;
    });
  };
  return { openedItem, setOpenedItem, onItemClick };
};

export default useAccordion;
