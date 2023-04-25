import { useState } from 'react'
import { Text, View, TextInput, Button, FlatList, TouchableOpacity, Modal } from 'react-native'
import { styles } from './styles'
import { Input } from './components/'

export default function App () {
  const [text, setText] = useState('')
  const [events, setEvents] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const color = '#35A7FF'

  const onAddEvent = () => {
    if (text.length === 0) return
    setEvents([
      ...events,
      {
        id: Math.random().toString(),
        value: text
      }
    ])
    setText('')
  }

  const onHandlerEvent = (id) => {
    setModalVisible(!modalVisible)
    const selectedEvent = events.find(event => event.id === id)
    setSelectedEvent(selectedEvent)
  }

  const onHandlerCancelModal = () => {
    setModalVisible(!modalVisible)
    setSelectedEvent(null)
  }

  const onHandlerDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id))
    setModalVisible(!modalVisible)
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer} onPress={() => onHandlerEvent(item.id)}>
      <Text style={styles.item}>{item.value}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <Input
        color={color}
        onChangeText={(text) => setText(text)}
        onHandlerButton={onAddEvent}
        placeholder='Enter your event'
        value={text}
      />
      <View style={styles.listContainer}>
        <FlatList
          renderItem={renderItem}
          data={events}
          keyExtractor={(item) => item.id}
          alwaysBounceVertical={false}
        />
      </View>
      <Modal visible={modalVisible} animationType='slide'>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Event Detail</Text>
          <View style={styles.modalDetailContainer}>
            <Text style={styles.modalDetailMessage}>Are you sure to delete this item?</Text>
            <Text style={styles.selectedEvent}>{selectedEvent?.value}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title='Cancel'
              color={color}
              onPress={() => onHandlerCancelModal()}
            />
            <Button
              title='Delete'
              color={color}
              onPress={() => onHandlerDeleteEvent(selectedEvent.id)}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}
