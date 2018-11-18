import * as React from "react";

import NumericInput from "./NumericInput";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  numericInputValue?: number;
}

export default ({ numericInputValue, ...rest }: Props) => (
  <div className="app" {...rest}>
    <header role="banner">
      <h1>
        Hapi <abbr title="Server Side Render">SSR</abbr> React Example
      </h1>
    </header>
    <main>
      <p>
        This uses <a href="https://hapijs.com/">Hapi</a> and{" "}
        <a href="https://reactjs.org/docs/react-dom-server.html">
          react-dom’s server-side rendering
        </a>{" "}
        to render a webpage.
      </p>
      <form>
        <NumericInput value={numericInputValue} />
      </form>
    </main>
    <footer role="contentinfo">
      <small>
        Source on{" "}
        <a href="https://github.com/swashcap/hapi-ssr-react-example">GitHub</a>.
      </small>
    </footer>
  </div>
);
