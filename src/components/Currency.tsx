import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Bpi, CurrencyCode, CurrencyObject } from '../types/crypto-data';

interface OptionProps {
  currency: CurrencyCode;
  selected: boolean;
  onPress: (currency: CurrencyCode) => void;
}

export function Currency({ currency, selected, onPress }: OptionProps) {
  if (!currency) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.highlight]}
      onPress={() => onPress(currency)}
    >
      <Text style={styles.text}>{currency}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 22,
    paddingVertical: 12,
    marginHorizontal: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e4e4e4',
    backgroundColor: '#13274d',
    opacity: 0.5
  },
  highlight: {
    opacity: 1,
    borderColor: 'white',
    backgroundColor: '#1d2f50',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});
