import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

// import { Spinner } from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component'


export class News extends Component {
  static defaultProps = {
    pageSize: 6,
    country: "in",
    category: "sports",
  };

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  };

  capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  constructor(props) {
    super(props);
    console.log("kiki do you love me!!");
    this.state = {
      // articles : this.articles,
      articles: [],
      loading: false,
      page: 1,
      // totalResults:0
    };
    document.title = `${this.capitalize(this.props.category)}-NewsMonkey`;
  }

  async updateNews() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=04507dff2d414be99308565e37719f2a&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    this.props.setProgress(20);
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(60);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
    // this.props.setProgress(0);
  }
  async componentDidMount() {
    //run after render
    this.updateNews();
  }

  fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=04507dff2d414be99308565e37719f2a&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;
    this.setState({
      // loading: true,
      page: this.state.page + 1,
    });
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };
  // handlePrevClick = async () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };

  // handleNextClick = async () => {
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // };

  render() {
    let urll =
      "https://smartmania.cz/wp-content/uploads/2023/04/Tesla_Cybetruck_production_line-e1681973397339.webp";
    return (
      <>
        <h1 className="text-center" style={{ margin: "40px 0px" }}>
          News Monkey - Top {this.capitalize(this.props.category)} Headlines
        </h1>
        {/* {this.state.loading && <Spinner />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          // hasMore={this.state.articles.length < this.state.totalResults}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
          endMessage={
          <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
          </p>
          }
        >
          <div className="container">
            <div className="row ">
              { this.state.articles &&
                this.state.articles.map((element) => {
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
            disabled={this.state.page <= 1}
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &laquo; Prev
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
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
}

export default News;
