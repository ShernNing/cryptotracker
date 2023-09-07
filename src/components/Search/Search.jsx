import "./Search.css";
import { useEffect, useState } from "react";
import Coin from "./../Coin/Coin";
import { Container } from "@mui/material";

function Search() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loadMore, setLoadMore] = useState(20);

  useEffect(() => {
    const getCoins = async () => {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${loadMore}&page=1&sparkline=false&locale=en`
      );
      const data = await res.json();
      console.log(data, "from fetch");
      console.log(coins, "coins");
      setCoins(data);
    };
    getCoins().catch((err) => setError(err));
  }, [loadMore]);

  //filter search results
  const filteredCoins = coins.filter(
    (data) => data.name.toLowerCase().includes(search) //toLowerCase() is to include searches with caps in the name
  );

  return (
    <div className='coin-app'>
      <Container maxWidth='md'>
        {error ? (
          `Error: ${error.message}`
        ) : (
          <div>
            <div className='coin-search'>
              <h1 className='coin-text'>Search for a Crypto Currency</h1>
              <form>
                <input
                  className='coin-input'
                  type='text'
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder='Search..'
                />
              </form>
            </div>
            <div>
              {filteredCoins.map((data, key) => (
                <Coin data={data} key={key} />
              ))}
            </div>
            <button
              className='load-more'
              onClick={() => setLoadMore(loadMore + 10)}
            >
              Load More
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Search;
