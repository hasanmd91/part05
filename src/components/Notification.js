import React from 'react';

const Notification = ({ notification, type }) => {
  if (notification === null) {
    return null;
  }

  return <h2 className={type}>{notification}</h2>;
};

export default Notification;
