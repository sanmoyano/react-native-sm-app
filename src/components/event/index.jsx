import React from 'react'
import EventItem from './item'
import { FlatList } from 'react-native'

const Events = ({ events, onSelectItem }) => {
  const renderItem = ({ item }) => (
    <EventItem item={item} onSelectItem={onSelectItem} />
  )
  const keyExtractor = (item) => item.id
  return (
    <FlatList
      renderItem={renderItem}
      data={events}
      keyExtractor={keyExtractor}
      alwaysBounceVertical={false}
    />
  )
}

export default Events
