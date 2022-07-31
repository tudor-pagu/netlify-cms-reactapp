import React, { useEffect, useState } from "react";
import MarkdownIt from "markdown-it";
import post1 from "./de-ce-sunt-smecher.md";
import metadataParser from "markdown-yaml-metadata-parser";
function App() {

  const [text, setText] = useState("");
  useEffect(() => {
    fetch(post1)
      .then(response => {
        return response.text();
      })
      .then(text => {
        setText(text);
      });
  });


  const md = new MarkdownIt();
  if (text != "") {
    console.log(md.render(metadataParser(text).content));
  }
  return (
    <div>
      hello world
    </div>
  );
}

export default App;
