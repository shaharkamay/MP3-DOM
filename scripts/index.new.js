/**
 * Plays a song from the player.
 * Playing a song means changing the visual indication of the currently playing song.
 *
 * @param {Number} songId - the ID of the song to play
 */
function playSong(songId) {
    resetSongs();
    const songElem = document.getElementById('song' + songId);
    songElem.classList.add('playing');
    durationBarFiller(songId);
    changeTextContent(`playPause${songId}`, '⏸');
    playContinuously(songId);
}

/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
// function removeSong(songId) {
//     // Your code here
// }

/**
 * Adds a song to the player, and updates the DOM to match.
 */
// function addSong({ title, album, artist, duration, coverArt }) {
//     // Your code here
// }

/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event) {
    if(event.target.parentElement.className.includes('mediaControl')) {
        handleMediaControlEvent(event);
    } else if(event.target.parentElement.className.includes('editSong')) {
        handleEditSongEvent(event);
    }
}

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {
    const inputs = event.target.parentElement.children;
    const values = [];
    for(const elem of inputs) {
        if(elem.tagName === 'INPUT') values.push(elem.value);
    }
    const [title, album, artist, duration, coverArt] = values;
    const newSongId = addSong(title, album, artist, duration, coverArt);
    songs = sortObjectsArray(player.songs, 'title');
    const songIndex = getSongIndex(songs, newSongId);
    addSongElementInOrder(createSongElement(songs[songIndex]), songIndex);
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    //insert image to imgDiv
    const img = createElement('img', [], [], {src: coverArt}, {});
    const imgDiv = createElement('div', [img], ['imgDiv'], {id: `imgDiv${id}`}, {});

    //insert song properties to songPropertiesDiv
    const properties = setSongProperties({ title, album, artist, duration }, id);
    const songPropertiesDiv = createElement('div', properties, ['songProperties'], {id: `songProperties${id}`}, {});

    //insert media control buttons to mediaControlDiv
    const previousButton = createElement('button', [], [], {id: `previous${id}`}, {});
    previousButton.textContent = '⏮';
    const playPauseButton = createElement('button', [], [], {id: `playPause${id}`}, {});
    playPauseButton.textContent = '⏵';
    const nextButton = createElement('button', [], [], {id: `next${id}`}, {});
    nextButton.textContent = '⏭';
    const mediaControlDiv = createElement('div', [previousButton, playPauseButton, nextButton], ['mediaControl'], {id: `mediaControl${id}`}, {});

    //insert edit buttons to editSongDiv
    const deleteButton = createElement('button', [], ['defaultButton'], {id: `delete${id}`, title:'Delete'}, {});
    deleteButton.textContent = 'X';
    const editButton = createElement('button', [], ['defaultButton'], {id: `edit${id}`, title:'Edit'}, {});
    editButton.textContent = '✎';
    const editSongDiv = createElement('div', [deleteButton, editButton], ['editSong'], {id: `editSong${id}`}, {});

    //create seperetor div
    const seperetorDiv = createElement('div', [], ['seperator'], {}, {});

    //insert all div elements to songDiv
    const children = [imgDiv, songPropertiesDiv, mediaControlDiv, seperetorDiv, editSongDiv];
    const classes = ['songDiv'];
    const attrs = { id: `song${id}` };
    const eventListeners = {click: handleSongClickEvent};

    return createElement("div", children, classes, attrs, eventListeners);
}
//this function creates the songPropertiesDiv children
function setSongProperties(song, songId) {
    const properties = [];
    for(let key in song) {
        const div = createElement('div', [], [], {id: `${key}${songId}`}, {});
        div.textContent = song[key];
        if(key === 'duration') {
            div.textContent = toMinutes(song[key]);
            durationReflector(div, song[key]);
        }
        properties.push(div);
    }
    return properties;
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = setPlaylistProperties({id, name, songs});
    const classes = ['playlistDiv'];
    const attrs = {id: `playlist${id}`};
    const eventListeners = {}
    return createElement("div", children, classes, attrs, eventListeners)
}
function setPlaylistProperties(playlist) {
    const properties = [];
    for(let key in playlist) {
        const div = createElement('div', [], [], {id: `${key}${playlist.id}`}, {});
        div.textContent = `${key}: ${playlist[key]}`;
        if(key === 'songs') {
            div.textContent = `${key}: ${playlist[key].length}`;
        }
        properties.push(div);
    }
    return properties;
}

/**
 * Creates a new DOM element.
 *
 * Example usage:
 * createElement("div", ["just text", createElement(...)], ["nana", "banana"], {id: "bla"}, {click: (...) => {...}})
 *
 * @param {String} tagName - the type of the element
 * @param {Array} children - the child elements for the new element.
 *                           Each child can be a DOM element, or a string (if you just want a text element).
 * @param {Array} classes - the class list of the new element
 * @param {Object} attributes - the attributes for the new element
 * @param {Object} eventListeners - the event listeners on the element
 */
