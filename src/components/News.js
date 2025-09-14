import React, { useEffect,useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props)=> {
const[articles,setarticles]=useState([])
const[loading,setloading]=useState(true)
const[page,setpage]=useState(1)
const[totalResults,settotalResult]=useState(0)
// document.title = `${capitalizeFirstLetter(props.category)}- NewsMonkey`;



 
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  
  const updatedNews= async ()=> {
 props.setProgress(10);
    const url = ` https://gnews.io/api/v4/top-headlines?category=${props.category}&lang=en&country=${props.country}&apikey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    setloading(true)
    let data = await fetch(url);
    props.setProgress(30);
    let parsdata = await data.json()
   props.setProgress(70);

   setarticles(parsdata.articles);
   settotalResult(parsdata.totalResults);
setloading(false)
   
 props.setProgress(100);
  }

  useEffect(()=>{
  updatedNews();
  
  },[])

  

  // const handlePrevclick = async () => {
  //   setpage(page - 1);
  //   updatedNews();
  // }

  // const handleNextclick = async () => {
  //   setpage(page + 1);
  //   updatedNews();

  // }
  const fetchMoreData = async () => {
       setpage(page + 1);

    const url = `https://gnews.io/api/v4/top-headlines?category=${props.category}&lang=en&country=${props.country}&apikey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`

    let data = await fetch(url);
    let parsdata = await data.json()
    setarticles(articles.concat(parsdata.articles ?parsdata.articles : []))
    settotalResult(parsdata.totalArticles || 0)
    console.log(parsdata);
   
  };

    return (
      <div>
        <h1 className='text-center' style={{ margin: '35px 0px' }}>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {loading && <Spinner />}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
        >
          <div className='container'>
            <div className="row">
              {Array.isArray(articles) && articles.map((element) => {
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
 News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }

  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }

export default News
