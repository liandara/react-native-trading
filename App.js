import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, TextInput, View, Image } from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';

export default function App() {
  // const apiKey = '5ecd2fad8e814fb2a6c1ef65acb54b37'
  const apiUrl = `http://127.0.0.1:8000/books`
  // const apiUrl = `https://newsapi.org/v2/everything?q=comic&apiKey=${apiKey}`

  const [items, setItems] = React.useState([])
  const[fetchingData, setFetchingDataState] = useState(true);

  const [selectedSavedShares, setselectedSavedShares] = useState("");
  const [sharesName, setSharesName] = useState("");
  const [buyPrice, setBuyPrice] = useState(0);
  const [sharesAmount, setSharesAmount] = useState(0);
  const [sellPrice, setSellPrice] = useState(0);
  const [lossPosibility, setLossPosibility] = useState(0);
  
  // React.useEffect(()=>{
  //   fetch(apiUrl)
  //   .then((response)=> response.json())
  //   .then((data)=>{return data.data})
  //   .then(data=>{
  //     setItems(data)
  //     setFetchingDataState(false)
  //   })
  //   .catch(error=>{console.error(error)})
  // }, [])

  // if(fetchingData){
  //   return <Loading/>
  // }else{
  //   return <TradingPlanScreen/>
  // }
  // return <TradingPlanScreen 
  //   selectedSavedShares={selectedSavedShares} 
  //   onValueChange={(itemValue,itemIndex)=>{setselectedSavedShares(itemValue)}}
  //   onShareInput={(text)=>setSharesName(text)} 
  //   onBuyPriceInput={(text)=>setBuyPrice(+text)} 
  //   onShareAmountInput={(text)=>setSharesAmount(text)}
  //   buyPrice={buyPrice}
  //   sharesAmount={sharesAmount}
  //   />

  return(
    <View style={styles.container}>
      <Image style={styles.logo}
      source={require('./assets/ic_logo.png')}/>
      <SavedPlanView 
        selectedSavedShares={selectedSavedShares}
        onValueChange={(itemValue,itemIndex)=>setselectedSavedShares(itemValue)}/>
      <BuyPlanView 
        onShareInput={(text)=>setselectedSavedShares(text)} 
        onBuyPriceInput={(text)=>setBuyPrice(+text)} 
        onShareAmountInput={(text)=>setSharesAmount(+text)}
        buyPrice={buyPrice}
        sharesAmount={sharesAmount}/>
      <ProfitPlanView
        onSalePriceInput={(text)=>setSellPrice(+text)}
        sellPrice={sellPrice}
        buyPrice={buyPrice}
        sharesAmount={sharesAmount}/>
      <LostPossibilityView
        onLossInput={(text)=>setLossPosibility(+text)}
        lossPosibility={lossPosibility}
        buyPrice={buyPrice}
        sharesAmount={sharesAmount}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal:16,
    paddingVertical:8,
    backgroundColor: '#fff'
  },
  logo:{
    padding:50,
    marginTop:50,
    width: '100%',
    height: '10%',
    resizeMode: 'stretch',
    alignItems: 'center'
  },
  itemContainer:{
    borderWidth:0,
    width:'100%',
    padding:16
  },
  itemImage:{
    padding:8,
    width: 24,
    height: 24,
    resizeMode: 'stretch'
  },
  itemTitle:{
    textAlign:'center',
    marginHorizontal: 8,
    fontSize:16,
    color:'black'
  },
  itemSubtitle:{
    fontSize:12,
    marginTop: 8,
    color:'black'
  },
  itemInputContainer:{
    justifyContent:'center',
    flex:1,
    marginRight:4,
  },
  itemInput: {
    height: 40,
    marginTop: 8,
    borderWidth: 1,
    padding: 10,
  },
});

const SavedPlanView = ({selectedSavedShares, onValueChange})=>{
  return(
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>Select from Saved Plan</Text>
      <Picker
        selectedSavedShares={selectedSavedShares}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => onValueChange(itemValue,itemIndex)}
      >
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
      <Text style={styles.itemTitle}>Or fill your new own</Text>
    </View>
  )
}

