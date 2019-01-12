# AidenWallis' customapi resource

A collection of useful customapi endpoints to make more interesting chat commands. Written in NodeJS, runs in Docker, with mongodb and redis.

## Development Setup

In order to setup your computer for development, please do the following:
1. You will need to install Docker. You can obtain docker by going [here](https://www.docker.com/get-started)
1. Fork and clone the repo
1. Change into the directory, and copy the `config.example.json` file to `config.json` and fill in the missing credentials.
1. Run `docker-compose up -d`
1. The website should be available on `localhost:8881`.

## Development guidelines

1. If you're writing new endpoints, please use the linting rules to ensure that you keep your code clean and consistent.
1. Any new endpoints should have a unit test written alongside them.
1. You ensure that the code you write runs within the Docker setup we provide, and that there isn't some weird platform dependency.
1. If you do clone this repo and run a version of this on your own, please link back to this repo.
