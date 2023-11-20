export function trimEmail(email) {
  const parts = email.split("@");
  return parts[0];
}

export function formatDate(inputDateString) {
  const date = new Date(inputDateString);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  const formattedDate = `${year}-${month}-${day} ${
    hours % 12 || 12
  }:${minutes}:${seconds} ${ampm}`;

  return formattedDate;
}
