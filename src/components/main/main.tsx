import React from 'react';
import {gql, useQuery} from "@apollo/client";
import PostList from "../postList/postList";

export default function Main() {

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

  const posts = data.tag.postPager.posts;

  const onIndexChange = (newIndex: number) => {
    console.log('index', newIndex);
  }

  return (
    <PostList
      posts={posts}
      onIndexChange={onIndexChange}
    />
  )
}
