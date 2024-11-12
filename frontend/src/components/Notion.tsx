import FileNotion from "./FileNotion";
import "react-notion-x/src/styles.css";
import "prismjs/themes/prism.css";
import "katex/dist/katex.min.css";

function Notion() {
  return (
    <div className="bg-[#1e1e1e] w-[90vh] min-h-screen rounded-lg">
      <div className="text-white rounded-lg bg-[#252525] text-xl p-4">
        Description
      </div>
      <div className="bg-slate-400 opacity-20 h-[1px] w-full"></div>

      <div className="p-4 text-white">
        {/* <p>Click the link to view the Notion page:</p>
        <a
          href="https://www.notion.so/Metaverse-Project-130cbdbea60d8087b6d7f88033b1a7a6"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500"
        >
          View Notion Page
        </a> */}

        <FileNotion />
      </div>
    </div>
  );
}

export default Notion;
