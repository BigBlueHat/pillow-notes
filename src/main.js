var marked = require('marked');
var PouchDB = require('pouchdb');
var Vue = require('vue');

var db = new PouchDB('pillow-notes');
window.db = db;

new Vue({
  el: document.body,
  data: {
    input: '# hello'
  },
  filters: {
    marked: marked
  },
  components: {
    'doc-list': require('./doc-list')
  }
});
