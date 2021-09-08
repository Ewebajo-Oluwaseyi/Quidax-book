import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query {
    books {
      id
      title
      featured
      image_url
      authors {
        name
      }
      tags {
        name
      }
      rating
      genres {
        name
      }
      price
      number_of_purchases
      likes
      published_at
      available_copies
    }
  }
  `;