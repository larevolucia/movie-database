import React, { useState } from "react";

const ParagraphFormatter = (text) => {
  const [paragraphs, setParagraphs] = useState([]);
  const paragraphsArray = text.split("\n\n");

  setParagraphs(paragraphsArray);

  return (
    <div>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
};

export default ParagraphFormatter;
