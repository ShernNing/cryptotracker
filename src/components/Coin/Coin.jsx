import "./Coin.css";

function Coin({ data }) {
  return (
    <div className='coin-container'>
      <div className='coin-row'>
        <div className='coin'>
          <img src={data.image} alt='crypto' />
          <h1>{data.name}</h1>
          <p className='coin-symbol'>{data.symbol}</p>
        </div>
        <div className='coin-data'>
          <p className='coin-price'>${data.current_price}</p>
          <p className='coin-volume'>${data.total_volume}</p>

          {data.price_change_percentage_24h < 0 ? (
            <p className='coin-percent red'>
              {data.price_change_percentage_24h.toFixed(2)}%
            </p>
          ) : (
            <p className='coin-percent green'>
              +{data.price_change_percentage_24h.toFixed(2)}%
            </p>
          )}
          <p>Mkt Cap: ${data.market_cap}</p>
        </div>
      </div>
    </div>
  );
}

export default Coin;
