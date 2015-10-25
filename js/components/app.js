var App = React.createClass({
	getSelection: function() {
		return this._selection;
	},

	getPlayer: function() {
		return this._player;
	},

	render: function() {
		var player = <Player subsonic={this.props.subsonic} ref={(c) => this._player = c} />;

		var playlists = <PlaylistManager subsonic={this.props.subsonic} player={this.getPlayer} iconSize="20" />;
		var selection = <Selection subsonic={this.props.subsonic} player={this.getPlayer} iconSize="30" ref={(c) => this._selection = c} />;

		var artistList = <ArtistList subsonic={this.props.subsonic} iconSize="30" selection={this.getSelection} />;

		var tabs = [];
		tabs.push({id:"selection", title: "Selection", active: true});
		tabs.push({id:"playlists", title: "Playlists"});
		tabs.push({id:"playing", title: "Playing"});

		var tabGroup = <TabGroup tabs={tabs} iconSize="20" />;

		return (
			<div>
				<div id="browser-frame">
					<div id="artistList">{artistList}</div>
				</div>
				<div id="player-frame">{player}</div>
				<div id="playlist-frame">
					<div id="playlist-menu">{tabGroup}</div>
					<div id="playlist-content">
						<div id="playlist-selection" data-tab="selection" className="ui active tab">{selection}</div>
						<div id="playlist-playlists" data-tab="playlists" className="ui tab">{playlists}</div>
						<div id="playlist-playing" data-tab="playing" className="ui tab"></div>
					</div>
				</div>
			</div>
		);
	}
});