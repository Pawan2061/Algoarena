import * as monaco from 'monaco-editor';
import { useEffect, useState } from 'react';

interface CodeEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  initialValue = '',
  onChange,
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [selectedTheme, setSelectedTheme] = useState('vs-dark');
  const [editor, setEditor] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null);

  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'json', label: 'JSON' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'java', label: 'Java' },
    { value: 'java', label: 'Java' },
    { value: 'java', label: 'Java' },
    { value: 'java', label: 'Java' },
  ];

  const themes = [
    { value: 'vs-dark', label: 'Dark' },
    { value: 'vs-light', label: 'Light' },
    { value: 'hc-black', label: 'High Contrast Dark' },
  ];

  useEffect(() => {
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });

    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ESNext,
      allowNonTsExtensions: true,
      moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
      module: monaco.languages.typescript.ModuleKind.CommonJS,
      noEmit: true,
      typeRoots: ['node_modules/@types'],
    });

    monaco.languages.registerDocumentFormattingEditProvider('javascript', {
      provideDocumentFormattingEdits(model) {
        return [
          {
            range: model.getFullModelRange(),
            text: formatCode(model.getValue(), 'javascript'),
          },
        ];
      },
    });

    monaco.languages.registerDocumentFormattingEditProvider('typescript', {
      provideDocumentFormattingEdits(model) {
        return [
          {
            range: model.getFullModelRange(),
            text: formatCode(model.getValue(), 'typescript'),
          },
        ];
      },
    });

    const editorContainer = document.getElementById('editor');
    if (editorContainer) {
      const newEditor = monaco.editor.create(editorContainer, {
        value: initialValue,
        language: selectedLanguage,
        theme: selectedTheme,
        automaticLayout: true,
        minimap: { enabled: true },
        fontSize: 14,
        lineNumbers: 'on',
        wordWrap: 'on',
        formatOnPaste: true,
        formatOnType: true,
        scrollBeyondLastLine: false,
        renderWhitespace: 'selection',
        folding: true,
        autoClosingBrackets: 'always',
        autoClosingQuotes: 'always',
        suggestOnTriggerCharacters: true,
        acceptSuggestionOnEnter: 'on',
      });

      setEditor(newEditor);

      // Add onChange listener
      newEditor.onDidChangeModelContent(() => {
        const value = newEditor.getValue();
        onChange?.(value);
      });

      return () => newEditor.dispose();
    }
  }, []);

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedLanguage(value);
    if (editor) {
      const model = editor.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, value);
      }
    }
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedTheme(value);
    monaco.editor.setTheme(value);
  };

  const formatCode = (code: string, language: string) => {
    if (language === 'javascript' || language === 'typescript') {
      try {
        code = code.replace(/,([^\s])/g, ', $1');

        code = code.replace(/([+\-*/%=!<>])([\w\d{])/g, '$1 $2');
        code = code.replace(/([\w\d}])([+\-*/%=!<>])/g, '$1 $2');

        code = code.replace(/;(?!\s*(?:\d|\$|\w|\(|\)|\[|\]|\{|\}|$))/g, ';\n');

        code = code.replace(/{(?!\s*(?:\d|\$|\w|\(|\)|\[|\]|\{|\}|$))/g, '{\n');

        code = code.replace(/}(?!\s*(?:\d|\$|\w|\(|\)|\[|\]|\{|\}|$))/g, '\n}');

        const lines = code.split('\n');
        let indent = 0;
        code = lines
          .map((line) => {
            line = line.trim();
            if (line.includes('}')) indent = Math.max(0, indent - 1);
            const formatted = '  '.repeat(indent) + line;
            if (line.includes('{')) indent++;
            return formatted;
          })
          .join('\n');

        return code;
      } catch (error) {
        console.error('Error formatting code:', error);
        return code;
      }
    }
    return code;
  };

  // const handleFormat = () => {
  //   if (editor) {
  //     const model = editor.getModel();
  //     if (model) {
  //       const unformattedCode = model.getValue();
  //       const formattedCode = formatCode(unformattedCode, selectedLanguage);
  //       editor.setValue(formattedCode);
  //     }
  //   }
  // };

  return (
    <div className="flex flex-col gap-4  w-full">
      <div className="flex items-center gap-4 mb-4">
        <div>
          <label className="mr-2">Language:</label>
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="px-2 py-1 border rounded bg-[#324CCD] cursor-pointer text-white"
          >
            {languages.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mr-2">Theme:</label>
          <select
            value={selectedTheme}
            onChange={handleThemeChange}
            className="px-2 py-1 border rounded bg-[#324CCD] cursor-pointer text-white"
          >
            {themes.map((theme) => (
              <option key={theme.value} value={theme.value}>
                {theme.label}
              </option>
            ))}
          </select>
        </div>
        <button className="px-4 py-1 border  cursor-pointer rounded-lg bg-[#324CCD] text-white">
          Submit
        </button>
      </div>
      <div
        id="editor"
        className="h-[400px] mt-[-15px] w-[90vh] border rounded-md overflow-hidden"
      />
    </div>
  );
};

export default CodeEditor;
