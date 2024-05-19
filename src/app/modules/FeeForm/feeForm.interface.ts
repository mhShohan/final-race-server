import { TSemesters, TYears } from '../../interfaces/interface';
import { IDepartmentalFeeForm } from './departmentalFeeForm/departmentalFeeForm.interfaces';
import { IResidentialFeeForm } from './residentialFeeForm/residentialFeeForm.interface';
import { ISemesterFeeForm } from './semesterFeeForm/semesterFeeForm.interfaces';

export interface IFeeForm {
  year: TYears;
  semester: TSemesters;
  departmentalFee: IDepartmentalFeeForm;
  semesterFee: ISemesterFeeForm;
  residentialFee?: IResidentialFeeForm;
}
