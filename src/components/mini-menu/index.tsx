import { Text, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Divider, Menu, PaperProvider } from 'react-native-paper';
import Icon from '../icon';
import { useLoading } from '../../hooks/useLoading';
import { useUsuario } from '../../hooks/useUsuario';
import { usePet } from '../../hooks/usePet';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';

export default function MiniMenu() {

    const { setLoading } = useLoading();
    const { signOut } = useUsuario();
    const { deselecionarPet } = usePet();
    const navigation = useNavigation<any>();

    const [visible, setVisible] = useState(false);

    const openMenu = () => {
        setVisible(true);
    }

    const closeMenu = () => setVisible(false);

    function sair() {
        setLoading(true);
        deselecionarPet();
        signOut();
        navigation.navigate("Login");
        closeMenu()

        setLoading(false);
    }

    return (

        <View
            style={{
                justifyContent: 'center', // Alinha ao centro, ajuste conforme necessário
                alignItems: 'center',
            }}>
            <Menu
                visible={visible}
                onDismiss={closeMenu}
                anchor={<Icon name='user-outline' size={20} color={"#000"} onPress={openMenu} />}
                style={styles.viewStyle}
                contentStyle={styles.viewContent}
                >
            
                <Menu.Item onPress={() => navigation.navigate("EditarUsuario")} title="Atualizar meus dados"  style={{ borderRadius:20}}/>
                <Menu.Item onPress={sair} title="Sair" style={{ borderRadius:20}}/>
          
            </Menu>
        </View>

    )
}

