//smoothCaret.js made by doovid <3
function css(element: Element, property: string) {
  return window.getComputedStyle(element, null).getPropertyValue(property);
}

function getTextWidthMemo() {
  let ctx = undefined;
  return (text: string, font?: string) => {
    if (!ctx) {
      const canvas: HTMLCanvasElement = document.querySelector("#sc-canvas");
      if (!canvas) {
        throw Error("cannot find canvas element");
      }
      ctx = canvas.getContext("2d");
      ctx.font = font;
    }

    return ctx.measureText(text ?? "a").width;
  };
}
export const getTextWidth = getTextWidthMemo();

//constants: necesary styling, canvas for measuring text and password cover character depending on browser
const styleString =
  ".sc-container{display:grid;grid-template-columns:repeat(1,1fr);}.smoothCaretInput{grid-column:1/3;caret-color:transparent}.caret{grid-column:2/-2;align-self:center;transition:.2s;opacity: 0;}.caret,.smoothCaretInput{grid-row:1/2}";
const style = document.createElement("style");
const canvElem = document.createElement("canvas");
export const passwordChar = navigator.userAgent.match(/firefox|fxios|edg/i)
  ? "\u25CF"
  : "\u2022";

//appending constants to dom
style.innerText = styleString;
document.head.append(style);
canvElem.id = "sc-canvas";
canvElem.style.display = "none";
document.body.appendChild(canvElem);

// let smoothCarets = [];
// let caretPosString: string;

export class SmoothCaret {
  private font: string;
  private maxMargin: number;
  private caretMargin: number;
  private caretWidth: number;
  private letterSpacing: number;
  private caretElem: HTMLDivElement;
  private inputElem: HTMLInputElement;
  private textWidth: number | undefined;
  private index: number;

  private pw_ratio: number;
  constructor(
    caretElem: HTMLDivElement | undefined,
    inputElem: HTMLInputElement,
    index: number,
  ) {
    this.font =
      passwordChar == "\u2022" &&
      inputElem.type == "password" &&
      !navigator.userAgent.match(/chrome|chromium|crios/i)
        ? `${parseFloat(css(inputElem, "font-size")) + 6.25}px ${css(inputElem, "font-family")}`
        : `${css(inputElem, "font-size")} ${css(inputElem, "font-family")}`;
    this.maxMargin = parseInt(css(inputElem.parentElement, "width")) - 10;
    this.caretMargin = parseInt(css(inputElem, "padding-left")) + 0;

    this.caretWidth = parseInt(caretElem.style.width);
    this.letterSpacing = parseInt(css(inputElem, "letter-spacing"))
      ? parseInt(css(inputElem, "letter-spacing"))
      : 0;
    this.caretElem = caretElem;
    this.inputElem = inputElem;
    this.textWidth = undefined;
    this.index = index;
  }

  init() {
    console.log(this.letterSpacing);
    this.inputElem.dataset.sc = this.index.toString();
    this.pw_ratio =
      this.inputElem.type == "password"
        ? getTextWidth(passwordChar + passwordChar, this.font) -
          getTextWidth(passwordChar, this.font)
        : null;

    const onBlur = () => {
      this.caretElem.style.opacity = "";
    };

    const onInput = (e: any) => {
      const selectionIndex = (document.activeElement as any).selectionStart;
      const { value } = e.target;
      const { length } = value ?? "";

      this.update(
        e.target.type === "password"
          ? Array(length + 1)
              .join(passwordChar)
              .slice(0, selectionIndex)
          : value.slice(0, selectionIndex),
      );
      if (length == 0) {
        // onBlur();
        this.caretElem.style.opacity = "1";
        this.caretElem.style.transform = "translateX('2px')";
      }
    };

    const onFocus = (e) => {
      this.caretElem.style.opacity = "1";
      this.update(e.target.value);
    };

    const onKeyUp = (e) => {
      if (e.keyCode == 37 || e.keyCode == 39) {
        let { selectionStart, selectionEnd } = document.activeElement as any;
        const { value } = e.target;
        const { length } = value ?? "";
        let currentSelection = selectionStart;
        if (selectionStart != selectionEnd) {
          if (e.keyCode == 37) {
            currentSelection = selectionStart;
          }
          if (e.keyCode == 39) {
            currentSelection = selectionEnd;
          }
        }
        this.update(
          e.target.type === "password"
            ? Array(length + 1)
                .join(passwordChar)
                .slice(0, currentSelection)
            : value.slice(0, currentSelection),
        );
      }
    };

    this.inputElem.addEventListener("input", onInput);
    this.inputElem.addEventListener("blur", onBlur);
    this.inputElem.addEventListener("focus", onFocus);
    this.inputElem.addEventListener("keyup", onKeyUp);
    this.inputElem.addEventListener("click", onKeyUp);
    return {
      releaseEvnt: () => {
        this.inputElem.removeEventListener("input", onInput);
        this.inputElem.removeEventListener("blur", onBlur);
        this.inputElem.removeEventListener("focus", onFocus);
        this.inputElem.removeEventListener("keyup", onKeyUp);
        this.inputElem.removeEventListener("click", onKeyUp);
      },
      textWidth: getTextWidth(".", this.font),
    };
  }

  update(text: string) {
    this.caretElem.style.opacity = "1";
    this.textWidth = this.pw_ratio
      ? this.pw_ratio * text.length +
        this.caretMargin +
        this.letterSpacing * (text.length - 1)
      : getTextWidth(text, this.font) > 0
        ? getTextWidth(text, this.font) +
          this.caretMargin +
          this.letterSpacing * (text.length - 1)
        : this.caretMargin - this.caretWidth / 2;
    this.textWidth > this.maxMargin
      ? void 0
      : (this.caretElem.style.transform = `translateX(${this.textWidth}px)`);
  }
}

// function initsmoothCarets() {
//   document.querySelectorAll(".sc-container").forEach((element, index) => {
//     smoothCarets.push(
//       new SmoothCaret(element.children[1], element.children[0], index),
//     );
//     smoothCarets[index].init();
//   });
//
//   setInterval(() => {
//     if (document.activeElement.getAttribute("data-sc")) {
//       caretPosString =
//         document.activeElement.type === "password"
//           ? (caretPosString = Array(document.activeElement.value.length + 1)
//               .join(passwordChar)
//               .slice(0, document.activeElement.selectionStart))
//           : (caretPosString = document.activeElement.value.slice(
//               0,
//               document.activeElement.selectionStart,
//             ));
//       smoothCarets[parseInt(document.activeElement.dataset.sc)].update(
//         caretPosString,
//       );
//     }
//   });
// }
