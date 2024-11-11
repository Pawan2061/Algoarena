import { execute_js_code, executeCode_c_code, executeCode_cpp_code, executeCode_go_code, executeCode_java_code, executeCode_python_code } from './runner';


export async function execute_python(code:string){
  console.log("Outside exec")
  const python_code_ans = await executeCode_python_code(code)
 return python_code_ans

}

export async function execute_js(code:string) {
  console.log("Outside js docker")
  const js_code_ans = await execute_js_code(code)
  return js_code_ans
  
}

export async function executeCode_c(code:string) {
  console.log("Starting C code ")
  const c_code_ans = await executeCode_c_code(code)
  return c_code_ans
  
}

export async function executeCode_cpp(code:string) {
  console.log("Starting C code ")
  const cpp_code_ans = await executeCode_cpp_code(code)
  return cpp_code_ans
  
}

export async function executeCode_go(code:string) {
  console.log("Starting C code ")
  const go_ans = await executeCode_go_code(code)
  return go_ans
}

export async function executeCode_java(code:string) {
  console.log("Starting C code ")
  const java_ans = await executeCode_java_code(code)
  return java_ans
}






