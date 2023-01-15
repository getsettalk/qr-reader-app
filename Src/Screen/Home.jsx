import { View, Text, StyleSheet, Modal, TouchableOpacity, Dimensions, StatusBar, Linking, Alert, Pressable } from 'react-native'
import React, { useState, useRef } from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = () => {
    console.log(windowHeight)
    const [qrData, setqrData] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [shouldActivate, setshouldActivate] = useState(true);
    const [isURL, setisURL] = useState(false);
    const [flash, setflash] = useState(false);


    console.log('shouldActivate', shouldActivate)
    function afterRead(e) {
        setshouldActivate(!shouldActivate)
        setqrData(`${e.data}`)
        setisURL(validURL(e.data))
        setModalVisible(true)
        setflash(false)
    }
    // ref
    const first = useRef();

    function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }

    return (
        <View>
            <StatusBar
                animated={true}
                backgroundColor="#61dafb"
                barStyle={'dark-content'}
            />
            <View style={[styles.divTop]}>
                <Text style={{ fontSize: 20, color: '#fff', fontWeight: 600 }}> Scan QR Code</Text>
                <TouchableOpacity style={styles.buttonTouchable} onPress={() => setflash(!flash)} >
                    <Text style={{ fontSize: 20, color: '#000' }}>{flash ? 'OFF' : 'ON'}</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.BoxBorder, { width: windowWidth, height: windowHeight }]}>
                <View style={[styles.DashedBorder]}>
                </View>
            </View>
            <QRCodeScanner
                
                cameraProps={{
                    zoom:0.3
                }}
                reactivate={shouldActivate}
                showMarker={true}
                permissionDialogTitle={'Permission:'}
                permissionDialogMessage={'Allow Camera Permission to Read QR/Bar Code ?'}
                buttonPositive={'Allow'}
                cameraContainerStyle={[styles.cameraBox, { height: windowHeight }]}
                cameraStyle={{ width: '100%', height: windowHeight }}
                onRead={(e) => afterRead(e)}
                flashMode={flash ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                ref={(first)}
            />
            {/* modal  */}
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={[styles.modalText, {
                            fontSize: 20,
                            color: '#03C988',
                            fontWeight: '600',
                            letterSpacing: 0.3,
                            lineHeight: 30,
                            marginBottom: 10,
                            textTransform: 'capitalize'
                        }]}>Scanned Result:</Text>
                        <Text style={{ marginBottom: 10, fontSize: 15, color: '#222222' }}>{qrData}</Text>

                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                    setshouldActivate(true)
                                    first.current.reactivate();
                                }}>
                                <Text style={styles.textStyle}>Scan Again</Text>
                            </Pressable>


                            {isURL ? (<TouchableOpacity
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => Linking.openURL(qrData).catch(err =>
                                    console.error('An error occurred', err),
                                )}
                            >
                                <Text style={styles.textStyle}>Open URL</Text>
                            </TouchableOpacity>) : null}
                        </View>

                        <Text style={{ textAlign: 'center', marginTop: 30, color: '#EAEAEA' }}> Developed : By Scarlet_sujeet</Text>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({

    buttonText: {
        fontSize: 21,
        color: 'rgb(0,122,255)'
    },
    buttonTouchable: {
        padding: 2,
        borderRadius: 3,
        backgroundColor: '#FFC0D3',
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.23,
        shadowRadius: 11.78,
        elevation: 15
    },
    cameraBox: {
        position: 'relative',
        backgroundColor: '#AEFEFF'
    },
    divTop: {
        position: 'absolute',
        top: 3,
        left: 0,
        zIndex: 10000,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 2
    },
    BoxBorder: {
        position: 'absolute',
        top: 0,
        left: 0,

        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
        // borderWidth: 5,
        // borderColor: 'white',

    },
    DashedBorder: {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#8DCBE6',
        width: 250,
        height: 250,
        shadowColor: "#000000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.17,
        shadowRadius: 3.05,
        elevation: 4
    },

    // modal 

    centeredView: {
        marginTop: 2,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 2,
        padding: 5,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        padding: 10,
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
        elevation: 2,
        width: 100
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,

    },
});

export default Home