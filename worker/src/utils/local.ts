import Redis from 'ioredis';
import Docker from 'dockerode';
import { executeCode_python_code } from './runner';

const redis = new Redis();
const docker = new Docker();

export async function execute_python(code:string){
  console.log("Outside exec")
  const python_code_ans = await executeCode_python_code(code)

 return python_code_ans

}

