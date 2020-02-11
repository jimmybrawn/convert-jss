/* eslint-disable no-template-curly-in-string */
import "./App.css";

import React, { useState } from "react";

function App() {
  const testString = `
  display: "flex",
  flexWrap: "nowrap",
  flexGrow: 1,
  maxWidth: 315,
  marginRight: theme.spacing(4, 2),
  marginRight: theme.spacing(4),
`;
  const [source, setSource] = useState(``);

  const toStyledSyntax = (string: string) => {
    let newString = string.replace(/(\w+)(:\s{)/g, ".$1 {");
    newString = newString
      .replace(/([a-z]|(?=[a-z]))([A-Z])/g, "$1-$2")
      .toLowerCase(); // replace camelCased keys to kebab-case
    newString = newString.replace(/,\s\n|,\n/g, ";\n"); // replace , with ; on EOL

    newString = newString.replace(/"/g, ""); // remove quotes (TODO; add exceptions)
    newString = newString.replace(/(theme.\w+.+\))/g, "${({ theme }) => $1}"); // Refactor theme prop
    console.log(newString);
    newString = newString.replace(/(},)+/g, "}");
    if (newString[newString.length - 1] === ",") {
      newString = newString.replace(/(,$)/g, ";");
    }

    return newString;
    // margin: ${({ theme }) => theme.spacing(2, 3)};
  };

  return (
    <div className="App">
      <header className="App-header">
        Migrate JSS Syntax
        <div>
          <small>
            From Object based (Material UI's JSS, makeStyles) to CSS (good for
            styled-components)
          </small>
        </div>
      </header>
      <main>
        <div className="panels">
          <div className="panel panel-left">
            <label>Object based CSS (input)</label>
            <textarea
              onChange={e => setSource(e.currentTarget.value)}
              defaultValue={source}
            />
          </div>
          <div className="panel panel-right">
            <label>CSS (output)</label>
            <textarea defaultValue={toStyledSyntax(source)} disabled />
          </div>
        </div>
        {/* <pre>
          display: "flex", flexWrap: "nowrap", flexGrow: 1, maxWidth: 315,
          marginRight: theme.spacing(4, 2),
        </pre> */}
      </main>
    </div>
  );
}

export default App;
