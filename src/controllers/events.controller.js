const createEvent = (req, res) => {
  try {
    res.status(200).json({
      message: 'Event created',
      action: 'create',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = { createEvent };