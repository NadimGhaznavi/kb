---
title: ZeroMQ
layout: default
---

# Socket Types

The core ZeroMQ socket types are grouped into the following primary messaging patterns: 

---

## Request-Reply Pattern

This pattern connects clients to services and is used for remote procedure calls and task distribution. 
- REQ (Request): A client socket that sends requests and receives replies in a strict alternating sequence (send, then receive). Messages are round-robined among all connected services.
- REP (Reply): A service socket that receives requests and sends replies in a strict alternating sequence (receive, then send). Requests are fair-queued from among all clients.
- DEALER: An asynchronous, more advanced client-side socket that round-robins messages to all connected peers and fair-queues received messages. It does not enforce the strict REQ/REP send/receive sequence.
- ROUTER: An asynchronous server-side socket that routes messages to specific clients based on an added message part containing the client's identity. It is a replacement for REP in brokered scenarios. 

---

## Publish-Subscribe Pattern 

This pattern connects publishers to subscribers and is used for data distribution (fan-out). 

- PUB (Publish): A publisher socket used to distribute data to all connected subscribers. It can only send messages.
- SUB (Subscribe): A subscriber socket that receives messages from publishers. Subscriptions must be set using options to filter which messages to receive.
- XPUB / XSUB: Advanced versions of PUB and SUB that allow the application to receive subscription messages from subscribers (e.g., when a client subscribes or unsubscribes). This is useful for building proxies and brokers. 

---

## Pipeline Pattern

This pattern connects nodes in a fan-out/fan-in flow for parallel task distribution and collection. 

- PUSH: A socket used by a pipeline node to send messages to downstream nodes, which are round-robined to all connected peers. It can only send.
- PULL: A socket used to receive messages from upstream nodes, which are fair-queued from all connected peers. It can only receive. 

---

## Exclusive Pair Pattern

This pattern connects two sockets exclusively, typically for inter-thread communication within the same process. 

- PAIR: Sockets can only be connected to a single peer at a time. No message routing or filtering is performed. 

---

# Examples

A complete list of examples can be found [here](http://github.com/zeromq/pyzmq/tree/f8b051b0ed7f1170918014610e2fe3a606509c6b/examples).

---

## Heartbeat Example

A basic heartbeater using PUB and ROUTER sockets. pings are sent out on the PUB, and hearts are tracked based on their DEALER identities. You can start many hearts with heart.py, and the heartbeater will monitor all of them, and notice when they stop responding.

- [Heartbeat example](https://github.com/zeromq/pyzmq/tree/f8b051b0ed7f1170918014610e2fe3a606509c6b/examples/heartbeat)
  - [heart.py](https://github.com/zeromq/pyzmq/blob/f8b051b0ed7f1170918014610e2fe3a606509c6b/examples/heartbeat/heart.py)
  - [heartbeater.py](https://github.com/zeromq/pyzmq/blob/f8b051b0ed7f1170918014610e2fe3a606509c6b/examples/heartbeat/heartbeater.py)






# Links

- [ZeroMQ Homepage](https://zeromq.org/)
  - [Get Started](https://zeromq.org/get-started/)

- [PyZMQ](https://pyzmq.readthedocs.io/en/latest/)

- [0MQ Guide](https://zguide.zeromq.org/)
  - [Basics](https://zguide.zeromq.org/docs/chapter1/)
  - [Sockets and Patterns](https://zguide.zeromq.org/docs/chapter2/)
  - [Advanced Request-Reply Patterns](https://zguide.zeromq.org/docs/chapter3/)
  - [Reliable Request-Reply Patterns](https://zguide.zeromq.org/docs/chapter4/)
  - [Advanced Pub-Sub Patterns](https://zguide.zeromq.org/docs/chapter5/)
  - [The ZeroMQ Community](https://zguide.zeromq.org/docs/chapter6/)
  - [Advanced Architecture using ZeroMQ](https://zguide.zeromq.org/docs/chapter7/)
  - [A Framework for Distributed Computing](https://zguide.zeromq.org/docs/chapter8/)
  - [Postface](https://zguide.zeromq.org/docs/postface/)

