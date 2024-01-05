import { Types } from "mongoose"
import { TStudentStatus } from "../../interfaces/interface"

export interface IStudent {
  studentId: string
  name: string
  email: string
  password: string
  dateOfBirth: Date
  fatherName: string
  motherName: string
  avatar: string
  session: string
  phone: string
  facultyId: Types.ObjectId
  departmentId: Types.ObjectId
  residentialHall: Types.ObjectId
  educationalQualifications: Array<IEducationalQualification>
  presentAddress: IAddress
  permanentAddress: IAddress
  nationality: string
  religion: string
  status: TStudentStatus
  isVerified: boolean
}

export interface IEducationalQualification {
  name: string
  passingYear: number
  institute: string
  board: string
  roll: string
  GPA: number
}

export interface IAddress {
  village: string
  subDistrict: string
  postOffice: string
  district: string
  zipCode: string
}