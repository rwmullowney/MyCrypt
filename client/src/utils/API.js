import axios from "axios";

const URL = "https://api.coinmarketcap.com/v2/ticker/?limit=10";

export default {
    search: function () {
        return axios.get(URL)
    },
    getUsers: function(){
        return axios.get("/api/users")
    }
};