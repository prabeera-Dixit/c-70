import React from 'react';
import { Text, View ,TouchableOpacity,StyleSheet} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner } from 'expo-barcode-scanner'


export default class TransactionScreen extends React.Component {
  constructor(){
    super();
    this.state ={
      hasCameraPermissions :null,
      scanned :false,
      scannedData : '',
      buttonState :'normal',
      scannedBookId : '',
      scannedStudentId: ''
    }
  }  
  
  getCameraPermissions = async (id) => {
    const {status} = await Permissions.askAsync(Permissions.CAMERA);


    this.setState({
      hasCameraPermissions : status === 'granted',
      buttonState :id,
      scanned:false
    })
  }

  handleBarCodeScanned = async({type,data}) =>{
    const {buttonState} = this.state
    if(buttonState === 'BookId'){
      this.setState ({
        scanned :true,
        scannedBookId:data,
        buttonState:'normal'
      })
 }
   
else if(buttonState === 'StudentId'){
  this.setState ({
    scanned :true,
    scannedStudentId:data,
    buttonState:'normal'
  })
}

  }
  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState ;
    
    if(buttonState !="normal" && hasCameraPermissions){
      return (
        <BarCodeScanner onBarCodeScanned ={scanned ? undefined:this.handleBarCodeScanned} />
      )
    }  
    else if (buttonState === "normal"){
    return (
     //   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      //    <Text>{hasCameraPermissions=== true ? this.state.scannedData:"Request For Camera Permission" }</Text>
     //     <TouchableOpacity 
     //     onPress={this.getCameraPermissions}
    //      style= {styles.scanButton}>
  //          <Text style ={styles.buttonText}> Scan QR Code </Text>
  //        </TouchableOpacity>
  //      </View>

  
<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  <Image source = {require('assets/booklogo.jpg')}
  style = {{width: 200, height: 200}}/>
  <Text style = {{textAlign:"center", fontSize:30}}>Willy</Text>
<View style = {styles.inputView}>

  <TextInput style = {styles.inputBox} 
  placeholder ="BookId"
value = {this.state.scannedBookId}
  >

  </TextInput>
  <TouchableOpacity style = {styles.scanButton} onPress = {()=>{
    this.getCameraPermissions("BookId")
    
  }}> 
  <Text style = {styles.buttonText} > Scan </Text>
  </TouchableOpacity>
</View>
<View style = {styles.inputView}>

  <TextInput style = {styles.inputBox}
   placeholder ="StudentId"
   value = {this.state.scannedStudentId}
   ></TextInput>
  <TouchableOpacity style = {styles.scanButton}onPress = {()=>{
    this.getCameraPermissions("StudentId")
    }}> 
  
  <Text style = {styles.buttonText} > Scan </Text>
  </TouchableOpacity>
</View>
</View>
   );
    }
    }
  }


const styles = StyleSheet.create({

scanButton :{
  backgroundColor :'blue',
  padding:10,
  margin:10
},
buttonText:{
  fontSize :20
},
scanButton:{
  backgroundColor: '#2196F3',
  padding: 10,
  margin: 10
},
buttonText:{
  fontSize: 15,
  textAlign: 'center',
  marginTop: 10
},
inputView:{
  flexDirection: 'row',
  margin: 20
},
inputBox:{
  width: 200,
  height: 40,
  borderWidth: 1.5,
  borderRightWidth: 0,
  fontSize: 20
},
scanButton:{
  backgroundColor: '#66BB6A',
  width: 50,
  borderWidth: 1.5,
  borderLeftWidth: 0
}
})