import { JwtPayload } from 'jsonwebtoken';

export type TYears = '1st' | '2nd' | '3rd' | '4th' | '5th';
export type TSemesters = '1st' | '2nd';
export type TAcademicType = 'HONOURS' | 'MASTERS';
export type TAdminRole =
  | 'SUPER_ADMIN'
  | 'ADMIN'
  | 'CHAIRMAN'
  | 'HALL_OPERATOR'
  | 'DEPARTMENT_OPERATOR'
  | 'STUDENT';

export type TStudentStatus = 'NOT_REQUESTED' | 'ACTIVE' | 'PENDING' | 'BLOCK' | 'REQUESTED' | 'CERTIFIED' | 'REJECTED';

export interface IJwtPayload extends JwtPayload {
  _id: string;
  email: string;
  role: TAdminRole;
}


export type ISemesterFeeFormStatus = 'submitted' |
  'approved_by_chairman' |
  'rejected_by_chairman' |
  'approved_by_hall_authority' |
  'rejected_by_hall_authority' |
  'approved_by_bank_accountant' |
  'rejected_by_bank_accountant' |
  'approved_by_exam_controller' |
  'rejected_by_exam_controller';

