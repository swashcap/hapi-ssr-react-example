import hapi from "hapi";
import inert from "inert";
import path from "path";
import CombinedStream from "combined-stream2";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { performance } from "perf_hooks";
import debug from "debug";

import App from "../components/App";
import { toStream } from "./utils";

const debugLog = debug("hapissr");

const port = process.env.PORT || 3000;

const INITIAL_PROPS = { numericInputValue: 2 };

const RESPONSE_BEGINNING = `<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>Hapi SSR React Example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <link rel="stylesheet" href="styles.css">
  </head>
    <body>
`;

const RESPONSE_ENDING = `
      <script>
        __INITIAL_PROPS__ = ${JSON.stringify(INITIAL_PROPS)}
      </script>
      <script async src="bundle.js"></script>
    </body>
  </html>`;

// can't use top-level async/await
const getServer = async () => {
  const server = new hapi.Server({
    debug: {
      log: ["*"],
      request: ["*"]
    },
    host: "localhost",
    port,
    routes: {
      files: {
        relativeTo: path.resolve(__dirname, "../../public")
      }
    }
  });

  await server.register(inert);

  server.route({
    method: "GET",
    path: "/{param*}",
    handler: {
      directory: {
        path: ".",
        redirectToSlash: true,
        index: false
      }
    }
  });
  server.route({
    handler() {
      const combinedStream = CombinedStream.create();

      combinedStream.append(toStream(RESPONSE_BEGINNING));
      combinedStream.append(
        ReactDOMServer.renderToNodeStream(
          React.createElement(App, INITIAL_PROPS)
        )
      );
      combinedStream.append(toStream(RESPONSE_ENDING));

      return combinedStream;
    },
    method: "GET",
    path: "/"
  });

  return server;
};

process.on("unhandledRejection", error => {
  console.error(error);
  process.exit(1);
});

if (require.main === module) {
  getServer().then(async server => {
    await server.start();
    debugLog(performance.now());
    server.log(`Server running at ${server.info.uri}`);
  });
}

export default getServer;
