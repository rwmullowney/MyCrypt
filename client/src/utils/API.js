import axios from "axios";

const URL = "https://api.coinmarketcap.com/v2/ticker/?limit=10";

export default {
    // Performs crypto API search to gather coin information
    search: function () {
        return axios.get(URL);
    },
    // Gathers user accounts and stored them in an object
    getUsers: function () {
        return axios.get("/api/users");
    },
    // Sign in as a specific user
    userLogin: function (userLogin) {
        return axios.get("api/users/" + userLogin);
    },
    // Saves a new user to the database
    createUser: function (userData) {
        return axios.post("api/users", userData);
    },
    transaction: function (userLogin, wallet) {
        return axios.post("/api/users/transactions", {
            userLogin: userLogin,
            wallet: wallet
        });
    },
    pastBuys: function(userLogin){
        return axios.get("/api/users/" + userLogin + "/pastBuys");
    },
    pastSells: function(userLogin){
        return axios.get("/api/users/" + userLogin + "/pastSells");
    },
    postTransaction: function(userLogin, transactionAmount, transactionType, cryptoValue, coinAmount, coinSymbol, date){
        // console.log(userLogin, transactionAmount, cryptoValue, coinAmount, coinSymbol, date);
        return axios.post("/api/users/" + userLogin + "/postTransaction", {
            userEmail: userLogin,
            transactionAmount: transactionAmount,
            transactionType: transactionType,
            coinID: cryptoValue,
            coinAmount: coinAmount,
            coinSymbol: coinSymbol,
            date: date
        });
    }
};