// https://vike.dev/onRenderHtml

import { renderToStream, renderToString } from "solid-js/web";
import { escapeInject } from "vike/server";
import App from "../pages/App";
import type { OnRenderHtmlAsync } from "vike/types";
import { createUniqueId } from "solid-js";

const onRenderHtml: OnRenderHtmlAsync = async (
  pageContext,
): ReturnType<OnRenderHtmlAsync> => {
  const { Page } = pageContext;

  const stream = renderToStream(() => Page, {
    nonce: "123",
    renderId: createUniqueId(),
  });
  console.log(stream);

  const doc = escapeInject`<!DOCTYPE html>
    <html>
    <head>
       <style> .s{ background-color : red; }</style>
    </head>
      <body>
        <div id="page-view">${stream}</div>
      </body>
    </html>`;

  return doc;
};

export { onRenderHtml };
