class PipelineBuilder {
  constructor(pipeline = []) {
    if (pipeline instanceof PipelineBuilder) {
      this._pipeline = pipeline.unwrap();
    } else {
      this._pipeline = pipeline;
    }
  }

  addFields(expression) {
    return this.push({ $addFields: expression });
  }

  group(expression) {
    return this.push({ $group: expression });
  }

  lookup(fromOrExpression, localField, foreignField, as) {
    if (typeof fromOrExpression === "string") {
      return this.push({
        $lookup: {
          from: fromOrExpression,
          localField,
          foreignField,
          as: as || localField,
        },
      });
    }
    return this.push({ $lookup: fromOrExpression });
  }

  match(expression) {
    return this.push({ $match: expression });
  }

  project(expression) {
    return this.push({ $project: expression });
  }

  unwind(path, options = {}) {
    return this.push({ $unwind: { path, ...options } });
  }

  unwindPreserveNulls(path, options = {}) {
    return this.unwind(path, { ...options, preserveNullAndEmptyArrays: true });
  }

  lookupAndUnwind(
    fromOrExpression,
    localField,
    foreignField,
    as,
    unwindOptions
  ) {
    if (typeof fromOrExpression === "string") {
      this.lookup(fromOrExpression, localField, foreignField, as);
      return this.unwind(`$${as}`, unwindOptions);
    }
    this.lookup(fromOrExpression);
    return this.unwind(`$${fromOrExpression.as}`, localField);
  }

  lookupAndUnwindPreserveNulls(
    fromOrExpression,
    localField,
    foreignField,
    as,
    unwindOptions
  ) {
    if (typeof fromOrExpression === "string") {
      this.lookup(fromOrExpression, localField, foreignField, as);
      return this.unwindPreserveNulls(`$${as}`, unwindOptions);
    }
    this.lookup(fromOrExpression);
    return this.unwindPreserveNulls(`$${fromOrExpression.as}`, localField);
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

  log(logger = null) {
    if (typeof logger === "function") {
      logger(this.unwrap());
    } else {
      console.log(JSON.stringify(this._pipeline, null, 2));
    }
    return this;
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