const BuyPlanView = ({onShareInput, onBuyPriceInput, onShareAmountInput, buyPrice, sharesAmount})=>{
  return(
    <View style={styles.itemContainer}>
      <View flexDirection='row' alignItems='center'>
        <Image style={styles.itemImage} source={require('./assets/ic_buy.png')}/>
        <Text style={styles.itemTitle}>Buy</Text>
      </View>
      <View flexDirection='row' justifyContent='space-between'>
        <View  style={styles.itemInputContainer}>
          <Text style={styles.itemSubtitle}>Nama Saham</Text>
          <TextInput
            style={styles.itemInput}
            placeholder="tulis disini"
            keyboardType="text"
            onChangeText={(text)=>onShareInput(text)}
        />
        </View>
        <View style={styles.itemInputContainer}>
          <Text style={styles.itemSubtitle}>Beli Di Harga</Text>
          <TextInput
            style={styles.itemInput}
            placeholder="tulis disini"
            keyboardType="numeric"
            onChangeText={(text)=>onBuyPriceInput(text)}
        />
        </View>
        <View style={styles.itemInputContainer}>
          <Text style={styles.itemSubtitle}>Jumlah Lot</Text>
          <TextInput
            style={styles.itemInput}
            placeholder="tulis disini"
            keyboardType="numeric"
            onChangeText={(text)=>onShareAmountInput(text)}
        />
        </View>
      </View>
      <View marginTop={8} flexDirection='row' justifyContent='space-between'>
        <Text>Total Beli</Text>
        <Text> {buyPrice*sharesAmount} </Text>
      </View>
    </View>
  )
}

const ProfitPlanView = ({onSalePriceInput,sellPrice,buyPrice,sharesAmount})=>{
  const profit = ((sellPrice-buyPrice)/buyPrice)*100
  return(
    <View style={styles.itemContainer}>
      <View flexDirection='row' alignItems='center'>
        <Image style={styles.itemImage} source={require('./assets/ic_profit.png')}/>
        <Text style={styles.itemTitle}>Profit</Text>
      </View>
      <View flexDirection='row' justifyContent='space-between'>
        <View style={styles.itemInputContainer}>
          <Text style={styles.itemSubtitle}>Jual di Harga</Text>
          <TextInput
            style={styles.itemInput}
            placeholder="tulis disini"
            keyboardType="numeric"
            onChangeText={(text)=>onSalePriceInput(text)}
        />
        </View>
        <View style={styles.itemInputContainer}>
          <Text style={styles.itemSubtitle}>% Profit</Text>
          <Text style={styles.itemInput}>{profit}</Text>
        </View>
        <View style={styles.itemInputContainer}>
          <Text style={styles.itemSubtitle}>Net Profit</Text>
          <Text style={styles.itemInput}>{buyPrice*profit}</Text>
        </View>
      </View>
      <View marginTop={8} flexDirection='row' justifyContent='space-between'>
        <Text>Total Jual</Text>
        <Text> {sellPrice*sharesAmount} </Text>
      </View>
    </View>
  )
}

const LostPossibilityView = ({onLossInput, lossPosibility, buyPrice, sharesAmount})=>{
  const lossBuyPrice = buyPrice-((buyPrice*lossPosibility)/100)
  return(
    <View style={styles.itemContainer}>
      <View flexDirection='row' alignItems='center'>
        <Image style={styles.itemImage} source={require('./assets/ic_loss.png')}/>
        <Text style={styles.itemTitle}>Loss</Text>
      </View>
      <View flexDirection='row' justifyContent='space-between'>
        <View style={styles.itemInputContainer}>
          <Text style={styles.itemSubtitle}>% Loss (-) </Text>
          <TextInput
            style={styles.itemInput}
            placeholder="tulis disini"
            keyboardType="numeric"
            onChangeText={(text)=>onLossInput(text)}
        />
        </View>
        <View style={styles.itemInputContainer}>
          <Text style={styles.itemSubtitle}>Jual di Harga</Text>
          <Text style={styles.itemInput}>{lossBuyPrice}</Text>
        </View>
        <View style={styles.itemInputContainer}>
          <Text style={styles.itemSubtitle}>Net Loss</Text>
          <Text style={styles.itemInput}>{(buyPrice*sharesAmount)-((buyPrice*lossPosibility)/100)}</Text>
        </View>
      </View>
      <View marginTop={8} flexDirection='row' justifyContent='space-between'>
        <Text>Total Jual</Text>
        <Text> {lossBuyPrice*sharesAmount} </Text>
      </View>
    </View>
  )
}

const Loading = ()=>{
  return(
    <View style={styles.container}>
      <Text>Loading...</Text>
    </View>
  )
}
