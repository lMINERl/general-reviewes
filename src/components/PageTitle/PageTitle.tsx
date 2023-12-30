import { ParentProps } from "solid-js";

interface PageTitleProps {
  name: string;
}

const PageTitle = (props: ParentProps<PageTitleProps>) => {
  return (
    <div class="w-full flex justify-between items-center bg-gray-1000 max-h-[6.8rem] px-md2">
      <div class="text-xl text-white py-sm0 pl-xs0 my-[0.5rem]">
        {props.name}
      </div>
      <div>{props.children}</div>
    </div>
  );
};

export default PageTitle;
