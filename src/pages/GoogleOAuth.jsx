import { useEffect } from 'react';
import { useLocation, useSubmit } from 'react-router-dom';

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
  }, [submit]);
  return (
    <div />
  );
}

export default GoogleOAuth;
