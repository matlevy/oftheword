/**
 * The Observer interface declares the update method, used by subjects.
 */
 interface Observer {
    // Receive update from subject.
    update(subject: Subject): void;
}