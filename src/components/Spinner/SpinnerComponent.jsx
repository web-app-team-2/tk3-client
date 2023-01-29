import React from 'react';

function SpinnerComponent() {
  return (
    <div className="progress">
      <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-label="Animated striped example" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: '100%' }} />
    </div>
  );
}

export default SpinnerComponent;
