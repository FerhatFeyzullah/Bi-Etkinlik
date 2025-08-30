import { StyleSheet, Text, View, ActivityIndicator, Modal } from 'react-native'
import React from 'react'

const Loading = ({ status }) => {
    return (
        <Modal transparent animationType="fade" visible={status}>
            <View style={styles.backdrop}>
                <ActivityIndicator size={50} color="#228bc9ff" />
            </View>
        </Modal>
    )
}

export default Loading

const styles = StyleSheet.create({
    backdrop: {
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center"
    },
})