type JsonValue =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonValue }
  | JsonValue[];

export abstract class BaseWebStorage {
  protected storage: Storage;

  constructor(storage?: Storage) {
    this.storage = storage ?? localStorage;
  }

  protected get<T extends JsonValue>(key: string): T | null {
    try {
      const item = this.storage.getItem(key);

      if (item === null) {
        return null;
      }

      return JSON.parse(item) as T;
    } catch {
      return null;
    }
  }

  protected set<T extends JsonValue>(key: string, value: T): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  protected remove(key: string): void {
    this.storage.removeItem(key);
  }
}
