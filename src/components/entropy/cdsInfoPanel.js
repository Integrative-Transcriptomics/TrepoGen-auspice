import React from "react";
import { parseMarkdown } from "../../util/parseMarkdown";

const CdsInfoPanel = ({ title, content }) => {
  if (!content) return null;

  const html = parseMarkdown(content);

  return (
    <div className="feature-info-panel">
      <div className="feature-info-panel-title">{title}</div>
      <div
        className="feature-info-panel-markdown"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
};

export default CdsInfoPanel;
