
/*⚠️⚠️⚠️⚠️⚠️⚠️
ATENÇÃO -> LEIA O README
Na versão web, eu não fiz a rolagem horizontal, mas se rodar no celular conseguirá usar
⚠️⚠️⚠️⚠️⚠️⚠️
*/

import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { HomeScreen } from './src/telas';
import CustomIcons from './src/components/CustomIcons';
import RoundedProfile from './src/components/RoundedProfile';
import { screenWidth } from './src/Dimensions';

const Tab = createBottomTabNavigator();

export default function App() {
  const IconsPath = {
    home: require('./assets/images/icons/home.png'),
    homeGradient: require('./assets/images/icons/home-gradient.png'),
    search: require('./assets/images/icons/search.png'),
    searchGradient: require('./assets/images/icons/search-gradient.png'),
    video: require('./assets/images/icons/video.png'),
    videoGradient: require('./assets/images/icons/video-gradient.png'),
    bag: require('./assets/images/icons/bag.png'),
    bagGradient: require('./assets/images/icons/bag-gradient.png'),
    plus: require('./assets/images/icons/plus.png'),
    love: require('./assets/images/icons/love.png'),
    chat: require('./assets/images/icons/chat.png'),
  };

  const profilePic = require('./assets/images/content/profilePic.png');

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerTitleAlign: 'left',
          headerTitle: () => {
            return (
              <Image
                source={require('./assets/images/icons/title.png')}
                resizeMode={'contain'}
                style={{
                  width: screenWidth * 0.3,
                  height: '100%',
                  top: 3.8,
                }}
              />
            );
          },
          headerRight: ({ size }) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  width: screenWidth * 0.35,
                  justifyContent: 'space-around',
                  marginRight: 10,
                }}>
                <CustomIcons imageUri={IconsPath.plus} size={20} />
                <CustomIcons imageUri={IconsPath.love} size={20} />
                <CustomIcons imageUri={IconsPath.chat} size={20} />
              </View>
            );
          },
          tabBarIcon: ({ focused, size }) => {
            let iconUri;
            if (route.name !== 'Perfil') {
              if (route.name === 'Home') {
                iconUri = focused ? IconsPath.homeGradient : IconsPath.home;
              } else if (route.name === 'Search') {
                iconUri = focused ? IconsPath.searchGradient : IconsPath.search;
              } else if (route.name === 'Video') {
                iconUri = focused ? IconsPath.videoGradient : IconsPath.video;
              } else if (route.name === 'Bag') {
                iconUri = focused ? IconsPath.bagGradient : IconsPath.bag;
              }
              return <CustomIcons imageUri={iconUri} size={size} />;
            } else {
              return (
                <RoundedProfile
                  imageUri={profilePic}
                  size={size}
                  borderColor={focused ? 'black' : 'transparent'}
                  borderWidth={2}
                />
              );
            }
          },
          tabBarShowLabel: false,
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={HomeScreen} />
        <Tab.Screen name="Video" component={HomeScreen} />
        <Tab.Screen name="Bag" component={HomeScreen} />
        <Tab.Screen name="Perfil" component={HomeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
