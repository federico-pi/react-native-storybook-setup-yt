import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Bpi, CurrencyCode, CurrencyObject } from '../types/current-crypto-data';

interface OptionProps {
  option: CurrencyCode;
  selected: boolean;
  onPress: (currency: CurrencyCode) => void;
}

export function Option({ option, selected, onPress }: OptionProps) {
  if (!option) {
    return null;
  }

  return (
    <TouchableOpacity
      style={[styles.container, selected && styles.highlight]}
      onPress={() => onPress(option)}
    >
      <Text style={styles.text}>{option}</Text>
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
    opacity: 0.45
  },
  highlight: {
    opacity: 1,
  },
  text: {
    fontSize: 18,
    color: '#fefefe',
  },
});
