import React from 'react';
import axios from 'axios';
import MediaSession from '@mebtte/react-media-session';
import { Link } from 'react-router-dom';
import config from '../config';


export default class PlayScreen extends React.Component {
    state = {
        song: [],
        lyrics: [],
    }

    constructor(props) {
        super(props);
        this.state = { searchQuery: '' };
    }

    myChangeHandler = (event) => {
        this.setState({ searchQuery: event.target.value });
    }

    componentDidMount() {
        document.title = "Musicder | Listen or Download Music For Free"
    }

    lyricsHandle = this.lyricsHandle.bind(this)

    lyricsHandle() {
        axios.get(`${config.API_URL}/lyrics?id=${this.props.match.params.id}`)
            .then(res => {
                var lyric = res.data.lyrics;
                this.setState({
                    lyrics: <div className="playlyricsdiv">
                        <p className="playlyricsheading">
                            Lyrics
                        </p>
                        <div className="playlyrics">{lyric.split('<br>').map((line) => (
                            <p className="playline">{line}</p>
                        ))}</div>
                    </div>
                })
            })
    }

    componentDidMount() {
        axios.get(`https://jiosaavn-api.vercel.app/song?id=${this.props.match.params.id}`)
            .then(res => {
                var song = res.data;
                this.setState({ song });
                if (song.result === "false") {
                    document.title = `Error | Musicder`
                } else {
                    document.title = `${song.song} by ${song.singers} | Musicder`
                }
            })
    }

    render() {
        if (this.state.song.result === "false") {
            return (
                <div className="errres">
                    <div className="mainerr">
                        <p className="errtxt">
                            Sorry Nothing Found Please Search
                       </p>
                        <Link to={'../'}>
                            <p className="activityb errsc">Search</p>
                        </Link>
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="playhead">
                        <h1 className="playheadplay">Play</h1>
                        <Link to="../">
                            <img alt="Musicder" src="../img/t-logo.svg" className="playlogobtn" width="60" height="60" />
                        </Link>
                    </div>
                    <div className="playcontent"><br /><br />
                        <img src={this.state.song.image} alt={this.state.song.song} className="playimage" width="75%" />
                        <h1 className="playsongname">{this.state.song.song}</h1>
                        <p className="playsongby">{this.state.song.singers}</p>
                        <audio src={this.state.song.media_url} id="audiocontrols" className="playsong" controls />
                        {this.state.song.has_lyrics === "true" ? <div className="playlyricsinit">
                            <p onClick={this.lyricsHandle} className="playlyricsask">
                                Lyrics
                            </p>
                        </div> : <br />}
                        <br /><br />
                    </div>
                    <div>
                        {this.state.lyrics}
                    </div>
                    <div className="formdivt">
                    <form onSubmit={this.mySubmitHandler}>
                        <div className="inner-form">
                            <div className="input-field first-wrap">
                                <div className="svg-wrapper">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                        <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
                                    </svg>
                                </div>
                                <input type="text" placeholder="Search for Songs, Albums" onChange={this.myChangeHandler} />
                            </div>
                            <div className="input-field second-wrap">
                                <Link to={`search?query=${this.state.searchQuery}`}>
                                    <button className="btn-search" type="button">SEARCH</button>
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
                
                    <div className="footer">
                        <h1 className="playlogo">NJ7 music</h1> <br />
                        <a className="atextdec" href={`https://github.com/cachecleanerjeet`}>
                            <p className="playparagone" >An Open Source Project by Tuhin</p>
                        </a><br />
                        <a href={`https://github.com/cachecleanerjeet/Musicder`}>
                            <img alt="Github" className="center" src="../img/github-black.svg" width="30" height="30" /><br />
                        </a>
                    </div>
                    <MediaSession
                        title={this.state.song.song}
                        artist={this.state.song.singers}
                        album={this.state.song.album}
                        artwork={[
                            {
                                src: `${this.state.song.image}`,
                                sizes: '500x500',
                                type: 'image/jpeg',
                            },
                        ]}>
                    </MediaSession>
                </div>
            )
        }
    }
}
