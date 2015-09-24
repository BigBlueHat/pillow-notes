// globals: db

module.exports = {
  template: '#doc-list',
  data: function() {
    return {
      ids: []
    };
  },
  created: function() {
    var self = this;
    db.allDocs()
      .then(function(resp) {
        for (var i = 0; i < resp.rows.length; i++) {
          self.ids.push(resp.rows[i].id);
        }
      }
    );
  },
  methods: {
    loadDoc: function(id) {
      var self = this;
      db.get(id)
        .then(function(doc) {
          self.$root.input = doc.markdown;
        }
      );
    }
  }
};
