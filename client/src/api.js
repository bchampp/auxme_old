import axios from "axios";

export default {
    party: {
        newRoom: name =>
            axios.post(`/api/rooms/new-room?name=${name}`).then(res => res.data.response),
        fetchRoom: id =>
            axios.post(`/api/rooms/get-room?id=${id}`).then(res => res.data.response),
    },
    spotify: {
        login: () => {
          axios.window.location.replace("http://localhost:8080/api/login/login");
        },
        getUser: () => {
            axios.post(`/api/spotify/get-user`).then(res => res.data.response)
        },
        togglePlay: () => {
            axios.post('/api/spotify/play').then(res => res.data.response)
        },
        nextTrack: () => {
            axios.post(`/api/spotify/nexk`).then(res => res.data.response)
        },
        previousTrack: () => {
            axios.post(`/api/spotify/previous`).then(res => res.data.response)
        },
        addToQueue: () => {
            axios.post(`/api/spotify/queue`).then(res => res.data.response)
        },
        isLoggedIn: () => {
            axios.post('/api/spotify/isLoggedIn').then(res => res.data.response);
        },
        setTokens: () => {
            axios.post('/api/spotify/setTokens').then(res => res.data.response);
        },
        getTokens: () => {
            axios.post('/api/spotify/getTokens').then(res => res.data.response);
        }
    },
    queue: {
        upVote: (song) => {
            axios.post(`/api/queue/upvote`).then(res => res.data.response)
        },
        downVote: (song) => {
            axios.post(`/api/queue/downvote`).then(res => res.data.response)
        },
    },
    controller: {
        getVolume: (volume) => {
            axios.post(`/api/controller/get-volume`).then(res => res.data.response)
        },
        setColor: (r, g, b) => {
            axios.post(`/api/controller/set-color?r=${r}&g=${g}&b=${b}}`).then(res => res.data.response) 
        }
    }
}
