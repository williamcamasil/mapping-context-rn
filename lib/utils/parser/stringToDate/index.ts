import { parse, parseISO } from 'date-fns';

/**
 * Converte data de string para Date em UTC (não utilizar para hora/minuto)
 * @param date data em formato string
 * @param pattern formato atual da string, seguindo o padrão do date-fns (se não for passado, assume o formato ISO)
 * @returns objeto Date
 */
function stringToDate(date: string, pattern?: string): Date {
  if (!pattern) return parseISO(date);

  return parse(date, pattern, new Date());
}

export default stringToDate;
