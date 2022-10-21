import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

import { Checkbox, Box, Heading, } from "@chakra-ui/react"
import { useMutation } from '@apollo/client';
import { COMPLETE_TRIP_UPDATE } from '../../utils/mutations';

const TripList = ({
    trips,
    title,
    showTitle = true,
}) => {

    const [completeTrip, loading] = useMutation(COMPLETE_TRIP_UPDATE);

    function toggleTrip(trip) {

        return function (event) {
            completeTrip({
                variables: {
                    tripsId: trip._id,
                    completed: event.target.checked
                }
            })
        }

    }

    if (!trips.length) {
        return <h3 className="noData col-"> No Trips Yet, Add Your First Trip Above!</h3>;
    }

    return (
        <div className="col-12 ">
            <div className="row ">
                {Auth.loggedIn() ? (
                    <>
                        {trips &&
                            trips.map((trip) => (
                                <Box
                                    key={trip._id}
                                    className="tripCard1"
                                    shadow="2xl"
                                    borderWidth="1px"
                                    borderRadius="md">
                                    <div key={trip._id} className="tripCard m-5 btn">
                                        <Checkbox size="lg" isChecked={Boolean(trip.completed)} onChange={toggleTrip(trip)} >
                                            <Link
                                                className="btn btn-primary btn-block"
                                                to={`/trip/${trip._id}`}
                                            >
                                                <Heading size="lg">{trip.name}</Heading>
                                            </Link>
                                        </Checkbox>
                                    </div>
                                </Box>
                            ))}
                    </>
                ) : (
                    <p></p>
                )}
            </div>
        </div>
    );
};

export default TripList;