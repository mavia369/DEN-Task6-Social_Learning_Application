import { View, Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';
import { colors } from '../../theme/theme';
import { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const ResultScreen = ({ navigation, route }) => {
  const finalScore = route.params.finalScore;

  useEffect(() => {
    const userId = auth().currentUser.uid;
    const timestamp = new Date().toISOString();

    //Save the quiz score in Realtime Database
    database()
      .ref(`/users/${userId}/quizScores`)
      .push({
        score: finalScore,
        timeAndDate: timestamp
      })
      .then(() => console.log("score saved in database"))
      .catch(err => console.error("Error saving score:", err));
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Quiz Completed!</Text>
        <Image
          source={require('../../assets/images/quizDone.png')}
          style={styles.doneImg}
        />

        <Text style={styles.scoreText}>
          {finalScore}
          <Text style={styles.outOfTxt}> correct answers out of 5</Text>
        </Text>

        <Button
          mode="contained"
          onPress={() =>
            navigation.reset({ index: 0, routes: [{ name: 'BottomTabs' }] })
          }
          style={styles.homeBtn}
          labelStyle={styles.homeBtnTxt}
        >
          Finish
        </Button>
      </View>
    </View>
  );
};

export default ResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  card: {
    backgroundColor: colors.primaryDark,
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    width: '100%',
    elevation: 10
  },

  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.SecondaryDark,
    marginBottom: 20,
    textAlign: 'center',
  },

  scoreText: {
    fontSize: 22,
    color: colors.SecondaryDark,
    marginBottom: 30,
    textAlign: 'center',
  },

  outOfTxt: {
    color: colors.SecondaryLight,
    fontSize: 18,
  },

  homeBtn: {
    backgroundColor: colors.SecondaryDark,
    paddingVertical: 6,
    borderRadius: 8,
    width: '80%',
  },

  homeBtnTxt: {
    fontSize: 18,
    color: colors.white,
  },

  doneImg: {
    width: 150,
    height: 150,
    marginBottom: 20
  }
});
