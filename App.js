import React, {useEffect,useState} from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants'

import {
  AdMobBanner,
} from 'expo-ads-admob';


import logo from './assets/minlogo.png';

import api from './services/api'

export default function App() {

  const [coin,setCoin] = useState(0)
  const [textA,setTextA] = useState('');
  const [textB,setTextB] = useState('');
  const [currentCoin,setCurrentCoin] = useState('USD')

  async function loadCoin(value){

    const res = await api.get(value+'-BRL')

    setCoin(res["data"][value]["bid"])

  }

  useEffect(() => {
    loadCoin('USD');
  }, [

  ])

  function changeCoin(value){
    setCurrentCoin(value);
    loadCoin(value);
    setTextA('');
    setTextB('');
  }

  function changeTextA(value){
    setTextA(value);
    setTextB((value*coin).toFixed(2))

    if(value === ''){
      setTextB('')
    }

  }

  function changeTextB(value){
    setTextB(value)
    setTextA((value/coin).toFixed(2))

    if(value === ''){
      setTextA('')
    }
  }

  
  return (
    <View style={styles.container}>
      <View  style={styles.header} >
        <Image source={logo}></Image>
        <Text style={{fontSize:32,fontWeight:'bold',color:'#E5E5E5'}}>CoinView</Text>
      </View>
      <View style={styles.viewInput}>
        <View>
          <Text style={styles.textTop}>{currentCoin}</Text>
          <TextInput style={styles.textInput} onChangeText={(value) => changeTextA(value)} keyboardType='numeric' placeholder={currentCoin}>{textA}</TextInput>
        </View>
        <View>
          <Text style={styles.textTop}>BRL</Text>
          <TextInput style={styles.textInput} onChangeText={(value) => changeTextB(value)} keyboardType='numeric' placeholder="BRL">{textB}</TextInput>
          <View style={styles.options}>
            <TouchableOpacity onPress={() => changeCoin('EUR')} style={styles.buttonOptions}>
              <Text style={styles.textOptions}>EUR</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeCoin('USD')} style={styles.buttonOptions}>
              <Text style={styles.textOptions}>USD</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => changeCoin('BTC')} style={styles.buttonOptions}>
              <Text style={styles.textOptions}>BTC</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View>
      <AdMobBanner
        bannerSize="fullBanner"
        adUnitID="ca-app-pub-2415885204681618/1270249561"
        servePersonalizedAds
        onDidFailToReceiveAdWithError={(err) => {console.log(err)}} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3D525F',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop:Constants.statusBarHeight
  },
  header:{
    flex:0.8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewInput:{
    flex:1,
    alignItems: "stretch",
    width:"90%"
  },
  textInput:{
    fontSize:42,
    textAlign:'center',
    borderRadius:10,
    color:'#737373',
    backgroundColor:'#E5E5E5'
  },
  textTop:{
    color:"#737373",
    fontWeight:'bold',
    paddingTop:2,
  },
  options:{
    paddingTop:20,
    flexDirection:'row',
    justifyContent:'space-between',
  },
  buttonOptions:{
    backgroundColor:'#FFD537',
    width:'30%',
    alignItems:'center',
    borderRadius:10
  },
  textOptions:{
    fontWeight:'bold',
    fontSize:24,
    color:'white'
  }
});
