import { useLocation, useSubmit } from 'react-router-dom';

function GoogleOAuth() {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.hash.substring(1));
  const accessToken = urlParams.get('access_token');

  const submit = useSubmit();
  submit({ accessToken }, {
    method: 'post',
    action: 'login',
  });
  return (
    <div />
  );
}

export default GoogleOAuth;
