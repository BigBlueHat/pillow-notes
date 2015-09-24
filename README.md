# Pillow Notes

The Markdown-y softness of lightweight note taking goodness on Apache CouchDB
and PouchDB. Toss the pillows between your browser and the cloud. Share them
with friends.

:sleeping:

## Usage

```
$ npm install
$ npm run build
```

Open the `index.html` file in your browser either via `File | Open...` or
by running a web server (i.e. `python -m SimpleHTTPServer`).

**Note:** PouchDB databases are unique to the URL you load it from, so if
you start using this at `file:///.../index.html` and then open it at
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
