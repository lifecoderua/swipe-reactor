// load data from GraphQL
import {Text, View} from "react-native";
import {gql, useQuery} from "@apollo/client";

export default function Playground() {
  // const GET_POST = gql`
  //   query {
  //     tag(name: "API") {
  //       name,
  //       nsfw,
  //     },
  //
  //     node(id: "UG9zdDo1NTMxOTQ4") {
  //       __typename
  //       ... on Post {
  //         text,
  //         comments {
  //       \t\ttext
  //         },
  //         attributes {
  //             image {
  //               comment
  //               id
  //             }
  //           },
  //           tags {
  //             name
  //           },
  //           id
  //       }
  //     }
  //   }
  // `;

  const GET_POSTS = gql`
    query GetPosts($tagName: String, $type: PostLineType!, $page: Int, $offset: Int) {
    tag(name: $tagName) {
      name,
      nsfw,
      postPager(type: $type) {
        posts(page: $page, offset: $offset) {
          header,
          text,
          nsfw,
          attributes {
            __typename
            type
            id
            insertId
            image {
              id
              width
              height
              type
              hasVideo
              comment
            }
          },
          tags {
            name
          },
          id
        }
        count
      }
    },
  }`;

  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: {
      tagName: null,
      type: 'GOOD',
      page: 0,
      offset: 0,
    },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const getImageSrc = (post: any) => {
    const image = post.attributes[0].image;
    const tags = post.tags.map((tag) => tag.name);
    const imagePostId = atob(post.attributes[0].id).split(':')[1];
    return `https://img10.joyreactor.cc/pics/post/${tags[0]}-${tags[1]}-${tags[2]}-${imagePostId}.${image.type}`;
  }

  return (
    <View>
      {data.tag.postPager.posts.map((post) => (
        <Text key={post.id}>
          <img
            alt={post.tags[0].name}
            src={getImageSrc(post)}
          />
        </Text>
      ))}
    </View>
  );
}
