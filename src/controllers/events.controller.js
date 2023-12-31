const { eventService } = require('../services');

const createEvent = async (req, res) => {
  const newEvent = req.body;
  if (req.file) {
    const urlabsolute = req.file.path;
    const urlrelative = '/uploads';
    const url = urlabsolute.slice(urlabsolute.indexOf(urlrelative));
    newEvent.imageURL = `https://apimernfinal.onrender.com${url}`;
  }
  try {
    const _newEvent = await eventService.createEvent(newEvent);
    res.status(200).json({
      _newEvent,
      message: 'Event created',
      action: 'create',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const updateEvent = async (req, res) => {
  const { id } = req.params;
  const updateEvent = req.body;
  if (req.file) {
    const urlabsolute = req.file.path;
    const urlrelative = '/uploads';
    const url = urlabsolute.slice(urlabsolute.indexOf(urlrelative));
    updateEvent.imageURL = `https://apimernfinal.onrender.com${url}`;
  }
  try {
    const event = await eventService.getEventById(id);
    if (!event) {
      res.status(403).json({
        message: 'Event not found',
        action: 'update',
      });
    } else {
      const event = await eventService.updateEvent(id, updateEvent);
      res.status(200).json(event);
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await eventService.getEventById(id);
    if (!event) {
      res.status(403).json({
        message: 'Event not found',
        action: 'Delete',
      });
    } else {
      await eventService.deleteEvent(id);
      res.status(200).json({
        message: 'Event deleted',
        action: 'Delete',
      });
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getAllEvents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const allEvents = await eventService.getAllEvents({ page, limit });
    res.status(200).json(allEvents);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const getEventById = async (req, res) => {
  const { id } = req.params;
  try {
    const event = await eventService.getEventById(id);
    if (!event) {
      throw new Error('Event not found');
    } else {
      res.status(200).json(event);
    }
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  updateEvent,
};
