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

export const createExpense = ({ name, amount, budgetId }) => {
  const existingExpense = fetchData('expenses') ?? [];

  const newItem = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount: +amount,
    budgetId,
  };
  return localStorage.setItem('expenses', JSON.stringify([...existingExpense, newItem]));
};

export const formatCurrency = (amount) => amount.toLocaleString(undefined, {
  style: 'currency',
  currency: 'USD',
});

export const formatPercentage = (amount) => amount.toLocaleString(undefined, {
  style: 'percent',
  minimumFractionDigits: 0,
});

export const calculateSpentByBudget = (budjetId) => {
  const expenses = fetchData('expenses') ?? [];
  const budgetSpent = expenses.reduce((acc, expense) => {
    if (expense.budgetId !== budjetId) return acc;

    return acc + expense.amount;
  }, 0);
  return budgetSpent;
};
