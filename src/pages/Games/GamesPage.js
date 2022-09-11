import { useEffect, useMemo } from "react"
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { setProvider, setCurrency } from "../../store/slices/selectSlice";
import { fetchGames, addOffset, resetOffset } from "../../store/slices/gamesSlice";
import ShowMoreButton from "../../components/Games/ShowMoreButton";
import GamesItem from "../../components/Games/GamesItem";
import Filter from "../../components/Games/Filter";

export default function GamesPage() {

  const { selectedProvider, selectedCurrency } = useSelector(state => state.selectSlice);
  const { games, loading, offset } = useSelector(state => state.gamesSlice);
  const dispatch = useDispatch();

  const addOffsetHandler = () => dispatch(addOffset());

  const setProviderHandler = () => ({ target: { value } }) => {
    dispatch(resetOffset());
    dispatch(setProvider(value));
  };
  const setCurrencyHandler = () => ({ target: { value } }) => {
    dispatch(resetOffset());
    dispatch(setCurrency(value))
  };

  const [availableProviders] = useMemo(() => {
    if (!games || games.length < 0) return [];
    const providersSet = new Set();
    games.map(({ provider }) => {
      providersSet.add(provider)
    })
    return [Array.from(providersSet)]
  }, [games]);

  const [availableCurrencies] = useMemo(() => {
    if (!games || games.length < 0) return [];
    const currencySet = new Set();
    games.map(({ real }) => {
      for (let currency in real) {
        currencySet.add(currency)
      }
    })
    return [Array.from(currencySet)]
  }, [games]);

  const [sortedAndFilteredGames] = useMemo(() => {
    if (games || games.length > 0) {

      const sortedGamesByPopulatityDown = Array.from(games).sort(function (a, b) {
        if (a.collections.popularity < b.collections.popularity) {
          return -1;
        }
        if (a.collections.popularity > b.collections.popularity) {
          return 1;
        }
        return 0;
      });

      const filteredGames = sortedGamesByPopulatityDown.filter(game => {
        const filterByProvider = game.provider.toLowerCase().includes(selectedProvider.toLowerCase());
        let filterByCurrency = true;
        if (selectedCurrency !== "") {
          filterByCurrency = game.real.hasOwnProperty(selectedCurrency);
        }
        return (filterByProvider && filterByCurrency)
      })

      return [filteredGames]
    } else {
      return []
    }
  }, [games, selectedCurrency, selectedProvider]);

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  return (
    <div>
      <Filter
        availableProviders={availableProviders}
        availableCurrencies={availableCurrencies}
        selectedProvider={selectedProvider}
        selectedCurrency={selectedCurrency}
        providerHandler={setProviderHandler}
        currencyHandler={setCurrencyHandler}
      />
      <div className="games">
        <div className="games__wrapper">

          {(!loading && sortedAndFilteredGames.length === 0) ? <>Нет результатов...</> :
            <div className="games__items">
              {sortedAndFilteredGames && sortedAndFilteredGames.length > 0 &&
                sortedAndFilteredGames.slice(0, offset).map(game => {
                  const {
                    id,
                    title,
                    provider,
                    collections: {
                      novelty,
                      popularity,
                      slots,
                      _hd,
                      all
                    },
                    real,
                    demo: posterImage
                  } = game;

                  const isCurrentProvider = selectedProvider === provider;

                  return (
                    <GamesItem
                      key={id}
                      id={id}
                      title={title}
                      isCurrentProvider={isCurrentProvider}
                      game={game}
                      popularity={popularity}
                      real={real}
                      selectedCurrency={selectedCurrency}
                      provider={provider} />
                  )
                })}
            </div>
          }

          <ShowMoreButton count={sortedAndFilteredGames.length} offset={offset} handler={addOffsetHandler} />

        </div>
      </div>

    </div>
  )
}
