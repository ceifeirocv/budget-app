import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteItem } from '../helpers';

// eslint-disable-next-line import/prefer-default-export
export async function logoutAction() {
  // delete user
  deleteItem({
    key: 'token',
  });
  deleteItem({
    key: 'user',
  });
  toast.success('Good Bye');

  // return redirect
  return redirect('/');
}
