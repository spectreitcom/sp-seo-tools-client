export type Analysis = {
  analysisId: string;
  userId: string;
  deviceName: string;
  progress: number;
  localizationName: string;
  localizationCountryCode: string;
  phrase: string;
  hasError: boolean;
};

export type AnalysisUsage = {
  monthlyLimit: number;
  usedQuota: number;
};

export type CreateAnalysisPayload = {
  keyword: string;
  localizationId: string;
  device: string;
};

export type PageData = {
  pageId: string;
  url: string;
  position: number;
  factors: Record<string, number>;
  hasError: boolean;
};

export type FactorsCollection = {
  label: string;
  factors: { label: string; key: string }[];
}[];

export type AnalysisDetails = {
  analysisId: string;
  phrase: string;
  localizationName: string;
  localizationCountryCode: string;
  deviceName: string;
  pages: PageData[];
  factorsCollection: FactorsCollection;
};

export type AddCompetitorPayload = {
  analysisId: string;
  url: string;
};
