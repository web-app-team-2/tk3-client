import React from 'react';
import styles from './FormWarningTextComponent.module.css';

function FormWarningTextComponent({ text }) {
  return (
    <div className={styles.warning}>
      {text}
    </div>
  );
}

export default FormWarningTextComponent;
