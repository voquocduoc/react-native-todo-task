import React from 'react'
import { styles } from '../styles'
import {Text, View, Button} from 'react-native';
import CheckBox from 'react-native-check-box';

const Task = ({ onClickCheckBox, onClickDelete, done, text, isChecked}) => (
  <View>
    <CheckBox
      style={{flex: 1, padding: 10}}
      onClick={onClickCheckBox}
      isChecked={isChecked}
    />
    <Text
      style={done ? styles.taskTextCompleted : styles.taskText}
    >
      {text}
    </Text>
    <Button
      onPress={onClickDelete}
      title="X"
    />
  </View>
)
export default Task
