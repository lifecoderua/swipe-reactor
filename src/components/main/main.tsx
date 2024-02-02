import React, { useState, useLayoutEffect, useRef } from 'react';
import { FlatList, Dimensions, StyleSheet } from 'react-native';
import Post from '../post/post';

const data = [
  {
    id: '1',
    title: 'First Post',
    content: 'This is my first post',
    imageURL: 'https://picsum.photos/200/300',
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'This is my second post',
    imageURL: 'https://picsum.photos/300/600',
  },
  {
    id: '3',
    title: 'Third Post',
    content: 'This is my third post',
    imageURL: 'https://picsum.photos/600/300',
  },
];

export default function Main() {
  const [index, setIndex] = useState(0);
  const flatListRef = useRef<FlatList<any>>(null);
  const ITEM_HEIGHT = Dimensions.get('window').height * 0.8;

  useLayoutEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'w') {
        setIndex((prevIndex) => Math.max(0, prevIndex - 1));
      } else if (e.key === 's') {
        setIndex((prevIndex) => Math.min(data.length - 1, prevIndex + 1));
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
    }
  }, [index]);

  const renderItem = ({ item }) => (
    <Post title={item.title} imageURL={item.imageURL} />
  );

  return (
    <FlatList
      ref={flatListRef}
      data={data}
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
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    height: Dimensions.get('window').height * data.length * 0.8,
  },
});
