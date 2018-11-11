import 'knockout';
import 'jquery';
import 'bootstrap';
import 'popper.js';
import './scss/style.scss';
import './js/persist.js';

import logo1 from './img/title1.png';
var logoImg1 = document.getElementById('logo1');
logoImg1.src = logo1;

import logo2 from './img/title2.png';
var logoImg2 = document.getElementById('logo2');
logoImg2.src = logo2;

if (process.env.NODE_ENV !== 'production') {
  console.log('In development mode');
}

var TagModel = function () {
  var self = this;

  self.showGame = ko.observable(false);
  self.showPlayers = ko.observable(true);

  self.tagsToAdd = ko.observable("");
  self.tags = ko.computed(function() {
    if (self.tagsToAdd() != "")
    return self.tagsToAdd() && self.tagsToAdd().split(/[,;\t\n]+/) || [];
  });
  self.tagArray = ko.observableArray().extend({persist: 'tagArray'});
  self.redTeamArray = ko.observableArray();
  self.blueTeamArray = ko.observableArray();

  self.addTag = function () {
    if (self.tags() != "")
    ko.utils.arrayForEach(this.tags(), function(tag) {
      var filteredTag = tag.replace(/[^0-9\-]/g,'');
      var value = parseFloat(filteredTag);
      var team = value < 0 ? "blue" : "red";
      var tagToAdd = {tag: filteredTag, team: team};
      var match = ko.utils.arrayFirst(self.tagArray(), function(i) {
        return i.tag === tagToAdd.tag;
      });
      if (match) { console.log("match"); } else {
        if (filteredTag != '')
        self.tagArray.push(tagToAdd);
      }
    });
    self.tagsToAdd("");
  };

  self.populateArrays = ko.computed(function() {
    self.redTeamArray.removeAll()
    self.blueTeamArray.removeAll()
    ko.utils.arrayForEach(self.tagArray(), function(tag) {
      if (tag.team == 'blue')
      self.blueTeamArray.push(tag);
      if (tag.team == 'red')
      self.redTeamArray.push(tag);
    });
  });

  self.removeTag = function(tag) { self.tagArray.remove(tag) };
  self.clearTags = function() { self.tagArray.removeAll(); self.resetGame() };

  self.buttonText = ko.observable('Play Ball');

  self.playGame = function() {
    if (self.blueTeamArray() == "")
    return alert("You have no players on your Blue team, that's not very fair. Add some negative number tags to make your blue team.");
    if (self.redTeamArray() == "")
    return alert("You have no players on your Red team, that's not very fair. Add some positive number tags to make your red team.");
    self.showGame(!self.showGame());
    self.showPlayers(!self.showPlayers());
    self.buttonText(self.buttonText().toUpperCase() === 'PLAY BALL' ? 'Stop game' : 'Play ball');
    $(".playBtn").removeClass(self.buttonText().toUpperCase() === 'PLAY BALL' ? 'redBtn' : 'greenBtn');
    $(".playBtn").addClass(self.buttonText().toUpperCase() === 'PLAY BALL' ? 'greenBtn' : 'redBtn');
    $("html, body").animate({ scrollTop: $(document).height() }, "slow");
  };

  self.resetGame = function() {
    self.showGame(false);
    self.showPlayers(true);
    $(".playBtn").removeClass('redBtn');
    $(".playBtn").addClass('greenBtn');
    self.buttonText('Play ball');
  };

  self.tagsToEdit = ko.observable("");
  self.tagsToSave = ko.observable("");
  self.canSave = ko.computed(function() {
    return $('#tagEditor').val() == self.tagsToEdit();
  });

  self.editingTags = ko.computed(function(){
    var tags = ko.utils.arrayMap(self.tagArray(), function(i) {
        return i.tag;
    });
    self.tagsToEdit(tags);
  }, self);

  self.saveNewTags = ko.computed(function() {
    if (self.tagsToEdit() != "")
    return $('#tagEditor').val() && $('#tagEditor').val().split(/[,;\t\n]+/) || [];
  });

  self.editTag = function () {
    var saveArray = self.saveNewTags()
    self.tagArray.removeAll()
    ko.utils.arrayForEach(saveArray, function(tag) {
      var filteredTag = tag.replace(/[^0-9\-]/g,'');
      var value = parseFloat(filteredTag);
      var team = value < 0 ? "blue" : "red";
      var tagToAdd = {tag: filteredTag, team: team};
      var match = ko.utils.arrayFirst(self.tagArray(), function(i) {
        return i.tag === tagToAdd.tag;
      });
      if (match) { console.log("match"); } else {
        if (filteredTag != '')
        self.tagArray.push(tagToAdd);
      }
    });
  };
};

$('#editForm').submit(function(e) {
    e.preventDefault();
    $('#editModal').modal('toggle');
    return false;
});

// When I started building I added the functionality that only numbers could
// be added to the text area as well as , ; return;
// but then I read the breif again and changed it so it instead filters
// out the letters after the fact like the breif says.
// But I left this code here (works but not functioning) to show you that
// I explored the use of bindingHandlers in knockout.

ko.bindingHandlers.numeric = {
  init: function (element, valueAccessor) {
    $(element).on("keydown", function (event) {
      if (event.keyCode == 32 || event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 || event.keyCode == 13 ||
        (event.keyCode == 65 && event.ctrlKey === true) ||
        (event.keyCode == 186 || event.keyCode == 188 || event.keyCode == 189 || event.keyCode == 110) ||
        (event.keyCode >= 35 && event.keyCode <= 39)) {
        return;
      } else {
        if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
          event.preventDefault();
        }
      }
    });
  }
};

ko.applyBindings(new TagModel());
