export interface Account {
    accountNumber: number;
    name: string;
    marketValue: number;
    branchName: string;
    branchCode: number;
    revTrackingDescription: string;
    revTrackingCode: number;
    administrator: string;
    administratorCode: number;
    seniorAdministrator: string;
    seniorAdministratorCode: number;
    backupAdministrator: string;
    backupAdministratorCode: number;
    investmentManager: string;
    investmentManagerCode: number;
    backupInvestmentManager: string;
    backupInvestmentManagerCode: number;
    bankCapacity: string;
    controlGroup: string;
}