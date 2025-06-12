---
title: Pygame
layout: default
---

# Introduction

The code and examples on this page are by and large taken verbatim from the [Pygame Documentation](https://www.pygame.org/docs/) page.

# Sample Program

The program below displays a red circle on a blue background. It allows the user to move the circle using the *w, a, s, d* keys. Hitting the *x* key or closing the window terminates the program.

```
#!/usr/bin/python3

# Example showing a circle moving on a screen
import pygame

# pygame setup
pygame.init()
screen = pygame.display.set_mode((1280, 720))
clock = pygame.time.Clock()
running = True
dt = 0

cursor_pos = pygame.Vector2(screen.get_width() / 2, screen.get_height() / 2)

while running:
  # poll for events
  # pygame.QUIT event means the user click X to close your window
  for event in pygame.event.get():
    if event.type == pygame.QUIT:
      running = False
      
  screen.fill("blue")

  pygame.draw.circle(screen, "red", cursor_pos, 40)

  keys = pygame.key.get_pressed()
  if keys[pygame.K_w]:
    cursor_pos.y -= 300 * dt
  if keys[pygame.K_s]:
    cursor_pos.y += 300 * dt
  if keys[pygame.K_a]:
    cursor_pos.x -= 300 * dt
  if keys[pygame.K_d]:
    cursor_pos.x += 300 * dt
  if keys[pygame.K_x]:
    running = False

  # flip() the display to put your work on the screen
  pygame.display.flip()
  
  # limits FPS to 60
  # dt is delta time in seconds since last fame, used for framerate-independent physics
  dt = clock.tick(60) / 1000
  
pygame.quit()
```

# Links

* [Pygame Documentation Homepage](https://www.pygame.org/docs/)