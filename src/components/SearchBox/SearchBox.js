import React, {Component} from 'react';
import './SearchBox.css';

class SearchBox extends Component{
  render(){
    return(
        <input type='text' placeholder='Search....' className="mySearch" onChange={this.props.input} onKeyPress={this.props.search}/>
    );
  }
}

export default SearchBox;
