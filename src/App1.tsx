import './App.scss'
import Box from '@mui/material/Box';
import AppHeader from './components/AppHeader/AppHeader';
import OrderBook from './components/OrderBook/OrderBook';

function App() {

  // useEffect(() => {
  //   const ws = new WebSocket('wss://ws-feed.exchange.coinbase.com');

  //   ws.onopen = () => {
  //     const subscribeMessage = {
  //       type: 'subscribe',
  //       channels: [{ name: 'level2_batch', product_ids: ['BTC-USD'] }]
  //     };
  //     ws.send(JSON.stringify(subscribeMessage));
  //   };

  //   ws.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     if (data.type === 'snapshot') {
  //       console.log(data)
  //     } else if (data.type === 'l2update') {
  //       console.log('data type l2update')
  //     }
  //   };

  //   return () => {
  //     ws.close();
  //   };
  // }, []);


  return (
    <Box>
        <AppHeader />
        <OrderBook/>
    </Box>
  )
}

export default App
