import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../theme/theme';
//Screens
import QuizScreen from '../screens/quiz/QuizScreen'
import ProfileScreen from '../screens/profile/ProfileScreen'
import TaskScreen from '../screens/task/TaskScreen'
import ChatListScreen from '../screens/chat/ChatListScreen'
// Config
import { tabScreenOptions } from '../config/bottomTabConfig';

const Tab = createBottomTabNavigator();

const headerStyle = {
    headerTitleStyle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.white
    },
    headerStyle: {
        backgroundColor: colors.SecondaryDark
    },
    headerTitleAlign: 'center',
}

const BottomTabs = () => {
    return (
        <Tab.Navigator screenOptions={tabScreenOptions}>
            <Tab.Screen name="Quiz" component={QuizScreen} options={headerStyle} />
            <Tab.Screen name="Tasks" component={TaskScreen} options={headerStyle} />
            <Tab.Screen name="Chats" component={ChatListScreen} options={headerStyle} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={headerStyle} />
        </Tab.Navigator>
    );
}

export default BottomTabs;