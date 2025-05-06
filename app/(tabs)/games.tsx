import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { mockGames } from '@/mocks/games';
import GameCard from '@/components/GameCard';
import theme from '@/constants/theme';
import PandaHeader from '@/components/PandaHeader';

export default function GamesScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <PandaHeader 
        title="Fun & Games" 
        showBackButton={false}
      />
      
      <View style={styles.content}>
        <LinearGradient
          colors={['rgba(255, 151, 183, 0.2)', 'rgba(230, 230, 250, 0.2)']}
          style={styles.bannerContainer}
        >
          <View style={styles.bannerContent}>
            <View style={styles.bannerTextContainer}>
              <Text style={styles.bannerTitle}>Play Together</Text>
              <Text style={styles.bannerDescription}>
                Discover fun games and activities to strengthen your bond
              </Text>
            </View>
            <View style={styles.pandaContainer}>
              <View style={styles.pandaFace}>
                <View style={styles.pandaEar} />
                <View style={[styles.pandaEar, styles.pandaEarRight]} />
                <View style={styles.pandaEye} />
                <View style={[styles.pandaEye, styles.pandaEyeRight]} />
                <View style={styles.pandaNose} />
                <View style={styles.pandaMouth} />
              </View>
            </View>
          </View>
        </LinearGradient>
        
        <Text style={styles.sectionTitle}>Games & Activities</Text>
        
        <FlatList
          data={mockGames}
          renderItem={({ item }) => <GameCard game={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.m,
  },
  bannerContainer: {
    marginTop: theme.spacing.m,
    borderRadius: theme.radius.l,
    overflow: 'hidden',
    marginBottom: theme.spacing.l,
  },
  bannerContent: {
    flexDirection: 'row',
    padding: theme.spacing.m,
    alignItems: 'center',
  },
  bannerTextContainer: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 8,
  },
  bannerDescription: {
    fontSize: 14,
    color: theme.colors.textLight,
    lineHeight: 20,
  },
  pandaContainer: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pandaFace: {
    width: 70,
    height: 70,
    backgroundColor: 'white',
    borderRadius: 35,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  pandaEar: {
    position: 'absolute',
    width: 25,
    height: 25,
    backgroundColor: 'black',
    borderRadius: 12.5,
    top: -8,
    left: -3,
  },
  pandaEarRight: {
    left: 'auto',
    right: -3,
  },
  pandaEye: {
    position: 'absolute',
    width: 15,
    height: 15,
    backgroundColor: 'black',
    borderRadius: 7.5,
    top: 20,
    left: 15,
  },
  pandaEyeRight: {
    left: 'auto',
    right: 15,
  },
  pandaNose: {
    position: 'absolute',
    width: 12,
    height: 8,
    backgroundColor: 'black',
    borderRadius: 4,
    top: 40,
    left: 29,
  },
  pandaMouth: {
    position: 'absolute',
    width: 20,
    height: 8,
    backgroundColor: 'black',
    borderRadius: 4,
    top: 50,
    left: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.m,
  },
  listContent: {
    paddingBottom: theme.spacing.xxl,
  },
});