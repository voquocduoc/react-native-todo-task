import { db } from "./firebase";
import {
  Alert
} from "react-native";

export const doCreateUser = (id, infoUser) =>
  db.ref("users/" + id).update(infoUser);

export const updateTodo = (id, status) => {
  return new Promise((resolve, reject) => {
    try {
      db.ref("todo/" + id).update({
        status: status
      });
      resolve("success");
    } catch (ex) {
      reject("error");
    }
  });
};

export const deleteTodo = (id) => {
  return new Promise((resolve, reject) => {
    try {
      db.ref("todo/" + id).remove();
      resolve("success");
    } catch (ex) {
      reject("error");
    }
  });
};

export const getTodos = () => {
  return new Promise((resolve, reject) => {
    db.ref("todo/").once("value").then(function(snapshot) {
      if (snapshot.val()) {
        resolve(snapshot.val());
      } else {
        resolve([]);
      }
    });
  });
};

export const getTodosFollowStatus = (status) => {
  return new Promise((resolve, reject) => {
    db.ref("todo").orderByChild("status").equalTo(status).once("value").then(function(snapshot) {
      if (snapshot.val()) {
        resolve(snapshot.val());
      } else {
        resolve([]);
      }
    });
  });
};

export const addNewTodo = (name, status) => {
  return new Promise((resolve, reject) => {
    db.ref("todo/").push({
      name: name,
      status: status
    }).then((data) => {
      if (data.key) {
        resolve("success");
      } else {
        reject();
      }
    });
  });
}
