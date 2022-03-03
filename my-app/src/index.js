import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import 'semantic-ui-css/semantic.min.css';
import { Header, Menu, Container, Dropdown, Icon, Grid, GridRow, Button} from 'semantic-ui-react';
import * as words from './word-bank.json';

const wordBank = words;
let keyWord = wordBank.valid[Math.floor(Math.random() * wordBank.valid.length)];
keyWord = keyWord.toUpperCase();
let guessedLetters = [];

class TopMenu extends  React.Component {

  render() {
    return(
      <Menu borderless className='topmenu'>
        <Grid container centered>
        <Grid.Row columns='three'>
          <Grid.Column>
            <Icon name="bars" size='large'/>
            <Icon name="question circle outline" size='large'/>
          </Grid.Column>

          <Grid.Column>
            <Header textAlign='center' size='huge'>WORDLE</Header>
          </Grid.Column>

          <Grid.Column textAlign='right'>
            <Icon name="chart bar" size='large'/>
            <Icon name="cog" size='large'/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      </Menu>
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGuess: '',
      word1: '',
      word2: '',
      word3: '',
      word4: '',
      word5: '',
      word6: '',
      currentWord: 'word1',
      currentMessage: 'I\'ll let you know what\'s up'
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', (e) => this.handleKey(e));
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', (e) =>this.handleKey(e));
  }

  handleClick = () => {
    console.log(setColors('AEIOU'));
  }

  handleKey = (e) => {
    if((e.keyCode >= 65 && e.keyCode <= 90)) {
      this.submitLetter(e.key.toString().toUpperCase());
    }

    if(e.key == "Enter"){
      this.submitWord(this.state.currentGuess);
    }

    if(e.key == "Backspace"){
      this.deleteLetter()
    }
  }

  submitLetter = (l) => {
    if(this.state.currentGuess.length >= 5){
      return;
    }
    this.setState({currentGuess: this.state.currentGuess + l});
    let key = this.state.currentWord;
    this.setState({ [key] : this.state.currentGuess});
  }


  submitWord = (word) => {
    let currentWord = this.state.currentWord;
    let num = currentWord.charAt((currentWord.length) - 1);
    if(word.length != 5){
      console.log("nope");
      return;
    }

    if(currentWord == "word6"){
      console.log("endgame");
      return;
    }

    if(isValidWord(this.state.currentGuess)){
      let key = this.state.currentWord;
      this.setState({ [key] : this.state.currentGuess + setColors(this.state.currentGuess)});
      num++;
      currentWord = "word" + num;
      this.setState( {currentWord: currentWord});
      this.setState({currentGuess: ''});
    }else{
      this.setState({currentMessage: this.state.currentGuess + ' is not a valid word'});
    }

  }

  deleteLetter = () => {
    if(this.state.currentGuess.length >= 0){
      let word = this.state.currentGuess;
      this.setState({currentGuess: word.substring(0, word.length - 1)});
    }
    let key = this.state.currentWord;
    this.setState({ [key] : this.state.currentGuess});
  }

  render() {
    return (
      <Container>
        <div className='wordrow'>
          <Tile tileType={letterToClass(this.state.word1[5])} displayedLetter={this.state.word1[0]} />
          <Tile tileType={letterToClass(this.state.word1[6])} displayedLetter={this.state.word1[1]}/>
          <Tile tileType={letterToClass(this.state.word1[7])} displayedLetter={this.state.word1[2]}/>
          <Tile tileType={letterToClass(this.state.word1[8])} displayedLetter={this.state.word1[3]}/>
          <Tile tileType={letterToClass(this.state.word1[9])} displayedLetter={this.state.word1[4]}/>
        </div>
        <div className='wordrow'>
          <Tile tileType={letterToClass(this.state.word2[5])} displayedLetter={this.state.word2[0]} />
          <Tile tileType={letterToClass(this.state.word2[6])} displayedLetter={this.state.word2[1]}/>
          <Tile tileType={letterToClass(this.state.word2[7])} displayedLetter={this.state.word2[2]}/>
          <Tile tileType={letterToClass(this.state.word2[8])} displayedLetter={this.state.word2[3]}/>
          <Tile tileType={letterToClass(this.state.word2[9])} displayedLetter={this.state.word2[4]}/>
        </div>
        <div className='wordrow'>
          <Tile tileType={letterToClass(this.state.word3[5])} displayedLetter={this.state.word3[0]} />
          <Tile tileType={letterToClass(this.state.word3[6])} displayedLetter={this.state.word3[1]}/>
          <Tile tileType={letterToClass(this.state.word3[7])} displayedLetter={this.state.word3[2]}/>
          <Tile tileType={letterToClass(this.state.word3[8])} displayedLetter={this.state.word3[3]}/>
          <Tile tileType={letterToClass(this.state.word3[9])} displayedLetter={this.state.word3[4]}/>
        </div>
        <div className='wordrow'>
          <Tile tileType={letterToClass(this.state.word4[5])} displayedLetter={this.state.word4[0]} />
          <Tile tileType={letterToClass(this.state.word4[6])} displayedLetter={this.state.word4[1]}/>
          <Tile tileType={letterToClass(this.state.word4[7])} displayedLetter={this.state.word4[2]}/>
          <Tile tileType={letterToClass(this.state.word4[8])} displayedLetter={this.state.word4[3]}/>
          <Tile tileType={letterToClass(this.state.word4[9])} displayedLetter={this.state.word4[4]}/>
        </div>
        <div className='wordrow'>
          <Tile tileType={letterToClass(this.state.word5[5])} displayedLetter={this.state.word5[0]} />
          <Tile tileType={letterToClass(this.state.word5[6])} displayedLetter={this.state.word5[1]}/>
          <Tile tileType={letterToClass(this.state.word5[7])} displayedLetter={this.state.word5[2]}/>
          <Tile tileType={letterToClass(this.state.word5[8])} displayedLetter={this.state.word5[3]}/>
          <Tile tileType={letterToClass(this.state.word5[9])} displayedLetter={this.state.word5[4]}/>
        </div>
        <div className='wordrow'>
          <Tile tileType={letterToClass(this.state.word6[5])} displayedLetter={this.state.word6[0]} />
          <Tile tileType={letterToClass(this.state.word6[6])} displayedLetter={this.state.word6[1]}/>
          <Tile tileType={letterToClass(this.state.word6[7])} displayedLetter={this.state.word6[2]}/>
          <Tile tileType={letterToClass(this.state.word6[8])} displayedLetter={this.state.word6[3]}/>
          <Tile tileType={letterToClass(this.state.word6[9])} displayedLetter={this.state.word6[4]}/>
        </div>

        <Button onClick={this.handleClick}>
          Test Button
        </Button>

        <h1>Your guess for {this.state.currentWord} is {this.state.currentGuess}</h1>
        <h1>The Keyword is {keyWord}</h1>
        <h1>{this.state.currentMessage}</h1>

      </Container>
    )
  }
}

function Tile(props){
  return(
    <div className={props.tileType + ' tile'}>
      <h1>{props.displayedLetter}</h1>
    </div>
  );
}

function isValidWord(word){
  return (wordBank.valid.includes(word.toLowerCase()) || wordBank.invalid.includes(word.toLowerCase()));
}

function setColors(word){
  let keyWordArray = [];
  let colors = '';
  for(let i = 0; i < 5; i++){
    keyWordArray.push(keyWord[i]);
  }
  for(let i = 0; i < 5; i++){
    let color = 'W';
    if(keyWordArray.includes(word[i])){
      color = 'Y';
    }

    if(word[i] == keyWordArray[i]){
      color = 'G';
    }

    colors += color;
  }
  return colors;
}

function letterToClass(l){
  switch (l){
    case undefined:
      return 'empty';

    case 'W':
      return  'wrong';

    case 'Y':
      return 'almost';

    case 'G':
      return 'correct';
  }
}



class Wordle extends React.Component {

  render() {
    return (
      <>
        <TopMenu />
        <Board />
      </>
    );
  }
}

ReactDOM.render(
  <Wordle/>,
  document.getElementById('root')
);

/// Worlde Logic Functions
function displayWord(word){
  for(let i = 0; i < 5; i++){
    if(word[i] == undefined){
      //display empty tile
    }else{
      //display tile with a letter
    }
  }
}