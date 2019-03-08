import React from "react";
import { View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import Task from '../components/Task.js';
import { styles } from '../styles';
import { addNewTodo, getTodos, updateTodo, deleteTodo, getTodosFollowStatus} from "../firebase/db";

const VisibilityFiltersText = [
  {
    name: "All",
    id: 3
  },
  {
    name: "Done",
    id: 2
  },
  {
    name: "Active",
    id: 1
  }
]

// status: 1 ==> active
// status: 2: ==> Done

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      valueInput: null,
      tasks: null,
      activeFilter: 3
    };
  }

  handleAddTaskClicked() {
    if(!this.state.valueInput) {
      return;
    }

    addNewTodo(this.state.valueInput, 1).then((data) => {
      if (data === "success") {
        this.setState({
          valueInput: null
        });
        this.getAllTodo();
      }
    });
  }

  ondeleteItem(id) {
    deleteTodo(id).then((data) => {
      if (data === "success") {
        this.getAllTodo();
      }
    });
  }

  getAllTodo() {
    getTodos().then((dataTodos) => {
      if (dataTodos && Object.keys(dataTodos).length) {
        var objectKeys = Object.keys(dataTodos);
        var newArray = [];
        if (objectKeys && objectKeys.length) {
          for (let i = 0; i < objectKeys.length; i++) {
            var key = objectKeys[i];
            var value = dataTodos[key];
            var newObject = {
              id: key,
              name: value.name,
              status: value.status
            }
            newArray.push(newObject);
          }
          this.setState({
            tasks: newArray
          });
        }
      } else {
        this.setState({
          tasks: []
        });
      }
    });
  }

  getTodoFollowStatus(status) {
    getTodosFollowStatus(status).then((dataTodos) => {
      if (dataTodos && Object.keys(dataTodos).length) {
        var objectKeys = Object.keys(dataTodos);
        var newArray = [];
        if (objectKeys && objectKeys.length) {
          for (let i = 0; i < objectKeys.length; i++) {
            var key = objectKeys[i];
            var value = dataTodos[key];
            var newObject = {
              id: key,
              name: value.name,
              status: value.status
            }
            newArray.push(newObject);
          }
          this.setState({
            tasks: newArray
          });
        }
      } else {
        this.setState({
          tasks: []
        });
      }
    });
  }

  onUpdateStatus(id, status) {
    console.log(id, status);
    updateTodo(id, status).then((data) => {
      if (data === "success") {
        this.getAllTodo();
      }
    });
  }

  onFilterClicked(valueClicked) {
    switch(valueClicked) {
      case 1: {
        this.setState({
          activeFilter: 1
        });
        this.getTodoFollowStatus(1);
        break;
      }
      case 2: {
        this.setState({
          activeFilter: 2
        });
        this.getTodoFollowStatus(2);
        break;
      }
      case 3: {
        this.setState({
          activeFilter: 3
        });
        this.getAllTodo();
        break;
      }
      default:
        this.getAllTodo();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Todo App
          </Text>
        </View>
        <View style={styles.addTask}>
          <TextInput
            onChangeText={(text) => this.setState({
              valueInput: text
            })}
            placeholder='Enter todo name here'
            autoFocus={true}
            value={this.state.valueInput}
            onSubmitEditing={this.handleAddTaskClicked.bind(this)}
          />
        </View>
        <FlatList style={styles.tasksList}
          data={this.state.tasks}
          renderItem={({item, key}) => (
            <Task
              text={item.name}
              done={item.status === 2}
              onClickCheckBox={() => this.onUpdateStatus(item.id, 2)}
              onClickDelete={() => this.ondeleteItem(item.id)}
              isChecked={item.status === 2}
            />
          )}
          keyExtractor={item => item.id.toString()}
        />
        <View style={styles.footer}>
          {
            VisibilityFiltersText.map((item, index) => (
              <View key={index} style={styles.footerButtonContainer}>
                <TouchableOpacity style={this.state.activeFilter === item.id ? styles.footerButtonActive : styles.footerButton} onPress={() => this.onFilterClicked(item.id)} >
                  <Text style={styles.footerButtonText} >{item.name.toUpperCase()}</Text>
                </TouchableOpacity>
              </View>
            ))
          }
        </View>
      </View>
    );
  }
}

export default Main;
