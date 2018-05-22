import { ReportFieldArray} from '../../../Models/Common/General';
import { CustomReportFields} from '../../../whatever/common/custom reports/customreport-addedit.component';

export interface IReportDataEntity

{
    ModuleId: number;
    ReportCategoryId: number;
    ReportsTypeId?: number;
    ExportFileName: string;
    ReportTitle: string;
    ReportSubTitle: string;
    ListReportFieldIdValues: ReportFieldArray[];
    CustomReportFields?: CustomReportFields[];
    CustomReportFilterQuery?: string;    
    ListCustomReportFilterFieldIdValues?: ReportFieldArray[];  
    ExportTypeId?: number;
    IsCustomize?: number;
}


