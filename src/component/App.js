import React, {Component} from 'react';
import Artist from './Artist';
import Tracks from './Tracks';

const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com';
class App extends Component {
  state= { artistQuery: '', artist:null, tracks:[]};
  updateArtistQuery = event => {
    this.setState({artistQuery: event.target.value});
  }
  handleKeyPress = event => {
    if (event.key === 'Enter'){
      this.searchArtist();
    }
  }
  searchArtist = () =>{

    fetch(`${API_ADDRESS}/artist/${this.state.artistQuery}`)
    .then(response => response.json())
    .then(json => {
      if(json.artists.total>0){
        const artist = json.artists.items[0];
        this.setState({artist});
        fetch(`${API_ADDRESS}/artist/${artist.id}/top-tracks`)
        .then(response => response.json())
        .then(json => console.log('tracks json', json))
        .catch(error => alert(error.message));
      }
    })
    .catch(error => alert(error.message));
  } 
  render(){
    return(
      <div>
        <h2>Music-Master</h2>
        <input onChange={this.updateArtistQuery} 
        onKeyPress={this.handleKeyPress}
        placeholder='Search for an Artist' />
        <button onClick={this.searchArtist}>Search</button>
        <Artist artist={this.state.artist} />
        <Tracks tracks={this.state.tracks} />
      </div>
    );
  }
}

export default App;
