import {Image, Text, View} from "react-native";

type PostProps = {
  id?: string,
  title?: string,
  content?: string,
  imageURL: string,
}

export default function Post(props: PostProps) {
  return (
    <View>
      <Text>{props.title}</Text>
      <Image
        source={{
          uri: props.imageURL,
        }}
        style={{width: 200, height: 200}}
      />
    </View>
  );
}
