/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    PanResponder,
    Animated,
    View
} from 'react-native';

const boxes = [
    'red',
    'blue',
    'yellow',
    'red',
    'blue',
    'yellow',
    'red',
    'blue',
    'yellow'
];

export default class dragdrop3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pan: new Animated.ValueXY(),
            box: boxes[0],
            boxCount: 0,
            droppedElem1 : [],
            droppedElem2 : [],
            droppedElem3 : [],
            dropZone1: null,
            dropZone2: null,
            dropZone3: null,
            color1: null,
            color2: null,
            color3: null,
        };
    }
    componentWillMount(){
        this._panResponder = PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null,{
                dx : this.state.pan.x,
                dy : this.state.pan.y
            }]),
            onPanResponderRelease :(e,gesture) => {
                let dropp = null;
                if(this.isDropZone1(gesture)){
                    if(this.state.color1 == this.state.box || this.state.color1 == null){
                        dropp = this.state.droppedElem1;
                        let element = (
                            <Animated.View
                                style={[{backgroundColor:this.state.box,width:50,height:50,borderWidth:1,borderColor:'#fff'}]}>
                            </Animated.View>
                        );
                        dropp.push(element);
                        let col = this.state.box;
                        this.setState({
                            droppedElem1:dropp,
                            color1 : col
                        });
                        this.resetBox();
                    }else{
                        alert("You lost");
                        this.resetScene();
                    }

                }else if(this.isDropZone2(gesture)){
                    if(this.state.color2 == this.state.box || this.state.color2 == null) {
                        dropp = this.state.droppedElem2;
                        let element = (
                            <Animated.View
                                style={[{
                                    backgroundColor: this.state.box,
                                    width: 50,
                                    height: 50,
                                    borderWidth: 1,
                                    borderColor: '#fff'
                                }]}>
                            </Animated.View>
                        );
                        dropp.push(element);
                        let col = this.state.box;
                        this.setState({
                            droppedElem2: dropp,
                            color2: col
                        });
                        this.resetBox();
                    }else{
                        alert("You lost");
                        this.resetScene();
                    }
                }else if(this.isDropZone3(gesture)){
                    if(this.state.color3 == this.state.box || this.state.color3 == null) {
                        dropp = this.state.droppedElem3;
                        let element = (
                            <Animated.View
                                style={[{
                                    backgroundColor: this.state.box,
                                    width: 50,
                                    height: 50,
                                    borderWidth: 1,
                                    borderColor: '#fff'
                                }]}>
                            </Animated.View>
                        );
                        dropp.push(element);
                        let col = this.state.box;
                        this.setState({
                            droppedElem3: dropp,
                            color3: col
                        });
                        this.resetBox();
                    }else{
                        alert("You lost");
                        this.resetScene();
                    }
                }else{
                    this.state.pan.setValue({x: 0, y: 0});
                }

            }
        });
    }
    setDropZone1(event){
        this.setState({
            dropZone1: event.nativeEvent.layout
        });
    }
    setDropZone2(event){
        this.setState({
            dropZone2: event.nativeEvent.layout
        });
    }
    setDropZone3(event){
        this.setState({
            dropZone3: event.nativeEvent.layout
        });
    }
    isDropZone1(gesture){
        let dropz = this.state.dropZone1;
        return gesture.moveY > dropz.y && gesture.moveY < dropz.y + dropz.height;
    }
    isDropZone2(gesture){
        let dropz = this.state.dropZone2;
        return gesture.moveY > dropz.y && gesture.moveY < dropz.y + dropz.height;
    }
    isDropZone3(gesture){
        let dropz = this.state.dropZone3;
        return gesture.moveY > dropz.y && gesture.moveY < dropz.y + dropz.height;
    }
    _goToNextBox() {
        let currentBoxIndex = this.state.boxCount;
        let newIndex = currentBoxIndex + 1;
        if(newIndex < boxes.length){
            this.setState({
                box: boxes[newIndex],
                boxCount: newIndex
            });
        }else{
           this.winner();
        }

    }
    winner(){
        alert("You WON");
        this.resetScene();
    }
    resetBox(){
        this.state.pan.setValue({x: 0, y: 0});
        this._goToNextBox();
    }
    resetScene(){
        this.state.pan.setValue({x: 0, y: 0});
        this.setState({
            box: boxes[0],
            boxCount: 0,
            droppedElem1 : [],
            droppedElem2 : [],
            droppedElem3 : [],
            color1: null,
            color2: null,
            color3: null
        });

    }
    render() {
        let [translateX, translateY] = [this.state.pan.x, this.state.pan.y];
        let card = {transform: [{translateX}, {translateY}]};
        return (

            <View style={styles.container}>
                <View style={{backgroundColor:'#efefef',flex:1}}>
                    <View style={{borderWidth:1,borderColor:this.state.color1,backgroundColor:'#efefef',flex:0.1,flexDirection:'row',flexWrap:'wrap',marginTop:10}} onLayout = {this.setDropZone1.bind(this)}>
                        {this.state.droppedElem1}
                    </View>
                    <View style={{borderWidth:1,borderColor:this.state.color2,backgroundColor:'#efefef',flex:0.1,flexDirection:'row',flexWrap:'wrap',marginTop:10}} onLayout = {this.setDropZone2.bind(this)}>
                        {this.state.droppedElem2}
                    </View>
                    <View style={{borderWidth:1,borderColor:this.state.color3,backgroundColor:'#efefef',flex:0.1,flexDirection:'row',flexWrap:'wrap',marginTop:10}} onLayout = {this.setDropZone3.bind(this)}>
                        {this.state.droppedElem3}
                    </View>

                    <View style={{flex:0.5,alignItems:'center',justifyContent:'flex-end'}}>
                    <Animated.View
                        style={[card,{backgroundColor:this.state.box,width:50,height:50,borderWidth:1,borderColor:'#fff'}]}
                        {...this._panResponder.panHandlers}>

                    </Animated.View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }
});

AppRegistry.registerComponent('dragdrop3', () => dragdrop3);
