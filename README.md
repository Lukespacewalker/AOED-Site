# AOED-Site
The Association of Occupational and Environmental Diseases of Thailand official website
Hosting on Netlify CDN at https://tcohs.netlify.com

# Netlify Deployment
[![Netlify Status](https://api.netlify.com/api/v1/badges/9b9b26c3-6609-4db6-b771-53c2a995256f/deploy-status)](https://app.netlify.com/sites/aoed/deploys)

# How to complie the website

## Automatic compilation using Use Netlify CI/CD 🛰🚀
The `master` branch of this source code is directly connected to Netlify CI/CD (Continuous integration & delivery) at [https://tcohs.netlify.com](https://tcohs.netlify.com)

By pushing to `master` branch, the website will be built and deployed automatically. 

## Manual compilation on your local computer
Now, It looks like you want to get your hand very dirty. 😋

## System Prerequisite
### Operation system
Windows , MacOS, Linux , or whatever OS that can install these softwares.
### Compilation software
Node.js 12+ [Grab it here](https://nodejs.org)
Yarn [Grab it here](https://yarnpkg.com)
### Source distribution control software
 [Git](https://git-scm.com
) or Git GUI Software such as [Git-Kraken](https://www.gitkraken.com/) or [Fork](https://git-fork.com/)
### Very FAST Internet connection 
## Instructions

1. Just clone the source using git
2. Open `CMD` and change directory to source code location such as `C:\Source\AOED-Site`
2. Restore all necessary packages from NPM repositories by typing command to CMD `yarn` and wait
3. Run `npm run build`
4. Boom! Deploy `/public` to any web servers.