import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { sendMessage, listenToMessages, getChatId } from '../../utilities/ChatService';
import { SafeAreaView } from 'react-native-safe-area-context';
import MessageBubble from '../../components/cards/MessageBubble'
import { colors } from '../../theme/theme';
import Icon from '@react-native-vector-icons/material-design-icons';
import { useNavigation } from '@react-navigation/native';


const ChatDetail = ({ route }) => {
    const navigation = useNavigation();

    const user = route.params.receiver;
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const flatListRef = useRef(null);

    useEffect(() => {
        // start listening for messages
        const unsubscribe = listenToMessages(user.uid, (msgs) => {
            setMessages(msgs);
        });

        // cleanup listener when leaving
        return () => {
            const currentUser = auth().currentUser;
            if (currentUser) {
                const chatId = currentUser.uid < user.uid
                    ? `${currentUser.uid}_${user.uid}`
                    : `${user.uid}_${currentUser.uid}`;
            }
        };
    }, [user.uid]);

    //To mark "unseen" messages as "seen"
    useEffect(() => {
        const currentUser = auth().currentUser;
        if (!currentUser) return;

        const chatId = getChatId(currentUser.uid, user.uid);
        const messagesRef = database().ref(`/chats/${chatId}/messages`);

        //Mark already existing messages as seen
        messagesRef.once('value', (snapshot) => {
            snapshot.forEach((child) => {
                const msg = child.val();
                if (msg.senderId !== currentUser.uid && msg.seen === false) {
                    messagesRef.child(child.key).update({ seen: true });
                }
            });
        });

        //Listen in real time for new messages
        const onChildAdded = messagesRef.on('child_added', (snapshot) => {
            const msg = snapshot.val();
            if (msg.senderId !== currentUser.uid && msg.seen === false) {
                messagesRef.child(snapshot.key).update({ seen: true });
            }
        });

        //cleanup on unmount
        return () => messagesRef.off('child_added', onChildAdded);
    }, [user.uid]);

    const handleSend = async () => {
        if (text.trim()) {
            await sendMessage(user.uid, text.trim());
            setText('');
        }
    };

    return (
        <SafeAreaView style={styles.safeAreaContainer}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon
                        name='arrow-left'
                        size={28}
                        color={colors.white}
                        style={styles.backIcon}
                        onPress={() => { navigation.goBack() }}
                    />
                    <Image source={require('../../assets/images/user1.png')} style={styles.userImage} />
                    <View>
                        <Text style={styles.headerText}>{user.displayName}</Text>
                        <Text style={styles.headerSubText}>{user.email}</Text>
                    </View>
                </View>

                <View style={styles.messagesContainer}>
                    <FlatList
                        ref={flatListRef}
                        showsVerticalScrollIndicator={false}
                        data={messages}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <MessageBubble item={item} />}
                        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                        onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
                    />

                    <View style={styles.sendMsgContainer}>
                        <TextInput
                            style={styles.msgInput}
                            value={text}
                            onChangeText={setText}
                            placeholder="Type a message"
                            multiline={true}
                        />
                        <TouchableOpacity
                            onPress={handleSend}
                            style={styles.sendImageContainer}
                        >
                            <Image style={styles.sendImage} source={require('../../assets/images/send.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default ChatDetail;

const styles = StyleSheet.create({
    safeAreaContainer: {
        flex: 1,
        backgroundColor: colors.SecondaryDark
    },

    container: {
        flex: 1,
        backgroundColor: colors.primaryLight
    },

    messagesContainer: {
        flex: 1,
        padding: 10
    },

    sendMsgContainer: {
        flexDirection: 'row',
        marginTop: 10
    },

    header: {
        backgroundColor: colors.SecondaryDark,
        height: 80,
        flexDirection: 'row',
        alignItems: 'center'
    },

    headerText: {
        fontSize: 20,
        color: colors.white,
        fontWeight: 'bold'
    },

    userImage: {
        height: '50',
        width: '50',
        marginHorizontal: 14,
        borderWidth: 1.5,
        borderColor: 'white',
        borderRadius: 50
    },

    headerSubText: {
        fontSize: 14,
        color: colors.gray
    },

    msgInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: colors.SecondaryDark,
        borderRadius: 20,
        paddingHorizontal: 14,
        backgroundColor: colors.white
    },

    sendImage: {
        height: '20',
        width: '20',
        marginHorizontal: 14
    },

    sendImageContainer: {
        marginLeft: 5,
        backgroundColor: colors.SecondaryDark,
        borderRadius: 50,
        justifyContent: 'center',
        height: 50,
        alignSelf: 'flex-end'
    },

    backIcon: {
        marginRight: 6,
        marginLeft: 10
    }
})
