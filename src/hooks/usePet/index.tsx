import { useDispatch, useSelector } from "react-redux";
import { PetDto } from "../../model/Dto/pets-dto/pet-dto";
import { acessarPet, restaurarPet, sairPet } from "../../store/pet/pet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";



export const usePet = () => {
    const dispatch = useDispatch();
    const pet: PetDto = useSelector((state:any) => state.pet);
  
    // Função para selecionar um pet
    const selecionarPet = (novoPet:any) => {
        dispatch(acessarPet(novoPet));
    };
  
    // Função para realizar o logout
    const deselecionarPet = () => {
        dispatch((sairPet()));
    };
  
    const recuperarPet = async () => {
      const petSalvo = await AsyncStorage.getItem('pet');
      if (petSalvo ) {
        dispatch(restaurarPet(JSON.parse(petSalvo)));
      }
    }; 

    useEffect(() => {
        recuperarPet();
    }, []);
  
    return { pet, selecionarPet, deselecionarPet };
  };