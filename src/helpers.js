// localstorage
export const fetchData = (key) => JSON.parse(localStorage.getItem(key));

export const deleteItem = ({ key, id }) => {
  if (!id) {
    return localStorage.removeItem(key);
  }

  const existingData = fetchData(key);
  const newData = existingData.filter((item) => item.id !== id);
  return localStorage.setItem(key, JSON.stringify(newData));
};

export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
};

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

export function oauthSignIn() {
  // Google's OAuth 2.0 endpoint for requesting an access token
  const oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

  // Create <form> element to submit parameters to OAuth 2.0 endpoint.
  const form = document.createElement('form');
  form.setAttribute('method', 'GET'); // Send as a GET request.
  form.setAttribute('action', oauth2Endpoint);

  // Parameters to pass to OAuth 2.0 endpoint.
  const params = {
    client_id: '1048568934801-s9b0i2ubpktif27k7g5de50591244irk.apps.googleusercontent.com',
    redirect_uri: 'http://localhost:5173/auth/google/callback',
    response_type: 'token',
    scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
    state: 'pass-through value',
  };

  // Add form parameters as hidden input values.
  Object.entries(params).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', key);
    input.setAttribute('value', value);
    form.appendChild(input);
  });

  // Add form to page and submit it to open the OAuth 2.0 endpoint.
  document.body.appendChild(form);
  form.submit();
}
