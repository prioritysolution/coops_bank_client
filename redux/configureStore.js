"use client";
import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import demoSlice from "./demoReducer"; // <--- Not for use, this is just an example
import loginSlice from "@/container/auth/login/LoginReducer";
import sidebarSlice from "@/container/sidebar/SidebarReducer";
import footerSlice from "@/container/footer/FooterReducer";
import operationalAreaSlice from "@/container/master/operationalArea/OperationalAreaReducer";
import shareProductSlice from "@/container/master/shareProduct/ShareProductReducer";
import depositInterestSetupSlice from "@/container/master/depositInterestMaster/DepositInterestSetupReducer";
import depositAgentSlice from "@/container/master/depositAgent/DepositAgentReducer";
import issueMembershipSlice from "@/container/membership/issueMembership/IssueMembershipReducer";
import memberProfileSlice from "@/container/membership/memberProfile/MemberProfileReducer";
import openDepositAccountSlice from "@/container/deposit/openDepositAccount/OpenDepositAccountReducer";
import depositSlice from "@/container/deposit/deposit/DepositReducer";
import openBankAccountSlice from "@/container/banking/openBankAccount/OpenBankAccountReducer";
import bankDepositSlice from "@/container/banking/bankDeposit/BankDepositReducer";
import interestPayoutSlice from "@/container/deposit/interestPayout/InterestPayoutReducer";

export const store = configureStore({
  reducer: {
    abc: demoSlice, // <--- Not for use, this is just an example
    login: loginSlice,
    sidebar: sidebarSlice,
    footer: footerSlice,
    operationalArea: operationalAreaSlice,
    issueMembership: issueMembershipSlice,
    memberProfile: memberProfileSlice,
    shareProduct: shareProductSlice,
    depositInterestSetup: depositInterestSetupSlice,
    depositAgent: depositAgentSlice,
    openDepositAccount: openDepositAccountSlice,
    deposit: depositSlice,
    openBankAccount: openBankAccountSlice,
    bankDeposit: bankDepositSlice,
    interestPayout: interestPayoutSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
