import Redis from 'ioredis';
import Docker from 'dockerode';
import { executeCode_python_code } from './runner';

const redis = new Redis();
const docker = new Docker();

export function execute_python(code:string){

  const python_code_ans = executeCode_python_code(code)

  console.log(python_code_ans)

}

