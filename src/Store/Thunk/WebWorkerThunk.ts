import { createFactoryWithConstraint } from "ts-essentials";

interface WebWorkerPostMessage {
  type: "timeout" | "interval";
  command: "stop" | "start";
  time: number; //in ms;
}

interface WebWorkerEventData {
  command: "finished" | "aborted";
}

export interface WorkerObject {
  worker: Worker;
  // Init: (scriptURL?: string, options?: WorkerOptions) => WorkerObject;
  postMessageToWorker: (message: WebWorkerPostMessage) => WorkerObject;
  onMessageFromWorker: (
    onMessage: (data: WebWorkerEventData) => void,
  ) => WorkerObject;
  terminate: () => void;
}

export class CreateWebWorker {
  
  private worker: WorkerObject["worker"]= undefined;
  postMessageToWorker: WorkerObject["postMessageToWorker"];
  onMessageFromWorker: WorkerObject["onMessageFromWorker"];
  terminate: WorkerObject["terminate"];

  constructor(scriptURL?: string, options?: WorkerOptions) {
    this.worker = new Worker(
      scriptURL ?? "./worker.js",
      options ?? { type: "classic" },
    );

    this.postMessageToWorker = (message: WebWorkerPostMessage) => {
      this.worker.postMessage(message);
      return this as unknown as WorkerObject;
    };

    this.onMessageFromWorker = (
      onMessage: (data: WebWorkerEventData) => void,
    ) => {
      this.worker.addEventListener(
        "message",
        function (event: MessageEvent<WebWorkerEventData>) {
          onMessage(event.data);
        },
      );
      return this as unknown as WorkerObject;
    };
    this.terminate = () => {
      this.worker.terminate();
      this.worker = null;
    };
    return this;
  }
}
