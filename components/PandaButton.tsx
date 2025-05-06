import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import theme from '@/constants/theme';

interface PandaButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  fullWidth?: boolean;
}

const PandaButton: React.FC<PandaButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  style,
  textStyle,
  fullWidth = false,
}) => {
  const getContainerStyle = () => {
    let containerStyle: ViewStyle = {};
    
    // Variant styles
    switch (variant) {
      case 'primary':
        containerStyle = {
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.primary,
        };
        break;
      case 'secondary':
        containerStyle = {
          backgroundColor: theme.colors.secondary,
          borderColor: theme.colors.secondary,
        };
        break;
      case 'outline':
        containerStyle = {
          backgroundColor: 'transparent',
          borderColor: theme.colors.primary,
          borderWidth: 1,
        };
        break;
      case 'text':
        containerStyle = {
          backgroundColor: 'transparent',
          borderColor: 'transparent',
        };
        break;
    }
    
    // Size styles
    switch (size) {
      case 'small':
        containerStyle = {
          ...containerStyle,
          paddingVertical: theme.spacing.xs,
          paddingHorizontal: theme.spacing.s,
          borderRadius: theme.radius.s,
        };
        break;
      case 'large':
        containerStyle = {
          ...containerStyle,
          paddingVertical: theme.spacing.m,
          paddingHorizontal: theme.spacing.l,
          borderRadius: theme.radius.l,
        };
        break;
      case 'medium':
      default:
        containerStyle = {
          ...containerStyle,
          paddingVertical: theme.spacing.s,
          paddingHorizontal: theme.spacing.m,
          borderRadius: theme.radius.m,
        };
    }
    
    // Width style
    if (fullWidth) {
      containerStyle.width = '100%';
    }
    
    // Disabled style
    if (disabled) {
      containerStyle.opacity = 0.5;
    }
    
    return containerStyle;
  };
  
  const getTextStyle = () => {
    let textStyleObj: TextStyle = {};
    
    switch (variant) {
      case 'primary':
      case 'secondary':
        textStyleObj = {
          color: theme.colors.white,
        };
        break;
      case 'outline':
      case 'text':
        textStyleObj = {
          color: theme.colors.primary,
        };
        break;
    }
    
    switch (size) {
      case 'small':
        textStyleObj = {
          ...textStyleObj,
          fontSize: 14,
        };
        break;
      case 'large':
        textStyleObj = {
          ...textStyleObj,
          fontSize: 18,
        };
        break;
      case 'medium':
      default:
        textStyleObj = {
          ...textStyleObj,
          fontSize: 16,
        };
    }
    
    return textStyleObj;
  };
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        getContainerStyle(),
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' || variant === 'secondary' ? theme.colors.white : theme.colors.primary} 
        />
      ) : (
        <>
          {icon && <Text style={styles.iconContainer}>{icon}</Text>}
          <Text style={[styles.text, getTextStyle(), textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  iconContainer: {
    marginRight: theme.spacing.xs,
  },
});

export default PandaButton;