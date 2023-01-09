declare class Signal<ListenerType> {
    private listeners;
    constructor();
    add(listener: (params: ListenerType) => void): void;
    remove(listener: (params: ListenerType) => void): void;
    emit(params: ListenerType): void;
}
export default Signal;
