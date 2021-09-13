/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {String} songId - the ID of the song to play
 */
function playSong(songId) {
    for(let song of player.songs) {
        const songEl = document.getElementById('song' + song.id);
        songEl.classList.remove('playing');
        if(song.id === songId) songEl.classList.add('playing');
    }
    songIndex = getSongIndex(songId);
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement(song) {
    const children = buildSongPropertiesList(song);
    const classes = ["songProperties"];
    const attrs = { id: 'songProperties' + song.id  }
    return createElement("div", children, classes, attrs)
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = buildPlaylistList({id, name, songs: songs.length, duration: toMinutes(playlistDuration(id))});
    const classes = [];
    const attrs = {id: "playlist" + id};
    return createElement("div", children, classes, attrs)
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

durationReflector();

function durationReflector() {
    for(let song of player.songs) {
        const durationLi = document.getElementById('duration' + song.id);
        const currentDuration = song.duration;
        if(currentDuration <= 120) {
            durationLi.style.background = `hsl(120, 100%, 50%)`;
        }
        if(currentDuration >= 420) {
            durationLi.style.background = `hsl(0, 100%, 50%)`;
        }
        if(currentDuration > 120 && currentDuration <= 420) {
            durationLi.style.background = `hsl(${(currentDuration - 120) * (120 / 300)}, 100%, 50%)`;
        }
    }
}

function playingNow(songs) {
    playSong(songs[songIndex].id);
    setTimeout(stopSongs, (songs[songIndex].duration * 1000));
}

function stopSongs() {  
    for(let song of player.songs) {
        document.getElementById('songProperties' + song.id).classList.remove('playing');
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
            const songDiv = createElement('div', [], ["songDiv"], {onclick: `playSong(${tempObj.id})`, id: `song${tempObj.id}`});
            tempObj.duration = toMinutes(obj.duration);
            songDiv.append(createSongElement(tempObj));
            const img = createElement('img', [], [], {src: tempObj.coverArt});
            const imgDiv = createElement('div', [img], ["imgDiv"], {id: `imgDiv${tempObj.id}`});
            songDiv.append(imgDiv);
            div.append(songDiv);
        }
        else {
            div.append(createPlaylistElement(tempObj));
        }
    }
}


function buildSongPropertiesList(song) {
    const list = [];
    for(let key in song) {
        if(key !== 'id' && key !== 'coverArt') {
           let div = createElement('div', [], [], {id: key + song.id});
            div.innerText = song[key]; 
            list.push(div);            
        }
    }
    return list;
}

function buildPlaylistList(playlist) {
    const list = [];
    for(let key in playlist) {
        if(key !== "id") {
            const li = document.createElement('li');
            li.innerText = `${key}: ${playlist[key]}`;
            li.id = key + playlist.id;
            list.push(li);
        }
    }
    return list;
}