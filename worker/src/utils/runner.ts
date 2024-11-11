
import Docker from 'dockerode';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { v4 as uuid } from 'uuid';

const docker = new Docker();


export async function executeCode_python_code(code:string) {

  const tempFilePath = path.join(__dirname, `${uuid()}.py`);

  fs.writeFileSync(tempFilePath, code);
  
  console.log("File Write Complete");
  try {
    const container = await docker.createContainer({
      Image: 'python',
      Cmd: ['python', `/app/${path.basename(tempFilePath)}`],
      Volumes: {
        '/app': {}, // Mounting the code file to /app inside the container
      },
      HostConfig: {
        Binds: [`${path.dirname(tempFilePath)}:/app`], // Mapping the temp directory
      },
      AttachStdout: true,
      AttachStderr: true,
      Tty: false,
    });
    await container.start();
    const stream = await container.logs({
      stdout: true,
      stderr: true,
      follow: true,
    });
    let output = '';
    stream.on('data', (chunk) => {
      output += chunk.toString();
    });
    await container.wait();
    await container.remove();
    
    return output;
  } catch (error:any) {
    return `Error during execution: ${error.message}`;
  } finally {
    fs.unlinkSync(tempFilePath);
  }
}



export async function execute_js_code(code:string) {
  const tempFilePath = path.join(os.tmpdir(), `${uuid()}.js`);
  fs.writeFileSync(tempFilePath, code);

  console.log("File Write Complete");

  try {
    const container = await docker.createContainer({
      Image: 'node:19-bullseye',  // Docker image for Node.js
      Cmd: ['node', `/app/${path.basename(tempFilePath)}`], 
      Volumes: {
        '/app': {} 
      },
      HostConfig: {
        Binds: [`${path.dirname(tempFilePath)}:/app`] 
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

  } catch (error: any) {
    return `Error during execution: ${error.message}`;
  } finally {
    fs.unlinkSync(tempFilePath);
  }
}


