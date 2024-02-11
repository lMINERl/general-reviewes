// if this doesnt work in production please add this in dist file
let timeoutId;

self.addEventListener("message", function (event) {
  if (
    typeof event.data != "object" ||
    !("type" in event.data) ||
    !("command" in event.data) ||
    !("time" in event.data) ||
    !event.data.type
  ) {
    return;
  }
  const { type, command, time } = event.data;
  if (command == "stop") {
    if (timeoutId) {      
      (type == "timeout" ? this.clearTimeout : this.clearInterval)(timeoutId);
    }
    return;
  }
  if (command == "start") {
    timeoutId = (type == "timeout" ? this.setTimeout : this.setInterval)(() => {
      self.postMessage({command:"finished"});
    }, time);
    return;
  }
});
