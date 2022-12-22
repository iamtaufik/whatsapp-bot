const generateCommand = (message) => {
  const cmd = message.replace('.ai ', '');
  return cmd;
};

module.exports = { generateCommand };
