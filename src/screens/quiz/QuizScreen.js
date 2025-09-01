import { View, StyleSheet } from 'react-native'
import { colors } from '../../theme/theme';
import TakeQuizCard from '../../components/cards/TakeQuizCard'

const QuizScreen = ({ navigation }) => {
    return (
        <View style={styles.safeContainer}>
            <TakeQuizCard navigation={navigation} />
        </View>
    )
}

export default QuizScreen

const styles = StyleSheet.create({
    safeContainer: {
        backgroundColor: colors.primaryLight,
        flex: 1,
        justifyContent: 'center',
        padding: 16
    }
})