const createApi = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/`;

export const endPoints = {
  test: `${createApi}test`,
  login: `${createApi}user/login`,
  getFinancialYear: (orgId) => `${createApi}Org/GetFinancialYear/${orgId}`,
  getSidebarData: (orgId) => `${createApi}Org/GetUserDashboard/${orgId}`,
  addMasterState: `${createApi}Org/MasterSetup/AddState`,
  updateMasterState: `${createApi}Org/MasterSetup/UpdateState`,
  getMasterStateData: (id) => `${createApi}Org/MasterSetup/GetStateList/${id}`,
  addMasterDistrict: `${createApi}Org/MasterSetup/AddDistrict`,
  updateMasterDistrict: `${createApi}Org/MasterSetup/UpdateDist`,
  getMasterDistrictData: (id) =>
    `${createApi}Org/MasterSetup/GetDistList/${id}`,
  getMasterDistrictUnderStateData: (stateId, orgId) =>
    `${createApi}Org/MasterSetup/GetStateWistDist/${stateId}/${orgId}`,
  addMasterBlock: `${createApi}Org/MasterSetup/AddBlock`,
  updateMasterBlock: `${createApi}Org/MasterSetup/UpdateBlock`,
  getMasterBlockData: (id) => `${createApi}Org/MasterSetup/GetBlockList/${id}`,
  getMasterBlockUnderDistrictData: (orgId, distId, stateId) =>
    `${createApi}Org/MasterSetup/GetDistWiseBlock/${orgId}/${distId}/${stateId}`,
  addMasterPoliceStation: `${createApi}Org/MasterSetup/AddPoliceStation`,
  updateMasterPoliceStation: `${createApi}Org/MasterSetup/UpdatePoliceStation`,
  getMasterPoliceStationData: (id) =>
    `${createApi}Org/MasterSetup/GetPoliceList/${id}`,
  getMasterPoliceStationUnderDistrictData: (orgId, distId) =>
    `${createApi}Org/MasterSetup/GetDistWisePolice/${orgId}/${distId}`,
  addMasterPostOffice: `${createApi}Org/MasterSetup/AddPostOffice`,
  updateMasterPostOffice: `${createApi}Org/MasterSetup/UpdatePostOffice`,
  getMasterPostOfficeData: (id) =>
    `${createApi}Org/MasterSetup/GetPostOffice/${id}`,
  getMasterPostOfficeUnderDistrictData: (orgId, distId) =>
    `${createApi}Org/MasterSetup/GetDistWisePost/${orgId}/${distId}`,
  addMasterVillage: `${createApi}Org/MasterSetup/AddVillage`,
  updateMasterVillage: `${createApi}Org/MasterSetup/UpdateVillage`,
  getMasterVillageData: (id) =>
    `${createApi}Org/MasterSetup/GetVillageList/${id}`,
  getMasterVillageUnderBlockData: (orgId, blockId) =>
    `${createApi}Org/MasterSetup/GetBlockWiseVilleage/${orgId}/${blockId}`,
  addMasterUnit: `${createApi}Org/MasterSetup/AddUnit`,
  updateMasterUnit: `${createApi}Org/MasterSetup/UpdateUnit`,
  getMasterUnitData: (id) => `${createApi}Org/MasterSetup/GetUnitList/${id}`,
  getMemberTypeData: `${createApi}OrgSetup/GetMemberType`,
  getShareProductDetails: (orgId, prodId) =>
    `${createApi}Org/MasterSetup/ShareProductDetails/${orgId}/${prodId}`,
  addShareProduct: `${createApi}Org/MasterSetup/ProcessShareProduct`,
  getCashDemonData: `${createApi}Org/MasterSetup/GetCashDenom`,
  getRelationTypeData: `${createApi}Org/MasterSetup/GetRelationType`,
  getGenderData: `${createApi}Org/MasterSetup/GetGender`,
  getCasteData: `${createApi}Org/MasterSetup/GetCaste`,
  getReligionData: `${createApi}Org/MasterSetup/GetReligion`,
  getAgentPayout: `${createApi}Org/MasterSetup/GetAgentPayout`,
  addDepositAgent: `${createApi}Org/MasterSetup/AddDepositAgent`,
  addDepositInterestSetup: `${createApi}Org/MasterSetup/DepositIntSlab`,
  postMemberProfile: `${createApi}Org/MemberShip/AddProfile`,
  getMemberDataById: (orgId, memberNo) =>
    `${createApi}Org/MemberShip/GetMemberData/${orgId}/${memberNo}`,
  getMemberDataByName: (orgId, name) =>
    `${createApi}Org/MemberShip/MemberSearch/${orgId}/${name}`,
  getMemberProductData: (orgId, typeId) =>
    `${createApi}Org/MemberShip/GetProductData/${orgId}/${typeId}`,
  addIssueMembership: `${createApi}Org/MemberShip/AddMembership`,
  getShareIssueDataById: `${createApi}Org/MemberShip/GetShereData`,
  addShareIssue: `${createApi}Org/MemberShip/IssueShare`,
  addShareRefund: `${createApi}Org/MemberShip/RefundShare`,
  addMembershipWithdraw: `${createApi}Org/MemberShip/WithdrwanMembership`,
  getDepositAccountTypeData: (orgId) =>
    `${createApi}Org/ProcessDeposit/GetProdType/${orgId}`,
  getDepositProductData: (orgId, typeId) =>
    `${createApi}Org/ProcessDeposit/GetProduct/${orgId}/${typeId}`,
  getDurationTypeData: `${createApi}Org/ProcessDeposit/GetDuration`,
  getDepositInterestRate: `${createApi}Org/ProcessDeposit/GetInttRate`,
  getMaturityInstructionData: `${createApi}Org/ProcessDeposit/GetMaturInstruction`,
  getOperationModeData: `${createApi}Org/ProcessDeposit/GetOperationMode`,
  getPayoutModeData: `${createApi}Org/ProcessDeposit/GetIntPayoutMode`,
  checkDepositAmount: `${createApi}Org/ProcessDeposit/CheckAmount`,
  checkDepositDuration: `${createApi}Org/ProcessDeposit/CheckDuration`,
  getDepositMaturityAmount: `${createApi}Org/ProcessDeposit/GetMaturityAmt`,
  getDepositPayoutAmount: `${createApi}Org/ProcessDeposit/GetPayoutAmount`,
  getDepositAgentData: (orgId) =>
    `${createApi}Org/MasterSetup/GetDepositAgent/${orgId}`,
  getDepositEcsAccount: (orgId, memberId) =>
    `${createApi}Org/ProcessDeposit/GetEcsAccount/${orgId}/${memberId}`,
  addDepositAccount: `${createApi}Org/ProcessDeposit/AddDepositAccount`,
  getAccountDetailsByAccountNo: `${createApi}Org/ProcessDeposit/GetAccountDetails`,
  getAccountList: (orgId, type, value) =>
    `${createApi}Org/ProcessDeposit/SearchAccount/${orgId}/${type}/${value}`,
  addDeposit: `${createApi}Org/ProcessDeposit/PostDeposit`,
  addWithdrawn: `${createApi}Org/ProcessDeposit/PostWithdrwan`,
  getSpecimen: (orgId, acctId) =>
    `${createApi}Org/ProcessDeposit/GetSpecimen/${orgId}/${acctId}`,
  addWithdrawn: `${createApi}Org/ProcessDeposit/PostWithdrwan`,
  getDepositInterestProduct: (orgId, typeId) =>
    `${createApi}Org/ProcessDeposit/GetProduct/${orgId}/${typeId}`,
  getDepositCloseAccount: `${createApi}Org/ProcessDeposit/GetCloseData`,
  addDepositCloseAccount: `${createApi}Org/ProcessDeposit/PostCloseAccount`,
  getBankAccountType: `${createApi}Org/ProcessBankAccount/GetAccountType`,
  getBankGl: `${createApi}Org/ProcessBankAccount/GetGl`,
  addOpenBankAccount: `${createApi}Org/ProcessBankAccount/AddAccount`,
  getBankAccount: (orgId) =>
    `${createApi}Org/ProcessBankAccount/GetAccount/${orgId}`,
  getBankBalance: `${createApi}Org/ProcessBankAccount/GetBalance`,
  addBankDeposit: `${createApi}Org/ProcessBankAccount/Deposit`,
  addBankWithdrawn: `${createApi}Org/ProcessBankAccount/Withdrwan`,
  addBankTransfer: `${createApi}Org/ProcessBankAccount/Transfer`,
  addBankCloseAccount: `${createApi}Org/ProcessBankAccount/CloseAccount`,
  logout: `${createApi}Org/User/ProcessLogOut`,
};
