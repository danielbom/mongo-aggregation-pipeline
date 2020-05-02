const PipelineBuilder = require("./PipelineBuilderComplete");

module.exports = {
  PipelineBuilder,
  pipeline(...args) {
    return new PipelineBuilder(...args);
  },
};
