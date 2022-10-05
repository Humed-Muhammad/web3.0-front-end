import { Method, ResponseType } from "axios";

export interface HeaderObj {
  Authorization?: string;
  RFTOKEN?: string;
  "RECAPTCHA-RESPONSE"?: string;
}

export interface IAPICallConfig {
  route: string;
  method: Method;
  body?: object | FormData;
  query?: { [key: string]: any };
  header?: HeaderObj;
  isSecureRoute: boolean;
  dontRefresh?: boolean;
  responseType?: ResponseType;
  returnCleanResponse?: boolean;
  reCaptchaToken?: string;
  onUploadProgress?: (event: ProgressEvent) => void;
  isOnDownload?: boolean;
}
