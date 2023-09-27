import React, { useEffect , useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component'


const  News= (props)=>{

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)  
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(articles.length)

  const   capitalize = (str) => {    return str.charAt(0).toUpperCase() + str.slice(1);};

  // document.title = `${this.capitalize(props.category)}-NewsMonkey`;
  

  const updateNews= async ()=> {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=04507dff2d414be99308565e37719f2a&page=${page}&pagesize=${props.pageSize}`;
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page}&pagesize=${props.pageSize}`;
    // setLoading(true);
    props.setProgress(20);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedData = await data.json();
    props.setProgress(60);
    setArticles(parsedData.articles)
    setTotalResults(parsedData.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  //run after render
  useEffect(()=>{
    updateNews();
  },[])


  const fetchMoreData = async () => {
    setPage(page+1)
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=04507dff2d414be99308565e37719f2a&page=${page}&pagesize=${props.pageSize}`;
    // let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page}&pagesize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults)
    setLoading(false);
  };

  //   const handlePrevClick = async () => {
  //   setPage(page-1)
  //   updateNews();
  // };

  // const handleNextClick = async () => {
  //   setPage(page+1)
  //   updateNews();
  // };

    let urll =
      "https://smartmania.cz/wp-content/uploads/2023/04/Tesla_Cybetruck_production_line-e1681973397339.webp";
    return (
      <>
        <h1 className="text-center" style={{ margin: "40px 0px" ,     marginTop: "81px" }}>
          News Monkey - Top {capitalize(props.category)} Headlines
        </h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          // hasMore={this.state.articles.length < this.state.totalResults}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />}
          endMessage={
          <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
          </p>
          }
        >
          <div className="container">
            <div className="row ">
              { articles &&
                articles.map((element) => {
                  return (
                    <div className="col-md-4" key={element.url}>
                      <NewsItem
                        title={element.title ? element.title : ""}
                        source={element.source.name}
                        author={element.author ? element.author : "Unknown"}
                        publishedAt={
                          element.publishedAt ? element.publishedAt : ""
                        }
                        description={
                          element.description ? element.description : ""
                        }
                        imageUrl={
                          element.urlToImage ? element.urlToImage : urll
                        }
                        newsUrl={element.url}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
          {/* <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &laquo; Prev
          </button>
          <button
            type="button"
            disabled={
              page + 1 >
              Math.ceil(totalResults / props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &raquo;
          </button>
        </div> */}


        </InfiniteScroll>
      </>
    );
}

News.defaultProps = {
    pageSize: 6,
    country: "in",
    category: "general",
  }
  
  News.propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  }

export default News;


