import { ErrorBoundary, Suspense, lazy } from "solid-js";
import { ClientOnly } from "vike-solid/ClientOnly";



function Index() {
  console.log("server side");
  
  return (
    <h1>
    server side
      <ClientOnly
        fallback={<h1>...loading</h1>}
        load={() => import("../App")}
        children={(Item) => {
          return <Item />;
        }}
      ></ClientOnly>
    </h1>
  );
}

export default Index;
