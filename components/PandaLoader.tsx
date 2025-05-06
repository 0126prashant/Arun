import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { Text } from 'react-native';
import theme from '@/constants/theme';

interface PandaLoaderProps {
  size?: number;
  message?: string;
}

const PandaLoader: React.FC<PandaLoaderProps> = ({ 
  size = 100,
  message = "Loading..."
}) => {
  const scaleAnim = new Animated.Value(1);
  const rotateAnim = new Animated.Value(0);

  useEffect(() => {
    const pulseAnimation = Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]);

    const rotateAnimation = Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    });

    Animated.parallel([
      Animated.loop(pulseAnimation),
      Animated.loop(rotateAnimation)
    ]).start();

    return () => {
      pulseAnimation.stop();
      rotateAnimation.stop();
    };
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.pandaContainer,
          {
            width: size,
            height: size,
            transform: [
              { scale: scaleAnim },
              { rotate: spin }
            ],
          },
        ]}
      >
        {/* Panda Face */}
        <View style={[styles.pandaFace, { width: size * 0.8, height: size * 0.8 }]}>
          {/* Ears */}
          <View style={[styles.ear, styles.leftEar, { width: size * 0.3, height: size * 0.3 }]} />
          <View style={[styles.ear, styles.rightEar, { width: size * 0.3, height: size * 0.3 }]} />
          
          {/* Eyes */}
          <View style={[styles.eye, styles.leftEye, { width: size * 0.2, height: size * 0.2 }]} />
          <View style={[styles.eye, styles.rightEye, { width: size * 0.2, height: size * 0.2 }]} />
          
          {/* Nose */}
          <View style={[styles.nose, { width: size * 0.15, height: size * 0.1 }]} />
          
          {/* Mouth */}
          <View style={[styles.mouth, { width: size * 0.3, height: size * 0.05 }]} />
        </View>
      </Animated.View>
      
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pandaContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  pandaFace: {
    backgroundColor: 'white',
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  ear: {
    position: 'absolute',
    backgroundColor: 'black',
    borderRadius: 999,
  },
  leftEar: {
    top: -10,
    left: -10,
  },
  rightEar: {
    top: -10,
    right: -10,
  },
  eye: {
    position: 'absolute',
    backgroundColor: 'black',
    borderRadius: 999,
  },
  leftEye: {
    top: '30%',
    left: '25%',
  },
  rightEye: {
    top: '30%',
    right: '25%',
  },
  nose: {
    position: 'absolute',
    backgroundColor: 'black',
    borderRadius: 999,
    top: '55%',
  },
  mouth: {
    position: 'absolute',
    backgroundColor: 'black',
    borderRadius: 999,
    top: '70%',
  },
  message: {
    marginTop: 20,
    fontSize: 16,
    color: theme.colors.textLight,
  },
});

export default PandaLoader;