import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext';
import {Link} from 'react-router-dom'

const Home = () => {
  const {allCoin, currency} = useContext(CoinContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState('');

  const inputHandler = (event) => {
    setInput(event.target.value);
  }

  const searchHandler = async (event) => {
    event.preventDefault();
    if (!input) {
      setDisplayCoin(allCoin);
      return;
    }
    const filteredCoins = allCoin.filter((item) => 
      item.name.toLowerCase().includes(input.toLowerCase()) ||
      item.symbol.toLowerCase().includes(input.toLowerCase())
    );
    setDisplayCoin(filteredCoins);
  }

  useEffect(() => {
    if (allCoin) {
      setDisplayCoin(allCoin);
    }
  }, [allCoin])

  return (
    <div className='home'>
      <div className="hero">
        <p>Cryptocurrency is a digital payment system that doesn't rely on banks to verify transactions. 
        It’s a peer-to-peer system that allows anyone to send and receive payments globally. Digital wallets store cryptocurrency, and encryption techniques ensure <b>secure</b> transactions. 
        
        This project analyzes cryptocurrency sentiment using "machine learning" and predicts future price trends. 
        We utilize historical data, market movements, and sentiment analysis from multiple sources to provide valuable insights for traders and investors. 
        </p>
       <form onSubmit={searchHandler}>
        <input onChange={inputHandler} list='coinList' value={input} type="text" placeholder='Search Coin' required/>

        <datalist id='coinList'>
          {allCoin.map((item,index)=>(<option key={index} value={item.name}/>))}
        </datalist>


        <button type="submit">Search</button>
       </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{textAlign:"center"}}>24H Change</p>
          <p className='market-cap'>Market Cap</p>
        </div>
        {allCoin && displayCoin.slice(0,200).map((item, index) => (
          <Link to={`/coin/${item.id}`}className="table-layout" key={item.id || index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt={`${item.name} logo`} />
              <p>{item.name} - {item.symbol}</p>
            </div>
            <p>{currency.symbol} {item.current_price?.toLocaleString()}</p>
            <p className={item.price_change_percentage_24h > 0 ? "green" : "red"}>
              {item.price_change_percentage_24h ? 
                Math.floor(item.price_change_percentage_24h * 100) / 100 : 'N/A'}
            </p>
            <p className='market-cap'>{currency.symbol} {item.market_cap?.toLocaleString()}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Home