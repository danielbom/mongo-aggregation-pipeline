const op = require('./Operations');
const PipelineBuilder = require("./PipelineBuilder");

module.exports = {
  PipelineBuilder,
  pipeline(...args) {
    return new PipelineBuilder(...args);
  },
  op
};