function createElement(tagName, children = [], classes = [], attributes = {}, eventListeners = {}) {
    const element = document.createElement(tagName);
    for(let child of children) {
        element.append(child);
    }
    element.classList = classes.join(" ");
    for(let attr in attributes) {
        element.setAttribute(attr, attributes[attr]);
    }
    for(let event in eventListeners) {
        element.addEventListener(event, eventListeners[event]);
    }
    return element;
}

/**
 * Inserts all songs in the player as DOM elements into the songs list.
 */
function generateSongs() {
    const songsDiv = document.getElementById('songs');
    for(let song of songs) {
        songsDiv.append(createSongElement(song));
    }
}

function addSongElementInOrder(songElem, songIndex) {
    const songsDiv = document.getElementById('songs');
    songsDiv.children[2].after(songElem);
}

/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */
function generatePlaylists() {
    const playlistsDiv = document.getElementById('playlists');
    for(let playlist of playlists) {
        playlistsDiv.append(createPlaylistElement(playlist));
    }
}

//Global variables
let songs = sortObjectsArray(player.songs, 'title');
let playlists = sortObjectsArray(player.playlists, 'name');
let globalResetSongsTimeout = null;


// Creating the page structure
generateSongs();
generatePlaylists();
const addSection = document.getElementById('add-button');
addSection.addEventListener('click', () => document.getElementById('inputs').style.display = "block");

// Making the add-song-button actually do something
document.getElementById("addSong").addEventListener("click", handleAddSongEvent)




/*
Media Control functions
*/
//Media control event handler
function handleMediaControlEvent(event) {
    if(event.target.id.includes('playPause')) {
        const songId = Number(event.target.id.replace('playPause', ''));
        console.log(songId);
        playSong(songId);
    } else if(event.target.id.includes('next')) {
        const songId = Number(event.target.id.replace('next', ''));
        playNextSong(songId);
    } else if(event.target.id.includes('previous')) {
        const songId = Number(event.target.id.replace('previous', ''));
        playPreviousSong(songId);
    }
}
function playNextSong(songId) { 
    const nextSongIndex = getSongIndex(songs, songId) + 1;
    playSong(nextSongIndex < songs.length ? songs[nextSongIndex].id : songs[0].id);
}
function playPreviousSong(songId) {
    const previousSongIndex = getSongIndex(songs, songId) - 1;
    playSong(previousSongIndex !== - 1 ? songs[previousSongIndex].id : songs[songs.length - 1].id);
}

/*
Edit song event handler (delete)
*/
function handleEditSongEvent(event) {
    if(event.target.id.includes('delete')) {
        //delete song from songs object and playlist object
        const songId = Number(event.target.id.replace('delete', ''));
        const songIndex = getSongIndex(songs, songId);
        removeSong(songId);
        songs = sortObjectsArray(player.songs, 'title');
        playlists = sortObjectsArray(player.playlists, 'name');

        //update the DOM (songsDiv)
        document.getElementById(`song${songId}`).remove();

        //update the DOM (playlistsDiv)
        updatePlaylistsDiv();
    }
}

/*
this function reset the songs view to deault mode
*/
function resetSongs() {
    for(let song of songs) {
        const songElem = document.getElementById('song' + song.id);
        songElem.classList.remove('playing');

        const durationElem = document.getElementById(`duration${song.id}`);
        durationElem.style.removeProperty('width');
        durationElem.style.removeProperty('transition');

        changeTextContent(`playPause${song.id}`, '⏵');
    }
    clearTimeout(globalResetSongsTimeout);
}


/*
this function sets the color of the duration 
redder the longer the duration is
*/
function durationReflector(elem, duration) {
    if(duration <= 120) {
        elem.style.color = `hsl(120, 100%, 50%)`;
    } else if(duration >= 420) {
        elem.style.color = `hsl(0, 100%, 50%)`;
    } else if(duration > 120 && duration <= 420) {
        elem.style.color = `hsl(${(420 - duration) * (120 / 300)}, 100%, 50%)`;
    }
}


/*
timeout to play songs continuously
*/
function playContinuously(songId) {
    globalResetSongsTimeout = setTimeout(() => playNextSong(songId), (getSong(songId).duration * 1000));
}


/*
this function fill the bar according to the time
of the song
*/
function durationBarFiller(songId) {
    const durationDiv = document.getElementById(`duration${songId}`);
    const duration = getSong(songId).duration;
    durationDiv.style.transition = `width ${duration}s linear`;
    durationDiv.style.width = `100%`;
}

function changeTextContent(elemId, text) {
    const elem = document.getElementById(elemId);
    elem.textContent = text;
}


//update the DOM (playlistsDiv)
function updatePlaylistsDiv() {
    const playlistsDiv = document.getElementById('playlists');
    for(const playlistDiv of playlistsDiv.children) {
            if(playlistDiv.tagName === 'DIV') {
            const playlistId = Number(playlistDiv.id.replace('playlist', ''));
            playlistDiv.lastElementChild.textContent = `songs: ${getPlaylist(playlistId).songs.length}`;
        }
    }
}
