import React from 'react';
import { Navigate, Redirect, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import TripList from '../components/TripList/index';
import TripForm from '../components/TripForm/index';

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';


const Home = () => {
    const { username: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
        variables: { username: userParam },
    });

    const user = data?.me || data?.user || {};
    // redirect to personal profile page if username is yours
    if (!Auth.loggedIn()) {
        return <Navigate to="/login" />;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user?.username) {
        return (
            <h4>
                You need to be logged in to see this. Use the navigation links above to
                sign up or log in!
            </h4>
        );
    }

    return (
        //start from this DIV row as a top then col moving down FIX THIS
        <div className="h-50">
            <h1 className="itinearayHeader"> Happy holidaying {user.username} </h1>
            {!userParam && (
                <div
                    className="col-md-10 m-5 p-3"
                    style={{ border: '1px dotted #1a1a1a' }}
                >
                    <TripForm />
                </div>
            )}
            <div className="col-12">
                <div className="row">
                    <div>
                        <TripList
                            trips={user.trips}
                            title={`{user.username}'s trips...`}
                            showTitle={false}
                            showUsername={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;