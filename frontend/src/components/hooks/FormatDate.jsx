// FormatDate.jsx file
export const FormatLongDateTime = (props) => {
  const date = new Date(props.date);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: "true",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);
  return formattedDate;
};

export const ShortDateTimeFormat = (props) => {
  const date = new Date(props.date);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour12: "true",
    minute: "2-digit",
    second: "2-digit",
  };
  const formattedDate = Intl.DateTimeFormat("en-US", options).format(date);
  return formattedDate;
};

export const FormatDateTimeValue = (date) => {
  const currentDate = new Date(date);
  console.log("Current Date: ", currentDate);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  };
  const formattedDate = Intl.DateTimeFormat("en-US", options).format(
    currentDate
  );
  return formattedDate;
};
