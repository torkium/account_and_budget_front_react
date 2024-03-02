export function formatDateToLocalISO(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDateFrStringToLocalISO(dateStr: string): string {
  return formatDateToLocalISO(convertDateToISO(dateStr));
}

function convertDateToISO(dateStr: string): Date{
  const parts = dateStr.split('/');
  const day = parts[0];
  const month = parts[1];
  const year = parts[2];
  return new Date (`${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`);
};