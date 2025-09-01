import { View, Text, StyleSheet } from 'react-native'
import Icon from '@react-native-vector-icons/material-design-icons';
import { colors } from '../theme/theme';
import { useNavigation } from '@react-navigation/native';

const Header = ({ title, showBackIcon }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            {
                showBackIcon ?
                    <Icon
                        name='arrow-left'
                        size={28}
                        color={colors.white}
                        style={styles.backIcon}
                        onPress={() => { navigation.goBack() }}
                    />
                    :
                    null
            }
            <Text style={styles.headerTxt}>{title}</Text>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderColor: colors.SecondaryDark,
        paddingHorizontal: 20,
        backgroundColor: colors.SecondaryDark
    },

    headerTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.white
    },

    backIcon: {
        marginRight: 20
    }

})