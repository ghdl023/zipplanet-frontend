import { HashLoader } from 'react-spinners';

function Loading() {
  const check = true;

  return (
    <>
      {check && (
        <div className="axios-loading">
          {' '}
          <div className="axios-loading-indicator">
            {' '}
            <HashLoader color={'orange'} loading={true} size={40} />{' '}
          </div>{' '}
        </div>
      )}
    </>
  );
}

export default Loading;
