const op = require("./Operations");

class PipelineBuilder {
  static get GROUP_FIELDS_ROOT() {
    return "root";
  }
  static get op() {
    return op;
  }

  constructor(pipeline = []) {
    if (pipeline instanceof PipelineBuilder) {
      this._pipeline = pipeline.unwrap();
    } else {
      this._pipeline = pipeline;
    }
  }

  addFields(expression) {
    return this.push(op.addFields(expression));
  }

  group(expression) {
    return this.push(op.group(expression));
  }

  match(expression) {
    return this.push(op.match(expression));
  }

  project(expression) {
    return this.push(op.project(expression));
  }

  unwind(path, options = {}) {
    return this.push(op.unwind(path, options));
  }

  unwindPreserveNulls(path, options = {}) {
    return this.push(op.unwindPreserveNulls(path, options));
  }

  lookup(fromOrExpression, localField, foreignField, as) {
    return this.push(op.lookup(fromOrExpression, localField, foreignField, as));
  }

  bucket(expression) {
    return this.push(op.bucket(expression));
  }

  bucketAuto(expression) {
    return this.push(op.bucketAuto(expression));
  }

  colStat(expression) {
    return this.push(op.colStat(expression));
  }

  count(field) {
    return this.push(op.count(field));
  }

  facet(expression) {
    return this.push(op.facet(expression));
  }

  geoNear(expression) {
    return this.push(op.geoNear(expression));
  }

  graphLookup(expression) {
    return this.push(op.graphLookup(expression));
  }

  indexStat() {
    return this.push(op.indexStat());
  }

  limit(number) {
    return this.push(op.limit(number));
  }

  out(collectionName) {
    return this.push(op.out(collectionName));
  }

  redact(expression) {
    return this.push(op.redact(expression));
  }

  replaceRoot(newRoot) {
    return this.push(op.replaceRoot(newRoot));
  }

  sample(size) {
    return this.push(op.sample(size));
  }

  searchBeta(index, search, highlight) {
    return this.push(op.searchBeta(index, search, highlight));
  }

  skip(number) {
    return this.push(op.skip(number));
  }

  sort(expression) {
    return this.push(op.sort(expression));
  }

  sortByCount(expression) {
    return this.push(op.sortByCount(expression));
  }

  groupFields(_id, field, ...fields) {
    return this.push(
      ...op.groupFields(this.GROUP_FIELDS_ROOT, _id, field, ...fields)
    );
  }

  lookupAndUnwind(
    fromOrExpression,
    localField,
    foreignField,
    as,
    unwindOptions
  ) {
    return this.push(
      ...op.lookupAndUnwind(
        fromOrExpression,
        localField,
        foreignField,
        as,
        unwindOptions
      )
    );
  }

  lookupAndUnwindPreserveNulls(
    fromOrExpression,
    localField,
    foreignField,
    as,
    unwindOptions
  ) {
    return this.push(
      ...op.lookupAndUnwindPreserveNulls(
        fromOrExpression,
        localField,
        foreignField,
        as,
        unwindOptions
      )
    );
  }

  push(...operation) {
    this._pipeline.push(...operation);
    return this;
  }

  unwrap() {
    return JSON.parse(JSON.stringify(this._pipeline)); // deepclone
  }

  log(logger = null) {
    if (typeof logger === "function") {
      logger(this.unwrap());
    } else {
      console.log(JSON.stringify(this._pipeline, null, 2));
    }
    return this;
  }

  aggregateWith(model) {
    return model.aggregate(this._pipeline);
  }

  async aggregateOneWith(model) {
    const result = await this.aggregateWith(model);
    return result[0];
  }
}

module.exports = PipelineBuilder;
