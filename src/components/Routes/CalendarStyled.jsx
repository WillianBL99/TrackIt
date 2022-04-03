import styled from 'styled-components';



const CalendarStyle = styled.div`
    
    width: 100%;
    display: flex;
    justify-content: center;

    margin-top: 1rem;
    
    .react-calendar { 
        width: 100%;
        background-color: #fff;
        color: var(--color-main);
        border-radius: 8px;
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
        font-family: Arial, Helvetica, sans-serif;
        line-height: 1.125em;
    }
    
    .react-calendar__month-view__weekdays {
        text-align: center;
        align-items: center;
        height: 2rem;
    }
    
    .react-calendar__navigation {
        display: flex;
        justify-content: center;
        align-items: center;

        max-width: 25rem;
        margin-inline: auto;
    }
    
    .react-calendar__navigation button {
        color: var(--color-header);
        min-width: 44px;
        background: none;
        font-size: 16px;
        margin-top: 8px;
    }
    
    .react-calendar__navigation button:enabled:hover,
    .react-calendar__navigation button:enabled:focus {
        background-color: #f8f8fa;
    }
    .react-calendar__navigation button[disabled] {
        background-color: #f0f0f0;
    }
    abbr[title] {
        text-transform: uppercase;
        text-decoration: none;
    }
    
    .react-calendar__month-view__days__day--weekend {
        color: #d10000;
    } 
    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
        background: #f8f8fa;
        color: var(--color-header);
        border-radius: 6px;
    }
    .react-calendar__tile--now {
        background: #6f48eb33;
        border-radius: 6px;
        font-weight: bold;
        color: var(--color-header);
    }
    .react-calendar__tile--now:enabled:hover,
    .react-calendar__tile--now:enabled:focus {
        background: #6f48eb33;
        border-radius: 6px;
        font-weight: bold;
        color: var(--color-header);
    }
    .react-calendar__tile--hasActive:enabled:hover,
    .react-calendar__tile--hasActive:enabled:focus {
        background: #f8f8fa;
    }



    .react-calendar__tile--active abbr[arial-label] {
        margin: auto;
        font-weight: bold;
        color: white;
        
    }


    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus { 
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 2.5rem;
        min-width: 2.5rem;
        height: 2.5rem;
        margin: auto;
        background: #6a748533; ;
        border-radius: 50%;
        color: white;
    }
    
    button.react-calendar__tile {
        background: #fff;
        width: 3.5rem;
        height: 3.5rem;
    }
    button.react-calendar__tile--now {
        background: #ffff76;
        color: #000;
    }
    
    .react-calendar--selectRange .react-calendar__tile--hover {
        background-color: #52bcc0;
    }
    .react-calendar__tile--range {
        background: #f8f8fa;
        color: var(--color-header);
        border-radius: 0;
    }
    .react-calendar__tile--rangeStart {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-top-left-radius: 6px;
        border-bottom-left-radius: 6px;
        background: var(--color-header);
        color: white;
    }
    .react-calendar__tile--rangeEnd {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        background: var(--color-header);
        color: white;
    }
    
    button p {
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 2.5rem;
        min-width: 2.5rem;
        height: 2.5rem;
        margin: auto;
        border-radius: 50%;
    }
    
    p.habit-doned {    
        background: #81C063;
        color: white;
    }
    
    p.habit-not-doned {    
        background: #ED4C40;
        color: white;
    }
    
    .react-calendar__month-view__days__day--weekend p.habit {
        color: #e73b3b;
    }
    .react-calendar__month-view__days__day--weekend p.habit.habit-not-doned {
        color: #2e0a0a;
    }

    .react-calendar__tile--active P.habit-doned {
        background: #9ebb90;
        font-weight: bold;
    }
    .react-calendar__tile--active P.habit-not-doned {
        background: #eb7c7c;
        font-weight: bold;
    }
    
    
    .react-calendar__tile.react-calendar__month-view__days__day--neighboringMonth {
        color: #757575;
    }

    .react-calendar__tile.react-calendar__month-view__days__day--neighboringMonth p.habit-not-doned {
        background: #865757;
        color: #a0a0a0;
    }
    .react-calendar__tile.react-calendar__month-view__days__day--neighboringMonth p.habit-doned {
        background: #658556;
        color: #a0a0a0;
    }

    `
    export default CalendarStyle;