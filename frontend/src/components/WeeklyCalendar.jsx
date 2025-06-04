import React from "react";
import './WeeklyCalendar.css';

export default function WeeklyCalendar({ reservations }) {
  console.log(reservations);

  const hours = Array.from({ length: 11 }, (_, i) => `${8 + i}:00`);
  const days = ['Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela'];

  return (
    <div className="calendar-wrapper">
      <div className="calendar-grid">
        <div className="calendar-header empty-cell"></div>
        {days.map(day => (
          <div key={day} className="calendar-header">{day}</div>
        ))}

        {hours.map(hour => (
            <React.Fragment key={hour}>
                <div className="calendar-hour">{hour}</div>
                {days.map((day) => {
                    const matching = reservations.filter((r) => {
                        const date = new Date(`${r.date}T${r.time}`);
                        const resDay = date.toLocaleDateString('pl-PL', { weekday: 'long' });
                        const resHour = date.getHours();
                    return (
                        resDay.toLowerCase() === day.toLowerCase() &&
                        `${resHour}:00` === hour
                    );
                });

                return (
                    <div
                        key={day + hour}
                        className={`calendar-cell ${matching.length > 0 ? 'has-reservation' : ''}`}
                    >
                    {matching.map((r, i) => (
                        <div key={i}>
                            <strong>{r.name}</strong>  {r.service}
                        </div>
                    ))}
              </div>
            );
          })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
