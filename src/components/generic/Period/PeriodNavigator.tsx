import React, { useCallback } from 'react';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, startOfYear, endOfYear, addWeeks, addMonths, addYears } from 'date-fns';

interface PeriodNavigatorProps {
  mode: 'week' | 'month' | 'year';
  startDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
}

const PeriodNavigator: React.FC<PeriodNavigatorProps> = ({ mode, startDate, setStartDate, setEndDate }) => {
  const getPeriod = useCallback(() => {
    switch (mode) {
      case 'week':
        const startWeek = startOfWeek(startDate, { weekStartsOn: 1 });
        const endWeek = endOfWeek(startDate, { weekStartsOn: 1 });
        return { start: startWeek, end: endWeek };
      case 'month':
        const startMonth = startOfMonth(startDate);
        const endMonth = endOfMonth(startDate);
        return { start: startMonth, end: endMonth };
      case 'year':
        const startYear = startOfYear(startDate);
        const endYear = endOfYear(startDate);
        return { start: startYear, end: endYear };
      default:
        return { start: new Date(), end: new Date() };
    }
  }, [startDate, mode]);

  const navigatePeriod = (direction: 'next' | 'prev') => {
    switch (mode) {
      case 'week':
        const deltaWeek = direction === 'next' ? 1 : -1;
        const newStartDateWeek = addWeeks(startDate, deltaWeek);
        setStartDate(newStartDateWeek);
        setEndDate(endOfWeek(newStartDateWeek, { weekStartsOn: 1 }));
        break;
      case 'month':
        const deltaMonth = direction === 'next' ? 1 : -1;
        const newStartDateMonth = addMonths(startDate, deltaMonth);
        setStartDate(newStartDateMonth);
        setEndDate(endOfMonth(newStartDateMonth));
        break;
      case 'year':
        const deltaYear = direction === 'next' ? 1 : -1;
        const newStartDateYear = addYears(startDate, deltaYear);
        setStartDate(newStartDateYear);
        setEndDate(endOfYear(newStartDateYear));
        break;
      default:
        break;
    }
  };

  const formatPeriodLabel = () => {
    const { start, end } = getPeriod();
    switch (mode) {
      case 'week':
        return `${format(start, 'MMM dd')} - ${format(end, 'MMM dd, yyyy')}`;
      case 'month':
        return format(start, 'MMMM yyyy');
      case 'year':
        return format(start, 'yyyy');
      default:
        return '';
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
      <button onClick={() => navigatePeriod('prev')}>Précédent</button>
      <span>{formatPeriodLabel()}</span>
      <button onClick={() => navigatePeriod('next')}>Suivant</button>
    </div>
  );
};

export default PeriodNavigator;
