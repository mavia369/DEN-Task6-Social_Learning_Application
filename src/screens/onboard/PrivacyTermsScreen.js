import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { ActivityIndicator, Button, Checkbox } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../../theme/theme';
import { termsText } from '../../utilities/dummyData'
import {
  BannerAd,
  InterstitialAd,
  AdEventType,
  BannerAdSize,
  TestIds
} from 'react-native-google-mobile-ads';


const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';
const adUnitId2 = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const interstitial = InterstitialAd.createForAdRequest(adUnitId2, {
  keywords: ['fashion', 'clothing'],
});

const PrivacyTermsScreen = ({ navigation }) => {
  const [checked, setChecked] = useState(false);
  // const [loaded, setLoaded] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);
  const [adReady, setAdReady] = useState(false);


  const handleFinish = () => {
    // only show ad if ad is loaded
    if (adReady) {
      interstitial.show();
    }
    navigation.reset({ routes: [{ name: 'Login' }] })
  }

  useEffect(() => {
    let timer;//*

    const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
      setAdReady(true);    // ad loaded
      setLoaderDone(true); // hide loader
      clearTimeout(timer);
    });

    const unsubscribeOpened = interstitial.addAdEventListener(AdEventType.OPENED, () => {
      if (Platform.OS === 'ios') {
        StatusBar.setHidden(true);
      }
    });

    const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      if (Platform.OS === 'ios') {
        StatusBar.setHidden(false);
      }
    });

    // Start loading the interstitial 
    interstitial.load();

    //move-on if ad not loaded in 5 seconds
    timer = setTimeout(() => {
      if (!loaderDone) {
        //hide loader
        setLoaderDone(true);
      }
    }, 5000);

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeOpened();
      unsubscribeClosed();
      clearTimeout(timer);
    };
  }, []);

  // No advert ready to show yet
  if (!loaderDone) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={50} color={colors.SecondaryDark} />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Text style={styles.title}>Privacy & Terms</Text>
      <Text style={styles.subtitle}>
        Please read and accept our Privacy Policy and Terms of Service before continuing.
      </Text>

      <ScrollView style={styles.scrollBox} showsVerticalScrollIndicator={false}>
        {
          termsText.map((item, index) => (
            <Text key={index} style={styles.text}>
              {item}{"\n\n"}
            </Text>
          )
          )
        }
      </ScrollView>

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          onPress={() => setChecked(!checked)}
          color={colors.SecondaryDark}
        />
        <Text
          style={styles.checkboxLabel}
          onPress={() => setChecked(!checked)}
        >I agree to the Privacy Policy & Terms</Text>
      </View>

      <Button
        onPress={handleFinish}
        disabled={!checked}
        style={[styles.finishBtn, !checked && { backgroundColor: colors.silver }]}
        labelStyle={styles.finishBtnLabel}
      >
        Finish
      </Button>

      <View style={styles.bannerAd}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 30,
    marginTop: 50,
    fontWeight: 'bold',
    color: colors.SecondaryDark,
    textAlign: 'center',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 14,
    color: colors.SecondaryDark,
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },

  scrollBox: {
    flex: 1,
    backgroundColor: colors.primaryDark,
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },

  text: {
    fontSize: 16,
    color: colors.SecondaryDark,
    lineHeight: 20,
  },

  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },

  checkboxLabel: {
    fontSize: 14,
    color: colors.SecondaryLight,
  },

  finishBtn: {
    borderRadius: 12,
    paddingVertical: 5,
    backgroundColor: colors.SecondaryDark,
    marginBottom: 15
  },

  finishBtnLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.white
  },

  bannerAd: {
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.primaryLight
  }
});

export default PrivacyTermsScreen;
