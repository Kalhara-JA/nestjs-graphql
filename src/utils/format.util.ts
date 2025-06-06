// date-format.util.ts

export function formatDateToDDMMYYYY(input: Date | string | number): string {
  const date = new Date(input);

  if (isNaN(date.getTime())) {
    throw new Error('Invalid date');
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
