import React from "react";
import { useEffect,useState } from "react";
import Styles from './States.module.css'
import axios from 'axios'

export default function States(){
    const[countries, setCountries] = useState([]);
    const[states,setStates] = useState([]);
    const[cities,setCities] = useState([]);
    const[SelectedCountry, setSelectedCountry] = useState('')
    const[SelectedState, setSelectedState] = useState('')
    const[SelectedCity, setSelectedCity] = useState('')


    useEffect(()=>{
        
        async function fetchCountries() {
        try{
                const response = await axios.get('https://crio-location-selector.onrender.com/countries')
                setCountries(response.data);
            }
        catch(e){
            console.log('Error fetching countries:', e);
        }
    }
    fetchCountries();

    },[])

    useEffect(()=>{
        if(SelectedCountry){
        async function fetchStates() {
        try{
                const stateResponse = await axios.get(`https://crio-location-selector.onrender.com/country=${SelectedCountry}/states`)
                setStates(stateResponse.data);
                setSelectedState('');
                setCities([]);
                setSelectedCity('');
            }
        catch(e){
            console.log('Error fetching states:', e);
        }
    }
    fetchStates();
    }

    },[SelectedCountry])

    useEffect(()=>{
        if(SelectedCountry && SelectedState){
        async function fetchCities() {
        try{
                const citiesResponse = await axios.get(`https://crio-location-selector.onrender.com/country=${SelectedCountry}/state=${SelectedState}/cities`)
                setCities(citiesResponse.data);
                setSelectedCity('');
            }
        catch(e){
            console.log('Error fetching cities:', e);
        }
    }
    fetchCities();
    }

    },[SelectedCountry,SelectedState])



    return(
        <div className={Styles.container}>
            <h1>Select Location</h1>

        <div className={Styles.inputContainer}>
                <select 
                    value={SelectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)} 
                    className={Styles.dropdownCountry}
                    >  
                    <option value="" disabled>
                        Select Country
                    </option>
                    {
                    countries.map((country)=>{
                        return(
                        <option value={country} key={country}>
                            {country}
                        </option>
                        );
                    })}
                </select>
                <select 
                    value={SelectedState}
                    onChange={(e) => setSelectedState(e.target.value)} 
                    className={Styles.dropdownState}
                    >  
                    <option value="" disabled>
                        Select State
                    </option>
                    {
                    states.map((state)=>{
                        return(
                        <option value={state} key={state}>
                            {state}
                        </option>
                        );
                    })}
                </select>
                <select 
                    value={SelectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)} 
                    className={Styles.dropdownCity}
                    >  
                    <option value="" disabled>
                        Select City
                    </option>
                    {
                    cities.map((city)=>{
                        return(
                        <option value={city} key={city}>
                            {city}
                        </option>
                        );
                    })}
                </select>
        </div>
        {SelectedCity && (
            <h2 className={Styles.result}>
                You selected <span className={Styles.highlight}>{SelectedCity},</span>
                <span className={Styles.fade}>
                    {" "}
                    {SelectedState}, {SelectedCountry}
                </span>
            </h2>
        )}
     
        </div>
    );
}