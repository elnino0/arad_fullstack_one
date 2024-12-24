import React, { useState } from 'react';

function DateSelector({onChange} ) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [day, setDay] = useState(new Date().getDate());

  const handleYearChange = (event) => {
    setYear(event.target.value);
    onChange("" + event.target.value + "-" + month + "-" + day);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
    onChange("" + year + "-" + event.target.value + "-" + day);
  };

  const handleDayChange = (event) => {
    setDay(event.target.value);
    onChange("" + year + "-" + month + "-" + event.target.value);
  };

  return (
    <div>
      <select value={year} onChange={handleYearChange}>
        {Array.from({ length: 100 }, (_, i) => (
          <option key={i} value={new Date().getFullYear() - i}>
            {new Date().getFullYear() - i}
          </option>
        ))}
      </select>
      <select value={month} onChange={handleMonthChange}>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i}>
            {i + 1}
          </option>
        ))}
      </select>
      <select value={day} onChange={handleDayChange}>
        {Array.from({ length: 31 }, (_, i) => (
          <option key={i} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
    </div>
  );
}

export default DateSelector;