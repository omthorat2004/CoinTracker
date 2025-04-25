import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getCoinsData = createAsyncThunk("api/getCoin",async(_,{rejectWithValue})=>{
    try{
        const marketRes = await fetch(
            'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether,ripple,binancecoin,solana&order=market_cap_desc&per_page=6&page=1&sparkline=true&price_change_percentage=1h,24h,7d'
          )
          const marketData = await marketRes.json()
          const charts = {}
          marketData.forEach(coin => {
            charts[coin.id] = {
              labels: Array.from({length: 7}, (_, i) => `${i+1}d`),
              datasets: [{
                data: coin.sparkline_in_7d.price.slice(0, 7),
                borderColor: coin.price_change_percentage_7d_in_currency >= 0 ? '#16c784' : '#ea3943',
                borderWidth: 2,
                tension: 0.1,
                pointRadius: 0
              }]
            }
          })

          return {charts,marketData}
    }catch(err){
        return rejectWithValue(err)
    }
})
const coinSlice = createSlice({
    name:'coin',
    initialState:{
        loading:false,
        error:false,
        message:'',
        coins:[],
        watchlists:[],
        chartData:{}
    },
    reducers:{
      addWatchList: (state, action) => {
        const alreadyExists = state.watchlists.some(
          coin => coin.id === action.payload.id
        );
        
        if (!alreadyExists) {
          state.watchlists = [action.payload, ...state.watchlists];
        }
       
      },
      removeFromWatchList: (state, action) => {
        state.watchlists = state.watchlists.filter(
          coin => coin.id !== action.payload
        );
      },
    },
    extraReducers:(builder)=>{
        builder.addCase(getCoinsData.pending,(state,action)=>{
          state.loading = true
        })
        builder.addCase(getCoinsData.fulfilled,(state,action)=>{
          state.coins = action.payload.marketData
          state.chartData = action.payload.charts
          state.loading = false
        })
    }
})

export const coinsSelector = (state)=>state.coin.coins

export const chartDataSelector = (state)=>state.coin.chartData

export const loadingSelector = (state)=>state.coin.loading

export const watchListsSelector = (state)=>state.coin.watchlists

export const {addWatchList,removeFromWatchList} = coinSlice.actions

export default coinSlice.reducer