import React, { useContext } from 'react'
import './Navbar.css'
import logo from '../../assets/logo.png'
import { CoinContext } from '../../context/CoinContext'
import {Link} from 'react-router-dom'

const Navbar = () => {
  const {setCurrency} = useContext(CoinContext)

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd":
        setCurrency({name: "usd", symbol: "$"})
        break;
      case "eur":
        setCurrency({name: "eur", symbol: "€"})
        break;
      case "inr":
        setCurrency({name: "inr", symbol: "₹"})
        break;
      case "gbp":  
        setCurrency({name: "gbp", symbol: "£"})
        break;
      case "jpy":
        setCurrency({name: "jpy", symbol: "¥"})
        break;
      default:
        setCurrency({name: "usd", symbol: "$"})
        break;
    }
  }
  
  return (
    <div className='navbar'>
      <Link to={'/'}>
        <img src={logo} alt="" className='logo'/>
      </Link>
        <ul>
          <Link to={'/'}>
            <li>Cryptide</li>
          </Link>
            {/* <li>Features</li>
            <li>Pricing</li>
            <li>Blog</li> */}
        </ul>
        <div className="nav-right">
            <select onChange={currencyHandler}>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="inr">INR</option>
                <option value="gbp">GBP</option>  
                <option value="jpy">JPY</option>
            </select>
        </div>
    </div>
  )
}

export default Navbar