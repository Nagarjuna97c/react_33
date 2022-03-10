import './index.css'

const RepositoryItem = props => {
  const {itemDetails} = props
  const {name, issuesCount, forksCount, starsCount, avatarUrl} = itemDetails

  return (
    <div className="repo-card">
      <img src={avatarUrl} alt={name} className="repo-image" />
      <h1 className="repo-heading">{name}</h1>
      <div className="item-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="icon"
        />
        <p className="repo-para">{starsCount} stars</p>
      </div>
      <div className="item-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="icon"
        />
        <p className="repo-para">{forksCount} forks</p>
      </div>
      <div className="item-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="icon"
        />
        <p className="repo-para">{issuesCount} open issues</p>
      </div>
    </div>
  )
}

export default RepositoryItem
