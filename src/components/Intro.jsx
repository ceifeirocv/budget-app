import { useFetcher } from 'react-router-dom';
import { UserPlusIcon } from '@heroicons/react/24/solid';
import illustration from '../assets/illustration.jpg';

function Intro() {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === 'submitting';

  return (
    <div className="intro">
      <div>
        <h1>
          Take Control of

          <span className="accent">Your Money</span>
        </h1>
        <p>
          Personal budgeting is the secret to financial freedom. Start your
          journey today
        </p>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="newUser" />
          <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
            <span>Create Account / Log In</span>
            <UserPlusIcon width={20} />
          </button>
        </fetcher.Form>
      </div>
      <img src={illustration} alt="Person whit money" width={600} />
    </div>
  );
}

export default Intro;
