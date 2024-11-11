import fs from "fs";
import { exec } from "child_process";
import { v4 as uuid } from 'uuid';
import path from "path";
import Redis from 'ioredis';
import Docker from 'dockerode';
import * as os from 'os';

const redis = new Redis();
const docker = new Docker();

export function execute_python_code(code:string){

  const python_code_ans = executeCode(code)

  console.log(python_code_ans)

}

async function executeCode(code: string): Promise<string> {

  const tempFilePath = path.join(os.tmpdir(), `${uuid()}.py`);

  fs.writeFileSync(tempFilePath, code);

  console.log("File Write Complete")

  try {
      const container = await docker.createContainer({
          Image: 'python:3.9',
          Cmd: ['python', `/app/${path.basename(tempFilePath)}`],
          Volumes: {
              '/app': {} // Mounting the code file to /app inside the container
          },
          HostConfig: {
              Binds: [`${path.dirname(tempFilePath)}:/app`] // Mapping the temp directory
          },
          AttachStdout: true,
          AttachStderr: true,
          Tty: false,
      });

      await container.start();

      const stream = await container.logs({
          stdout: true,
          stderr: true,
          follow: true
      });

      let output = '';
      stream.on('data', (chunk: { toString: () => string; }) => {
          output += chunk.toString();
      });

      await container.wait();
      await container.remove();

      return output;

  } catch (error :any) {
      return `Error during execution: ${error.message}`;
  } finally {
      fs.unlinkSync(tempFilePath);
  }
}
