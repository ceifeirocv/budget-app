import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteItem } from '../helpers';

// eslint-disable-next-line import/prefer-default-export
export async function logoutAction() {
  // delete user
  deleteItem({
    key: 'userName',
  });
  deleteItem({
    key: 'budgets',
  });
  deleteItem({
    key: 'expenses',
  });
  toast.success('Account deleted');

  // return redirect
  return redirect('/');
}
