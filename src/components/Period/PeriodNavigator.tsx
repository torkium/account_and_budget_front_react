import React, { useCallback } from 'react';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, addWeeks, subWeeks, addMonths, subMonths } from 'date-fns';
import { useBankAccountContext } from '../../context/BankAccountContext';

interface PeriodNavigatorProps {
  mode: 'week' | 'month';
}

const PeriodNavigator: React.FC<PeriodNavigatorProps> = ({ mode }) => {
  const { startDate, setStartDate, setEndDate } = useBankAccountContext();

  const getPeriod = useCallback(() => {
    if (mode === 'week') {
      const start = startOfWeek(startDate, { weekStartsOn: 1 });
      const end = endOfWeek(startDate, { weekStartsOn: 1 });
      return { start, end };
    } else {
      const start = startOfMonth(startDate);
      const end = endOfMonth(startDate);
      return { start, end };
    }
  }, [startDate, mode]);

  const navigatePeriod = (direction: 'next' | 'prev') => {
    if (mode === 'week') {
      const newStartDate = direction === 'next' ? addWeeks(startDate, 1) : subWeeks(startDate, 1);
      const newEndDate = direction === 'next' ? endOfWeek(newStartDate, { weekStartsOn: 1 }) : startOfWeek(newStartDate, { weekStartsOn: 1 });
      setStartDate(newStartDate);
      setEndDate(newEndDate);
    } else {
      const newStartDate = direction === 'next' ? addMonths(startDate, 1) : subMonths(startDate, 1);
      const newEndDate = endOfMonth(newStartDate);
      console.log(newStartDate, newEndDate)
      setStartDate(newStartDate);
      setEndDate(newEndDate);
    }
  };

  const formatPeriodLabel = () => {
    const { start, end } = getPeriod();
    if (mode === 'week') {
      return `${format(start, 'MMM dd')} - ${format(end, 'MMM dd, yyyy')}`;
    } else {
      return format(start, 'MMMM yyyy');
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
