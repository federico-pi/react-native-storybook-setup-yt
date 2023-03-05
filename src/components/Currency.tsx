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
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderColor: 'white',
    borderRadius: 16,
    backgroundColor: '#777',
    marginHorizontal: 7,
    opacity: 0.35
  },
  highlight: {
    opacity: 0.85,
  },
  text: {
    fontSize: 18,
    color: '#fefefe',
  },
});
