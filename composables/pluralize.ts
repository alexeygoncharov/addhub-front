export default function (
  number: number,
  one: string,
  few: string,
  many: string,
  withoutNumber?: boolean,
): string {
  if (number === 1) {
    return `${(!withoutNumber && number) || ''} ${one}`;
  } else if (number >= 2 && number <= 4) {
    return `${(!withoutNumber && number) || ''} ${few}`;
  } else {
    return `${(!withoutNumber && number) || ''} ${many}`;
  }
}
