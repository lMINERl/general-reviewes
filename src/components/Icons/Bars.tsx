import { Component, Show, createEffect, createRenderEffect, createSignal, on, onMount } from "solid-js";
// const Snap = (...args: any) => ({
//   select: (...args: any) => undefined,
//   animate: () => undefined,
// });
// const mina = {
//   backout: 0,
// };
export enum SvgName {
  Close,
  Bar,
  Cloud,
  ShoppingCart
}
interface SvgComponentProps {
  selected: SvgName;
}




let items = [];
items[SvgName.Cloud] = "M0 336c0 79.5 64.5 144 144 144H512c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z";
items[SvgName.ShoppingCart] = "M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z";

items[SvgName.Bar] =
  "M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z";

items[SvgName.Close] =
  "M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z";

const SvgComponent = (props: SvgComponentProps) => {
  let [last, setLast] = createSignal<
    | {
        name: SvgName;
        pos: "initial" | "morph";
      }
    | undefined
  >();
  let [svgref,setSvg]= createSignal<SVGElement>( undefined);
  let [initialref,setInitial]= createSignal< SVGPathElement >(undefined);
  let [morphref,setMorph]= createSignal< SVGPathElement> (undefined);

  createEffect(() => {
    const initial = initialref();
    if (!initial) {
      return;
    }
    const d = initial.getAttribute("d");
    if (d) {
      return;
    }
    initial.setAttribute('d', items[props.selected]);
    setLast((old) => ({
      ...(old ?? {}),
      name: props.selected,
      pos: "initial",
    }));
  });

  createEffect(() => {
    const svg = svgref();
    if (!svg || last()?.name === undefined || last().name == props.selected) {
      return;
    }
    const initial = initialref();
    const morph = morphref()
    // set the next path with the new 'd'
    const item = last()?.pos == "initial" ? morph : initial;
    morph.setAttribute("d", items[props.selected]);

    const s = Snap(svg);

    const init = s.select("#initial");
    const morphed = s.select("#morph");
    const initPoints = init.node.getAttribute("d");
    const morphedPoints = morphed.node.getAttribute("d");

    init.animate({ d: morphedPoints }, 500, mina.backout);
    
    setLast((old) => ({
      ...old,
      name: props.selected,
      pos: old.pos == "initial" ? "morph" : "initial",
    }));

  });

  return (
    <svg
      ref={el=> setSvg(el) }
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
    >
      <path ref={(el)=>setInitial(el)} id="initial" d="" />
      <path ref={(el)=>setMorph(el)} opacity="0" id="morph" d="" />
    </svg>
  );
};
export default SvgComponent;
