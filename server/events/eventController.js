const Event = require('./eventModel.js');
const Q = require('q');
const key = require('../keys/apikeys.js');
const eventful = require('eventful-node');
const client = new eventful.Client(key.eventful);

// This function is for optimization to allow auto-refreshing of event listings
// var updateEvent= Q.nbind(Event.update, Event);

module.exports = {
  // Queries DB for event document, if not found, queries eventful API
  getEvents: (req, res, next) => {
    req.query.where = req.query.where.toUpperCase();
    Event.findOne({
      dateAndPlace: req.query.date + req.query.where + req.query.q,
    })
    .then((doc) => {
      if (doc) {
        console.log("retrieving from database...");
        res.json(doc.eventList);
      } else {
        client.searchEvents(req.query,
          (err, data) => {
            if (err) {
              console.error('Error received in searchEvents:', err);
            } else {
              if (data) {
                // data received from eventful API, return data to map, then store in db
                  // uses $currentDate to pull date and sets value of lastModified column
                  // $currentDate: {
                  //   lastModified: true,
                  // },
                const eventList = data.search.events.event;
                if (!eventList) {
                  res.end();
                } else {
                  for (let i = 0; i < eventList.length; i++) {
                    if (eventList[i].description) {
                      eventList[i].description = eventList[i].description.slice(0, 500) + '...';
                    }
                    const used = ['title', 'venue_name', 'venue_address', 'city_name',
                      'region_abbr', 'url', 'latitude', 'longitude', 'description'];
                    for (const prop in eventList[i]) {
                      if (used.indexOf(prop) === -1) {
                        delete eventList[i][prop];
                      }
                    }
                  }

                  Event.create({
                    dateAndPlace: req.query.date + req.query.where + req.query.q,
                    eventList: eventList,
                  }, (err, list) => {
                    if (err){
                      console.log('ERROR: ', err);
                    } else {
                      console.log('List Added');
                    }
                    res.json(eventList);
                  });
                }
              }
            }
          });
      }
    });
  },
};
