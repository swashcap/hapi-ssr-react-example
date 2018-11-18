import hapi from "hapi";
import CombinedStream from "combined-stream2";
import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "../components/App";
import { toStream } from "./utils";

const port = process.env.PORT || 3000;

const RESPONSE_BEGINNING = `
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>Hapi SSR React Example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  </head>
    <body>
`;

const RESPONSE_ENDING = `
    </body>
  </html>`;

const server = new hapi.Server({
  debug: {
    log: ["*"],
    request: ["*"]
  },
  host: "localhost",
  port
});

server.route({
  handler() {
    const combinedStream = CombinedStream.create();

    combinedStream.append(toStream(RESPONSE_BEGINNING));
    combinedStream.append(
      ReactDOMServer.renderToNodeStream(React.createElement(App))
    );
    combinedStream.append(toStream(RESPONSE_ENDING));

    return combinedStream;
  },
  method: "GET",
  path: "/"
});

process.on("unhandledRejection", error => {
  console.error(error);
  process.exit(1);
});

if (require.main === module) {
  server.start().then(() => {
    server.log(`Server running at ${server.info.uri}`);
  });
}

export default server;