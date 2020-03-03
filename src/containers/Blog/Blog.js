import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import SearchBox from '../../components/SearchBox/SearchBox';
import './Blog.css';
import axios from 'axios';
import { Carousel } from 'react-responsive-carousel';
// general styles
import "react-responsive-carousel/lib/styles/carousel.min.css";

class Blog extends Component {
  state = {
    posts : [],
    postSelected:null,
    searched:"",
    postSearched:[],
    slide:[0,7,14,21,28,35,42]
  }

  componentDidMount(){
    axios.get('https://api.jikan.moe/v3/top/anime/1/bypopularity')
         .then(response=>{
           this.setState({posts:response.data.top});
           console.log(response.data.top);
         });
  }

  selectedPost = (id) =>{
    this.setState({postSelected:id});
  }

  searchedPost = (e) => {
    if(e.key==="Enter"){
      axios.get('https://api.jikan.moe/v3/search/anime?q='+this.state.searched)
           .then(response=>{
            this.setState({postSearched:response.data.results});
             console.log(response.data.results);
           });
    }
  }

  handleInput = (e) => {
    let s=e.target.value;
    this.setState({searched:s});
  }

    render () {

      const slider = this.state.slide.map(i=>{
        const topPosts = this.state.posts.slice(i,i+7).map(post=>{
            return <Post
                        style="Post"
                        key={post.mal_id}
                        info={post}
                        clicked={()=>this.selectedPost(post.mal_id)}/>
        });

        return(
          <div className="New">
              {topPosts}
          </div>
        );
      });

      const topPosts = this.state.posts.slice(0,7).map(post=>{
          return <Post
                      style="Post"
                      key={post.mal_id}
                      info={post}
                      clicked={()=>this.selectedPost(post.mal_id)}/>
      });

      const newTopPosts = this.state.posts.slice(9,16).map(post=>{
          return <Post
                      style="Post"
                      key={post.mal_id}
                      info={post}
                      clicked={()=>this.selectedPost(post.mal_id)}/>
      });

      const topSearch = this.state.postSearched.slice(0,7).map(post=>{
          return <Post
                      style="Top"
                      key={post.mal_id}
                      info={post}
                      clicked={()=>this.selectedPost(post.mal_id)}/>
      });

        return (
            <div>
                <section>
                    <Carousel className="Slider" showArrows={true} showThumbs={false} centerMode={true} >
                        {slider}
                    </Carousel>
                </section>
                <section>
                    <FullPost id={this.state.postSelected}/>
                </section>
                <section className="Search">
                    <SearchBox
                        input={this.handleInput}
                        search={this.searchedPost}/>
                    <div className="Result">
                        {topSearch}
                    </div>
                </section>
            </div>
        );
    }
}

export default Blog;
