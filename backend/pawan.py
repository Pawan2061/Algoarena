elements = [i for i in range(1, 21)]
selected_elements = [elements[i] for i in range(2, len(elements), 3)]
print("All elements:", elements)
print("Every third element:", selected_elements)