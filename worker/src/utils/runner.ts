
import Docker, { Volume } from 'dockerode';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { v4 as uuid } from 'uuid';

const docker = new Docker();

export async function executeCode_python_code(code:string) {
    console.log("Starting COde exe")

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


export async function executeCode_cpp_code(code: string) {
  console.log("Starting C++ Code Execution");

  const tempFilePath = path.join(__dirname, `code.cpp`);
  fs.writeFileSync(tempFilePath, code);

  console.log("File Write Complete");
  try {
    const container = await docker.createContainer({
      Image: 'gcc',
      Cmd: ['sh', '-c', 'g++ /app/code.cpp -o /app/code && /app/code'],
      Volumes: {
        '/app': {},
      },
      HostConfig: {
        Binds: [`${path.dirname(tempFilePath)}:/app`],
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
  } catch (error: any) {
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
      Image: 'node',  // Docker image for Node.js
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

export async function executeCode_c_code(code: string) {
  console.log("Starting C Code Execution");

  const tempFilePath = path.join(__dirname, `code.c`);
  fs.writeFileSync(tempFilePath, code);

  console.log("File Write Complete");
  try {
    const container = await docker.createContainer({
      Image: 'gcc',
      Cmd: ['sh', '-c', 'gcc /app/code.c -o /app/code && /app/code'],
      Volumes: {
        '/app': {},
      },
      HostConfig: {
        Binds: [`${path.dirname(tempFilePath)}:/app`],
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
  } catch (error: any) {
    return `Error during execution: ${error.message}`;
  } finally {
    fs.unlinkSync(tempFilePath);
  }
}

export async function executeCode_go_code(code: string) {
  console.log("Starting Go Code Execution");

  const tempFilePath = path.join(__dirname, `code.go`);
  fs.writeFileSync(tempFilePath, code);

  console.log("File Write Complete");
  try {
    const container = await docker.createContainer({
      Image: 'golang',
      Cmd: ['go', 'run', `/app/${path.basename(tempFilePath)}`],
      Volumes: {
        '/app': {},
      },
      HostConfig: {
        Binds: [`${path.dirname(tempFilePath)}:/app`],
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
  } catch (error: any) {
    return `Error during execution: ${error.message}`;
  } finally {
    fs.unlinkSync(tempFilePath);
  }
}



export async function executeCode_java_code(code: string) {
  console.log("Starting Java Code Execution");

  const tempFilePath = path.join(__dirname, `Main.java`);
  fs.writeFileSync(tempFilePath, code);

  console.log("File Write Complete");
  try {
    const container = await docker.createContainer({
      Image: 'openjdk', 
      Cmd: ['sh', '-c', 'javac /app/Main.java && java -cp /app Main'],
      Volumes: {
        '/app': {},
      },
      HostConfig: {
        Binds: [`${path.dirname(tempFilePath)}:/app`],
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
  } catch (error: any) {
    return `Error during execution: ${error.message}`;
  } finally {
    fs.unlinkSync(tempFilePath);
  }
}







