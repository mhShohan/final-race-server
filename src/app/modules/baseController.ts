/* eslint-disable @typescript-eslint/no-explicit-any */
class BaseController {
  protected controller: any
  protected services: any

  constructor(controller: any, services: any) {
    this.controller = controller
    this.services = services
  }
}


export default BaseController