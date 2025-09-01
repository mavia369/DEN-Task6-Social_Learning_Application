import { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../theme/theme';
import auth from "@react-native-firebase/auth";

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            try {
                const unsubscribe = auth().onAuthStateChanged((user) => {
                    navigation.reset({ routes: [{ name: user ? 'BottomTabs' : 'Welcome' }] });
                });
            } catch (error) {
                Alert.alert(
                    "Error", "Failed to check authentication. Please try again.",
                    [{ text: "OK", onPress: () => { navigation.reset({ routes: [{ name: 'Login' }] }) } }]
                );
            }
        }, 2000);
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Social Learning</Text>
            <Text style={styles.subLogo}>App</Text>
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.SecondaryDark,
        justifyContent: 'center',
        alignItems: 'center'
    },

    logo: {
        fontSize: 40,
        color: colors.primaryLight,
        fontWeight: 'bold'
    },

    subLogo: {
        fontSize: 30,
        color: colors.SecondaryLight,
    }
})