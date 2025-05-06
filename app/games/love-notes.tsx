import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Heart, Send, X } from 'lucide-react-native';
import { useGameStore } from '@/store/gameStore';
import { mockLoveNotes } from '@/mocks/games';
import PandaHeader from '@/components/PandaHeader';
import PandaButton from '@/components/PandaButton';
import theme from '@/constants/theme';

export default function LoveNotesScreen() {
  const { loveNotes, addLoveNote, markLoveNoteAsRead } = useGameStore();
  const [newNoteContent, setNewNoteContent] = useState('');
  const [isAddingNote, setIsAddingNote] = useState(false);
  
  // Use mock notes if none are available
  const notes = loveNotes.length > 0 ? loveNotes : mockLoveNotes;
  
  const handleAddNote = () => {
    if (newNoteContent.trim()) {
      addLoveNote({
        id: Date.now().toString(),
        content: newNoteContent.trim(),
        date: new Date().toISOString(),
        isRead: false,
      });
      setNewNoteContent('');
      setIsAddingNote(false);
    }
  };
  
  const handleNotePress = (id: string) => {
    markLoveNoteAsRead(id);
  };
  
  const renderNoteItem = ({ item }: { item: typeof notes[0] }) => {
    const date = new Date(item.date);
    const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    return (
      <TouchableOpacity 
        style={[styles.noteItem, !item.isRead && styles.unreadNote]}
        onPress={() => handleNotePress(item.id)}
        activeOpacity={0.8}
      >
        <View style={styles.noteHeader}>
          <Heart size={16} color={theme.colors.primary} fill={theme.colors.primary} />
          <Text style={styles.noteDate}>{formattedDate}</Text>
          {!item.isRead && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.noteContent}>{item.content}</Text>
      </TouchableOpacity>
    );
  };
  
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <PandaHeader title="Love Notes" />
      
      {isAddingNote ? (
        <View style={styles.addNoteContainer}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Write a sweet message..."
              value={newNoteContent}
              onChangeText={setNewNoteContent}
              multiline
              autoFocus
            />
          </View>
          
          <View style={styles.addNoteActions}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => {
                setIsAddingNote(false);
                setNewNoteContent('');
              }}
            >
              <X size={24} color={theme.colors.textLight} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[
                styles.sendButton,
                !newNoteContent.trim() && styles.sendButtonDisabled
              ]}
              onPress={handleAddNote}
              disabled={!newNoteContent.trim()}
            >
              <Send size={24} color={theme.colors.white} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.content}>
          <FlatList
            data={notes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())}
            renderItem={renderNoteItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={() => (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No love notes yet. Write your first one!</Text>
              </View>
            )}
          />
          
          <PandaButton
            title="Write a Love Note"
            onPress={() => setIsAddingNote(true)}
            style={styles.addButton}
            icon={<Heart size={18} color={theme.colors.white} />}
          />
        </View>
      )}
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
    padding: theme.spacing.m,
  },
  listContent: {
    paddingBottom: theme.spacing.xxl,
  },
  noteItem: {
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  unreadNote: {
    borderLeftWidth: 3,
    borderLeftColor: theme.colors.primary,
  },
  noteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.s,
  },
  noteDate: {
    fontSize: 12,
    color: theme.colors.textLight,
    marginLeft: theme.spacing.xs,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginLeft: 'auto',
  },
  noteContent: {
    fontSize: 16,
    color: theme.colors.text,
    lineHeight: 24,
  },
  addButton: {
    marginTop: 'auto',
  },
  emptyContainer: {
    padding: theme.spacing.l,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: theme.colors.textLight,
    textAlign: 'center',
  },
  addNoteContainer: {
    flex: 1,
    padding: theme.spacing.m,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radius.m,
    padding: theme.spacing.m,
    marginBottom: theme.spacing.m,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: theme.colors.text,
    textAlignVertical: 'top',
  },
  addNoteActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: theme.colors.textLight,
  },
});