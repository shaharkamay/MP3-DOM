/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
function playSong(songId) {
    // let songObj = getSong(songId);
    // let songsDiv = document.getElementById('songs');
    // songsDiv.append(createSongElement(songObj));
}

const sortedSongs = sortObjectsArray(player.songs, "title");
const songsDiv = document.getElementById('songs');
const songsTitle = document.createElement('h1');
songsTitle.innerText = "Songs";
songsDiv.append(songsTitle);
for(let song of sortedSongs) {
    const tempSong = {...song};
    tempSong.duration = toMinutes(song.duration);
    songsDiv.append(createSongElement(tempSong));
}

const sortedPlaylist = sortObjectsArray(player.playlists, "name");
const playlistsDiv = document.getElementById('playlists');
const playlistsTitle = document.createElement('h1');
playlistsTitle.innerText = "Playlists";
playlistsDiv.append(playlistsTitle);
for(let playlist of sortedPlaylist) {
    playlistsDiv.append(createPlaylistElement(playlist));
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const song = arguments[0];
    const children = buildSongList(song);
    const classes = ["songUl"];
    const attrs = { onclick: `playSong(${id})`, name: "yosi"  }
    return createElement("ul", children, classes, attrs)
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = buildPlaylistList({name, songs: songs.length, duration: toMinutes(playlistDuration(id))});
    const classes = ["songUl"];
    const attrs = {name: "shimon"};
    return createElement("ul", children, classes, attrs)
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 */
// ["span", "div", "strong", "div"]
// [document.createElement("li"), document.createElement("li"), document.createElement("li"), document.createElement("div"), ]
function createElement(tagName, children = [], classes = [], attributes = {}) {
    const element = document.createElement(tagName);
    for(let child of children) {
        element.append(child);
    }
    element.classList = classes.join(" ");
    for(let attr in attributes) {
        element.setAttribute(attr, attributes[attr]);
    }
    return element;
}
// console.log(createElement("fff", ["a", "b"], ["c", "d"], {name: "blabla"}));

// You can write more code below this line
function buildSongList(song) {
    const list = [];
    for(let key in song) {
        if(key !== "id") {
            if(key !== "coverArt") {
                const li = document.createElement('li');
                li.innerText = `${key}: ${song[key]}`;
                list.push(li);
            } else {
                const img = document.createElement('img');
                img.src = song[key];
                list.push(img);
            }
            
        }
    }
    return list;
}

function buildPlaylistList(playlist) {
    const list = [];
    for(let key in playlist) {
        const li = document.createElement('li');
        li.innerText = `${key}: ${playlist[key]}`;
        list.push(li);
    }
    return list;
}
// let obj = {onclick: 'ggg', name: 'fff'};
// for(let attr in obj) {
//     console.log(obj[attr]);
// }