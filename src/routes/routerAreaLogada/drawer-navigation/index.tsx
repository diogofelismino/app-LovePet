import { Text, View } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as pallete from "../../../styles/colors";
import styles from './styles';
import Icon from '../../../components/icon';
import Home from '../../../screens/area-logada/home';

const Drawer = createDrawerNavigator();

export default function RouterHomeDrawerNavigation() {
    return (
        <Drawer.Navigator
            initialRouteName='Home'
            //drawerContent={(props) => <DrawerDashBoardExterno {...props} />}
            screenOptions={({ route }) => ({
                headerShown: false,
                swipeEnabled: false,
                drawerInactiveTintColor: pallete.BACKGROUND_CARD_02,
                drawerActiveBackgroundColor: pallete.MENU_SELECIONADO,
                drawerActiveTintColor: pallete.COLOR_TEXT_BLACK,
                drawerInactiveBackgroundColor: pallete.COLOR_TEXT_BLACK,
                drawerLabelStyle: { fontSize: 19 },
                drawerItemStyle: {
                    borderRadius: 20,
                    marginVertical: 0,
                    borderColor: 'transparent'
                },

                drawerIcon: ({ color }) => {
                    let icon = 'Home';
                    switch (route.name) {
                        case 'Home':
                            icon = 'home';
                            break;
                        case 'Vacinas':
                            icon = 'eyedropper';
                            break;
                        case "PerfilPet":
                            icon = 'paw';
                            break
                        case "Agenda":
                            icon = 'calendar-inv'
                            break;
                    }

                    return (
                        <View style={styles.iconTab}>
                            <Icon name={icon} size={28} color={color} />
                        </View>
                    )
                }
            })}
        >
            <Drawer.Screen name='Home' component={Home} />
            {/* <Drawer.Screen name="Vacinas" component={RouterSorteios} />
            <Drawer.Screen name="Vacinas" component={SingIn} />
            <Drawer.Screen name="Agenda" component={RouterCadastro} /> */}

        </Drawer.Navigator>
    )
}

