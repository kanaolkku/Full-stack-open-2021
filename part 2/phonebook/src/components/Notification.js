import React from "react";

const Notification = ({ message, type }) => {
  if (type === "error") {
    return (
      <div className="error">
        {message}
      </div>
    )
  } else if (type === "success") {
    return (
      <div className="success">
        {message}
      </div>
    )
  }

  return null;
}

export default Notification;