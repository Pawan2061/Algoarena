import Code from "../components/Code";
import Navbar from "../components/Navbar";
import Notion from "../components/Notion";
import CodeOutput from "../components/Output";

function Platform() {
  return (
    <>
      <Navbar />
      <div className="flex gap-4  p-1 relative top-2 ">
        <div>
          {" "}
          <Notion />
        </div>
        <div>
          {" "}
          <Code />
          <CodeOutput />
        </div>
      </div>
    </>
  );
}

export default Platform;
