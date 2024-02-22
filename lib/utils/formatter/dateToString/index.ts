import { formatInTimeZone } from 'date-fns-tz';

/**
 * Converte objeto Date para string em UTC (não utilizar para hora/minuto)
 * @param date objeto Date
 * @param pattern formato desejado da string, seguindo o padrão do date-fns
 * @returns
 */
function dateToString(date: Date, pattern: string): string {
  return formatInTimeZone(date, 'UTC', pattern);
}

export default dateToString;
