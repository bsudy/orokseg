# Örökség

Genealogy software. Providing API over Gramps SQLite databases.

## Technology stack

* Java 21
* Sprint Boot


## Code

### Code structure

The REST endpoints are added to the `link.sudy.orokseg.resources` package.
The services serving the request from the endpoints are in the `link.sudy.orokseg.services` package.
The _Data Access_ is done via _Repositories_ ([Repository Pattern]()). All the _Repositories_ are in
the `link.sudy.orokseg.repositories` package.

The _Database Data Model_, that is used by the _Repositories_ are in the `link.sudy.orokseg.repositories.model`,
The _API Data Models_ on the other hand are in the `link.sudy.orokseg.model` package.

For the time being the services are also exposing _API Data Models_ in order to avoid unnecessary conversions. Later it might need to change.

### Code formatting

The code is formatted by [Spotless](https://github.com/diffplug/spotless). It can be run by

```sh
./gradlew spotlessApply
```