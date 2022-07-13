import React from "react";

function PublishingDate({ dateString }) {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const dateObj = new Date(dateString);
  const today = new Date();

  const date = dateObj.getDate();
  const month = monthNames[dateObj.getMonth()];
  const year = dateObj.getUTCFullYear();

  return (
    <p style={{ margin: 0 }}>{`${date} ${month} ${
      year != new Date().getFullYear() ? year : ""
    }`}</p>
  );
}

export default PublishingDate;
