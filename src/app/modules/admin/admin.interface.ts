import { Types } from "mongoose";
import { TAdminRole } from "../../interfaces/interface";

export interface IAdmin {
  name: string
  email: string
  password: string
  departmentId?: Types.ObjectId
  hallId?: Types.ObjectId
  role: TAdminRole
}