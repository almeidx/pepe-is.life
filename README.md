![Pepe Main banner](https://i.imgur.com/LHyZGz9.png)

# Table of Contents

- [Overview](#overview)
- [Local setup](#local-setup)
  - [Cloning repository](#cloning-repository)
  - [Running the website](#running-the-website)
- [Deployment](#deployment)
- [Author](#author)

---

## Overview

This repository houses the [pepe-is.life] website, which is the website for the [Pepe Server] Discord.

---

### Local setup

This setup assumes you have [Git], and [Node.js] setup on your machine. This repository requires [Node.js] version 16 or higher, and uses the [Yarn 3] package manager, so you should have basic knowledge about how to use them.

#### Cloning repository

- `git clone git@github.com:almeidx/pepe-is.life.git pepe-main`
- `cd pepe-main`
- `yarn`

Note: If you don't have yarn installed globally, you'll have to run `npm i -g yarn`.

#### Running the website

- `yarn dev`

Note: Most features of the website requires an API instance running, which is currently not publicly available.

---

### Deployment

The deployment of the website is all automated by [Vercel]

---

### Author

**pepe-is.life** © [almeidx], released under the [GNU AGPLv3] license.

> GitHub [@almeidx]

[pepe-is.life]: https://pepe-is.life
[git]: https://git-scm.com/
[node.js]: https://nodejs.org
[vercel]: https://vercel.com
[yarn 3]: https://yarnpkg.com
[gnu agplv3]: https://github.com/almeidx/pepe-is.life/blob/main/LICENSE
[almeidx]: https://almeidx.dev
[@almeidx]: https://github.com/almeidx
[pepe server]: https://discord.gg/pepe
