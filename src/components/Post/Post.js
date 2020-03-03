import React from 'react';
import StarRating from 'react-star-rating-component';

import './Post2.css';
import './Post1.css';

const post = (props) => (
    <article className={props.style} onClick={props.clicked}>
        <div className="imgBox">
            <img src={props.info.image_url}/>
        </div>
        <div className="Details">
            <div className="content">
                <h3>{props.info.title}</h3>
                <StarRating
                      name="rate2"
                      editing={false}
                      starCount={5}
                      value={(props.info.score)/2}
                      emptyStarColor={'black'}
                    />
                <hr></hr>
                <p>Rank : {props.info.rank}</p>
                <p>No. of episodes : {props.info.episodes}</p>
            </div>
        </div>
    </article>
);

export default post;
