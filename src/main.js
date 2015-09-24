var marked = require('marked');
var PouchDB = require('pouchdb');
var Vue = require('vue');

var db = new PouchDB('pillow-notes');
window.db = db;

Vue.config.debug = true;

new Vue({
  el: document.body,
  data: {
    doc: {
      _id: '',
      markdown: ''
    },
    ids: [],
    remote: {
      url: '',
      username: '',
      password: ''
    },
    confirmDelete: false,
    showSyncForm: false
  },
  created: function() {
    var self = this;
    self.listDocs();
  },
  methods: {
    listDocs: function() {
      var self = this;
      // use `startkey` to avoid _design/docs (since we're syncing)
      db.allDocs({startkey: "_e"})
        .then(function(resp) {
          self.ids = [];
          for (var i = 0; i < resp.rows.length; i++) {
            self.ids.push(resp.rows[i].id);
          }
        }
      );
    },
    newDoc: function(e) {
      var self = this;
      var _id = e.target.value;
      var doc = {
        _id: _id,
        markdown: ''
      };
      db.put(doc);
      // TODO: handle stuff
      self.doc = doc;
      e.target.value = '';
      self.listDocs();
    },
    loadDoc: function(e) {
      e.preventDefault();
      var self = this;
      db.get(e.targetVM.$value)
        .then(function(doc) {
          self.doc = doc;
        }
      );
    },
    saveDoc: function(e) {
      e.preventDefault();
      db.put(this.doc);
      // TODO: handle errors and stuff
    },
    deleteDoc: function(e) {
      e.preventDefault();
      if (this.confirmDelete) {
        db.remove(this.doc);
        // TODO: handle errors
        this.confirmDelete = false;
        this.listDocs();
      } else {
        this.confirmDelete = true;
      }
    },
    syncTo: function() {
      var self = this;
      // TODO: maybe do some validation or something
      var remote = new PouchDB(self.remote.url, {
        auth: {
          user: self.remote.user,
          password: self.remote.password
        }
      });
      PouchDB.sync(db, remote)
        .on('complete', function(info) {
          console.log('sync info', info);
          alert('woot!');
          self.showSyncForm = false;
          self.listDocs();
        });
    }
  },
  filters: {
    marked: marked
  }
});
