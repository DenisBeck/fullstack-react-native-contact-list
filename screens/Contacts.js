import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Linking,
    ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import colors from '../utils/colors';
import ContactListItem from '../components/ContactListItem';
import { fetchContacts } from '../utils/api';
import getURLParams from '../utils/getURLParams';

import store from '../store';

const keyExtractor = ({ phone }) => phone;

export default class Contacts extends React.Component {
    static navigationOptions = ({ navigation: { navigate } }) => ({
        title: 'Contacts',
        headerLeft: (
            <MaterialIcons
                name="menu"
                size={24}
                style={{ color: colors.black, marginLeft: 10 }}
                onPress={() => navigate('DrawerToggle')}
            />
        )  
    });

    state = {
        contacts: store.getState().contacts,
        loading: store.getState().isFetchingContacts,
        error: store.getState().error
    };

    async componentDidMount() {
        this.unsubscribe = store.onChange(() =>
            this.setState({
                contacts: store.getState().contacts,
                loading: store.getState().isFetchingContacts,
                error: store.getState().error,
            }),
        );

        const contacts = await fetchContacts();

        store.setState({ contacts, isFetchingContacts: false });
        // try {
        //     const contacts = await fetchContacts();
        //     this.setState({
        //         contacts,
        //         loading: false,
        //         error: false,
        //     });
        // } catch (e) {
        //     this.setState({
        //         loading: false,
        //         error: true,
        //     });
        // }
        Linking.addEventListener('url', this.handleOpenUrl);

        const url = await Linking.getInitialURL();
        this.handleOpenUrl({ url });

    }

    componentWillUnmount() {
        Linking.removeEventListener('url', this.handleOpenUrl);
        this.unsubscribe();
    }
        
    handleOpenUrl(event) {
        const { navigation: { navigate } } = this.props;
        const { url } = event;
        const params = getURLParams(url);

        if (params.name) {
            const queriedContact = store
                .getState()
                .contacts.find(
                    contact =>
                        contact.name.split(' ')[0].toLowerCase() ===
                    params.name.toLowerCase(),
                );
            if (queriedContact) {
                navigate('Profile', { id: queriedContact.id });
            }
        }
    }

    renderContact = ({ item }) => {
        const { navigation: { navigate } } = this.props;
        const { id, name, avatar, phone } = item;

        return (
            <ContactListItem 
                name={name} 
                avatar={avatar} 
                phone={phone} 
                onPress={() => navigate('Favorites', { contact: item })}
            />
        );
    };
        
    render() {
        const { loading, contacts, error } = this.state;
        const contactsSorted = contacts.sort((a, b) =>
            a.name.localeCompare(b.name),
        );

        return (
            <View style={styles.container}>
                {loading && <ActivityIndicator size="large" />}
                {error && <Text>Error...</Text>}
                {!loading && !error && (
                    <FlatList
                        data={contactsSorted}
                        keyExtractor={keyExtractor}
                        renderItem={this.renderContact}
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        justifyContent: 'center',
        flex: 1,
    },
});