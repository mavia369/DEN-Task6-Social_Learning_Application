import MDIcon from '@react-native-vector-icons/material-design-icons';
import { colors } from '../theme/theme';

export const getTabBarIcon = (routeName, focused, color, size) => {
  let iconName;

  switch (routeName) {
    case 'Quiz':
      iconName = focused ? 'clipboard-text' : 'clipboard-text-outline';
      break;
    case 'Tasks':
      iconName = focused ? 'check-circle' : 'check-circle-outline';
      break;
    case 'Chats':
      iconName = focused ? 'chat' : 'chat-outline';
      break;
    case 'Profile':
      iconName = focused ? 'account' : 'account-outline';
      break;
    default:
      iconName = 'help-circle-outline';
  }

  return <MDIcon name={iconName} size={size} color={color} />;
};

export const tabScreenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) =>
    getTabBarIcon(route.name, focused, color, size),
  tabBarActiveTintColor: colors.SecondaryDark,
  tabBarInactiveTintColor: colors.gray,
  tabBarStyle: {
    paddingBottom: 5,
    height: 120,
  },
});
