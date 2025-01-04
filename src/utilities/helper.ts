import dayjs from 'dayjs';
import { image_host_url } from './images';

// TEXT TRUNCATE
export const truncateText = (
  text: string | undefined,
  length?: number
): string | null => {
  const effectiveLength: number = length ?? 20;
  if (!text) {
    return null;
  }
  return text.length > effectiveLength
    ? text.slice(0, effectiveLength).concat('...')
    : text;
};

// DATE FORMATTER
export const dateAndTimeFormatter = (
  date: string | undefined,
  format:
    | 'DD MMM YYYY'
    | 'DD MMM YYYY, hh:mm A'
    | 'DD/MM/YYYY'
    | 'ddd, Do MMM YYYY'
    | 'DD/MM/YYYY, hh:mm A' = 'DD MMM YYYY'
) => {
  return date ? dayjs(date).format(format) : 'N/A';
};

// YAER CONCAT WITH DATE AND MONTH
export const yearConcatWithDate = (year: number) => {
  return dayjs(dayjs().format('MM-DD').concat(`-${year}`));
};

// NUMBER FORMAT TO FIXED DECIMAL
export const formatToFixedDecimals = (
  number: number,
  decimals: number = 2
): number => {
  return Number(number?.toFixed(decimals));
};

export const formatImageField = (image: string) => {
  if (!image) return [];
  return [
    {
      uid: '-1',
      name: image,
      status: 'done',
      url: `${image_host_url}${image}`,
    },
  ];
};

export const hexToRgba = (hex: string | undefined, opacity: number): string => {
  if (typeof hex !== 'string' || typeof opacity !== 'number') {
    throw new Error('Invalid input: hex must be a string and opacity a number');
  }
  const normalizedHex = hex.replace(/^#/, '').toLowerCase();
  if (!/^([0-9a-f]{3}|[0-9a-f]{6})$/.test(normalizedHex)) {
    throw new Error('Invalid hex color format');
  }
  const fullHex =
    normalizedHex.length === 3
      ? normalizedHex
          .split('')
          .map((char) => char + char)
          .join('')
      : normalizedHex;
  const r = parseInt(fullHex.slice(0, 2), 16);
  const g = parseInt(fullHex.slice(2, 4), 16);
  const b = parseInt(fullHex.slice(4, 6), 16);
  const validOpacity = Math.min(Math.max(opacity, 0), 1);
  return `rgba(${r}, ${g}, ${b}, ${validOpacity})`;
};
