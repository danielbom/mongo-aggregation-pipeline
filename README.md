# Mongo aggregation pipeline

This module provide a nice way to work with aggregations of mongodb using,
for example, the mongoose in nodejs.

## Basic example

```javascript
const mongoose = require('mongoose');
const { PipelineBuilder } = require('mongo-pipeline');

const pipeline = new PipelineBuilder();

const collection = await pipeline
  .match({ _id: mongoose.Types.ObjectID('xxxxxxxxxxxxxxxxxxx') })
  .lookupAndUnwind('collections', 'field', '_id', 'new')
  .log()
  .aggregateOneWith(mongoose.model('Collection'));
/*
[
  {
    $match: {
      _id: 'xxxxxxxxxxxxxxxxxxx'
    }
  },
  {
    "$lookup": {
      "from": "collections",
      "localField": "field",
      "foreignField": "_id",
      "as": "new"
    }
  },
  {
    "$unwind": {
      "path": "$new"
    }
  }
]
*/
```

See others examples in [test repository](https://github.com/danielbom/mongo-aggregation-pipeline-test).