
export default function Filter({ availableProviders, availableCurrencies, selectedProvider, selectedCurrency, providerHandler, currencyHandler }) {
  return (
    <div className="filter">
      <div className="filter__wrapper">
        <select className="filter__select" defaultValue={selectedProvider} onChange={providerHandler()} >
          <option className="filter__item" value={""}>All providers</option>
          {availableProviders && availableProviders.length > 0 && availableProviders.map(value => (
            <option className="filter__item" key={value} value={value}>{value}</option>
          ))}
        </select>
        <select className="filter__select" defaultValue={selectedCurrency} onChange={currencyHandler()}>
          <option className="filter__item" value={""}>All currencies</option>
          {availableCurrencies && availableCurrencies.length > 0 && availableCurrencies.map(value => (
            <option className="filter__item" key={value} value={value}>{value}</option>
          ))}
        </select>
      </div>
    </div>
  )
}
