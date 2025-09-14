import React  from 'react'

const  NewsItem=(props)=> {
    let { title, description, imageUrl, newsUrl, date, source } = props;
    return (
      <div className='my-3'>
        <div className="card">
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            right: 0
          }}>
            <span class="badge rounded-pill bg-danger" >{source}</span>
          </div>

          <img src={!imageUrl ? "https://cdn.pixabay.com/photo/2015/11/06/12/51/news-1027337_960_720.jpg" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title} </h5>
            <p className="card-text">{description}</p>
            <p class="card-text"><small className='text-Muted'>On:- {new Date(date).toGMTString()}</small></p>
            <a rel='noreferrer' href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Get details</a>
          </div>
        </div>
      </div>
    )
  
}

export default NewsItem


// https://gnews.io/api/v4/top-headlines?category=general&apikey=cba7e059d14603777bb8eeb2af0ed708
//https://gnews.io/api/v4/top-headlines?category=Entertainment&country=us&apikey=cba7e059d14603777bb8eeb2af0ed708