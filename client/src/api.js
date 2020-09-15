import axios from "axios";

export default { 
    party: {
        newRoom: name =>
            axios.post(`/api/rooms/new-room?name=${name}`).then(res => res.data.response), 
        fetchRoom: id => 
            axios.post(`/api/rooms/get-room?id=${id}`).then(res => res.data.response),
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