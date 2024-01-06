/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomError from "../../errorHandler/customError";
import generateToken from "../../utils/generateToken";
import verifyPassword from "../../utils/verifyPassword";
import BaseServices from "../baseServices";
import Student from "./student.model";

class StudentService extends BaseServices<any> {
  constructor(model: any) {
    super(model)
  }

  async login(payload: { emailOrStudentId: string, password: string }) {
    const user = await this.model.findOne(
      {
        $or: [
          { email: payload.emailOrStudentId },
          { studentId: payload.emailOrStudentId }
        ]
      }
    ).select('+password')

    if (!user) throw new CustomError(400, 'Wrong Credentials!')
    await verifyPassword(payload.password, user.password)
    const token = generateToken({ _id: user._id, email: user.email, role: 'STUDENT' })

    return {
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: 'STUDENT',
      }
    }
  }
}

const studentServices = new StudentService(Student)

export default studentServices