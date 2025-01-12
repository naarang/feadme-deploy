export type ProjectRequest = {
  title: String;
  content: String;
};

export type ProjectIdResponse = { cryptography_project_id: string };

type reports = {
  title: string;
  content: string;
};
type evaluation = {
  id: number;
  nickname: string;
};
export type ProjectDetailResponse = {
  reports: reports;
  evaluations: evaluation[];
};
