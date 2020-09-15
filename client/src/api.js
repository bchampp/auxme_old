import axios from "axios";

export default { 
    party: {
        newRoom: () => {
            axios.post(`/api/rooms/new-room`).then(res => res.data.response)
        }, 
    },
    spotify: {
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
        }
    },
    queue: {
        upVote: (song) => {
            axios.post(`/api/queue/upvote`).then(res => res.data.response)
        },
        downVote: (song) => {
            axios.post(`/api/queue/downvote`).then(res => res.data.response)
        },
    }
}