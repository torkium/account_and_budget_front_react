type MonthMapping = {
  [key: string]: string;
};

export function formatDateToLocalISO(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDateFrStringToLocalISO(dateStr: string): string {
  return formatDateToLocalISO(convertDateToISO(dateStr));
}

export function formatDateLocalIsoToFrString(dateStr: string): string {
  const parts = dateStr.split("-");
  const day = parts[2];
  const month = parts[1];
  const year = parts[0];
  return `${day}/${month}/${year}`;
}

export function getMonthFrByYearMonth(yearMonth: string) {
  const month = yearMonth.split("-")[1];
  const monthMapping: MonthMapping = {
    "01": "Janvier",
    "02": "Février",
    "03": "Mars",
    "04": "Avril",
    "05": "Mai",
    "06": "Juin",
    "07": "Juillet",
    "08": "Août",
    "09": "Septembre",
    "10": "Octobre",
    "11": "Novembre",
    "12": "Décembre",
  };
  return monthMapping[month];
}

function convertDateToISO(dateStr: string): Date {
  const parts = dateStr.split("/");
  const day = parts[0];
  const month = parts[1];
  const year = parts[2];
  return new Date(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`);
}
