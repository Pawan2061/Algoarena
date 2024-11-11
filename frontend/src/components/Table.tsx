import React from "react";

interface Problem {
  title: string;
  solution: string;
  acceptance: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

const problems: Problem[] = [
  {
    title: "1. Two Sum",
    solution: "link",
    acceptance: "54.2%",
    difficulty: "Easy",
  },
  {
    title: "2. Add Two Numbers",
    solution: "link",
    acceptance: "44.5%",
    difficulty: "Medium",
  },
  {
    title: "3. Longest Substring Without Repeating Characters",
    solution: "link",
    acceptance: "35.7%",
    difficulty: "Medium",
  },
  {
    title: "4. Median of Two Sorted Arrays",
    solution: "link",
    acceptance: "41.9%",
    difficulty: "Hard",
  },
  {
    title: "5. Longest Palindromic Substring",
    solution: "link",
    acceptance: "34.7%",
    difficulty: "Medium",
  },
  {
    title: "6. Zigzag Conversion",
    solution: "link",
    acceptance: "49.7%",
    difficulty: "Medium",
  },
  {
    title: "7. Reverse Integer",
    solution: "link",
    acceptance: "29.4%",
    difficulty: "Medium",
  },
  {
    title: "8. String to Integer (atoi)",
    solution: "link",
    acceptance: "18.2%",
    difficulty: "Medium",
  },
  {
    title: "9. Palindrome Number",
    solution: "link",
    acceptance: "57.9%",
    difficulty: "Easy",
  },
  {
    title: "10. Regular Expression Matching",
    solution: "link",
    acceptance: "28.5%",
    difficulty: "Hard",
  },
  {
    title: "11. Container With Most Water",
    solution: "link",
    acceptance: "56.5%",
    difficulty: "Medium",
  },
  {
    title: "12. Integer to Roman",
    solution: "link",
    acceptance: "66.8%",
    difficulty: "Medium",
  },
  {
    title: "13. Roman to Integer",
    solution: "link",
    acceptance: "63.2%",
    difficulty: "Easy",
  },
  {
    title: "14. Longest Common Prefix",
    solution: "link",
    acceptance: "44.1%",
    difficulty: "Easy",
  },
  {
    title: "15. 3Sum",
    solution: "link",
    acceptance: "35.7%",
    difficulty: "Medium",
  },
  {
    title: "16. 3Sum Closest",
    solution: "link",
    acceptance: "46.2%",
    difficulty: "Medium",
  },
];

const Table: React.FC = () => {
  return (
    <div className="p-6 bg-[#0A0B10] text-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <table className="w-full text-left border-collapse border border-gray-700">
          <thead>
            <tr className="bg-[#324CCD]">
              <th className="p-4 border-b border-gray-700">Title</th>
              <th className="p-4 border-b border-gray-700">Solution</th>
              <th className="p-4 border-b border-gray-700">Acceptance</th>
              <th className="p-4 border-b border-gray-700">Difficulty</th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem, index) => (
              <tr key={index} className="">
                <td className="p-4 border-b hover:text-[#324CCD] cursor-pointer border-gray-700">
                  {problem.title}
                </td>
                <td className="p-4 border-b border-gray-700">
                  <a
                    href={problem.solution}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    <i className="fas fa-file-code"></i>
                  </a>
                </td>
                <td className="p-4 border-b border-gray-700">
                  {problem.acceptance}
                </td>
                <td
                  className={`p-4 border-b border-gray-700 ${getDifficultyColor(
                    problem.difficulty
                  )}`}
                >
                  {problem.difficulty}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const getDifficultyColor = (difficulty: "Easy" | "Medium" | "Hard") => {
  switch (difficulty) {
    case "Easy":
      return "text-green-500";
    case "Medium":
      return "text-yellow-500";
    case "Hard":
      return "text-red-500";
    default:
      return "text-white";
  }
};

export default Table;
