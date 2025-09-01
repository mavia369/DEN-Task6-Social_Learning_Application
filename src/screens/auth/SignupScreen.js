import { Text, StyleSheet, TouchableOpacity, Alert, StatusBar } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { registerUser } from '../../firebase/Auth'
import { ActivityIndicator, TextInput } from 'react-native-paper'
import { colors } from '../../theme/theme';


const SignupScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setComfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showLoader, setShowLoader] = useState(false);

    const handleSignup = async () => {
        setShowLoader(true);
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            setShowLoader(false);
            return;
        }
        if (name.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0 || confirmPassword.trim().length === 0) {
            Alert.alert('Error', 'Please fill all fields.');
            setShowLoader(false);
            return;
        }

        try {
            await registerUser(email, password, name)
            setShowLoader(false);
        } catch (error) {
            Alert.alert('Error registering user: ', error.message);
            setShowLoader(false);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'dark-content'} />
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
                placeholder='Enter Name'
                value={name}
                onChangeText={setName}
                mode='outlined'
                outlineColor="transparent"
                activeOutlineColor={colors.SecondaryLight}
                style={styles.input}
            />
            <TextInput
                placeholder='Enter Email'
                value={email}
                onChangeText={setEmail}
                mode='outlined'
                outlineColor="transparent"
                activeOutlineColor={colors.SecondaryLight}
                style={styles.input}
            />
            <TextInput
                placeholder='Enter Password'
                value={password}
                onChangeText={setPassword}
                mode='outlined'
                outlineColor="transparent"
                activeOutlineColor={colors.SecondaryLight}
                secureTextEntry={!showPassword}
                style={styles.input}
                right={
                    <TextInput.Icon
                        icon={showPassword ? "eye-off" : "eye"}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <TextInput
                placeholder='Enter Confirm Password'
                value={confirmPassword}
                onChangeText={setComfirmPassword}
                mode='outlined'
                outlineColor="transparent"
                activeOutlineColor={colors.SecondaryLight}
                secureTextEntry={!showConfirmPassword}
                style={styles.input}
                right={
                    <TextInput.Icon
                        icon={showConfirmPassword ? "eye-off" : "eye"}
                        onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                }
            />

            <TouchableOpacity
                style={styles.btn}
                onPress={handleSignup}
            >
                {
                    showLoader ?
                        <ActivityIndicator size={24} color={'white'} />
                        :
                        <Text style={styles.btnText}>Sign Up</Text>
                }
            </TouchableOpacity>

            <Text
                style={styles.orLogin}
                onPress={() => navigation.navigate('Login')}
            >or Login</Text>
        </SafeAreaView>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryLight,
        justifyContent: 'center',
        alignItems: 'center',
    },

    title: {
        fontSize: 30,
        color: colors.SecondaryDark,
        fontWeight: 'bold',
        marginBottom: 50
    },

    input: {
        width: '90%',
        height: 50,
        marginBottom: 20,
        fontSize: 18,
        backgroundColor: colors.white
    },

    btn: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        backgroundColor: colors.SecondaryDark,
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },

    btnText: {
        fontSize: 20,
        color: colors.white,
        fontWeight: 'bold'
    },

    orLogin: {
        textDecorationLine: 'underline',
        fontSize: 20,
        marginTop: 20,
        fontWeight: '600',
        color: colors.SecondaryLight
    }

})