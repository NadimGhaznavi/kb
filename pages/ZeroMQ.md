---
title: ZeroMQ
layout: default
---

# Examples

A complete list of examples can be found [here.](http://github.com/zeromq/pyzmq/tree/f8b051b0ed7f1170918014610e2fe3a606509c6b/examples)

## [Heartbeat](https://github.com/zeromq/pyzmq/tree/f8b051b0ed7f1170918014610e2fe3a606509c6b/examples/heartbeat)

### Heart

This launches an echoing rep socket device, and runs a blocking numpy action. The rep socket should remain responsive to pings during this time. Use heartbeater.py to ping this heart, and see the responsiveness.
    
- Source code: [heart.py](https://github.com/zeromq/pyzmq/blob/f8b051b0ed7f1170918014610e2fe3a606509c6b/examples/heartbeat/heart.py)


### Heartbeater

For use with heart.py

A basic heartbeater using PUB and ROUTER sockets. pings are sent out on the PUB, and hearts
are tracked based on their DEALER identities.

You can start many hearts with heart.py, and the heartbeater will monitor all of them, and notice when they stop responding.

- Source code : [heartbeater.py](https://github.com/zeromq/pyzmq/blob/f8b051b0ed7f1170918014610e2fe3a606509c6b/examples/heartbeat/heartbeater.py)



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

