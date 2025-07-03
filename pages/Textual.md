---
title: Textual
description: Rapid Application Development Framework
layout: default
---

# Using the Console

Start the console using the `textual console` command as shown below. **NOTE** the `(textual) $` is just an indicator that the user is in a Python *venv* environment called *textual* (with the Textual packages installed):

```
(textual) $ textual console
```

Connect your app (e.g. `my_app.py`) to the console:

```
textual run --dev my_app.py
```

## Decreasing Verbosity

Log messages are classififed into groups, and the -x flag can be used to exclude all message from a group. The groups are: EVENT, DEBUG, INFO, WARNING, ERROR, PRINT, SYSTEM, LOGGING and WORKER. The group a message belongs to is printed after its timestamp.

Multiple groups may be excluded, for example to exclude everything except warning, errors, and print statements:

```
textual console -x SYSTEM -x EVENT -x DEBUG -x INFO
```

---

# Links

* [Textual Homepage](https://textual.textualize.io/)
  * [Devtools](https://textual.textualize.io/guide/devtools/)
  * [Events and Messages](https://textual.textualize.io/guide/events/)

## Textual Widgets

* [Builtin Widgets](https://textual.textualize.io/widgets/)
* [Widget Gallery](https://textual.textualize.io/widget_gallery/)

* [ContentSwitcher](https://textual.textualize.io/widgets/content_switcher/)
* [MarkdownViewer](https://textual.textualize.io/widgets/markdown_viewer/)
* [Tabs](https://textual.textualize.io/widgets/tabs/)

## Rich

* [Rich on GitHub](https://github.com/Textualize/rich) - Python library for rich text and beautiful formatting 

## Open Source Textual Apps

* [Dolphi](https://github.com/charles-001/dolphie) - MySQL/MariaDB & ProxySQL analytics
* [Harlequin](https://github.com/tconbeer/harlequin) - DB client
* [PlotextPlot](https://github.com/Textualize/textual-plotext/tree/main/examples) - Plots of Weather data
* [Posting](https://github.com/darrenburns/posting) - The API client that lives in your terminal
* [Memray](https://github.com/bloomberg/memray) - Memory profiler
* [Toolong](https://github.com/textualize/toolong) - View, tail, merge, and search logs
