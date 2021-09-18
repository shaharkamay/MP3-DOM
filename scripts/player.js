function sortObjectsArray(arr, property) {
    const sortedObjects = [];
    for (let obj of arr) {
        sortedObjects.push(obj);
    }
    sortedObjects.sort((a, b) => {if(a[property] < b[property]) return -1;});
    return sortedObjects;
}

function getSong(id) {
    const song = player.songs.find(x => x.id === id);
    return song;
}

function getSongIndex(songs, id) {
    const songIndex = songs.findIndex(x => x.id === id);
    return songIndex;
}

function getPlaylist(id) {
    const playlist = player.playlists.find(x => x.id === id);
    return playlist;
}

function toMinutes(sec) {
    const minFormat = ["mm", "ss"];
    minFormat[1] = sec % 60 < 10 ? "0" + sec % 60: sec % 60;
    minFormat[0] = sec / 60 < 10 ? "0" + Math.floor(sec / 60): Math.floor(sec / 60);
    return minFormat.join(':');
}
function toSeconds(duration) {
    const arr = duration.split(':');
    return parseInt(arr[0]) * 60 + parseInt(arr[1]);
  }

function sumDuration(arr) {
    if(arr.length === 0) return 0;
    return getSong(arr.pop()).duration + sumDuration(arr.slice(0, arr.length));
}

function playlistDuration(id) {
    const playlist = getPlaylist(id);
    const secondsArr = [...playlist.songs];
    return sumDuration(secondsArr);
}

function addSong(title, album, artist, duration, coverArt, id) {
    if(id === undefined) {
        id = getMaxId(player.songs) + 1; //generates auto id (max id + 1)
    } else {
        if(isIdExist(player.songs, id)) existError();
    }
    duration = toSeconds(duration);
    player.songs.push({id, title, album, artist, duration, coverArt});
    return id;
}

function getMaxId(arr) {
    let max = 0;
    for (let obj of arr) {
        if(obj.id > max) max = obj.id;
    }
    return max;
}

function removeSong(id) {
    if(!isIdExist(player.songs, id)) notExistError();
    removeSongFromPlayer(id);
    removeSongFromPlaylists(id);
}
function removeSongFromPlayer(id) {
    const songIndex = player.songs.indexOf(getSong(id));
    player.songs.splice(songIndex, 1);
}
function removeSongFromPlaylists(id) {
    for(let playlist of player.playlists) {
        const songIndex = playlist.songs.indexOf(id);
        if(songIndex !== -1) {
            playlist.songs.splice(songIndex, 1);
        }
    }
}

function existError() {
    throw 'this id already exist!';
}
function notExistError() {
    throw 'this id does not exist!';
}
function isIdExist(arr, id) {
    return arr.find(x => x.id === id) !== undefined;
}

const player = {
    songs: [
        {
            id: 1,
            title: "Vortex",
            album: "Wallflowers",
            artist: "Jinjer",
            duration: 242,
            coverArt: "./images/cover_art/jinjer_vortex.jpg",
        },
        {
            id: 2,
            title: "Vinda",
            album: "Godtfolk",
            artist: "Songleikr",
            duration: 160,
            coverArt: "./images/cover_art/songleikr_vinda.jpg",
        },
        {
            id: 7,
            title: "Shiroyama",
            album: "The Last Stand",
            artist: "Sabaton",
            duration: 213,
            coverArt: "./images/cover_art/sabaton_shiroyama.jpg",
        },
        {
            id: 3,
            title: "Thunderstruck",
            album: "The Razors Edge",
            artist: "AC/DC",
            duration: 292,
            coverArt: "./images/cover_art/acdc_thunderstruck.jpg",
        },
        {
            id: 4,
            title: "All is One",
            album: "All is One",
            artist: "Orphaned Land",
            duration: 270,
            coverArt: "./images/cover_art/orphaned_land_all_is_one.jpg",
        },
        {
            id: 5,
            title: "As a Stone",
            album: "Show Us What You Got",
            artist: "Full Trunk",
            duration: 259,
            coverArt: "./images/cover_art/full_trunk_as_a_stone.jpg",
        },
        {
            id: 6,
            title: "Sons of Winter and Stars",
            album: "Time I",
            artist: "Wintersun",
            duration: 811,
            coverArt: "./images/cover_art/wintersun_sons_of_winter_and_stars.jpg",
        },
    ],
    playlists: [
        { id: 1, name: "Metal", songs: [1, 7, 4, 6] },
        { id: 5, name: "Israeli", songs: [4, 5] },
    ],
}
