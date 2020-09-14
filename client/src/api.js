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