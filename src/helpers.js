// localstorage
export const fetchData = (key) => JSON.parse(localStorage.getItem(key));

export const deleteItem = ({ key }) => localStorage.removeItem(key);

export const createBudget = ({ name, amount }) => {
  const existingBudget = fetchData('budgets') ?? [];

  const newItem = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount: +amount,
    color: `${existingBudget.length * 34} 65% 50%`,
  };
  return localStorage.setItem('budgets', JSON.stringify([...existingBudget, newItem]));
};
