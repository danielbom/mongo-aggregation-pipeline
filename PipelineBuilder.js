class PipelineBuilder {
  constructor(pipeline = []) {
    this._pipeline = pipeline;
  }

  addFields(expression) {
    return this.push({ $addFields: expression });
  }

  group(expression) {
    return this.push({ $group: expression });
  }

  lookup(fromOrExpression, localField, foreighField, as) {
    const expression =
      typeof fromOrExpression === "string"
        ? {
            from: fromOrExpression,
            localField,
            foreighField,
            as: as || localField,
          }
        : fromOrExpression;

    return this.push({ $lookup: expression });
  }

  match(expression) {
    return this.push({ $match: expression });
  }

  project(expression) {
    return this.push({ $project: expression });
  }

  unwind(path, options = {}) {
    return this.push({ $unwind: { path }, ...options });
  }

  lookupAndUnwind(
    fromOrExpression,
    localField,
    foreighField,
    as,
    unwindOptions
  ) {
    as = typeof fromOrExpression === "string" ? localField : as;
    this.lookup(fromOrExpression, localField, foreighField, as);
    this.unwind(`$${as}`, unwindOptions);
    return this;
  }

  push(...operation) {
    this._pipeline.push(...operation);
    return this;
  }

  unwrap() {
    return JSON.parse(JSON.stringify(this._pipeline)); // deepclone
  }

  selfcopy() {
    return new PipelineBuilder(this.unwrap());
  }

  async aggregateWith(model) {
    return model.aggregate(this._pipeline);
  }

  async aggregateOneWith(model) {
    const result = await this.aggregateWith(model);
    return result[0];
  }
}

module.exports = PipelineBuilder;
