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

### Data models

All models can be found in [src/app/shared/models](src/app/shared/models)

## List of features

* Tasks, lists and groups CRUD
  * View list of items (items are any of the above three)
  * View single item
  * Add new item
  * Update item
  * Delete item
* Add task to a list
* Add list to a group
* Remove data from local storage
  * Choose between tasks, lists, groups or all data
  * Removing tasks will remove all tasks from local storage
  * Removing lists will remove all lists, and set listId to empty string for every task associated with the deleted list
  * Removing groups will remove all groups, and set groupId to empty string for every list associated with the deleted group
* Search/filter data
  * Searching is implemented as a separate component with its own routing and query parameter.
  * Data is retrieved from browser's local storage and filtered across all data models.
