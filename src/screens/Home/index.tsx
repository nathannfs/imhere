import { Alert, FlatList, Pressable, Text, TextInput, View } from 'react-native'

import React, { useState } from 'react'
import { Participant } from '../../components/Participant'
import { styles } from './styles'

export function Home() {
  const [participants, setParticipants] = useState<string[]>([])
  const [participantName, setParticipantName] = useState<string>('')

  function handleParticipantAdd() {
    if (participants.includes(participantName)) {
      return Alert.alert(
        'Participante Existente',
        'Este participante ja existe na lista!'
      )
    }

    setParticipants(prevState => [...prevState, participantName])
    setParticipantName('')
  }

  function handleParticipantRemove(name: string) {
    return Alert.alert('Remover', `Deseja remover o participante ${name}?`, [
      {
        text: 'Sim',
        onPress: () =>
          setParticipants(prevState => prevState.filter(item => item !== name)),
      },
      {
        text: 'Não',
        style: 'cancel',
      },
    ])
    // setParticipants(prevState => prevState.filter(item => item !== name))
  }

  return (
    <View style={styles.container}>
      <Text style={styles.eventName}>Evento: Rock in Rio</Text>
      <Text style={styles.eventDate}>Sexta, 12 de Outubro de 2024.</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Nome participante"
          placeholderTextColor="#6b6b6b"
          value={participantName}
          onChangeText={setParticipantName}
          onKeyPress={e => {
            if (e.nativeEvent.key === 'Enter') {
              handleParticipantAdd()
            }
          }}
        />

        <Pressable style={styles.button} onPress={handleParticipantAdd}>
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>

      <FlatList
        data={participants}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Participant
            key={item}
            name={item}
            onRemove={() => handleParticipantRemove(item)}
          />
        )}
        showsVerticalScrollIndicator={true}
        ListEmptyComponent={() => (
          <Text style={styles.listEmptyText}>
            Ninguém chegou no evento ainda? Adicione participantes à sua lista.
          </Text>
        )}
      />
    </View>
  )
}
