var Event = require('./eventModel.js');
var Q = require('q');
var key = require('../keys/apikeys.js')
var eventful = require('eventful-node');
var client = new eventful.Client(key.eventful);

// This function is for optimization to allow auto-refreshing of event listings
// var updateEvent= Q.nbind(Event.update, Event);

module.exports = {
  // Queries DB for event document, if not found, queries eventful API
  getEvents: function(req, res, next) {
    req.query.where = req.query.where.toUpperCase();
    Event.findOne({
      dateAndPlace: req.query.date + req.query.where,
    })
    .then(function(doc){
      if (doc) {
        console.log("retrieving from database...");
        res.json(doc.eventList);
      } else {
        client.searchEvents(req.query,
          function(err, data){
            if (err) {
              console.error("Error received in searchEvents:", err);
            } else {
              if (data) {
                // data received from eventful API, return data to map, then store in db
                  // uses $currentDate to pull date and sets value of lastModified column
                  // $currentDate: {
                  //   lastModified: true,
                  // },
                var eventList = data.search.events.event;
                if(!eventList) {
                  res.end();
                } else {
                  for(var i = 0; i < eventList.length; i++){
                    if(eventList[i].description) {
                      eventList[i].description = eventList[i].description.slice(0, 500) + '...';
                    }
                    var used = ['title', 'venue_name', 'venue_address', 'city_name', 'region_abbr', 'url', 'latitude', 'longitude', 'description'];
                    for(var prop in eventList[i]) {
                      if(used.indexOf(prop) === -1){
                        delete eventList[i][prop];
                      }
                    }
                  }

                  Event.create({
                    dateAndPlace: req.query.date+req.query.where,
                    eventList: eventList,
                  }, function (err, list){
                    if (err){
                      console.log("ERROR: ", err);
                    } else {
                      console.log('LIST ADDED');
                    }
                  res.json(eventList);
                  });
                }
              }
            }
        });
      }
    });
  }
};
