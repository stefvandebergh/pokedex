

export type CacheEntry<T> = {
    createdAt: number,
    val: T
}

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: undefined | NodeJS.Timeout = undefined;
    #interval: number;

    constructor(interval: number) {
        this.#interval = interval;
        this.#startReapLoop();
    }

    add<T>(key: string, val: T): void {
        const entry: CacheEntry<T> = {
            createdAt: Date.now(),
            val
        };
        this.#cache.set(key, entry);
    }

    get<T>(key: string): T | undefined {
        const entry = this.#cache.get(key);
        if (entry) {
            return entry.val as T;
        }
        return undefined;
    }

    #reap(): void {
        const timeToDelete = Date.now() - this.#interval;
        for (const [key, entry] of this.#cache.entries()) {
            if (entry.createdAt < timeToDelete) {
                this.#cache.delete(key);
            }
        }
    }

    #startReapLoop(): void {
        this.#reapIntervalId = setInterval(() => this.#reap(), this.#interval);
    }

    stopReapLoop(): void {
        clearInterval(this.#reapIntervalId);
        this.#reapIntervalId = undefined;
    }
}
