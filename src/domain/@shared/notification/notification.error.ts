export class NotificationError extends Error {
  constructor(public message: string) {
    super(message);
    this.name = "NotificationError";
  }
}
