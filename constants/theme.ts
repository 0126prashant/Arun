import { Dimensions } from 'react-native';
import colors from './Colors';


const { width, height } = Dimensions.get('window');

export default {
  colors,
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 32,
    xxl: 48,
  },
  radius: {
    s: 4,
    m: 8,
    l: 16,
    xl: 24,
    xxl: 32,
    round: 999,
  },
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: '700',
    },
    h2: {
      fontSize: 24,
      fontWeight: '700',
    },
    h3: {
      fontSize: 20,
      fontWeight: '600',
    },
    h4: {
      fontSize: 18,
      fontWeight: '600',
    },
    body: {
      fontSize: 16,
      fontWeight: '400',
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400',
    },
    caption: {
      fontSize: 12,
      fontWeight: '400',
    },
  },
  sizes: {
    width,
    height,
  },
};