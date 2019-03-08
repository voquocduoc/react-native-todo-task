import { StyleSheet } from 'react-native';

const baseStyles = {
  taskText: {
    textDecorationLine: 'none',
    fontSize: 20,
  },
  footerButton: {
    padding: 10,
    borderRadius: 5,
    margin: 5,
    elevation: 3,
    backgroundColor: '#2089dc',
    elevation: 2,
  },
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 30,
    elevation: 3,
    backgroundColor: '#f5f5f5f5',
  },
  headerText: {
    textAlign: 'center',
    padding: 80
  },
  addTask: {
    marginHorizontal: 5,
    paddingTop: 80
  },
  footer: {
    flexDirection: 'row',
  },
  footerButtonContainer: {
    flex: 1,
  },
  footerButton: {
    ...baseStyles.footerButton,
  },
  footerButtonActive: {
    ...baseStyles.footerButton,
    elevation: 0,
    backgroundColor: '#8F0CE8',
  },
  footerButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  taskText: {
    ...baseStyles.taskText
  },
  taskTextCompleted: {
    ...baseStyles.taskText,
    textDecorationLine: 'line-through',
  },
  tasksList: {
    margin: 5,
  },
});
