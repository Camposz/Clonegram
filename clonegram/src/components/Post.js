import React, { useCallback, useState } from 'react';
import { Text, View, Image, StyleSheet, ImageBackground } from 'react-native';
import RoundedProfileStorie from '../components/RoundedProfileStorie';
import { screenWidth, screenHeight } from '../Dimensions';
import CustomIcons from './CustomIcons';
import CustomAnimatedIcon from './CustomAnimatedIcon';
import { useList } from '../hooks/useList';
import RoundedProfile from './RoundedProfile';
import { TapGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';

const PostHeader = ({ profilePic, user }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 13,
      }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <RoundedProfileStorie
          profilePic={profilePic}
          size={screenWidth * 0.09}
        />
        <Text style={{ fontSize: 12.3, fontWeight: '700', marginLeft: 10 }}>
          {user}
        </Text>
      </View>
      <CustomIcons
        imageUri={require('../../assets/images/icons/more.png')}
        size={screenWidth * 0.04}
      />
    </View>
  );
};

const PostIcons = ({liked, setLiked}) => {
  const iconSize = screenWidth * 0.06;
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 13,
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <CustomAnimatedIcon
          imageUri={require('../../assets/images/icons/love.png')}
          pressedUri={require('../../assets/images/icons/love-black.png')}
          size={iconSize}
          liked={liked}
          setLiked={setLiked}
        />
        <CustomIcons
          imageUri={require('../../assets/images/icons/bate-papo.png')}
          size={iconSize}
          style={{ marginHorizontal: 10 }}
        />
        <CustomIcons
          imageUri={require('../../assets/images/icons/mandar.png')}
          size={iconSize}
        />
      </View>
      <CustomIcons
        imageUri={require('../../assets/images/icons/marca-paginas.png')}
        size={iconSize}
      />
    </View>
  );
};

const PostImage = ({ postImage, setLiked }) => {
  const AnimatedImage = Animated.createAnimatedComponent(Image);

  const scale = useSharedValue(0);

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ scale: Math.max(scale.value, 0) }],
  }));

  const onDoubleTap = useCallback(() => {
    if (scale.value == 0) {
      scale.value = withSpring(1, {stiffness: 200}, (isFinished) => {
        if (isFinished) {
          scale.value = withDelay(200, withSpring(0));
        }
      });
    }
    setLiked(true);
  }, []);

  return (
    <TapGestureHandler numberOfTaps={2} onActivated={onDoubleTap}>
      <Animated.View>
        <ImageBackground
          source={postImage}
          resizeMode={'cover'}
          style={{
            width: '100%',
            height: screenHeight * 0.45,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <AnimatedImage
            source={require('../../assets/images/icons/love-black.png')}
            style={[
              {
                width: screenWidth * 0.2,
                height: screenWidth * 0.2,
                tintColor: 'white',
              },
              rStyle,
            ]}
            resizeMode={'center'}
          />
        </ImageBackground>
      </Animated.View>
    </TapGestureHandler>
  );
};

const Like = ({ profilePic, randomLike }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
      }}>
      <View style={{ width: screenWidth * 0.065 * 1.6 }}>
        <View style={{ zIndex: 10 }}>
          <RoundedProfile
            imageUri={profilePic}
            size={screenWidth * 0.07}
            borderColor={'white'}
            borderWidth={2.5}
          />
        </View>
        <View style={{ position: 'absolute', left: 14 }}>
          <RoundedProfile
            imageUri={{ uri: randomLike.picture.medium }}
            size={screenWidth * 0.07}
            borderColor={'white'}
            borderWidth={2.5}
          />
        </View>
      </View>
      <Text style={[styles.txt, { marginLeft: 5 }]}>
        Gostos:{' '}
        <Text style={[styles.txt, { fontWeight: 'bold' }]}>
          {randomLike.name.first + randomLike.name.last}
        </Text>{' '}
        e{' '}
        <Text style={[styles.txt, { fontWeight: 'bold' }]}>outras pessoas</Text>
      </Text>
    </View>
  );
};

const Comment = ({ randomNumber, user }) => {

  return (
    <View>
      <View style={{ flexDirection: 'row', paddingBottom: 3 }}>
        <Text style={[styles.txt, { fontWeight: 'bold' }]}>{user} </Text>
        <Text style={[styles.txt, { fontWeight: 'normal' }]}>
          Foto linda que eu tirei para vocês 😎
        </Text>
      </View>
      <Text style={[styles.txt, { color: 'gray', paddingBottom: 3 }]}>
        Ver todos os 99 comentarios
      </Text>
      <Text style={[styles.txt, { color: 'gray' }]}>há 10 minutos</Text>
    </View>
  );
};

const Post = ({ profilePic, user, postImage, randomLike, randomNumber }) => {
  const [liked, setLiked] = useState(false);

  return (
    <View style={{ width: '100%' }}>
      <PostHeader profilePic={profilePic} user={user} />

      <PostImage postImage={postImage} setLiked={setLiked}/>
      <PostIcons liked={liked} setLiked={setLiked}/>
      <View
        style={{
          paddingHorizontal: 13,
          justifyContent: 'center',
        }}>
        <Like profilePic={profilePic} randomLike={randomLike} />
        <Comment  user={user} />
      </View>
    </View>
  );
};

export default Post;

const styles = StyleSheet.create({
  txt: {
    fontSize: 12,
  },
});
