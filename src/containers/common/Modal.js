import { StyleSheet, Text, View, Modal, TouchableOpacity } from 'react-native'
import React, { useState, forwardRef, useImperativeHandle } from 'react'
import Icons from './Icons'
import { screenHeightInPercent } from '../../utils/screenDimensions'

const ModalScreen = forwardRef(({headerTitle, children}, ref) => {
    const [modalVisible, setModalVisible] = useState(false)

    useImperativeHandle(ref, () => ({
      openModel() {
        setModalVisible(!modalVisible)
      },
      modalVisible() {
        setModalVisible(true)
      },
    }))

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
                <Text style={{}}>
                  {headerTitle}
                </Text>
                <TouchableOpacity
                  onPress={() => setModalVisible(false)}
                  style={[
                    styles.iconStyle,
                  ]}
                >
                  <Icons
                    family="Feather"
                    name="x"
                    color='gray'
                    size={25}
                  />
                </TouchableOpacity>
              </View>
            {children}
          </View>
        </View>
      </Modal>
    )
  },
)

export default ModalScreen

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: '#00000080',
    alignItems:'center',
    justifyContent:'center',
    flex: 1
  },
  modalView: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 17,
    backgroundColor: "#fff",
    width: '92%',
    maxHeight: screenHeightInPercent(75),
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  Btn: {
    position: 'absolute',
    bottom: -36,
    alignSelf: 'center',
  },
  iconStyle: {
    // height: 45,
    // width: 45,
    // borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
