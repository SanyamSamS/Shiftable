import Tag from '../UI/Tag/Tag'; 

import './ShiftCard.css';

const ShiftCard = ({ shift }) => {
    const shift = {
    dayDisplay: "Monday",
    dateDisplay: "2022-01-10",
    hours: "8::00 AM - 4:00 PM",
    location: "North",
    notes: "I need to leave early.",
    userName: "John Doe",
    postedDate: "2022-01-08",
    postedTime: "10:00 AM"
    };

  
    return (
      <div className="shift-card">
        <div className="shift-content">
            <div className='shift-tags'> 
          <Tag label="day" value={shift.dayDisplay} />
          <Tag label="date" value={shift.dateDisplay} />
          <Tag label="hours" value={shift.hours} />
          <Tag label="location" value={shift.location} />
          {shift.notes && <Tag label="notes" value={shift.notes} />}
            </div>
          <button className="request-shift-btn">Request Shift</button>
        </div>
        <div className="shift-footer">
          <span className="user-name">{shift.userName}</span>
          <span className="posted-time">{shift.postedDate} {shift.postedTime}</span>
        </div>
      </div>
    );
  };

export default ShiftCard;
