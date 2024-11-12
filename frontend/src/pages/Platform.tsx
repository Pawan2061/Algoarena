import CodeEditor from '../components/Code';

import Notion from '../components/Notion';
import CodeOutput from '../components/Output';

function Platform() {
  return (
    <>
      <div className="flex gap-4  p-1 relative top-2 ">
        <div>
          {' '}
          <Notion />
        </div>
        <div className="">
          {' '}
          <CodeEditor />
          <CodeOutput />
        </div>
      </div>
    </>
  );
}

export default Platform;
