// import React, { useEffect, useState } from "react";
// import { NotionAPI } from "notion-client";
// import { NotionRenderer } from "react-notion-x";
// import { ExtendedRecordMap } from "notion-types";

// yesley not workking cause of CORS error so backend bata naii fetch gaar aaba

// const FileNotion: React.FC = () => {
//   const [recordMap, setRecordMap] = useState<ExtendedRecordMap | null>(null);

//   useEffect(() => {
//     const fetchPage = async () => {
//       const notion = new NotionAPI();
//       try {
//         const data = await notion.getPage("1357dfd1073580fca0f0f73f40843822");
//         setRecordMap(data);
//       } catch (error) {
//         console.error("Failed to fetch Notion page:", error);
//       }
//     };

//     fetchPage();
//   }, []);

//   if (!recordMap) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} />
//   );
// };

// export default FileNotion;

import React, { useEffect, useState } from "react";
import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";

const FileNotion: React.FC = () => {
  const [recordMap, setRecordMap] = useState<ExtendedRecordMap | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const response = await fetch("backend ko url i need");
        if (!response.ok) {
          throw new Error("Failed to fetch Notion page");
        }
        const data = await response.json();
        setRecordMap(data);
      } catch (error) {
        console.error("Failed to fetch Notion page:", error);
      }
    };

    fetchPage();
  }, []);

  if (!recordMap) {
    return <div>Loading...</div>;
  }

  return (
    <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} />
  );
};

export default FileNotion;
