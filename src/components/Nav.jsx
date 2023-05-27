import { Form, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { TrashIcon } from '@heroicons/react/24/solid';

import logomark from '../assets/logomark.svg';

function Nav({ userName }) {
  return (
    <nav>
      <NavLink to="/" aria-label="go to home">
        <img src={logomark} alt="" height={30} />
        <span>HomeBudget</span>
      </NavLink>
      {
        userName && (
          <Form
            method="post"
            action="/logout"
            onSubmit={(event) => {
              // eslint-disable-next-line no-restricted-globals, no-alert
              if (!confirm('Delete user and all data?')) {
                event.preventDefault();
              }
            }}
          >
            <button type="submit" className="btn btn--warning">
              <span>Delete User</span>
              <TrashIcon width={20} />
            </button>
          </Form>
        )
      }
    </nav>
  );
}

Nav.propTypes = {
  userName: PropTypes.string.isRequired,
};

export default Nav;
