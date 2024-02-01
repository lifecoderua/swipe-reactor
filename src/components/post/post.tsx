import {Image, Text, View, Dimensions, StyleSheet} from "react-native";

type PostProps = {
  id?: string,
  title?: string,
  content?: string,
  imageURL: string,
}

export default function Post(props: PostProps) {
  return (
    <View style={styles.container}>
      <Text>{props.title}</Text>
      <Image
        source={{
          uri: props.imageURL,
        }}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
