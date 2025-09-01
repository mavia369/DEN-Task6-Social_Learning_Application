import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { Button, RadioButton } from 'react-native-paper';
import { useEffect } from 'react';
import { MCQs } from '../../utilities/dummyData'
import { colors } from '../../theme/theme'

const QuizStart = ({ navigation }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentQuestion = MCQs[currentIndex];
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(10);

    useEffect(() => {
        if (timer === 0) {
            handleNext(true);
            return;
        }

        const countdown = setTimeout(() => {
            setTimer(timer - 1);
        }, 1000);

        return () => clearTimeout(countdown);
    }, [timer]);

    useEffect(() => {
        setTimer(10);
    }, [currentIndex]);

    const handleNext = (autoSkip = false) => {
        if (!autoSkip && selectedOption === currentQuestion.correctOption) {
            setScore(score + 1);
        }

        if (currentIndex < MCQs.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setSelectedOption(null);
        } else {
            const finalScore = score + (!autoSkip && selectedOption === currentQuestion.correctOption ? 1 : 0);
            navigation.replace('ResultScreen', { finalScore });
        }
    };

    return (
        <View style={styles.container}>
            <Text style={[
                styles.timeText,
                {
                    backgroundColor: timer <= 3 ?
                        colors.danger : colors.SecondaryLight
                }
            ]}>⏱ Time left: {timer}s</Text>

            <View style={styles.questionContainer}>
                <Text style={styles.questionHeading}>Question {currentQuestion.id}</Text>
                <Text style={styles.questionText}>{currentQuestion.question}</Text>

                <RadioButton.Group
                    onValueChange={(newValue) => setSelectedOption(newValue)}
                    value={selectedOption}
                >
                    {currentQuestion.options.map((option, index) => (
                        <Pressable
                            key={index}
                            style={styles.optionsContainer}
                            onPress={() => { setSelectedOption(option) }}
                        >
                            <RadioButton
                                value={option}
                                color={colors.SecondaryDark}
                                uncheckedColor={colors.gray}
                            />
                            <Text style={styles.optionTxt}>  {option}</Text>
                        </Pressable>
                    ))}
                </RadioButton.Group>
            </View>

            <Button
                onPress={() => handleNext()}
                disabled={!selectedOption}
                labelStyle={styles.nextBtnTxt}
                style={[styles.nextBtn, {
                    backgroundColor: selectedOption ?
                        colors.SecondaryDark : colors.silver
                }
                ]}
            >Next</Button>
        </View>
    );
};

export default QuizStart;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.primaryLight,
        justifyContent: 'center',
    },

    questionHeading: {
        fontSize: 24,
        marginBottom: 10,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: colors.SecondaryDark
    },

    questionText: {
        fontSize: 20,
        marginBottom: 10,
        marginTop: 20,
        color: colors.SecondaryLight
    },

    timeText: {
        fontSize: 20,
        alignSelf: 'flex-start',
        marginBottom: 10,
        borderRadius: 10,
        color: colors.white,
        padding: 10,
        width: 170
    },

    optionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: colors.primaryLight,
        borderRadius: 10,
        padding: 6
    },

    questionContainer: {
        backgroundColor: colors.primaryDark,
        borderRadius: 10, padding: 20
    },

    optionTxt: {
        fontSize: 18,
        color: colors.SecondaryLight
    },

    nextBtn: {
        marginTop: 10,
        padding: 10,
    },

    nextBtnTxt: {
        color: colors.white,
        fontSize: 20
    }
})