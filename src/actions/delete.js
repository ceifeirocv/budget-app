import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';
import { deleteItem, getAllMatchingItems } from '../helpers';

// eslint-disable-next-line import/prefer-default-export
export async function deleteBudget({ params }) {
  try {
    const associatedExpenses = getAllMatchingItems({
      category: 'expenses',
      key: 'budgetId',
      value: params.id,
    });

    associatedExpenses.forEach((expense) => {
      deleteItem({
        key: 'expenses',
        id: expense.id,
      });
    });

    deleteItem({
      key: 'budgets',
      id: params.id,
    });

    toast.success('Budget deleted successfully');
  } catch (error) {
    throw new Error('There was a problem deleting your budget.');
  }
  return redirect('/');
}
