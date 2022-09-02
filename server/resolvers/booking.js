const Event = require('../models/event');
const Booking = require('../models/booking');
const {transformBooking,transformEvent} =require('./merge')

module.exports = {
  
    bookings: async (args,req) => {
      if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }
      try {
        const bookings = await Booking.find();
        return bookings.map(booking => {
          return transformBooking(booking)
        });
      } catch (err) {
        throw err;
      }
    },
    bookEvent: async (args,req) => {
      if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }
      const fetchedEvent = await Event.findOne({ _id: args.eventId });
      const booking = new Booking({
        user: '630da3f0faf842bf711f7415',
        event: fetchedEvent
      });
      const result = await booking.save();
      return transformBooking(result)
    },
    cancelBooking: async args => {
      if (!req.isAuth) {
        throw new Error('Unauthenticated!');
      }
      try {
        const booking = await Booking.findById(args.bookingId).populate('event');//popluate is used for het the whole object not only objectid
        const event = transformEvent(booking.event)
        await Booking.deleteOne({ _id: args.bookingId });
        return event;
      } catch (err) {
        throw err;
      }
    }
  };  