import Tag from '../UI/Tag/Tag'; 
// import PropsTypes from 'prop-types';

import './ShiftCard.css';

    const ShiftCard = () => { // removed = ({ shift }) => thn shift should be passed as a prop & then const shift (below) can be cancelled out but for testing it should be left in
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

  //props should be passed to the ShiftCard component (this is a bit tricky but has to do with rendering the dom )
  // ShiftCard.propTypes = {
  //   shift: PropsTypes.object.isRequired
  // };

export default ShiftCard;
