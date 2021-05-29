import Vue from 'vue';
import Vuex from 'vuex';
import stocks from '../data/data';
import axios from 'axios';

Vue.use(Vuex); 

export default new Vuex.Store({
    state: {
        stocks: [],
        portfolio: [],
        funds: 10000
    },
    mutations: {
        INIT_STOCKS(state, stocks) {
            state.stocks = stocks;
        },
        BUY_STOCKS(state, order) {
            const portfolioStock = state.portfolio.find((stock) => stock.id == order.id);
            if (!portfolioStock) {
                state.portfolio.push({
                    id: order.id,
                    quantity: order.quantity
                });    
            } else {
                portfolioStock.quantity += order.quantity;
            }
            state.funds -= (order.price * order.quantity);
        },
        SELL_STOCKS(state, order) {
            const portfolioStock = state.portfolio.find((stock) => stock.id == order.id);
            if (portfolioStock.quantity > order.quantity) {
                portfolioStock.quantity -= order.quantity;
            } else {
                state.portfolio.splice(state.portfolio.indexOf(portfolioStock), 1);
            }
            
            state.funds += (order.price * order.quantity);
        },
        RND_STOCKS(state) {
            state.stocks.forEach((stock) => {
                stock.price = Math.round(stock.price * (Math.random()+0.5));
            })
        },
        SAVE_DATA(state) {
            const data = {
                stocks: state.stocks,
                portfolio: state.portfolio,
                funds: state.funds
            };
            axios.put('/data_prkk.json', data); 
        },
        LOAD_DATA(state) {
            axios.get('/data_prkk.json')
                .then(response => {
                    state.stocks = response.data.stocks;
                    state.portfolio = response.data.portfolio;
                    state.funds = response.data.funds;
                    //console.log(response);
                });
        }
    },
    actions: {
        initStocks({commit}) {
            commit('INIT_STOCKS', stocks);
        },
        buyStocks({commit}, order) {
            commit('BUY_STOCKS', order);
        },
        sellStocks({commit}, order) {
            commit('SELL_STOCKS', order);
        },
        rndStocks({commit}) {
            commit('RND_STOCKS');
        },
        saveData({commit}) {
            commit('SAVE_DATA');
        },
        loadData({commit}) {
            commit('LOAD_DATA');
        }
    },
    getters: {
        funds(state) {
            return state.funds;
        },
        stocks(state) {
            return state.stocks;
        },
        /*stockById(state) { //getter z parametrem (id):
            return function (id) {
                return state.stocks.find(stock => stock.id == id);
            }
        },*/
        /*stockById: (state)=>{ //to samo j.w.
            return function (id) {
                return state.stocks.find(stock => stock.id == id);
            }
        },*/
        stockById: (state)=> (id)=>{ //to samo j.w.
            return state.stocks.find(stock => stock.id == id);
        },
        portfolio(state, getters) {
            return state.portfolio.map((portfolioStock)=>{
                return {
                    id: portfolioStock.id,
                    quantity: portfolioStock.quantity,
                    name: getters.stockById(portfolioStock.id).name,
                    price: getters.stockById(portfolioStock.id).price
                }
            })
        }
    }
  })