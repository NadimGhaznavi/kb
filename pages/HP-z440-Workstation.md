---
title: HP z440 Workstation
layout: default
---

# Example boot strategy

```
                POWER ON
                     │
                     ▼
            ┌────────────────┐
            │ 16 GB SATA SSD │
            │                │
            │ GRUB           │
            │ /boot          │
            │ kernel/initrd  │
            └───────┬────────┘
                    │
                    │ kernel sees NVMe
                    ▼
        ┌─────────────────────────┐
        │      512 GB NVMe        │
        │                         │
        │ LVM                     │
        │ ├── /      96 GB        │
        │ ├── /var   32 GB        │
        │ ├── /opt  ~320 GB       │
        │ └── free extents        │
        └─────────────────────────┘
                    │
                    ▼
               Debian 13
                    │
             NVIDIA driver
                    │
               CUDA 12.4
                    │
               llama.cpp
                    │
               Qwen3-4B
```