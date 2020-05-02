declare module MongoPipeline {
  type AnyExpression =
    | Any
    | Group
    | Lookup
    | Unwind
    | Bucket
    | BucketAuto
    | ColStat
    | GraphLookup;

  interface Any {
    [key: string]: any;
  }

  interface Aggregator extends Any {
    aggregate(pipeline: AnyExpression[]): Promise<Any[]>;
  }

  interface Group extends Any {
    _id: Any;
  }

  interface Lookup {
    from: string;
    localField: string;
    foreignField: string;
    as: string;
  }

  interface Unwind {
    path?: string;
    includeArrayIndex?: string;
    preserveNullAndEmptyArrays?: Boolean;
  }

  interface Bucket extends Any {
    groupBy: Any;
    boundaries: Any[];
    default: Any;
  }

  interface BucketAuto extends Any {
    groupBy: Any;
    buckets: number;
    granularity: string;
  }

  interface ColStat {
    latencyStats?: {
      histograms?: boolean;
    };
    storageStats?: Any;
  }

  interface GraphLookup {
    from: string;
    startWith: Any;
    connectFromField: string;
    connectToField: string;
    as: string;
    maxDepth: number;
    depthField: string;
    restrictSearchWithMatch: Any;
  }

  interface PipelineBuilder {
    constructor(pipeline: AnyExpression[]);

    addFields(expression: Any): this;
    group(expression: Group): this;
    lookup(
      fromOrExpression: Lookup | string,
      localField?: string,
      foreighField?: string,
      as?: string
    ): this;
    match(expression: Any): this;
    project(expression: Any): this;
    unwind(path: string, options: Unwind): this;

    lookupAndUnwind(
      fromOrExpression: Lookup | string,
      localField?: Unwind | string,
      foreighField?: string,
      as?: string,
      unwindOptions?: Unwind
    ): this;

    push(...operation: AnyExpression[]): this;
    unwrap(): AnyExpression[];
    selfcopy(): this;

    aggregateWith(model: Aggregator): Promise<Any[]>;
    aggregateOneWith(model: Aggregator): Promise<Any>;

    bucket(expression: Bucket): this;
    bucketAuto(expression: BucketAuto): this;
    colStat(expression: ColStat): this;
    count(field: string): this;
    facet(expression: Any): this;
    geoNear(expression: Any): this;
    graphLookup(expression: GraphLookup): this;
    indexStat(): this;
    limit(number: number): this;
    out(collectionName: string): this;
    redact(expression: Any): this;
    replaceRoot(newRoot: string | Any): this;
    sample(size: number): this;
    searchBeta(index: string, search: Any, highlight: Any): this;
    skip(number: number): this;
    sort(expression: Any): this;
    sortByCount(expression: Any): this;
  }
}

export = MongoPipeline;
export as namespace MongoPipeline;
