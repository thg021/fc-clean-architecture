type NotificationErrorProps = {
  message: string;
  context: string;
};
export class Notification {
  private errors: NotificationErrorProps[] = [];

  addError(errors: NotificationErrorProps) {
    this.errors.push(errors);
  }

  message(context?: string): string {
    return this.errors
      .filter((item) => {
        if (context === undefined) {
          return item;
        }

        if (context === item.context) {
          return item;
        }
      })
      .map((item) => {
        return `${item.context}: ${item.message}`;
      })
      .join(", ");
  }

  hasErrors(): boolean {
    return this.errors.length > 0;
  }
}
