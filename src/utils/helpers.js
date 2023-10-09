
export function formatCurrency(value) {
  return new Intl.NumberFormat('en', {
    style: 'currency',
    currency: 'EUR',
  }).format(value);
}

export function formatDate(dateStr) {
  return new Intl.DateTimeFormat('fa-IR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateStr));

}

export function calcMinutesLeft(dateStr) {
  const d1 = new Date().getTime();
  const d2 = new Date(dateStr).getTime();
  return Math.round((d2 - d1) / 60000);
}

export function convertEnNumberToPersian(number) {
  const persian = {
    0: "۰",
    1: "۱",
    2: "۲",
    3: "۳",
    4: "۴",
    5: "۵",
    6: "۶",
    7: "۷",
    8: "۸",
    9: "۹",
  };
  number = number.toString().split("");
  let persianNumber = "";
  for (let i = 0; i < number.length; i++) {
    number[i] = persian[number[i]];
  }
  for (let i = 0; i < number.length; i++) {
    persianNumber += number[i];
  }
  return persianNumber;
};
