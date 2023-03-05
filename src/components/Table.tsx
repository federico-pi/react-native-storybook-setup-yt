import { format, minutesToMilliseconds, secondsToMilliseconds } from 'date-fns';
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
import { CurrencyObject, CurrencyCode } from '../types/current-crypto-data';
import { Currency } from './Currency';
import { Option } from './Option';
import { keys } from 'lodash';
import { assets } from '../assets';
import { LinearGradient } from 'expo-linear-gradient';

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
    <LinearGradient
      style={styles.container}
      colors={['#ea4492', '#ff9cda', '#428cd4', '#004e9a', '#041b2d']}
      start={{ x: 0, y: 1 }}
      end={{ x: 0.4, y: 0.3 }}
      locations={[0, 0.2, 0.4, 0.6, 0.8]}
    >
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
      <View style={styles.options}>
        {keys(cryptoData?.bpi).map((code) => (
          <Option
            key={code}
            option={code as CurrencyCode}
            selected={code === selectedCurrency}
            onPress={(currency: CurrencyCode) => setSelectedCurrency(currency)}
          />
        ))}
      </View>
      <View style={styles.wrapper}>
        {isLoading && <ActivityIndicator />}
        {!isLoading && (
          <Currency currency={cryptoData?.bpi[selectedCurrency]} />
        )}
      </View>
      <View style={styles.wrapper}>
        {!counter && !isLoading && !isError && (
          <Button
            color={'#7DCFFF'}
            title="Update"
            onPress={() => {
              setCounter(STALE_TIME_IN_SECONDS);
              refetch();
            }}
          />
        )}
      </View>
      <Text style={styles.disclaimer}>{cryptoData?.disclaimer}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  info: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 48,
  },
  options: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 24,
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
    width: '100%',
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disclaimer: {
    marginTop: 16,
    fontSize: 11,
    color: '#fefefe',
  },
});
