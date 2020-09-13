import axios from "axios";

export default { 
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