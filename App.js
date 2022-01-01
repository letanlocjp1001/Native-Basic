import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ScrollView,
  FlatList,
} from 'react-native'
import GoalItem from './components/GoalItem'
import GoalInput from './components/GoalInput'

export default function App() {
  const [courseGoals, setCourseGoals] = useState([])
  const [isAddModal, setIsAddModal] = useState(false)

  const addGoadHandler = (goalTitle) => {
    setCourseGoals((currentGoals) => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle },
    ])
    setIsAddModal(false)
  }

  const removeGoalHandler = (goadId) => {
    setCourseGoals((currentGoals) => {
      return currentGoals.filter((goal) => {
        return goal.id !== goadId
      })
    })
  }

  const cancelGoalAdditionHandler = () => {
    setIsAddModal(false)
  }
  return (
    <View style={styles.screen}>
      <Button title='Add New Goal' onPress={() => setIsAddModal(true)} />

      <GoalInput
        onAddGoal={addGoadHandler}
        visible={isAddModal}
        onCancel={cancelGoalAdditionHandler}
      />

      <FlatList
        keyExtractor={(item, index) => item.id}
        data={courseGoals}
        renderItem={(itemData) => (
          <GoalItem
            id={itemData.item.id}
            onDelete={removeGoalHandler}
            title={itemData.item.value}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    padding: 50,
  },
})
