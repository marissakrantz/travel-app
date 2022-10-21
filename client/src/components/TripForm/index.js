import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_TRIP } from '../../utils/mutations';
import { QUERY_TRIPS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const TripForm = () => {
  const [name, setName] = useState('');

  const [addTrip, { error }] = useMutation(ADD_TRIP, {
    update(cache, { data: { addTrip } }) {
      try {
        const { trip } = cache.readQuery({ query: QUERY_TRIPS });

        cache.writeQuery({
          query: QUERY_TRIPS,
          data: { trip: [addTrip, ...trip] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, trips: [...me.trips, addTrip] } },
      });
    },
  });
  

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addTrip({
        variables: {
          name,
        },
      });

      setName('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === 'name') {
      setName(value);
    }
  };

  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <input
                name="name"
                placeholder="Give your holiday a name..."
                value={name}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></input>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Trip
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to add/view your trip. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default TripForm;