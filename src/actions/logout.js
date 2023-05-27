import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteItem } from '../helpers';

export default async function logoutAction() {
  // delete user
  deleteItem({
    key: 'userName',
  });
  toast.success('Account deleted');

  // return redirect
  return redirect('/');
}
