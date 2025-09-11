import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)}- NewsMonkey`;
  }
  async updatedNews() {
  this.props.setProgress(10);
    const url = ` https://gnews.io/api/v4/top-headlines?category=${this.props.category}&lang=en&country=${this.props.country}&apikey=cba7e059d14603777bb8eeb2af0ed708&page=${this.state.page}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true })
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsdata = await data.json()
    this.props.setProgress(70);
    this.setState({
      articles: parsdata.articles ? parsdata.articles:[],
      totalResults: parsdata.totalResults || 0,
      loading: false
    })
  this.props.setProgress(100);
  }
  async componentDidMount() {
    //let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fefd9b8244c745f59baa5f81e15d1783&page=1&pageSize=${this.props.pageSize}`
    this.updatedNews();
  }

  handlePrevclick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updatedNews();
  }

  handleNextclick = async () => {
    this.setState({ page: this.state.page + 1 });
    this.updatedNews();

  }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://gnews.io/api/v4/top-headlines?category=${this.props.category}&lang=en&country=${this.props.country}&apikey=cba7e059d14603777bb8eeb2af0ed708&page=${this.state.page}&pageSize=${this.props.pageSize}`

    let data = await fetch(url);
    let parsdata = await data.json()
    console.log(parsdata);
    this.setState({
      articles: this.state.articles.concat(parsdata.articles ?parsdata.articles : []),
      totalResults: parsdata.totalArticles || 0
    })
  };


  render() {
    return (
      <div>
        <h1 className='text-center' style={{ margin: '35px 0px' }}>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className='container'>
            <div className="row">
              {Array.isArray(this.state.articles) && this.state.articles.map((element) => {
                return (
                  <div className='col-md-4' key={element.url}>
                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""}
                      description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.image}
                      newsUrl={element.url} date={element.publishedAt} source={element.source?.name} />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </div>

    );
  }
}

export default News
