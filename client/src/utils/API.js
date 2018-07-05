import axios from "axios";

export default {
  // USER SECTION
  // Gets all Users 
  getUser: function() {
    return axios.get("/api/user");
  },
  // Gets the user with the given id
  getUser: function(id) {
    return axios.get("/api/user/" + id);
  },
  // Deletes the user with the given id
  deleteUser: function(id) {
    return axios.delete("/api/user/" + id);
  },
  // Saves a user to the database
  saveUser: function(spendingData) {
    return axios.post("/api/user", spendingData);
  },

  // SPENDING SECTION
  // Gets all Spending entries
  getSpending: function() {
    return axios.get("/api/spending");
  },
  // Gets the spending entry with the given id
  getSpending: function(id) {
    return axios.get("/api/spending/" + id);
  },
  // Deletes the spending entry with the given id
  deleteSpending: function(id) {
    return axios.delete("/api/spending/" + id);
  },
  // Saves a spending entry to the database
  saveSpending: function(spendingData) {
    return axios.post("/api/spending", spendingData);
  }
};