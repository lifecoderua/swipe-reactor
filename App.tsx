import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Main from "./src/components/main/main";
import Playground from "./src/components/playground/playground";

// Initialize Apollo Client
const client = new ApolloClient({
  // uri: 'https://api.joyreactor.cc/graphql',
  uri: 'http://localhost:3030',
  cache: new InMemoryCache()
});

export default function App() {
  return (
    <View style={styles.container}>
      <ApolloProvider client={client}>
        <Text>Open up App.tsx to start working on your app!</Text>
        <Playground />
        <hr/>
        <Main />
        <StatusBar style="auto" />
      </ApolloProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
