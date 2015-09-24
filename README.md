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

## License

Apache License 2.0
