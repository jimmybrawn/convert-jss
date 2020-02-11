/* eslint-disable no-template-curly-in-string */
import "./App.css";

import React, { useState } from "react";

function App() {
  const [source, setSource] = useState(``);

  const toStyledSyntax = (string: string) => {
    let newString = string.replace(/(\w+)(:\s{)/g, ".$1 {");
    newString = newString
      .replace(/([a-z]|(?=[a-z]))([A-Z])/g, "$1-$2")
      .toLowerCase(); // replace camelCased keys to kebab-case
    newString = newString.replace(/,\s\n|,\n/g, ";\n"); // replace , with ; on EOL

    newString = newString.replace(/"/g, ""); // remove quotes (TODO; add exceptions)
    newString = newString.replace(/(theme.\w+.+\))/g, "${({ theme }) => $1}"); // Refactor theme prop
    newString = newString.replace(/(},)+/g, "}");
    if (newString[newString.length - 1] === ",") {
      newString = newString.replace(/(,$)/g, ";");
    }
    return newString;
  };
  function handleClick() {
    console.log("Button click ...");
  }
  return (
    <div className="App">
      <header className="App-header">
        Convert JSS format
        <div>
          <small>From Object based CSS to plain CSS</small>
        </div>
      </header>
      <main>
        <div className="panels">
          <div className="panel panel-left">
            <label>Object based CSS (input)</label>
            <textarea
              placeholder="Paste object based CSS here"
              onChange={e => setSource(e.currentTarget.value)}
              defaultValue={source}
            />
            <label>Example (input)</label>
            <pre>
              {`display: "flex",
flexWrap: "nowrap",
flexGrow: 1,
maxWidth: 315,
marginRight: theme.spacing(4, 2),
customClassName: {
  borderBottom: "1px solid black"
}`}
            </pre>
          </div>
          <div className="panel panel-right">
            <label>CSS (output)</label>{" "}
            <textarea value={toStyledSyntax(source)} />
            <label>Example (output)</label>
            <pre>
              {`display: flex;
flex-wrap: nowrap;
flex-grow: 1,
max-width: 315,
margin-right: \${({ theme }) => theme.spacing(4, 2)};
.custom-class-name {
  border-bottom: 1px solid black;
}`}
            </pre>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
