import ClipLoader from 'react-spinners/ClipLoader';

const override = {
  display: 'block',
  margin: '0 auto',
  borderColor: '#1DBBC3',
};

function Spinner() {
  return (
    <div className="spinner">
      <ClipLoader
        color="blue"
        loading
        cssOverride={override}
        size={250}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Spinner;
