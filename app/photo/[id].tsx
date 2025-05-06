import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Calendar, MapPin, Heart } from 'lucide-react-native';
import { usePhotoStore } from '@/store/photoStore';
import PandaHeader from '@/components/PandaHeader';
import theme from '@/constants/theme';

const { width } = Dimensions.get('window');

export default function PhotoDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { photos, toggleFavorite } = usePhotoStore();
  
  const photo = photos.find(p => p.id === id);
  
  if (!photo) {
    return (
      <SafeAreaView style={styles.container}>
        <PandaHeader title="Photo Not Found" />
        <View style={styles.centerContainer}>
          <Text>This photo doesn't exist or has been deleted.</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  const handleFavoriteToggle = () => {
    toggleFavorite(photo.id);
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <PandaHeader 
        title={photo.title || "Photo Detail"} 
        showFavoriteButton={true}
        isFavorite={photo.isFavorite}
        onFavoritePress={handleFavoriteToggle}
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: photo.uri }}
            style={styles.image}
            contentFit="cover"
          />
        </View>
        
        {photo.title && (
          <Text style={styles.title}>{photo.title}</Text>
        )}
        
        {photo.description && (
          <Text style={styles.description}>{photo.description}</Text>
        )}
        
        <View style={styles.metaContainer}>
          <View style={styles.metaItem}>
            <Calendar size={16} color={theme.colors.textLight} />
            <Text style={styles.metaText}>
              {new Date(photo.date).toLocaleDateString()}
            </Text>
          </View>
          
          {photo.location && (
            <View style={styles.metaItem}>
              <MapPin size={16} color={theme.colors.textLight} />
              <Text style={styles.metaText}>{photo.location}</Text>
            </View>
          )}
        </View>
        
        <TouchableOpacity 
          style={[
            styles.favoriteButton,
            photo.isFavorite ? styles.favoriteButtonActive : {}
          ]}
          onPress={handleFavoriteToggle}
        >
          <Heart 
            size={20} 
            color={photo.isFavorite ? theme.colors.white : theme.colors.primary}
            fill={photo.isFavorite ? theme.colors.white : 'none'}
          />
          <Text 
            style={[
              styles.favoriteButtonText,
              photo.isFavorite ? styles.favoriteButtonTextActive : {}
            ]}
          >
            {photo.isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.m,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: theme.spacing.m,
  },
  imageContainer: {
    width: width - (theme.spacing.m * 2),
    height: width - (theme.spacing.m * 2),
    borderRadius: theme.radius.m,
    overflow: 'hidden',
    marginBottom: theme.spacing.m,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  description: {
    fontSize: 16,
    color: theme.colors.textLight,
    marginBottom: theme.spacing.m,
    lineHeight: 22,
  },
  metaContainer: {
    marginBottom: theme.spacing.m,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  metaText: {
    fontSize: 14,
    color: theme.colors.textLight,
    marginLeft: 8,
  },
  favoriteButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.m,
    borderRadius: theme.radius.m,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    marginTop: theme.spacing.m,
  },
  favoriteButtonActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  favoriteButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
    marginLeft: theme.spacing.s,
  },
  favoriteButtonTextActive: {
    color: theme.colors.white,
  },
});