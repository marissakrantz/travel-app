import React from 'react';

// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import ItineraryList from '../components/ItineraryList/index';
import ItineraryForm from '../components/ItineraryForm/index';

import { QUERY_SINGLE_TRIP } from '../utils/queries';


const SingleTrip = () => {
    // Use `useParams()` to retrieve value of the route parameter `:profileId`
    const { tripId } = useParams();

    const { loading, data } = useQuery(QUERY_SINGLE_TRIP, {
        // pass URL parameter
        variables: { tripsId: tripId },
    });

    const trip = data?.trip || {};


    if (loading) {
        return <div>Loading...</div>;
    }
    return (
        <div className="my-3 h-45">
            <h1 className="itinearayHeader"> The Itinerary for your {trip.name} holiday!</h1>
            <div className="my-5">
                <ItineraryList itinerary={trip.itinerary} />
            </div>
            <div className="m-c p-4" style={{ border: '1px dotted #1a1a1a' }}>
                <ItineraryForm tripID={trip._id} />
            </div>
        </div>
    );
};

export default SingleTrip;