import {describe, expect, test} from "vitest";
import {Cache} from "./pokecache.js";

const cache = new Cache(100);
describe("Cache", () => {
    test("add and get", () => {
        cache.add("key1", "value1");
        const value = cache.get<string>("key1");
        expect(value).toBe("value1");
    });
    
    test("reap old entries", async () => {
        cache.add("key2", "value2");
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const value = cache.get<string>("key2");
        expect(value).toBeUndefined();
    });

    test.concurrent.each([
  {
    key: "https://example.com",
    val: "testdata",
    interval: 500, // 1/2 second
  },
  {
    key: "https://example.com/path",
    val: "moretestdata",
    interval: 1000, // 1 second
  },
])("Test Caching $interval ms", async ({ key, val, interval }) => {
  const cache = new Cache(interval);

  cache.add(key, val);
  const cached = cache.get(key);
  expect(cached).toBe(val);

  await new Promise((resolve) => setTimeout(resolve, interval * 4));
  const reaped = cache.get(key);
  expect(reaped).toBe(undefined);

  cache.stopReapLoop();
});

});


