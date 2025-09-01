import { FlatList, StyleSheet, View } from 'react-native'
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { colors } from '../../theme/theme';
import ChatListItem from '../../components/cards/ChatListItem';

const ChatListScreen = ({ navigation }) => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const currentUser = auth().currentUser;

    // Listen to changes in /users and /chats
    const usersRef = database().ref('/users');
    const chatsRef = database().ref('/chats');

    const handleUpdate = async () => {
      // Get all users
      const snapshot = await usersRef.once('value');
      const usersData = snapshot.val() || {};
      const allUsers = Object.values(usersData).filter(
        (u) => u.uid !== currentUser.uid
      );

      // For each user, get last message + unseen count
      const usersWithLastMsg = await Promise.all(
        allUsers.map(async (u) => {
          const chatId =
            currentUser.uid < u.uid
              ? `${currentUser.uid}_${u.uid}`
              : `${u.uid}_${currentUser.uid}`;

          const lastMsgSnap = await database()
            .ref(`/chats/${chatId}/messages`)
            .orderByChild('timestamp')
            .limitToLast(1)
            .once('value');

          let lastMsg = null;
          lastMsgSnap.forEach((msg) => {
            lastMsg = msg.val();
          });

          // unseen count
          const unseenSnap = await database()
            .ref(`/chats/${chatId}/messages`)
            .orderByChild('seen')
            .equalTo(false)
            .once('value');

          let unseenCount = 0;
          unseenSnap.forEach((msg) => {
            if (msg.val().senderId !== currentUser.uid) {
              unseenCount++;
            }
          });

          return { ...u, lastMsg, unseenCount };
        })
      );

      // Sort by latest message timestamp
      const sorted = usersWithLastMsg.sort((a, b) => {
        const t1 = a.lastMsg?.timestamp || 0;
        const t2 = b.lastMsg?.timestamp || 0;
        return t2 - t1;
      });

      setUsers(sorted);
    };

    handleUpdate();

    // Realtime updates
    usersRef.on('value', handleUpdate);
    chatsRef.on('value', handleUpdate);

    return () => {
      usersRef.off('value', handleUpdate);
      chatsRef.off('value', handleUpdate);
    };
  }, []);

  if (!users) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size={'large'} color={'black'} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={users}
        keyExtractor={(item) => item.uid}
        renderItem={({ item }) =>
          <ChatListItem
            item={item}
            onPress={() => navigation.navigate('Chat Details', { receiver: item })}
          />
        }
      />
    </View>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  container: {
    flex: 1,
    backgroundColor: colors.primaryLight
  },

});
