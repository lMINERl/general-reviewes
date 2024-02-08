export function waitForElem<T>(selector: string): Promise<T> {
  return new Promise((resolve) => {
    let elem = document.querySelector(selector);
    if (elem) {
      return resolve(elem as T);
    }
    const observer = new MutationObserver((_mutaions) => {
      let elem = document.querySelector(selector);
      if (elem) {
        resolve(elem as T);
        observer.disconnect();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}
