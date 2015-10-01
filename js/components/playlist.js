var PlaylistManager = React.createClass({
	getInitialState: function() {
		return {playlists: [], playlist: []};
	},

	componentDidMount: function() {
		this.loadPlaylists();
	},

	loadPlaylists: function() {
		this.props.subsonic.getPlaylists({
			success: function(data) {
				this.setState({playlists: data.playlists});
			}.bind(this),
			error: function(status, err) {
				console.error(this, status, err.toString());
			}.bind(this)
		});
	},

	loadPlaylist: function(id) {
		this.props.subsonic.getPlaylist({
			id: id,
			success: function(data) {
				this.setState({playlist: data.playlist});
			}.bind(this),
			error: function(status, err) {
				console.error(this, status, err.toString());
			}.bind(this)
		});
	},

	render: function() {
		//var hash = 1;
		//this.state.playlists.map(function (playlist) {
		//	hash += 31 * playlist.id;
		//});

		return (
			<div>
				<PlaylistSelector subsonic={this.props.subsonic} playlists={this.state.playlists} iconSize={this.props.iconSize} selected={this.loadPlaylist} />
				<Playlist subsonic={this.props.subsonic} iconSize={this.props.iconSize} playlist={this.state.playlist} />
			</div>
		);
	}
});


var PlaylistSelector = React.createClass({
	componentDidMount: function() {
		var _this = this;
		$('.playlistSelector').dropdown({
			action: 'activate',
			onChange: function(value, text, $selectedItem) {
				_this.props.selected(value);
			}
		});
	},

	render: function() {
		var _this = this;
		var playlists = this.props.playlists.map(function (playlist) {
			return (
				<PlaylistSelectorItem key={playlist.id} subsonic={_this.props.subsonic} data={playlist} iconSize={_this.props.iconSize} />
			);
		});

		return (
			<div className="ui fluid selection dropdown playlistSelector">
				<i className="dropdown icon"></i>
				<div className="default text">Playlists...</div>
				<div className="menu">
					{playlists}
				</div>
			</div>
		);
	}
});

var PlaylistSelectorItem = React.createClass({
	render: function() {
		return (
			<div className="item" data-value={this.props.data.id}>
				<CoverArt subsonic={this.props.subsonic} id={this.props.data.coverArt} size={this.props.iconSize} />
				<span className="description">{this.props.data.songCount} tracks, {this.props.data.duration.asTime()}</span>
				<span className="text">{this.props.data.name}</span>
			</div>
		);
	}
})

var Playlist = React.createClass({
	render: function() {
		var _this = this;
		var playlist = this.props.playlist.map(function (entry) {
			return (
				<PlaylistItem key={entry.id} subsonic={_this.props.subsonic} data={entry} iconSize={_this.props.iconSize} />
			);
		});

		return (
			<table className="ui selectable single line very basic compact table">
				<thead>
					<tr>
						<th>#</th>
						<th>Artist</th>
						<th>Title</th>
						<th>Album</th>
						<th>Date</th>
						<th>Duration</th>
					</tr>
				</thead>
				<tbody>
					{playlist}
				</tbody>
			</table>
		);
	}
});

var PlaylistItem = React.createClass({
	render: function() {
		return (
			<tr>
				<td>
					{this.props.data.track}
				</td>
				<td>
					{this.props.data.artist}
				</td>
				<td>
					{this.props.data.title}
				</td>
				<td>
					{/* <CoverArt subsonic={this.props.subsonic} id={this.props.data.coverArt} size={this.props.iconSize} /> */}
					{this.props.data.album}
				</td>
				<td>
					{this.props.data.year}
				</td>
				<td>
					{this.props.data.duration.asTime()}
				</td>
			</tr>
		);
	}
});