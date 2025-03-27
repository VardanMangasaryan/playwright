import { APIRequestContext } from "playwright-core";

export class BaseRequest {
  readonly request: APIRequestContext;
  constructor(request: APIRequestContext) {
    this.request = request;
  }
}
