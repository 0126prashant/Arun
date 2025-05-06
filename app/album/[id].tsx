import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { Calendar, MapPin } from 'lucide-react-native';
import { usePhotoStore } from '@/store/photoStore';
import PhotoCard from '@/components/PhotoCard';
import PandaHeader from '@/components/PandaHeader';
import theme from '@/constants/theme';

export default function AlbumDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { albums, getAlbumPhotos } = usePhotoStore();
  
  const album = albums.find(a => a.id === id);
  const photos = getAlbumPhotos(id || '');
  
  if (!album) {
    return (
      <SafeAreaView style={styles.container}>
        <PandaHeader title="Album Not Found" />
        <View style={styles.centerContainer}>
          <Text>This album doesn't exist or has been deleted.</Text>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <PandaHeader title={album.title} />
      
      <FlatList
        data={photos}
        ListHeaderComponent={() => (
          <View style={styles.header}>
            <View style={styles.coverContainer}>
              <Image
                source={{ uri: album.coverUri }}
                style={styles.coverImage}
                contentFit="cover"
              />
            </View>
            
            <Text style={styles.title}>{album.title}</Text>
            
            {album.description && (
              <Text style={styles.description}>{album.description}</Text>
            )}
            
            <View style={styles.metaContainer}>
              <View style={styles.metaItem}>
                <Calendar size={16} color={theme.colors.textLight} />
                <Text style={styles.metaText}>
                  {new Date(album.date).toLocaleDateString()}
                </Text>
              </View>
              
              <View style={styles.metaItem}>
                <Text style={styles.metaText}>
                  {photos.length} photos
                </Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <Text style={styles.sectionTitle}>Photos</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <PhotoCard photo={item} size="medium" />
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
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
  header: {
    padding: theme.spacing.m,
  },
  coverContainer: {
    width: '100%',
    height: 200,
    borderRadius: theme.radius.m,
    overflow: 'hidden',
    marginBottom: theme.spacing.m,
  },
  coverImage: {
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
    flexDirection: 'row',
    marginBottom: theme.spacing.m,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: theme.spacing.m,
  },
  metaText: {
    fontSize: 14,
    color: theme.colors.textLight,
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.gray,
    marginBottom: theme.spacing.m,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.m,
  },
  listContent: {
    paddingBottom: theme.spacing.xxl,
  },
});