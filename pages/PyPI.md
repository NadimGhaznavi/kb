---
title: PyPI
description: The Python Package Index
layout: default
---

# Introduction

The *Python Package Index* is an open publishing platform for Python modules. Once a module has been published it can be downloaded and installed using `pip`.

---

# Creating a PyPI Account

In order to publish a package you need an account. Sign up [here](https://pypi.org/account/register/).

---

# Creating an API Token

You will also need an API token. In order to generate one:

* [Login](https://pypi.org/account/login/) to the [PyPI website](https://pypi.org)
* Navigate to your [account settings](https://pypi.org/manage/account/)
* Click on the [add token](https://pypi.org/manage/account/token/) button
  * Provide a token name
  * The scope of the token
  * -and click on the *Create Token* button
* **Copy the token**, this is the one and only chance you will get to do this

---

# Installing the API Token

You'll need to create a `.pypirc` file in your home directory to publish packages using twine. Here's a complete listing of my `/home/nadim/.pypirc` file (the token has been truncated):

```
[pypi]
  username = nghaznavi
  password = pypi-AgEIclwa5vccCJljZGYxMDjLTZZjINDxYihzgLUYMOVMRZAKszCJNJiTji3jiTmjtGQO0OIMQNIOQXABDFDmpXBDfHW2vhshWOvlVsLsw
```

---

# Publishing Pre-Requisites

You'll need a couple of *pip* packages to publish using `twine`. You can create a *venv* environment for this purpose (so you don't pollute your system's Python installation). The example below shows the creation of a venv environment called *pypi*:

```
python3 -m venv pypi
. pypi/bin/activate
(pypi) $ pip install twine wheel
```

---

# Directory Structure

I've used my *db4e-systemd* package as an example. Here's the required directory structure:

```
db4e-systemd/
db4e-systemd/LICENSE
db4e-systemd/pyproject.toml
db4e-systemd/Db4eSystemd
db4e-systemd/Db4eSystemd/__init__.py     <-- Your module is installed here
db4e-systemd/README.md
db4e-systemd/CHANGELOG.md
db4e-systemd/setup.py
```

To be clear, my `Db4eSystemd.py` module is renamed to `db4e-systemd/Db4eSystemd/__init__.py`.

---

# Create the setup.py Script

Here is an example showing the complete listing of the `setup.py` script:

```
from setuptools import setup, find_packages

setup(
    name='db4e-systemd',
    version='1.1.0',
    author='Nadim-Daniel Ghaznavi',
    description='A lightweight systemctl wrapper for Python',
    long_description=open('README.md').read(),
    long_description_content_type='text/markdown',
    url='https://github.com/NadimGhaznavi/db4e-systemd',
    packages=find_packages(),
    classifiers=[
        'Programming Language :: Python :: 3',
        'License :: OSI Approved :: GNU General Public License v3 (GPLv3)',
        'Operating System :: POSIX :: Linux',
    ],
    python_requires='>=3.7',
)
```

You may note that there is a reference to GitHub. As a best practice, you should create a GitHub repository to house your project. Setting that up is outside of the scope of this document.

---

# Create the pyproject.toml File

Here is an example showing the complete listing of the `pyproject.toml` file:

```
[build-system]
requires = ["setuptools>=42"]
build-backend = "setuptools.build_meta"
```

---

# Create a README.md File

You should create a *README.md* file describing what your module does and how to use it. [Here](https://github.com/NadimGhaznavi/db4e-systemd/blob/main/README.md) is an example of the *README.md* file used for the *db4e-systemd* module.

---

# Maintain a CHANGELOG.md

The *CHANGELOG.md* is exactly what it sounds like; a change log. You should maintain this file as you provide bug-fixes and enhancements. You can see an example [here](https://github.com/NadimGhaznavi/db4e-systemd/blob/main/CHANGELOG.md).

---

# Create the Package Distribution Files

You create the package distribution files using your setup script. Before you do that, be sure to clean out the `dist` directory contents so you don't publish old artifacts:

```
(pypi) $ rm -rf dist/*
(pypi) $ python setup.py sdist bdist_wheel
```

Note that the commands above include the Python venv prompt....

---

# Publish the Package to PyPI

Finally, you can publish the package to the [PyPI](https://pypi.org/) site using the `twine` command.

```
twine upload dist/*
```

That's it!! You're done! 🎉

---

# Update GitHub Repository

Don't forget to update your associated GitHub respository. Here are the commands I used when doing the `v1.1.0` release of the `db4e-systemd` package:

```
git add . -v
git commit -m "Release v1.1.0 - Support for enabling/disabling a service"
git tag v1.1.0
git push origin main --tags
```

-and finally, navigate to GitHub and cut a new release. You can use your CHANGELOG.md as a template for the release notes.

---

# Links

* [PyPI Homepage](https://pypi.org/)
