/*global swal*/

import React from 'react';
import logo from './logo.svg';
import loading from './loading.svg';
import './App.css';
import Sound from 'react-sound';
import Button from './Button';
import { useState } from 'react';
import { useEffect } from 'react';


const apiToken = 'BQDZD8fYQhT9meGX4OKEcvjSaWJC8v3yX9VkUXq3AmfvcY42uXp2yyxWndSGY2FOUhakF2GkY-WhNvdcCE-cp-pvX7zhjKtJcfUqrAZUHxRbkHgS9c-7Q8Dohd8XXlKyxEX57sxyzS2jvKzW3k-T5Ifn8vdTGUmQnA';

function shuffleArray(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = getRandomNumber(counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

/* Return a random number between 0 included and x excluded */
function getRandomNumber(x) {
  return Math.floor(Math.random() * x);
}

const App = () => {

  const [songsLoaded, setSongsLoaded] = useState(false);
  const [text, setText] = useState('');
  const[tracks, setTracks] = useState([]);
  const i = getRandomNumber(20);

  const button0 = tracks[0];
  const button1 = tracks[1];
  const button2 = tracks[2];



  useEffect(() => {fetch('https://api.spotify.com/v1/me/tracks', {
    method: 'GET',
    headers: {
     Authorization: 'Bearer ' + apiToken,
    },
  })
    .then(response => response.json())
    .then((data) => {
      console.log("Réponse reçue ! Voilà ce que j'ai reçu : ", data);
      setTracks(data["items"]);
      setSongsLoaded(true);

    })}, []);

  if (songsLoaded){
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <h1 className="App-title">Bienvenue sur le Blindtest</h1>
      </header>
      <div className="App-images">
        <p>{tracks[0].track.name}</p>
        <AlbumCover track = {tracks[0].track} />
        <Sound url={tracks[0].track.preview_url} playStatus={Sound.status.PLAYING} muted={true}/>

      </div>
      <div className="App-buttons">
      <Button onClick={doSomething}>{button0.track.name}</Button>
      <Button onClick={doSomething}>{button1.track.name}</Button>
      <Button onClick={doSomething}>{button2.track.name}</Button>
      </div>
    </div>
    );
  }
  else {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Bienvenue sur le Blindtest</h1>
        </header>
        <div className="App-images">
          <img src={loading} className="App-logo" alt="logo"/>
        </div>
        <div className="App-buttons">
        </div>
      </div>
      );
  }
}

const AlbumCover = (props) =>  {
  const t = props.track;
  const src = t.album.images[0].url;
  return (
      <img src={src} style={{ width: 400, height: 400 }} />
  );
}

export default App;