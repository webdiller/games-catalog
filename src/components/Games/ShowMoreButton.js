export default function ShowMoreButton({ count, offset, handler }) {
  if (offset >= count) return null
  return (
    <button onClick={handler} className="ui-btn games__show-more">Показать еще</button>
  )
}
