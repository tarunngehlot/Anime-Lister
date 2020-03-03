import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {

    state = {
      loadedPost:[],
      loadedPictures:[]
    }

    componentDidUpdate(){
      if(this.props.id){
        if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.mal_id!==this.props.id)){
          axios.get('https://api.jikan.moe/v3/anime/'+this.props.id)
               .then(response=>{
                 this.setState({loadedPost:response.data})
                 console.log(response);
               });

          axios.get('https://api.jikan.moe/v3/anime/'+this.props.id+'/pictures')
                .then(response=>{
                  this.setState({loadedPictures:response.data.pictures});
                });
        }
      }
    }

    render () {
        let post = (
          <div>
              <p style={{textAlign:'center', opacity:0}}>Please select a Post!</p>
          </div>
        );

        if(this.props.id){
            post = <p style={{textAlign:'center'}}>Loading.....!</p>;
        }
        if(this.state.loadedPictures.length!==0){
          post = (
              <div className="FullPost">
                  <div className="Left">
                      <img src={this.state.loadedPictures[2].large}/>
                  </div>
                  <div className="content">
                      <h1><u>{this.state.loadedPost.title_english}</u></h1>
                      <p>{this.state.loadedPost.synopsis.slice(0,300)}..........<a href={this.state.loadedPost.url}>Read More</a></p>
                  </div>
                  <div className="Right">
                      <img src={this.state.loadedPictures[0].large}/>
                  </div>
              </div>
            );
        }

        return(
          <div>
            {post}
          </div>
        );
    }
}

export default FullPost;
