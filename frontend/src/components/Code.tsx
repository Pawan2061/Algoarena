import { useState, useRef, useEffect } from "react";

const CodeEditor = () => {
  const [code, setCode] = useState("");
  const [lines, setLines] = useState(["1"]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lineCount = code.split("\n").length;
    setLines(Array.from({ length: lineCount }, (_, i) => String(i + 1)));
  }, [code]);

  const handleScroll = () => {
    if (lineNumbersRef.current && textareaRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  return (
    <div className=" h-[450px] w-[90vh] bg-[#1e1e1e] rounded-lg overflow-hidden flex">
      <div
        ref={lineNumbersRef}
        className="bg-[#252525] text-gray-500 p-2 text-right select-none overflow-hidden"
        style={{ minWidth: "3rem" }}
      >
        {lines.map((num) => (
          <div key={num} className="leading-6">
            {num}
          </div>
        ))}
      </div>

      <textarea
        ref={textareaRef}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onScroll={handleScroll}
        spellCheck="false"
        className="flex-1 bg-transparent text-gray-200 p-2 outline-none resize-none font-mono leading-6 overflow-auto"
        style={{
          whiteSpace: "pre",
          overflowY: "auto",
          minHeight: "100%",
        }}
      />
    </div>
  );
};

export default CodeEditor;
