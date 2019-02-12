import React from 'react';

import './BookingsNavigation.css';

const bookingsNavigation = props => {
    return (
        <div className="bookings-navigation">
            <button className={props.activeOutputType === 'list' ? 'active' : ''}
                    onClick={props.onChange.bind(this, 'list')}>List
            </button>
            <button className={props.activeOutputType === 'chart' ? 'active' : ''}
                    onClick={props.onChange.bind(this, 'chart')}>Chart
            </button>
        </div>
    )
}

export default bookingsNavigation;
