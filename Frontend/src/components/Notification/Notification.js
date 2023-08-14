import React from 'react';
import './index.css';

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  return (
    <h2 className={notification.error ? 'error' : 'success'}>
      {notification.text}
    </h2>
  );
};

export default Notification;
