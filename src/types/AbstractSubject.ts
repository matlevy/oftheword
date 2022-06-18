/**
 * The Subject owns some important state and notifies observers when the state
 * changes.
 */
export class AbstractSubject implements Subject {
  /**
   * @type {number} For the sake of simplicity, the Subject's state, essential
   * to all subscribers, is stored in this variable.
   */
  public state = 0;

  /**
   * @type {Observer[]} List of subscribers. In real life, the list of
   * subscribers can be stored more comprehensively (categorized by event
   * type, etc.).
   */
  private observers: Observer[] = [];

  /**
   * The subscription management methods.
   */
  public attach(observer: Observer): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      return console.log("Subject: Observer has been attached already.");
    }
    this.observers.push(observer);
  }

  public detach(observer: Observer): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      return console.log("Subject: Nonexistent observer.");
    }
    this.observers.splice(observerIndex, 1);
  }

  /**
   * Trigger an update in each subscriber.
   */
  public notify(): void {
    for (const observer of this.observers) {
      observer.update(this);
    }
  }
}
