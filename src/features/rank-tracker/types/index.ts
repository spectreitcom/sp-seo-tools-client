export type DomainPositionHistory = {
  domainPositionId: string;
  createdAt: string;
  position: number;
};

export type Domain = {
  domainId: string;
  domain: string;
  keywordsCount: number;
};

export type KeywordGrowth = "UP" | "DOWN" | "NO_CHANGE";

export type Keyword = {
  keywordId: string;
  keywordText: string;
  lastIndexedPosition: number;
  localizationCountryCode: string;
  device: string;
  domain: string;
  localizationCountryName: string;
  deviceName: string;
  growth: KeywordGrowth;
};

export type AvailableKeywordsQuantity = {
  maxKeywordsQuantity: number;
  usedKeywordsQuantity: number;
  exceeded: boolean;
};

export type CreateKeywordPayload = {
  domainId: string;
  text: string;
  device: string;
  localizationId: string;
};

export type CreateCheckoutSessionResponse = {
  sessionUrl: string;
};

export type CreateSessionPortalResponse = {
  url: string;
};

export type RtSubscriptionPlan = {
  subscriptionId: string;
  name: string;
  amount: number;
  maxKeywordsQty: number;
  maxSearchedPages: number;
};

export type RtDevice = { label: string; value: string };

export type RtLocalization = {
  localizationId: string;
  countryCode: string;
  name: string;
};

type ExpiresAt = {
  value: number;
};

export type RtUserTestingModeInfoResponse = {
  isActive: boolean;
  canActivate: boolean;
  expiresAt: ExpiresAt | null;
};
