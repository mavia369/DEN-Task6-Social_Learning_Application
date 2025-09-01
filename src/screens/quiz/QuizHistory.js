import { View, Text, StyleSheet, FlatList } from 'react-native'
import { colors } from '../../theme/theme'
import { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import Icon from '@react-native-vector-icons/material-design-icons';


const QuizHistory = () => {
  const [scoreHistory, setScoreHistory] = useState([])
  const [highestScore, setHighestScore] = useState(null);
  const [showPageLoader, setShowPageLoader] = useState(true);

  useEffect(() => {
    const user = auth().currentUser;
    const ref = database().ref(`/users/${user.uid}/quizScores`);

    const onValueChange = ref.on('value', snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const scoresArray = Object.keys(data).map(key => ({
          id: key,
          score: data[key].score,
          timeAndDate: data[key].timeAndDate,
        }));

        // Sort by date (oldest to newest)
        scoresArray.sort(
          (a, b) => new Date(a.timeAndDate) - new Date(b.timeAndDate)
        );

        setScoreHistory(scoresArray);

        // Find the highest score
        const maxScoreObj = scoresArray.reduce((max, current) => {
          return current.score > max.score ? current : max;
        }, scoresArray[0]);

        setHighestScore(maxScoreObj);

        setShowPageLoader(false);
      } else {
        setScoreHistory([]);
        setHighestScore(null);
        setShowPageLoader(false);
      }
    });

    return () => ref.off('value', onValueChange);
  }, []);

  if (showPageLoader) {
    return (
      <View style={styles.pageLoaderContainer}>
        <ActivityIndicator size={50} color={colors.SecondaryDark} />
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.safeContainer}>
      <Header title={"Quiz History"} showBackIcon={true} />

      <View style={styles.container}>
        {
          highestScore ?
            (
              <View style={styles.highScoreView}>
                <View style={styles.scoreContainer}>
                  <Text style={styles.highScoreHeading}>
                    High Score: <Text style={styles.highScoreTxt}>{highestScore.score} / 5</Text>
                  </Text>
                </View>
              </View>
            )
            :
            null
        }

        {
          scoreHistory.length > 0 ?
            (
              <View style={styles.scoreListView}>
                <FlatList
                  data={scoreHistory}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item, index }) => (
                    <View style={styles.scoreList}>
                      <Text style={styles.dateTime}>{index + 1}{'  '}
                        <Text style={styles.highScoreValue}>Score: {item.score} / 5</Text>
                      </Text>
                      <Text style={styles.dateTime}>{new Date(item.timeAndDate).toLocaleString([], {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</Text>
                    </View>
                  )}
                />
              </View>
            )
            :
            (
              <View style={styles.emptyContainer}>
                <Icon name="history" size={60} color={colors.gray} />
                <Text style={styles.emptyTitle}>No History</Text>
                <Text style={styles.emptySubtitle}>Take a quiz and track your progress here!</Text>
              </View>
            )
        }

      </View>
    </SafeAreaView>
  )
}

export default QuizHistory

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.SecondaryDark,
  },

  container: {
    flex: 1,
    backgroundColor: colors.primaryLight,
    padding: 10,
    paddingTop: 20
  },

  highScoreView: {
    backgroundColor: colors.primaryLight,
  },

  scoreListView: {
    flex: 1,
    borderRadius: 20,
    marginBottom: 50
  },

  scoreContainer: {
    backgroundColor: colors.SecondaryDark,
    borderRadius: 10,
    alignItems: 'center',
    padding: 16,
  },

  highScoreHeading: {
    fontSize: 24,
    color: colors.white,
    fontWeight: '600',
  },

  highScoreTxt: {
    color: colors.primaryDark
  },

  scoreList: {
    backgroundColor: colors.primaryDark,
    marginVertical: 6,
    marginHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10
  },

  dateTime: {
    fontSize: 16
  },

  highScoreValue: {
    fontWeight: '700',
    fontSize: 18
  },

  pageLoaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.primaryLight
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.gray,
    marginTop: 15,
  },
  emptySubtitle: {
    fontSize: 16,
    color: colors.gray,
    marginTop: 5,
  },
})