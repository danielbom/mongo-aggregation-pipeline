const PipelineBuilder = require("./PipelineBuilder");
const PipelineBuilderComplete = require("./PipelineBuilderComplete");

module.exports = {
  PipelineBuilder,
  PipelineBuilderComplete,
  pipemongo() {
    return new PipelineBuilder();
  },
  pipemongofull() {
    return new PipelineBuilderComplete();
  },
};
