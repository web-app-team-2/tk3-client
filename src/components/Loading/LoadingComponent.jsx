import React from 'react';
import styles from './LoadingComponent.module.css';

function LoadingComponent() {
  return (
    <div className={styles['loading-container']}>
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default LoadingComponent;
