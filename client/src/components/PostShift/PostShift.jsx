import { useState } from 'react';
import { getDatabase, ref, push } from 'firebase/database';

import { format } from 'date-fns';

import './PostShift.css';

const PostShift = ({ onAddShift }) => {
    const [date, setDate] = useState(new Date());
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');

    const formatDateForDisplay = (date) => format(date, 'EEE MMM dd'); // Formats date as "Wed Apr 03"

    const handleDateChange = (e) => setDate(new Date(e.target.value));
    const handleStartTimeChange = (e) => setStartTime(e.target.value);
    const handleEndTimeChange = (e) => setEndTime(e.target.value);
  
    const locationOptions = ['north', 'east', 'south', 'west'];
  
    const handleSelectLocation = (locationOption) => setLocation(locationOption);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postedDate = format(new Date(), 'yyyy-MM-dd');
        const postedTime = format(new Date(), 'HH:mm');

        const shiftData = {
            date: format(date, 'yyyy-MM-dd'),
            startTime,
            endTime,
            location,
            notes,
            postedDate,
            postedTime
        };

        const database = getDatabase();
        const shiftsRef = ref(database, 'shifts');

        try {
            await push(shiftsRef, shiftData);
            alert('Shift posted successfully!');
            onAddShift({ id: shiftsRef.key, ...shiftData }); // Assuming onAddShift updates local state
            
            // Reset form fields
            setDate(new Date());
            setStartTime('');
            setEndTime('');
            setLocation('');
            setNotes('');
        } catch (error) {
            alert('Error posting shift:', error.message);
            console.error('Error posting shift:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="post-shift-form">
            {/* Date input */}
            <div className="tag-input">
                <label>Date</label>
                <span className="tag">{formatDateForDisplay(date)}</span>
                <input type="date" onChange={handleDateChange} />
            </div>

            {/* Start time input */}
            <div className="tag-input">
                <label>Start time</label>
                <span className="tag">{startTime || '00:00'}</span>
                <input type="time" value={startTime} onChange={handleStartTimeChange} />
            </div>

            {/* End time input */}
            <div className="tag-input">
                <label>End time</label>
                <span className="tag">{endTime || '00:00'}</span>
                <input type="time" value={endTime} onChange={handleEndTimeChange} />
            </div>


            {/* Location selection */}
            <div className="tag-selection">
                <label>Checkpoint</label>
                {locationOptions.map((option) => (
                    <span key={option} className={`tag ${location === option ? 'selected' : ''}`} onClick={() => handleSelectLocation(option)}>{option}</span>
                ))}
            </div>

            {/* Notes input */}
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes" />

            <button type="submit">Post Shift</button>
        </form>
    );
};

export default PostShift;