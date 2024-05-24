export class Messaages {
  createdata(message: string) {
    return `${message} Created Successfully`;
  }

  Updatedata(message: string) {
    return `${message} Updated Successfully`;
  }

  Deletedata(message: string) {
    return `${message} Deleted Successfully`;
  }

  Selectdata(message: string) {
    return `${message} Retreived Successfully`;
  }

  NotFounddata(message: string) {
    return `${message} Is Not Found`;
  }
}
