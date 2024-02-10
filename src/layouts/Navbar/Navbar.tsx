import { Setter, Show } from "solid-js";

interface NavbarProps {
  open: boolean;
  collabseClick: Setter<boolean>;
}

const Navbar = (props: NavbarProps) => {
  return (
    <nav class="flex justify-between items-center px-md0 py-xs0 bg-gray-700">
      <div class="w-full md:w-auto py-xs2 pr-md0 flex justify-start items-center">
        <div class="text-3xl text-white">Evently</div>
        <div class="ml-auto md:ml-[7.7rem] w-[24px] h-[24px] flex items-center">
          <button
            class="text-gray-50"
            onClick={() => {
              props.collabseClick((old) => !old);
            }}
            type="button"
          >
            <svg
              class="w-full"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                class="fill-processing "
                d={`${props.open ? "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" : "M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"}`}
              />
            </svg>
          </button>
        </div>
      </div>
      <div></div>
    </nav>
  );
};

export default Navbar;
