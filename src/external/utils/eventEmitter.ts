import { EventEmitter as Emitter } from 'eventemitter3';

export class CacheUpdateEvent {
  static type = 'CacheUpdate';
  id: string;
  parser: any;
  isNew: boolean;
  //TODO: Describe type
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  constructor(id: string, isNew: boolean, parser: any) {
    this.id = id;
    this.parser = parser;
    this.isNew = isNew;
  }
}

export class CacheDeleteEvent {
  static type = 'CacheUpdate';
  id: string;
  constructor(id: string) {
    this.id = id;
  }
}

export class MarketUpdateEvent {
  static type = 'MarketUpdate';
  ids: Set<string>;
  constructor(ids: Set<string>) {
    this.ids = ids;
  }
}

export class CacheClearEvent {
  static type = 'CacheDelete';
}

export class EventEmitter {
  private emitter = new Emitter();

  onMarket(callback: (args: MarketUpdateEvent) => void): () => any {
    this.emitter.on(MarketUpdateEvent.type, callback);

    return (): any =>
      this.emitter.removeListener(MarketUpdateEvent.type, callback);
  }

  onCache(callback: (args: CacheUpdateEvent) => void): () => any {
    this.emitter.on(CacheUpdateEvent.type, callback);

    return (): any =>
      this.emitter.removeListener(CacheUpdateEvent.type, callback);
  }

  raiseMarketUpdated(ids: Set<string>): void {
    this.emitter.emit(MarketUpdateEvent.type, new MarketUpdateEvent(ids));
  }

  //TODO: Describe type
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  raiseCacheUpdated(id: string, isNew: boolean, parser: any): void {
    this.emitter.emit(
      CacheUpdateEvent.type,
      new CacheUpdateEvent(id, isNew, parser),
    );
  }

  raiseCacheDeleted(id: string): void {
    this.emitter.emit(CacheDeleteEvent.type, new CacheDeleteEvent(id));
  }

  raiseCacheCleared(): void {
    this.emitter.emit(CacheClearEvent.type, new CacheClearEvent());
  }
}
