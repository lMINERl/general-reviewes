import { Setter } from "solid-js";

interface NavbarProps {
  open: boolean;
  collabseClick: Setter<boolean>;
}

const Navbar = (props: NavbarProps) => {
  return (
    <nav class="flex justify-between items-center px-md0 py-xs0 bg-gray-700">
      <div class="py-xs2 pr-md0 flex justify-start items-center">
        <div class="text-3xl text-white">Evently</div>
        <div class="ml-[7.7rem] w-[24] h-[24]">
          <button
            class="text-gray-50"
            onClick={() => {
              props.collabseClick((old) => !old);
            }}
          >
            {props.open ? "Close" : "Open"}
          </button>
        </div>
      </div>
      <div></div>
    </nav>
  );
};

export default Navbar;
