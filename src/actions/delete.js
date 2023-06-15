import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';
import { deleteBudgetById } from '../helpers';

// eslint-disable-next-line import/prefer-default-export
export async function deleteBudget({ params }) {
  try {
    await deleteBudgetById({
      id: params.id,
    });

    toast.success('Budget deleted successfully');
  } catch (error) {
    throw new Error('There was a problem deleting your budget.');
  }
  return redirect('/');
}
