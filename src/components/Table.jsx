import ExpenseItem from './ExpenseItem';

function Table({ expenses, showBudget = true }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            {
              ['Name', 'Amount', 'Date', showBudget ? ('Budget') : (''), ''].map((i, index) => (
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
                <ExpenseItem expense={expense} showBudget={showBudget} />
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
