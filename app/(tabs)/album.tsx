import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus } from 'lucide-react-native';
import { usePhotoStore } from '@/store/photoStore';
import AlbumCard from '@/components/AlbumCard';
import theme from '@/constants/theme';
import PandaHeader from '@/components/PandaHeader';

export default function AlbumScreen() {
  const { albums } = usePhotoStore();

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
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
      <Text style={styles.emptyTitle}>No Albums Yet</Text>
      <Text style={styles.emptyText}>
        Create your first album to start organizing your special memories together
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <PandaHeader 
        title="Our Albums" 
        showBackButton={false}
        rightComponent={
          <TouchableOpacity style={styles.addButton}>
            <Plus size={24} color={theme.colors.text} />
          </TouchableOpacity>
        }
      />
      
      {albums.length > 0 ? (
        <FlatList
          data={albums}
          renderItem={({ item }) => <AlbumCard album={item} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        renderEmptyState()
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.m,
  },
  listContent: {
    paddingTop: theme.spacing.m,
    paddingBottom: theme.spacing.xxl,
  },
  addButton: {
    padding: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.l,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: theme.spacing.s,
    marginTop: theme.spacing.l,
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.textLight,
    textAlign: 'center',
    lineHeight: 24,
  },
  pandaContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pandaFace: {
    width: 100,
    height: 100,
    backgroundColor: 'white',
    borderRadius: 50,
    position: 'relative',
    borderWidth: 1,
    borderColor: '#EEEEEE',
  },
  pandaEar: {
    position: 'absolute',
    width: 35,
    height: 35,
    backgroundColor: 'black',
    borderRadius: 17.5,
    top: -10,
    left: -5,
  },
  pandaEarRight: {
    left: 'auto',
    right: -5,
  },
  pandaEye: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: 'black',
    borderRadius: 10,
    top: 30,
    left: 20,
  },
  pandaEyeRight: {
    left: 'auto',
    right: 20,
  },
  pandaNose: {
    position: 'absolute',
    width: 16,
    height: 10,
    backgroundColor: 'black',
    borderRadius: 5,
    top: 55,
    left: 42,
  },
  pandaMouth: {
    position: 'absolute',
    width: 30,
    height: 10,
    backgroundColor: 'black',
    borderRadius: 5,
    top: 70,
    left: 35,
  },
});