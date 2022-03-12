import { Component } from 'react';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

import './randomChar.sass';
import mjolnir from '../../resources/img/mjolnir.png';


class RandomChar extends Component {
    constructor (props) {
        super(props);
    }

    state = {
        char: {},
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChar();
    }

    componentWillUnmount() {

    } 

    onCharLoaded = (char) => {
        this.setState({
            char, 
            loading: false
        });     
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        });     
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);

        this.marvelService
            .getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    onTryIt = () => {
        this.onCharLoading();
        this.updateChar();
    }



    render() {
        const {char, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View char={char} /> : null;
                
        return (
            <div className="randomchar">
                { errorMessage }
                { spinner }
                { content }
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main"
                        onClick={this.onTryIt}
                    >
                        <div className="inner">Try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir"
                    className="randomchar__decoration" />           
                </div>
            </div>
        )
    }    
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki} = char;
    const clazz = (thumbnail === 'image_not_available.jpg') ? {'objectFit': 'contain'} : {'objectFit': 'cover'};

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character"
            className={`randomchar__img ${clazz}`}
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>                
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main" target="_blank">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary" target="_blank">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}


export default RandomChar;