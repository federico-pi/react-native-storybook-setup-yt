import { format, secondsToMilliseconds } from 'date-fns';
import { useEffect, useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useCurrentCryptoData } from '../api/current-crypto-data';
import { CurrencyCode } from '../types/crypto-data';
import { Currency } from './Currency';
import { keys } from 'lodash';
import { assets } from '../assets';
import { Gradient } from './Gradient';
import { Price } from './Price';

const STALE_TIME_IN_SECONDS = 60;

export function Table() {
  const {
    data: cryptoData,
    isLoading,
    isError,
    refetch,
  } = useCurrentCryptoData({
    staleTime: secondsToMilliseconds(STALE_TIME_IN_SECONDS),
    cacheTime: 0,
  });

  const [counter, setCounter] = useState(STALE_TIME_IN_SECONDS);
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('USD');

  useEffect(() => {
    counter > 0 &&
      setTimeout(() => setCounter((prevState) => prevState - 1), 1000);
  }, [counter]);

  useEffect(() => {
    if (isError) {
      Alert.alert(
        'Oops, Something went wrong',
        'Please try again later or contact support'
      );
    }
  }, [isError]);

  return (
    <Gradient containerStyle={styles.container}>
      <View style={styles.info}>
        <View style={styles.titleWrapper}>
          <Image source={assets.bitcoin} style={styles.icon} />
          <Text style={styles.title}>{`${cryptoData?.chartName} Price`}</Text>
        </View>
        <View>
          <Text style={styles.date}>
            {cryptoData?.time.updated &&
              format(new Date(cryptoData.time.updated), 'do MMM yyyy')}
          </Text>
          <Text style={styles.time}>
            {cryptoData?.time.updated &&
              format(new Date(cryptoData.time.updated), 'HH:mm')}
          </Text>
        </View>
      </View>
      <View style={styles.wrapper}>
        <View style={styles.options}>
          {keys(cryptoData?.bpi).map((code) => (
            <Currency
              key={code}
              currency={code as CurrencyCode}
              selected={code === selectedCurrency}
              onPress={(currency: CurrencyCode) =>
                setSelectedCurrency(currency)
              }
            />
          ))}
        </View>
        <View style={styles.placeholder}>
          {isLoading && <ActivityIndicator />}
          {!isLoading && <Price currency={cryptoData?.bpi[selectedCurrency]} />}
        </View>
        <View style={styles.placeholder}>
          {!counter && !isLoading && !isError && (
            <Button
              color={'#7DCFFF'}
              title="Refresh prices"
              onPress={() => {
                setCounter(STALE_TIME_IN_SECONDS);
                refetch();
              }}
            />
          )}
        </View>
      </View>
      <Text style={styles.disclaimer}>{cryptoData?.disclaimer}</Text>
    </Gradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 86,
    paddingBottom: 48,
    paddingHorizontal: 32,
  },
  info: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 64,
  },
  titleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 26,
    height: 26,
    marginRight: 8,
  },
  title: {
    fontSize: 24,
    color: '#fefefe',
  },
  date: {
    textAlign: 'right',
    fontSize: 16,
    color: '#fefefe',
  },
  time: {
    textAlign: 'right',
    fontSize: 13,
    color: '#fefefe',
  },
  wrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  options: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 36,
  },
  placeholder: {
    width: '100%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disclaimer: {
    fontSize: 11,
    color: '#fefefe',
  },
});
