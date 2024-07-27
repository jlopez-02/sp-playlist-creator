import React from "react";
import "./Calendar.css";

const Calendar = ({ artist, handleDateChange }) => {
  const formatDate = (date) => {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    const year = d.getFullYear();
    return [year, month, day].join("-");
  };

  return (
    <div className="date-range">
      <div>
        <label>Inicio</label>
        <input
          type="date"
          value={artist.startDate ? formatDate(artist.startDate) : ""}
          onChange={(e) =>
            handleDateChange(artist.id, e.target.value, artist.endDate)
          }
        />
      </div>
      <div>
        <label>Fin</label>
        <input
          type="date"
          value={artist.endDate ? formatDate(artist.endDate) : ""}
          onChange={(e) =>
            handleDateChange(artist.id, artist.startDate, e.target.value)
          }
        />
      </div>
    </div>
  );
};

export default Calendar;
