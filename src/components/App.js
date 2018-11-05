import React from 'react';
import axios from 'axios';
import Card from './Card';
import { endpoints } from '../../config';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
        movieList: [],
        genresList: [],
        genreMovies: [],
        hearthIdArray: [],

  };

    this.requestMovies();
    this.requestGenres();
    this.requestGenreMovies();
  }

  requestMovies = () => {
    axios
      .get(endpoints.mostPopularMovies())
      .then((res) => this.setMovieList(res.data.results))
      .catch((error) => console.log(error));
  };

  setMovieList = (movieList) => {
    this.setState({
      movieList,
    })
  };

    requestGenres = () => {
        axios
            .get(endpoints.genres())
            .then((res) => this.setGenresList(res.data.genres))
            .catch((error) => console.log(error));
    };

    setGenresList = (genresList) => {
        this.setState({
            genresList,
        })
    };

    requestGenreMovies = (id) => {
        axios
            .get(endpoints.genreMovies(id))
            .then((res) => this.setMovieList(res.data.results))
            .catch((error) => console.log(error));
    };


    showGenre = ({ id, name }) => {
        return (
            <div className="genre" key={id} onClick={() => this.requestGenreMovies(id)}>{name} </div>
        );
    };

    handleAddRemoveLike = (id) => {
        const { hearthIdArray } = this.state;
        let index = hearthIdArray.indexOf(id);
        if(index !== -1){
            hearthIdArray.splice(index, 1)
        }else{
            hearthIdArray.push(id)
        }
        this.setState({
            hearthIdArray: hearthIdArray,
        });

    };


  render() {
    const { movieList, genresList, hearthIdArray } = this.state;

    return (
        <div>
            <div className="genres">
                {genresList.map(this.showGenre)}
            </div>
          <div className="cards">
          {movieList.map((movie) =>
              <Card movie={movie}
                    handleAddRemoveLike={this.handleAddRemoveLike}
                    key={movie.id}
                    hearthIdArray={hearthIdArray}
              />)}

          </div>
        </div>
    );
  }
}
