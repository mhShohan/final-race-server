/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from 'mongoose';
import BaseServices from '../baseServices';
import Course from './course.model';
import courseAggregationPipelines from './course.aggregation.pipelines';

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
  async readAll() {
    return this.model.aggregate([...courseAggregationPipelines.mergeCollections()]);
  }
}

const courseServices = new CourseService(Course);

export default courseServices;
