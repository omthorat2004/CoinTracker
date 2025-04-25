import AddIcon from '@mui/icons-material/Add'
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LineChart from '../components/LineChart'
import { addWatchList, chartDataSelector, coinsSelector, getCoinsData, loadingSelector } from '../features/coin/coinSlice'
import { formatMarketCap, formatPercentageChange, formatPrice, formatSupply, formatVolume } from '../utils/Index'
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const Home = () => {
    const coins = useSelector(coinsSelector)
    const chartData = useSelector(chartDataSelector)
    const loading = useSelector(loadingSelector)
    const dispatch = useDispatch()
    
    
  useEffect(() => {
  
    const interval = setInterval(() => {
      dispatch(getCoinsData()); 
    }, 5000);
    return () => clearInterval(interval);
  }, [])

  

  const handleAdd = (index)=>{
    console.log(index)
    dispatch(addWatchList(coins[index]))
  }

  if(loading){
    return <h1>Re-fetching</h1>
  }

  return (
    <div style={{ padding: '20px' }}>
      <TableContainer component={Paper} elevation={0} sx={{ border: '1px solid #e0e0e0' }}>
        <Table sx={{ minWidth: 1200 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{fontWeight:'600',color:'#000'}}>Add</TableCell>
              <TableCell sx={{ fontWeight: '600', color: '#000' }}>#</TableCell>
              <TableCell sx={{ fontWeight: '600', color: '#000' }}>Name</TableCell>
              <TableCell align="right" sx={{ fontWeight: '600', color: '#000' }}>Price</TableCell>
              <TableCell align="right" sx={{ fontWeight: '600', color: '#000' }}>1h %</TableCell>
              <TableCell align="right" sx={{ fontWeight: '600', color: '#000' }}>24h %</TableCell>
              <TableCell align="right" sx={{ fontWeight: '600', color: '#000' }}>7d %</TableCell>
              <TableCell align="right" sx={{ fontWeight: '600', color: '#000' }}>Market Cap</TableCell>
              <TableCell align="right" sx={{ fontWeight: '600', color: '#000' }}>Volume(24h)</TableCell>
              <TableCell align="right" sx={{ fontWeight: '600', color: '#000' }}>Circulating Supply</TableCell>
              <TableCell align="right" sx={{ fontWeight: '600', color: '#000' }}>Last 7 Days</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coins.map((coin, index) => (
              <TableRow key={coin.id} hover>
                <TableCell>
                <IconButton 
        color="primary" 
        onClick={()=>handleAdd(index)}
        sx={{ marginBottom: '20px' }}
      >
        <AddIcon />
      </IconButton>
                </TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img 
                      src={coin.image} 
                      alt={coin.name} 
                      width={24} 
                      style={{ borderRadius: '50%' }}
                    />
                    <Box>
                      <Box component="span" sx={{ fontWeight: '600', marginRight: '6px' }}>
                        {coin.name}
                      </Box>
                      <Box component="span" sx={{ color: '#888', textTransform: 'uppercase' }}>
                        {coin.symbol}
                      </Box>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="right">{formatPrice(coin.current_price)}</TableCell>
                <TableCell align="right">
                  {formatPercentageChange(coin.price_change_percentage_1h_in_currency)}
                </TableCell>
                <TableCell align="right">
                  {formatPercentageChange(coin.price_change_percentage_24h)}
                </TableCell>
                <TableCell align="right">
                  {formatPercentageChange(coin.price_change_percentage_7d_in_currency)}
                </TableCell>
                <TableCell align="right">{formatMarketCap(coin.market_cap)}</TableCell>
                <TableCell align="right">{formatVolume(coin.total_volume)}</TableCell>
                <TableCell align="right">
                  {formatSupply(coin.circulating_supply, coin.symbol.toUpperCase())}
                </TableCell>
                <TableCell align="right" sx={{ width: '150px' }}>
                  {chartData[coin.id] && (
                    <Box sx={{ height: '50px', width: '150px' }}>
                      <LineChart data={chartData[coin.id]}/>
                    </Box>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Home