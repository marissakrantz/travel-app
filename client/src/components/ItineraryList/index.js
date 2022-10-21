import React from 'react';

import Auth from '../../utils/auth';

const ItineraryList = ({
    itinerary,
    title,
    showTitle = true,
    showUsername = true,
}) => {

    function addZeroIfOnlyOneChar(dateString) {
        dateString = String(dateString);
        if (dateString.length < 2) {
            return '0' + dateString
        }
        return dateString
    }

    function getDateFromString(dateString) {
        const date = new Date(dateString)
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();


        return `${addZeroIfOnlyOneChar(day)}-${addZeroIfOnlyOneChar(month)}-${year}`
    }

    if (!itinerary.length) {
        return <h3 className="noData col-">No Itinerary Yet, Add Your First Item Below</h3>;
    }

    return (
        <div>
            {Auth.loggedIn() ? (
                <>
                    {showTitle && <h3>{title}</h3>}
                    {itinerary &&
                        itinerary.map((itinerary) => (
                            <div key={itinerary._id} className="card ml-5 mr-5">
                                <h4 className="card-header p-2 m-0">
                                    {showUsername ? (
                                        <div
                                            className=""
                                            to={`${itinerary.name}`}
                                        >
                                            {itinerary.name} from {getDateFromString(itinerary.startDate)} to {getDateFromString(itinerary.endDate)} <br />
                                        </div>
                                    ) : (
                                        <>
                                            <span style={{ fontSize: '1rem' }}>
                                            </span>
                                        </>
                                    )}
                                </h4>
                                <div className="card-body p-2">
                                    <p>{itinerary.details}</p>
                                </div>
                            </div>
                        ))}
                </>
            ) : (
                <p></p>
            )}
        </div>
    );
};

export default ItineraryList;