import { api } from './lib/axios';

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

export const formatCurrency = (amount) => amount.toLocaleString(undefined, {
  style: 'currency',
  currency: 'USD',
});

export const formatPercentage = (amount) => amount.toLocaleString(undefined, {
  style: 'percent',
  minimumFractionDigits: 0,
});

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
    redirect_uri: import.meta.env.VITE_REACT_APP_GOOGLE_CALLBACK_URL,
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

// Budgets
export const getBudgets = async () => {
  const token = fetchData('token');
  if (!token) {
    return null;
  }
  try {
    const response = await api.get('/budget', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.budgets;
  } catch (error) {
    throw new Error(error);
  }
};

export const createBudget = async ({ name, amount }) => {
  const token = fetchData('token');
  const existingBudget = await getBudgets() ?? [];
  const newItem = {
    name,
    amount: +amount,
    color: `${existingBudget.length * 34} 65% 50%`,
  };
  try {
    const response = await api.post(
      '/budget',
      {
        ...newItem,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getBudgetById = async ({ id }) => {
  const token = fetchData('token');
  if (!token) {
    return null;
  }
  try {
    const response = await api.get(`/budget/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.budget;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteBudgetById = async ({ id }) => {
  const token = fetchData('token');
  if (!token) {
    return null;
  }
  try {
    await api.delete(`/budget/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return null;
  } catch (error) {
    throw new Error(error);
  }
};

export const getExpenses = async () => {
  const token = fetchData('token');
  if (!token) {
    return null;
  }
  try {
    const response = await api.get('/expense', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.expenses;
  } catch (error) {
    throw new Error(error);
  }
};

export const createExpense = async ({ name, amount, budgetId }) => {
  const token = fetchData('token');
  const newItem = {
    name,
    amount: +amount,
    budgetId,
  };
  try {
    await api.post(
      '/expense',
      {
        ...newItem,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteExpenseById = async ({ id }) => {
  const token = fetchData('token');
  if (!token) {
    return null;
  }
  try {
    await api.delete(`/expense/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return null;
  } catch (error) {
    throw new Error(error);
  }
};

export const calculateSpentByBudget = (budgetId, expenses) => {
  const budgetSpent = expenses.reduce((acc, expense) => {
    if (expense.budgetId !== budgetId) return acc;

    return acc + expense.amount;
  }, 0);
  return budgetSpent;
};

export const fetcher = async (url, method, data) => {
  const token = fetchData('token');
  try {
    const response = await api({
      method,
      url,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};
