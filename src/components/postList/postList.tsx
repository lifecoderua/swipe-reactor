import {Dimensions, StyleSheet, FlatList, Text} from "react-native";
import React, {useCallback, useLayoutEffect, useRef, useState} from "react";
import Post from "../post/post";

// TODO: mouse scroll doesn't affect keyboard nav index update - jumps on mouse => keyboard scroll switch

type PostAttributes = {
  __typename: string,
  type: string,
  id: string,
  insertId: string,
  image: {
    id: string,
    width: number,
    height: number,
    type: string,
    hasVideo: boolean,
    comment: string,
  },
}

type Post = {
  id: string,
  text: string,
  attributes: PostAttributes[],
}

type PostListProps = {
  posts: Post[],
  onIndexChange: (newIndex: number) => void,
}

export default function PostList(props: PostListProps) {
  const [index, setIndex] = useState(0);
  const flatListRef = useRef<FlatList<any>>(null);
  const ITEM_HEIGHT = Dimensions.get('window').height * 0.8;

  // set navigation
  useLayoutEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'w') {
        setIndex((prevIndex) => Math.max(0, prevIndex - 1));
      } else if (e.key === 's') {
        setIndex((prevIndex) => Math.min(props.posts.length - 1, prevIndex + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useLayoutEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index, animated: true });
      props.onIndexChange(index);
    }
  }, [index]);

  const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    console.log('viewableItems', viewableItems);
    console.log('changed', changed);
    props.onIndexChange(changed[0].index);
  }, []);

  const getImageSrc = (post: any) => {
    if (!post.attributes?.[0]?.image) {
      return false;
    }

    const image = post.attributes[0].image;
    const tags = post.tags.map((tag) => tag.name);
    const imagePostId = atob(post.attributes[0].id).split(':')[1];
    return `https://img10.joyreactor.cc/pics/post/image-${imagePostId}.${image.type}`;
  }

  const renderItem = ({item: post}) => getImageSrc(post) ? renderImage(post) : renderPlaceholder(post);

  const renderImage = (post) => (
    <Post
      title={post.user.userName}
      imageURL={getImageSrc(post) as string}
    />
  );

  const renderPlaceholder = (post) => (
    <Text>nothing cool here</Text>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={props.posts}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      pagingEnabled
      horizontal={false}
      snapToInterval={Dimensions.get('window').height * 0.8}
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      getItemLayout={(data, index) => (
        {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
      )}
      onViewableItemsChanged={onViewableItemsChanged}
    />
  );
}

// TODO use global constant? And always provide a 10 items buffer
const pagerLength = 10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    height: Dimensions.get('window').height * pagerLength * 0.8,
  },
});
