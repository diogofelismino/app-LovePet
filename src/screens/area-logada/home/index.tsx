import { FlatList, Image, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { usePet } from '../../../hooks/usePet'
import ContainerAreaLogada from '../../../components/container-area-logada';
import { Avatar, Card, Divider } from 'react-native-paper';
import styles from './style';
import logoImg from '../../../assets/img/Logo.png';
import CardImgTitulo from '../../../components/cards/card-img-titulo';
import { CompromissoDto } from '../../../model/Dto/compromisso-dto/compromisso-dto';
import { useLoading } from '../../../hooks/useLoading';
import { pegarCompromissos } from '../../../service/agenda/agenda';
import { useUsuario } from '../../../hooks/useUsuario';

export default function Home() {

  const { usuario }  = useUsuario();
  const { pet } = usePet();
  const { setLoading } = useLoading();

  const [compromisso, setCompromisso] = useState<CompromissoDto[]>([]);


  useEffect(() => {
    buscarCompromisso();
  }, []);

  async function buscarCompromisso() {
    setLoading(true);

    var dadosCompromisso = await pegarCompromissos(usuario.usuario.id, pet.id, 'data_hora', new Date().toISOString(), "<=");

    if (dadosCompromisso && Array.isArray(dadosCompromisso)) {
        setCompromisso(dadosCompromisso as CompromissoDto[]);
    } else {
        setCompromisso([]);
   }

    setLoading(false);
}

  return (
    <ContainerAreaLogada nomeTela='LovePet' home>
      <View style={{ flex: 1, }}>
        {compromisso.length == 0 ?
          <>
            <CardImgTitulo titulo='Carteira de Vacinação' flex ehVacina agedarRegistrar nomeTelaNavegacao='Vacina' />
            <CardImgTitulo titulo='Agendar Compromisso' flex agedarRegistrar nomeTelaNavegacao='Agenda' />
          </>
          :
         
            <FlatList
              data={compromisso}
              renderItem={({ item }) => (
                <CardImgTitulo titulo={item.titulo} subTitulo={item.data_hora.toString().split(" ")[0]} nomeTelaNavegacao='Cadastrar Compromisso' paramNavigate={item.id} />
              )}
              keyExtractor={item => item.id}
            />
        }
      </View>

      <View style={styles.viewRodaPe}>
        <Divider style={styles.linha} />
        <Image source={logoImg} resizeMode='contain' style={styles.img} />
      </View>
    </ContainerAreaLogada>
  )
}

