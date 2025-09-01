import { View, Text, StyleSheet, Image } from 'react-native'
import { colors } from '../../theme/theme';
import { Button } from 'react-native-paper';

const TakeQuizCard = ({ navigation }) => {
    return (
        <View style={styles.quizCard}>
            <Text style={styles.quizCardHeading}>Test Your Knowledge!</Text>
            <Text style={styles.quizCardTxt}>
                Take this short quiz and see how much you know.
            </Text>
            <Image
                source={require('../../assets/images/takeQuiz.png')}
                style={styles.quizCardImg}
            />

            <Button
                style={styles.quizCardBtn}
                labelStyle={styles.quizCardBtnTxt}
                onPress={() => { navigation.navigate('Quiz Start') }}
            >
                Start Quiz
            </Button>
        </View>
    )
}

export default TakeQuizCard

const styles = StyleSheet.create({
    quizCard: {
        backgroundColor: colors.primaryDark,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 30,
        elevation: 8,
        padding: 20
    },

    quizCardHeading: {
        fontSize: 30,
        color: colors.SecondaryDark,
        fontWeight: 'bold'
    },

    quizCardTxt: {
        fontSize: 20,
        color: colors.SecondaryLight,
        textAlign: 'center'
    },

    quizCardBtn: {
        backgroundColor: colors.SecondaryDark,
        width: '100%',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center'
    },

    quizCardBtnTxt: {
        color: colors.white,
        fontSize: 22
    },

    quizCardImg: {
        height: 220,
        width: 220,
        marginVertical: 40
    },
})