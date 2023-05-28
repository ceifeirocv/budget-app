import PropTypes from 'prop-types';
import ExpenseItem from './ExpenseItem';

function Table({ expenses }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {
              ['Name', 'Amount', 'Date'].map((i, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <th key={index}>{i}</th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            expenses.map((expense) => (
              <tr key={expense.id}>
                <ExpenseItem expense={expense} />
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      createdAt: PropTypes.number.isRequired,
      amount: PropTypes.number.isRequired,
      budgetId: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Table;
