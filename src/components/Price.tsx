import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { CurrencyObject } from '../types/crypto-data';
import { numberWithCommas } from '../utils/format';

const currencySymbolMap = {
  '&euro;': '€',
  '&pound;': '£',
  '&#36;': '$',
};

interface CurrencyProps {
  currency: CurrencyObject | undefined;
}

export function Price({ currency }: CurrencyProps) {
  if (!currency) {
    return null;
  }
  console.log(currency);
  return (
    <Text style={styles.text}>
      {currencySymbolMap[currency.symbol]}
      {numberWithCommas(currency.rate_float, 2)}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 36,
    color: 'white',
  },
});
