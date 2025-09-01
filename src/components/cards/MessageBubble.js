import { View, Text, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from '@react-native-vector-icons/material-design-icons';
import { colors } from '../../theme/theme';

const MessageBubble = ({ item }) => {
    const isMe = item.senderId === auth().currentUser.uid;

    const formatTime = (ts) => {
        if (!ts) return '';
        const date = new Date(ts);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: isMe ? colors.primaryDark : colors.silver,
                    alignSelf: isMe ? 'flex-end' : 'flex-start',
                }
            ]}
        >
            <Text style={styles.msgTxt}>{item.text}</Text>
            <View style={styles.timeTickContainer}>
                <Text style={styles.timeTxt}>
                    {formatTime(item.timestamp)}
                </Text>
                <Icon
                    name='check-bold'
                    size={18}
                    color={item.seen && isMe ? colors.seenBlue : colors.darkGray}
                />
            </View>
        </View>
    );
};

export default MessageBubble;

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        maxWidth: '70%'
    },

    msgTxt: {
        fontSize: 16
    },

    timeTxt: {
        fontSize: 12,
        color: colors.darkGray,
        marginTop: 3,
        textAlign: 'right',
        marginRight: 10
    },

    timeTickContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
})