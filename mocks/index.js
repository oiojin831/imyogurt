if (typeof document !== "undefined") {
  const { worker } = require("./browser");
  worker.start();
} else {
  const { server } = require("./server");
  server.listen();
}
