import React from 'react';

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }

  console.log(notification);

  return (
    <h2 className={notification.error ? 'error' : 'success'}>
      {notification.text}
    </h2>
  );
};

export default Notification;
