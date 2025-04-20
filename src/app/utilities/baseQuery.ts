const isDev: boolean = process.env.NODE_ENV === "development";

const dev: string = "http://10.10.220.25:5000/api/v1";
const prod: string =
  "https://bicm-result-management-server.m360ictapi.com/api/v1";

export const baseUrl: string = isDev ? dev : prod;
