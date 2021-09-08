import { gql } from "@apollo/client";

export const GET_BOOK = gql`
  query Book($id: String) {
    books(where: { id: $id }) {
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
      publisher
      published_at
      available_copies
      full_description
    }
  }
`;