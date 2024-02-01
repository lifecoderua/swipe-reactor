import React from 'react';
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
  const renderItem = ({ item }) => (
    <Post title={item.title} imageURL={item.imageURL} />
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      pagingEnabled
      horizontal={false}
      snapToInterval={Dimensions.get('window').height}
      showsVerticalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    height: Dimensions.get('window').height * data.length,
  },
});
