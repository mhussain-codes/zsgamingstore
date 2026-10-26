export function formatPKR(amount: number): string {
  if (isNaN(amount) || amount === undefined || amount === null) return "Rs. 0";
  return `Rs. ${amount.toLocaleString("en-PK")}`;
}

export function formatNumber(num: number): string {
  return num.toLocaleString("en-US");
}

export function truncateText(str: string, maxLength: number): string {
  if (!str) return "";
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength) + "...";
}
