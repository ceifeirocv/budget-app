import { useFetcher } from 'react-router-dom';
import { UserPlusIcon } from '@heroicons/react/24/solid';
import { useEffect, useRef } from 'react';
import illustration from '../assets/illustration.jpg';

function Intro() {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === 'submitting';

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

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
        <fetcher.Form method="post" ref={formRef}>
          <input
            type="text"
            name="userName"
            required
            placeholder="What is your name"
            aria-label="Your name"
            autoComplete="given-name"
            ref={focusRef}
          />
          <input type="hidden" name="_action" value="newUser" />
          <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
            <span>Create Account</span>
            <UserPlusIcon width={20} />
          </button>
        </fetcher.Form>
      </div>
      <img src={illustration} alt="Person whit money" width={600} />
    </div>
  );
}

export default Intro;
