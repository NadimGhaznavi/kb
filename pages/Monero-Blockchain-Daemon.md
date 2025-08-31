---
title: Monero Blockchain Daemon
layout: default
---

# Table of Contents

* [Introduction and Scope](#introduction-and-scope)
* [Interactive Commands](#interactive-commands)
* [Import Tool](#import-tool)
* [Links](#links)

---

# Introduction and Scope

This page has information about `monerod` the Monero XMR Blockchain Daemon.

---

# Interactive Commands

```
help
Monero 'Fluorine Fermi' (v0.18.3.3-release)
Commands:
  alt_chain_info [blockhash]
  apropos <keyword> [<keyword> ...]
  ban [<IP>|@<filename>] [<seconds>]
  banned <address>
  bans
  bc_dyn_stats <last_block_count>
  check_blockchain_pruning
  diff
  exit
  flush_cache [bad-txs] [bad-blocks]
  flush_txpool [<txid>]
  hard_fork_info <version>
  help [<command>]
  hide_hr
  in_peers <max_number>
  is_key_image_spent <key_image>
  limit [<kB/s>]
  limit_down [<kB/s>]
  limit_up [<kB/s>]
  mining_status
  out_peers <max_number>
  output_histogram [@<amount>] <min_count> [<max_count>]
  pop_blocks <nblocks>
  print_bc <begin_height> [<end_height>]
  print_block <block_hash> | <block_height>
  print_cn
  print_coinbase_tx_sum <start_height> [<block_count>]
  print_height
  print_net_stats
  print_pl [white] [gray] [pruned] [publicrpc] [<limit>]
  print_pl_stats
  print_pool
  print_pool_sh
  print_pool_stats
  print_status
  print_tx <transaction_hash> [+hex] [+json]
  prune_blockchain [confirm]
  relay_tx <txid>
  rpc_payments
  save
  set_bootstrap_daemon (auto | none | host[:port] [username] [password]) [proxy_ip:proxy_port]
  set_log <level>|<{+,-,}categories>
  show_hr
  start_mining <addr> [<threads>|auto] [do_background_mining] [ignore_battery]
  status
  stop_daemon
  stop_mining
  sync_info
  unban <address>
  update (check|download)
  version
```

---

# Import Tool

Example import commands:
```
bin/monero-blockchain-import --data-dir /opt/prod/monero-blockchain \
  --input-file 2025-06-03_blockchain.dat --log-level 0 --batch 1 --resume 1
```

---

# Links

* [Building from Source](/pages/Building-Monerod-from-Source.html)
* [Monero Homepage](https://www.getmonero.org/)
* [Monero Source Code on GitHub](https://github.com/monero-project/monero-gui)
* [Building Monerod from Source](https://xmr.osoyalce.com/pages/Building-Monerod-from-Source.html)
