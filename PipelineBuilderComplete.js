const PipelineBuilder = require("./PipelineBuilder");

class PipelineBuilderComplete extends PipelineBuilder {
  bucket(expression) {
    return this.push({ $bucket: expression });
  }

  bucketAuto(expression) {
    return this.push({ $bucketAuto: expression });
  }

  colStat(expression) {
    return this.push({ $colStat: expression });
  }

  count(field) {
    return this.push({ $count: field });
  }

  facet(expression) {
    return this.push({ $facet: expression });
  }

  geoNear(expression) {
    return this.push({ $geoNear: expression });
  }

  graphLookup(expression) {
    return this.push({ $graphLookup: expression });
  }

  indexStat() {
    return this.push({ $indexStat: {} });
  }

  limit(number) {
    return this.push({ $limit: parseInt(number, 10) });
  }

  out(collectionName) {
    return this.push({ $out: collectionName });
  }

  redact(expression) {
    return this.push({ $redact: expression });
  }

  replaceRoot(newRoot) {
    return this.push({ $replaceRoot: { newRoot } });
  }

  sample(size) {
    return this.push({ $sample: { size } });
  }

  searchBeta(index, search, highlight) {
    return this.push({ $searchBeta: { index, search, highlight } });
  }

  skip(number) {
    return this.push({ $skip: parseInt(number, 10) });
  }

  sort(expression) {
    return this.push({ $sort: expression });
  }

  sortByCount(expression) {
    return this.push({ $sortByCount: expression });
  }
}

module.exports = PipelineBuilderComplete;
