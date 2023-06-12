import PropTypes from 'prop-types';
import { Form, Link } from 'react-router-dom';
import { BanknotesIcon } from '@heroicons/react/24/outline';
import { TrashIcon } from '@heroicons/react/24/solid';
import { calculateSpentByBudget, formatCurrency, formatPercentage } from '../helpers';

function BudgetItem({ budget, showDelete = false }) {
  const {
    id, name, amount, color,
  } = budget;
  const spent = calculateSpentByBudget(id);

  return (
    <div className="budget" style={{ '--accent': color }}>
      <div className="progress-text">
        <h3>{name}</h3>
        <p>
          { formatCurrency(amount)}
          {' '}
          Budgeded
        </p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>
          {formatCurrency(spent)}
          {' '}
          spend
        </small>
        <small>
          {formatCurrency(amount - spent)}
          {' '}
          remaining
        </small>
      </div>
      <div className="flex-sm">
        {
          showDelete ? (
            <Form
              method="post"
              action="delete"
              onSubmit={(event) => {
              // eslint-disable-next-line no-restricted-globals, no-alert
                if (!confirm('Delete delete budget and all associated expenses?')) {
                  event.preventDefault();
                }
              }}
            >
              <button type="submit" className="btn">
                <span>Delete Budget</span>
                <TrashIcon width={20} />
              </button>
            </Form>
          ) : (
            <Link to={`/budget/${id}`} className="btn">
              <span>View Details</span>
              <BanknotesIcon width={20} />
            </Link>
          )
        }
      </div>
    </div>
  );
}

BudgetItem.propTypes = {
  budget: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    budgetId: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  showDelete: PropTypes.bool.isRequired,
};
export default BudgetItem;
