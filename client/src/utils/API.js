import axios from "axios";

export default {
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