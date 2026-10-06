export const data = ['A', 'B', 'A'].map((name, index) => ({
  name,
  category: { name },
  0: name,
  value: index + 1,
}));

export const accessors = [
  { label: 'Flat key: name', dataKey: 'name' },
  { label: 'Nested key: category.name', dataKey: 'category.name' },
  { label: 'Function: entry => entry.category.name', dataKey: entry => entry.category.name },
  { label: 'Numeric key: 0', dataKey: 0 },
];
