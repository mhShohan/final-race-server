/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';
import BaseServices from '../baseServices';
import Course from './course.model';
import courseAggregationPipelines from './course.aggregation.pipelines';
import paginatePipeline from '../../lib/paginate.pipeline';

class CourseService extends BaseServices<any> {
  constructor(model: any) {
    super(model);
  }

  async read(id: string) {
    return this.model.aggregate([
      { $match: { _id: new Types.ObjectId(id) } },
      ...courseAggregationPipelines.mergeCollections(),
    ]);
  }

  async readAll(query: Record<string, unknown>) {
    const data = await this.model.aggregate([
      ...courseAggregationPipelines.mergeCollections(),
      ...courseAggregationPipelines.filterPipeline(query),
      ...paginatePipeline(query),
    ]);

    const total = await this.model.aggregate([
      ...courseAggregationPipelines.filterPipeline(query),
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
        },
      },
    ]);

    return { data, total };
  }
}

const courseServices = new CourseService(Course);

export default courseServices;
