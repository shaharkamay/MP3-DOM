/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
function playSong(songId) {
    for(let song of player.songs) {
        document.getElementById('song' + song.id).classList.remove('playing');
        if(song.id === songId) {
            document.getElementById('song' + song.id).classList.add('playing');
        }
    }
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    const song = arguments[0];
    const children = buildSongList(song);
    const classes = ["songUl"];
    const attrs = { onclick: `playSong(${id})`, id: "song" + id  }
    return createElement("ul", children, classes, attrs)
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = buildPlaylistList({name, songs: songs.length, duration: toMinutes(playlistDuration(id))});
    const classes = ["songUl"];
    const attrs = {id: "playlist" + id};
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

// You can write more code below this line
const sortedSongs = sortObjectsArray(player.songs, "title");
const songsDiv = document.getElementById('songs');
insertToDiv(songsDiv, sortedSongs);

const sortedPlaylist = sortObjectsArray(player.playlists, "name");
const playlistsDiv = document.getElementById('playlists');
insertToDiv(playlistsDiv, sortedPlaylist);

let songIndex = 0;
playingNow(sortedSongs);

// setI nterval(function(){ alert("Hello"); }, 3000);

function playingNow(songs) {
    playSong(songs[songIndex].id);
    setTimeout(stopSongs, (songs[songIndex].duration * 1000));
}

function stopSongs() {  
    for(let song of player.songs) {
        document.getElementById('song' + song.id).classList.remove('playing');
    }
    songIndex++;
    if(songIndex < sortedSongs.length) {
        playingNow(sortedSongs);
    }
}

function insertToDiv(div, sortedArr) {
    const title = document.createElement('h1');
    title.innerText = div.id;
    div.append(title);
    for(let obj of sortedArr) {
        const tempObj = {...obj};
        if(obj.hasOwnProperty('duration')) {
            tempObj.duration = toMinutes(obj.duration);
            div.append(createSongElement(tempObj));
        }
        else {
            div.append(createPlaylistElement(tempObj));
        }
    }
}

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