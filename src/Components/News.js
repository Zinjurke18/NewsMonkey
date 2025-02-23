import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class News extends Component {
  // articles = [
  //   {
  //     source: {
  //       id: null,
  //       name: "Android Central",
  //     },
  //     author: "techkritiko@gmail.com (Jay Bonggolto)",
  //     title:
  //       "Some Galaxy S25 users start seeing an iPhone-style battery feature pop up",
  //     description:
  //       "Samsung's latest flagship series now lets you check battery health, cycle count, and first use date right in the settings.",
  //     url: "https://www.androidcentral.com/phones/some-galaxy-s25-users-start-seeing-an-iphone-style-battery-feature-pop-up",
  //     urlToImage:
  //       "https://cdn.mos.cms.futurecdn.net/h4DN52fjNosqvefN8NCbFk-1200-80.jpg",
  //     publishedAt: "2025-01-24T12:13:25Z",
  //     content:
  //       "What you need to know\r\n<ul><li>The Galaxy S25 series introduces a new battery health feature, showing stats like health percentage, cycle count, and device manufacturing details in the settings.</li>… [+2586 chars]",
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "MacRumors",
  //     },
  //     author: "Hartley Charlton",
  //     title: "Apple Announces New In-App Purchase API",
  //     description:
  //       'Apple yesterday announced a new API to expand in-app purchase capabilities on the App Store, providing developers with new ways to support large content catalogs, creator-driven experiences, and customizable subscription models.\n\n\n\n\n\n\n\nThe new "Advanced Comme…',
  //     url: "https://www.macrumors.com/2025/01/24/apple-announces-new-in-app-purchase-api/",
  //     urlToImage:
  //       "https://images.macrumors.com/t/fvnq7lgIjn-BQ5WsIW1FtaA-BEg=/2250x/article-new/2022/01/iOS-App-Store-General-Feature-Black.jpg",
  //     publishedAt: "2025-01-24T12:37:31Z",
  //     content:
  //       "Apple yesterday announced a new API to expand in-app purchase capabilities on the App Store, providing developers with new ways to support large content catalogs, creator-driven experiences, and cust… [+1368 chars]",
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "MacRumors",
  //     },
  //     author: "Juli Clover",
  //     title:
  //       "Apple Releases Safari Technology Preview 212 With Bug Fixes and Performance Improvements",
  //     description:
  //       "Apple today released a new update for Safari Technology Preview, the experimental browser that was first introduced in March 2016. Apple designed ‌Safari Technology Preview‌ to allow users to test features that are planned for future release versions of the S…",
  //     url: "https://www.macrumors.com/2025/01/23/apple-releases-safari-technology-preview-212/",
  //     urlToImage:
  //       "https://images.macrumors.com/t/gSfA9gdPJTtAYv_7hjK9YByevcM=/2500x/article-new/2024/07/Safari-Technology-Preview-Updated-Feature-1.jpg",
  //     publishedAt: "2025-01-24T01:33:25Z",
  //     content:
  //       "Apple today released a new update for Safari Technology Preview, the experimental browser that was first introduced in March 2016. Apple designed ‌Safari Technology Preview‌ to allow users to test fe… [+1007 chars]",
  //   },
  //   {
  //     source: {
  //       id: null,
  //       name: "MacRumors",
  //     },
  //     author: "Tim Hardwick",
  //     title: "5 New Things Your iPhone Can Do in iOS 18.3",
  //     description:
  //       "Apple is set to release iOS 18.3 next week, bringing further refinements to Apple Intelligence features, a couple of neat new capabilities to iPhone 15 Pro and iPhone 16 devices, and bug fixes.\n\n\n\n\n\nWhile not quite as packed with new features as Apple's prece…",
  //     url: "https://www.macrumors.com/2025/01/24/5-new-things-your-iphone-can-do-ios-18-3/",
  //     urlToImage:
  //       "https://images.macrumors.com/t/RFNKlTK34SF7U8WN2D1tTAfxngA=/2500x/article-new/2025/01/iOS-18.3-Everything-New-Feature.jpg",
  //     publishedAt: "2025-01-24T09:55:06Z",
  //     content:
  //       "Apple is set to release iOS 18.3 next week, bringing further refinements to Apple Intelligence features, a couple of neat new capabilities to iPhone 15 Pro and iPhone 16 devices, and bug fixes.\r\nWhil… [+2761 chars]",
  //   },
  // ];
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1,
    }
  }
  async componentDidMount() {
    let url =
      `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=597add6f04bb4093aa4b8df71b515c1e&page=1&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
      let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles,totalResults:parsedData.totalResults,loading:false});
  }
  handlePrevClick = async()=>{
    let url =
      `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=597add6f04bb4093aa4b8df71b515c1e&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true})
      let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      page:this.state.page - 1,
      articles: parsedData.articles ,loading:false
    })
  }
  handleNextClick = async()=>{
    console.log("next click")
    if(! (this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
      let url =
      `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=597add6f04bb4093aa4b8df71b515c1e&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
      let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      page:this.state.page + 1,
      articles: parsedData.articles 
    })

    }
    
  }
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">NewsMonkey - Top Headlines</h1>
        {this.state.loading && <Spinner/>}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" onClick={this.handlePrevClick} className="btn btn-dark">
              &larr; Previous
            </button>
            <button disabled ={ this.state.page + 1 > Math.ceil(this.state.totalResults/24)} type="button" onClick={this.handleNextClick} className="btn btn-dark">
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
