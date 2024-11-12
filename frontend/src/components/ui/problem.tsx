import React, { useState, ReactNode } from "react";
import { Plus, Trash2, Save, Eye } from "lucide-react";
import Navbar from "../Navbar";

interface CardProps {
  children: ReactNode;
  className?: string;
}

interface CardHeaderProps {
  children: ReactNode;
}

interface CardTitleProps {
  children: ReactNode;
}

interface CardContentProps {
  children: ReactNode;
}

interface TestCase {
  input: string;
  expectedOutput: string;
}

interface Problem {
  id?: number;
  title: string;
  difficulty: "easy" | "medium" | "hard";
  description: string;
  boilerplate: string;
  testCases: TestCase[];
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => (
  <div
    className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}
  >
    {children}
  </div>
);

const CardHeader: React.FC<CardHeaderProps> = ({ children }) => (
  <div className="border-b border-gray-200 p-4">{children}</div>
);

const CardTitle: React.FC<CardTitleProps> = ({ children }) => (
  <h2 className="text-lg font-semibold text-gray-900">{children}</h2>
);

const CardContent: React.FC<CardContentProps> = ({ children }) => (
  <div className="p-4">{children}</div>
);

export const ProblemAdminPanel: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [currentProblem, setCurrentProblem] = useState<Problem>({
    title: "",
    difficulty: "easy",
    description: "",
    boilerplate: "",
    testCases: [{ input: "", expectedOutput: "" }],
  });

  const handleSaveProblem = (): void => {
    if (currentProblem.title) {
      setProblems([...problems, { ...currentProblem, id: Date.now() }]);
      setCurrentProblem({
        title: "",
        difficulty: "easy",
        description: "",
        boilerplate: "",
        testCases: [{ input: "", expectedOutput: "" }],
      });
    }
  };

  const addTestCase = (): void => {
    setCurrentProblem({
      ...currentProblem,
      testCases: [
        ...currentProblem.testCases,
        { input: "", expectedOutput: "" },
      ],
    });
  };

  const removeTestCase = (index: number): void => {
    const newTestCases = currentProblem.testCases.filter((_, i) => i !== index);
    setCurrentProblem({ ...currentProblem, testCases: newTestCases });
  };

  const updateTestCase = (
    index: number,
    field: keyof TestCase,
    value: string
  ): void => {
    const newTestCases = currentProblem.testCases.map((testCase, i) => {
      if (i === index) {
        return { ...testCase, [field]: value };
      }
      return testCase;
    });
    setCurrentProblem({ ...currentProblem, testCases: newTestCases });
  };

  const removeProblem = (id: number): void => {
    setProblems(problems.filter((problem) => problem.id !== id));
  };

  return (
    <main className="">
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto ">
        <div className="text-center text-2xl font-semibold">
          Create the problems and manage them
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
          <Card>
            <CardHeader>
              <CardTitle>Create New Problem</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={currentProblem.title}
                    onChange={(e) =>
                      setCurrentProblem({
                        ...currentProblem,
                        title: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Difficulty
                  </label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={currentProblem.difficulty}
                    onChange={(e) =>
                      setCurrentProblem({
                        ...currentProblem,
                        difficulty: e.target.value as Problem["difficulty"],
                      })
                    }
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
                    value={currentProblem.description}
                    onChange={(e) =>
                      setCurrentProblem({
                        ...currentProblem,
                        description: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Boilerplate Code
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32 font-mono"
                    value={currentProblem.boilerplate}
                    onChange={(e) =>
                      setCurrentProblem({
                        ...currentProblem,
                        boilerplate: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Test Cases
                    </label>
                    <button
                      onClick={addTestCase}
                      className="flex items-center text-sm text-blue-600 hover:text-blue-800"
                    >
                      <Plus size={16} className="mr-1" /> Add Test Case
                    </button>
                  </div>
                  {currentProblem.testCases.map((testCase, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 p-3 rounded-md mb-2"
                    >
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Test Case {index + 1}
                        </span>
                        <button
                          onClick={() => removeTestCase(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <div className="space-y-2">
                        <input
                          type="text"
                          placeholder="Input"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={testCase.input}
                          onChange={(e) =>
                            updateTestCase(index, "input", e.target.value)
                          }
                        />
                        <input
                          type="text"
                          placeholder="Expected Output"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          value={testCase.expectedOutput}
                          onChange={(e) =>
                            updateTestCase(
                              index,
                              "expectedOutput",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleSaveProblem}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center"
                >
                  <Save size={16} className="mr-2" /> Save Problem
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Problems List */}
          <Card>
            <CardHeader>
              <CardTitle>Problem List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {problems.map((problem) => (
                  <div
                    key={problem.id}
                    className="border border-gray-200 p-4 rounded-md"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          {problem.title}
                        </h3>
                        <span
                          className={`text-sm ${
                            problem.difficulty === "easy"
                              ? "text-green-600"
                              : problem.difficulty === "medium"
                              ? "text-yellow-600"
                              : "text-red-600"
                          }`}
                        >
                          {problem.difficulty.charAt(0).toUpperCase() +
                            problem.difficulty.slice(1)}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          className="text-gray-600 hover:text-gray-800 focus:outline-none"
                          onClick={() => setCurrentProblem(problem)}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="text-red-600 hover:text-red-800 focus:outline-none"
                          onClick={() =>
                            problem.id && removeProblem(problem.id)
                          }
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {problem.testCases.length} test cases
                    </p>
                  </div>
                ))}
                {problems.length === 0 && (
                  <p className="text-gray-500 text-center py-4">
                    No problems created yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default ProblemAdminPanel;
