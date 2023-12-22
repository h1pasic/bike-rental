export default interface ReactState<T> {
  state: T
  setState: (value: T | ((prevState: T) => T)) => void
}
