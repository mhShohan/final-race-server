/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseServices from "../baseServices";
import Student from "./student.model";

class StudentService extends BaseServices<any> {
  constructor(model: any) {
    super(model)
  }

  async login(payload: any) {
    return payload
  }
}

const studentServices = new StudentService(Student)

export default studentServices