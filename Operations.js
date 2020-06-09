class Operation {
  addFields(expression) {
    return { $addFields: expression };
  }

  group(expression) {
    return { $group: expression };
  }

  match(expression) {
    return { $match: expression };
  }

  project(expression) {
    return { $project: expression };
  }

  unwind(path, options = {}) {
    return { $unwind: { path, ...options } };
  }

  lookup(fromOrExpression, localField, foreignField, as) {
    if (typeof fromOrExpression === "string") {
      return {
        $lookup: {
          from: fromOrExpression,
          localField,
          foreignField,
          as: as || localField,
        },
      };
    }
    return { $lookup: fromOrExpression };
  }

  bucket(expression) {
    return { $bucket: expression };
  }

  bucketAuto(expression) {
    return { $bucketAuto: expression };
  }

  colStat(expression) {
    return { $colStat: expression };
  }

  count(field) {
    return { $count: field };
  }

  facet(expression) {
    return { $facet: expression };
  }

  geoNear(expression) {
    return { $geoNear: expression };
  }

  graphLookup(expression) {
    return { $graphLookup: expression };
  }

  indexStat() {
    return { $indexStat: {} };
  }

  limit(number) {
    return { $limit: parseInt(number, 10) };
  }

  out(collectionName) {
    return { $out: collectionName };
  }

  redact(expression) {
    return { $redact: expression };
  }

  replaceRoot(newRoot) {
    return { $replaceRoot: { newRoot } };
  }

  sample(size) {
    return { $sample: { size } };
  }

  searchBeta(index, search, highlight) {
    return { $searchBeta: { index, search, highlight } };
  }

  skip(number) {
    return { $skip: parseInt(number, 10) };
  }

  sort(expression) {
    return { $sort: expression };
  }

  sortByCount(expression) {
    return { $sortByCount: expression };
  }

  groupFields(root, _id, field, ...fields) {
    const allfields = [field, ...fields];
    const push = (obj, field) =>
      (obj[field.replace(/\./g, "")] = { $push: `$${field}` });
    const add = (obj, field) =>
      (obj[`${root}.${field}`] = `$${field.replace(/\./g, "")}`);

    return [
      this.group({
        _id,
        [root]: { $first: "$$ROOT" },
        ...allfields.reduce((obj, field) => (push(obj, field), obj), {}),
      }),
      this.addFields(
        allfields.reduce((obj, field) => (add(obj, field), obj), {})
      ),
      this.replaceRoot(`$${root}`),
    ];
  }

  lookupAndUnwind(
    fromOrExpression,
    localField,
    foreignField,
    as,
    unwindOptions
  ) {
    if (typeof fromOrExpression === "string") {
      return [
        this.lookup(fromOrExpression, localField, foreignField, as),
        this.unwind(`$${as || localField}`, unwindOptions),
      ];
    }
    return [
      this.lookup(fromOrExpression),
      this.unwind(`$${fromOrExpression.as || fromOrExpression.localField}`, localField),
    ];
  }

  lookupAndUnwindPreserveNulls(
    fromOrExpression,
    localField,
    foreignField,
    as,
    unwindOptions
  ) {
    if (typeof fromOrExpression === "string") {
      return [
        this.lookup(fromOrExpression, localField, foreignField, as),
        this.unwindPreserveNulls(`$${as || localField}`, unwindOptions),
      ];
    }
    return [
      this.lookup(fromOrExpression),
      this.unwindPreserveNulls(`$${fromOrExpression.as}`, localField),
    ];
  }

  unwindPreserveNulls(path, options = {}) {
    return this.unwind(path, { ...options, preserveNullAndEmptyArrays: true });
  }
}

module.exports = new Operation();
