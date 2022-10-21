import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      trips {
        _id
        name
        completed
      }
    }
  }
`;

export const QUERY_TRIPS = gql`
query getTrips {
    trips {
        _id
        name
        completed
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      trips {
        _id
        name
        completed
      }
    }
  }
`;

export const QUERY_ITINERARY = gql`
query getItinerary {
    itinerary {
        _id
        name
        completed
        startDate
        endDate
        details
    }
    trips {
      _id
      name
      completed
    }
  }
`;

export const QUERY_SINGLE_TRIP = gql`
  query getSingleTrip($tripsId: ID!) {
    trip(tripsId: $tripsId) {
      _id
      name
      completed
      itinerary {
        _id
        name
        completed
        startDate
        endDate
        details
      }
    }
  }
`;