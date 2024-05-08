export default function (
  number: number,
  one: string,
  few: string,
  many: string,
  withoutNumber?: boolean,
): string {
  const lastTwoDigits = number % 100;
  const lastDigit = number % 10;

  if (!withoutNumber) {
    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return `${number} ${many}`;
    } else if (lastDigit === 1) {
      return `${number} ${one}`;
    } else if (lastDigit >= 2 && lastDigit <= 4) {
      return `${number} ${few}`;
    }
  }

  return `${number} ${many}`;
}
