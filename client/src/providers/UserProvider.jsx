import React, { useState, useEffect, createContext } from "react";
import { Spinner } from "reactstrap";
import * as firebase from "firebase/app";
import "firebase/auth";

export const UserContext = createContext();

export function UserProvider(props) {
  const apiUrl = "/api/user";
  const user = sessionStorage.getItem("user");

  const [isLoggedIn, setIsLoggedIn] = useState(user != null);
  const [users, setUsers] = useState([]);

  const [isFirebaseReady, setIsFirebaseReady] = useState(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((u) => {
      setIsFirebaseReady(true);
    });
  }, []);

  const getAllUsers = () =>
    getToken().then((token) =>
      fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json())
        .then(setUsers));

  const login = (email, pw) => {
    return firebase.auth().signInWithEmailAndPassword(email, pw)
      .then((signInResponse) => getUser(signInResponse.user.uid))
      .then((user) => {
        sessionStorage.setItem("user", JSON.stringify(user));
        setIsLoggedIn(true);
      });
  };

  const logout = () => {
    return firebase.auth().signOut()
      .then(() => {
        sessionStorage.clear()
        setIsLoggedIn(false);
      });
  };

  const register = (user, password) => {
    return firebase.auth().createUserWithEmailAndPassword(user.email, password)
      .then((createResponse) => add({ ...user, firebaseUserId: createResponse.user.uid }))
      .then((savedUser) => {
        sessionStorage.setItem("user", JSON.stringify(savedUser))
        setIsLoggedIn(true);
      });
  };

  const getToken = () => firebase.auth().currentUser.getIdToken();


  const getUser = (firebaseUserId) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${firebaseUserId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json()));
  };

  const getUserId = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/user/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(resp => resp.json()));
  };

  const add = (user) => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      }).then(resp => resp.json()));
  };

  const update = (user) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${user.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      }));
  };



  return (
    <UserContext.Provider value={{ users, isLoggedIn, user, login, logout, register, getToken, setUsers, getAllUsers, getUser, update, getUserId }}>
      {isFirebaseReady
        ? props.children
        : <Spinner className="app-spinner dark" />}
    </UserContext.Provider>
  );
}