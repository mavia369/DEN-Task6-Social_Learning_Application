import { View, Text, StatusBar, StyleSheet, Image, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import { colors } from '../../theme/theme';
import { features } from '../../utilities/dummyData'
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';


const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const FeaturesScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <StatusBar barStyle={'dark-content'} />

      <Text style={styles.title}>Explore our Features</Text>
      <Text style={styles.subtitle}>
        A smarter way to learn with friends, stay organized, and grow your skills
      </Text>

      <FlatList
        data={features}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.featureCard}>
            <Image source={item.image} style={styles.featureImage} />
            <Text style={styles.featureTitle}>{item.title}</Text>
            <Text style={styles.featureDesc}>{item.description}</Text>
          </View>
        )}
      />

      <View style={styles.nxtBtnContainer}>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Privacy & Terms')}
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
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: colors.textSecondary,
    marginBottom: 20,
    paddingHorizontal: 30,
  },

  featureCard: {
    alignItems: 'center',
  },

  featureImage: {
    width: 70,
    height: 70,
    marginBottom: 20,
  },

  featureTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.SecondaryDark,
    marginBottom: 6,
  },

  featureDesc: {
    fontSize: 14,
    color: colors.SecondaryLight,
    textAlign: 'center',
    paddingHorizontal: 30,
    lineHeight: 20,
    marginBottom: 10
  },

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
    marginTop: 50
  },

  nextBtn: {
    backgroundColor: colors.SecondaryDark,
    paddingHorizontal: 24,
  },

  nextBtnLabel: {
    color: colors.white,
    fontSize: 18
  },

  bannerAd: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  nxtBtnContainer: {
    marginRight: 5,
    marginBottom: 10,
    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
  }
});

export default FeaturesScreen;
