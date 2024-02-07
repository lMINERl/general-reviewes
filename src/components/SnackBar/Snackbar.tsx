import { Component, For, Show } from "solid-js";

type AlertTypes = "danger" | "success" | "progress" | "processing" | "warning";
export interface SnackbarItem {
  message: string;
  type: AlertTypes;
  action?: {
    onClose?: () => void;
    onAction?: () => void;
  };
}

export interface SnackbarProps {
  list: SnackbarItem[];
}

const getMessageType = (type: AlertTypes) => {
  // @eslint-ignore @ts-ignore
  return (
    <div class="bg-progress bg-processing bg-danger bg-danger bg-warning"></div>
  );
};

const Snackbar: Component<SnackbarProps> = (props) => {
  console.log("props", props);
  return (
    <>
      <Show when={Boolean(props.list?.length ?? 0)}>
        <div class="w-full h-[100vh] p-md2 flex flex-col bg-gray-1000 opacity-50">
          <For
            each={props.list ?? []}
            fallback={<></>}
            children={(item) => {
              return (
                <div class={`w-full rounded-lg bg-${item.type}`}>
                  <p>{item.message}</p>
                  <Show when={Boolean(item.action)}>
                    <div>
                      <Show when={Boolean(item.action.onAction)}>
                        <button
                          type="button"
                          onClick={() => {
                            item.action.onAction();
                          }}
                        >
                          {/* TODO: add action icon*/}
                        </button>
                      </Show>
                      <Show when={Boolean(item.action.onClose)}>
                        <button
                          type="button"
                          onClick={() => {
                            item.action.onClose();
                          }}
                        >
                          {/* TODO: add close icon*/}
                        </button>
                      </Show>
                    </div>
                  </Show>
                </div>
              );
            }}
          />
        </div>
      </Show>
    </>
  );
};
export default Snackbar;
