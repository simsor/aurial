import { h, Component } from 'preact';
import {UniqueID} from '../util'
import {IconMessage,CoverArt} from './common'
import {Messages} from './app'

export default class ArtistList extends Component {

	state = {
		artists: [],
		loaded: false,
		error: null,
		search: "",
		uid: UniqueID()
	}

	constructor(props, context) {
		super(props, context);

		this.search = this.search.bind(this);
		this.handleReset = this.handleReset.bind(this);

		this.loadArtists();
	}

	componentDidMount() {
		$('#' + this.state.uid).accordion({exclusive: true, animateChildren: false, duration: 200});
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.subsonic != this.props.subsonic) this.loadArtists();
	}

	loadArtists() {
		this.props.subsonic.getArtists({
			success: function(data) {
				this.setState({artists: data.artists, loaded: true, error: null});
			}.bind(this),
			error: function(err) {
				this.setState({error: <IconMessage type="negative" icon="warning circle" header="" message="Failed to load artists. Check settings." />, loaded: true});
				console.error(this, err);
				Messages.message(this.props.events, "Unable to get artists: " + err.message, "error", "warning sign");
			}.bind(this)
		})
	}

	search(e) {
		let query = e.target.value;
		if (e.key == "Backspace") {
			console.log(query);
		}
		if (e.key == "Backspace" && query == "") {
			// Reset everything
			//this.props.events.publish({event: "browserSelected", data: {}})
			this.loadArtists();
		}
		if (e.key != "Enter") {
			return;
		}

		this.props.subsonic.search({
			query: query,
			songCount: 25,
			success: function(result) {
				if(result == undefined) {
					return;
				}

				let fakeAlbum = {
					name: "Search results",
					duration: 0,
					coverArt: "",
					artist: "",
					song: result.song,
					songCount: result.song.length
				}
				this.props.events.publish({event: "browserSelected", data: {tracks: fakeAlbum}})

				let fakeArtist = {
					name: "Album results",
					albums: result.album,
				}
				if (result.artist === null) {
					result.artist = [];
				}
				result.artist.splice(0, 0, fakeArtist);
				this.setState({artists: result.artist, loaded: true, error: null})
			}.bind(this),
			error: function(error) {
				alert(error);
			}
		})

		return false;
	}

	handleReset(e) {
		let query = e.target.value;
		if (query == "") {
			
		}
	}

	render() {
		var artists = this.state.artists
		.map(function (artist) {
			return (
				<Artist key={artist.id} subsonic={this.props.subsonic} events={this.props.events} data={artist} iconSize={this.props.iconSize} />
			);
		}.bind(this));

		if (!this.state.loaded && artists.length == 0) {
			artists = <div className="ui inverted active centered inline loader"></div>
		}

		return this.state.error || (
			<div className="ui inverted basic segment">
				<div className="ui inverted transparent fluid left icon input">
					<i className="search icon"></i>
					<input type="text" placeholder="Search..." onKeyUp={this.search} onChange={this.handleReset}/>
				</div>
				<div className="ui inverted divider"></div>
				<div className="ui inverted fluid accordion" id={this.state.uid}>
					{artists}
				</div>
			</div>
		);
	}
}

export class Artist extends Component {

	state = {
		albums: [],
		loaded: false
	}

	constructor(props, context) {
		super(props, context);

		this.loadAlbums = this.loadAlbums.bind(this);
		this.onClick = this.onClick.bind(this);

		if (this.props.data.albums !== undefined) {
			this.state.albums = this.props.data.albums;
			this.state.loaded = true;
		}
	}

	loadAlbums() {
		this.props.subsonic.getArtist({
			id: this.props.data.id,
			success: function(data) {
				this.setState({albums: data.albums, loaded: true});
			}.bind(this),
			error: function(err) {
				console.error(this, err);
				Messages.message(this.props.events, "Unable to load artist's albums: " + err.message, "error", "warning sign");
			}.bind(this)
		});
	}

	onClick() {
		if (!this.state.loaded) {
			this.loadAlbums();
		}
	}

	render() {
		var albums = this.state.albums.map(function (album) {
			return (
				<Album key={album.id} subsonic={this.props.subsonic} events={this.props.events} data={album} iconSize={this.props.iconSize} />
			);
		}.bind(this));

		if (!this.state.loaded && albums.length == 0) {
			albums = <div className="ui inverted active centered inline loader"></div>
		}

		return (
			<div key={this.props.data.id} onClick={this.onClick} className="artist">
				<div className="title">
					<i className="dropdown icon"></i>
					{this.props.data.name}
				</div>
				<div className="ui secondary inverted segment content">
					<div className="ui inverted tiny selection list">
						{albums}
					</div>
				</div>
			</div>
		);
	}
}

class Album extends Component {

	constructor(props, context) {
		super(props, context);

		this.onClick = this.onClick.bind(this);
	}

	onClick() {
		this.props.subsonic.getAlbum({
			id: this.props.data.id,
			success: function(data) {
				this.props.events.publish({event: "browserSelected", data: {tracks: data.album}});

				// Force the view to go back to "Selection"
				$("a[data-tab=\"selection\"]").trigger("click");
			}.bind(this),
			error: function(err) {
				console.error(this, err);
				Messages.message(this.props.events, "Unable to load album: " + err.message, "error", "warning sign");
			}.bind(this)
		});
	}

	render() {
		var year = this.props.data.year ? '[' + this.props.data.year + ']' : '';
		var description = year;
		if (this.props.data.songCount !== undefined && this.props.data.songCount > 0) {
			description += " " + this.props.data.songCount + " tracks";
		} else {
			description = this.props.data.artist;
		}
		return (
			<div className="item" onClick={this.onClick} title={this.props.data.name}>
				<CoverArt subsonic={this.props.subsonic} id={this.props.data.coverArt} size={this.props.iconSize} />
				<div className="content">
					<div className="header">{this.props.data.name}</div>
					<div className="description">{description}</div>
					<div className="extra">
					</div>
				</div>
			</div>
		);
	}
}
