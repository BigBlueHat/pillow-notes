var marked = require('marked');
var PouchDB = require('pouchdb');
var Vue = require('vue');

var db = new PouchDB('pillow-notes');
window.db = db;

Vue.config.debug = true;

var default_doc = {
  _id: '', // title of the document
  markdown: '', // markdown
  created: '', // ISO 8601
  updated: '' // ISO 8601
};

window.app = new Vue({
  el: document.body,
  data: {
    new_doc_name: '',
    doc: default_doc,
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
      db.query(
        function(doc) {
          if (undefined !== doc.markdown) {
            emit(doc._id);
          }
        })
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
      var doc = default_doc;
      if (self.new_doc_name != '' && self.doc._id == '') {
        // we're making a new doc, but haven't loaded one
        doc._id = self.new_doc_name;
        doc.markdown = self.doc.markdown;
      } else if (self.new_doc_name == '' && self.doc._id == '') {
        // we're making a new doc, but have only clicked the "+"
        doc._id = (new Date).toISOString();
        doc.markdown = self.doc.markdown;
      } else if (self.doc._id !== '') {
        // there's a previously loaded doc in the editor, so don't save the
        // contents of the editor into the new doc
        doc._id = self.new_doc_name || (new Date).toISOString();
        doc.markdown = '';
      }

      // save the doc immediately
      db.put(doc)
        .then(function(resp) {
          console.log('resp', resp);
          // store the rev, so we can PUT the update later
          doc._rev = resp.rev;
          // make the new doc the current doc
          self.doc = doc;
          // reset the new doc value for future use
          self.new_doc_name = '';
          // reload the list of docs
          self.listDocs();
        }).catch(console.log.bind(console));
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
        this.doc = {
          _id: '',
          markdown: ''
        };
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
