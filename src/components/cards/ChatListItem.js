import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import { colors } from '../../theme/theme';

const ChatListItem = ({ item, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.listItem}
            onPress={onPress}
        >
            <Image
                source={require('../../assets/images/user1.png')}
                style={styles.userImage}
            />
            <View style={styles.chatItemContainer}>
                <Text style={styles.nameTxt}>
                    {item.displayName}
                </Text>
                {item.lastMsg ? (
                    <Text style={styles.msgTxt}>
                        {item.lastMsg.text.length > 45
                            ? item.lastMsg.text.substring(0, 40) + '...'
                            : item.lastMsg.text}
                        {'\n'}
                        {new Date(item.lastMsg.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                        })}
                    </Text>
                ) : (
                    <Text>{'\n'}</Text>
                )}
            </View>
            {item.unseenCount > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeTxt}>{item.unseenCount}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

export default ChatListItem;

const styles = StyleSheet.create({
    chatItemContainer: {
        width: '70%',
        height: 70
    },

    msgTxt: {
        fontSize: 14,
        color: colors.SecondaryLight
    },

    nameTxt: {
        fontSize: 16,
        fontWeight: '500',
        color: colors.SecondaryDark
    },

    listItem: {
        paddingLeft: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: colors.SecondaryLight,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 30,
        backgroundColor: colors.primaryDark
    },

    userImage: {
        height: 60,
        width: 60,
        marginRight: 18,
    },

    badge: {
        backgroundColor: colors.danger,
        borderRadius: 50,
        alignSelf: 'center',
        marginLeft: 'auto',
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },

    badgeTxt: {
        color: 'white',
        fontWeight: 'bold',
    },
});
