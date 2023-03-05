import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { CurrencyObject } from '../types/current-crypto-data';

interface CurrencyProps {
  currency: CurrencyObject | undefined;
}

export function Currency({ currency }: CurrencyProps) {
  if (!currency) {
    return null;
  }

  return (
    <Text style={styles.text}>
      {currencySymbolMap[currency.symbol]}
      {parseFloat((currency.rate_float || 0).toFixed(2)).toLocaleString()}
    </Text>
  );
}

const currencySymbolMap = {
  '&euro;': '€',
  '&pound;': '£',
  '&#36;': '$',
};

const styles = StyleSheet.create({
  text: {
    fontSize: 34,
    color: '#fefefe'
  },
});
