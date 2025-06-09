import React from "react";
import './WeeklyCalendar.css';

export default function WeeklyCalendar({ reservations }) {
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
                {days.map((day, dayIndex) => {
                    const matching = reservations.filter((r) => {
                        const date = new Date(`${r.date}T${r.time}`);
                        const resDay = date.toLocaleDateString('pl-PL', { weekday: 'long' });
                        const resHour = date.getHours();
                    return (
                        resDay.toLowerCase() === day.toLowerCase() &&
                        `${resHour}:00` === hour
                    );
                });
                const handleCellClick = (dayIndex, hour) => {
                  const today = new Date();
                  const dayOfWeek = today.getDay();
                  const diffToMonday = (dayOfWeek + 6) % 7;
                  const monday = new Date(today);
                  monday.setDate(today.getDate() - diffToMonday);
                
                  const selectedDate = new Date(monday);
                  selectedDate.setDate(monday.getDate() + dayIndex);
                
                  const [hourNumber, minutePart] = hour.split(':');
                  selectedDate.setHours(parseInt(hourNumber));
                  selectedDate.setMinutes(parseInt(minutePart));
                  selectedDate.setSeconds(0);
                  selectedDate.setMilliseconds(0);
                
                  console.log(
                    selectedDate.toLocaleString('pl-PL', {
                      dateStyle: 'short',
                      timeStyle: 'short',
                    })
                  );
                };
                return (
                    <div
                        key={`${day}-${hour}`}
                        className={`calendar-cell ${matching.length > 0 ? 'has-reservation' : ''}`}
                        onClick={() => {handleCellClick(dayIndex, hour)}}
                    >
                    {matching.map((r, i) => (
                        <div key={i}>
                            <strong>{r.name}</strong>  {r.service}
                            <button className="delete">Usuń</button>
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
