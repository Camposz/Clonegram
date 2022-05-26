import * as React from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList } from 'react-native';
import Stories from '../components/Stories';
import Post from '../components/Post';
import { useList } from '../hooks/useList';

function HomeScreen() {
  const { apiData, isLoading } = useList(
    `https://randomuser.me/api/?results=6`
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Stories />
      <FlatList
        style={{ flex: 1 }}
        data={apiData?.results}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
          const randomNumber = (max) => {
            return Math.floor(Math.random() * (max - 0 + 1) + 0);
          };

          const randomLikeUserIndex = randomNumber(5)

          return (
            <Post
              randomNumber={randomNumber}
              profilePic={{ uri: item.picture.medium }}
              user={item.name.first + item.name.last}
              postImage={{
                uri: `https://picsum.photos/id/${randomNumber(1000)}/200/300`,
              }}
              randomLike={
                apiData?.results[randomLikeUserIndex]
              }
            />
          );
        }}
      />
    </View>
  );
}

export default HomeScreen;
