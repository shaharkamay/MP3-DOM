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
    playContinously(songId);
}

/**
 * Removes a song from the player, and updates the DOM to match.
 *
 * @param {Number} songId - the ID of the song to remove
 */
function removeSong(songId) {
    // Your code here
}

/**
 * Adds a song to the player, and updates the DOM to match.
 */
function addSong({ title, album, artist, duration, coverArt }) {
    // Your code here
}

/**
 * Acts on a click event on an element inside the songs list.
 * Should handle clicks on play buttons and remove buttons of songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleSongClickEvent(event) {
    // Your code here
}

/**
 * Handles a click event on the button that adds songs.
 *
 * @param {MouseEvent} event - the click event
 */
function handleAddSongEvent(event) {
    // Your code here
}

/**
 * Creates a song DOM element based on a song object.
 */
function createSongElement({ id, title, album, artist, duration, coverArt }) {
    //insert image
    const img = createElement('img', [], [], {src: coverArt}, {});
    const imgDiv = createElement('div', [img], ['imgDiv'], {id: `imgDiv${id}`}, {});

    //insert song properties
    const titleDiv = createElement('div', [], [], {id: `title${id}`}, {});
    titleDiv.textContent = title;
    const albumDiv = createElement('div', [], [], {id: `album${id}`}, {});
    albumDiv.textContent = album;
    const artistDiv = createElement('div', [], [], {id: `artist${id}`}, {});
    artistDiv.textContent = artist;
    const durationDiv = createElement('div', [], [], {id: `duration${id}`}, {});
    durationDiv.textContent = toMinutes(duration);
    durationReflector(durationDiv, duration);   //sets the color of the duration
    const songPropertiesDiv = createElement('div', [titleDiv, albumDiv, artistDiv, durationDiv], ['songProperties'], {id: `songProperties${id}`}, {});

    //insert media control buttons
    const previousButton = createElement('button', [], [], {id: `previous${id}`}, {click: mediaControlEvent});
    previousButton.textContent = '⏮';
    const playPauseButton = createElement('button', [], [], {id: `playPause${id}`, onclick: `playSong(${id})`}, {click: mediaControlEvent});
    playPauseButton.textContent = '⏵';
    const nextButton = createElement('button', [], [], {id: `next${id}`}, {click: mediaControlEvent});
    nextButton.textContent = '⏭';
    const mediaControlDiv = createElement('div', [previousButton, playPauseButton, nextButton], ['mediaControl'], {id: `mediaControl${id}`}, {});

    //insert edit buttons
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
    const eventListeners = {};

    return createElement("div", children, classes, attrs, eventListeners);
}

/**
 * Creates a playlist DOM element based on a playlist object.
 */
function createPlaylistElement({ id, name, songs }) {
    const children = []
    const classes = []
    const attrs = {}
    const eventListeners = {}
    return createElement("div", children, classes, attrs, eventListeners)
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

/**
 * Inserts all playlists in the player as DOM elements into the playlists list.
 */
function generatePlaylists() {
    // Your code here
}

//Global variables
const songs = sortObjectsArray(player.songs, "title");

// Creating the page structure
generateSongs();
generatePlaylists();


// Making the add-song-button actually do something
document.getElementById("add-button").addEventListener("click", handleAddSongEvent)




/*
Media Control event handler
*/
function mediaControlEvent(event) {
    // console.log(event.path[0].id);
    // console.log(event);
}


/*
this function reset the songs view to deault mode;
*/
function resetSongs() {
    for(let song of songs) {
        const songElem = document.getElementById('song' + song.id);
        songElem.classList.remove('playing');

        // const durationElem = document.getElementById(`duration${song.id}`);
        // durationElem.style.removeProperty('width');
        // durationElem.style.removeProperty('transition');

        // changeTextIcon(`playPause${song.id}`, '⏵');
    }
    // clearTimeout(globalResetSongsTimeout);
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

*/