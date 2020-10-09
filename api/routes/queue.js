import express from 'express';
import request from 'request';
import dotenv from 'dotenv';

const router = express.Router();
dotenv.config();

var http = require('http');
let server = http.createServer(router);
let io = require('socket.io').listen(server);
server.listen(8081);

let queue;

class Queue {
  constructor() {
    this.queue = [];
  }

  add(id) {
    this.queue.push({id: id, votes: 0});
  }

  remove(id) {
    for (let i = 0; i < this.queue.length; i++) {
      if (this.queue[i].id == id) {
        this.queue.splice(i, 1);
      }
    }
  }

  removeTop() {
    return this.queue.splice(0, 1);
  }

  upvote(id) {
    for (let i = 1; i < this.queue.length; i++) {
      if (this.queue[i].id == id) {
        this.queue[i].votes += 1;
      }
    }
    this.queue.sort((a, b) => (a.votes < b.votes) ? 1 : (a.votes > b.votes) ? -1 : 0);
  }

  downvote(id) {
    for (let i = 1; i < this.queue.length; i++) {
      if (this.queue[i].id == id) {
        this.queue[i].votes -= 1;
      }
    }
    this.queue.sort((a, b) => (a.votes < b.votes) ? 1 : (a.votes > b.votes) ? -1 : 0);
  }

  getVotes(id) {
    for (let i = 0; i < this.queue.length; i++) {
      if (this.queue[i].id == id) {
        return this.queue[i].votes;
      }
    }
    return 0;
  }
}

io.on('connect', (socket) => {
  console.log("A user connected to the queue");
  queue = new Queue();

  socket.on('add', (data) => {
    console.log('hello');
    console.log(data);
  });

  socket.on('disconnect', () => {
    console.log("A user disconnected from the queue");
  });
});

module.exports = router;
