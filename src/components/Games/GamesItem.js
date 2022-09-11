import { Link } from 'react-router-dom';

export default function GamesItem({ id, title, isCurrentProvider, game, popularity, real, selectedCurrency, provider }) {
  return (
    <div className="games__item">
      <Link state={{ game, id, title }} className="games__item-link" to={`/${id}`}></Link>
      <div className="games__item-wrapper">
        <div className="games__item-img-wrapper">
          <img
            loading="lazy"
            alt={`${title}`}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = "/game-placeholder.jpg";
            }} className="games__item-img" src={`https://cdn2.softswiss.net/i/s2/${id}.png`} />
        </div>
        <div className="games__item-content">
          <p className="games__item-title">id: {id}</p>
          <p className="games__item-title">Title: {title}</p>
          <p>Provider: {isCurrentProvider ? <b>{provider}</b> : <>{provider}</>}</p>
          <p>Popularity: {popularity}</p>
          <ul>Currencies:
            {Array.from(Object.keys(real)).map(currency => {
              const isCurrentCurrency = selectedCurrency === currency;
              return (
                <li key={currency}>{isCurrentCurrency ? <b>{currency}</b> : <>{currency}</>}</li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}
