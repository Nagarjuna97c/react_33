import './index.css'

const LanguageFilterItem = props => {
  const {itemDetails, changeSelectedLanguage, selectedLanguage} = props
  const {id, language} = itemDetails

  const listClass =
    id === selectedLanguage ? 'selected-item' : 'unselected-item'

  const btnClass = id === selectedLanguage ? 'button selected-btn' : 'button'

  const selectLanguage = () => {
    changeSelectedLanguage(id)
  }

  return (
    <li className={listClass}>
      <button type="button" className={btnClass} onClick={selectLanguage}>
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
