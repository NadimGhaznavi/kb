---
title: Asciimatics
layout: default
---

# Introduction and Scope

This page outlines some notable features of the Asciimatics UI library.

# Colour Codes for 256 Color Terminals

![](/NadimGhaznavi/kb/blob/main/img/256_colour_codes.png)

# Screen Class Text Attributes

Attributes are a way of modifying the displayed text in some basic ways that early hardware terminals supported before they had colours. Most systems don’t use hardware terminals any more, but the concept persists in all native console APIs and so is also used here.

Supported attributes are defined by the A_xxx constants in the Screen class. The full list is as follows:

| Constant Name | Constant Value |
|---------------|----------------|
| A_BOLD        | 1              |
| A_NORMAL      | 2              |
| A_REVERSE     | 3              |
| A_UNDERLINE   | 4              |

# Screen Class Colour Constants

| Constant Name  | Constant Value |
|----------------|----------------|
| COLOUR_BLACK   | 0              |
| COLOUR_RED     | 1              |
| COLOUR_GREEN   | 2              |
| COLOUR_YELLOW  | 3              |
| COLOUR_BLUE    | 4              |
| COLOUR_MAGENTA | 5              |
| COLOUR_CYAN    | 6              |
| COLOUR_WHITE   | 7              |

# Widget Types

The table below shows the built in widget types.

| Widget type                                                                                                                                              | Description                                                                                 |
|----------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------|
| [Button](https://asciimatics.readthedocs.io/en/stable/asciimatics.widgets.html#asciimatics.widgets.button.Button)                                        | Action buttons - e.g. ok/cancel/etc.                                                        |
| [CheckBox](https://asciimatics.readthedocs.io/en/stable/asciimatics.widgets.html#asciimatics.widgets.checkbox.CheckBox)                                  | Simple yes/no tick boxes.                                                                   |
| [DatePicker](https://asciimatics.readthedocs.io/en/stable/asciimatics.widgets.html#asciimatics.widgets.datepicker.DatePicker)                            | A single-line widget for selecting a date (using a pop-up list).                            |
| [Divider](https://asciimatics.readthedocs.io/en/stable/asciimatics.widgets.html#asciimatics.widgets.divider.Divider)                                     | A spacer between widgets (for aesthetics).                                                  |
[ DropdownList](https://asciimatics.readthedocs.io/en/stable/asciimatics.widgets.html#asciimatics.widgets.dropdownlist.DropdownList)                       | A single-line widget that pops up a list from which the user can select a single value.     |   
| [FileBrowser](https://asciimatics.readthedocs.io/en/stable/asciimatics.widgets.html#asciimatics.widgets.filebrowser.FileBrowser)                         | A multi-line widget for listing the local file system.                                      |   
| [Label](https://asciimatics.readthedocs.io/en/stable/asciimatics.widgets.html#asciimatics.widgets.label.Label)                                           | A label for a group of related widgets.                                                     |   
| [ListBox](https://asciimatics.readthedocs.io/en/stable/asciimatics.widgets.html#asciimatics.widgets.listbox.ListBox)                                     | A list of possible options from which users can select one value.                           |   
| [MultiColumnListBox](https://asciimatics.readthedocs.io/en/stable/asciimatics.widgets.html#asciimatics.widgets.multicolumnlistbox.MultiColumnListBox)    | Like a ListBox, but for displaying tabular data.                                            |   
| [RadioButtons](https://asciimatics.readthedocs.io/en/stable/asciimatics.widgets.html#asciimatics.widgets.radiobuttons.RadioButtons)                      | A list of radio buttons. These allow users to select one value from a list of options.      |   
| [Text](https://asciimatics.readthedocs.io/en/stable/asciimatics.widgets.html#asciimatics.widgets.text.Text)                                              | A single line of editable text.                                                             |   
| [TextBox](https://asciimatics.readthedocs.io/en/stable/asciimatics.widgets.html#asciimatics.widgets.textbox.TextBox)                                     | A multi-line box of editable text.                                                          |   
| [TimePicker](https://asciimatics.readthedocs.io/en/stable/asciimatics.widgets.html#asciimatics.widgets.timepicker.TimePicker)                            | A single-line widget for selecting a time (using a pop-up list).                            |   
| [VerticalDivider](https://asciimatics.readthedocs.io/en/stable/asciimatics.widgets.html#asciimatics.widgets.verticaldivider.VerticalDivider)             | A vertical line divider - useful for providing a visual marker between columns in a Layout. |

# Layouts, Frames and Widgets

The diagram below shows the nested relationship of layouts, frames and widgets.

```
+------------------------------------------------------------------------+
|Screen..................................................................|
|........................................................................|
|...+----------------------------------------------------------------+...|
|...|Frame                                                           |...|
|...|+--------------------------------------------------------------+|...|
|...||Layout 1                                                      ||...|
|...|+--------------------------------------------------------------+|...|
|...|+------------------------------+-------------------------------+|...|
|...||Layout 2                      |                               ||...|
|...|| - Column 1                   | - Column 2                    ||...|
|...|+------------------------------+-------------------------------+|...|
|...|+-------------+---------------------------------+--------------+|...|
|...||Layout 3     | < Widget 1 >                    |              ||...|
|...||             | ...                             |              ||...|
|...||             | < Widget N >                    |              ||...|
|...|+-------------+---------------------------------+--------------+|...|
|...+----------------------------------------------------------------+...|
|........................................................................|
+------------------------------------------------------------------------+
```
# Links

* [Asciimatics Documentation Homepage](https://asciimatics.readthedocs.io/en/stable/index.html)
* [Sample Programs using Ascimatics](https://github.com/peterbrittain/asciimatics/tree/master/samples)