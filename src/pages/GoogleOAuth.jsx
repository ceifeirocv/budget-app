import { useEffect } from 'react';
import { useLocation, useSubmit } from 'react-router-dom';
import Spinner from '../components/Spinner';

function GoogleOAuth() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.hash.substring(1));
  const accessToken = urlParams.get('access_token');

  const submit = useSubmit();

  useEffect(() => {
    submit({ accessToken }, {
      method: 'post',
      action: '/login',
    });
  }, []);
  return (
    <div className="grid-sm">
      <Spinner />
    </div>
  );
}

export default GoogleOAuth;
