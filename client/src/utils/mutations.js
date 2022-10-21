import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_TRIP = gql`
  mutation addTrip($name: String!) {
    addTrip(name: $name) {
      _id
      name
      completed
    }
  }
`;

export const ADD_ITINERARY = gql`
  mutation addItinerary(
      $name: String!,
      $completed: Boolean!,
      $startDate: Date!,
      $endDate: Date!,
      $details: String!,
      $trip: ID!,
    ) {
    addItinerary(
        trip: $trip, 
        name: $name,
        completed: $completed,
        startDate: $startDate,
        endDate: $endDate,
        details: $details,
      ) {
        _id
        name
        completed
        startDate
        endDate
        details
        trips {
          _id
          name
          completed
      }
    }
  }
`;

export const COMPLETE_TRIP_UPDATE = gql`
  mutation completeTripUpdate(
    $tripsId: ID!, 
    $completed: Boolean!,
    ) {
    completeTripUpdate(
      tripsId: $tripsId,
      completed: $completed 
    ) {
      _id
      name
      completed
    }
  }
`;