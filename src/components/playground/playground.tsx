// load data from GraphQL
import {Text, View} from "react-native";
import {gql, useQuery} from "@apollo/client";

export default function Playground() {
  const GET_POSTS = gql`
    query {
      tag(name: "API") {
        name,
        nsfw,
      },
      
      node(id: "UG9zdDo1NTMxOTQ4") {
        __typename
        ... on Post {
          text,
          comments {
        \t\ttext
          },
          attributes {
              image {
                comment
                id
              }
            },
            tags {
              name
            },
            id
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_POSTS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <View>
      {data.node.attributes.map((attrs) => (
        <Text key={attrs.image.id}>{attrs.image.id} *** {JSON.stringify(attrs)}</Text>
      ))}
    </View>
  );
}
