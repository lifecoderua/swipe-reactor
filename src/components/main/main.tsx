import React from 'react';
import {gql, useQuery} from "@apollo/client";
import PostList from "../postList/postList";

const OFFSET_PER_PAGE = 10;

export default function Main() {
  const [offset, setOffset] = React.useState(0);
  const [tagName, setTagName] = React.useState(null);

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
          user {
            username
          },
          id
        }
        count
      }
    },
  }`;

  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: {
      tagName,
      type: 'GOOD',
      page: 0,
      offset,
    },
  });

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const allPosts = data.tag.postPager.posts;
  // filter out nsfw
  const posts = allPosts.filter((post: any) => !post.nsfw);

  const onIndexChange = (newIndex: number) => {
    console.log('index', newIndex);
    if (newIndex === posts.length - 1) {
      console.log('fetch more');
      setOffset((prevOffset) => prevOffset + OFFSET_PER_PAGE)
    }
  }

  return (
    <PostList
      posts={posts}
      onIndexChange={onIndexChange}
    />
  )

  // return (
  //   <View>
  //     <PostList
  //       posts={posts}
  //       onIndexChange={onIndexChange}
  //     />
  //     <Button title={'Next'} onPress={() => console.log('Next')}/>
  //   </View>
  // )
}
