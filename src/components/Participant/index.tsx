import { Pressable, Text, View } from 'react-native'

import { styles } from './styles'

type ParticipantProps = {
  name: string
  onRemove: () => void
}

export function Participant({ name, onRemove }: ParticipantProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>

      <Pressable style={styles.button} onPress={onRemove}>
        <Text style={styles.buttonText}>-</Text>
      </Pressable>
    </View>
  )
}
