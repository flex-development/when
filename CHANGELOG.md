## [3.0.0](https://github.com/flex-development/when/compare/2.0.0...3.0.0) (2026-02-24)

### ⚠ BREAKING CHANGES

- `Catchable`, `Finalizable`, `Thenable`

### :package: Build

- [[`340df4f`](https://github.com/flex-development/when/commit/340df4f57ed241acc8ce8ab424cccfc023a949c2)] **deps-dev:** Bump cspell from 9.6.4 to 9.7.0 ([#18](https://github.com/flex-development/when/issues/18))
- [[`07726cd`](https://github.com/flex-development/when/commit/07726cd69f2153aae740c10697abfeabbc357b70)] **deps-dev:** Bump happy-dom from 20.6.3 to 20.7.0 ([#16](https://github.com/flex-development/when/issues/16))
- [[`ea80b80`](https://github.com/flex-development/when/commit/ea80b80eb67613cda8b7c45cd2d3aa6cd7dbc25b)] **deps-dev:** Bump rollup from 4.57.1 to 4.58.0 ([#13](https://github.com/flex-development/when/issues/13))
- [[`ef6cb07`](https://github.com/flex-development/when/commit/ef6cb07c6446ba449bdc02610d4aba2e26dd8786)] **deps-dev:** Bump rollup from 4.58.0 to 4.59.0 ([#17](https://github.com/flex-development/when/issues/17))

### :robot: Continuous Integration

- [[`ca32394`](https://github.com/flex-development/when/commit/ca323946f35cb01944141ea58504e940574e9b10)] **deps:** Bump streetsidesoftware/cspell-action from 8.2.0 to 8.3.0 ([#19](https://github.com/flex-development/when/issues/19))

### :pencil: Documentation

- [[`9636e24`](https://github.com/flex-development/when/commit/9636e24f6cc999d9256cc7ba0d3afad3bbfe5d6d)] testing

### :sparkles: Features

- [[`94af5ff`](https://github.com/flex-development/when/commit/94af5ffeb6e9b3330088f9eb48d4644c0592d53c)] `finally` support
- [[`e8ee57a`](https://github.com/flex-development/when/commit/e8ee57a301df194744163611169de33ed7f85738)] `Catchable`, `Finalizable`, `Thenable`
- [[`e75d78d`](https://github.com/flex-development/when/commit/e75d78d4265d384b10e09206a332e1abee2d4d2d)] **testing:** `createThenable`

### :bug: Fixes

- [[`014a949`](https://github.com/flex-development/when/commit/014a94908eb0fc1d39efcd2f19c0922b40fc9894)] **lib:** export `isCatchable`

## [2.0.0](https://github.com/flex-development/when/compare/1.0.0...2.0.0) (2026-02-19)

### ⚠ BREAKING CHANGES

- `catch` support

### :package: Build

- [[`dd93b19`](https://github.com/flex-development/when/commit/dd93b19904b21760b5ae86a48fe7b7127adbcf95)] **deps-dev:** Bump @commitlint/cli from 20.4.1 to 20.4.2 in the commitlint group ([#9](https://github.com/flex-development/when/issues/9))
- [[`9229069`](https://github.com/flex-development/when/commit/9229069b28f05bf3394c29d85ec3261c6246959b)] **deps-dev:** Bump happy-dom from 20.6.2 to 20.6.3 ([#10](https://github.com/flex-development/when/issues/10))

### :sparkles: Features

- [[`8d8f17f`](https://github.com/flex-development/when/commit/8d8f17f847ac90d5633d87c554229bbd42d9a1cf)] `catch` support
- [[`003be0f`](https://github.com/flex-development/when/commit/003be0f34d1e626b0ee6ea940d73f0babd12df78)] **lib:** `isPromise`

## 1.0.0 (2026-02-18)

### :package: Build

- [[`89747c3`](https://github.com/flex-development/when/commit/89747c317883b749a9f9ef20702c7a0847db291b)] **ts:** fix dts bundle

### :robot: Continuous Integration

- [[`8472f72`](https://github.com/flex-development/when/commit/8472f7299ee70065318b2b925fccb926e62ef46d)] **deps:** Bump actions/cache from 5.0.1 to 5.0.3 ([#2](https://github.com/flex-development/when/issues/2))
- [[`a490ffe`](https://github.com/flex-development/when/commit/a490ffea18095d99f07edba0608c5f517e1e60db)] **deps:** Bump actions/checkout from 6.0.1 to 6.0.2 ([#4](https://github.com/flex-development/when/issues/4))
- [[`cebe06a`](https://github.com/flex-development/when/commit/cebe06ae414c0bde9b126574cdf40bf5a6ba9311)] **deps:** Bump actions/setup-node from 6.1.0 to 6.2.0 ([#3](https://github.com/flex-development/when/issues/3))
- [[`34b0da9`](https://github.com/flex-development/when/commit/34b0da9ab276073eaa2675ca2072af7183fff021)] **deps:** Bump streetsidesoftware/cspell-action from 8.1.2 to 8.2.0 ([#1](https://github.com/flex-development/when/issues/1))

### :pencil: Documentation

- [[`b69462f`](https://github.com/flex-development/when/commit/b69462f9f82ac07ae96920af0f22d57f06567e9f)] use
- [[`0f9a427`](https://github.com/flex-development/when/commit/0f9a4272e75ef01441e2bf4e5eecc450f0092d2b)] what is this?
- [[`8391dab`](https://github.com/flex-development/when/commit/8391dabf2049d8eebd9319234ca54e90287e4701)] why not `Promise.resolve`?

### :sparkles: Features

- [[`0bdbc47`](https://github.com/flex-development/when/commit/0bdbc4740d57624a8f5ec7a33289c7ba5e96a5c5)] `when`
- [[`aa84d47`](https://github.com/flex-development/when/commit/aa84d47f2d16b53826c936443799af42a74959db)] **lib:** `isPromiseLike`
- [[`4fab731`](https://github.com/flex-development/when/commit/4fab7311e0fd2e0a909d0d1ce74a1ab478968ec8)] **lib:** `isThenable`
- [[`507ad2b`](https://github.com/flex-development/when/commit/507ad2b3cdc8577b4e8c8b0cf5e2adbc7641a4a6)] **types:** `Awaitable`

### :bug: Fixes

- [[`5ef99bb`](https://github.com/flex-development/when/commit/5ef99bb77f0b35c3670d72ddba4f77a4bb506235)] **pkg:** default export
- [[`21ec642`](https://github.com/flex-development/when/commit/21ec642d83071e1d965a23dec609c4d1c662dd84)] **pkg:** library exports

### :house_with_garden: Housekeeping

- [[`4cca93d`](https://github.com/flex-development/when/commit/4cca93dda1fbc6dbd863405ecfe88259087c2463)] fix release workflow
- [[`a5418df`](https://github.com/flex-development/when/commit/a5418dfc0cae7c2ca231e735665d76b625615edc)] initial commit

## 1.0.0 (2026-02-18)

### :package: Build

- [[`89747c3`](https://github.com/flex-development/when/commit/89747c317883b749a9f9ef20702c7a0847db291b)] **ts:** fix dts bundle

### :robot: Continuous Integration

- [[`8472f72`](https://github.com/flex-development/when/commit/8472f7299ee70065318b2b925fccb926e62ef46d)] **deps:** Bump actions/cache from 5.0.1 to 5.0.3 ([#2](https://github.com/flex-development/when/issues/2))
- [[`a490ffe`](https://github.com/flex-development/when/commit/a490ffea18095d99f07edba0608c5f517e1e60db)] **deps:** Bump actions/checkout from 6.0.1 to 6.0.2 ([#4](https://github.com/flex-development/when/issues/4))
- [[`cebe06a`](https://github.com/flex-development/when/commit/cebe06ae414c0bde9b126574cdf40bf5a6ba9311)] **deps:** Bump actions/setup-node from 6.1.0 to 6.2.0 ([#3](https://github.com/flex-development/when/issues/3))
- [[`34b0da9`](https://github.com/flex-development/when/commit/34b0da9ab276073eaa2675ca2072af7183fff021)] **deps:** Bump streetsidesoftware/cspell-action from 8.1.2 to 8.2.0 ([#1](https://github.com/flex-development/when/issues/1))

### :pencil: Documentation

- [[`b69462f`](https://github.com/flex-development/when/commit/b69462f9f82ac07ae96920af0f22d57f06567e9f)] use
- [[`0f9a427`](https://github.com/flex-development/when/commit/0f9a4272e75ef01441e2bf4e5eecc450f0092d2b)] what is this?
- [[`8391dab`](https://github.com/flex-development/when/commit/8391dabf2049d8eebd9319234ca54e90287e4701)] why not `Promise.resolve`?

### :sparkles: Features

- [[`0bdbc47`](https://github.com/flex-development/when/commit/0bdbc4740d57624a8f5ec7a33289c7ba5e96a5c5)] `when`
- [[`aa84d47`](https://github.com/flex-development/when/commit/aa84d47f2d16b53826c936443799af42a74959db)] **lib:** `isPromiseLike`
- [[`4fab731`](https://github.com/flex-development/when/commit/4fab7311e0fd2e0a909d0d1ce74a1ab478968ec8)] **lib:** `isThenable`
- [[`507ad2b`](https://github.com/flex-development/when/commit/507ad2b3cdc8577b4e8c8b0cf5e2adbc7641a4a6)] **types:** `Awaitable`

### :bug: Fixes

- [[`5ef99bb`](https://github.com/flex-development/when/commit/5ef99bb77f0b35c3670d72ddba4f77a4bb506235)] **pkg:** default export
- [[`21ec642`](https://github.com/flex-development/when/commit/21ec642d83071e1d965a23dec609c4d1c662dd84)] **pkg:** library exports

### :house_with_garden: Housekeeping

- [[`a5418df`](https://github.com/flex-development/when/commit/a5418dfc0cae7c2ca231e735665d76b625615edc)] initial commit





