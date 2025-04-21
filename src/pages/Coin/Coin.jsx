import React, { useContext, useEffect, useState } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart';

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [predictedData, setPredictedData] = useState(null); // New state for predictions
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = { method: 'GET', headers: { accept: 'application/json' } };
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then((res) => res.json())
      .then((res) => setCoinData(res))
      .catch((err) => console.error(err));
  };

  const fetchHistoricalData = async () => {
    const options = { method: 'GET', headers: { accept: 'application/json' } };
    fetch(
      `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
      options
    )
      .then((res) => res.json())
      .then((res) => setHistoricalData(res))
      .catch((err) => console.error(err));
  };

  const fetchPredictedData = async () => {
    fetch(`http://localhost:5000/api/predict/${coinId}`)
      .then((res) => res.json())
      .then((res) => setPredictedData(res.predictions))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
    fetchPredictedData(); // Fetch predictions
  }, [currency, coinId]);

  if (!coinData || !historicalData || !historicalData.prices) {
    return (
      <div className='spinner'>
        <div className="spin"></div>
      </div>
    );
  }

  // Combine historical and predicted data for the chart
  const combinedData = [["Date", "Prices"]];
  if (historicalData.prices) {
    historicalData.prices.forEach((item) => {
      combinedData.push([new Date(item[0]).toLocaleDateString().slice(0, -5), item[1]]);
    });
  }
  if (predictedData) {
    predictedData.forEach((item) => {
      combinedData.push([item.date.slice(5), item.price]); // Format date as MM-DD
    });
  }

  return (
    <div className='coin'>
      <div className="coin-name">
        <img src={coinData.image.large} alt={coinData.name} />
        <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
      </div>
      <div className="coin-chart">
        <LineChart historicalData={{ prices: historicalData.prices }} combinedData={combinedData} />
      </div>
      <div className="coin-info">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Current Price</li>
          <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 Hour High</li>
          <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
          <li>24 Hour Low</li>
          <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
        </ul>
      </div>
      {predictedData && (
        <div className="coin-predictions">
          <h3>Price Predictions (Next 7 Days)</h3>
          <ul>
            {predictedData.map((pred, index) => (
              <li key={index}>
                {pred.date}: {currency.symbol} {pred.price.toLocaleString()}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Coin;



// import React, { useContext, useEffect, useState } from 'react';
// import './Coin.css';
// import { useParams } from 'react-router-dom';
// import { CoinContext } from '../../context/CoinContext';
// import LineChart from '../../components/LineChart/LineChart';

// const Coin = () => {
//   const { coinId } = useParams();
//   const [coinData, setCoinData] = useState(null);
//   const [historicalData, setHistoricalData] = useState(null);
//   const { currency } = useContext(CoinContext);

//   const fetchCoinData = async () => {
//     const options = { method: 'GET', headers: { accept: 'application/json' } };
//     fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
//       .then((res) => res.json())
//       .then((res) => setCoinData(res))
//       .catch((err) => console.error(err));
//   };

//   const fetchHistoricalData = async () => {
//     const options = { method: 'GET', headers: { accept: 'application/json' } };
//     fetch(
//       `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
//       options
//     )
//       .then((res) => res.json())
//       .then((res) => setHistoricalData(res))
//       .catch((err) => console.error(err));
//   };

//   useEffect(() => {
//     fetchCoinData();
//     fetchHistoricalData();
//   }, [currency, coinId]); 


//   if (!coinData || !historicalData || !historicalData.prices) {
//     return (
//       <div className='spinner'>
//         <div className="spin"></div>
//       </div>
//     );
//   }

//   return (
//     <div className='coin'>
//       <div className="coin-name">
//         <img src={coinData.image.large} alt={coinData.name} />
//         <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
//       </div>
//       <div className="coin-chart">
//         <LineChart historicalData={historicalData} />
//       </div>
// <div className="coin-info">
//   <ul>
//     <li>Crypto Market Rank</li>
//     <li>{coinData.market_cap_rank}</li>
//   </ul>
//   <ul>
//     <li>Current Price</li>
//     <li>{currency.symbol} {coinData.market_data.current_price[currency.name].toLocaleString()}</li>
//   </ul>
//   <ul>
//     <li>Market cap</li>
//     <li>{currency.symbol} {coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
//   </ul>
//   <ul>
//     <li>24 Hour high</li>
//     <li>{currency.symbol} {coinData.market_data.high_24h[currency.name].toLocaleString()}</li>
//   </ul>
//   <ul>
//     <li>24 Hour low</li>
//     <li>{currency.symbol} {coinData.market_data.low_24h[currency.name].toLocaleString()}</li>
//   </ul>
// </div>
      
//     </div>
//   );
// };

// export default Coin;

