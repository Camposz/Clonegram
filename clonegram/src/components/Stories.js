import * as React from 'react';
import { View, Text, FlatList } from 'react-native';
import RoundedProfileStorie from '../components/RoundedProfileStorie';
import { screenWidth, screenHeight } from '../Dimensions';
import { LinearGradient } from 'expo-linear-gradient';
import { useList } from '../hooks/useList';
import Icon from 'react-native-vector-icons/Ionicons';

const CardStorie = ({ profilePic, user }) => {
  const cardWidth = screenWidth * 0.19;
  return (
    <View
      style={{
        alignItems: 'center',
        marginLeft: 10,
      }}>
      <RoundedProfileStorie profilePic={profilePic} size={cardWidth} />
      <Text
        numberOfLines={1}
        style={{
          fontSize: 11,
          padding: 3,
          maxWidth: cardWidth,
        }}>
        {user}
      </Text>
    </View>
  );
};

function Stories({ imageUri, size, borderColor }) {
  const { apiData, isLoading } = useList(
    'https://randomuser.me/api/?results=6'
  );

  return (
    <>
      {!isLoading && (
        <FlatList
          data={apiData?.results}
          showsHorizontalScrollIndicator={false}
          style={{
            maxHeight: screenHeight * 0.155,
            borderBottomWidth: 0.74,
            borderBottomColor: '#dcdcdc',
            alignItems: 'center',
          }}
          horizontal
          // showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          ListHeaderComponent={() => {
            return (
              <>
                <CardStorie
                  profilePic={require('../../assets/images/content/profilePic.png')}
                  user={'dudaBaby101'}
                />
                <View
                  style={{
                    position: 'absolute',
                    right: 0,
                    bottom: 20,
                    backgroundColor: 'white',
                    borderRadius: 50, 
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Icon name="add-circle" size={25} color="#405DE6" />
                </View>
              </>
            );
          }}
          renderItem={({ item }) => {
            return (
              <CardStorie
                profilePic={{ uri: item.picture.medium }}
                user={item.name.first + item.name.large}
              />
            );
          }}
        />
      )}
    </>
  );
}

export default Stories;
