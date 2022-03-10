import {Component} from 'react/cjs/react.production.min'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const statusList = {
  loading: 'LOADING',
  success: 'SUCESS',
  failure: 'FAILURE',
}

// Write your code here
class GithubPopularRepos extends Component {
  state = {
    loadingStatus: statusList.loading,
    selectedLanguage: languageFiltersData[0].id,
    reposList: [],
  }

  componentDidMount() {
    this.getRepos()
  }

  getRepos = async () => {
    const {selectedLanguage} = this.state

    const repos = await fetch(
      `https://apis.ccbp.in/popular-repos?language=${selectedLanguage}`,
    )
    const formattedRepos = await repos.json()
    console.log(repos)

    if (repos.ok === true) {
      this.setState({
        reposList: formattedRepos.popular_repos.map(eachItem => ({
          name: eachItem.name,
          id: eachItem.id,
          issuesCount: eachItem.issues_count,
          forksCount: eachItem.forks_count,
          starsCount: eachItem.stars_count,
          avatarUrl: eachItem.avatar_url,
        })),
        loadingStatus: statusList.success,
      })
    } else {
      this.setState({loadingStatus: statusList.failure})
    }
  }

  changeSelectedLanguage = id => {
    this.setState(
      {selectedLanguage: id, loadingStatus: statusList.loading},
      this.getRepos,
    )
  }

  renderLoader = () => (
    <div className="products-loader-container" testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderReposList = () => {
    const {reposList} = this.state

    return (
      <div className="repos-container">
        {reposList.map(eachItem => (
          <RepositoryItem key={eachItem.id} itemDetails={eachItem} />
        ))}
      </div>
    )
  }

  renderFailure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">Something Went Wrong</h1>
    </div>
  )

  renderRepos = () => {
    const {loadingStatus} = this.state

    switch (loadingStatus) {
      case statusList.loading:
        return this.renderLoader()
      case statusList.success:
        return this.renderReposList()
      default:
        return this.renderFailure()
    }
  }

  render() {
    const {selectedLanguage} = this.state
    console.log('render here')

    return (
      <div className="main-container">
        <h1 className="heading">Popular</h1>
        <ul className="languages-list">
          {languageFiltersData.map(eachItem => (
            <LanguageFilterItem
              key={eachItem.id}
              itemDetails={eachItem}
              selectedLanguage={selectedLanguage}
              changeSelectedLanguage={this.changeSelectedLanguage}
            />
          ))}
        </ul>
        {this.renderRepos()}
      </div>
    )
  }
}

export default GithubPopularRepos
