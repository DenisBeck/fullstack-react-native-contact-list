import { StackNavigator, DrawerNavigator } from 'react-navigation';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import Contacts from './screens/Contacts';
import Profile from './screens/Profile';
import Favorites from './screens/Favorites';
import User from './screens/User';
import Options from './screens/Options';


import colors from './utils/colors';

const getDrawerItemIcon = icon => ({ tintColor }) => (
    <MaterialIcons name={icon} size={22} style={{ color: tintColor }} />
);

// const getTabBarIcon = icon => ({ tintColor }) => (
//     <MaterialIcons name={icon} size={26} style={{ color: tintColor }} />
// );

const ContactsScreens = StackNavigator(
    {
        Contacts: {
            screen: Contacts,
        },
        Profile: {
            screen: Profile,
        },
    },
    {
        initialRouteName: 'Contacts',
        navigationOptions: {
            // tabBarIcon: getTabBarIcon('list'),
            drawerIcon: getDrawerItemIcon('list')
        },
    },
);

const FavoritesScreens = StackNavigator(
    {
        Favorites: {
            screen: Favorites,
        },
        Profile: {
            screen: Profile,
        },
    },
    {
        initialRouteName: 'Favorites',
        navigationOptions: {
            // tabBarIcon: getTabBarIcon('star'),
            drawerIcon: getDrawerItemIcon('star')
        },
    },
);

const UserScreens = StackNavigator(
    {
        User: {
            screen: User,
        },
        Options: {
            screen: Options
        }
    },
    {
        mode: 'modal',
        initialRouteName: 'User',
        navigationOptions: {
            // tabBarIcon: getTabBarIcon('person'),
            drawerIcon: getDrawerItemIcon('person')
        },
    },
);

export default DrawerNavigator({
    Contacts: {
        screen: ContactsScreens
    },
    Favorites: {
        screen: FavoritesScreens
    },
    User: {
        screen: UserScreens
    }
}, {
    initialRouteName: 'Contacts',
    tabBarPosition: 'bottom',
    tabBarOptions: {
        style: {
            backgroundColor: colors.greyLight,
        },
        showLabel: false,
        showIcon: true,
        activeTintColor: colors.blue,
        inactiveTintColor: colors.greyDark,
        renderIndicator: () => null,
    }
})