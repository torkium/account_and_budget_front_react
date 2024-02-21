import React, { useState, useEffect, useCallback } from 'react';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, addWeeks, subWeeks, addMonths, subMonths } from 'date-fns';

interface PeriodNavigatorProps {
  mode: 'week' | 'month';
  onChange: (startDate: Date, endDate: Date) => void;
}

const PeriodNavigator: React.FC<PeriodNavigatorProps> = ({ mode, onChange }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getPeriod = useCallback(() => {
    if (mode === 'week') {
      const start = startOfWeek(currentDate, { weekStartsOn: 1 });
      const end = endOfWeek(currentDate, { weekStartsOn: 1 });
      return { start, end };
    } else {
      const start = startOfMonth(currentDate);
      const end = endOfMonth(currentDate);
      return { start, end };
    }
  }, [currentDate, mode]);

  useEffect(() => {
    const { start, end } = getPeriod();
    onChange(start, end);
  }, [currentDate, mode]);

  const navigatePeriod = (direction: 'next' | 'prev') => {
    if (mode === 'week') {
      setCurrentDate(current => direction === 'next' ? addWeeks(current, 1) : subWeeks(current, 1));
    } else {
      setCurrentDate(current => direction === 'next' ? addMonths(current, 1) : subMonths(current, 1));
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
