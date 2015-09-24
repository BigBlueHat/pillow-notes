# Pillow Notes

The Markdown-y softness of lightweight note taking goodness on Apache CouchDB
and PouchDB. Toss the pillows between your browser and the cloud. Share them
with friends.

:sleeping:

## In a hurry?

The `build` folder should contain an up-to-date static copy of Pillow Notes
(rashly assuming I remembered to publish the updates, etc...). Open the
`build/index.html` file in a browser (or serve it with a Web server) and take notes.

## Usage

```bash
$ npm install
$ npm run styles # if this is your first time or you're updating Semantic-UI
$ npm run build
```

Open the `build/index.html` file in your browser either via `File | Open...` or
by running a web server (i.e. `cd build && python -m SimpleHTTPServer`).

**Note:** PouchDB databases are unique to the URL you load it from, so if
you start using this at `file:///.../build/index.html` and then open it at
`http://localhost:8000/` you'll be using two *different* databases. That's
where the sync bit comes in. :wink:

### Ugh...CORS...

Sadly, this section might wake you back up...sorry...

```
$ npm install -g add-cors-to-couchdb
$ add-cors-to-couchdb http://localhost:5984 -u USER -p PASS
```
(obviously replace USER & PASS with something meaningful)

That will enable CORS on a CouchDB configuration compliant server.

## License

Apache License 2.0
