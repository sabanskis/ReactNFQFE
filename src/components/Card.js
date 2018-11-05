import React from 'react';
import { getImageUrl } from '../../config';

export default class Card extends React.Component {
  constructor() {
    super();

    this.state = {
      opened: false,
      hearthIdArray: []
    };

  }



  toggleSummary = () => {
    const { opened } = this.state;

    this.setState({
      opened: !opened,
    });
  };

  render() {
    const {
      movie: {
        backdrop_path,
          id,
        original_title,
        overview,
        release_date,
        vote_average,
        vote_count,
      },
        hearthIdArray,
        handleAddRemoveLike

    } = this.props;

    //like='fa fa-heart-o' like='fa fa-heart'



    const { opened} = this.state;

    return (
      <div className="card">
        <div
          className="card__image"
          style={{ backgroundImage: `url(${getImageUrl(backdrop_path)})` }}
        />

        <div className="card__title">
          {original_title}
        </div>

        <div className="card__like">
            <i className={hearthIdArray.indexOf(id) > -1 ? "fa fa-heart" : "fa fa-heart-o"}
               onClick={() => handleAddRemoveLike(id)} />
        </div>

        <div className="card__subtitle">
          <span>{release_date}</span>
          <span>{vote_average} ({vote_count} votes)</span>
        </div>

        <div className="card-info">
          <div className="card-info__header" onClick={this.toggleSummary}>
            Summary
          </div>

          {opened
            ? <div className="card-info__description">{overview}</div>
            : null
          }

        </div>
      </div>
    );
  }
}
