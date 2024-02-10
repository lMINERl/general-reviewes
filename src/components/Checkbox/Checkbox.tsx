import { Component, JSX, createUniqueId } from "solid-js";

interface SwitchProps {
  label: string;
  input: JSX.InputHTMLAttributes<HTMLInputElement>;
}
const Checkbox: Component<SwitchProps> = (props) => {
  const inputId = createUniqueId();
  return (
    <label
      for={inputId}
      class="inline-flex text-gray-50 text-xs items-center  rounded-lg select-none box-border cursor-pointer"
    >
      <input
        {...props.input}
        type="checkbox"
        class="peer hidden outline-offset-0 outline-none absolute focus:border-transparent border-[0px] w-sm1 h-sm1"
        id={inputId}
      />
      <label       
       for={inputId}
        class="
      relative flex items-center cursor-pointer
      before:content-[''] peer-focus:before:border-accent hover:before:border-accent before:inline-flex before:rounded-[3px] before:mr-xs0 before:w-[14px] before:h-[14px] before:border before:border-transparent before:border-solid before:bg-gray-500 
      after:content-[''] peer-checked:after:bg-accent after:inline-block after:h-[10px] after:w-[10px] after:rounded-[3px] after:m-[2px] after:absolute after:bg-transparent "
      >
        {props.label}
      </label>
    </label>
  );
};
export default Checkbox;
