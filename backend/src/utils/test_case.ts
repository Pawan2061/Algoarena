export const test_cases = {
  test_cases: [
    {
      problem_id: "6a1d6f86-349f-43b3-b0fb-d79c0b77a596",
      language_id: 71,
      expected_output:
        "Number: working on 0\nNumber: working on 1\nNumber: working on 2\nNumber: working on 3\nNumber: working on 4\nNumber: working on 5\nNumber: working on 6\nNumber: working on 7\nNumber: working on 8\nNumber: working on 9\n", // Actual output for the first code snippet
      code: "for i in range(10):\n    print(f'Number: working on {i}')",
    },
    {
      problem_id: "6a1d6f86-349f-43b3-b0fb-d79c0b77a596",
      language_id: 71,
      expected_output:
        "Iteration: 0\nIteration: 1\nIteration: 2\nIteration: 3\nIteration: 4\n", // Actual output for the second code snippet
      code: "for i in range(5):\n    print(f'Iteration: {i}')",
    },
    {
      problem_id: "6a1d6f86-349f-43b3-b0fb-d79c0b77a596",
      language_id: 71,
      expected_output:
        "Index: 1\nIndex: 2\nIndex: 3\nIndex: 4\nIndex: 5\nIndex: 6\nIndex: 7\nIndex: 8\nIndex: 9\nIndex: 10\n", // Actual output for the third code snippet
      code: "for i in range(1, 11):\n    print(f'Index: {i}')",
    },
  ],
};
