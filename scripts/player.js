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

function sumDuration(arr) {
    if(arr.length === 0) return 0;
    return getSong(arr.pop()).duration + sumDuration(arr.slice(0, arr.length));
}

function playlistDuration(id) {
    const playlist = getPlaylist(id);
    const secondsArr = [...playlist.songs];
    return sumDuration(secondsArr);
}

const player = {
    songs: [
        {
            id: 1,
            title: "Vortex",
            album: "Wallflowers",
            artist: "Jinjer",
            duration: 3,
            coverArt: "./images/cover_art/jinjer_vortex.jpg",
        },
        {
            id: 2,
            title: "Vinda",
            album: "Godtfolk",
            artist: "Songleikr",
            duration: 8,
            coverArt: "./images/cover_art/songleikr_vinda.jpg",
        },
        {
            id: 7,
            title: "Shiroyama",
            album: "The Last Stand",
            artist: "Sabaton",
            duration: 14,
            coverArt: "./images/cover_art/sabaton_shiroyama.jpg",
        },
        {
            id: 3,
            title: "Thunderstruck",
            album: "The Razors Edge",
            artist: "AC/DC",
            duration: 6,
            coverArt: "./images/cover_art/acdc_thunderstruck.jpg",
        },
        {
            id: 4,
            title: "All is One",
            album: "All is One",
            artist: "Orphaned Land",
            duration: 5,
            coverArt: "./images/cover_art/orphaned_land_all_is_one.jpg",
        },
        {
            id: 5,
            title: "As a Stone",
            album: "Show Us What You Got",
            artist: "Full Trunk",
            duration: 9,
            coverArt: "./images/cover_art/full_trunk_as_a_stone.jpg",
        },
        {
            id: 6,
            title: "Sons of Winter and Stars",
            album: "Time I",
            artist: "Wintersun",
            duration: 21,
            coverArt: "./images/cover_art/wintersun_sons_of_winter_and_stars.jpg",
        },
    ],
    playlists: [
        { id: 1, name: "Metal", songs: [1, 7, 4, 6] },
        { id: 5, name: "Israeli", songs: [4, 5] },
    ],
}
