import { Text, View } from 'react-native';
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as pallete from "../../../styles/colors";
import styles from './styles';
import Icon from '../../../components/icon';
import Home from '../../../screens/area-logada/home';
import DrawerDashBoardComponent from './componente-drawer-navigation';
import RouterAgenda from './router-agenda';
import RouterVacina from './router-vacina';

const Drawer = createDrawerNavigator();

export default function RouterHomeDrawerNavigation() {
    return (
        <Drawer.Navigator
            initialRouteName='Home'
            drawerContent={(props) => <DrawerDashBoardComponent {...props} />}
            screenOptions={({ route }) => ({
                headerShown: false,
                swipeEnabled: false,
                drawerInactiveTintColor: pallete.COLOR_TEXT_BLACK,
                drawerActiveBackgroundColor: pallete.MENU_SELECIONADO,
                drawerActiveTintColor: pallete.COLOR_TEXT_BLACK,
                drawerInactiveBackgroundColor: pallete.BACKGROUND_CARD_02,           
                drawerLabelStyle: { fontSize: 19 },
                drawerItemStyle: {
                    borderRadius: 12,
                    marginVertical: 5,
                    borderColor: 'transparent',
                  
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
                        case "Perfil Do Pet":
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
            <Drawer.Screen name="Vacinas" component={RouterVacina} />
            <Drawer.Screen name="Agenda" component={RouterAgenda} />
            <Drawer.Screen name="Perfil Do Pet" component={Home} />

        </Drawer.Navigator>
    )
}

