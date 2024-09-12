import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PetDto } from "../../model/Dto/pets-dto/pet-dto";


const initialState: PetDto = {
    nome_pet: "",
    raca: '',
    idade: null,
    sexo: "",
    data_pet: "",
    id: null
}

const petSlice = createSlice({
    name: 'pet',
    initialState,
    reducers: {
        acessarPet: (state, action) => {
            state.nome_pet = action.payload.nome_pet;    
            state.raca = action.payload.raca;   
            state.data_pet = action.payload.data_pet;   
            state.idade = action.payload.idade;   
            state.sexo = action.payload.sexo;   
            state.id = action.payload.id;   

            AsyncStorage.setItem('pet', JSON.stringify(action.payload)); // Salva no AsyncStorage
        },
        sairPet: (state) => {
            state = {
                nome_pet: "",
                raca: '',
                idade: null,
                sexo: "",
                data_pet: "",
                id: null
            };

            AsyncStorage.removeItem('pet'); // Remove do AsyncStorage
        },
        restaurarPet: (state, action) => {
            state= action.payload;
        }
    }
});

export const { acessarPet, sairPet, restaurarPet } = petSlice.actions;
export default petSlice.reducer;