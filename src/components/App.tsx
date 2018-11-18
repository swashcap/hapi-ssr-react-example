import * as React from "react";

export default (props: React.HTMLAttributes<HTMLDivElement>) => (
  <div className="app" {...props}>
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
    </main>
    <footer role="contentinfo">
      <small>
        Source on <a href="#">GitHub</a>.
      </small>
    </footer>
  </div>
);
