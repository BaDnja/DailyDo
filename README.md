# DailyDo

DailyDo helps user manage their everyday tasks. :ballot_box_with_check:\
Currently, it operates in browser's local storage.

Spotted a bug? :bug: Feel free to open an issue!

## How to run

### Run locally
**Prerequisites**:
* Node.js and npm: [npm Docs](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

1. Clone this repository to desired location
2. Run `npm install`
3. Run `npm run ng serve`
4. Go to http://localhost:2400

### Run docker container
**Prerequisites**:
* [Docker](https://docs.docker.com/engine/install/)

1. Clone this repository to desired location
2. Run `docker build -t daily-do .`
3. After successful build, run `docker run -d -p 8080:80 daily-do`
4. Go to http://localhost:8080

## List of features

* Tasks, lists and groups CRUD
  * View list of items (items are any of the above three)
  * View single item
  * Add new item
  * Update item
  * Delete item
* Add task to a list
* Add list to a group

### Data models

All models can be found in [src/app/shared/models](src/app/shared/models)
