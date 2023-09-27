import React from 'react'

const NewsItem  = (props)=>{
     let {title,description,imageUrl,newsUrl,publishedAt,author,source} = props;
    return (
      <div>
          <div className="card my-3" >
          <img src={imageUrl} className="card-img-top" alt="Not found" />
            <div className="card-body">
            <span className="position-absolute top-0  translate-middle badge rounded-pill bg-dark" style={{left:'90%',zIndex:'1'}}>{source}</span>
              <h5 className="card-title">{title}...</h5>
              <p className="card-text">{description}...</p>
              <p className="card-text"><small className=" text-danger">By {author} on {new Date(publishedAt).toGMTString()}</small></p>
              <a href={newsUrl} rel="noreferrer" target="_blank" className="btn btn-sm btn-dark">Read More...</a>
            </div>
          </div>
      </div>
    )
}

export default NewsItem
