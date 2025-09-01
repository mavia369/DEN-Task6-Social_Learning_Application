import { Button } from 'react-native-paper'
import { Text, StatusBar, StyleSheet, Image, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors } from '../../theme/theme';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';


const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle={'dark-content'} />

      <Text style={styles.title}>Welcome to our App!</Text>

      <Image
        source={require('../../assets/images/welcome.png')}
        style={styles.welcomeImg}
      />

      <Text style={styles.subtitle}>
        Connect, learn, and grow together with students worldwide
      </Text>

      <View style={styles.nxtBtnContainer}>
        <Button
          onPress={() => navigation.navigate('Features')}
          style={styles.nextBtn}
          labelStyle={styles.nextBtnLabel}
        >
          Next
        </Button>
      </View>

      <View style={styles.bannerAd}>
        <BannerAd
          unitId={adUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        />
      </View>
    </SafeAreaView>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    paddingHorizontal: 10
  },

  title: {
    fontSize: 30,
    color: colors.SecondaryDark,
    fontWeight: 'bold',
    marginTop: 50,
    textAlign: 'center'
  },

  subtitle: {
    fontSize: 20,
    color: colors.SecondaryLight,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 60
  },

  welcomeImg: {
    height: 350,
    width: 350,
    marginLeft: 20,
    marginTop: 70
  },

  nextBtn: {
    backgroundColor: colors.SecondaryDark,
    paddingHorizontal: 36,
    alignSelf: 'flex-end',
  },

  nextBtnLabel: {
    color: colors.white,
    fontSize: 18
  },

  bannerAd: {
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  nxtBtnContainer: {
    flex: 1,
    marginBottom: 10,
    marginRight: 5,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  }
})