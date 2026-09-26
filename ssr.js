var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __require = /* @__PURE__ */ ((x3) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x3, {
  get: (a3, b4) => (typeof require !== "undefined" ? require : a3)[b4]
}) : x3)(function(x3) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x3 + '" is not supported');
});
var __esm = (fn, res, err) => function __init() {
  if (err) throw err[0];
  try {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  } catch (e11) {
    throw err = [e11], e11;
  }
};
var __commonJS = (cb, mod) => function __require2() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e11) {
    throw mod = 0, e11;
  }
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i8 = decorators.length - 1, decorator; i8 >= 0; i8--)
    if (decorator = decorators[i8])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);

// node_modules/web-streams-polyfill/dist/ponyfill.es2018.js
var require_ponyfill_es2018 = __commonJS({
  "node_modules/web-streams-polyfill/dist/ponyfill.es2018.js"(exports, module) {
    (function(global2, factory) {
      typeof exports === "object" && typeof module !== "undefined" ? factory(exports) : typeof define === "function" && define.amd ? define(["exports"], factory) : (global2 = typeof globalThis !== "undefined" ? globalThis : global2 || self, factory(global2.WebStreamsPolyfill = {}));
    })(exports, (function(exports2) {
      "use strict";
      function noop2() {
        return void 0;
      }
      function typeIsObject(x3) {
        return typeof x3 === "object" && x3 !== null || typeof x3 === "function";
      }
      const rethrowAssertionErrorRejection = noop2;
      function setFunctionName(fn, name) {
        try {
          Object.defineProperty(fn, "name", {
            value: name,
            configurable: true
          });
        } catch (_a6) {
        }
      }
      const originalPromise = Promise;
      const originalPromiseThen = Promise.prototype.then;
      const originalPromiseReject = Promise.reject.bind(originalPromise);
      function newPromise(executor) {
        return new originalPromise(executor);
      }
      function promiseResolvedWith(value) {
        return newPromise((resolve) => resolve(value));
      }
      function promiseRejectedWith(reason) {
        return originalPromiseReject(reason);
      }
      function PerformPromiseThen(promise, onFulfilled, onRejected) {
        return originalPromiseThen.call(promise, onFulfilled, onRejected);
      }
      function uponPromise(promise, onFulfilled, onRejected) {
        PerformPromiseThen(PerformPromiseThen(promise, onFulfilled, onRejected), void 0, rethrowAssertionErrorRejection);
      }
      function uponFulfillment(promise, onFulfilled) {
        uponPromise(promise, onFulfilled);
      }
      function uponRejection(promise, onRejected) {
        uponPromise(promise, void 0, onRejected);
      }
      function transformPromiseWith(promise, fulfillmentHandler, rejectionHandler) {
        return PerformPromiseThen(promise, fulfillmentHandler, rejectionHandler);
      }
      function setPromiseIsHandledToTrue(promise) {
        PerformPromiseThen(promise, void 0, rethrowAssertionErrorRejection);
      }
      let _queueMicrotask = (callback) => {
        if (typeof queueMicrotask === "function") {
          _queueMicrotask = queueMicrotask;
        } else {
          const resolvedPromise = promiseResolvedWith(void 0);
          _queueMicrotask = (cb) => PerformPromiseThen(resolvedPromise, cb);
        }
        return _queueMicrotask(callback);
      };
      function reflectCall(F2, V2, args) {
        if (typeof F2 !== "function") {
          throw new TypeError("Argument is not a function");
        }
        return Function.prototype.apply.call(F2, V2, args);
      }
      function promiseCall(F2, V2, args) {
        try {
          return promiseResolvedWith(reflectCall(F2, V2, args));
        } catch (value) {
          return promiseRejectedWith(value);
        }
      }
      const QUEUE_MAX_ARRAY_SIZE = 16384;
      class SimpleQueue {
        constructor() {
          this._cursor = 0;
          this._size = 0;
          this._front = {
            _elements: [],
            _next: void 0
          };
          this._back = this._front;
          this._cursor = 0;
          this._size = 0;
        }
        get length() {
          return this._size;
        }
        // For exception safety, this method is structured in order:
        // 1. Read state
        // 2. Calculate required state mutations
        // 3. Perform state mutations
        push(element) {
          const oldBack = this._back;
          let newBack = oldBack;
          if (oldBack._elements.length === QUEUE_MAX_ARRAY_SIZE - 1) {
            newBack = {
              _elements: [],
              _next: void 0
            };
          }
          oldBack._elements.push(element);
          if (newBack !== oldBack) {
            this._back = newBack;
            oldBack._next = newBack;
          }
          ++this._size;
        }
        // Like push(), shift() follows the read -> calculate -> mutate pattern for
        // exception safety.
        shift() {
          const oldFront = this._front;
          let newFront = oldFront;
          const oldCursor = this._cursor;
          let newCursor = oldCursor + 1;
          const elements = oldFront._elements;
          const element = elements[oldCursor];
          if (newCursor === QUEUE_MAX_ARRAY_SIZE) {
            newFront = oldFront._next;
            newCursor = 0;
          }
          --this._size;
          this._cursor = newCursor;
          if (oldFront !== newFront) {
            this._front = newFront;
          }
          elements[oldCursor] = void 0;
          return element;
        }
        // The tricky thing about forEach() is that it can be called
        // re-entrantly. The queue may be mutated inside the callback. It is easy to
        // see that push() within the callback has no negative effects since the end
        // of the queue is checked for on every iteration. If shift() is called
        // repeatedly within the callback then the next iteration may return an
        // element that has been removed. In this case the callback will be called
        // with undefined values until we either "catch up" with elements that still
        // exist or reach the back of the queue.
        forEach(callback) {
          let i8 = this._cursor;
          let node = this._front;
          let elements = node._elements;
          while (i8 !== elements.length || node._next !== void 0) {
            if (i8 === elements.length) {
              node = node._next;
              elements = node._elements;
              i8 = 0;
              if (elements.length === 0) {
                break;
              }
            }
            callback(elements[i8]);
            ++i8;
          }
        }
        // Return the element that would be returned if shift() was called now,
        // without modifying the queue.
        peek() {
          const front = this._front;
          const cursor = this._cursor;
          return front._elements[cursor];
        }
      }
      const AbortSteps = /* @__PURE__ */ Symbol("[[AbortSteps]]");
      const ErrorSteps = /* @__PURE__ */ Symbol("[[ErrorSteps]]");
      const CancelSteps = /* @__PURE__ */ Symbol("[[CancelSteps]]");
      const PullSteps = /* @__PURE__ */ Symbol("[[PullSteps]]");
      const ReleaseSteps = /* @__PURE__ */ Symbol("[[ReleaseSteps]]");
      function ReadableStreamReaderGenericInitialize(reader, stream) {
        reader._ownerReadableStream = stream;
        stream._reader = reader;
        if (stream._state === "readable") {
          defaultReaderClosedPromiseInitialize(reader);
        } else if (stream._state === "closed") {
          defaultReaderClosedPromiseInitializeAsResolved(reader);
        } else {
          defaultReaderClosedPromiseInitializeAsRejected(reader, stream._storedError);
        }
      }
      function ReadableStreamReaderGenericCancel(reader, reason) {
        const stream = reader._ownerReadableStream;
        return ReadableStreamCancel(stream, reason);
      }
      function ReadableStreamReaderGenericRelease(reader) {
        const stream = reader._ownerReadableStream;
        if (stream._state === "readable") {
          defaultReaderClosedPromiseReject(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
        } else {
          defaultReaderClosedPromiseResetToRejected(reader, new TypeError(`Reader was released and can no longer be used to monitor the stream's closedness`));
        }
        stream._readableStreamController[ReleaseSteps]();
        stream._reader = void 0;
        reader._ownerReadableStream = void 0;
      }
      function readerLockException(name) {
        return new TypeError("Cannot " + name + " a stream using a released reader");
      }
      function defaultReaderClosedPromiseInitialize(reader) {
        reader._closedPromise = newPromise((resolve, reject) => {
          reader._closedPromise_resolve = resolve;
          reader._closedPromise_reject = reject;
        });
      }
      function defaultReaderClosedPromiseInitializeAsRejected(reader, reason) {
        defaultReaderClosedPromiseInitialize(reader);
        defaultReaderClosedPromiseReject(reader, reason);
      }
      function defaultReaderClosedPromiseInitializeAsResolved(reader) {
        defaultReaderClosedPromiseInitialize(reader);
        defaultReaderClosedPromiseResolve(reader);
      }
      function defaultReaderClosedPromiseReject(reader, reason) {
        if (reader._closedPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(reader._closedPromise);
        reader._closedPromise_reject(reason);
        reader._closedPromise_resolve = void 0;
        reader._closedPromise_reject = void 0;
      }
      function defaultReaderClosedPromiseResetToRejected(reader, reason) {
        defaultReaderClosedPromiseInitializeAsRejected(reader, reason);
      }
      function defaultReaderClosedPromiseResolve(reader) {
        if (reader._closedPromise_resolve === void 0) {
          return;
        }
        reader._closedPromise_resolve(void 0);
        reader._closedPromise_resolve = void 0;
        reader._closedPromise_reject = void 0;
      }
      const NumberIsFinite = Number.isFinite || function(x3) {
        return typeof x3 === "number" && isFinite(x3);
      };
      const MathTrunc = Math.trunc || function(v3) {
        return v3 < 0 ? Math.ceil(v3) : Math.floor(v3);
      };
      function isDictionary(x3) {
        return typeof x3 === "object" || typeof x3 === "function";
      }
      function assertDictionary(obj, context) {
        if (obj !== void 0 && !isDictionary(obj)) {
          throw new TypeError(`${context} is not an object.`);
        }
      }
      function assertFunction(x3, context) {
        if (typeof x3 !== "function") {
          throw new TypeError(`${context} is not a function.`);
        }
      }
      function isObject(x3) {
        return typeof x3 === "object" && x3 !== null || typeof x3 === "function";
      }
      function assertObject(x3, context) {
        if (!isObject(x3)) {
          throw new TypeError(`${context} is not an object.`);
        }
      }
      function assertRequiredArgument(x3, position, context) {
        if (x3 === void 0) {
          throw new TypeError(`Parameter ${position} is required in '${context}'.`);
        }
      }
      function assertRequiredField(x3, field, context) {
        if (x3 === void 0) {
          throw new TypeError(`${field} is required in '${context}'.`);
        }
      }
      function convertUnrestrictedDouble(value) {
        return Number(value);
      }
      function censorNegativeZero(x3) {
        return x3 === 0 ? 0 : x3;
      }
      function integerPart(x3) {
        return censorNegativeZero(MathTrunc(x3));
      }
      function convertUnsignedLongLongWithEnforceRange(value, context) {
        const lowerBound = 0;
        const upperBound = Number.MAX_SAFE_INTEGER;
        let x3 = Number(value);
        x3 = censorNegativeZero(x3);
        if (!NumberIsFinite(x3)) {
          throw new TypeError(`${context} is not a finite number`);
        }
        x3 = integerPart(x3);
        if (x3 < lowerBound || x3 > upperBound) {
          throw new TypeError(`${context} is outside the accepted range of ${lowerBound} to ${upperBound}, inclusive`);
        }
        if (!NumberIsFinite(x3) || x3 === 0) {
          return 0;
        }
        return x3;
      }
      function assertReadableStream(x3, context) {
        if (!IsReadableStream(x3)) {
          throw new TypeError(`${context} is not a ReadableStream.`);
        }
      }
      function AcquireReadableStreamDefaultReader(stream) {
        return new ReadableStreamDefaultReader(stream);
      }
      function ReadableStreamAddReadRequest(stream, readRequest) {
        stream._reader._readRequests.push(readRequest);
      }
      function ReadableStreamFulfillReadRequest(stream, chunk, done) {
        const reader = stream._reader;
        const readRequest = reader._readRequests.shift();
        if (done) {
          readRequest._closeSteps();
        } else {
          readRequest._chunkSteps(chunk);
        }
      }
      function ReadableStreamGetNumReadRequests(stream) {
        return stream._reader._readRequests.length;
      }
      function ReadableStreamHasDefaultReader(stream) {
        const reader = stream._reader;
        if (reader === void 0) {
          return false;
        }
        if (!IsReadableStreamDefaultReader(reader)) {
          return false;
        }
        return true;
      }
      class ReadableStreamDefaultReader {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "ReadableStreamDefaultReader");
          assertReadableStream(stream, "First parameter");
          if (IsReadableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          }
          ReadableStreamReaderGenericInitialize(this, stream);
          this._readRequests = new SimpleQueue();
        }
        /**
         * Returns a promise that will be fulfilled when the stream becomes closed,
         * or rejected if the stream ever errors or the reader's lock is released before the stream finishes closing.
         */
        get closed() {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        /**
         * If the reader is active, behaves the same as {@link ReadableStream.cancel | stream.cancel(reason)}.
         */
        cancel(reason = void 0) {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("cancel"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("cancel"));
          }
          return ReadableStreamReaderGenericCancel(this, reason);
        }
        /**
         * Returns a promise that allows access to the next chunk from the stream's internal queue, if available.
         *
         * If reading a chunk causes the queue to become empty, more data will be pulled from the underlying source.
         */
        read() {
          if (!IsReadableStreamDefaultReader(this)) {
            return promiseRejectedWith(defaultReaderBrandCheckException("read"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("read from"));
          }
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
          });
          const readRequest = {
            _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
            _closeSteps: () => resolvePromise({ value: void 0, done: true }),
            _errorSteps: (e11) => rejectPromise(e11)
          };
          ReadableStreamDefaultReaderRead(this, readRequest);
          return promise;
        }
        /**
         * Releases the reader's lock on the corresponding stream. After the lock is released, the reader is no longer active.
         * If the associated stream is errored when the lock is released, the reader will appear errored in the same way
         * from now on; otherwise, the reader will appear closed.
         *
         * A reader's lock cannot be released while it still has a pending read request, i.e., if a promise returned by
         * the reader's {@link ReadableStreamDefaultReader.read | read()} method has not yet been settled. Attempting to
         * do so will throw a `TypeError` and leave the reader locked to the stream.
         */
        releaseLock() {
          if (!IsReadableStreamDefaultReader(this)) {
            throw defaultReaderBrandCheckException("releaseLock");
          }
          if (this._ownerReadableStream === void 0) {
            return;
          }
          ReadableStreamDefaultReaderRelease(this);
        }
      }
      Object.defineProperties(ReadableStreamDefaultReader.prototype, {
        cancel: { enumerable: true },
        read: { enumerable: true },
        releaseLock: { enumerable: true },
        closed: { enumerable: true }
      });
      setFunctionName(ReadableStreamDefaultReader.prototype.cancel, "cancel");
      setFunctionName(ReadableStreamDefaultReader.prototype.read, "read");
      setFunctionName(ReadableStreamDefaultReader.prototype.releaseLock, "releaseLock");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamDefaultReader.prototype, Symbol.toStringTag, {
          value: "ReadableStreamDefaultReader",
          configurable: true
        });
      }
      function IsReadableStreamDefaultReader(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_readRequests")) {
          return false;
        }
        return x3 instanceof ReadableStreamDefaultReader;
      }
      function ReadableStreamDefaultReaderRead(reader, readRequest) {
        const stream = reader._ownerReadableStream;
        stream._disturbed = true;
        if (stream._state === "closed") {
          readRequest._closeSteps();
        } else if (stream._state === "errored") {
          readRequest._errorSteps(stream._storedError);
        } else {
          stream._readableStreamController[PullSteps](readRequest);
        }
      }
      function ReadableStreamDefaultReaderRelease(reader) {
        ReadableStreamReaderGenericRelease(reader);
        const e11 = new TypeError("Reader was released");
        ReadableStreamDefaultReaderErrorReadRequests(reader, e11);
      }
      function ReadableStreamDefaultReaderErrorReadRequests(reader, e11) {
        const readRequests = reader._readRequests;
        reader._readRequests = new SimpleQueue();
        readRequests.forEach((readRequest) => {
          readRequest._errorSteps(e11);
        });
      }
      function defaultReaderBrandCheckException(name) {
        return new TypeError(`ReadableStreamDefaultReader.prototype.${name} can only be used on a ReadableStreamDefaultReader`);
      }
      const AsyncIteratorPrototype = Object.getPrototypeOf(Object.getPrototypeOf(async function* () {
      }).prototype);
      class ReadableStreamAsyncIteratorImpl {
        constructor(reader, preventCancel) {
          this._ongoingPromise = void 0;
          this._isFinished = false;
          this._reader = reader;
          this._preventCancel = preventCancel;
        }
        next() {
          const nextSteps = () => this._nextSteps();
          this._ongoingPromise = this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, nextSteps, nextSteps) : nextSteps();
          return this._ongoingPromise;
        }
        return(value) {
          const returnSteps = () => this._returnSteps(value);
          return this._ongoingPromise ? transformPromiseWith(this._ongoingPromise, returnSteps, returnSteps) : returnSteps();
        }
        _nextSteps() {
          if (this._isFinished) {
            return Promise.resolve({ value: void 0, done: true });
          }
          const reader = this._reader;
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
          });
          const readRequest = {
            _chunkSteps: (chunk) => {
              this._ongoingPromise = void 0;
              _queueMicrotask(() => resolvePromise({ value: chunk, done: false }));
            },
            _closeSteps: () => {
              this._ongoingPromise = void 0;
              this._isFinished = true;
              ReadableStreamReaderGenericRelease(reader);
              resolvePromise({ value: void 0, done: true });
            },
            _errorSteps: (reason) => {
              this._ongoingPromise = void 0;
              this._isFinished = true;
              ReadableStreamReaderGenericRelease(reader);
              rejectPromise(reason);
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
          return promise;
        }
        _returnSteps(value) {
          if (this._isFinished) {
            return Promise.resolve({ value, done: true });
          }
          this._isFinished = true;
          const reader = this._reader;
          if (!this._preventCancel) {
            const result = ReadableStreamReaderGenericCancel(reader, value);
            ReadableStreamReaderGenericRelease(reader);
            return transformPromiseWith(result, () => ({ value, done: true }));
          }
          ReadableStreamReaderGenericRelease(reader);
          return promiseResolvedWith({ value, done: true });
        }
      }
      const ReadableStreamAsyncIteratorPrototype = {
        next() {
          if (!IsReadableStreamAsyncIterator(this)) {
            return promiseRejectedWith(streamAsyncIteratorBrandCheckException("next"));
          }
          return this._asyncIteratorImpl.next();
        },
        return(value) {
          if (!IsReadableStreamAsyncIterator(this)) {
            return promiseRejectedWith(streamAsyncIteratorBrandCheckException("return"));
          }
          return this._asyncIteratorImpl.return(value);
        }
      };
      Object.setPrototypeOf(ReadableStreamAsyncIteratorPrototype, AsyncIteratorPrototype);
      function AcquireReadableStreamAsyncIterator(stream, preventCancel) {
        const reader = AcquireReadableStreamDefaultReader(stream);
        const impl = new ReadableStreamAsyncIteratorImpl(reader, preventCancel);
        const iterator = Object.create(ReadableStreamAsyncIteratorPrototype);
        iterator._asyncIteratorImpl = impl;
        return iterator;
      }
      function IsReadableStreamAsyncIterator(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_asyncIteratorImpl")) {
          return false;
        }
        try {
          return x3._asyncIteratorImpl instanceof ReadableStreamAsyncIteratorImpl;
        } catch (_a6) {
          return false;
        }
      }
      function streamAsyncIteratorBrandCheckException(name) {
        return new TypeError(`ReadableStreamAsyncIterator.${name} can only be used on a ReadableSteamAsyncIterator`);
      }
      const NumberIsNaN = Number.isNaN || function(x3) {
        return x3 !== x3;
      };
      var _a5, _b2, _c;
      function CreateArrayFromList(elements) {
        return elements.slice();
      }
      function CopyDataBlockBytes(dest, destOffset, src, srcOffset, n9) {
        new Uint8Array(dest).set(new Uint8Array(src, srcOffset, n9), destOffset);
      }
      let TransferArrayBuffer = (O) => {
        if (typeof O.transfer === "function") {
          TransferArrayBuffer = (buffer) => buffer.transfer();
        } else if (typeof structuredClone === "function") {
          TransferArrayBuffer = (buffer) => structuredClone(buffer, { transfer: [buffer] });
        } else {
          TransferArrayBuffer = (buffer) => buffer;
        }
        return TransferArrayBuffer(O);
      };
      let IsDetachedBuffer = (O) => {
        if (typeof O.detached === "boolean") {
          IsDetachedBuffer = (buffer) => buffer.detached;
        } else {
          IsDetachedBuffer = (buffer) => buffer.byteLength === 0;
        }
        return IsDetachedBuffer(O);
      };
      function ArrayBufferSlice(buffer, begin, end) {
        if (buffer.slice) {
          return buffer.slice(begin, end);
        }
        const length = end - begin;
        const slice = new ArrayBuffer(length);
        CopyDataBlockBytes(slice, 0, buffer, begin, length);
        return slice;
      }
      function GetMethod(receiver, prop) {
        const func = receiver[prop];
        if (func === void 0 || func === null) {
          return void 0;
        }
        if (typeof func !== "function") {
          throw new TypeError(`${String(prop)} is not a function`);
        }
        return func;
      }
      function CreateAsyncFromSyncIterator(syncIteratorRecord) {
        const syncIterable = {
          [Symbol.iterator]: () => syncIteratorRecord.iterator
        };
        const asyncIterator = (async function* () {
          return yield* syncIterable;
        })();
        const nextMethod = asyncIterator.next;
        return { iterator: asyncIterator, nextMethod, done: false };
      }
      const SymbolAsyncIterator = (_c = (_a5 = Symbol.asyncIterator) !== null && _a5 !== void 0 ? _a5 : (_b2 = Symbol.for) === null || _b2 === void 0 ? void 0 : _b2.call(Symbol, "Symbol.asyncIterator")) !== null && _c !== void 0 ? _c : "@@asyncIterator";
      function GetIterator(obj, hint = "sync", method) {
        if (method === void 0) {
          if (hint === "async") {
            method = GetMethod(obj, SymbolAsyncIterator);
            if (method === void 0) {
              const syncMethod = GetMethod(obj, Symbol.iterator);
              const syncIteratorRecord = GetIterator(obj, "sync", syncMethod);
              return CreateAsyncFromSyncIterator(syncIteratorRecord);
            }
          } else {
            method = GetMethod(obj, Symbol.iterator);
          }
        }
        if (method === void 0) {
          throw new TypeError("The object is not iterable");
        }
        const iterator = reflectCall(method, obj, []);
        if (!typeIsObject(iterator)) {
          throw new TypeError("The iterator method must return an object");
        }
        const nextMethod = iterator.next;
        return { iterator, nextMethod, done: false };
      }
      function IteratorNext(iteratorRecord) {
        const result = reflectCall(iteratorRecord.nextMethod, iteratorRecord.iterator, []);
        if (!typeIsObject(result)) {
          throw new TypeError("The iterator.next() method must return an object");
        }
        return result;
      }
      function IteratorComplete(iterResult) {
        return Boolean(iterResult.done);
      }
      function IteratorValue(iterResult) {
        return iterResult.value;
      }
      function IsNonNegativeNumber(v3) {
        if (typeof v3 !== "number") {
          return false;
        }
        if (NumberIsNaN(v3)) {
          return false;
        }
        if (v3 < 0) {
          return false;
        }
        return true;
      }
      function CloneAsUint8Array(O) {
        const buffer = ArrayBufferSlice(O.buffer, O.byteOffset, O.byteOffset + O.byteLength);
        return new Uint8Array(buffer);
      }
      function DequeueValue(container) {
        const pair = container._queue.shift();
        container._queueTotalSize -= pair.size;
        if (container._queueTotalSize < 0) {
          container._queueTotalSize = 0;
        }
        return pair.value;
      }
      function EnqueueValueWithSize(container, value, size2) {
        if (!IsNonNegativeNumber(size2) || size2 === Infinity) {
          throw new RangeError("Size must be a finite, non-NaN, non-negative number.");
        }
        container._queue.push({ value, size: size2 });
        container._queueTotalSize += size2;
      }
      function PeekQueueValue(container) {
        const pair = container._queue.peek();
        return pair.value;
      }
      function ResetQueue(container) {
        container._queue = new SimpleQueue();
        container._queueTotalSize = 0;
      }
      function isDataViewConstructor(ctor) {
        return ctor === DataView;
      }
      function isDataView(view) {
        return isDataViewConstructor(view.constructor);
      }
      function arrayBufferViewElementSize(ctor) {
        if (isDataViewConstructor(ctor)) {
          return 1;
        }
        return ctor.BYTES_PER_ELEMENT;
      }
      class ReadableStreamBYOBRequest {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        /**
         * Returns the view for writing in to, or `null` if the BYOB request has already been responded to.
         */
        get view() {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("view");
          }
          return this._view;
        }
        respond(bytesWritten) {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("respond");
          }
          assertRequiredArgument(bytesWritten, 1, "respond");
          bytesWritten = convertUnsignedLongLongWithEnforceRange(bytesWritten, "First parameter");
          if (this._associatedReadableByteStreamController === void 0) {
            throw new TypeError("This BYOB request has been invalidated");
          }
          if (IsDetachedBuffer(this._view.buffer)) {
            throw new TypeError(`The BYOB request's buffer has been detached and so cannot be used as a response`);
          }
          ReadableByteStreamControllerRespond(this._associatedReadableByteStreamController, bytesWritten);
        }
        respondWithNewView(view) {
          if (!IsReadableStreamBYOBRequest(this)) {
            throw byobRequestBrandCheckException("respondWithNewView");
          }
          assertRequiredArgument(view, 1, "respondWithNewView");
          if (!ArrayBuffer.isView(view)) {
            throw new TypeError("You can only respond with array buffer views");
          }
          if (this._associatedReadableByteStreamController === void 0) {
            throw new TypeError("This BYOB request has been invalidated");
          }
          if (IsDetachedBuffer(view.buffer)) {
            throw new TypeError("The given view's buffer has been detached and so cannot be used as a response");
          }
          ReadableByteStreamControllerRespondWithNewView(this._associatedReadableByteStreamController, view);
        }
      }
      Object.defineProperties(ReadableStreamBYOBRequest.prototype, {
        respond: { enumerable: true },
        respondWithNewView: { enumerable: true },
        view: { enumerable: true }
      });
      setFunctionName(ReadableStreamBYOBRequest.prototype.respond, "respond");
      setFunctionName(ReadableStreamBYOBRequest.prototype.respondWithNewView, "respondWithNewView");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamBYOBRequest.prototype, Symbol.toStringTag, {
          value: "ReadableStreamBYOBRequest",
          configurable: true
        });
      }
      class ReadableByteStreamController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        /**
         * Returns the current BYOB pull request, or `null` if there isn't one.
         */
        get byobRequest() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("byobRequest");
          }
          return ReadableByteStreamControllerGetBYOBRequest(this);
        }
        /**
         * Returns the desired size to fill the controlled stream's internal queue. It can be negative, if the queue is
         * over-full. An underlying byte source ought to use this information to determine when and how to apply backpressure.
         */
        get desiredSize() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("desiredSize");
          }
          return ReadableByteStreamControllerGetDesiredSize(this);
        }
        /**
         * Closes the controlled readable stream. Consumers will still be able to read any previously-enqueued chunks from
         * the stream, but once those are read, the stream will become closed.
         */
        close() {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("close");
          }
          if (this._closeRequested) {
            throw new TypeError("The stream has already been closed; do not close it again!");
          }
          const state = this._controlledReadableByteStream._state;
          if (state !== "readable") {
            throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be closed`);
          }
          ReadableByteStreamControllerClose(this);
        }
        enqueue(chunk) {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("enqueue");
          }
          assertRequiredArgument(chunk, 1, "enqueue");
          if (!ArrayBuffer.isView(chunk)) {
            throw new TypeError("chunk must be an array buffer view");
          }
          if (chunk.byteLength === 0) {
            throw new TypeError("chunk must have non-zero byteLength");
          }
          if (chunk.buffer.byteLength === 0) {
            throw new TypeError(`chunk's buffer must have non-zero byteLength`);
          }
          if (this._closeRequested) {
            throw new TypeError("stream is closed or draining");
          }
          const state = this._controlledReadableByteStream._state;
          if (state !== "readable") {
            throw new TypeError(`The stream (in ${state} state) is not in the readable state and cannot be enqueued to`);
          }
          ReadableByteStreamControllerEnqueue(this, chunk);
        }
        /**
         * Errors the controlled readable stream, making all future interactions with it fail with the given error `e`.
         */
        error(e11 = void 0) {
          if (!IsReadableByteStreamController(this)) {
            throw byteStreamControllerBrandCheckException("error");
          }
          ReadableByteStreamControllerError(this, e11);
        }
        /** @internal */
        [CancelSteps](reason) {
          ReadableByteStreamControllerClearPendingPullIntos(this);
          ResetQueue(this);
          const result = this._cancelAlgorithm(reason);
          ReadableByteStreamControllerClearAlgorithms(this);
          return result;
        }
        /** @internal */
        [PullSteps](readRequest) {
          const stream = this._controlledReadableByteStream;
          if (this._queueTotalSize > 0) {
            ReadableByteStreamControllerFillReadRequestFromQueue(this, readRequest);
            return;
          }
          const autoAllocateChunkSize = this._autoAllocateChunkSize;
          if (autoAllocateChunkSize !== void 0) {
            let buffer;
            try {
              buffer = new ArrayBuffer(autoAllocateChunkSize);
            } catch (bufferE) {
              readRequest._errorSteps(bufferE);
              return;
            }
            const pullIntoDescriptor = {
              buffer,
              bufferByteLength: autoAllocateChunkSize,
              byteOffset: 0,
              byteLength: autoAllocateChunkSize,
              bytesFilled: 0,
              minimumFill: 1,
              elementSize: 1,
              viewConstructor: Uint8Array,
              readerType: "default"
            };
            this._pendingPullIntos.push(pullIntoDescriptor);
          }
          ReadableStreamAddReadRequest(stream, readRequest);
          ReadableByteStreamControllerCallPullIfNeeded(this);
        }
        /** @internal */
        [ReleaseSteps]() {
          if (this._pendingPullIntos.length > 0) {
            const firstPullInto = this._pendingPullIntos.peek();
            firstPullInto.readerType = "none";
            this._pendingPullIntos = new SimpleQueue();
            this._pendingPullIntos.push(firstPullInto);
          }
        }
      }
      Object.defineProperties(ReadableByteStreamController.prototype, {
        close: { enumerable: true },
        enqueue: { enumerable: true },
        error: { enumerable: true },
        byobRequest: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      setFunctionName(ReadableByteStreamController.prototype.close, "close");
      setFunctionName(ReadableByteStreamController.prototype.enqueue, "enqueue");
      setFunctionName(ReadableByteStreamController.prototype.error, "error");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(ReadableByteStreamController.prototype, Symbol.toStringTag, {
          value: "ReadableByteStreamController",
          configurable: true
        });
      }
      function IsReadableByteStreamController(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_controlledReadableByteStream")) {
          return false;
        }
        return x3 instanceof ReadableByteStreamController;
      }
      function IsReadableStreamBYOBRequest(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_associatedReadableByteStreamController")) {
          return false;
        }
        return x3 instanceof ReadableStreamBYOBRequest;
      }
      function ReadableByteStreamControllerCallPullIfNeeded(controller) {
        const shouldPull = ReadableByteStreamControllerShouldCallPull(controller);
        if (!shouldPull) {
          return;
        }
        if (controller._pulling) {
          controller._pullAgain = true;
          return;
        }
        controller._pulling = true;
        const pullPromise = controller._pullAlgorithm();
        uponPromise(pullPromise, () => {
          controller._pulling = false;
          if (controller._pullAgain) {
            controller._pullAgain = false;
            ReadableByteStreamControllerCallPullIfNeeded(controller);
          }
          return null;
        }, (e11) => {
          ReadableByteStreamControllerError(controller, e11);
          return null;
        });
      }
      function ReadableByteStreamControllerClearPendingPullIntos(controller) {
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        controller._pendingPullIntos = new SimpleQueue();
      }
      function ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor) {
        let done = false;
        if (stream._state === "closed") {
          done = true;
        }
        const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
        if (pullIntoDescriptor.readerType === "default") {
          ReadableStreamFulfillReadRequest(stream, filledView, done);
        } else {
          ReadableStreamFulfillReadIntoRequest(stream, filledView, done);
        }
      }
      function ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor) {
        const bytesFilled = pullIntoDescriptor.bytesFilled;
        const elementSize = pullIntoDescriptor.elementSize;
        return new pullIntoDescriptor.viewConstructor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, bytesFilled / elementSize);
      }
      function ReadableByteStreamControllerEnqueueChunkToQueue(controller, buffer, byteOffset, byteLength) {
        controller._queue.push({ buffer, byteOffset, byteLength });
        controller._queueTotalSize += byteLength;
      }
      function ReadableByteStreamControllerEnqueueClonedChunkToQueue(controller, buffer, byteOffset, byteLength) {
        let clonedChunk;
        try {
          clonedChunk = ArrayBufferSlice(buffer, byteOffset, byteOffset + byteLength);
        } catch (cloneE) {
          ReadableByteStreamControllerError(controller, cloneE);
          throw cloneE;
        }
        ReadableByteStreamControllerEnqueueChunkToQueue(controller, clonedChunk, 0, byteLength);
      }
      function ReadableByteStreamControllerEnqueueDetachedPullIntoToQueue(controller, firstDescriptor) {
        if (firstDescriptor.bytesFilled > 0) {
          ReadableByteStreamControllerEnqueueClonedChunkToQueue(controller, firstDescriptor.buffer, firstDescriptor.byteOffset, firstDescriptor.bytesFilled);
        }
        ReadableByteStreamControllerShiftPendingPullInto(controller);
      }
      function ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor) {
        const maxBytesToCopy = Math.min(controller._queueTotalSize, pullIntoDescriptor.byteLength - pullIntoDescriptor.bytesFilled);
        const maxBytesFilled = pullIntoDescriptor.bytesFilled + maxBytesToCopy;
        let totalBytesToCopyRemaining = maxBytesToCopy;
        let ready = false;
        const remainderBytes = maxBytesFilled % pullIntoDescriptor.elementSize;
        const maxAlignedBytes = maxBytesFilled - remainderBytes;
        if (maxAlignedBytes >= pullIntoDescriptor.minimumFill) {
          totalBytesToCopyRemaining = maxAlignedBytes - pullIntoDescriptor.bytesFilled;
          ready = true;
        }
        const queue = controller._queue;
        while (totalBytesToCopyRemaining > 0) {
          const headOfQueue = queue.peek();
          const bytesToCopy = Math.min(totalBytesToCopyRemaining, headOfQueue.byteLength);
          const destStart = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
          CopyDataBlockBytes(pullIntoDescriptor.buffer, destStart, headOfQueue.buffer, headOfQueue.byteOffset, bytesToCopy);
          if (headOfQueue.byteLength === bytesToCopy) {
            queue.shift();
          } else {
            headOfQueue.byteOffset += bytesToCopy;
            headOfQueue.byteLength -= bytesToCopy;
          }
          controller._queueTotalSize -= bytesToCopy;
          ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesToCopy, pullIntoDescriptor);
          totalBytesToCopyRemaining -= bytesToCopy;
        }
        return ready;
      }
      function ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, size2, pullIntoDescriptor) {
        pullIntoDescriptor.bytesFilled += size2;
      }
      function ReadableByteStreamControllerHandleQueueDrain(controller) {
        if (controller._queueTotalSize === 0 && controller._closeRequested) {
          ReadableByteStreamControllerClearAlgorithms(controller);
          ReadableStreamClose(controller._controlledReadableByteStream);
        } else {
          ReadableByteStreamControllerCallPullIfNeeded(controller);
        }
      }
      function ReadableByteStreamControllerInvalidateBYOBRequest(controller) {
        if (controller._byobRequest === null) {
          return;
        }
        controller._byobRequest._associatedReadableByteStreamController = void 0;
        controller._byobRequest._view = null;
        controller._byobRequest = null;
      }
      function ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller) {
        while (controller._pendingPullIntos.length > 0) {
          if (controller._queueTotalSize === 0) {
            return;
          }
          const pullIntoDescriptor = controller._pendingPullIntos.peek();
          if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
            ReadableByteStreamControllerShiftPendingPullInto(controller);
            ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
          }
        }
      }
      function ReadableByteStreamControllerProcessReadRequestsUsingQueue(controller) {
        const reader = controller._controlledReadableByteStream._reader;
        while (reader._readRequests.length > 0) {
          if (controller._queueTotalSize === 0) {
            return;
          }
          const readRequest = reader._readRequests.shift();
          ReadableByteStreamControllerFillReadRequestFromQueue(controller, readRequest);
        }
      }
      function ReadableByteStreamControllerPullInto(controller, view, min2, readIntoRequest) {
        const stream = controller._controlledReadableByteStream;
        const ctor = view.constructor;
        const elementSize = arrayBufferViewElementSize(ctor);
        const { byteOffset, byteLength } = view;
        const minimumFill = min2 * elementSize;
        let buffer;
        try {
          buffer = TransferArrayBuffer(view.buffer);
        } catch (e11) {
          readIntoRequest._errorSteps(e11);
          return;
        }
        const pullIntoDescriptor = {
          buffer,
          bufferByteLength: buffer.byteLength,
          byteOffset,
          byteLength,
          bytesFilled: 0,
          minimumFill,
          elementSize,
          viewConstructor: ctor,
          readerType: "byob"
        };
        if (controller._pendingPullIntos.length > 0) {
          controller._pendingPullIntos.push(pullIntoDescriptor);
          ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
          return;
        }
        if (stream._state === "closed") {
          const emptyView = new ctor(pullIntoDescriptor.buffer, pullIntoDescriptor.byteOffset, 0);
          readIntoRequest._closeSteps(emptyView);
          return;
        }
        if (controller._queueTotalSize > 0) {
          if (ReadableByteStreamControllerFillPullIntoDescriptorFromQueue(controller, pullIntoDescriptor)) {
            const filledView = ReadableByteStreamControllerConvertPullIntoDescriptor(pullIntoDescriptor);
            ReadableByteStreamControllerHandleQueueDrain(controller);
            readIntoRequest._chunkSteps(filledView);
            return;
          }
          if (controller._closeRequested) {
            const e11 = new TypeError("Insufficient bytes to fill elements in the given buffer");
            ReadableByteStreamControllerError(controller, e11);
            readIntoRequest._errorSteps(e11);
            return;
          }
        }
        controller._pendingPullIntos.push(pullIntoDescriptor);
        ReadableStreamAddReadIntoRequest(stream, readIntoRequest);
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor) {
        if (firstDescriptor.readerType === "none") {
          ReadableByteStreamControllerShiftPendingPullInto(controller);
        }
        const stream = controller._controlledReadableByteStream;
        if (ReadableStreamHasBYOBReader(stream)) {
          while (ReadableStreamGetNumReadIntoRequests(stream) > 0) {
            const pullIntoDescriptor = ReadableByteStreamControllerShiftPendingPullInto(controller);
            ReadableByteStreamControllerCommitPullIntoDescriptor(stream, pullIntoDescriptor);
          }
        }
      }
      function ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, pullIntoDescriptor) {
        ReadableByteStreamControllerFillHeadPullIntoDescriptor(controller, bytesWritten, pullIntoDescriptor);
        if (pullIntoDescriptor.readerType === "none") {
          ReadableByteStreamControllerEnqueueDetachedPullIntoToQueue(controller, pullIntoDescriptor);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
          return;
        }
        if (pullIntoDescriptor.bytesFilled < pullIntoDescriptor.minimumFill) {
          return;
        }
        ReadableByteStreamControllerShiftPendingPullInto(controller);
        const remainderSize = pullIntoDescriptor.bytesFilled % pullIntoDescriptor.elementSize;
        if (remainderSize > 0) {
          const end = pullIntoDescriptor.byteOffset + pullIntoDescriptor.bytesFilled;
          ReadableByteStreamControllerEnqueueClonedChunkToQueue(controller, pullIntoDescriptor.buffer, end - remainderSize, remainderSize);
        }
        pullIntoDescriptor.bytesFilled -= remainderSize;
        ReadableByteStreamControllerCommitPullIntoDescriptor(controller._controlledReadableByteStream, pullIntoDescriptor);
        ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
      }
      function ReadableByteStreamControllerRespondInternal(controller, bytesWritten) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        ReadableByteStreamControllerInvalidateBYOBRequest(controller);
        const state = controller._controlledReadableByteStream._state;
        if (state === "closed") {
          ReadableByteStreamControllerRespondInClosedState(controller, firstDescriptor);
        } else {
          ReadableByteStreamControllerRespondInReadableState(controller, bytesWritten, firstDescriptor);
        }
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerShiftPendingPullInto(controller) {
        const descriptor = controller._pendingPullIntos.shift();
        return descriptor;
      }
      function ReadableByteStreamControllerShouldCallPull(controller) {
        const stream = controller._controlledReadableByteStream;
        if (stream._state !== "readable") {
          return false;
        }
        if (controller._closeRequested) {
          return false;
        }
        if (!controller._started) {
          return false;
        }
        if (ReadableStreamHasDefaultReader(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          return true;
        }
        if (ReadableStreamHasBYOBReader(stream) && ReadableStreamGetNumReadIntoRequests(stream) > 0) {
          return true;
        }
        const desiredSize = ReadableByteStreamControllerGetDesiredSize(controller);
        if (desiredSize > 0) {
          return true;
        }
        return false;
      }
      function ReadableByteStreamControllerClearAlgorithms(controller) {
        controller._pullAlgorithm = void 0;
        controller._cancelAlgorithm = void 0;
      }
      function ReadableByteStreamControllerClose(controller) {
        const stream = controller._controlledReadableByteStream;
        if (controller._closeRequested || stream._state !== "readable") {
          return;
        }
        if (controller._queueTotalSize > 0) {
          controller._closeRequested = true;
          return;
        }
        if (controller._pendingPullIntos.length > 0) {
          const firstPendingPullInto = controller._pendingPullIntos.peek();
          if (firstPendingPullInto.bytesFilled % firstPendingPullInto.elementSize !== 0) {
            const e11 = new TypeError("Insufficient bytes to fill elements in the given buffer");
            ReadableByteStreamControllerError(controller, e11);
            throw e11;
          }
        }
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamClose(stream);
      }
      function ReadableByteStreamControllerEnqueue(controller, chunk) {
        const stream = controller._controlledReadableByteStream;
        if (controller._closeRequested || stream._state !== "readable") {
          return;
        }
        const { buffer, byteOffset, byteLength } = chunk;
        if (IsDetachedBuffer(buffer)) {
          throw new TypeError("chunk's buffer is detached and so cannot be enqueued");
        }
        const transferredBuffer = TransferArrayBuffer(buffer);
        if (controller._pendingPullIntos.length > 0) {
          const firstPendingPullInto = controller._pendingPullIntos.peek();
          if (IsDetachedBuffer(firstPendingPullInto.buffer)) {
            throw new TypeError("The BYOB request's buffer has been detached and so cannot be filled with an enqueued chunk");
          }
          ReadableByteStreamControllerInvalidateBYOBRequest(controller);
          firstPendingPullInto.buffer = TransferArrayBuffer(firstPendingPullInto.buffer);
          if (firstPendingPullInto.readerType === "none") {
            ReadableByteStreamControllerEnqueueDetachedPullIntoToQueue(controller, firstPendingPullInto);
          }
        }
        if (ReadableStreamHasDefaultReader(stream)) {
          ReadableByteStreamControllerProcessReadRequestsUsingQueue(controller);
          if (ReadableStreamGetNumReadRequests(stream) === 0) {
            ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          } else {
            if (controller._pendingPullIntos.length > 0) {
              ReadableByteStreamControllerShiftPendingPullInto(controller);
            }
            const transferredView = new Uint8Array(transferredBuffer, byteOffset, byteLength);
            ReadableStreamFulfillReadRequest(stream, transferredView, false);
          }
        } else if (ReadableStreamHasBYOBReader(stream)) {
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
          ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue(controller);
        } else {
          ReadableByteStreamControllerEnqueueChunkToQueue(controller, transferredBuffer, byteOffset, byteLength);
        }
        ReadableByteStreamControllerCallPullIfNeeded(controller);
      }
      function ReadableByteStreamControllerError(controller, e11) {
        const stream = controller._controlledReadableByteStream;
        if (stream._state !== "readable") {
          return;
        }
        ReadableByteStreamControllerClearPendingPullIntos(controller);
        ResetQueue(controller);
        ReadableByteStreamControllerClearAlgorithms(controller);
        ReadableStreamError(stream, e11);
      }
      function ReadableByteStreamControllerFillReadRequestFromQueue(controller, readRequest) {
        const entry = controller._queue.shift();
        controller._queueTotalSize -= entry.byteLength;
        ReadableByteStreamControllerHandleQueueDrain(controller);
        const view = new Uint8Array(entry.buffer, entry.byteOffset, entry.byteLength);
        readRequest._chunkSteps(view);
      }
      function ReadableByteStreamControllerGetBYOBRequest(controller) {
        if (controller._byobRequest === null && controller._pendingPullIntos.length > 0) {
          const firstDescriptor = controller._pendingPullIntos.peek();
          const view = new Uint8Array(firstDescriptor.buffer, firstDescriptor.byteOffset + firstDescriptor.bytesFilled, firstDescriptor.byteLength - firstDescriptor.bytesFilled);
          const byobRequest = Object.create(ReadableStreamBYOBRequest.prototype);
          SetUpReadableStreamBYOBRequest(byobRequest, controller, view);
          controller._byobRequest = byobRequest;
        }
        return controller._byobRequest;
      }
      function ReadableByteStreamControllerGetDesiredSize(controller) {
        const state = controller._controlledReadableByteStream._state;
        if (state === "errored") {
          return null;
        }
        if (state === "closed") {
          return 0;
        }
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function ReadableByteStreamControllerRespond(controller, bytesWritten) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const state = controller._controlledReadableByteStream._state;
        if (state === "closed") {
          if (bytesWritten !== 0) {
            throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream");
          }
        } else {
          if (bytesWritten === 0) {
            throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");
          }
          if (firstDescriptor.bytesFilled + bytesWritten > firstDescriptor.byteLength) {
            throw new RangeError("bytesWritten out of range");
          }
        }
        firstDescriptor.buffer = TransferArrayBuffer(firstDescriptor.buffer);
        ReadableByteStreamControllerRespondInternal(controller, bytesWritten);
      }
      function ReadableByteStreamControllerRespondWithNewView(controller, view) {
        const firstDescriptor = controller._pendingPullIntos.peek();
        const state = controller._controlledReadableByteStream._state;
        if (state === "closed") {
          if (view.byteLength !== 0) {
            throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream");
          }
        } else {
          if (view.byteLength === 0) {
            throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");
          }
        }
        if (firstDescriptor.byteOffset + firstDescriptor.bytesFilled !== view.byteOffset) {
          throw new RangeError("The region specified by view does not match byobRequest");
        }
        if (firstDescriptor.bufferByteLength !== view.buffer.byteLength) {
          throw new RangeError("The buffer of view has different capacity than byobRequest");
        }
        if (firstDescriptor.bytesFilled + view.byteLength > firstDescriptor.byteLength) {
          throw new RangeError("The region specified by view is larger than byobRequest");
        }
        const viewByteLength = view.byteLength;
        firstDescriptor.buffer = TransferArrayBuffer(view.buffer);
        ReadableByteStreamControllerRespondInternal(controller, viewByteLength);
      }
      function SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize) {
        controller._controlledReadableByteStream = stream;
        controller._pullAgain = false;
        controller._pulling = false;
        controller._byobRequest = null;
        controller._queue = controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._closeRequested = false;
        controller._started = false;
        controller._strategyHWM = highWaterMark;
        controller._pullAlgorithm = pullAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        controller._autoAllocateChunkSize = autoAllocateChunkSize;
        controller._pendingPullIntos = new SimpleQueue();
        stream._readableStreamController = controller;
        const startResult = startAlgorithm();
        uponPromise(promiseResolvedWith(startResult), () => {
          controller._started = true;
          ReadableByteStreamControllerCallPullIfNeeded(controller);
          return null;
        }, (r10) => {
          ReadableByteStreamControllerError(controller, r10);
          return null;
        });
      }
      function SetUpReadableByteStreamControllerFromUnderlyingSource(stream, underlyingByteSource, highWaterMark) {
        const controller = Object.create(ReadableByteStreamController.prototype);
        let startAlgorithm;
        let pullAlgorithm;
        let cancelAlgorithm;
        if (underlyingByteSource.start !== void 0) {
          startAlgorithm = () => underlyingByteSource.start(controller);
        } else {
          startAlgorithm = () => void 0;
        }
        if (underlyingByteSource.pull !== void 0) {
          pullAlgorithm = () => underlyingByteSource.pull(controller);
        } else {
          pullAlgorithm = () => promiseResolvedWith(void 0);
        }
        if (underlyingByteSource.cancel !== void 0) {
          cancelAlgorithm = (reason) => underlyingByteSource.cancel(reason);
        } else {
          cancelAlgorithm = () => promiseResolvedWith(void 0);
        }
        const autoAllocateChunkSize = underlyingByteSource.autoAllocateChunkSize;
        if (autoAllocateChunkSize === 0) {
          throw new TypeError("autoAllocateChunkSize must be greater than 0");
        }
        SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, autoAllocateChunkSize);
      }
      function SetUpReadableStreamBYOBRequest(request, controller, view) {
        request._associatedReadableByteStreamController = controller;
        request._view = view;
      }
      function byobRequestBrandCheckException(name) {
        return new TypeError(`ReadableStreamBYOBRequest.prototype.${name} can only be used on a ReadableStreamBYOBRequest`);
      }
      function byteStreamControllerBrandCheckException(name) {
        return new TypeError(`ReadableByteStreamController.prototype.${name} can only be used on a ReadableByteStreamController`);
      }
      function convertReaderOptions(options, context) {
        assertDictionary(options, context);
        const mode = options === null || options === void 0 ? void 0 : options.mode;
        return {
          mode: mode === void 0 ? void 0 : convertReadableStreamReaderMode(mode, `${context} has member 'mode' that`)
        };
      }
      function convertReadableStreamReaderMode(mode, context) {
        mode = `${mode}`;
        if (mode !== "byob") {
          throw new TypeError(`${context} '${mode}' is not a valid enumeration value for ReadableStreamReaderMode`);
        }
        return mode;
      }
      function convertByobReadOptions(options, context) {
        var _a6;
        assertDictionary(options, context);
        const min2 = (_a6 = options === null || options === void 0 ? void 0 : options.min) !== null && _a6 !== void 0 ? _a6 : 1;
        return {
          min: convertUnsignedLongLongWithEnforceRange(min2, `${context} has member 'min' that`)
        };
      }
      function AcquireReadableStreamBYOBReader(stream) {
        return new ReadableStreamBYOBReader(stream);
      }
      function ReadableStreamAddReadIntoRequest(stream, readIntoRequest) {
        stream._reader._readIntoRequests.push(readIntoRequest);
      }
      function ReadableStreamFulfillReadIntoRequest(stream, chunk, done) {
        const reader = stream._reader;
        const readIntoRequest = reader._readIntoRequests.shift();
        if (done) {
          readIntoRequest._closeSteps(chunk);
        } else {
          readIntoRequest._chunkSteps(chunk);
        }
      }
      function ReadableStreamGetNumReadIntoRequests(stream) {
        return stream._reader._readIntoRequests.length;
      }
      function ReadableStreamHasBYOBReader(stream) {
        const reader = stream._reader;
        if (reader === void 0) {
          return false;
        }
        if (!IsReadableStreamBYOBReader(reader)) {
          return false;
        }
        return true;
      }
      class ReadableStreamBYOBReader {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "ReadableStreamBYOBReader");
          assertReadableStream(stream, "First parameter");
          if (IsReadableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive reading by another reader");
          }
          if (!IsReadableByteStreamController(stream._readableStreamController)) {
            throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");
          }
          ReadableStreamReaderGenericInitialize(this, stream);
          this._readIntoRequests = new SimpleQueue();
        }
        /**
         * Returns a promise that will be fulfilled when the stream becomes closed, or rejected if the stream ever errors or
         * the reader's lock is released before the stream finishes closing.
         */
        get closed() {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        /**
         * If the reader is active, behaves the same as {@link ReadableStream.cancel | stream.cancel(reason)}.
         */
        cancel(reason = void 0) {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("cancel"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("cancel"));
          }
          return ReadableStreamReaderGenericCancel(this, reason);
        }
        read(view, rawOptions = {}) {
          if (!IsReadableStreamBYOBReader(this)) {
            return promiseRejectedWith(byobReaderBrandCheckException("read"));
          }
          if (!ArrayBuffer.isView(view)) {
            return promiseRejectedWith(new TypeError("view must be an array buffer view"));
          }
          if (view.byteLength === 0) {
            return promiseRejectedWith(new TypeError("view must have non-zero byteLength"));
          }
          if (view.buffer.byteLength === 0) {
            return promiseRejectedWith(new TypeError(`view's buffer must have non-zero byteLength`));
          }
          if (IsDetachedBuffer(view.buffer)) {
            return promiseRejectedWith(new TypeError("view's buffer has been detached"));
          }
          let options;
          try {
            options = convertByobReadOptions(rawOptions, "options");
          } catch (e11) {
            return promiseRejectedWith(e11);
          }
          const min2 = options.min;
          if (min2 === 0) {
            return promiseRejectedWith(new TypeError("options.min must be greater than 0"));
          }
          if (!isDataView(view)) {
            if (min2 > view.length) {
              return promiseRejectedWith(new RangeError("options.min must be less than or equal to view's length"));
            }
          } else if (min2 > view.byteLength) {
            return promiseRejectedWith(new RangeError("options.min must be less than or equal to view's byteLength"));
          }
          if (this._ownerReadableStream === void 0) {
            return promiseRejectedWith(readerLockException("read from"));
          }
          let resolvePromise;
          let rejectPromise;
          const promise = newPromise((resolve, reject) => {
            resolvePromise = resolve;
            rejectPromise = reject;
          });
          const readIntoRequest = {
            _chunkSteps: (chunk) => resolvePromise({ value: chunk, done: false }),
            _closeSteps: (chunk) => resolvePromise({ value: chunk, done: true }),
            _errorSteps: (e11) => rejectPromise(e11)
          };
          ReadableStreamBYOBReaderRead(this, view, min2, readIntoRequest);
          return promise;
        }
        /**
         * Releases the reader's lock on the corresponding stream. After the lock is released, the reader is no longer active.
         * If the associated stream is errored when the lock is released, the reader will appear errored in the same way
         * from now on; otherwise, the reader will appear closed.
         *
         * A reader's lock cannot be released while it still has a pending read request, i.e., if a promise returned by
         * the reader's {@link ReadableStreamBYOBReader.read | read()} method has not yet been settled. Attempting to
         * do so will throw a `TypeError` and leave the reader locked to the stream.
         */
        releaseLock() {
          if (!IsReadableStreamBYOBReader(this)) {
            throw byobReaderBrandCheckException("releaseLock");
          }
          if (this._ownerReadableStream === void 0) {
            return;
          }
          ReadableStreamBYOBReaderRelease(this);
        }
      }
      Object.defineProperties(ReadableStreamBYOBReader.prototype, {
        cancel: { enumerable: true },
        read: { enumerable: true },
        releaseLock: { enumerable: true },
        closed: { enumerable: true }
      });
      setFunctionName(ReadableStreamBYOBReader.prototype.cancel, "cancel");
      setFunctionName(ReadableStreamBYOBReader.prototype.read, "read");
      setFunctionName(ReadableStreamBYOBReader.prototype.releaseLock, "releaseLock");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamBYOBReader.prototype, Symbol.toStringTag, {
          value: "ReadableStreamBYOBReader",
          configurable: true
        });
      }
      function IsReadableStreamBYOBReader(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_readIntoRequests")) {
          return false;
        }
        return x3 instanceof ReadableStreamBYOBReader;
      }
      function ReadableStreamBYOBReaderRead(reader, view, min2, readIntoRequest) {
        const stream = reader._ownerReadableStream;
        stream._disturbed = true;
        if (stream._state === "errored") {
          readIntoRequest._errorSteps(stream._storedError);
        } else {
          ReadableByteStreamControllerPullInto(stream._readableStreamController, view, min2, readIntoRequest);
        }
      }
      function ReadableStreamBYOBReaderRelease(reader) {
        ReadableStreamReaderGenericRelease(reader);
        const e11 = new TypeError("Reader was released");
        ReadableStreamBYOBReaderErrorReadIntoRequests(reader, e11);
      }
      function ReadableStreamBYOBReaderErrorReadIntoRequests(reader, e11) {
        const readIntoRequests = reader._readIntoRequests;
        reader._readIntoRequests = new SimpleQueue();
        readIntoRequests.forEach((readIntoRequest) => {
          readIntoRequest._errorSteps(e11);
        });
      }
      function byobReaderBrandCheckException(name) {
        return new TypeError(`ReadableStreamBYOBReader.prototype.${name} can only be used on a ReadableStreamBYOBReader`);
      }
      function ExtractHighWaterMark(strategy, defaultHWM) {
        const { highWaterMark } = strategy;
        if (highWaterMark === void 0) {
          return defaultHWM;
        }
        if (NumberIsNaN(highWaterMark) || highWaterMark < 0) {
          throw new RangeError("Invalid highWaterMark");
        }
        return highWaterMark;
      }
      function ExtractSizeAlgorithm(strategy) {
        const { size: size2 } = strategy;
        if (!size2) {
          return () => 1;
        }
        return size2;
      }
      function convertQueuingStrategy(init, context) {
        assertDictionary(init, context);
        const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
        const size2 = init === null || init === void 0 ? void 0 : init.size;
        return {
          highWaterMark: highWaterMark === void 0 ? void 0 : convertUnrestrictedDouble(highWaterMark),
          size: size2 === void 0 ? void 0 : convertQueuingStrategySize(size2, `${context} has member 'size' that`)
        };
      }
      function convertQueuingStrategySize(fn, context) {
        assertFunction(fn, context);
        return (chunk) => convertUnrestrictedDouble(fn(chunk));
      }
      function convertUnderlyingSink(original, context) {
        assertDictionary(original, context);
        const abort = original === null || original === void 0 ? void 0 : original.abort;
        const close = original === null || original === void 0 ? void 0 : original.close;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const type = original === null || original === void 0 ? void 0 : original.type;
        const write = original === null || original === void 0 ? void 0 : original.write;
        return {
          abort: abort === void 0 ? void 0 : convertUnderlyingSinkAbortCallback(abort, original, `${context} has member 'abort' that`),
          close: close === void 0 ? void 0 : convertUnderlyingSinkCloseCallback(close, original, `${context} has member 'close' that`),
          start: start === void 0 ? void 0 : convertUnderlyingSinkStartCallback(start, original, `${context} has member 'start' that`),
          write: write === void 0 ? void 0 : convertUnderlyingSinkWriteCallback(write, original, `${context} has member 'write' that`),
          type
        };
      }
      function convertUnderlyingSinkAbortCallback(fn, original, context) {
        assertFunction(fn, context);
        return (reason) => promiseCall(fn, original, [reason]);
      }
      function convertUnderlyingSinkCloseCallback(fn, original, context) {
        assertFunction(fn, context);
        return () => promiseCall(fn, original, []);
      }
      function convertUnderlyingSinkStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertUnderlyingSinkWriteCallback(fn, original, context) {
        assertFunction(fn, context);
        return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
      }
      function assertWritableStream(x3, context) {
        if (!IsWritableStream(x3)) {
          throw new TypeError(`${context} is not a WritableStream.`);
        }
      }
      function isAbortSignal2(value) {
        if (typeof value !== "object" || value === null) {
          return false;
        }
        try {
          return typeof value.aborted === "boolean";
        } catch (_a6) {
          return false;
        }
      }
      const supportsAbortController = typeof AbortController === "function";
      function createAbortController() {
        if (supportsAbortController) {
          return new AbortController();
        }
        return void 0;
      }
      class WritableStream {
        constructor(rawUnderlyingSink = {}, rawStrategy = {}) {
          if (rawUnderlyingSink === void 0) {
            rawUnderlyingSink = null;
          } else {
            assertObject(rawUnderlyingSink, "First parameter");
          }
          const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
          const underlyingSink = convertUnderlyingSink(rawUnderlyingSink, "First parameter");
          InitializeWritableStream(this);
          const type = underlyingSink.type;
          if (type !== void 0) {
            throw new RangeError("Invalid type is specified");
          }
          const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
          const highWaterMark = ExtractHighWaterMark(strategy, 1);
          SetUpWritableStreamDefaultControllerFromUnderlyingSink(this, underlyingSink, highWaterMark, sizeAlgorithm);
        }
        /**
         * Returns whether or not the writable stream is locked to a writer.
         */
        get locked() {
          if (!IsWritableStream(this)) {
            throw streamBrandCheckException$2("locked");
          }
          return IsWritableStreamLocked(this);
        }
        /**
         * Aborts the stream, signaling that the producer can no longer successfully write to the stream and it is to be
         * immediately moved to an errored state, with any queued-up writes discarded. This will also execute any abort
         * mechanism of the underlying sink.
         *
         * The returned promise will fulfill if the stream shuts down successfully, or reject if the underlying sink signaled
         * that there was an error doing so. Additionally, it will reject with a `TypeError` (without attempting to cancel
         * the stream) if the stream is currently locked.
         */
        abort(reason = void 0) {
          if (!IsWritableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$2("abort"));
          }
          if (IsWritableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot abort a stream that already has a writer"));
          }
          return WritableStreamAbort(this, reason);
        }
        /**
         * Closes the stream. The underlying sink will finish processing any previously-written chunks, before invoking its
         * close behavior. During this time any further attempts to write will fail (without erroring the stream).
         *
         * The method returns a promise that will fulfill if all remaining chunks are successfully written and the stream
         * successfully closes, or rejects if an error is encountered during this process. Additionally, it will reject with
         * a `TypeError` (without attempting to cancel the stream) if the stream is currently locked.
         */
        close() {
          if (!IsWritableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$2("close"));
          }
          if (IsWritableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot close a stream that already has a writer"));
          }
          if (WritableStreamCloseQueuedOrInFlight(this)) {
            return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
          }
          return WritableStreamClose(this);
        }
        /**
         * Creates a {@link WritableStreamDefaultWriter | writer} and locks the stream to the new writer. While the stream
         * is locked, no other writer can be acquired until this one is released.
         *
         * This functionality is especially useful for creating abstractions that desire the ability to write to a stream
         * without interruption or interleaving. By getting a writer for the stream, you can ensure nobody else can write at
         * the same time, which would cause the resulting written data to be unpredictable and probably useless.
         */
        getWriter() {
          if (!IsWritableStream(this)) {
            throw streamBrandCheckException$2("getWriter");
          }
          return AcquireWritableStreamDefaultWriter(this);
        }
      }
      Object.defineProperties(WritableStream.prototype, {
        abort: { enumerable: true },
        close: { enumerable: true },
        getWriter: { enumerable: true },
        locked: { enumerable: true }
      });
      setFunctionName(WritableStream.prototype.abort, "abort");
      setFunctionName(WritableStream.prototype.close, "close");
      setFunctionName(WritableStream.prototype.getWriter, "getWriter");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(WritableStream.prototype, Symbol.toStringTag, {
          value: "WritableStream",
          configurable: true
        });
      }
      function AcquireWritableStreamDefaultWriter(stream) {
        return new WritableStreamDefaultWriter(stream);
      }
      function CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
        const stream = Object.create(WritableStream.prototype);
        InitializeWritableStream(stream);
        const controller = Object.create(WritableStreamDefaultController.prototype);
        SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
        return stream;
      }
      function InitializeWritableStream(stream) {
        stream._state = "writable";
        stream._storedError = void 0;
        stream._writer = void 0;
        stream._writableStreamController = void 0;
        stream._writeRequests = new SimpleQueue();
        stream._inFlightWriteRequest = void 0;
        stream._closeRequest = void 0;
        stream._inFlightCloseRequest = void 0;
        stream._pendingAbortRequest = void 0;
        stream._backpressure = false;
      }
      function IsWritableStream(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_writableStreamController")) {
          return false;
        }
        return x3 instanceof WritableStream;
      }
      function IsWritableStreamLocked(stream) {
        if (stream._writer === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamAbort(stream, reason) {
        var _a6;
        if (stream._state === "closed" || stream._state === "errored") {
          return promiseResolvedWith(void 0);
        }
        stream._writableStreamController._abortReason = reason;
        (_a6 = stream._writableStreamController._abortController) === null || _a6 === void 0 ? void 0 : _a6.abort(reason);
        const state = stream._state;
        if (state === "closed" || state === "errored") {
          return promiseResolvedWith(void 0);
        }
        if (stream._pendingAbortRequest !== void 0) {
          return stream._pendingAbortRequest._promise;
        }
        let wasAlreadyErroring = false;
        if (state === "erroring") {
          wasAlreadyErroring = true;
          reason = void 0;
        }
        const promise = newPromise((resolve, reject) => {
          stream._pendingAbortRequest = {
            _promise: void 0,
            _resolve: resolve,
            _reject: reject,
            _reason: reason,
            _wasAlreadyErroring: wasAlreadyErroring
          };
        });
        stream._pendingAbortRequest._promise = promise;
        if (!wasAlreadyErroring) {
          WritableStreamStartErroring(stream, reason);
        }
        return promise;
      }
      function WritableStreamClose(stream) {
        const state = stream._state;
        if (state === "closed" || state === "errored") {
          return promiseRejectedWith(new TypeError(`The stream (in ${state} state) is not in the writable state and cannot be closed`));
        }
        const promise = newPromise((resolve, reject) => {
          const closeRequest = {
            _resolve: resolve,
            _reject: reject
          };
          stream._closeRequest = closeRequest;
        });
        const writer = stream._writer;
        if (writer !== void 0 && stream._backpressure && state === "writable") {
          defaultWriterReadyPromiseResolve(writer);
        }
        WritableStreamDefaultControllerClose(stream._writableStreamController);
        return promise;
      }
      function WritableStreamAddWriteRequest(stream) {
        const promise = newPromise((resolve, reject) => {
          const writeRequest = {
            _resolve: resolve,
            _reject: reject
          };
          stream._writeRequests.push(writeRequest);
        });
        return promise;
      }
      function WritableStreamDealWithRejection(stream, error) {
        const state = stream._state;
        if (state === "writable") {
          WritableStreamStartErroring(stream, error);
          return;
        }
        WritableStreamFinishErroring(stream);
      }
      function WritableStreamStartErroring(stream, reason) {
        const controller = stream._writableStreamController;
        stream._state = "erroring";
        stream._storedError = reason;
        const writer = stream._writer;
        if (writer !== void 0) {
          WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, reason);
        }
        if (!WritableStreamHasOperationMarkedInFlight(stream) && controller._started) {
          WritableStreamFinishErroring(stream);
        }
      }
      function WritableStreamFinishErroring(stream) {
        stream._state = "errored";
        stream._writableStreamController[ErrorSteps]();
        const storedError = stream._storedError;
        stream._writeRequests.forEach((writeRequest) => {
          writeRequest._reject(storedError);
        });
        stream._writeRequests = new SimpleQueue();
        if (stream._pendingAbortRequest === void 0) {
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          return;
        }
        const abortRequest = stream._pendingAbortRequest;
        stream._pendingAbortRequest = void 0;
        if (abortRequest._wasAlreadyErroring) {
          abortRequest._reject(storedError);
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          return;
        }
        const promise = stream._writableStreamController[AbortSteps](abortRequest._reason);
        uponPromise(promise, () => {
          abortRequest._resolve();
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          return null;
        }, (reason) => {
          abortRequest._reject(reason);
          WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream);
          return null;
        });
      }
      function WritableStreamFinishInFlightWrite(stream) {
        stream._inFlightWriteRequest._resolve(void 0);
        stream._inFlightWriteRequest = void 0;
      }
      function WritableStreamFinishInFlightWriteWithError(stream, error) {
        stream._inFlightWriteRequest._reject(error);
        stream._inFlightWriteRequest = void 0;
        WritableStreamDealWithRejection(stream, error);
      }
      function WritableStreamFinishInFlightClose(stream) {
        stream._inFlightCloseRequest._resolve(void 0);
        stream._inFlightCloseRequest = void 0;
        const state = stream._state;
        if (state === "erroring") {
          stream._storedError = void 0;
          if (stream._pendingAbortRequest !== void 0) {
            stream._pendingAbortRequest._resolve();
            stream._pendingAbortRequest = void 0;
          }
        }
        stream._state = "closed";
        const writer = stream._writer;
        if (writer !== void 0) {
          defaultWriterClosedPromiseResolve(writer);
        }
      }
      function WritableStreamFinishInFlightCloseWithError(stream, error) {
        stream._inFlightCloseRequest._reject(error);
        stream._inFlightCloseRequest = void 0;
        if (stream._pendingAbortRequest !== void 0) {
          stream._pendingAbortRequest._reject(error);
          stream._pendingAbortRequest = void 0;
        }
        WritableStreamDealWithRejection(stream, error);
      }
      function WritableStreamCloseQueuedOrInFlight(stream) {
        if (stream._closeRequest === void 0 && stream._inFlightCloseRequest === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamHasOperationMarkedInFlight(stream) {
        if (stream._inFlightWriteRequest === void 0 && stream._inFlightCloseRequest === void 0) {
          return false;
        }
        return true;
      }
      function WritableStreamMarkCloseRequestInFlight(stream) {
        stream._inFlightCloseRequest = stream._closeRequest;
        stream._closeRequest = void 0;
      }
      function WritableStreamMarkFirstWriteRequestInFlight(stream) {
        stream._inFlightWriteRequest = stream._writeRequests.shift();
      }
      function WritableStreamRejectCloseAndClosedPromiseIfNeeded(stream) {
        if (stream._closeRequest !== void 0) {
          stream._closeRequest._reject(stream._storedError);
          stream._closeRequest = void 0;
        }
        const writer = stream._writer;
        if (writer !== void 0) {
          defaultWriterClosedPromiseReject(writer, stream._storedError);
        }
      }
      function WritableStreamUpdateBackpressure(stream, backpressure) {
        const writer = stream._writer;
        if (writer !== void 0 && backpressure !== stream._backpressure) {
          if (backpressure) {
            defaultWriterReadyPromiseReset(writer);
          } else {
            defaultWriterReadyPromiseResolve(writer);
          }
        }
        stream._backpressure = backpressure;
      }
      class WritableStreamDefaultWriter {
        constructor(stream) {
          assertRequiredArgument(stream, 1, "WritableStreamDefaultWriter");
          assertWritableStream(stream, "First parameter");
          if (IsWritableStreamLocked(stream)) {
            throw new TypeError("This stream has already been locked for exclusive writing by another writer");
          }
          this._ownerWritableStream = stream;
          stream._writer = this;
          const state = stream._state;
          if (state === "writable") {
            if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._backpressure) {
              defaultWriterReadyPromiseInitialize(this);
            } else {
              defaultWriterReadyPromiseInitializeAsResolved(this);
            }
            defaultWriterClosedPromiseInitialize(this);
          } else if (state === "erroring") {
            defaultWriterReadyPromiseInitializeAsRejected(this, stream._storedError);
            defaultWriterClosedPromiseInitialize(this);
          } else if (state === "closed") {
            defaultWriterReadyPromiseInitializeAsResolved(this);
            defaultWriterClosedPromiseInitializeAsResolved(this);
          } else {
            const storedError = stream._storedError;
            defaultWriterReadyPromiseInitializeAsRejected(this, storedError);
            defaultWriterClosedPromiseInitializeAsRejected(this, storedError);
          }
        }
        /**
         * Returns a promise that will be fulfilled when the stream becomes closed, or rejected if the stream ever errors or
         * the writer’s lock is released before the stream finishes closing.
         */
        get closed() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("closed"));
          }
          return this._closedPromise;
        }
        /**
         * Returns the desired size to fill the stream’s internal queue. It can be negative, if the queue is over-full.
         * A producer can use this information to determine the right amount of data to write.
         *
         * It will be `null` if the stream cannot be successfully written to (due to either being errored, or having an abort
         * queued up). It will return zero if the stream is closed. And the getter will throw an exception if invoked when
         * the writer’s lock is released.
         */
        get desiredSize() {
          if (!IsWritableStreamDefaultWriter(this)) {
            throw defaultWriterBrandCheckException("desiredSize");
          }
          if (this._ownerWritableStream === void 0) {
            throw defaultWriterLockException("desiredSize");
          }
          return WritableStreamDefaultWriterGetDesiredSize(this);
        }
        /**
         * Returns a promise that will be fulfilled when the desired size to fill the stream’s internal queue transitions
         * from non-positive to positive, signaling that it is no longer applying backpressure. Once the desired size dips
         * back to zero or below, the getter will return a new promise that stays pending until the next transition.
         *
         * If the stream becomes errored or aborted, or the writer’s lock is released, the returned promise will become
         * rejected.
         */
        get ready() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("ready"));
          }
          return this._readyPromise;
        }
        /**
         * If the reader is active, behaves the same as {@link WritableStream.abort | stream.abort(reason)}.
         */
        abort(reason = void 0) {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("abort"));
          }
          if (this._ownerWritableStream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("abort"));
          }
          return WritableStreamDefaultWriterAbort(this, reason);
        }
        /**
         * If the reader is active, behaves the same as {@link WritableStream.close | stream.close()}.
         */
        close() {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("close"));
          }
          const stream = this._ownerWritableStream;
          if (stream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("close"));
          }
          if (WritableStreamCloseQueuedOrInFlight(stream)) {
            return promiseRejectedWith(new TypeError("Cannot close an already-closing stream"));
          }
          return WritableStreamDefaultWriterClose(this);
        }
        /**
         * Releases the writer’s lock on the corresponding stream. After the lock is released, the writer is no longer active.
         * If the associated stream is errored when the lock is released, the writer will appear errored in the same way from
         * now on; otherwise, the writer will appear closed.
         *
         * Note that the lock can still be released even if some ongoing writes have not yet finished (i.e. even if the
         * promises returned from previous calls to {@link WritableStreamDefaultWriter.write | write()} have not yet settled).
         * It’s not necessary to hold the lock on the writer for the duration of the write; the lock instead simply prevents
         * other producers from writing in an interleaved manner.
         */
        releaseLock() {
          if (!IsWritableStreamDefaultWriter(this)) {
            throw defaultWriterBrandCheckException("releaseLock");
          }
          const stream = this._ownerWritableStream;
          if (stream === void 0) {
            return;
          }
          WritableStreamDefaultWriterRelease(this);
        }
        write(chunk = void 0) {
          if (!IsWritableStreamDefaultWriter(this)) {
            return promiseRejectedWith(defaultWriterBrandCheckException("write"));
          }
          if (this._ownerWritableStream === void 0) {
            return promiseRejectedWith(defaultWriterLockException("write to"));
          }
          return WritableStreamDefaultWriterWrite(this, chunk);
        }
      }
      Object.defineProperties(WritableStreamDefaultWriter.prototype, {
        abort: { enumerable: true },
        close: { enumerable: true },
        releaseLock: { enumerable: true },
        write: { enumerable: true },
        closed: { enumerable: true },
        desiredSize: { enumerable: true },
        ready: { enumerable: true }
      });
      setFunctionName(WritableStreamDefaultWriter.prototype.abort, "abort");
      setFunctionName(WritableStreamDefaultWriter.prototype.close, "close");
      setFunctionName(WritableStreamDefaultWriter.prototype.releaseLock, "releaseLock");
      setFunctionName(WritableStreamDefaultWriter.prototype.write, "write");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(WritableStreamDefaultWriter.prototype, Symbol.toStringTag, {
          value: "WritableStreamDefaultWriter",
          configurable: true
        });
      }
      function IsWritableStreamDefaultWriter(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_ownerWritableStream")) {
          return false;
        }
        return x3 instanceof WritableStreamDefaultWriter;
      }
      function WritableStreamDefaultWriterAbort(writer, reason) {
        const stream = writer._ownerWritableStream;
        return WritableStreamAbort(stream, reason);
      }
      function WritableStreamDefaultWriterClose(writer) {
        const stream = writer._ownerWritableStream;
        return WritableStreamClose(stream);
      }
      function WritableStreamDefaultWriterCloseWithErrorPropagation(writer) {
        const stream = writer._ownerWritableStream;
        const state = stream._state;
        if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
          return promiseResolvedWith(void 0);
        }
        if (state === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        return WritableStreamDefaultWriterClose(writer);
      }
      function WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, error) {
        if (writer._closedPromiseState === "pending") {
          defaultWriterClosedPromiseReject(writer, error);
        } else {
          defaultWriterClosedPromiseResetToRejected(writer, error);
        }
      }
      function WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, error) {
        if (writer._readyPromiseState === "pending") {
          defaultWriterReadyPromiseReject(writer, error);
        } else {
          defaultWriterReadyPromiseResetToRejected(writer, error);
        }
      }
      function WritableStreamDefaultWriterGetDesiredSize(writer) {
        const stream = writer._ownerWritableStream;
        const state = stream._state;
        if (state === "errored" || state === "erroring") {
          return null;
        }
        if (state === "closed") {
          return 0;
        }
        return WritableStreamDefaultControllerGetDesiredSize(stream._writableStreamController);
      }
      function WritableStreamDefaultWriterRelease(writer) {
        const stream = writer._ownerWritableStream;
        const releasedError = new TypeError(`Writer was released and can no longer be used to monitor the stream's closedness`);
        WritableStreamDefaultWriterEnsureReadyPromiseRejected(writer, releasedError);
        WritableStreamDefaultWriterEnsureClosedPromiseRejected(writer, releasedError);
        stream._writer = void 0;
        writer._ownerWritableStream = void 0;
      }
      function WritableStreamDefaultWriterWrite(writer, chunk) {
        const stream = writer._ownerWritableStream;
        const controller = stream._writableStreamController;
        const chunkSize = WritableStreamDefaultControllerGetChunkSize(controller, chunk);
        if (stream !== writer._ownerWritableStream) {
          return promiseRejectedWith(defaultWriterLockException("write to"));
        }
        const state = stream._state;
        if (state === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        if (WritableStreamCloseQueuedOrInFlight(stream) || state === "closed") {
          return promiseRejectedWith(new TypeError("The stream is closing or closed and cannot be written to"));
        }
        if (state === "erroring") {
          return promiseRejectedWith(stream._storedError);
        }
        const promise = WritableStreamAddWriteRequest(stream);
        WritableStreamDefaultControllerWrite(controller, chunk, chunkSize);
        return promise;
      }
      const closeSentinel = {};
      class WritableStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        /**
         * The reason which was passed to `WritableStream.abort(reason)` when the stream was aborted.
         *
         * @deprecated
         *  This property has been removed from the specification, see https://github.com/whatwg/streams/pull/1177.
         *  Use {@link WritableStreamDefaultController.signal}'s `reason` instead.
         */
        get abortReason() {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("abortReason");
          }
          return this._abortReason;
        }
        /**
         * An `AbortSignal` that can be used to abort the pending write or close operation when the stream is aborted.
         */
        get signal() {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("signal");
          }
          if (this._abortController === void 0) {
            throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");
          }
          return this._abortController.signal;
        }
        /**
         * Closes the controlled writable stream, making all future interactions with it fail with the given error `e`.
         *
         * This method is rarely used, since usually it suffices to return a rejected promise from one of the underlying
         * sink's methods. However, it can be useful for suddenly shutting down a stream in response to an event outside the
         * normal lifecycle of interactions with the underlying sink.
         */
        error(e11 = void 0) {
          if (!IsWritableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$2("error");
          }
          const state = this._controlledWritableStream._state;
          if (state !== "writable") {
            return;
          }
          WritableStreamDefaultControllerError(this, e11);
        }
        /** @internal */
        [AbortSteps](reason) {
          const result = this._abortAlgorithm(reason);
          WritableStreamDefaultControllerClearAlgorithms(this);
          return result;
        }
        /** @internal */
        [ErrorSteps]() {
          ResetQueue(this);
        }
      }
      Object.defineProperties(WritableStreamDefaultController.prototype, {
        abortReason: { enumerable: true },
        signal: { enumerable: true },
        error: { enumerable: true }
      });
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(WritableStreamDefaultController.prototype, Symbol.toStringTag, {
          value: "WritableStreamDefaultController",
          configurable: true
        });
      }
      function IsWritableStreamDefaultController(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_controlledWritableStream")) {
          return false;
        }
        return x3 instanceof WritableStreamDefaultController;
      }
      function SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm) {
        controller._controlledWritableStream = stream;
        stream._writableStreamController = controller;
        controller._queue = void 0;
        controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._abortReason = void 0;
        controller._abortController = createAbortController();
        controller._started = false;
        controller._strategySizeAlgorithm = sizeAlgorithm;
        controller._strategyHWM = highWaterMark;
        controller._writeAlgorithm = writeAlgorithm;
        controller._closeAlgorithm = closeAlgorithm;
        controller._abortAlgorithm = abortAlgorithm;
        const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
        WritableStreamUpdateBackpressure(stream, backpressure);
        const startResult = startAlgorithm();
        const startPromise = promiseResolvedWith(startResult);
        uponPromise(startPromise, () => {
          controller._started = true;
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          return null;
        }, (r10) => {
          controller._started = true;
          WritableStreamDealWithRejection(stream, r10);
          return null;
        });
      }
      function SetUpWritableStreamDefaultControllerFromUnderlyingSink(stream, underlyingSink, highWaterMark, sizeAlgorithm) {
        const controller = Object.create(WritableStreamDefaultController.prototype);
        let startAlgorithm;
        let writeAlgorithm;
        let closeAlgorithm;
        let abortAlgorithm;
        if (underlyingSink.start !== void 0) {
          startAlgorithm = () => underlyingSink.start(controller);
        } else {
          startAlgorithm = () => void 0;
        }
        if (underlyingSink.write !== void 0) {
          writeAlgorithm = (chunk) => underlyingSink.write(chunk, controller);
        } else {
          writeAlgorithm = () => promiseResolvedWith(void 0);
        }
        if (underlyingSink.close !== void 0) {
          closeAlgorithm = () => underlyingSink.close();
        } else {
          closeAlgorithm = () => promiseResolvedWith(void 0);
        }
        if (underlyingSink.abort !== void 0) {
          abortAlgorithm = (reason) => underlyingSink.abort(reason);
        } else {
          abortAlgorithm = () => promiseResolvedWith(void 0);
        }
        SetUpWritableStreamDefaultController(stream, controller, startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, highWaterMark, sizeAlgorithm);
      }
      function WritableStreamDefaultControllerClearAlgorithms(controller) {
        controller._writeAlgorithm = void 0;
        controller._closeAlgorithm = void 0;
        controller._abortAlgorithm = void 0;
        controller._strategySizeAlgorithm = void 0;
      }
      function WritableStreamDefaultControllerClose(controller) {
        EnqueueValueWithSize(controller, closeSentinel, 0);
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }
      function WritableStreamDefaultControllerGetChunkSize(controller, chunk) {
        try {
          return controller._strategySizeAlgorithm(chunk);
        } catch (chunkSizeE) {
          WritableStreamDefaultControllerErrorIfNeeded(controller, chunkSizeE);
          return 1;
        }
      }
      function WritableStreamDefaultControllerGetDesiredSize(controller) {
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function WritableStreamDefaultControllerWrite(controller, chunk, chunkSize) {
        try {
          EnqueueValueWithSize(controller, chunk, chunkSize);
        } catch (enqueueE) {
          WritableStreamDefaultControllerErrorIfNeeded(controller, enqueueE);
          return;
        }
        const stream = controller._controlledWritableStream;
        if (!WritableStreamCloseQueuedOrInFlight(stream) && stream._state === "writable") {
          const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
          WritableStreamUpdateBackpressure(stream, backpressure);
        }
        WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
      }
      function WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller) {
        const stream = controller._controlledWritableStream;
        if (!controller._started) {
          return;
        }
        if (stream._inFlightWriteRequest !== void 0) {
          return;
        }
        const state = stream._state;
        if (state === "erroring") {
          WritableStreamFinishErroring(stream);
          return;
        }
        if (controller._queue.length === 0) {
          return;
        }
        const value = PeekQueueValue(controller);
        if (value === closeSentinel) {
          WritableStreamDefaultControllerProcessClose(controller);
        } else {
          WritableStreamDefaultControllerProcessWrite(controller, value);
        }
      }
      function WritableStreamDefaultControllerErrorIfNeeded(controller, error) {
        if (controller._controlledWritableStream._state === "writable") {
          WritableStreamDefaultControllerError(controller, error);
        }
      }
      function WritableStreamDefaultControllerProcessClose(controller) {
        const stream = controller._controlledWritableStream;
        WritableStreamMarkCloseRequestInFlight(stream);
        DequeueValue(controller);
        const sinkClosePromise = controller._closeAlgorithm();
        WritableStreamDefaultControllerClearAlgorithms(controller);
        uponPromise(sinkClosePromise, () => {
          WritableStreamFinishInFlightClose(stream);
          return null;
        }, (reason) => {
          WritableStreamFinishInFlightCloseWithError(stream, reason);
          return null;
        });
      }
      function WritableStreamDefaultControllerProcessWrite(controller, chunk) {
        const stream = controller._controlledWritableStream;
        WritableStreamMarkFirstWriteRequestInFlight(stream);
        const sinkWritePromise = controller._writeAlgorithm(chunk);
        uponPromise(sinkWritePromise, () => {
          WritableStreamFinishInFlightWrite(stream);
          const state = stream._state;
          DequeueValue(controller);
          if (!WritableStreamCloseQueuedOrInFlight(stream) && state === "writable") {
            const backpressure = WritableStreamDefaultControllerGetBackpressure(controller);
            WritableStreamUpdateBackpressure(stream, backpressure);
          }
          WritableStreamDefaultControllerAdvanceQueueIfNeeded(controller);
          return null;
        }, (reason) => {
          if (stream._state === "writable") {
            WritableStreamDefaultControllerClearAlgorithms(controller);
          }
          WritableStreamFinishInFlightWriteWithError(stream, reason);
          return null;
        });
      }
      function WritableStreamDefaultControllerGetBackpressure(controller) {
        const desiredSize = WritableStreamDefaultControllerGetDesiredSize(controller);
        return desiredSize <= 0;
      }
      function WritableStreamDefaultControllerError(controller, error) {
        const stream = controller._controlledWritableStream;
        WritableStreamDefaultControllerClearAlgorithms(controller);
        WritableStreamStartErroring(stream, error);
      }
      function streamBrandCheckException$2(name) {
        return new TypeError(`WritableStream.prototype.${name} can only be used on a WritableStream`);
      }
      function defaultControllerBrandCheckException$2(name) {
        return new TypeError(`WritableStreamDefaultController.prototype.${name} can only be used on a WritableStreamDefaultController`);
      }
      function defaultWriterBrandCheckException(name) {
        return new TypeError(`WritableStreamDefaultWriter.prototype.${name} can only be used on a WritableStreamDefaultWriter`);
      }
      function defaultWriterLockException(name) {
        return new TypeError("Cannot " + name + " a stream using a released writer");
      }
      function defaultWriterClosedPromiseInitialize(writer) {
        writer._closedPromise = newPromise((resolve, reject) => {
          writer._closedPromise_resolve = resolve;
          writer._closedPromise_reject = reject;
          writer._closedPromiseState = "pending";
        });
      }
      function defaultWriterClosedPromiseInitializeAsRejected(writer, reason) {
        defaultWriterClosedPromiseInitialize(writer);
        defaultWriterClosedPromiseReject(writer, reason);
      }
      function defaultWriterClosedPromiseInitializeAsResolved(writer) {
        defaultWriterClosedPromiseInitialize(writer);
        defaultWriterClosedPromiseResolve(writer);
      }
      function defaultWriterClosedPromiseReject(writer, reason) {
        if (writer._closedPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(writer._closedPromise);
        writer._closedPromise_reject(reason);
        writer._closedPromise_resolve = void 0;
        writer._closedPromise_reject = void 0;
        writer._closedPromiseState = "rejected";
      }
      function defaultWriterClosedPromiseResetToRejected(writer, reason) {
        defaultWriterClosedPromiseInitializeAsRejected(writer, reason);
      }
      function defaultWriterClosedPromiseResolve(writer) {
        if (writer._closedPromise_resolve === void 0) {
          return;
        }
        writer._closedPromise_resolve(void 0);
        writer._closedPromise_resolve = void 0;
        writer._closedPromise_reject = void 0;
        writer._closedPromiseState = "resolved";
      }
      function defaultWriterReadyPromiseInitialize(writer) {
        writer._readyPromise = newPromise((resolve, reject) => {
          writer._readyPromise_resolve = resolve;
          writer._readyPromise_reject = reject;
        });
        writer._readyPromiseState = "pending";
      }
      function defaultWriterReadyPromiseInitializeAsRejected(writer, reason) {
        defaultWriterReadyPromiseInitialize(writer);
        defaultWriterReadyPromiseReject(writer, reason);
      }
      function defaultWriterReadyPromiseInitializeAsResolved(writer) {
        defaultWriterReadyPromiseInitialize(writer);
        defaultWriterReadyPromiseResolve(writer);
      }
      function defaultWriterReadyPromiseReject(writer, reason) {
        if (writer._readyPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(writer._readyPromise);
        writer._readyPromise_reject(reason);
        writer._readyPromise_resolve = void 0;
        writer._readyPromise_reject = void 0;
        writer._readyPromiseState = "rejected";
      }
      function defaultWriterReadyPromiseReset(writer) {
        defaultWriterReadyPromiseInitialize(writer);
      }
      function defaultWriterReadyPromiseResetToRejected(writer, reason) {
        defaultWriterReadyPromiseInitializeAsRejected(writer, reason);
      }
      function defaultWriterReadyPromiseResolve(writer) {
        if (writer._readyPromise_resolve === void 0) {
          return;
        }
        writer._readyPromise_resolve(void 0);
        writer._readyPromise_resolve = void 0;
        writer._readyPromise_reject = void 0;
        writer._readyPromiseState = "fulfilled";
      }
      function getGlobals() {
        if (typeof globalThis !== "undefined") {
          return globalThis;
        } else if (typeof self !== "undefined") {
          return self;
        } else if (typeof global !== "undefined") {
          return global;
        }
        return void 0;
      }
      const globals = getGlobals();
      function isDOMExceptionConstructor(ctor) {
        if (!(typeof ctor === "function" || typeof ctor === "object")) {
          return false;
        }
        if (ctor.name !== "DOMException") {
          return false;
        }
        try {
          new ctor();
          return true;
        } catch (_a6) {
          return false;
        }
      }
      function getFromGlobal() {
        const ctor = globals === null || globals === void 0 ? void 0 : globals.DOMException;
        return isDOMExceptionConstructor(ctor) ? ctor : void 0;
      }
      function createPolyfill() {
        const ctor = function DOMException3(message, name) {
          this.message = message || "";
          this.name = name || "Error";
          if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
          }
        };
        setFunctionName(ctor, "DOMException");
        ctor.prototype = Object.create(Error.prototype);
        Object.defineProperty(ctor.prototype, "constructor", { value: ctor, writable: true, configurable: true });
        return ctor;
      }
      const DOMException2 = getFromGlobal() || createPolyfill();
      function ReadableStreamPipeTo(source, dest, preventClose, preventAbort, preventCancel, signal) {
        const reader = AcquireReadableStreamDefaultReader(source);
        const writer = AcquireWritableStreamDefaultWriter(dest);
        source._disturbed = true;
        let shuttingDown = false;
        let currentWrite = promiseResolvedWith(void 0);
        return newPromise((resolve, reject) => {
          let abortAlgorithm;
          if (signal !== void 0) {
            abortAlgorithm = () => {
              const error = signal.reason !== void 0 ? signal.reason : new DOMException2("Aborted", "AbortError");
              const actions = [];
              if (!preventAbort) {
                actions.push(() => {
                  if (dest._state === "writable") {
                    return WritableStreamAbort(dest, error);
                  }
                  return promiseResolvedWith(void 0);
                });
              }
              if (!preventCancel) {
                actions.push(() => {
                  if (source._state === "readable") {
                    return ReadableStreamCancel(source, error);
                  }
                  return promiseResolvedWith(void 0);
                });
              }
              shutdownWithAction(() => Promise.all(actions.map((action) => action())), true, error);
            };
            if (signal.aborted) {
              abortAlgorithm();
              return;
            }
            signal.addEventListener("abort", abortAlgorithm);
          }
          function pipeLoop() {
            return newPromise((resolveLoop, rejectLoop) => {
              function next(done) {
                if (done) {
                  resolveLoop();
                } else {
                  PerformPromiseThen(pipeStep(), next, rejectLoop);
                }
              }
              next(false);
            });
          }
          function pipeStep() {
            if (shuttingDown) {
              return promiseResolvedWith(true);
            }
            return PerformPromiseThen(writer._readyPromise, () => {
              return newPromise((resolveRead, rejectRead) => {
                ReadableStreamDefaultReaderRead(reader, {
                  _chunkSteps: (chunk) => {
                    currentWrite = PerformPromiseThen(WritableStreamDefaultWriterWrite(writer, chunk), void 0, noop2);
                    resolveRead(false);
                  },
                  _closeSteps: () => resolveRead(true),
                  _errorSteps: rejectRead
                });
              });
            });
          }
          isOrBecomesErrored(source, reader._closedPromise, (storedError) => {
            if (!preventAbort) {
              shutdownWithAction(() => WritableStreamAbort(dest, storedError), true, storedError);
            } else {
              shutdown(true, storedError);
            }
            return null;
          });
          isOrBecomesErrored(dest, writer._closedPromise, (storedError) => {
            if (!preventCancel) {
              shutdownWithAction(() => ReadableStreamCancel(source, storedError), true, storedError);
            } else {
              shutdown(true, storedError);
            }
            return null;
          });
          isOrBecomesClosed(source, reader._closedPromise, () => {
            if (!preventClose) {
              shutdownWithAction(() => WritableStreamDefaultWriterCloseWithErrorPropagation(writer));
            } else {
              shutdown();
            }
            return null;
          });
          if (WritableStreamCloseQueuedOrInFlight(dest) || dest._state === "closed") {
            const destClosed = new TypeError("the destination writable stream closed before all data could be piped to it");
            if (!preventCancel) {
              shutdownWithAction(() => ReadableStreamCancel(source, destClosed), true, destClosed);
            } else {
              shutdown(true, destClosed);
            }
          }
          setPromiseIsHandledToTrue(pipeLoop());
          function waitForWritesToFinish() {
            const oldCurrentWrite = currentWrite;
            return PerformPromiseThen(currentWrite, () => oldCurrentWrite !== currentWrite ? waitForWritesToFinish() : void 0);
          }
          function isOrBecomesErrored(stream, promise, action) {
            if (stream._state === "errored") {
              action(stream._storedError);
            } else {
              uponRejection(promise, action);
            }
          }
          function isOrBecomesClosed(stream, promise, action) {
            if (stream._state === "closed") {
              action();
            } else {
              uponFulfillment(promise, action);
            }
          }
          function shutdownWithAction(action, originalIsError, originalError) {
            if (shuttingDown) {
              return;
            }
            shuttingDown = true;
            if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
              uponFulfillment(waitForWritesToFinish(), doTheRest);
            } else {
              doTheRest();
            }
            function doTheRest() {
              uponPromise(action(), () => finalize(originalIsError, originalError), (newError) => finalize(true, newError));
              return null;
            }
          }
          function shutdown(isError, error) {
            if (shuttingDown) {
              return;
            }
            shuttingDown = true;
            if (dest._state === "writable" && !WritableStreamCloseQueuedOrInFlight(dest)) {
              uponFulfillment(waitForWritesToFinish(), () => finalize(isError, error));
            } else {
              finalize(isError, error);
            }
          }
          function finalize(isError, error) {
            WritableStreamDefaultWriterRelease(writer);
            ReadableStreamReaderGenericRelease(reader);
            if (signal !== void 0) {
              signal.removeEventListener("abort", abortAlgorithm);
            }
            if (isError) {
              reject(error);
            } else {
              resolve(void 0);
            }
            return null;
          }
        });
      }
      class ReadableStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        /**
         * Returns the desired size to fill the controlled stream's internal queue. It can be negative, if the queue is
         * over-full. An underlying source ought to use this information to determine when and how to apply backpressure.
         */
        get desiredSize() {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("desiredSize");
          }
          return ReadableStreamDefaultControllerGetDesiredSize(this);
        }
        /**
         * Closes the controlled readable stream. Consumers will still be able to read any previously-enqueued chunks from
         * the stream, but once those are read, the stream will become closed.
         */
        close() {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("close");
          }
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
            throw new TypeError("The stream is not in a state that permits close");
          }
          ReadableStreamDefaultControllerClose(this);
        }
        enqueue(chunk = void 0) {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("enqueue");
          }
          if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(this)) {
            throw new TypeError("The stream is not in a state that permits enqueue");
          }
          return ReadableStreamDefaultControllerEnqueue(this, chunk);
        }
        /**
         * Errors the controlled readable stream, making all future interactions with it fail with the given error `e`.
         */
        error(e11 = void 0) {
          if (!IsReadableStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException$1("error");
          }
          ReadableStreamDefaultControllerError(this, e11);
        }
        /** @internal */
        [CancelSteps](reason) {
          ResetQueue(this);
          const result = this._cancelAlgorithm(reason);
          ReadableStreamDefaultControllerClearAlgorithms(this);
          return result;
        }
        /** @internal */
        [PullSteps](readRequest) {
          const stream = this._controlledReadableStream;
          if (this._queue.length > 0) {
            const chunk = DequeueValue(this);
            if (this._closeRequested && this._queue.length === 0) {
              ReadableStreamDefaultControllerClearAlgorithms(this);
              ReadableStreamClose(stream);
            } else {
              ReadableStreamDefaultControllerCallPullIfNeeded(this);
            }
            readRequest._chunkSteps(chunk);
          } else {
            ReadableStreamAddReadRequest(stream, readRequest);
            ReadableStreamDefaultControllerCallPullIfNeeded(this);
          }
        }
        /** @internal */
        [ReleaseSteps]() {
        }
      }
      Object.defineProperties(ReadableStreamDefaultController.prototype, {
        close: { enumerable: true },
        enqueue: { enumerable: true },
        error: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      setFunctionName(ReadableStreamDefaultController.prototype.close, "close");
      setFunctionName(ReadableStreamDefaultController.prototype.enqueue, "enqueue");
      setFunctionName(ReadableStreamDefaultController.prototype.error, "error");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(ReadableStreamDefaultController.prototype, Symbol.toStringTag, {
          value: "ReadableStreamDefaultController",
          configurable: true
        });
      }
      function IsReadableStreamDefaultController(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_controlledReadableStream")) {
          return false;
        }
        return x3 instanceof ReadableStreamDefaultController;
      }
      function ReadableStreamDefaultControllerCallPullIfNeeded(controller) {
        const shouldPull = ReadableStreamDefaultControllerShouldCallPull(controller);
        if (!shouldPull) {
          return;
        }
        if (controller._pulling) {
          controller._pullAgain = true;
          return;
        }
        controller._pulling = true;
        const pullPromise = controller._pullAlgorithm();
        uponPromise(pullPromise, () => {
          controller._pulling = false;
          if (controller._pullAgain) {
            controller._pullAgain = false;
            ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          }
          return null;
        }, (e11) => {
          ReadableStreamDefaultControllerError(controller, e11);
          return null;
        });
      }
      function ReadableStreamDefaultControllerShouldCallPull(controller) {
        const stream = controller._controlledReadableStream;
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return false;
        }
        if (!controller._started) {
          return false;
        }
        if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          return true;
        }
        const desiredSize = ReadableStreamDefaultControllerGetDesiredSize(controller);
        if (desiredSize > 0) {
          return true;
        }
        return false;
      }
      function ReadableStreamDefaultControllerClearAlgorithms(controller) {
        controller._pullAlgorithm = void 0;
        controller._cancelAlgorithm = void 0;
        controller._strategySizeAlgorithm = void 0;
      }
      function ReadableStreamDefaultControllerClose(controller) {
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return;
        }
        const stream = controller._controlledReadableStream;
        controller._closeRequested = true;
        if (controller._queue.length === 0) {
          ReadableStreamDefaultControllerClearAlgorithms(controller);
          ReadableStreamClose(stream);
        }
      }
      function ReadableStreamDefaultControllerEnqueue(controller, chunk) {
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(controller)) {
          return;
        }
        const stream = controller._controlledReadableStream;
        if (IsReadableStreamLocked(stream) && ReadableStreamGetNumReadRequests(stream) > 0) {
          ReadableStreamFulfillReadRequest(stream, chunk, false);
        } else {
          let chunkSize;
          try {
            chunkSize = controller._strategySizeAlgorithm(chunk);
          } catch (chunkSizeE) {
            ReadableStreamDefaultControllerError(controller, chunkSizeE);
            throw chunkSizeE;
          }
          try {
            EnqueueValueWithSize(controller, chunk, chunkSize);
          } catch (enqueueE) {
            ReadableStreamDefaultControllerError(controller, enqueueE);
            throw enqueueE;
          }
        }
        ReadableStreamDefaultControllerCallPullIfNeeded(controller);
      }
      function ReadableStreamDefaultControllerError(controller, e11) {
        const stream = controller._controlledReadableStream;
        if (stream._state !== "readable") {
          return;
        }
        ResetQueue(controller);
        ReadableStreamDefaultControllerClearAlgorithms(controller);
        ReadableStreamError(stream, e11);
      }
      function ReadableStreamDefaultControllerGetDesiredSize(controller) {
        const state = controller._controlledReadableStream._state;
        if (state === "errored") {
          return null;
        }
        if (state === "closed") {
          return 0;
        }
        return controller._strategyHWM - controller._queueTotalSize;
      }
      function ReadableStreamDefaultControllerHasBackpressure(controller) {
        if (ReadableStreamDefaultControllerShouldCallPull(controller)) {
          return false;
        }
        return true;
      }
      function ReadableStreamDefaultControllerCanCloseOrEnqueue(controller) {
        const state = controller._controlledReadableStream._state;
        if (!controller._closeRequested && state === "readable") {
          return true;
        }
        return false;
      }
      function SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm) {
        controller._controlledReadableStream = stream;
        controller._queue = void 0;
        controller._queueTotalSize = void 0;
        ResetQueue(controller);
        controller._started = false;
        controller._closeRequested = false;
        controller._pullAgain = false;
        controller._pulling = false;
        controller._strategySizeAlgorithm = sizeAlgorithm;
        controller._strategyHWM = highWaterMark;
        controller._pullAlgorithm = pullAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        stream._readableStreamController = controller;
        const startResult = startAlgorithm();
        uponPromise(promiseResolvedWith(startResult), () => {
          controller._started = true;
          ReadableStreamDefaultControllerCallPullIfNeeded(controller);
          return null;
        }, (r10) => {
          ReadableStreamDefaultControllerError(controller, r10);
          return null;
        });
      }
      function SetUpReadableStreamDefaultControllerFromUnderlyingSource(stream, underlyingSource, highWaterMark, sizeAlgorithm) {
        const controller = Object.create(ReadableStreamDefaultController.prototype);
        let startAlgorithm;
        let pullAlgorithm;
        let cancelAlgorithm;
        if (underlyingSource.start !== void 0) {
          startAlgorithm = () => underlyingSource.start(controller);
        } else {
          startAlgorithm = () => void 0;
        }
        if (underlyingSource.pull !== void 0) {
          pullAlgorithm = () => underlyingSource.pull(controller);
        } else {
          pullAlgorithm = () => promiseResolvedWith(void 0);
        }
        if (underlyingSource.cancel !== void 0) {
          cancelAlgorithm = (reason) => underlyingSource.cancel(reason);
        } else {
          cancelAlgorithm = () => promiseResolvedWith(void 0);
        }
        SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
      }
      function defaultControllerBrandCheckException$1(name) {
        return new TypeError(`ReadableStreamDefaultController.prototype.${name} can only be used on a ReadableStreamDefaultController`);
      }
      function ReadableStreamTee(stream, cloneForBranch2) {
        if (IsReadableByteStreamController(stream._readableStreamController)) {
          return ReadableByteStreamTee(stream);
        }
        return ReadableStreamDefaultTee(stream);
      }
      function ReadableStreamDefaultTee(stream, cloneForBranch2) {
        const reader = AcquireReadableStreamDefaultReader(stream);
        let reading = false;
        let readAgain = false;
        let canceled1 = false;
        let canceled2 = false;
        let reason1;
        let reason2;
        let branch1;
        let branch2;
        let resolveCancelPromise;
        const cancelPromise = newPromise((resolve) => {
          resolveCancelPromise = resolve;
        });
        function pullAlgorithm() {
          if (reading) {
            readAgain = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const readRequest = {
            _chunkSteps: (chunk) => {
              _queueMicrotask(() => {
                readAgain = false;
                const chunk1 = chunk;
                const chunk2 = chunk;
                if (!canceled1) {
                  ReadableStreamDefaultControllerEnqueue(branch1._readableStreamController, chunk1);
                }
                if (!canceled2) {
                  ReadableStreamDefaultControllerEnqueue(branch2._readableStreamController, chunk2);
                }
                reading = false;
                if (readAgain) {
                  pullAlgorithm();
                }
              });
            },
            _closeSteps: () => {
              reading = false;
              if (!canceled1) {
                ReadableStreamDefaultControllerClose(branch1._readableStreamController);
              }
              if (!canceled2) {
                ReadableStreamDefaultControllerClose(branch2._readableStreamController);
              }
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
          return promiseResolvedWith(void 0);
        }
        function cancel1Algorithm(reason) {
          canceled1 = true;
          reason1 = reason;
          if (canceled2) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function cancel2Algorithm(reason) {
          canceled2 = true;
          reason2 = reason;
          if (canceled1) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function startAlgorithm() {
        }
        branch1 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel1Algorithm);
        branch2 = CreateReadableStream(startAlgorithm, pullAlgorithm, cancel2Algorithm);
        uponRejection(reader._closedPromise, (r10) => {
          ReadableStreamDefaultControllerError(branch1._readableStreamController, r10);
          ReadableStreamDefaultControllerError(branch2._readableStreamController, r10);
          if (!canceled1 || !canceled2) {
            resolveCancelPromise(void 0);
          }
          return null;
        });
        return [branch1, branch2];
      }
      function ReadableByteStreamTee(stream) {
        let reader = AcquireReadableStreamDefaultReader(stream);
        let reading = false;
        let readAgainForBranch1 = false;
        let readAgainForBranch2 = false;
        let canceled1 = false;
        let canceled2 = false;
        let reason1;
        let reason2;
        let branch1;
        let branch2;
        let resolveCancelPromise;
        const cancelPromise = newPromise((resolve) => {
          resolveCancelPromise = resolve;
        });
        function forwardReaderError(thisReader) {
          uponRejection(thisReader._closedPromise, (r10) => {
            if (thisReader !== reader) {
              return null;
            }
            ReadableByteStreamControllerError(branch1._readableStreamController, r10);
            ReadableByteStreamControllerError(branch2._readableStreamController, r10);
            if (!canceled1 || !canceled2) {
              resolveCancelPromise(void 0);
            }
            return null;
          });
        }
        function pullWithDefaultReader() {
          if (IsReadableStreamBYOBReader(reader)) {
            ReadableStreamReaderGenericRelease(reader);
            reader = AcquireReadableStreamDefaultReader(stream);
            forwardReaderError(reader);
          }
          const readRequest = {
            _chunkSteps: (chunk) => {
              _queueMicrotask(() => {
                readAgainForBranch1 = false;
                readAgainForBranch2 = false;
                const chunk1 = chunk;
                let chunk2 = chunk;
                if (!canceled1 && !canceled2) {
                  try {
                    chunk2 = CloneAsUint8Array(chunk);
                  } catch (cloneE) {
                    ReadableByteStreamControllerError(branch1._readableStreamController, cloneE);
                    ReadableByteStreamControllerError(branch2._readableStreamController, cloneE);
                    resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                    return;
                  }
                }
                if (!canceled1) {
                  ReadableByteStreamControllerEnqueue(branch1._readableStreamController, chunk1);
                }
                if (!canceled2) {
                  ReadableByteStreamControllerEnqueue(branch2._readableStreamController, chunk2);
                }
                reading = false;
                if (readAgainForBranch1) {
                  pull1Algorithm();
                } else if (readAgainForBranch2) {
                  pull2Algorithm();
                }
              });
            },
            _closeSteps: () => {
              reading = false;
              if (!canceled1) {
                ReadableByteStreamControllerClose(branch1._readableStreamController);
              }
              if (!canceled2) {
                ReadableByteStreamControllerClose(branch2._readableStreamController);
              }
              if (branch1._readableStreamController._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerRespond(branch1._readableStreamController, 0);
              }
              if (branch2._readableStreamController._pendingPullIntos.length > 0) {
                ReadableByteStreamControllerRespond(branch2._readableStreamController, 0);
              }
              if (!canceled1 || !canceled2) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamDefaultReaderRead(reader, readRequest);
        }
        function pullWithBYOBReader(view, forBranch2) {
          if (IsReadableStreamDefaultReader(reader)) {
            ReadableStreamReaderGenericRelease(reader);
            reader = AcquireReadableStreamBYOBReader(stream);
            forwardReaderError(reader);
          }
          const byobBranch = forBranch2 ? branch2 : branch1;
          const otherBranch = forBranch2 ? branch1 : branch2;
          const readIntoRequest = {
            _chunkSteps: (chunk) => {
              _queueMicrotask(() => {
                readAgainForBranch1 = false;
                readAgainForBranch2 = false;
                const byobCanceled = forBranch2 ? canceled2 : canceled1;
                const otherCanceled = forBranch2 ? canceled1 : canceled2;
                if (!otherCanceled) {
                  let clonedChunk;
                  try {
                    clonedChunk = CloneAsUint8Array(chunk);
                  } catch (cloneE) {
                    ReadableByteStreamControllerError(byobBranch._readableStreamController, cloneE);
                    ReadableByteStreamControllerError(otherBranch._readableStreamController, cloneE);
                    resolveCancelPromise(ReadableStreamCancel(stream, cloneE));
                    return;
                  }
                  if (!byobCanceled) {
                    ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                  }
                  ReadableByteStreamControllerEnqueue(otherBranch._readableStreamController, clonedChunk);
                } else if (!byobCanceled) {
                  ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                }
                reading = false;
                if (readAgainForBranch1) {
                  pull1Algorithm();
                } else if (readAgainForBranch2) {
                  pull2Algorithm();
                }
              });
            },
            _closeSteps: (chunk) => {
              reading = false;
              const byobCanceled = forBranch2 ? canceled2 : canceled1;
              const otherCanceled = forBranch2 ? canceled1 : canceled2;
              if (!byobCanceled) {
                ReadableByteStreamControllerClose(byobBranch._readableStreamController);
              }
              if (!otherCanceled) {
                ReadableByteStreamControllerClose(otherBranch._readableStreamController);
              }
              if (chunk !== void 0) {
                if (!byobCanceled) {
                  ReadableByteStreamControllerRespondWithNewView(byobBranch._readableStreamController, chunk);
                }
                if (!otherCanceled && otherBranch._readableStreamController._pendingPullIntos.length > 0) {
                  ReadableByteStreamControllerRespond(otherBranch._readableStreamController, 0);
                }
              }
              if (!byobCanceled || !otherCanceled) {
                resolveCancelPromise(void 0);
              }
            },
            _errorSteps: () => {
              reading = false;
            }
          };
          ReadableStreamBYOBReaderRead(reader, view, 1, readIntoRequest);
        }
        function pull1Algorithm() {
          if (reading) {
            readAgainForBranch1 = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch1._readableStreamController);
          if (byobRequest === null) {
            pullWithDefaultReader();
          } else {
            pullWithBYOBReader(byobRequest._view, false);
          }
          return promiseResolvedWith(void 0);
        }
        function pull2Algorithm() {
          if (reading) {
            readAgainForBranch2 = true;
            return promiseResolvedWith(void 0);
          }
          reading = true;
          const byobRequest = ReadableByteStreamControllerGetBYOBRequest(branch2._readableStreamController);
          if (byobRequest === null) {
            pullWithDefaultReader();
          } else {
            pullWithBYOBReader(byobRequest._view, true);
          }
          return promiseResolvedWith(void 0);
        }
        function cancel1Algorithm(reason) {
          canceled1 = true;
          reason1 = reason;
          if (canceled2) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function cancel2Algorithm(reason) {
          canceled2 = true;
          reason2 = reason;
          if (canceled1) {
            const compositeReason = CreateArrayFromList([reason1, reason2]);
            const cancelResult = ReadableStreamCancel(stream, compositeReason);
            resolveCancelPromise(cancelResult);
          }
          return cancelPromise;
        }
        function startAlgorithm() {
          return;
        }
        branch1 = CreateReadableByteStream(startAlgorithm, pull1Algorithm, cancel1Algorithm);
        branch2 = CreateReadableByteStream(startAlgorithm, pull2Algorithm, cancel2Algorithm);
        forwardReaderError(reader);
        return [branch1, branch2];
      }
      function isReadableStreamLike(stream) {
        return typeIsObject(stream) && typeof stream.getReader !== "undefined";
      }
      function ReadableStreamFrom(source) {
        if (isReadableStreamLike(source)) {
          return ReadableStreamFromDefaultReader(source.getReader());
        }
        return ReadableStreamFromIterable(source);
      }
      function ReadableStreamFromIterable(asyncIterable) {
        let stream;
        const iteratorRecord = GetIterator(asyncIterable, "async");
        const startAlgorithm = noop2;
        function pullAlgorithm() {
          let nextResult;
          try {
            nextResult = IteratorNext(iteratorRecord);
          } catch (e11) {
            return promiseRejectedWith(e11);
          }
          const nextPromise = promiseResolvedWith(nextResult);
          return transformPromiseWith(nextPromise, (iterResult) => {
            if (!typeIsObject(iterResult)) {
              throw new TypeError("The promise returned by the iterator.next() method must fulfill with an object");
            }
            const done = IteratorComplete(iterResult);
            if (done) {
              ReadableStreamDefaultControllerClose(stream._readableStreamController);
            } else {
              const value = IteratorValue(iterResult);
              ReadableStreamDefaultControllerEnqueue(stream._readableStreamController, value);
            }
          });
        }
        function cancelAlgorithm(reason) {
          const iterator = iteratorRecord.iterator;
          let returnMethod;
          try {
            returnMethod = GetMethod(iterator, "return");
          } catch (e11) {
            return promiseRejectedWith(e11);
          }
          if (returnMethod === void 0) {
            return promiseResolvedWith(void 0);
          }
          let returnResult;
          try {
            returnResult = reflectCall(returnMethod, iterator, [reason]);
          } catch (e11) {
            return promiseRejectedWith(e11);
          }
          const returnPromise = promiseResolvedWith(returnResult);
          return transformPromiseWith(returnPromise, (iterResult) => {
            if (!typeIsObject(iterResult)) {
              throw new TypeError("The promise returned by the iterator.return() method must fulfill with an object");
            }
            return void 0;
          });
        }
        stream = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, 0);
        return stream;
      }
      function ReadableStreamFromDefaultReader(reader) {
        let stream;
        const startAlgorithm = noop2;
        function pullAlgorithm() {
          let readPromise;
          try {
            readPromise = reader.read();
          } catch (e11) {
            return promiseRejectedWith(e11);
          }
          return transformPromiseWith(readPromise, (readResult) => {
            if (!typeIsObject(readResult)) {
              throw new TypeError("The promise returned by the reader.read() method must fulfill with an object");
            }
            if (readResult.done) {
              ReadableStreamDefaultControllerClose(stream._readableStreamController);
            } else {
              const value = readResult.value;
              ReadableStreamDefaultControllerEnqueue(stream._readableStreamController, value);
            }
          });
        }
        function cancelAlgorithm(reason) {
          try {
            return promiseResolvedWith(reader.cancel(reason));
          } catch (e11) {
            return promiseRejectedWith(e11);
          }
        }
        stream = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, 0);
        return stream;
      }
      function convertUnderlyingDefaultOrByteSource(source, context) {
        assertDictionary(source, context);
        const original = source;
        const autoAllocateChunkSize = original === null || original === void 0 ? void 0 : original.autoAllocateChunkSize;
        const cancel = original === null || original === void 0 ? void 0 : original.cancel;
        const pull = original === null || original === void 0 ? void 0 : original.pull;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const type = original === null || original === void 0 ? void 0 : original.type;
        return {
          autoAllocateChunkSize: autoAllocateChunkSize === void 0 ? void 0 : convertUnsignedLongLongWithEnforceRange(autoAllocateChunkSize, `${context} has member 'autoAllocateChunkSize' that`),
          cancel: cancel === void 0 ? void 0 : convertUnderlyingSourceCancelCallback(cancel, original, `${context} has member 'cancel' that`),
          pull: pull === void 0 ? void 0 : convertUnderlyingSourcePullCallback(pull, original, `${context} has member 'pull' that`),
          start: start === void 0 ? void 0 : convertUnderlyingSourceStartCallback(start, original, `${context} has member 'start' that`),
          type: type === void 0 ? void 0 : convertReadableStreamType(type, `${context} has member 'type' that`)
        };
      }
      function convertUnderlyingSourceCancelCallback(fn, original, context) {
        assertFunction(fn, context);
        return (reason) => promiseCall(fn, original, [reason]);
      }
      function convertUnderlyingSourcePullCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => promiseCall(fn, original, [controller]);
      }
      function convertUnderlyingSourceStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertReadableStreamType(type, context) {
        type = `${type}`;
        if (type !== "bytes") {
          throw new TypeError(`${context} '${type}' is not a valid enumeration value for ReadableStreamType`);
        }
        return type;
      }
      function convertIteratorOptions(options, context) {
        assertDictionary(options, context);
        const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
        return { preventCancel: Boolean(preventCancel) };
      }
      function convertPipeOptions(options, context) {
        assertDictionary(options, context);
        const preventAbort = options === null || options === void 0 ? void 0 : options.preventAbort;
        const preventCancel = options === null || options === void 0 ? void 0 : options.preventCancel;
        const preventClose = options === null || options === void 0 ? void 0 : options.preventClose;
        const signal = options === null || options === void 0 ? void 0 : options.signal;
        if (signal !== void 0) {
          assertAbortSignal(signal, `${context} has member 'signal' that`);
        }
        return {
          preventAbort: Boolean(preventAbort),
          preventCancel: Boolean(preventCancel),
          preventClose: Boolean(preventClose),
          signal
        };
      }
      function assertAbortSignal(signal, context) {
        if (!isAbortSignal2(signal)) {
          throw new TypeError(`${context} is not an AbortSignal.`);
        }
      }
      function convertReadableWritablePair(pair, context) {
        assertDictionary(pair, context);
        const readable = pair === null || pair === void 0 ? void 0 : pair.readable;
        assertRequiredField(readable, "readable", "ReadableWritablePair");
        assertReadableStream(readable, `${context} has member 'readable' that`);
        const writable = pair === null || pair === void 0 ? void 0 : pair.writable;
        assertRequiredField(writable, "writable", "ReadableWritablePair");
        assertWritableStream(writable, `${context} has member 'writable' that`);
        return { readable, writable };
      }
      class ReadableStream2 {
        constructor(rawUnderlyingSource = {}, rawStrategy = {}) {
          if (rawUnderlyingSource === void 0) {
            rawUnderlyingSource = null;
          } else {
            assertObject(rawUnderlyingSource, "First parameter");
          }
          const strategy = convertQueuingStrategy(rawStrategy, "Second parameter");
          const underlyingSource = convertUnderlyingDefaultOrByteSource(rawUnderlyingSource, "First parameter");
          InitializeReadableStream(this);
          if (underlyingSource.type === "bytes") {
            if (strategy.size !== void 0) {
              throw new RangeError("The strategy for a byte stream cannot have a size function");
            }
            const highWaterMark = ExtractHighWaterMark(strategy, 0);
            SetUpReadableByteStreamControllerFromUnderlyingSource(this, underlyingSource, highWaterMark);
          } else {
            const sizeAlgorithm = ExtractSizeAlgorithm(strategy);
            const highWaterMark = ExtractHighWaterMark(strategy, 1);
            SetUpReadableStreamDefaultControllerFromUnderlyingSource(this, underlyingSource, highWaterMark, sizeAlgorithm);
          }
        }
        /**
         * Whether or not the readable stream is locked to a {@link ReadableStreamDefaultReader | reader}.
         */
        get locked() {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("locked");
          }
          return IsReadableStreamLocked(this);
        }
        /**
         * Cancels the stream, signaling a loss of interest in the stream by a consumer.
         *
         * The supplied `reason` argument will be given to the underlying source's {@link UnderlyingSource.cancel | cancel()}
         * method, which might or might not use it.
         */
        cancel(reason = void 0) {
          if (!IsReadableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$1("cancel"));
          }
          if (IsReadableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("Cannot cancel a stream that already has a reader"));
          }
          return ReadableStreamCancel(this, reason);
        }
        getReader(rawOptions = void 0) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("getReader");
          }
          const options = convertReaderOptions(rawOptions, "First parameter");
          if (options.mode === void 0) {
            return AcquireReadableStreamDefaultReader(this);
          }
          return AcquireReadableStreamBYOBReader(this);
        }
        pipeThrough(rawTransform, rawOptions = {}) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("pipeThrough");
          }
          assertRequiredArgument(rawTransform, 1, "pipeThrough");
          const transform = convertReadableWritablePair(rawTransform, "First parameter");
          const options = convertPipeOptions(rawOptions, "Second parameter");
          if (IsReadableStreamLocked(this)) {
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");
          }
          if (IsWritableStreamLocked(transform.writable)) {
            throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");
          }
          const promise = ReadableStreamPipeTo(this, transform.writable, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
          setPromiseIsHandledToTrue(promise);
          return transform.readable;
        }
        pipeTo(destination, rawOptions = {}) {
          if (!IsReadableStream(this)) {
            return promiseRejectedWith(streamBrandCheckException$1("pipeTo"));
          }
          if (destination === void 0) {
            return promiseRejectedWith(`Parameter 1 is required in 'pipeTo'.`);
          }
          if (!IsWritableStream(destination)) {
            return promiseRejectedWith(new TypeError(`ReadableStream.prototype.pipeTo's first argument must be a WritableStream`));
          }
          let options;
          try {
            options = convertPipeOptions(rawOptions, "Second parameter");
          } catch (e11) {
            return promiseRejectedWith(e11);
          }
          if (IsReadableStreamLocked(this)) {
            return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream"));
          }
          if (IsWritableStreamLocked(destination)) {
            return promiseRejectedWith(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream"));
          }
          return ReadableStreamPipeTo(this, destination, options.preventClose, options.preventAbort, options.preventCancel, options.signal);
        }
        /**
         * Tees this readable stream, returning a two-element array containing the two resulting branches as
         * new {@link ReadableStream} instances.
         *
         * Teeing a stream will lock it, preventing any other consumer from acquiring a reader.
         * To cancel the stream, cancel both of the resulting branches; a composite cancellation reason will then be
         * propagated to the stream's underlying source.
         *
         * Note that the chunks seen in each branch will be the same object. If the chunks are not immutable,
         * this could allow interference between the two branches.
         */
        tee() {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("tee");
          }
          const branches = ReadableStreamTee(this);
          return CreateArrayFromList(branches);
        }
        values(rawOptions = void 0) {
          if (!IsReadableStream(this)) {
            throw streamBrandCheckException$1("values");
          }
          const options = convertIteratorOptions(rawOptions, "First parameter");
          return AcquireReadableStreamAsyncIterator(this, options.preventCancel);
        }
        [SymbolAsyncIterator](options) {
          return this.values(options);
        }
        /**
         * Creates a new ReadableStream wrapping the provided iterable or async iterable.
         *
         * This can be used to adapt various kinds of objects into a readable stream,
         * such as an array, an async generator, or a Node.js readable stream.
         */
        static from(asyncIterable) {
          return ReadableStreamFrom(asyncIterable);
        }
      }
      Object.defineProperties(ReadableStream2, {
        from: { enumerable: true }
      });
      Object.defineProperties(ReadableStream2.prototype, {
        cancel: { enumerable: true },
        getReader: { enumerable: true },
        pipeThrough: { enumerable: true },
        pipeTo: { enumerable: true },
        tee: { enumerable: true },
        values: { enumerable: true },
        locked: { enumerable: true }
      });
      setFunctionName(ReadableStream2.from, "from");
      setFunctionName(ReadableStream2.prototype.cancel, "cancel");
      setFunctionName(ReadableStream2.prototype.getReader, "getReader");
      setFunctionName(ReadableStream2.prototype.pipeThrough, "pipeThrough");
      setFunctionName(ReadableStream2.prototype.pipeTo, "pipeTo");
      setFunctionName(ReadableStream2.prototype.tee, "tee");
      setFunctionName(ReadableStream2.prototype.values, "values");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(ReadableStream2.prototype, Symbol.toStringTag, {
          value: "ReadableStream",
          configurable: true
        });
      }
      Object.defineProperty(ReadableStream2.prototype, SymbolAsyncIterator, {
        value: ReadableStream2.prototype.values,
        writable: true,
        configurable: true
      });
      function CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark = 1, sizeAlgorithm = () => 1) {
        const stream = Object.create(ReadableStream2.prototype);
        InitializeReadableStream(stream);
        const controller = Object.create(ReadableStreamDefaultController.prototype);
        SetUpReadableStreamDefaultController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, highWaterMark, sizeAlgorithm);
        return stream;
      }
      function CreateReadableByteStream(startAlgorithm, pullAlgorithm, cancelAlgorithm) {
        const stream = Object.create(ReadableStream2.prototype);
        InitializeReadableStream(stream);
        const controller = Object.create(ReadableByteStreamController.prototype);
        SetUpReadableByteStreamController(stream, controller, startAlgorithm, pullAlgorithm, cancelAlgorithm, 0, void 0);
        return stream;
      }
      function InitializeReadableStream(stream) {
        stream._state = "readable";
        stream._reader = void 0;
        stream._storedError = void 0;
        stream._disturbed = false;
      }
      function IsReadableStream(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_readableStreamController")) {
          return false;
        }
        return x3 instanceof ReadableStream2;
      }
      function IsReadableStreamLocked(stream) {
        if (stream._reader === void 0) {
          return false;
        }
        return true;
      }
      function ReadableStreamCancel(stream, reason) {
        stream._disturbed = true;
        if (stream._state === "closed") {
          return promiseResolvedWith(void 0);
        }
        if (stream._state === "errored") {
          return promiseRejectedWith(stream._storedError);
        }
        ReadableStreamClose(stream);
        const reader = stream._reader;
        if (reader !== void 0 && IsReadableStreamBYOBReader(reader)) {
          const readIntoRequests = reader._readIntoRequests;
          reader._readIntoRequests = new SimpleQueue();
          readIntoRequests.forEach((readIntoRequest) => {
            readIntoRequest._closeSteps(void 0);
          });
        }
        const sourceCancelPromise = stream._readableStreamController[CancelSteps](reason);
        return transformPromiseWith(sourceCancelPromise, noop2);
      }
      function ReadableStreamClose(stream) {
        stream._state = "closed";
        const reader = stream._reader;
        if (reader === void 0) {
          return;
        }
        defaultReaderClosedPromiseResolve(reader);
        if (IsReadableStreamDefaultReader(reader)) {
          const readRequests = reader._readRequests;
          reader._readRequests = new SimpleQueue();
          readRequests.forEach((readRequest) => {
            readRequest._closeSteps();
          });
        }
      }
      function ReadableStreamError(stream, e11) {
        stream._state = "errored";
        stream._storedError = e11;
        const reader = stream._reader;
        if (reader === void 0) {
          return;
        }
        defaultReaderClosedPromiseReject(reader, e11);
        if (IsReadableStreamDefaultReader(reader)) {
          ReadableStreamDefaultReaderErrorReadRequests(reader, e11);
        } else {
          ReadableStreamBYOBReaderErrorReadIntoRequests(reader, e11);
        }
      }
      function streamBrandCheckException$1(name) {
        return new TypeError(`ReadableStream.prototype.${name} can only be used on a ReadableStream`);
      }
      function convertQueuingStrategyInit(init, context) {
        assertDictionary(init, context);
        const highWaterMark = init === null || init === void 0 ? void 0 : init.highWaterMark;
        assertRequiredField(highWaterMark, "highWaterMark", "QueuingStrategyInit");
        return {
          highWaterMark: convertUnrestrictedDouble(highWaterMark)
        };
      }
      const byteLengthSizeFunction = (chunk) => {
        return chunk.byteLength;
      };
      setFunctionName(byteLengthSizeFunction, "size");
      class ByteLengthQueuingStrategy {
        constructor(options) {
          assertRequiredArgument(options, 1, "ByteLengthQueuingStrategy");
          options = convertQueuingStrategyInit(options, "First parameter");
          this._byteLengthQueuingStrategyHighWaterMark = options.highWaterMark;
        }
        /**
         * Returns the high water mark provided to the constructor.
         */
        get highWaterMark() {
          if (!IsByteLengthQueuingStrategy(this)) {
            throw byteLengthBrandCheckException("highWaterMark");
          }
          return this._byteLengthQueuingStrategyHighWaterMark;
        }
        /**
         * Measures the size of `chunk` by returning the value of its `byteLength` property.
         */
        get size() {
          if (!IsByteLengthQueuingStrategy(this)) {
            throw byteLengthBrandCheckException("size");
          }
          return byteLengthSizeFunction;
        }
      }
      Object.defineProperties(ByteLengthQueuingStrategy.prototype, {
        highWaterMark: { enumerable: true },
        size: { enumerable: true }
      });
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(ByteLengthQueuingStrategy.prototype, Symbol.toStringTag, {
          value: "ByteLengthQueuingStrategy",
          configurable: true
        });
      }
      function byteLengthBrandCheckException(name) {
        return new TypeError(`ByteLengthQueuingStrategy.prototype.${name} can only be used on a ByteLengthQueuingStrategy`);
      }
      function IsByteLengthQueuingStrategy(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_byteLengthQueuingStrategyHighWaterMark")) {
          return false;
        }
        return x3 instanceof ByteLengthQueuingStrategy;
      }
      const countSizeFunction = () => {
        return 1;
      };
      setFunctionName(countSizeFunction, "size");
      class CountQueuingStrategy {
        constructor(options) {
          assertRequiredArgument(options, 1, "CountQueuingStrategy");
          options = convertQueuingStrategyInit(options, "First parameter");
          this._countQueuingStrategyHighWaterMark = options.highWaterMark;
        }
        /**
         * Returns the high water mark provided to the constructor.
         */
        get highWaterMark() {
          if (!IsCountQueuingStrategy(this)) {
            throw countBrandCheckException("highWaterMark");
          }
          return this._countQueuingStrategyHighWaterMark;
        }
        /**
         * Measures the size of `chunk` by always returning 1.
         * This ensures that the total queue size is a count of the number of chunks in the queue.
         */
        get size() {
          if (!IsCountQueuingStrategy(this)) {
            throw countBrandCheckException("size");
          }
          return countSizeFunction;
        }
      }
      Object.defineProperties(CountQueuingStrategy.prototype, {
        highWaterMark: { enumerable: true },
        size: { enumerable: true }
      });
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(CountQueuingStrategy.prototype, Symbol.toStringTag, {
          value: "CountQueuingStrategy",
          configurable: true
        });
      }
      function countBrandCheckException(name) {
        return new TypeError(`CountQueuingStrategy.prototype.${name} can only be used on a CountQueuingStrategy`);
      }
      function IsCountQueuingStrategy(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_countQueuingStrategyHighWaterMark")) {
          return false;
        }
        return x3 instanceof CountQueuingStrategy;
      }
      function convertTransformer(original, context) {
        assertDictionary(original, context);
        const cancel = original === null || original === void 0 ? void 0 : original.cancel;
        const flush = original === null || original === void 0 ? void 0 : original.flush;
        const readableType = original === null || original === void 0 ? void 0 : original.readableType;
        const start = original === null || original === void 0 ? void 0 : original.start;
        const transform = original === null || original === void 0 ? void 0 : original.transform;
        const writableType = original === null || original === void 0 ? void 0 : original.writableType;
        return {
          cancel: cancel === void 0 ? void 0 : convertTransformerCancelCallback(cancel, original, `${context} has member 'cancel' that`),
          flush: flush === void 0 ? void 0 : convertTransformerFlushCallback(flush, original, `${context} has member 'flush' that`),
          readableType,
          start: start === void 0 ? void 0 : convertTransformerStartCallback(start, original, `${context} has member 'start' that`),
          transform: transform === void 0 ? void 0 : convertTransformerTransformCallback(transform, original, `${context} has member 'transform' that`),
          writableType
        };
      }
      function convertTransformerFlushCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => promiseCall(fn, original, [controller]);
      }
      function convertTransformerStartCallback(fn, original, context) {
        assertFunction(fn, context);
        return (controller) => reflectCall(fn, original, [controller]);
      }
      function convertTransformerTransformCallback(fn, original, context) {
        assertFunction(fn, context);
        return (chunk, controller) => promiseCall(fn, original, [chunk, controller]);
      }
      function convertTransformerCancelCallback(fn, original, context) {
        assertFunction(fn, context);
        return (reason) => promiseCall(fn, original, [reason]);
      }
      class TransformStream {
        constructor(rawTransformer = {}, rawWritableStrategy = {}, rawReadableStrategy = {}) {
          if (rawTransformer === void 0) {
            rawTransformer = null;
          }
          const writableStrategy = convertQueuingStrategy(rawWritableStrategy, "Second parameter");
          const readableStrategy = convertQueuingStrategy(rawReadableStrategy, "Third parameter");
          const transformer = convertTransformer(rawTransformer, "First parameter");
          if (transformer.readableType !== void 0) {
            throw new RangeError("Invalid readableType specified");
          }
          if (transformer.writableType !== void 0) {
            throw new RangeError("Invalid writableType specified");
          }
          const readableHighWaterMark = ExtractHighWaterMark(readableStrategy, 0);
          const readableSizeAlgorithm = ExtractSizeAlgorithm(readableStrategy);
          const writableHighWaterMark = ExtractHighWaterMark(writableStrategy, 1);
          const writableSizeAlgorithm = ExtractSizeAlgorithm(writableStrategy);
          let startPromise_resolve;
          const startPromise = newPromise((resolve) => {
            startPromise_resolve = resolve;
          });
          InitializeTransformStream(this, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
          SetUpTransformStreamDefaultControllerFromTransformer(this, transformer);
          if (transformer.start !== void 0) {
            startPromise_resolve(transformer.start(this._transformStreamController));
          } else {
            startPromise_resolve(void 0);
          }
        }
        /**
         * The readable side of the transform stream.
         */
        get readable() {
          if (!IsTransformStream(this)) {
            throw streamBrandCheckException("readable");
          }
          return this._readable;
        }
        /**
         * The writable side of the transform stream.
         */
        get writable() {
          if (!IsTransformStream(this)) {
            throw streamBrandCheckException("writable");
          }
          return this._writable;
        }
      }
      Object.defineProperties(TransformStream.prototype, {
        readable: { enumerable: true },
        writable: { enumerable: true }
      });
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(TransformStream.prototype, Symbol.toStringTag, {
          value: "TransformStream",
          configurable: true
        });
      }
      function InitializeTransformStream(stream, startPromise, writableHighWaterMark, writableSizeAlgorithm, readableHighWaterMark, readableSizeAlgorithm) {
        function startAlgorithm() {
          return startPromise;
        }
        function writeAlgorithm(chunk) {
          return TransformStreamDefaultSinkWriteAlgorithm(stream, chunk);
        }
        function abortAlgorithm(reason) {
          return TransformStreamDefaultSinkAbortAlgorithm(stream, reason);
        }
        function closeAlgorithm() {
          return TransformStreamDefaultSinkCloseAlgorithm(stream);
        }
        stream._writable = CreateWritableStream(startAlgorithm, writeAlgorithm, closeAlgorithm, abortAlgorithm, writableHighWaterMark, writableSizeAlgorithm);
        function pullAlgorithm() {
          return TransformStreamDefaultSourcePullAlgorithm(stream);
        }
        function cancelAlgorithm(reason) {
          return TransformStreamDefaultSourceCancelAlgorithm(stream, reason);
        }
        stream._readable = CreateReadableStream(startAlgorithm, pullAlgorithm, cancelAlgorithm, readableHighWaterMark, readableSizeAlgorithm);
        stream._backpressure = void 0;
        stream._backpressureChangePromise = void 0;
        stream._backpressureChangePromise_resolve = void 0;
        TransformStreamSetBackpressure(stream, true);
        stream._transformStreamController = void 0;
      }
      function IsTransformStream(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_transformStreamController")) {
          return false;
        }
        return x3 instanceof TransformStream;
      }
      function TransformStreamError(stream, e11) {
        ReadableStreamDefaultControllerError(stream._readable._readableStreamController, e11);
        TransformStreamErrorWritableAndUnblockWrite(stream, e11);
      }
      function TransformStreamErrorWritableAndUnblockWrite(stream, e11) {
        TransformStreamDefaultControllerClearAlgorithms(stream._transformStreamController);
        WritableStreamDefaultControllerErrorIfNeeded(stream._writable._writableStreamController, e11);
        TransformStreamUnblockWrite(stream);
      }
      function TransformStreamUnblockWrite(stream) {
        if (stream._backpressure) {
          TransformStreamSetBackpressure(stream, false);
        }
      }
      function TransformStreamSetBackpressure(stream, backpressure) {
        if (stream._backpressureChangePromise !== void 0) {
          stream._backpressureChangePromise_resolve();
        }
        stream._backpressureChangePromise = newPromise((resolve) => {
          stream._backpressureChangePromise_resolve = resolve;
        });
        stream._backpressure = backpressure;
      }
      class TransformStreamDefaultController {
        constructor() {
          throw new TypeError("Illegal constructor");
        }
        /**
         * Returns the desired size to fill the readable side’s internal queue. It can be negative, if the queue is over-full.
         */
        get desiredSize() {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("desiredSize");
          }
          const readableController = this._controlledTransformStream._readable._readableStreamController;
          return ReadableStreamDefaultControllerGetDesiredSize(readableController);
        }
        enqueue(chunk = void 0) {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("enqueue");
          }
          TransformStreamDefaultControllerEnqueue(this, chunk);
        }
        /**
         * Errors both the readable side and the writable side of the controlled transform stream, making all future
         * interactions with it fail with the given error `e`. Any chunks queued for transformation will be discarded.
         */
        error(reason = void 0) {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("error");
          }
          TransformStreamDefaultControllerError(this, reason);
        }
        /**
         * Closes the readable side and errors the writable side of the controlled transform stream. This is useful when the
         * transformer only needs to consume a portion of the chunks written to the writable side.
         */
        terminate() {
          if (!IsTransformStreamDefaultController(this)) {
            throw defaultControllerBrandCheckException("terminate");
          }
          TransformStreamDefaultControllerTerminate(this);
        }
      }
      Object.defineProperties(TransformStreamDefaultController.prototype, {
        enqueue: { enumerable: true },
        error: { enumerable: true },
        terminate: { enumerable: true },
        desiredSize: { enumerable: true }
      });
      setFunctionName(TransformStreamDefaultController.prototype.enqueue, "enqueue");
      setFunctionName(TransformStreamDefaultController.prototype.error, "error");
      setFunctionName(TransformStreamDefaultController.prototype.terminate, "terminate");
      if (typeof Symbol.toStringTag === "symbol") {
        Object.defineProperty(TransformStreamDefaultController.prototype, Symbol.toStringTag, {
          value: "TransformStreamDefaultController",
          configurable: true
        });
      }
      function IsTransformStreamDefaultController(x3) {
        if (!typeIsObject(x3)) {
          return false;
        }
        if (!Object.prototype.hasOwnProperty.call(x3, "_controlledTransformStream")) {
          return false;
        }
        return x3 instanceof TransformStreamDefaultController;
      }
      function SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm, cancelAlgorithm) {
        controller._controlledTransformStream = stream;
        stream._transformStreamController = controller;
        controller._transformAlgorithm = transformAlgorithm;
        controller._flushAlgorithm = flushAlgorithm;
        controller._cancelAlgorithm = cancelAlgorithm;
        controller._finishPromise = void 0;
        controller._finishPromise_resolve = void 0;
        controller._finishPromise_reject = void 0;
      }
      function SetUpTransformStreamDefaultControllerFromTransformer(stream, transformer) {
        const controller = Object.create(TransformStreamDefaultController.prototype);
        let transformAlgorithm;
        let flushAlgorithm;
        let cancelAlgorithm;
        if (transformer.transform !== void 0) {
          transformAlgorithm = (chunk) => transformer.transform(chunk, controller);
        } else {
          transformAlgorithm = (chunk) => {
            try {
              TransformStreamDefaultControllerEnqueue(controller, chunk);
              return promiseResolvedWith(void 0);
            } catch (transformResultE) {
              return promiseRejectedWith(transformResultE);
            }
          };
        }
        if (transformer.flush !== void 0) {
          flushAlgorithm = () => transformer.flush(controller);
        } else {
          flushAlgorithm = () => promiseResolvedWith(void 0);
        }
        if (transformer.cancel !== void 0) {
          cancelAlgorithm = (reason) => transformer.cancel(reason);
        } else {
          cancelAlgorithm = () => promiseResolvedWith(void 0);
        }
        SetUpTransformStreamDefaultController(stream, controller, transformAlgorithm, flushAlgorithm, cancelAlgorithm);
      }
      function TransformStreamDefaultControllerClearAlgorithms(controller) {
        controller._transformAlgorithm = void 0;
        controller._flushAlgorithm = void 0;
        controller._cancelAlgorithm = void 0;
      }
      function TransformStreamDefaultControllerEnqueue(controller, chunk) {
        const stream = controller._controlledTransformStream;
        const readableController = stream._readable._readableStreamController;
        if (!ReadableStreamDefaultControllerCanCloseOrEnqueue(readableController)) {
          throw new TypeError("Readable side is not in a state that permits enqueue");
        }
        try {
          ReadableStreamDefaultControllerEnqueue(readableController, chunk);
        } catch (e11) {
          TransformStreamErrorWritableAndUnblockWrite(stream, e11);
          throw stream._readable._storedError;
        }
        const backpressure = ReadableStreamDefaultControllerHasBackpressure(readableController);
        if (backpressure !== stream._backpressure) {
          TransformStreamSetBackpressure(stream, true);
        }
      }
      function TransformStreamDefaultControllerError(controller, e11) {
        TransformStreamError(controller._controlledTransformStream, e11);
      }
      function TransformStreamDefaultControllerPerformTransform(controller, chunk) {
        const transformPromise = controller._transformAlgorithm(chunk);
        return transformPromiseWith(transformPromise, void 0, (r10) => {
          TransformStreamError(controller._controlledTransformStream, r10);
          throw r10;
        });
      }
      function TransformStreamDefaultControllerTerminate(controller) {
        const stream = controller._controlledTransformStream;
        const readableController = stream._readable._readableStreamController;
        ReadableStreamDefaultControllerClose(readableController);
        const error = new TypeError("TransformStream terminated");
        TransformStreamErrorWritableAndUnblockWrite(stream, error);
      }
      function TransformStreamDefaultSinkWriteAlgorithm(stream, chunk) {
        const controller = stream._transformStreamController;
        if (stream._backpressure) {
          const backpressureChangePromise = stream._backpressureChangePromise;
          return transformPromiseWith(backpressureChangePromise, () => {
            const writable = stream._writable;
            const state = writable._state;
            if (state === "erroring") {
              throw writable._storedError;
            }
            return TransformStreamDefaultControllerPerformTransform(controller, chunk);
          });
        }
        return TransformStreamDefaultControllerPerformTransform(controller, chunk);
      }
      function TransformStreamDefaultSinkAbortAlgorithm(stream, reason) {
        const controller = stream._transformStreamController;
        if (controller._finishPromise !== void 0) {
          return controller._finishPromise;
        }
        const readable = stream._readable;
        controller._finishPromise = newPromise((resolve, reject) => {
          controller._finishPromise_resolve = resolve;
          controller._finishPromise_reject = reject;
        });
        const cancelPromise = controller._cancelAlgorithm(reason);
        TransformStreamDefaultControllerClearAlgorithms(controller);
        uponPromise(cancelPromise, () => {
          if (readable._state === "errored") {
            defaultControllerFinishPromiseReject(controller, readable._storedError);
          } else {
            ReadableStreamDefaultControllerError(readable._readableStreamController, reason);
            defaultControllerFinishPromiseResolve(controller);
          }
          return null;
        }, (r10) => {
          ReadableStreamDefaultControllerError(readable._readableStreamController, r10);
          defaultControllerFinishPromiseReject(controller, r10);
          return null;
        });
        return controller._finishPromise;
      }
      function TransformStreamDefaultSinkCloseAlgorithm(stream) {
        const controller = stream._transformStreamController;
        if (controller._finishPromise !== void 0) {
          return controller._finishPromise;
        }
        const readable = stream._readable;
        controller._finishPromise = newPromise((resolve, reject) => {
          controller._finishPromise_resolve = resolve;
          controller._finishPromise_reject = reject;
        });
        const flushPromise = controller._flushAlgorithm();
        TransformStreamDefaultControllerClearAlgorithms(controller);
        uponPromise(flushPromise, () => {
          if (readable._state === "errored") {
            defaultControllerFinishPromiseReject(controller, readable._storedError);
          } else {
            ReadableStreamDefaultControllerClose(readable._readableStreamController);
            defaultControllerFinishPromiseResolve(controller);
          }
          return null;
        }, (r10) => {
          ReadableStreamDefaultControllerError(readable._readableStreamController, r10);
          defaultControllerFinishPromiseReject(controller, r10);
          return null;
        });
        return controller._finishPromise;
      }
      function TransformStreamDefaultSourcePullAlgorithm(stream) {
        TransformStreamSetBackpressure(stream, false);
        return stream._backpressureChangePromise;
      }
      function TransformStreamDefaultSourceCancelAlgorithm(stream, reason) {
        const controller = stream._transformStreamController;
        if (controller._finishPromise !== void 0) {
          return controller._finishPromise;
        }
        const writable = stream._writable;
        controller._finishPromise = newPromise((resolve, reject) => {
          controller._finishPromise_resolve = resolve;
          controller._finishPromise_reject = reject;
        });
        const cancelPromise = controller._cancelAlgorithm(reason);
        TransformStreamDefaultControllerClearAlgorithms(controller);
        uponPromise(cancelPromise, () => {
          if (writable._state === "errored") {
            defaultControllerFinishPromiseReject(controller, writable._storedError);
          } else {
            WritableStreamDefaultControllerErrorIfNeeded(writable._writableStreamController, reason);
            TransformStreamUnblockWrite(stream);
            defaultControllerFinishPromiseResolve(controller);
          }
          return null;
        }, (r10) => {
          WritableStreamDefaultControllerErrorIfNeeded(writable._writableStreamController, r10);
          TransformStreamUnblockWrite(stream);
          defaultControllerFinishPromiseReject(controller, r10);
          return null;
        });
        return controller._finishPromise;
      }
      function defaultControllerBrandCheckException(name) {
        return new TypeError(`TransformStreamDefaultController.prototype.${name} can only be used on a TransformStreamDefaultController`);
      }
      function defaultControllerFinishPromiseResolve(controller) {
        if (controller._finishPromise_resolve === void 0) {
          return;
        }
        controller._finishPromise_resolve();
        controller._finishPromise_resolve = void 0;
        controller._finishPromise_reject = void 0;
      }
      function defaultControllerFinishPromiseReject(controller, reason) {
        if (controller._finishPromise_reject === void 0) {
          return;
        }
        setPromiseIsHandledToTrue(controller._finishPromise);
        controller._finishPromise_reject(reason);
        controller._finishPromise_resolve = void 0;
        controller._finishPromise_reject = void 0;
      }
      function streamBrandCheckException(name) {
        return new TypeError(`TransformStream.prototype.${name} can only be used on a TransformStream`);
      }
      exports2.ByteLengthQueuingStrategy = ByteLengthQueuingStrategy;
      exports2.CountQueuingStrategy = CountQueuingStrategy;
      exports2.ReadableByteStreamController = ReadableByteStreamController;
      exports2.ReadableStream = ReadableStream2;
      exports2.ReadableStreamBYOBReader = ReadableStreamBYOBReader;
      exports2.ReadableStreamBYOBRequest = ReadableStreamBYOBRequest;
      exports2.ReadableStreamDefaultController = ReadableStreamDefaultController;
      exports2.ReadableStreamDefaultReader = ReadableStreamDefaultReader;
      exports2.TransformStream = TransformStream;
      exports2.TransformStreamDefaultController = TransformStreamDefaultController;
      exports2.WritableStream = WritableStream;
      exports2.WritableStreamDefaultController = WritableStreamDefaultController;
      exports2.WritableStreamDefaultWriter = WritableStreamDefaultWriter;
    }));
  }
});

// node_modules/fetch-blob/streams.cjs
var require_streams = __commonJS({
  "node_modules/fetch-blob/streams.cjs"() {
    var POOL_SIZE2 = 65536;
    if (!globalThis.ReadableStream) {
      try {
        const process2 = __require("node:process");
        const { emitWarning } = process2;
        try {
          process2.emitWarning = () => {
          };
          Object.assign(globalThis, __require("node:stream/web"));
          process2.emitWarning = emitWarning;
        } catch (error) {
          process2.emitWarning = emitWarning;
          throw error;
        }
      } catch (error) {
        Object.assign(globalThis, require_ponyfill_es2018());
      }
    }
    try {
      const { Blob: Blob3 } = __require("buffer");
      if (Blob3 && !Blob3.prototype.stream) {
        Blob3.prototype.stream = function name(params) {
          let position = 0;
          const blob = this;
          return new ReadableStream({
            type: "bytes",
            async pull(ctrl) {
              const chunk = blob.slice(position, Math.min(blob.size, position + POOL_SIZE2));
              const buffer = await chunk.arrayBuffer();
              position += buffer.byteLength;
              ctrl.enqueue(new Uint8Array(buffer));
              if (position === blob.size) {
                ctrl.close();
              }
            }
          });
        };
      }
    } catch (error) {
    }
  }
});

// node_modules/fetch-blob/index.js
async function* toIterator(parts, clone2 = true) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* (
        /** @type {AsyncIterableIterator<Uint8Array>} */
        part.stream()
      );
    } else if (ArrayBuffer.isView(part)) {
      if (clone2) {
        let position = part.byteOffset;
        const end = part.byteOffset + part.byteLength;
        while (position !== end) {
          const size2 = Math.min(end - position, POOL_SIZE);
          const chunk = part.buffer.slice(position, position + size2);
          position += chunk.byteLength;
          yield new Uint8Array(chunk);
        }
      } else {
        yield part;
      }
    } else {
      let position = 0, b4 = (
        /** @type {Blob} */
        part
      );
      while (position !== b4.size) {
        const chunk = b4.slice(position, Math.min(b4.size, position + POOL_SIZE));
        const buffer = await chunk.arrayBuffer();
        position += buffer.byteLength;
        yield new Uint8Array(buffer);
      }
    }
  }
}
var import_streams, POOL_SIZE, _Blob, Blob2, fetch_blob_default;
var init_fetch_blob = __esm({
  "node_modules/fetch-blob/index.js"() {
    import_streams = __toESM(require_streams(), 1);
    POOL_SIZE = 65536;
    _Blob = class Blob {
      /** @type {Array.<(Blob|Uint8Array)>} */
      #parts = [];
      #type = "";
      #size = 0;
      #endings = "transparent";
      /**
       * The Blob() constructor returns a new Blob object. The content
       * of the blob consists of the concatenation of the values given
       * in the parameter array.
       *
       * @param {*} blobParts
       * @param {{ type?: string, endings?: string }} [options]
       */
      constructor(blobParts = [], options = {}) {
        if (typeof blobParts !== "object" || blobParts === null) {
          throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");
        }
        if (typeof blobParts[Symbol.iterator] !== "function") {
          throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");
        }
        if (typeof options !== "object" && typeof options !== "function") {
          throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");
        }
        if (options === null) options = {};
        const encoder = new TextEncoder();
        for (const element of blobParts) {
          let part;
          if (ArrayBuffer.isView(element)) {
            part = new Uint8Array(element.buffer.slice(element.byteOffset, element.byteOffset + element.byteLength));
          } else if (element instanceof ArrayBuffer) {
            part = new Uint8Array(element.slice(0));
          } else if (element instanceof Blob) {
            part = element;
          } else {
            part = encoder.encode(`${element}`);
          }
          this.#size += ArrayBuffer.isView(part) ? part.byteLength : part.size;
          this.#parts.push(part);
        }
        this.#endings = `${options.endings === void 0 ? "transparent" : options.endings}`;
        const type = options.type === void 0 ? "" : String(options.type);
        this.#type = /^[\x20-\x7E]*$/.test(type) ? type : "";
      }
      /**
       * The Blob interface's size property returns the
       * size of the Blob in bytes.
       */
      get size() {
        return this.#size;
      }
      /**
       * The type property of a Blob object returns the MIME type of the file.
       */
      get type() {
        return this.#type;
      }
      /**
       * The text() method in the Blob interface returns a Promise
       * that resolves with a string containing the contents of
       * the blob, interpreted as UTF-8.
       *
       * @return {Promise<string>}
       */
      async text() {
        const decoder = new TextDecoder();
        let str = "";
        for await (const part of toIterator(this.#parts, false)) {
          str += decoder.decode(part, { stream: true });
        }
        str += decoder.decode();
        return str;
      }
      /**
       * The arrayBuffer() method in the Blob interface returns a
       * Promise that resolves with the contents of the blob as
       * binary data contained in an ArrayBuffer.
       *
       * @return {Promise<ArrayBuffer>}
       */
      async arrayBuffer() {
        const data = new Uint8Array(this.size);
        let offset3 = 0;
        for await (const chunk of toIterator(this.#parts, false)) {
          data.set(chunk, offset3);
          offset3 += chunk.length;
        }
        return data.buffer;
      }
      stream() {
        const it = toIterator(this.#parts, true);
        return new globalThis.ReadableStream({
          // @ts-ignore
          type: "bytes",
          async pull(ctrl) {
            const chunk = await it.next();
            chunk.done ? ctrl.close() : ctrl.enqueue(chunk.value);
          },
          async cancel() {
            await it.return();
          }
        });
      }
      /**
       * The Blob interface's slice() method creates and returns a
       * new Blob object which contains data from a subset of the
       * blob on which it's called.
       *
       * @param {number} [start]
       * @param {number} [end]
       * @param {string} [type]
       */
      slice(start = 0, end = this.size, type = "") {
        const { size: size2 } = this;
        let relativeStart = start < 0 ? Math.max(size2 + start, 0) : Math.min(start, size2);
        let relativeEnd = end < 0 ? Math.max(size2 + end, 0) : Math.min(end, size2);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = this.#parts;
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          if (added >= span) {
            break;
          }
          const size3 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size3 <= relativeStart) {
            relativeStart -= size3;
            relativeEnd -= size3;
          } else {
            let chunk;
            if (ArrayBuffer.isView(part)) {
              chunk = part.subarray(relativeStart, Math.min(size3, relativeEnd));
              added += chunk.byteLength;
            } else {
              chunk = part.slice(relativeStart, Math.min(size3, relativeEnd));
              added += chunk.size;
            }
            relativeEnd -= size3;
            blobParts.push(chunk);
            relativeStart = 0;
          }
        }
        const blob = new Blob([], { type: String(type).toLowerCase() });
        blob.#size = span;
        blob.#parts = blobParts;
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.constructor === "function" && (typeof object.stream === "function" || typeof object.arrayBuffer === "function") && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    };
    Object.defineProperties(_Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    Blob2 = _Blob;
    fetch_blob_default = Blob2;
  }
});

// node_modules/fetch-blob/file.js
var _File, File2, file_default;
var init_file = __esm({
  "node_modules/fetch-blob/file.js"() {
    init_fetch_blob();
    _File = class File extends fetch_blob_default {
      #lastModified = 0;
      #name = "";
      /**
       * @param {*[]} fileBits
       * @param {string} fileName
       * @param {{lastModified?: number, type?: string}} options
       */
      // @ts-ignore
      constructor(fileBits, fileName, options = {}) {
        if (arguments.length < 2) {
          throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);
        }
        super(fileBits, options);
        if (options === null) options = {};
        const lastModified = options.lastModified === void 0 ? Date.now() : Number(options.lastModified);
        if (!Number.isNaN(lastModified)) {
          this.#lastModified = lastModified;
        }
        this.#name = String(fileName);
      }
      get name() {
        return this.#name;
      }
      get lastModified() {
        return this.#lastModified;
      }
      get [Symbol.toStringTag]() {
        return "File";
      }
      static [Symbol.hasInstance](object) {
        return !!object && object instanceof fetch_blob_default && /^(File)$/.test(object[Symbol.toStringTag]);
      }
    };
    File2 = _File;
    file_default = File2;
  }
});

// node_modules/formdata-polyfill/esm.min.js
function formDataToBlob(F2, B2 = fetch_blob_default) {
  var b4 = `${r()}${r()}`.replace(/\./g, "").slice(-28).padStart(32, "-"), c6 = [], p5 = `--${b4}\r
Content-Disposition: form-data; name="`;
  F2.forEach((v3, n9) => typeof v3 == "string" ? c6.push(p5 + e(n9) + `"\r
\r
${v3.replace(/\r(?!\n)|(?<!\r)\n/g, "\r\n")}\r
`) : c6.push(p5 + e(n9) + `"; filename="${e(v3.name, 1)}"\r
Content-Type: ${v3.type || "application/octet-stream"}\r
\r
`, v3, "\r\n"));
  c6.push(`--${b4}--`);
  return new B2(c6, { type: "multipart/form-data; boundary=" + b4 });
}
var t, i, h, r, m, f, e, x, FormData;
var init_esm_min = __esm({
  "node_modules/formdata-polyfill/esm.min.js"() {
    init_fetch_blob();
    init_file();
    ({ toStringTag: t, iterator: i, hasInstance: h } = Symbol);
    r = Math.random;
    m = "append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(",");
    f = (a3, b4, c6) => (a3 += "", /^(Blob|File)$/.test(b4 && b4[t]) ? [(c6 = c6 !== void 0 ? c6 + "" : b4[t] == "File" ? b4.name : "blob", a3), b4.name !== c6 || b4[t] == "blob" ? new file_default([b4], c6, b4) : b4] : [a3, b4 + ""]);
    e = (c6, f8) => (f8 ? c6 : c6.replace(/\r?\n|\r/g, "\r\n")).replace(/\n/g, "%0A").replace(/\r/g, "%0D").replace(/"/g, "%22");
    x = (n9, a3, e11) => {
      if (a3.length < e11) {
        throw new TypeError(`Failed to execute '${n9}' on 'FormData': ${e11} arguments required, but only ${a3.length} present.`);
      }
    };
    FormData = class FormData2 {
      #d = [];
      constructor(...a3) {
        if (a3.length) throw new TypeError(`Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.`);
      }
      get [t]() {
        return "FormData";
      }
      [i]() {
        return this.entries();
      }
      static [h](o11) {
        return o11 && typeof o11 === "object" && o11[t] === "FormData" && !m.some((m6) => typeof o11[m6] != "function");
      }
      append(...a3) {
        x("append", arguments, 2);
        this.#d.push(f(...a3));
      }
      delete(a3) {
        x("delete", arguments, 1);
        a3 += "";
        this.#d = this.#d.filter(([b4]) => b4 !== a3);
      }
      get(a3) {
        x("get", arguments, 1);
        a3 += "";
        for (var b4 = this.#d, l5 = b4.length, c6 = 0; c6 < l5; c6++) if (b4[c6][0] === a3) return b4[c6][1];
        return null;
      }
      getAll(a3, b4) {
        x("getAll", arguments, 1);
        b4 = [];
        a3 += "";
        this.#d.forEach((c6) => c6[0] === a3 && b4.push(c6[1]));
        return b4;
      }
      has(a3) {
        x("has", arguments, 1);
        a3 += "";
        return this.#d.some((b4) => b4[0] === a3);
      }
      forEach(a3, b4) {
        x("forEach", arguments, 1);
        for (var [c6, d5] of this) a3.call(b4, d5, c6, this);
      }
      set(...a3) {
        x("set", arguments, 2);
        var b4 = [], c6 = true;
        a3 = f(...a3);
        this.#d.forEach((d5) => {
          d5[0] === a3[0] ? c6 && (c6 = !b4.push(a3)) : b4.push(d5);
        });
        c6 && b4.push(a3);
        this.#d = b4;
      }
      *entries() {
        yield* this.#d;
      }
      *keys() {
        for (var [a3] of this) yield a3;
      }
      *values() {
        for (var [, a3] of this) yield a3;
      }
    };
  }
});

// node_modules/node-domexception/index.js
var require_node_domexception = __commonJS({
  "node_modules/node-domexception/index.js"(exports, module) {
    if (!globalThis.DOMException) {
      try {
        const { MessageChannel } = __require("worker_threads"), port = new MessageChannel().port1, ab = new ArrayBuffer();
        port.postMessage(ab, [ab, ab]);
      } catch (err) {
        err.constructor.name === "DOMException" && (globalThis.DOMException = err.constructor);
      }
    }
    module.exports = globalThis.DOMException;
  }
});

// node_modules/fetch-blob/from.js
import { statSync, createReadStream, promises as fs } from "node:fs";
var import_node_domexception, stat;
var init_from = __esm({
  "node_modules/fetch-blob/from.js"() {
    import_node_domexception = __toESM(require_node_domexception(), 1);
    init_file();
    init_fetch_blob();
    ({ stat } = fs);
  }
});

// node_modules/node-fetch/src/utils/multipart-parser.js
var multipart_parser_exports = {};
__export(multipart_parser_exports, {
  toFormData: () => toFormData
});
function _fileName(headerValue) {
  const m6 = headerValue.match(/\bfilename=("(.*?)"|([^()<>@,;:\\"/[\]?={}\s\t]+))($|;\s)/i);
  if (!m6) {
    return;
  }
  const match = m6[2] || m6[3] || "";
  let filename = match.slice(match.lastIndexOf("\\") + 1);
  filename = filename.replace(/%22/g, '"');
  filename = filename.replace(/&#(\d{4});/g, (m7, code) => {
    return String.fromCharCode(code);
  });
  return filename;
}
async function toFormData(Body2, ct) {
  if (!/multipart/i.test(ct)) {
    throw new TypeError("Failed to fetch");
  }
  const m6 = ct.match(/boundary=(?:"([^"]+)"|([^;]+))/i);
  if (!m6) {
    throw new TypeError("no or bad content-type header, no multipart boundary");
  }
  const parser = new MultipartParser(m6[1] || m6[2]);
  let headerField;
  let headerValue;
  let entryValue;
  let entryName;
  let contentType;
  let filename;
  const entryChunks = [];
  const formData = new FormData();
  const onPartData = (ui8a) => {
    entryValue += decoder.decode(ui8a, { stream: true });
  };
  const appendToFile = (ui8a) => {
    entryChunks.push(ui8a);
  };
  const appendFileToFormData = () => {
    const file = new file_default(entryChunks, filename, { type: contentType });
    formData.append(entryName, file);
  };
  const appendEntryToFormData = () => {
    formData.append(entryName, entryValue);
  };
  const decoder = new TextDecoder("utf-8");
  decoder.decode();
  parser.onPartBegin = function() {
    parser.onPartData = onPartData;
    parser.onPartEnd = appendEntryToFormData;
    headerField = "";
    headerValue = "";
    entryValue = "";
    entryName = "";
    contentType = "";
    filename = null;
    entryChunks.length = 0;
  };
  parser.onHeaderField = function(ui8a) {
    headerField += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderValue = function(ui8a) {
    headerValue += decoder.decode(ui8a, { stream: true });
  };
  parser.onHeaderEnd = function() {
    headerValue += decoder.decode();
    headerField = headerField.toLowerCase();
    if (headerField === "content-disposition") {
      const m7 = headerValue.match(/\bname=("([^"]*)"|([^()<>@,;:\\"/[\]?={}\s\t]+))/i);
      if (m7) {
        entryName = m7[2] || m7[3] || "";
      }
      filename = _fileName(headerValue);
      if (filename) {
        parser.onPartData = appendToFile;
        parser.onPartEnd = appendFileToFormData;
      }
    } else if (headerField === "content-type") {
      contentType = headerValue;
    }
    headerValue = "";
    headerField = "";
  };
  for await (const chunk of Body2) {
    parser.write(chunk);
  }
  parser.end();
  return formData;
}
var s, S, f2, F, LF, CR, SPACE, HYPHEN, COLON, A, Z, lower, noop, MultipartParser;
var init_multipart_parser = __esm({
  "node_modules/node-fetch/src/utils/multipart-parser.js"() {
    init_from();
    init_esm_min();
    s = 0;
    S = {
      START_BOUNDARY: s++,
      HEADER_FIELD_START: s++,
      HEADER_FIELD: s++,
      HEADER_VALUE_START: s++,
      HEADER_VALUE: s++,
      HEADER_VALUE_ALMOST_DONE: s++,
      HEADERS_ALMOST_DONE: s++,
      PART_DATA_START: s++,
      PART_DATA: s++,
      END: s++
    };
    f2 = 1;
    F = {
      PART_BOUNDARY: f2,
      LAST_BOUNDARY: f2 *= 2
    };
    LF = 10;
    CR = 13;
    SPACE = 32;
    HYPHEN = 45;
    COLON = 58;
    A = 97;
    Z = 122;
    lower = (c6) => c6 | 32;
    noop = () => {
    };
    MultipartParser = class {
      /**
       * @param {string} boundary
       */
      constructor(boundary) {
        this.index = 0;
        this.flags = 0;
        this.onHeaderEnd = noop;
        this.onHeaderField = noop;
        this.onHeadersEnd = noop;
        this.onHeaderValue = noop;
        this.onPartBegin = noop;
        this.onPartData = noop;
        this.onPartEnd = noop;
        this.boundaryChars = {};
        boundary = "\r\n--" + boundary;
        const ui8a = new Uint8Array(boundary.length);
        for (let i8 = 0; i8 < boundary.length; i8++) {
          ui8a[i8] = boundary.charCodeAt(i8);
          this.boundaryChars[ui8a[i8]] = true;
        }
        this.boundary = ui8a;
        this.lookbehind = new Uint8Array(this.boundary.length + 8);
        this.state = S.START_BOUNDARY;
      }
      /**
       * @param {Uint8Array} data
       */
      write(data) {
        let i8 = 0;
        const length_ = data.length;
        let previousIndex = this.index;
        let { lookbehind, boundary, boundaryChars, index, state, flags } = this;
        const boundaryLength = this.boundary.length;
        const boundaryEnd = boundaryLength - 1;
        const bufferLength = data.length;
        let c6;
        let cl;
        const mark = (name) => {
          this[name + "Mark"] = i8;
        };
        const clear = (name) => {
          delete this[name + "Mark"];
        };
        const callback = (callbackSymbol, start, end, ui8a) => {
          if (start === void 0 || start !== end) {
            this[callbackSymbol](ui8a && ui8a.subarray(start, end));
          }
        };
        const dataCallback = (name, clear2) => {
          const markSymbol = name + "Mark";
          if (!(markSymbol in this)) {
            return;
          }
          if (clear2) {
            callback(name, this[markSymbol], i8, data);
            delete this[markSymbol];
          } else {
            callback(name, this[markSymbol], data.length, data);
            this[markSymbol] = 0;
          }
        };
        for (i8 = 0; i8 < length_; i8++) {
          c6 = data[i8];
          switch (state) {
            case S.START_BOUNDARY:
              if (index === boundary.length - 2) {
                if (c6 === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else if (c6 !== CR) {
                  return;
                }
                index++;
                break;
              } else if (index - 1 === boundary.length - 2) {
                if (flags & F.LAST_BOUNDARY && c6 === HYPHEN) {
                  state = S.END;
                  flags = 0;
                } else if (!(flags & F.LAST_BOUNDARY) && c6 === LF) {
                  index = 0;
                  callback("onPartBegin");
                  state = S.HEADER_FIELD_START;
                } else {
                  return;
                }
                break;
              }
              if (c6 !== boundary[index + 2]) {
                index = -2;
              }
              if (c6 === boundary[index + 2]) {
                index++;
              }
              break;
            case S.HEADER_FIELD_START:
              state = S.HEADER_FIELD;
              mark("onHeaderField");
              index = 0;
            // falls through
            case S.HEADER_FIELD:
              if (c6 === CR) {
                clear("onHeaderField");
                state = S.HEADERS_ALMOST_DONE;
                break;
              }
              index++;
              if (c6 === HYPHEN) {
                break;
              }
              if (c6 === COLON) {
                if (index === 1) {
                  return;
                }
                dataCallback("onHeaderField", true);
                state = S.HEADER_VALUE_START;
                break;
              }
              cl = lower(c6);
              if (cl < A || cl > Z) {
                return;
              }
              break;
            case S.HEADER_VALUE_START:
              if (c6 === SPACE) {
                break;
              }
              mark("onHeaderValue");
              state = S.HEADER_VALUE;
            // falls through
            case S.HEADER_VALUE:
              if (c6 === CR) {
                dataCallback("onHeaderValue", true);
                callback("onHeaderEnd");
                state = S.HEADER_VALUE_ALMOST_DONE;
              }
              break;
            case S.HEADER_VALUE_ALMOST_DONE:
              if (c6 !== LF) {
                return;
              }
              state = S.HEADER_FIELD_START;
              break;
            case S.HEADERS_ALMOST_DONE:
              if (c6 !== LF) {
                return;
              }
              callback("onHeadersEnd");
              state = S.PART_DATA_START;
              break;
            case S.PART_DATA_START:
              state = S.PART_DATA;
              mark("onPartData");
            // falls through
            case S.PART_DATA:
              previousIndex = index;
              if (index === 0) {
                i8 += boundaryEnd;
                while (i8 < bufferLength && !(data[i8] in boundaryChars)) {
                  i8 += boundaryLength;
                }
                i8 -= boundaryEnd;
                c6 = data[i8];
              }
              if (index < boundary.length) {
                if (boundary[index] === c6) {
                  if (index === 0) {
                    dataCallback("onPartData", true);
                  }
                  index++;
                } else {
                  index = 0;
                }
              } else if (index === boundary.length) {
                index++;
                if (c6 === CR) {
                  flags |= F.PART_BOUNDARY;
                } else if (c6 === HYPHEN) {
                  flags |= F.LAST_BOUNDARY;
                } else {
                  index = 0;
                }
              } else if (index - 1 === boundary.length) {
                if (flags & F.PART_BOUNDARY) {
                  index = 0;
                  if (c6 === LF) {
                    flags &= ~F.PART_BOUNDARY;
                    callback("onPartEnd");
                    callback("onPartBegin");
                    state = S.HEADER_FIELD_START;
                    break;
                  }
                } else if (flags & F.LAST_BOUNDARY) {
                  if (c6 === HYPHEN) {
                    callback("onPartEnd");
                    state = S.END;
                    flags = 0;
                  } else {
                    index = 0;
                  }
                } else {
                  index = 0;
                }
              }
              if (index > 0) {
                lookbehind[index - 1] = c6;
              } else if (previousIndex > 0) {
                const _lookbehind = new Uint8Array(lookbehind.buffer, lookbehind.byteOffset, lookbehind.byteLength);
                callback("onPartData", 0, previousIndex, _lookbehind);
                previousIndex = 0;
                mark("onPartData");
                i8--;
              }
              break;
            case S.END:
              break;
            default:
              throw new Error(`Unexpected state entered: ${state}`);
          }
        }
        dataCallback("onHeaderField");
        dataCallback("onHeaderValue");
        dataCallback("onPartData");
        this.index = index;
        this.state = state;
        this.flags = flags;
      }
      end() {
        if (this.state === S.HEADER_FIELD_START && this.index === 0 || this.state === S.PART_DATA && this.index === this.boundary.length) {
          this.onPartEnd();
        } else if (this.state !== S.END) {
          throw new Error("MultipartParser.end(): stream ended unexpectedly");
        }
      }
    };
  }
});

// node_modules/@lit-labs/ssr-dom-shim/lib/element-internals.js
var ariaMixinAttributes = {
  ariaAtomic: "aria-atomic",
  ariaAutoComplete: "aria-autocomplete",
  ariaBrailleLabel: "aria-braillelabel",
  ariaBrailleRoleDescription: "aria-brailleroledescription",
  ariaBusy: "aria-busy",
  ariaChecked: "aria-checked",
  ariaColCount: "aria-colcount",
  ariaColIndex: "aria-colindex",
  ariaColIndexText: "aria-colindextext",
  ariaColSpan: "aria-colspan",
  ariaCurrent: "aria-current",
  ariaDescription: "aria-description",
  ariaDisabled: "aria-disabled",
  ariaExpanded: "aria-expanded",
  ariaHasPopup: "aria-haspopup",
  ariaHidden: "aria-hidden",
  ariaInvalid: "aria-invalid",
  ariaKeyShortcuts: "aria-keyshortcuts",
  ariaLabel: "aria-label",
  ariaLevel: "aria-level",
  ariaLive: "aria-live",
  ariaModal: "aria-modal",
  ariaMultiLine: "aria-multiline",
  ariaMultiSelectable: "aria-multiselectable",
  ariaOrientation: "aria-orientation",
  ariaPlaceholder: "aria-placeholder",
  ariaPosInSet: "aria-posinset",
  ariaPressed: "aria-pressed",
  ariaReadOnly: "aria-readonly",
  ariaRelevant: "aria-relevant",
  ariaRequired: "aria-required",
  ariaRoleDescription: "aria-roledescription",
  ariaRowCount: "aria-rowcount",
  ariaRowIndex: "aria-rowindex",
  ariaRowIndexText: "aria-rowindextext",
  ariaRowSpan: "aria-rowspan",
  ariaSelected: "aria-selected",
  ariaSetSize: "aria-setsize",
  ariaSort: "aria-sort",
  ariaValueMax: "aria-valuemax",
  ariaValueMin: "aria-valuemin",
  ariaValueNow: "aria-valuenow",
  ariaValueText: "aria-valuetext",
  role: "role"
};
var ElementInternalsShim = class ElementInternals {
  get shadowRoot() {
    return this.__host.__shadowRoot;
  }
  constructor(_host) {
    this.ariaActiveDescendantElement = null;
    this.ariaAtomic = "";
    this.ariaAutoComplete = "";
    this.ariaBrailleLabel = "";
    this.ariaBrailleRoleDescription = "";
    this.ariaBusy = "";
    this.ariaChecked = "";
    this.ariaColCount = "";
    this.ariaColIndex = "";
    this.ariaColIndexText = "";
    this.ariaColSpan = "";
    this.ariaControlsElements = null;
    this.ariaCurrent = "";
    this.ariaDescribedByElements = null;
    this.ariaDescription = "";
    this.ariaDetailsElements = null;
    this.ariaDisabled = "";
    this.ariaErrorMessageElements = null;
    this.ariaExpanded = "";
    this.ariaFlowToElements = null;
    this.ariaHasPopup = "";
    this.ariaHidden = "";
    this.ariaInvalid = "";
    this.ariaKeyShortcuts = "";
    this.ariaLabel = "";
    this.ariaLabelledByElements = null;
    this.ariaLevel = "";
    this.ariaLive = "";
    this.ariaModal = "";
    this.ariaMultiLine = "";
    this.ariaMultiSelectable = "";
    this.ariaOrientation = "";
    this.ariaOwnsElements = null;
    this.ariaPlaceholder = "";
    this.ariaPosInSet = "";
    this.ariaPressed = "";
    this.ariaReadOnly = "";
    this.ariaRelevant = "";
    this.ariaRequired = "";
    this.ariaRoleDescription = "";
    this.ariaRowCount = "";
    this.ariaRowIndex = "";
    this.ariaRowIndexText = "";
    this.ariaRowSpan = "";
    this.ariaSelected = "";
    this.ariaSetSize = "";
    this.ariaSort = "";
    this.ariaValueMax = "";
    this.ariaValueMin = "";
    this.ariaValueNow = "";
    this.ariaValueText = "";
    this.role = "";
    this.form = null;
    this.labels = [];
    this.states = /* @__PURE__ */ new Set();
    this.validationMessage = "";
    this.validity = {};
    this.willValidate = true;
    this.__host = _host;
  }
  checkValidity() {
    console.warn("`ElementInternals.checkValidity()` was called on the server.This method always returns true.");
    return true;
  }
  reportValidity() {
    return true;
  }
  setFormValue() {
  }
  setValidity() {
  }
};
var HYDRATE_INTERNALS_ATTR_PREFIX = "hydrate-internals-";

// node_modules/@lit-labs/ssr-dom-shim/lib/events.js
var __classPrivateFieldSet = function(receiver, state, value, kind, f8) {
  if (kind === "m") throw new TypeError("Private method is not writable");
  if (kind === "a" && !f8) throw new TypeError("Private accessor was defined without a setter");
  if (typeof state === "function" ? receiver !== state || !f8 : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return kind === "a" ? f8.call(receiver, value) : f8 ? f8.value = value : state.set(receiver, value), value;
};
var __classPrivateFieldGet = function(receiver, state, kind, f8) {
  if (kind === "a" && !f8) throw new TypeError("Private accessor was defined without a getter");
  if (typeof state === "function" ? receiver !== state || !f8 : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return kind === "m" ? f8 : kind === "a" ? f8.call(receiver) : f8 ? f8.value : state.get(receiver);
};
var _Event_cancelable;
var _Event_bubbles;
var _Event_composed;
var _Event_defaultPrevented;
var _Event_timestamp;
var _Event_propagationStopped;
var _Event_type;
var _Event_target;
var _Event_isBeingDispatched;
var _a;
var _CustomEvent_detail;
var _b;
var NONE = 0;
var CAPTURING_PHASE = 1;
var AT_TARGET = 2;
var BUBBLING_PHASE = 3;
var enumerableProperty = { __proto__: null };
enumerableProperty.enumerable = true;
Object.freeze(enumerableProperty);
var EventShim = (_a = class Event2 {
  constructor(type, options = {}) {
    _Event_cancelable.set(this, false);
    _Event_bubbles.set(this, false);
    _Event_composed.set(this, false);
    _Event_defaultPrevented.set(this, false);
    _Event_timestamp.set(this, Date.now());
    _Event_propagationStopped.set(this, false);
    _Event_type.set(this, void 0);
    _Event_target.set(this, void 0);
    _Event_isBeingDispatched.set(this, void 0);
    this.NONE = NONE;
    this.CAPTURING_PHASE = CAPTURING_PHASE;
    this.AT_TARGET = AT_TARGET;
    this.BUBBLING_PHASE = BUBBLING_PHASE;
    if (arguments.length === 0)
      throw new Error(`The type argument must be specified`);
    if (typeof options !== "object" || !options) {
      throw new Error(`The "options" argument must be an object`);
    }
    const { bubbles, cancelable, composed } = options;
    __classPrivateFieldSet(this, _Event_cancelable, !!cancelable, "f");
    __classPrivateFieldSet(this, _Event_bubbles, !!bubbles, "f");
    __classPrivateFieldSet(this, _Event_composed, !!composed, "f");
    __classPrivateFieldSet(this, _Event_type, `${type}`, "f");
    __classPrivateFieldSet(this, _Event_target, null, "f");
    __classPrivateFieldSet(this, _Event_isBeingDispatched, false, "f");
  }
  initEvent(_type, _bubbles, _cancelable) {
    throw new Error("Method not implemented.");
  }
  stopImmediatePropagation() {
    this.stopPropagation();
  }
  preventDefault() {
    __classPrivateFieldSet(this, _Event_defaultPrevented, true, "f");
  }
  get target() {
    return __classPrivateFieldGet(this, _Event_target, "f");
  }
  get currentTarget() {
    return __classPrivateFieldGet(this, _Event_target, "f");
  }
  get srcElement() {
    return __classPrivateFieldGet(this, _Event_target, "f");
  }
  get type() {
    return __classPrivateFieldGet(this, _Event_type, "f");
  }
  get cancelable() {
    return __classPrivateFieldGet(this, _Event_cancelable, "f");
  }
  get defaultPrevented() {
    return __classPrivateFieldGet(this, _Event_cancelable, "f") && __classPrivateFieldGet(this, _Event_defaultPrevented, "f");
  }
  get timeStamp() {
    return __classPrivateFieldGet(this, _Event_timestamp, "f");
  }
  composedPath() {
    return __classPrivateFieldGet(this, _Event_isBeingDispatched, "f") ? [__classPrivateFieldGet(this, _Event_target, "f")] : [];
  }
  get returnValue() {
    return !__classPrivateFieldGet(this, _Event_cancelable, "f") || !__classPrivateFieldGet(this, _Event_defaultPrevented, "f");
  }
  get bubbles() {
    return __classPrivateFieldGet(this, _Event_bubbles, "f");
  }
  get composed() {
    return __classPrivateFieldGet(this, _Event_composed, "f");
  }
  get eventPhase() {
    return __classPrivateFieldGet(this, _Event_isBeingDispatched, "f") ? _a.AT_TARGET : _a.NONE;
  }
  get cancelBubble() {
    return __classPrivateFieldGet(this, _Event_propagationStopped, "f");
  }
  set cancelBubble(value) {
    if (value) {
      __classPrivateFieldSet(this, _Event_propagationStopped, true, "f");
    }
  }
  stopPropagation() {
    __classPrivateFieldSet(this, _Event_propagationStopped, true, "f");
  }
  get isTrusted() {
    return false;
  }
}, _Event_cancelable = /* @__PURE__ */ new WeakMap(), _Event_bubbles = /* @__PURE__ */ new WeakMap(), _Event_composed = /* @__PURE__ */ new WeakMap(), _Event_defaultPrevented = /* @__PURE__ */ new WeakMap(), _Event_timestamp = /* @__PURE__ */ new WeakMap(), _Event_propagationStopped = /* @__PURE__ */ new WeakMap(), _Event_type = /* @__PURE__ */ new WeakMap(), _Event_target = /* @__PURE__ */ new WeakMap(), _Event_isBeingDispatched = /* @__PURE__ */ new WeakMap(), _a.NONE = NONE, _a.CAPTURING_PHASE = CAPTURING_PHASE, _a.AT_TARGET = AT_TARGET, _a.BUBBLING_PHASE = BUBBLING_PHASE, _a);
Object.defineProperties(EventShim.prototype, {
  initEvent: enumerableProperty,
  stopImmediatePropagation: enumerableProperty,
  preventDefault: enumerableProperty,
  target: enumerableProperty,
  currentTarget: enumerableProperty,
  srcElement: enumerableProperty,
  type: enumerableProperty,
  cancelable: enumerableProperty,
  defaultPrevented: enumerableProperty,
  timeStamp: enumerableProperty,
  composedPath: enumerableProperty,
  returnValue: enumerableProperty,
  bubbles: enumerableProperty,
  composed: enumerableProperty,
  eventPhase: enumerableProperty,
  cancelBubble: enumerableProperty,
  stopPropagation: enumerableProperty,
  isTrusted: enumerableProperty
});
var CustomEventShim = (_b = class CustomEvent2 extends EventShim {
  constructor(type, options = {}) {
    super(type, options);
    _CustomEvent_detail.set(this, void 0);
    __classPrivateFieldSet(this, _CustomEvent_detail, options?.detail ?? null, "f");
  }
  initCustomEvent(_type, _bubbles, _cancelable, _detail) {
    throw new Error("Method not implemented.");
  }
  get detail() {
    return __classPrivateFieldGet(this, _CustomEvent_detail, "f");
  }
}, _CustomEvent_detail = /* @__PURE__ */ new WeakMap(), _b);
Object.defineProperties(CustomEventShim.prototype, {
  detail: enumerableProperty
});
var EventShimWithRealType = EventShim;
var CustomEventShimWithRealType = CustomEventShim;

// node_modules/@lit-labs/ssr-dom-shim/lib/css.js
var _a2;
var MediaListShim = class MediaList extends Array {
  get mediaText() {
    return this.join(", ");
  }
  toString() {
    return this.mediaText;
  }
  appendMedium(medium) {
    if (!this.includes(medium)) {
      this.push(medium);
    }
  }
  deleteMedium(medium) {
    const index = this.indexOf(medium);
    if (index !== -1) {
      this.splice(index, 1);
    }
  }
  item(index) {
    return this[index] ?? null;
  }
};
var StyleSheetShim = class StyleSheet {
  constructor() {
    this.__media = new MediaListShim();
    this.disabled = false;
  }
  get href() {
    return null;
  }
  get media() {
    return this.__media;
  }
  get ownerNode() {
    return null;
  }
  get parentStyleSheet() {
    return null;
  }
  get title() {
    return null;
  }
  get type() {
    return "text/css";
  }
};
var CSSRuleShim = (_a2 = class CSSRule {
  constructor() {
    this.STYLE_RULE = 1;
    this.CHARSET_RULE = 2;
    this.IMPORT_RULE = 3;
    this.MEDIA_RULE = 4;
    this.FONT_FACE_RULE = 5;
    this.PAGE_RULE = 6;
    this.NAMESPACE_RULE = 10;
    this.KEYFRAMES_RULE = 7;
    this.KEYFRAME_RULE = 8;
    this.SUPPORTS_RULE = 12;
    this.COUNTER_STYLE_RULE = 11;
    this.FONT_FEATURE_VALUES_RULE = 14;
    this.MARGIN_RULE = 9;
    this.__parentStyleSheet = null;
    this.cssText = "";
  }
  get parentRule() {
    return null;
  }
  get parentStyleSheet() {
    return this.__parentStyleSheet;
  }
  get type() {
    return 0;
  }
}, _a2.STYLE_RULE = 1, _a2.CHARSET_RULE = 2, _a2.IMPORT_RULE = 3, _a2.MEDIA_RULE = 4, _a2.FONT_FACE_RULE = 5, _a2.PAGE_RULE = 6, _a2.NAMESPACE_RULE = 10, _a2.KEYFRAMES_RULE = 7, _a2.KEYFRAME_RULE = 8, _a2.SUPPORTS_RULE = 12, _a2.COUNTER_STYLE_RULE = 11, _a2.FONT_FEATURE_VALUES_RULE = 14, _a2.MARGIN_RULE = 9, _a2);
var CSSRuleListShim = class CSSRuleList extends Array {
  item(index) {
    return this[index] ?? null;
  }
};
var CSSStyleSheetShim = class CSSStyleSheet2 extends StyleSheetShim {
  constructor() {
    super(...arguments);
    this.__rules = new CSSRuleListShim();
  }
  get cssRules() {
    return this.__rules;
  }
  get ownerRule() {
    return null;
  }
  get rules() {
    return this.cssRules;
  }
  addRule(_selector, _style, _index) {
    throw new Error("Method not implemented.");
  }
  deleteRule(_index) {
    throw new Error("Method not implemented.");
  }
  insertRule(_rule, _index) {
    throw new Error("Method not implemented.");
  }
  removeRule(_index) {
    throw new Error("Method not implemented.");
  }
  replace(text) {
    this.replaceSync(text);
    return Promise.resolve(this);
  }
  replaceSync(text) {
    this.__rules.length = 0;
    const rule = new CSSRuleShim();
    rule.cssText = text;
    this.__rules.push(rule);
  }
};
var CSSStyleSheetShimWithRealType = CSSStyleSheetShim;

// node_modules/@lit-labs/ssr-dom-shim/lib/observers.js
var MutationObserverShim = class MutationObserver {
  constructor(_callback) {
  }
  disconnect() {
  }
  observe(_target, _options) {
  }
  takeRecords() {
    return [];
  }
};
var MutationObserverShimWithRealType = MutationObserverShim;
var ResizeObserverShim = class ResizeObserver2 {
  constructor(_callback) {
  }
  disconnect() {
  }
  observe(_target, _options) {
  }
  unobserve(_target) {
  }
};
var ResizeObserverShimWithRealType = ResizeObserverShim;
var IntersectionObserverShim = class IntersectionObserver2 {
  constructor(_callback, __options) {
    this.__options = __options;
  }
  get root() {
    return this.__options?.root ?? null;
  }
  get rootMargin() {
    return this.__options?.rootMargin ?? "0px 0px 0px 0px";
  }
  get thresholds() {
    return Array.isArray(this.__options?.threshold) ? this.__options.threshold : [this.__options?.threshold ?? 0];
  }
  disconnect() {
  }
  observe(_target) {
  }
  takeRecords() {
    return [];
  }
  unobserve(_target) {
  }
};
var IntersectionObserverShimWithRealType = IntersectionObserverShim;

// node_modules/@lit-labs/ssr-dom-shim/index.js
globalThis.Event ??= EventShimWithRealType;
globalThis.CustomEvent ??= CustomEventShimWithRealType;
var constructionToken = /* @__PURE__ */ Symbol();
var isCaptureEventListener = (options) => typeof options === "boolean" ? options : options?.capture ?? false;
var enumerableProperty2 = { __proto__: null };
enumerableProperty2.enumerable = true;
Object.freeze(enumerableProperty2);
var EventTarget2 = class {
  constructor() {
    this.__eventListeners = /* @__PURE__ */ new Map();
    this.__captureEventListeners = /* @__PURE__ */ new Map();
  }
  addEventListener(type, callback, options) {
    if (callback === void 0 || callback === null) {
      return;
    }
    const eventListenersMap = isCaptureEventListener(options) ? this.__captureEventListeners : this.__eventListeners;
    let eventListeners = eventListenersMap.get(type);
    if (eventListeners === void 0) {
      eventListeners = /* @__PURE__ */ new Map();
      eventListenersMap.set(type, eventListeners);
    } else if (eventListeners.has(callback)) {
      return;
    }
    const normalizedOptions = typeof options === "object" && options ? options : {};
    normalizedOptions.signal?.addEventListener("abort", () => this.removeEventListener(type, callback, options));
    eventListeners.set(callback, normalizedOptions ?? {});
  }
  removeEventListener(type, callback, options) {
    if (callback === void 0 || callback === null) {
      return;
    }
    const eventListenersMap = isCaptureEventListener(options) ? this.__captureEventListeners : this.__eventListeners;
    const eventListeners = eventListenersMap.get(type);
    if (eventListeners !== void 0) {
      eventListeners.delete(callback);
      if (!eventListeners.size) {
        eventListenersMap.delete(type);
      }
    }
  }
  dispatchEvent(event) {
    let composedPath = this.__resolveFullEventPath();
    if (!event.composed && this.__host) {
      composedPath = composedPath.slice(0, composedPath.indexOf(this.__host));
    }
    let stopPropagation = false;
    let stopImmediatePropagation = false;
    let eventPhase = EventShimWithRealType.NONE;
    let target = null;
    let tmpTarget = null;
    let currentTarget = null;
    const originalStopPropagation = event.stopPropagation;
    const originalStopImmediatePropagation = event.stopImmediatePropagation;
    Object.defineProperties(event, {
      target: {
        get() {
          return target ?? tmpTarget;
        },
        ...enumerableProperty2
      },
      srcElement: {
        get() {
          return event.target;
        },
        ...enumerableProperty2
      },
      currentTarget: {
        get() {
          return currentTarget;
        },
        ...enumerableProperty2
      },
      eventPhase: {
        get() {
          return eventPhase;
        },
        ...enumerableProperty2
      },
      composedPath: {
        value: () => composedPath,
        ...enumerableProperty2
      },
      stopPropagation: {
        value: () => {
          stopPropagation = true;
          originalStopPropagation.call(event);
        },
        ...enumerableProperty2
      },
      stopImmediatePropagation: {
        value: () => {
          stopImmediatePropagation = true;
          originalStopImmediatePropagation.call(event);
        },
        ...enumerableProperty2
      }
    });
    const invokeEventListener = (listener, options, eventListenerMap) => {
      if (typeof listener === "function") {
        listener(event);
      } else if (typeof listener?.handleEvent === "function") {
        listener.handleEvent(event);
      }
      if (options.once) {
        eventListenerMap.delete(listener);
      }
    };
    const finishDispatch = () => {
      currentTarget = null;
      eventPhase = EventShimWithRealType.NONE;
      return !event.defaultPrevented;
    };
    const captureEventPath = composedPath.slice().reverse();
    target = !this.__host || !event.composed ? this : null;
    const retarget = (eventTargets) => {
      tmpTarget = this;
      while (tmpTarget.__host && eventTargets.includes(tmpTarget.__host)) {
        tmpTarget = tmpTarget.__host;
      }
    };
    for (const eventTarget of captureEventPath) {
      if (!target && (!tmpTarget || tmpTarget === eventTarget.__host)) {
        retarget(captureEventPath.slice(captureEventPath.indexOf(eventTarget)));
      }
      currentTarget = eventTarget;
      eventPhase = eventTarget === event.target ? EventShimWithRealType.AT_TARGET : EventShimWithRealType.CAPTURING_PHASE;
      const captureEventListeners = eventTarget.__captureEventListeners.get(event.type);
      if (captureEventListeners) {
        for (const [listener, options] of captureEventListeners) {
          invokeEventListener(listener, options, captureEventListeners);
          if (stopImmediatePropagation) {
            return finishDispatch();
          }
        }
      }
      if (stopPropagation) {
        return finishDispatch();
      }
    }
    const bubbleEventPath = event.bubbles ? composedPath : [this];
    tmpTarget = null;
    for (const eventTarget of bubbleEventPath) {
      if (!target && (!tmpTarget || eventTarget === tmpTarget.__host)) {
        retarget(bubbleEventPath.slice(0, bubbleEventPath.indexOf(eventTarget) + 1));
      }
      currentTarget = eventTarget;
      eventPhase = eventTarget === event.target ? EventShimWithRealType.AT_TARGET : EventShimWithRealType.BUBBLING_PHASE;
      const eventListeners = eventTarget.__eventListeners.get(event.type);
      if (eventListeners) {
        for (const [listener, options] of eventListeners) {
          invokeEventListener(listener, options, eventListeners);
          if (stopImmediatePropagation) {
            return finishDispatch();
          }
        }
      }
      if (stopPropagation) {
        return finishDispatch();
      }
    }
    return finishDispatch();
  }
  __resolveFullEventPath() {
    if (this.__eventPathCache) {
      return this.__eventPathCache;
    } else if (!this.__eventTargetParent) {
      return this.__eventPathCache = [this, documentShim, windowShim];
    } else {
      return this.__eventPathCache = [
        this,
        ...this.__eventTargetParent.__resolveFullEventPath()
      ];
    }
  }
};
var EventTargetShimWithRealType = EventTarget2;
var attributes = /* @__PURE__ */ new WeakMap();
var attributesForElement = (element) => {
  let attrs = attributes.get(element);
  if (attrs === void 0) {
    attributes.set(element, attrs = /* @__PURE__ */ new Map());
  }
  return attrs;
};
var NodeShim = class Node2 extends EventTarget2 {
  getRootNode(options) {
    if (options?.composed) {
      return document2;
    }
    const host = this.__host;
    return host?.__shadowRoot ?? document2;
  }
};
var DocumentShim = class Document2 extends NodeShim {
  get adoptedStyleSheets() {
    return [];
  }
  createTreeWalker() {
    return {};
  }
  createTextNode() {
    return {};
  }
  createElement() {
    return {};
  }
};
var DocumentShimWithRealType = DocumentShim;
var documentShim = new DocumentShim();
var document2 = documentShim;
var WindowShim = class Window extends NodeShim {
  constructor(token) {
    super();
    if (token !== constructionToken) {
      throw new TypeError("Illegal constructor");
    }
    Object.assign(this, globalThis, {
      CustomElementRegistry,
      customElements: customElements2,
      document: document2,
      Document: DocumentShim,
      Element: ElementShim,
      EventTarget: EventTarget2,
      HTMLElement: HTMLElementShim,
      Node: NodeShim,
      ShadowRoot: ShadowRootShim,
      window: this,
      Window: WindowShim
    });
  }
};
var ElementShim = class Element2 extends NodeShim {
  constructor() {
    super(...arguments);
    this.__shadowRootMode = null;
    this.__shadowRoot = null;
    this.__internals = null;
  }
  get attributes() {
    return Array.from(attributesForElement(this)).map(([name, value]) => ({
      name,
      value
    }));
  }
  get shadowRoot() {
    if (this.__shadowRootMode === "closed") {
      return null;
    }
    return this.__shadowRoot;
  }
  get localName() {
    return this.constructor.__localName;
  }
  get tagName() {
    return this.localName?.toUpperCase();
  }
  setAttribute(name, value) {
    attributesForElement(this).set(name, String(value));
  }
  removeAttribute(name) {
    attributesForElement(this).delete(name);
  }
  toggleAttribute(name, force) {
    if (this.hasAttribute(name)) {
      if (force === void 0 || !force) {
        this.removeAttribute(name);
        return false;
      }
    } else {
      if (force === void 0 || force) {
        this.setAttribute(name, "");
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
  hasAttribute(name) {
    return attributesForElement(this).has(name);
  }
  attachShadow(init) {
    this.__shadowRootMode = init.mode;
    const shadowRoot = new ShadowRootShim(constructionToken, init);
    shadowRoot.__eventTargetParent = this;
    shadowRoot.__host = this;
    return this.__shadowRoot = shadowRoot;
  }
  attachInternals() {
    if (this.__internals !== null) {
      throw new Error(`Failed to execute 'attachInternals' on 'HTMLElement': ElementInternals for the specified element was already attached.`);
    }
    const internals2 = new ElementInternalsShim(this);
    this.__internals = internals2;
    return internals2;
  }
  getAttribute(name) {
    const value = attributesForElement(this).get(name);
    return value ?? null;
  }
};
var ElementShimWithRealType = ElementShim;
var HTMLElementShim = class HTMLElement2 extends ElementShim {
};
var HTMLElementShimWithRealType = HTMLElementShim;
var HTMLSlotElementShim = class HTMLSlotElement extends HTMLElementShim {
  get localName() {
    return "slot";
  }
};
var HTMLSlotElementShimWithRealType = HTMLSlotElementShim;
var ShadowRootShim = class ShadowRoot2 extends NodeShim {
  get host() {
    return this.__host;
  }
  constructor(constructionToken2, init) {
    super();
    if (constructionToken2 !== constructionToken2) {
      throw new TypeError("Illegal constructor");
    }
    this.mode = init.mode;
  }
};
var ShadowRootShimWithRealType = ShadowRootShim;
globalThis.litServerRoot ??= Object.defineProperty(new HTMLElementShimWithRealType(), "localName", {
  // Patch localName (and tagName) to return a unique name.
  get() {
    return "lit-server-root";
  }
});
function promiseWithResolvers() {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}
var CustomElementRegistry = class {
  constructor() {
    this.__definitions = /* @__PURE__ */ new Map();
    this.__reverseDefinitions = /* @__PURE__ */ new Map();
    this.__pendingWhenDefineds = /* @__PURE__ */ new Map();
  }
  define(name, ctor) {
    if (this.__definitions.has(name)) {
      if (process.env.NODE_ENV === "development") {
        console.warn(`'CustomElementRegistry' already has "${name}" defined. This may have been caused by live reload or hot module replacement in which case it can be safely ignored.
Make sure to test your application with a production build as repeat registrations will throw in production.`);
      } else {
        throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the name "${name}" has already been used with this registry`);
      }
    }
    if (this.__reverseDefinitions.has(ctor)) {
      throw new Error(`Failed to execute 'define' on 'CustomElementRegistry': the constructor has already been used with this registry for the tag name ${this.__reverseDefinitions.get(ctor)}`);
    }
    ctor.__localName = name;
    this.__definitions.set(name, {
      ctor,
      // Note it's important we read `observedAttributes` in case it is a getter
      // with side-effects, as is the case in Lit, where it triggers class
      // finalization.
      //
      // TODO(aomarks) To be spec compliant, we should also capture the
      // registration-time lifecycle methods like `connectedCallback`. For them
      // to be actually accessible to e.g. the Lit SSR element renderer, though,
      // we'd need to introduce a new API for accessing them (since `get` only
      // returns the constructor).
      observedAttributes: ctor.observedAttributes ?? []
    });
    this.__reverseDefinitions.set(ctor, name);
    this.__pendingWhenDefineds.get(name)?.resolve(ctor);
    this.__pendingWhenDefineds.delete(name);
  }
  get(name) {
    const definition = this.__definitions.get(name);
    return definition?.ctor;
  }
  getName(ctor) {
    return this.__reverseDefinitions.get(ctor) ?? null;
  }
  initialize(_root) {
    throw new Error(`customElements.initialize is not currently supported in SSR. Please file a bug if you need it.`);
  }
  upgrade(_element) {
    throw new Error(`customElements.upgrade is not currently supported in SSR. Please file a bug if you need it.`);
  }
  async whenDefined(name) {
    const definition = this.__definitions.get(name);
    if (definition) {
      return definition.ctor;
    }
    let withResolvers = this.__pendingWhenDefineds.get(name);
    if (!withResolvers) {
      withResolvers = promiseWithResolvers();
      this.__pendingWhenDefineds.set(name, withResolvers);
    }
    return withResolvers.promise;
  }
};
var CustomElementRegistryShimWithRealType = CustomElementRegistry;
var customElements2 = new CustomElementRegistryShimWithRealType();
var windowShim = new WindowShim(constructionToken);

// node_modules/@lit-labs/ssr-dom-shim/register-css-hook.js
try {
  const inlineCSS = "data:text/css;base64,cHt0b3A6MDt9";
  const cssImportsSupported = await import(inlineCSS, { with: { type: "css" } }).then(() => true).catch(() => false);
  const nodeModule = cssImportsSupported ? null : await import("node:module");
  if (nodeModule && "register" in nodeModule.default) {
    globalThis.CSSStyleSheet ??= CSSStyleSheetShimWithRealType;
    nodeModule.default.register("./lib/css-hook.js", {
      parentURL: import.meta.url
    });
  }
} catch {
}

// node_modules/node-fetch/src/index.js
import http2 from "node:http";
import https from "node:https";
import zlib from "node:zlib";
import Stream2, { PassThrough as PassThrough2, pipeline as pump } from "node:stream";
import { Buffer as Buffer3 } from "node:buffer";

// node_modules/data-uri-to-buffer/dist/index.js
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i8 = 1; i8 < meta.length; i8++) {
    if (meta[i8] === "base64") {
      base64 = true;
    } else if (meta[i8]) {
      typeFull += `;${meta[i8]}`;
      if (meta[i8].indexOf("charset=") === 0) {
        charset = meta[i8].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var dist_default = dataUriToBuffer;

// node_modules/node-fetch/src/body.js
init_fetch_blob();
init_esm_min();
import Stream, { PassThrough } from "node:stream";
import { types, deprecate, promisify } from "node:util";
import { Buffer as Buffer2 } from "node:buffer";

// node_modules/node-fetch/src/errors/base.js
var FetchBaseError = class extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};

// node_modules/node-fetch/src/errors/fetch-error.js
var FetchError = class extends FetchBaseError {
  /**
   * @param  {string} message -      Error message for human
   * @param  {string} [type] -        Error type for machine
   * @param  {SystemError} [systemError] - For Node.js system error
   */
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
};

// node_modules/node-fetch/src/utils/is.js
var NAME = Symbol.toStringTag;
var isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
var isBlob = (object) => {
  return object && typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
var isAbortSignal = (object) => {
  return typeof object === "object" && (object[NAME] === "AbortSignal" || object[NAME] === "EventTarget");
};
var isDomainOrSubdomain = (destination, original) => {
  const orig = new URL(original).hostname;
  const dest = new URL(destination).hostname;
  return orig === dest || orig.endsWith(`.${dest}`);
};
var isSameProtocol = (destination, original) => {
  const orig = new URL(original).protocol;
  const dest = new URL(destination).protocol;
  return orig === dest;
};

// node_modules/node-fetch/src/body.js
var pipeline = promisify(Stream.pipeline);
var INTERNALS = /* @__PURE__ */ Symbol("Body internals");
var Body = class {
  constructor(body, {
    size: size2 = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = Buffer2.from(body.toString());
    } else if (isBlob(body)) {
    } else if (Buffer2.isBuffer(body)) {
    } else if (types.isAnyArrayBuffer(body)) {
      body = Buffer2.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer2.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof Stream) {
    } else if (body instanceof FormData) {
      body = formDataToBlob(body);
      boundary = body.type.split("=")[1];
    } else {
      body = Buffer2.from(String(body));
    }
    let stream = body;
    if (Buffer2.isBuffer(body)) {
      stream = Stream.Readable.from(body);
    } else if (isBlob(body)) {
      stream = Stream.Readable.from(body.stream());
    }
    this[INTERNALS] = {
      body,
      stream,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size2;
    if (body instanceof Stream) {
      body.on("error", (error_) => {
        const error = error_ instanceof FetchBaseError ? error_ : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${error_.message}`, "system", error_);
        this[INTERNALS].error = error;
      });
    }
  }
  get body() {
    return this[INTERNALS].stream;
  }
  get bodyUsed() {
    return this[INTERNALS].disturbed;
  }
  /**
   * Decode response as ArrayBuffer
   *
   * @return  Promise
   */
  async arrayBuffer() {
    const { buffer, byteOffset, byteLength } = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async formData() {
    const ct = this.headers.get("content-type");
    if (ct.startsWith("application/x-www-form-urlencoded")) {
      const formData = new FormData();
      const parameters = new URLSearchParams(await this.text());
      for (const [name, value] of parameters) {
        formData.append(name, value);
      }
      return formData;
    }
    const { toFormData: toFormData2 } = await Promise.resolve().then(() => (init_multipart_parser(), multipart_parser_exports));
    return toFormData2(this.body, ct);
  }
  /**
   * Return raw response as Blob
   *
   * @return Promise
   */
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS].body && this[INTERNALS].body.type || "";
    const buf = await this.arrayBuffer();
    return new fetch_blob_default([buf], {
      type: ct
    });
  }
  /**
   * Decode response as json
   *
   * @return  Promise
   */
  async json() {
    const text = await this.text();
    return JSON.parse(text);
  }
  /**
   * Decode response as text
   *
   * @return  Promise
   */
  async text() {
    const buffer = await consumeBody(this);
    return new TextDecoder().decode(buffer);
  }
  /**
   * Decode response as buffer (non-spec api)
   *
   * @return  Promise
   */
  buffer() {
    return consumeBody(this);
  }
};
Body.prototype.buffer = deprecate(Body.prototype.buffer, "Please use 'response.arrayBuffer()' instead of 'response.buffer()'", "node-fetch#buffer");
Object.defineProperties(Body.prototype, {
  body: { enumerable: true },
  bodyUsed: { enumerable: true },
  arrayBuffer: { enumerable: true },
  blob: { enumerable: true },
  json: { enumerable: true },
  text: { enumerable: true },
  data: { get: deprecate(
    () => {
    },
    "data doesn't exist, use json(), text(), arrayBuffer(), or body instead",
    "https://github.com/node-fetch/node-fetch/issues/1000 (response)"
  ) }
});
async function consumeBody(data) {
  if (data[INTERNALS].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS].disturbed = true;
  if (data[INTERNALS].error) {
    throw data[INTERNALS].error;
  }
  const { body } = data;
  if (body === null) {
    return Buffer2.alloc(0);
  }
  if (!(body instanceof Stream)) {
    return Buffer2.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const error = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(error);
        throw error;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error) {
    const error_ = error instanceof FetchBaseError ? error : new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error.message}`, "system", error);
    throw error_;
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c6) => typeof c6 === "string")) {
        return Buffer2.from(accum.join(""));
      }
      return Buffer2.concat(accum, accumBytes);
    } catch (error) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error.message}`, "system", error);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var clone = (instance, highWaterMark) => {
  let p1;
  let p22;
  let { body } = instance[INTERNALS];
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof Stream && typeof body.getBoundary !== "function") {
    p1 = new PassThrough({ highWaterMark });
    p22 = new PassThrough({ highWaterMark });
    body.pipe(p1);
    body.pipe(p22);
    instance[INTERNALS].stream = p1;
    body = p22;
  }
  return body;
};
var getNonSpecFormDataBoundary = deprecate(
  (body) => body.getBoundary(),
  "form-data doesn't follow the spec and requires special treatment. Use alternative package",
  "https://github.com/node-fetch/node-fetch/issues/1167"
);
var extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (Buffer2.isBuffer(body) || types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body instanceof FormData) {
    return `multipart/form-data; boundary=${request[INTERNALS].boundary}`;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${getNonSpecFormDataBoundary(body)}`;
  }
  if (body instanceof Stream) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
var getTotalBytes = (request) => {
  const { body } = request[INTERNALS];
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (Buffer2.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  return null;
};
var writeToStream = async (dest, { body }) => {
  if (body === null) {
    dest.end();
  } else {
    await pipeline(body, dest);
  }
};

// node_modules/node-fetch/src/headers.js
import { types as types2 } from "node:util";
import http from "node:http";
var validateHeaderName = typeof http.validateHeaderName === "function" ? http.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const error = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(error, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
    throw error;
  }
};
var validateHeaderValue = typeof http.validateHeaderValue === "function" ? http.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const error = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(error, "code", { value: "ERR_INVALID_CHAR" });
    throw error;
  }
};
var Headers = class _Headers extends URLSearchParams {
  /**
   * Headers class
   *
   * @constructor
   * @param {HeadersInit} [init] - Response headers
   */
  constructor(init) {
    let result = [];
    if (init instanceof _Headers) {
      const raw = init.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init == null) {
    } else if (typeof init === "object" && !types2.isBoxedPrimitive(init)) {
      const method = init[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init].map((pair) => {
          if (typeof pair !== "object" || types2.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p5, receiver) {
        switch (p5) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName(name);
              validateHeaderValue(name, String(value));
              return URLSearchParams.prototype[p5].call(
                target,
                String(name).toLowerCase(),
                String(value)
              );
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName(name);
              return URLSearchParams.prototype[p5].call(
                target,
                String(name).toLowerCase()
              );
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p5, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback, thisArg = void 0) {
    for (const name of this.keys()) {
      Reflect.apply(callback, thisArg, [this.get(name), name, this]);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  /**
   * @type {() => IterableIterator<[string, string]>}
   */
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  /**
   * Node-fetch non-spec method
   * returning all headers and their values as array
   * @returns {Record<string, string[]>}
   */
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  /**
   * For better console.log(headers) and also to convert Headers into Node.js Request compatible format
   */
  [/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
};
Object.defineProperties(
  Headers.prototype,
  ["get", "entries", "forEach", "values"].reduce((result, property) => {
    result[property] = { enumerable: true };
    return result;
  }, {})
);
function fromRawHeaders(headers = []) {
  return new Headers(
    headers.reduce((result, value, index, array) => {
      if (index % 2 === 0) {
        result.push(array.slice(index, index + 2));
      }
      return result;
    }, []).filter(([name, value]) => {
      try {
        validateHeaderName(name);
        validateHeaderValue(name, String(value));
        return true;
      } catch {
        return false;
      }
    })
  );
}

// node_modules/node-fetch/src/utils/is-redirect.js
var redirectStatus = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
var isRedirect = (code) => {
  return redirectStatus.has(code);
};

// node_modules/node-fetch/src/response.js
var INTERNALS2 = /* @__PURE__ */ Symbol("Response internals");
var Response = class _Response extends Body {
  constructor(body = null, options = {}) {
    super(body, options);
    const status = options.status != null ? options.status : 200;
    const headers = new Headers(options.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS2] = {
      type: "default",
      url: options.url,
      status,
      statusText: options.statusText || "",
      headers,
      counter: options.counter,
      highWaterMark: options.highWaterMark
    };
  }
  get type() {
    return this[INTERNALS2].type;
  }
  get url() {
    return this[INTERNALS2].url || "";
  }
  get status() {
    return this[INTERNALS2].status;
  }
  /**
   * Convenience property representing if the request ended normally
   */
  get ok() {
    return this[INTERNALS2].status >= 200 && this[INTERNALS2].status < 300;
  }
  get redirected() {
    return this[INTERNALS2].counter > 0;
  }
  get statusText() {
    return this[INTERNALS2].statusText;
  }
  get headers() {
    return this[INTERNALS2].headers;
  }
  get highWaterMark() {
    return this[INTERNALS2].highWaterMark;
  }
  /**
   * Clone this response
   *
   * @return  Response
   */
  clone() {
    return new _Response(clone(this, this.highWaterMark), {
      type: this.type,
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size,
      highWaterMark: this.highWaterMark
    });
  }
  /**
   * @param {string} url    The URL that the new response is to originate from.
   * @param {number} status An optional status code for the response (e.g., 302.)
   * @returns {Response}    A Response object.
   */
  static redirect(url, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new _Response(null, {
      headers: {
        location: new URL(url).toString()
      },
      status
    });
  }
  static error() {
    const response = new _Response(null, { status: 0, statusText: "" });
    response[INTERNALS2].type = "error";
    return response;
  }
  static json(data = void 0, init = {}) {
    const body = JSON.stringify(data);
    if (body === void 0) {
      throw new TypeError("data is not JSON serializable");
    }
    const headers = new Headers(init && init.headers);
    if (!headers.has("content-type")) {
      headers.set("content-type", "application/json");
    }
    return new _Response(body, {
      ...init,
      headers
    });
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
Object.defineProperties(Response.prototype, {
  type: { enumerable: true },
  url: { enumerable: true },
  status: { enumerable: true },
  ok: { enumerable: true },
  redirected: { enumerable: true },
  statusText: { enumerable: true },
  headers: { enumerable: true },
  clone: { enumerable: true }
});

// node_modules/node-fetch/src/request.js
import { format as formatUrl } from "node:url";
import { deprecate as deprecate2 } from "node:util";

// node_modules/node-fetch/src/utils/get-search.js
var getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash.length] === "?" ? "?" : "";
};

// node_modules/node-fetch/src/utils/referrer.js
import { isIP } from "node:net";
function stripURLForUseAsAReferrer(url, originOnly = false) {
  if (url == null) {
    return "no-referrer";
  }
  url = new URL(url);
  if (/^(about|blob|data):$/.test(url.protocol)) {
    return "no-referrer";
  }
  url.username = "";
  url.password = "";
  url.hash = "";
  if (originOnly) {
    url.pathname = "";
    url.search = "";
  }
  return url;
}
var ReferrerPolicy = /* @__PURE__ */ new Set([
  "",
  "no-referrer",
  "no-referrer-when-downgrade",
  "same-origin",
  "origin",
  "strict-origin",
  "origin-when-cross-origin",
  "strict-origin-when-cross-origin",
  "unsafe-url"
]);
var DEFAULT_REFERRER_POLICY = "strict-origin-when-cross-origin";
function validateReferrerPolicy(referrerPolicy) {
  if (!ReferrerPolicy.has(referrerPolicy)) {
    throw new TypeError(`Invalid referrerPolicy: ${referrerPolicy}`);
  }
  return referrerPolicy;
}
function isOriginPotentiallyTrustworthy(url) {
  if (/^(http|ws)s:$/.test(url.protocol)) {
    return true;
  }
  const hostIp = url.host.replace(/(^\[)|(]$)/g, "");
  const hostIPVersion = isIP(hostIp);
  if (hostIPVersion === 4 && /^127\./.test(hostIp)) {
    return true;
  }
  if (hostIPVersion === 6 && /^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(hostIp)) {
    return true;
  }
  if (url.host === "localhost" || url.host.endsWith(".localhost")) {
    return false;
  }
  if (url.protocol === "file:") {
    return true;
  }
  return false;
}
function isUrlPotentiallyTrustworthy(url) {
  if (/^about:(blank|srcdoc)$/.test(url)) {
    return true;
  }
  if (url.protocol === "data:") {
    return true;
  }
  if (/^(blob|filesystem):$/.test(url.protocol)) {
    return true;
  }
  return isOriginPotentiallyTrustworthy(url);
}
function determineRequestsReferrer(request, { referrerURLCallback, referrerOriginCallback } = {}) {
  if (request.referrer === "no-referrer" || request.referrerPolicy === "") {
    return null;
  }
  const policy2 = request.referrerPolicy;
  if (request.referrer === "about:client") {
    return "no-referrer";
  }
  const referrerSource = request.referrer;
  let referrerURL = stripURLForUseAsAReferrer(referrerSource);
  let referrerOrigin = stripURLForUseAsAReferrer(referrerSource, true);
  if (referrerURL.toString().length > 4096) {
    referrerURL = referrerOrigin;
  }
  if (referrerURLCallback) {
    referrerURL = referrerURLCallback(referrerURL);
  }
  if (referrerOriginCallback) {
    referrerOrigin = referrerOriginCallback(referrerOrigin);
  }
  const currentURL = new URL(request.url);
  switch (policy2) {
    case "no-referrer":
      return "no-referrer";
    case "origin":
      return referrerOrigin;
    case "unsafe-url":
      return referrerURL;
    case "strict-origin":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin.toString();
    case "strict-origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerOrigin;
    case "same-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return "no-referrer";
    case "origin-when-cross-origin":
      if (referrerURL.origin === currentURL.origin) {
        return referrerURL;
      }
      return referrerOrigin;
    case "no-referrer-when-downgrade":
      if (isUrlPotentiallyTrustworthy(referrerURL) && !isUrlPotentiallyTrustworthy(currentURL)) {
        return "no-referrer";
      }
      return referrerURL;
    default:
      throw new TypeError(`Invalid referrerPolicy: ${policy2}`);
  }
}
function parseReferrerPolicyFromHeader(headers) {
  const policyTokens = (headers.get("referrer-policy") || "").split(/[,\s]+/);
  let policy2 = "";
  for (const token of policyTokens) {
    if (token && ReferrerPolicy.has(token)) {
      policy2 = token;
    }
  }
  return policy2;
}

// node_modules/node-fetch/src/request.js
var INTERNALS3 = /* @__PURE__ */ Symbol("Request internals");
var isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS3] === "object";
};
var doBadDataWarn = deprecate2(
  () => {
  },
  ".data is not a valid RequestInit property, use .body instead",
  "https://github.com/node-fetch/node-fetch/issues/1000 (request)"
);
var Request = class _Request extends Body {
  constructor(input, init = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    if (parsedURL.username !== "" || parsedURL.password !== "") {
      throw new TypeError(`${parsedURL} is an url with embedded credentials.`);
    }
    let method = init.method || input.method || "GET";
    if (/^(delete|get|head|options|post|put)$/i.test(method)) {
      method = method.toUpperCase();
    }
    if (!isRequest(init) && "data" in init) {
      doBadDataWarn();
    }
    if ((init.body != null || isRequest(input) && input.body !== null) && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init.body ? init.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init.size || input.size || 0
    });
    const headers = new Headers(init.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.set("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init) {
      signal = init.signal;
    }
    if (signal != null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");
    }
    let referrer = init.referrer == null ? input.referrer : init.referrer;
    if (referrer === "") {
      referrer = "no-referrer";
    } else if (referrer) {
      const parsedReferrer = new URL(referrer);
      referrer = /^about:(\/\/)?client$/.test(parsedReferrer) ? "client" : parsedReferrer;
    } else {
      referrer = void 0;
    }
    this[INTERNALS3] = {
      method,
      redirect: init.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal,
      referrer
    };
    this.follow = init.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init.follow;
    this.compress = init.compress === void 0 ? input.compress === void 0 ? true : input.compress : init.compress;
    this.counter = init.counter || input.counter || 0;
    this.agent = init.agent || input.agent;
    this.highWaterMark = init.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init.insecureHTTPParser || input.insecureHTTPParser || false;
    this.referrerPolicy = init.referrerPolicy || input.referrerPolicy || "";
  }
  /** @returns {string} */
  get method() {
    return this[INTERNALS3].method;
  }
  /** @returns {string} */
  get url() {
    return formatUrl(this[INTERNALS3].parsedURL);
  }
  /** @returns {Headers} */
  get headers() {
    return this[INTERNALS3].headers;
  }
  get redirect() {
    return this[INTERNALS3].redirect;
  }
  /** @returns {AbortSignal} */
  get signal() {
    return this[INTERNALS3].signal;
  }
  // https://fetch.spec.whatwg.org/#dom-request-referrer
  get referrer() {
    if (this[INTERNALS3].referrer === "no-referrer") {
      return "";
    }
    if (this[INTERNALS3].referrer === "client") {
      return "about:client";
    }
    if (this[INTERNALS3].referrer) {
      return this[INTERNALS3].referrer.toString();
    }
    return void 0;
  }
  get referrerPolicy() {
    return this[INTERNALS3].referrerPolicy;
  }
  set referrerPolicy(referrerPolicy) {
    this[INTERNALS3].referrerPolicy = validateReferrerPolicy(referrerPolicy);
  }
  /**
   * Clone this request
   *
   * @return  Request
   */
  clone() {
    return new _Request(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
Object.defineProperties(Request.prototype, {
  method: { enumerable: true },
  url: { enumerable: true },
  headers: { enumerable: true },
  redirect: { enumerable: true },
  clone: { enumerable: true },
  signal: { enumerable: true },
  referrer: { enumerable: true },
  referrerPolicy: { enumerable: true }
});
var getNodeRequestOptions = (request) => {
  const { parsedURL } = request[INTERNALS3];
  const headers = new Headers(request[INTERNALS3].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (request.referrerPolicy === "") {
    request.referrerPolicy = DEFAULT_REFERRER_POLICY;
  }
  if (request.referrer && request.referrer !== "no-referrer") {
    request[INTERNALS3].referrer = determineRequestsReferrer(request);
  } else {
    request[INTERNALS3].referrer = "no-referrer";
  }
  if (request[INTERNALS3].referrer instanceof URL) {
    headers.set("Referer", request.referrer);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip, deflate, br");
  }
  let { agent } = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  const search = getSearch(parsedURL);
  const options = {
    // Overwrite search to retain trailing ? (issue #776)
    path: parsedURL.pathname + search,
    // The following options are not expressed in the URL
    method: request.method,
    headers: headers[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return {
    /** @type {URL} */
    parsedURL,
    options
  };
};

// node_modules/node-fetch/src/errors/abort-error.js
var AbortError = class extends FetchBaseError {
  constructor(message, type = "aborted") {
    super(message, type);
  }
};

// node_modules/node-fetch/src/index.js
init_esm_min();
init_from();
var supportedSchemas = /* @__PURE__ */ new Set(["data:", "http:", "https:"]);
async function fetch2(url, options_) {
  return new Promise((resolve, reject) => {
    const request = new Request(url, options_);
    const { parsedURL, options } = getNodeRequestOptions(request);
    if (!supportedSchemas.has(parsedURL.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${parsedURL.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (parsedURL.protocol === "data:") {
      const data = dist_default(request.url);
      const response2 = new Response(data, { headers: { "Content-Type": data.typeFull } });
      resolve(response2);
      return;
    }
    const send2 = (parsedURL.protocol === "https:" ? https : http2).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error = new AbortError("The operation was aborted.");
      reject(error);
      if (request.body && request.body instanceof Stream2.Readable) {
        request.body.destroy(error);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send2(parsedURL.toString(), options);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (error) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${error.message}`, "system", error));
      finalize();
    });
    fixResponseChunkedTransferBadEnding(request_, (error) => {
      if (response && response.body) {
        response.body.destroy(error);
      }
    });
    if (process.version < "v14") {
      request_.on("socket", (s8) => {
        let endedWithEventsCount;
        s8.prependListener("end", () => {
          endedWithEventsCount = s8._eventsCount;
        });
        s8.prependListener("close", (hadError) => {
          if (response && endedWithEventsCount < s8._eventsCount && !hadError) {
            const error = new Error("Premature close");
            error.code = "ERR_STREAM_PREMATURE_CLOSE";
            response.body.emit("error", error);
          }
        });
      });
    }
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        let locationURL = null;
        try {
          locationURL = location === null ? null : new URL(location, request.url);
        } catch {
          if (request.redirect !== "manual") {
            reject(new FetchError(`uri requested responds with an invalid redirect URL: ${location}`, "invalid-redirect"));
            finalize();
            return;
          }
        }
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: clone(request),
              signal: request.signal,
              size: request.size,
              referrer: request.referrer,
              referrerPolicy: request.referrerPolicy
            };
            if (!isDomainOrSubdomain(request.url, locationURL) || !isSameProtocol(request.url, locationURL)) {
              for (const name of ["authorization", "www-authenticate", "cookie", "cookie2"]) {
                requestOptions.headers.delete(name);
              }
            }
            if (response_.statusCode !== 303 && request.body && options_.body instanceof Stream2.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            const responseReferrerPolicy = parseReferrerPolicyFromHeader(headers);
            if (responseReferrerPolicy) {
              requestOptions.referrerPolicy = responseReferrerPolicy;
            }
            resolve(fetch2(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
          default:
            return reject(new TypeError(`Redirect option '${request.redirect}' is not a valid value of RequestRedirect`));
        }
      }
      if (signal) {
        response_.once("end", () => {
          signal.removeEventListener("abort", abortAndFinalize);
        });
      }
      let body = pump(response_, new PassThrough2(), (error) => {
        if (error) {
          reject(error);
        }
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response(body, responseOptions);
        resolve(response);
        return;
      }
      const zlibOptions = {
        flush: zlib.Z_SYNC_FLUSH,
        finishFlush: zlib.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = pump(body, zlib.createGunzip(zlibOptions), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response(body, responseOptions);
        resolve(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = pump(response_, new PassThrough2(), (error) => {
          if (error) {
            reject(error);
          }
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = pump(body, zlib.createInflate(), (error) => {
              if (error) {
                reject(error);
              }
            });
          } else {
            body = pump(body, zlib.createInflateRaw(), (error) => {
              if (error) {
                reject(error);
              }
            });
          }
          response = new Response(body, responseOptions);
          resolve(response);
        });
        raw.once("end", () => {
          if (!response) {
            response = new Response(body, responseOptions);
            resolve(response);
          }
        });
        return;
      }
      if (codings === "br") {
        body = pump(body, zlib.createBrotliDecompress(), (error) => {
          if (error) {
            reject(error);
          }
        });
        response = new Response(body, responseOptions);
        resolve(response);
        return;
      }
      response = new Response(body, responseOptions);
      resolve(response);
    });
    writeToStream(request_, request).catch(reject);
  });
}
function fixResponseChunkedTransferBadEnding(request, errorCallback) {
  const LAST_CHUNK = Buffer3.from("0\r\n\r\n");
  let isChunkedTransfer = false;
  let properLastChunkReceived = false;
  let previousChunk;
  request.on("response", (response) => {
    const { headers } = response;
    isChunkedTransfer = headers["transfer-encoding"] === "chunked" && !headers["content-length"];
  });
  request.on("socket", (socket) => {
    const onSocketClose = () => {
      if (isChunkedTransfer && !properLastChunkReceived) {
        const error = new Error("Premature close");
        error.code = "ERR_STREAM_PREMATURE_CLOSE";
        errorCallback(error);
      }
    };
    const onData = (buf) => {
      properLastChunkReceived = Buffer3.compare(buf.slice(-5), LAST_CHUNK) === 0;
      if (!properLastChunkReceived && previousChunk) {
        properLastChunkReceived = Buffer3.compare(previousChunk.slice(-3), LAST_CHUNK.slice(0, 3)) === 0 && Buffer3.compare(buf.slice(-2), LAST_CHUNK.slice(3)) === 0;
      }
      previousChunk = buf;
    };
    socket.prependListener("close", onSocketClose);
    socket.on("data", onData);
    request.on("close", () => {
      socket.removeListener("close", onSocketClose);
      socket.removeListener("data", onData);
    });
  });
}

// node_modules/@lit-labs/ssr/lib/dom-shim.js
var getWindow = ({ includeJSBuiltIns = false, props = {} }) => {
  const window2 = {
    EventTarget: EventTargetShimWithRealType,
    Event: globalThis.Event ?? EventShimWithRealType,
    CustomEvent: globalThis.CustomEvent ?? CustomEventShimWithRealType,
    Element: ElementShimWithRealType,
    HTMLElement: HTMLElementShimWithRealType,
    Document: DocumentShimWithRealType,
    document: document2,
    CSSStyleSheet: CSSStyleSheetShimWithRealType,
    ShadowRoot: ShadowRootShimWithRealType,
    CustomElementRegistry: CustomElementRegistryShimWithRealType,
    customElements: new CustomElementRegistryShimWithRealType(),
    atob(s8) {
      return Buffer.from(s8, "base64").toString("binary");
    },
    btoa(s8) {
      return Buffer.from(s8, "binary").toString("base64");
    },
    fetch: (url, init) => (
      // TODO(aomarks) The typings from node-fetch are wrong because they don't
      // allow URL.
      fetch2(url, init)
    ),
    location: new URL("http://localhost"),
    IntersectionObserver: IntersectionObserverShimWithRealType,
    MutationObserver: MutationObserverShimWithRealType,
    ResizeObserver: ResizeObserverShimWithRealType,
    // No-op any async tasks
    requestAnimationFrame() {
    },
    // Set below
    window: void 0,
    // User-provided globals, like `require`
    ...props
  };
  if (includeJSBuiltIns) {
    Object.assign(window2, {
      // No-op any async tasks
      setTimeout() {
      },
      clearTimeout() {
      },
      // Required for node-fetch
      Buffer,
      URL,
      URLSearchParams,
      console: {
        log(...args) {
          console.log(...args);
        },
        info(...args) {
          console.info(...args);
        },
        warn(...args) {
          console.warn(...args);
        },
        debug(...args) {
          console.debug(...args);
        },
        error(...args) {
          console.error(...args);
        },
        assert(bool, msg) {
          if (!bool) {
            throw new Error(msg);
          }
        }
      }
    });
  }
  return window2;
};
var installWindowOnGlobal = (props = {}) => {
  if (globalThis.window === void 0) {
    const window2 = getWindow({ props });
    Object.assign(globalThis, window2);
  }
};

// node_modules/@lit-labs/ssr/lib/install-global-dom-shim.js
installWindowOnGlobal();

// node_modules/lit-html/node/lit-html.js
var t2 = globalThis;
var i2 = (t7) => t7;
var s2 = t2.trustedTypes;
var e2 = s2 ? s2.createPolicy("lit-html", { createHTML: (t7) => t7 }) : void 0;
var h2 = "$lit$";
var o = `lit$${Math.random().toFixed(9).slice(2)}$`;
var n = "?" + o;
var r2 = `<${n}>`;
var l = void 0 === t2.document ? { createTreeWalker: () => ({}) } : document;
var c = () => l.createComment("");
var a = (t7) => null === t7 || "object" != typeof t7 && "function" != typeof t7;
var u = Array.isArray;
var d = (t7) => u(t7) || "function" == typeof t7?.[Symbol.iterator];
var f3 = "[ 	\n\f\r]";
var v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m2 = />/g;
var p = RegExp(`>|${f3}(?:([^\\s"'>=/]+)(${f3}*=${f3}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var g = /'/g;
var $ = /"/g;
var y = /^(?:script|style|textarea|title)$/i;
var x2 = (t7) => (i8, ...s8) => ({ _$litType$: t7, strings: i8, values: s8 });
var T = x2(1);
var b = x2(2);
var w = x2(3);
var E = /* @__PURE__ */ Symbol.for("lit-noChange");
var A2 = /* @__PURE__ */ Symbol.for("lit-nothing");
var C = /* @__PURE__ */ new WeakMap();
var P = l.createTreeWalker(l, 129);
function V(t7, i8) {
  if (!u(t7) || !t7.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e2 ? e2.createHTML(i8) : i8;
}
var N = (t7, i8) => {
  const s8 = t7.length - 1, e11 = [];
  let n9, l5 = 2 === i8 ? "<svg>" : 3 === i8 ? "<math>" : "", c6 = v;
  for (let i9 = 0; i9 < s8; i9++) {
    const s9 = t7[i9];
    let a3, u3, d5 = -1, f8 = 0;
    for (; f8 < s9.length && (c6.lastIndex = f8, u3 = c6.exec(s9), null !== u3); ) f8 = c6.lastIndex, c6 === v ? "!--" === u3[1] ? c6 = _ : void 0 !== u3[1] ? c6 = m2 : void 0 !== u3[2] ? (y.test(u3[2]) && (n9 = RegExp("</" + u3[2], "g")), c6 = p) : void 0 !== u3[3] && (c6 = p) : c6 === p ? ">" === u3[0] ? (c6 = n9 ?? v, d5 = -1) : void 0 === u3[1] ? d5 = -2 : (d5 = c6.lastIndex - u3[2].length, a3 = u3[1], c6 = void 0 === u3[3] ? p : '"' === u3[3] ? $ : g) : c6 === $ || c6 === g ? c6 = p : c6 === _ || c6 === m2 ? c6 = v : (c6 = p, n9 = void 0);
    const x3 = c6 === p && t7[i9 + 1].startsWith("/>") ? " " : "";
    l5 += c6 === v ? s9 + r2 : d5 >= 0 ? (e11.push(a3), s9.slice(0, d5) + h2 + s9.slice(d5) + o + x3) : s9 + o + (-2 === d5 ? i9 : x3);
  }
  return [V(t7, l5 + (t7[s8] || "<?>") + (2 === i8 ? "</svg>" : 3 === i8 ? "</math>" : "")), e11];
};
var S2 = class _S {
  constructor({ strings: t7, _$litType$: i8 }, e11) {
    let r10;
    this.parts = [];
    let l5 = 0, a3 = 0;
    const u3 = t7.length - 1, d5 = this.parts, [f8, v3] = N(t7, i8);
    if (this.el = _S.createElement(f8, e11), P.currentNode = this.el.content, 2 === i8 || 3 === i8) {
      const t8 = this.el.content.firstChild;
      t8.replaceWith(...t8.childNodes);
    }
    for (; null !== (r10 = P.nextNode()) && d5.length < u3; ) {
      if (1 === r10.nodeType) {
        if (r10.hasAttributes()) for (const t8 of r10.getAttributeNames()) if (t8.endsWith(h2)) {
          const i9 = v3[a3++], s8 = r10.getAttribute(t8).split(o), e12 = /([.?@])?(.*)/.exec(i9);
          d5.push({ type: 1, index: l5, name: e12[2], strings: s8, ctor: "." === e12[1] ? I : "?" === e12[1] ? L : "@" === e12[1] ? z : H }), r10.removeAttribute(t8);
        } else t8.startsWith(o) && (d5.push({ type: 6, index: l5 }), r10.removeAttribute(t8));
        if (y.test(r10.tagName)) {
          const t8 = r10.textContent.split(o), i9 = t8.length - 1;
          if (i9 > 0) {
            r10.textContent = s2 ? s2.emptyScript : "";
            for (let s8 = 0; s8 < i9; s8++) r10.append(t8[s8], c()), P.nextNode(), d5.push({ type: 2, index: ++l5 });
            r10.append(t8[i9], c());
          }
        }
      } else if (8 === r10.nodeType) if (r10.data === n) d5.push({ type: 2, index: l5 });
      else {
        let t8 = -1;
        for (; -1 !== (t8 = r10.data.indexOf(o, t8 + 1)); ) d5.push({ type: 7, index: l5 }), t8 += o.length - 1;
      }
      l5++;
    }
  }
  static createElement(t7, i8) {
    const s8 = l.createElement("template");
    return s8.innerHTML = t7, s8;
  }
};
function M(t7, i8, s8 = t7, e11) {
  if (i8 === E) return i8;
  let h6 = void 0 !== e11 ? s8._$Co?.[e11] : s8._$Cl;
  const o11 = a(i8) ? void 0 : i8._$litDirective$;
  return h6?.constructor !== o11 && (h6?._$AO?.(false), void 0 === o11 ? h6 = void 0 : (h6 = new o11(t7), h6._$AT(t7, s8, e11)), void 0 !== e11 ? (s8._$Co ??= [])[e11] = h6 : s8._$Cl = h6), void 0 !== h6 && (i8 = M(t7, h6._$AS(t7, i8.values), h6, e11)), i8;
}
var k = class {
  constructor(t7, i8) {
    this._$AV = [], this._$AN = void 0, this._$AD = t7, this._$AM = i8;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t7) {
    const { el: { content: i8 }, parts: s8 } = this._$AD, e11 = (t7?.creationScope ?? l).importNode(i8, true);
    P.currentNode = e11;
    let h6 = P.nextNode(), o11 = 0, n9 = 0, r10 = s8[0];
    for (; void 0 !== r10; ) {
      if (o11 === r10.index) {
        let i9;
        2 === r10.type ? i9 = new R(h6, h6.nextSibling, this, t7) : 1 === r10.type ? i9 = new r10.ctor(h6, r10.name, r10.strings, this, t7) : 6 === r10.type && (i9 = new W(h6, this, t7)), this._$AV.push(i9), r10 = s8[++n9];
      }
      o11 !== r10?.index && (h6 = P.nextNode(), o11++);
    }
    return P.currentNode = l, e11;
  }
  p(t7) {
    let i8 = 0;
    for (const s8 of this._$AV) void 0 !== s8 && (void 0 !== s8.strings ? (s8._$AI(t7, s8, i8), i8 += s8.strings.length - 2) : s8._$AI(t7[i8])), i8++;
  }
};
var R = class _R {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t7, i8, s8, e11) {
    this.type = 2, this._$AH = A2, this._$AN = void 0, this._$AA = t7, this._$AB = i8, this._$AM = s8, this.options = e11, this._$Cv = e11?.isConnected ?? true;
  }
  get parentNode() {
    let t7 = this._$AA.parentNode;
    const i8 = this._$AM;
    return void 0 !== i8 && 11 === t7?.nodeType && (t7 = i8.parentNode), t7;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t7, i8 = this) {
    t7 = M(this, t7, i8), a(t7) ? t7 === A2 || null == t7 || "" === t7 ? (this._$AH !== A2 && this._$AR(), this._$AH = A2) : t7 !== this._$AH && t7 !== E && this._(t7) : void 0 !== t7._$litType$ ? this.$(t7) : void 0 !== t7.nodeType ? this.T(t7) : d(t7) ? this.k(t7) : this._(t7);
  }
  O(t7) {
    return this._$AA.parentNode.insertBefore(t7, this._$AB);
  }
  T(t7) {
    this._$AH !== t7 && (this._$AR(), this._$AH = this.O(t7));
  }
  _(t7) {
    this._$AH !== A2 && a(this._$AH) ? this._$AA.nextSibling.data = t7 : this.T(l.createTextNode(t7)), this._$AH = t7;
  }
  $(t7) {
    const { values: i8, _$litType$: s8 } = t7, e11 = "number" == typeof s8 ? this._$AC(t7) : (void 0 === s8.el && (s8.el = S2.createElement(V(s8.h, s8.h[0]), this.options)), s8);
    if (this._$AH?._$AD === e11) this._$AH.p(i8);
    else {
      const t8 = new k(e11, this), s9 = t8.u(this.options);
      t8.p(i8), this.T(s9), this._$AH = t8;
    }
  }
  _$AC(t7) {
    let i8 = C.get(t7.strings);
    return void 0 === i8 && C.set(t7.strings, i8 = new S2(t7)), i8;
  }
  k(t7) {
    u(this._$AH) || (this._$AH = [], this._$AR());
    const i8 = this._$AH;
    let s8, e11 = 0;
    for (const h6 of t7) e11 === i8.length ? i8.push(s8 = new _R(this.O(c()), this.O(c()), this, this.options)) : s8 = i8[e11], s8._$AI(h6), e11++;
    e11 < i8.length && (this._$AR(s8 && s8._$AB.nextSibling, e11), i8.length = e11);
  }
  _$AR(t7 = this._$AA.nextSibling, s8) {
    for (this._$AP?.(false, true, s8); t7 !== this._$AB; ) {
      const s9 = i2(t7).nextSibling;
      i2(t7).remove(), t7 = s9;
    }
  }
  setConnected(t7) {
    void 0 === this._$AM && (this._$Cv = t7, this._$AP?.(t7));
  }
};
var H = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t7, i8, s8, e11, h6) {
    this.type = 1, this._$AH = A2, this._$AN = void 0, this.element = t7, this.name = i8, this._$AM = e11, this.options = h6, s8.length > 2 || "" !== s8[0] || "" !== s8[1] ? (this._$AH = Array(s8.length - 1).fill(new String()), this.strings = s8) : this._$AH = A2;
  }
  _$AI(t7, i8 = this, s8, e11) {
    const h6 = this.strings;
    let o11 = false;
    if (void 0 === h6) t7 = M(this, t7, i8, 0), o11 = !a(t7) || t7 !== this._$AH && t7 !== E, o11 && (this._$AH = t7);
    else {
      const e12 = t7;
      let n9, r10;
      for (t7 = h6[0], n9 = 0; n9 < h6.length - 1; n9++) r10 = M(this, e12[s8 + n9], i8, n9), r10 === E && (r10 = this._$AH[n9]), o11 ||= !a(r10) || r10 !== this._$AH[n9], r10 === A2 ? t7 = A2 : t7 !== A2 && (t7 += (r10 ?? "") + h6[n9 + 1]), this._$AH[n9] = r10;
    }
    o11 && !e11 && this.j(t7);
  }
  j(t7) {
    t7 === A2 ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t7 ?? "");
  }
};
var I = class extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t7) {
    this.element[this.name] = t7 === A2 ? void 0 : t7;
  }
};
var L = class extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t7) {
    this.element.toggleAttribute(this.name, !!t7 && t7 !== A2);
  }
};
var z = class extends H {
  constructor(t7, i8, s8, e11, h6) {
    super(t7, i8, s8, e11, h6), this.type = 5;
  }
  _$AI(t7, i8 = this) {
    if ((t7 = M(this, t7, i8, 0) ?? A2) === E) return;
    const s8 = this._$AH, e11 = t7 === A2 && s8 !== A2 || t7.capture !== s8.capture || t7.once !== s8.once || t7.passive !== s8.passive, h6 = t7 !== A2 && (s8 === A2 || e11);
    e11 && this.element.removeEventListener(this.name, this, s8), h6 && this.element.addEventListener(this.name, this, t7), this._$AH = t7;
  }
  handleEvent(t7) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t7) : this._$AH.handleEvent(t7);
  }
};
var W = class {
  constructor(t7, i8, s8) {
    this.element = t7, this.type = 6, this._$AN = void 0, this._$AM = i8, this.options = s8;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t7) {
    M(this, t7);
  }
};
var Z2 = { M: h2, P: o, A: n, C: 1, L: N, R: k, D: d, V: M, I: R, H, N: L, U: z, B: I, F: W };
var j = t2.litHtmlPolyfillSupport;
j?.(S2, R), (t2.litHtmlVersions ??= []).push("3.3.3");
var B = (t7, i8, s8) => {
  const e11 = s8?.renderBefore ?? i8;
  let h6 = e11._$litPart$;
  if (void 0 === h6) {
    const t8 = s8?.renderBefore ?? null;
    e11._$litPart$ = h6 = new R(i8.insertBefore(c(), t8), t8, void 0, s8 ?? {});
  }
  return h6._$AI(t7), h6;
};

// node_modules/lit-html/node/directive-helpers.js
var { I: t3 } = Z2;
var n2 = (o11) => null === o11 || "object" != typeof o11 && "function" != typeof o11;
var e3 = { HTML: 1, SVG: 2, MATHML: 3 };
var l2 = (o11, t7) => void 0 === t7 ? void 0 !== o11?._$litType$ : o11?._$litType$ === t7;
var d2 = (o11) => null != o11?._$litType$?.h;
var f4 = (o11) => o11?._$litDirective$;
var r3 = (o11) => void 0 === o11.strings;
var m3 = {};
var p2 = (o11, t7 = m3) => o11._$AH = t7;

// node_modules/@lit-labs/ssr/lib/util/escape-html.js
var replacements = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  // Note &apos; was not defined in the HTML4 spec, and is not supported by very
  // old browsers like IE8, so a codepoint entity is used instead.
  "'": "&#39;"
};
var replacer = (char) => replacements[char];
var escapeHtml = (str) => str.replace(/[&<>"']/g, replacer);

// node_modules/@lit-labs/ssr/lib/element-renderer.js
var getElementRenderer = ({ elementRenderers }, tagName, ceClass = customElements.get(tagName), attributes2 = /* @__PURE__ */ new Map()) => {
  if (ceClass === void 0) {
    console.warn(`Custom element ${tagName} was not registered.`);
    return new FallbackRenderer(tagName);
  }
  for (const renderer of elementRenderers) {
    if (renderer.matchesClass(ceClass, tagName, attributes2)) {
      return new renderer(tagName);
    }
  }
  return new FallbackRenderer(tagName);
};
var ElementRenderer = class {
  /**
   * Should be implemented to return true when the given custom element class
   * and/or tagName should be handled by this renderer.
   *
   * @param ceClass - Custom Element class
   * @param tagName - Tag name of custom element instance
   * @param attributes - Map of attribute key/value pairs
   * @returns
   */
  static matchesClass(_ceClass, _tagName, _attributes) {
    return false;
  }
  /**
   * Called when a custom element is instantiated during a server render.
   *
   * An ElementRenderer can actually instantiate the custom element class, or
   * it could emulate the element in some other way.
   */
  constructor(tagName) {
    this.tagName = tagName;
  }
  /**
   * Called when a custom element is "attached" to the server DOM.
   *
   * Because we don't presume a full DOM emulation, this isn't the same as
   * being connected in a real browser. There may not be an owner document,
   * parentNode, etc., depending on the DOM emulation.
   *
   * If this renderer is creating actual element instances, it may forward
   * the call to the element's `connectedCallback()`.
   *
   * The default impementation is a no-op.
   */
  connectedCallback() {
  }
  /**
   * Called from `setAttribute()` to emulate the browser's
   * `attributeChangedCallback` lifecycle hook.
   *
   * If this renderer is creating actual element instances, it may forward
   * the call to the element's `attributeChangedCallback()`.
   */
  attributeChangedCallback(_name, _old, _value) {
  }
  /**
   * Handles setting a property on the element.
   *
   * The default implementation sets the property on the renderer's element
   * instance.
   *
   * @param name Name of the property
   * @param value Value of the property
   */
  setProperty(name, value) {
    if (this.element !== void 0) {
      this.element[name] = value;
    }
  }
  /**
   * Handles setting an attribute on an element.
   *
   * Default implementation calls `setAttribute` on the renderer's element
   * instance, and calls the abstract `attributeChangedCallback` on the
   * renderer.
   *
   * @param name Name of the attribute
   * @param value Value of the attribute
   */
  setAttribute(name, value) {
    name = name.toLowerCase();
    if (this.element !== void 0) {
      const old = this.element.getAttribute(name);
      this.element.setAttribute(name, value);
      this.attributeChangedCallback(name, old, value);
    }
  }
  /**
   * The shadow root options to write to the declarative shadow DOM <template>,
   * if one is created with `renderShadow()`.
   */
  get shadowRootOptions() {
    return { mode: "open" };
  }
  /**
   * Render the element's shadow root children.
   *
   * If `renderShadow()` returns undefined, no declarative shadow root is
   * emitted.
   */
  renderShadow(_renderInfo) {
    return void 0;
  }
  /**
   * Render the element's light DOM children.
   */
  renderLight(_renderInfo) {
    return void 0;
  }
  /**
   * Render the element's attributes.
   *
   * The default implementation serializes all attributes on the element
   * instance.
   */
  renderAttributes() {
    const result = [];
    if (this.element !== void 0) {
      const { attributes: attributes2 } = this.element;
      for (let i8 = 0, name, value; i8 < attributes2.length && ({ name, value } = attributes2[i8]); i8++) {
        if (value === "" || value === void 0 || value === null) {
          result.push(` ${name}`);
        } else {
          result.push(` ${name}="${escapeHtml(value)}"`);
        }
      }
    }
    return result;
  }
};
var FallbackRenderer = class extends ElementRenderer {
  constructor() {
    super(...arguments);
    this._attributes = {};
  }
  setAttribute(name, value) {
    this._attributes[name.toLowerCase()] = value;
  }
  renderAttributes() {
    const result = [];
    for (const [name, value] of Object.entries(this._attributes)) {
      if (value === "" || value === void 0 || value === null) {
        result.push(` ${name}`);
      } else {
        result.push(` ${name}="${escapeHtml(value)}"`);
      }
    }
    return result;
  }
};

// node_modules/@lit/reactive-element/node/css-tag.js
var t4 = globalThis;
var e4 = t4.ShadowRoot && (void 0 === t4.ShadyCSS || t4.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s3 = /* @__PURE__ */ Symbol();
var o2 = /* @__PURE__ */ new WeakMap();
var n3 = class {
  constructor(t7, e11, o11) {
    if (this._$cssResult$ = true, o11 !== s3) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t7, this.t = e11;
  }
  get styleSheet() {
    let t7 = this.o;
    const s8 = this.t;
    if (e4 && void 0 === t7) {
      const e11 = void 0 !== s8 && 1 === s8.length;
      e11 && (t7 = o2.get(s8)), void 0 === t7 && ((this.o = t7 = new CSSStyleSheet()).replaceSync(this.cssText), e11 && o2.set(s8, t7));
    }
    return t7;
  }
  toString() {
    return this.cssText;
  }
};
var r4 = (t7) => new n3("string" == typeof t7 ? t7 : t7 + "", void 0, s3);
var i3 = (t7, ...e11) => {
  const o11 = 1 === t7.length ? t7[0] : e11.reduce((e12, s8, o12) => e12 + ((t8) => {
    if (true === t8._$cssResult$) return t8.cssText;
    if ("number" == typeof t8) return t8;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t8 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s8) + t7[o12 + 1], t7[0]);
  return new n3(o11, t7, s3);
};
var S3 = (s8, o11) => {
  if (e4) s8.adoptedStyleSheets = o11.map((t7) => t7 instanceof CSSStyleSheet ? t7 : t7.styleSheet);
  else for (const e11 of o11) {
    const o12 = document.createElement("style"), n9 = t4.litNonce;
    void 0 !== n9 && o12.setAttribute("nonce", n9), o12.textContent = e11.cssText, s8.appendChild(o12);
  }
};
var c2 = e4 || void 0 === t4.CSSStyleSheet ? (t7) => t7 : (t7) => t7 instanceof CSSStyleSheet ? ((t8) => {
  let e11 = "";
  for (const s8 of t8.cssRules) e11 += s8.cssText;
  return r4(e11);
})(t7) : t7;

// node_modules/@lit/reactive-element/node/reactive-element.js
var { is: h3, defineProperty: r5, getOwnPropertyDescriptor: o3, getOwnPropertyNames: n4, getOwnPropertySymbols: a2, getPrototypeOf: c3 } = Object;
var l3 = globalThis;
l3.customElements ??= customElements2;
var p3 = l3.trustedTypes;
var d3 = p3 ? p3.emptyScript : "";
var u2 = l3.reactiveElementPolyfillSupport;
var f5 = (t7, s8) => t7;
var b2 = { toAttribute(t7, s8) {
  switch (s8) {
    case Boolean:
      t7 = t7 ? d3 : null;
      break;
    case Object:
    case Array:
      t7 = null == t7 ? t7 : JSON.stringify(t7);
  }
  return t7;
}, fromAttribute(t7, s8) {
  let i8 = t7;
  switch (s8) {
    case Boolean:
      i8 = null !== t7;
      break;
    case Number:
      i8 = null === t7 ? null : Number(t7);
      break;
    case Object:
    case Array:
      try {
        i8 = JSON.parse(t7);
      } catch (t8) {
        i8 = null;
      }
  }
  return i8;
} };
var m4 = (t7, s8) => !h3(t7, s8);
var y2 = { attribute: true, type: String, converter: b2, reflect: false, useDefault: false, hasChanged: m4 };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), l3.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var g2 = class extends (globalThis.HTMLElement ?? HTMLElementShimWithRealType) {
  static addInitializer(t7) {
    this._$Ei(), (this.l ??= []).push(t7);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t7, s8 = y2) {
    if (s8.state && (s8.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t7) && ((s8 = Object.create(s8)).wrapped = true), this.elementProperties.set(t7, s8), !s8.noAccessor) {
      const i8 = /* @__PURE__ */ Symbol(), e11 = this.getPropertyDescriptor(t7, i8, s8);
      void 0 !== e11 && r5(this.prototype, t7, e11);
    }
  }
  static getPropertyDescriptor(t7, s8, i8) {
    const { get: e11, set: h6 } = o3(this.prototype, t7) ?? { get() {
      return this[s8];
    }, set(t8) {
      this[s8] = t8;
    } };
    return { get: e11, set(s9) {
      const r10 = e11?.call(this);
      h6?.call(this, s9), this.requestUpdate(t7, r10, i8);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t7) {
    return this.elementProperties.get(t7) ?? y2;
  }
  static _$Ei() {
    if (this.hasOwnProperty(f5("elementProperties"))) return;
    const t7 = c3(this);
    t7.finalize(), void 0 !== t7.l && (this.l = [...t7.l]), this.elementProperties = new Map(t7.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(f5("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(f5("properties"))) {
      const t8 = this.properties, s8 = [...n4(t8), ...a2(t8)];
      for (const i8 of s8) this.createProperty(i8, t8[i8]);
    }
    const t7 = this[Symbol.metadata];
    if (null !== t7) {
      const s8 = litPropertyMetadata.get(t7);
      if (void 0 !== s8) for (const [t8, i8] of s8) this.elementProperties.set(t8, i8);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t8, s8] of this.elementProperties) {
      const i8 = this._$Eu(t8, s8);
      void 0 !== i8 && this._$Eh.set(i8, t8);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t7) {
    const s8 = [];
    if (Array.isArray(t7)) {
      const e11 = new Set(t7.flat(1 / 0).reverse());
      for (const t8 of e11) s8.unshift(c2(t8));
    } else void 0 !== t7 && s8.push(c2(t7));
    return s8;
  }
  static _$Eu(t7, s8) {
    const i8 = s8.attribute;
    return false === i8 ? void 0 : "string" == typeof i8 ? i8 : "string" == typeof t7 ? t7.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t7) => this.enableUpdating = t7), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t7) => t7(this));
  }
  addController(t7) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t7), void 0 !== this.renderRoot && this.isConnected && t7.hostConnected?.();
  }
  removeController(t7) {
    this._$EO?.delete(t7);
  }
  _$E_() {
    const t7 = /* @__PURE__ */ new Map(), s8 = this.constructor.elementProperties;
    for (const i8 of s8.keys()) this.hasOwnProperty(i8) && (t7.set(i8, this[i8]), delete this[i8]);
    t7.size > 0 && (this._$Ep = t7);
  }
  createRenderRoot() {
    const t7 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S3(t7, this.constructor.elementStyles), t7;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t7) => t7.hostConnected?.());
  }
  enableUpdating(t7) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t7) => t7.hostDisconnected?.());
  }
  attributeChangedCallback(t7, s8, i8) {
    this._$AK(t7, i8);
  }
  _$ET(t7, s8) {
    const i8 = this.constructor.elementProperties.get(t7), e11 = this.constructor._$Eu(t7, i8);
    if (void 0 !== e11 && true === i8.reflect) {
      const h6 = (void 0 !== i8.converter?.toAttribute ? i8.converter : b2).toAttribute(s8, i8.type);
      this._$Em = t7, null == h6 ? this.removeAttribute(e11) : this.setAttribute(e11, h6), this._$Em = null;
    }
  }
  _$AK(t7, s8) {
    const i8 = this.constructor, e11 = i8._$Eh.get(t7);
    if (void 0 !== e11 && this._$Em !== e11) {
      const t8 = i8.getPropertyOptions(e11), h6 = "function" == typeof t8.converter ? { fromAttribute: t8.converter } : void 0 !== t8.converter?.fromAttribute ? t8.converter : b2;
      this._$Em = e11;
      const r10 = h6.fromAttribute(s8, t8.type);
      this[e11] = r10 ?? this._$Ej?.get(e11) ?? r10, this._$Em = null;
    }
  }
  requestUpdate(t7, s8, i8, e11 = false, h6) {
    if (void 0 !== t7) {
      const r10 = this.constructor;
      if (false === e11 && (h6 = this[t7]), i8 ??= r10.getPropertyOptions(t7), !((i8.hasChanged ?? m4)(h6, s8) || i8.useDefault && i8.reflect && h6 === this._$Ej?.get(t7) && !this.hasAttribute(r10._$Eu(t7, i8)))) return;
      this.C(t7, s8, i8);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t7, s8, { useDefault: i8, reflect: e11, wrapped: h6 }, r10) {
    i8 && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t7) && (this._$Ej.set(t7, r10 ?? s8 ?? this[t7]), true !== h6 || void 0 !== r10) || (this._$AL.has(t7) || (this.hasUpdated || i8 || (s8 = void 0), this._$AL.set(t7, s8)), true === e11 && this._$Em !== t7 && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t7));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t8) {
      Promise.reject(t8);
    }
    const t7 = this.scheduleUpdate();
    return null != t7 && await t7, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t9, s9] of this._$Ep) this[t9] = s9;
        this._$Ep = void 0;
      }
      const t8 = this.constructor.elementProperties;
      if (t8.size > 0) for (const [s9, i8] of t8) {
        const { wrapped: t9 } = i8, e11 = this[s9];
        true !== t9 || this._$AL.has(s9) || void 0 === e11 || this.C(s9, void 0, i8, e11);
      }
    }
    let t7 = false;
    const s8 = this._$AL;
    try {
      t7 = this.shouldUpdate(s8), t7 ? (this.willUpdate(s8), this._$EO?.forEach((t8) => t8.hostUpdate?.()), this.update(s8)) : this._$EM();
    } catch (s9) {
      throw t7 = false, this._$EM(), s9;
    }
    t7 && this._$AE(s8);
  }
  willUpdate(t7) {
  }
  _$AE(t7) {
    this._$EO?.forEach((t8) => t8.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t7)), this.updated(t7);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t7) {
    return true;
  }
  update(t7) {
    this._$Eq &&= this._$Eq.forEach((t8) => this._$ET(t8, this[t8])), this._$EM();
  }
  updated(t7) {
  }
  firstUpdated(t7) {
  }
};
g2.elementStyles = [], g2.shadowRootOptions = { mode: "open" }, g2[f5("elementProperties")] = /* @__PURE__ */ new Map(), g2[f5("finalized")] = /* @__PURE__ */ new Map(), u2?.({ ReactiveElement: g2 }), (l3.reactiveElementVersions ??= []).push("2.1.2");

// node_modules/lit-element/lit-element.js
var s4 = globalThis;
var i4 = class extends g2 {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t7 = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t7.firstChild, t7;
  }
  update(t7) {
    const r10 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t7), this._$Do = B(r10, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return E;
  }
};
i4._$litElement$ = true, i4["finalized"] = true, s4.litElementHydrateSupport?.({ LitElement: i4 });
var o4 = s4.litElementPolyfillSupport;
o4?.({ LitElement: i4 });
var n5 = { _$AK: (t7, e11, r10) => {
  t7._$AK(e11, r10);
}, _$AL: (t7) => t7._$AL };
(s4.litElementVersions ??= []).push("4.2.2");

// node_modules/lit-html/node/is-server.js
var o5 = true;

// node_modules/lit-element/private-ssr-support.js
var e5 = { attributeToProperty: n5._$AK, changedProperties: n5._$AL };

// node_modules/lit-html/node/directive.js
var t5 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e6 = (t7) => (...e11) => ({ _$litDirective$: t7, values: e11 });
var i5 = class {
  constructor(t7) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t7, e11, i8) {
    this._$Ct = t7, this._$AM = e11, this._$Ci = i8;
  }
  _$AS(t7, e11) {
    return this.update(t7, e11);
  }
  update(t7, e11) {
    return this.render(...e11);
  }
};

// node_modules/lit-html/node/private-ssr-support.js
var r6 = null;
var i6 = { boundAttributeSuffix: Z2.M, marker: Z2.P, markerMatch: Z2.A, HTML_RESULT: Z2.C, getTemplateHtml: Z2.L, overrideDirectiveResolve: (e11, t7) => class extends e11 {
  _$AS(e12, r10) {
    return t7(this, r10);
  }
}, patchDirectiveResolve: (e11, t7) => {
  if (e11.prototype._$AS.name !== t7.name) {
    r6 ??= e11.prototype._$AS.name;
    for (let i8 = e11.prototype; i8 !== Object.prototype; i8 = Object.getPrototypeOf(i8)) if (i8.hasOwnProperty(r6)) return void (i8[r6] = t7);
    throw Error("Internal error: It is possible that both dev mode and production mode Lit was mixed together during SSR. Please comment on the issue: https://github.com/lit/lit/issues/4527");
  }
}, setDirectiveClass(e11, t7) {
  e11._$litDirective$ = t7;
}, getAttributePartCommittedValue: (e11, r10, i8) => {
  let o11 = E;
  return e11.j = (e12) => o11 = e12, e11._$AI(r10, e11, i8), o11;
}, connectedDisconnectable: (e11) => ({ ...e11, _$AU: true }), resolveDirective: Z2.V, AttributePart: Z2.H, PropertyPart: Z2.B, BooleanAttributePart: Z2.N, EventPart: Z2.U, ElementPart: Z2.F, TemplateInstance: Z2.R, isIterable: Z2.D, ChildPart: Z2.I };

// node_modules/@lit-labs/ssr-client/node/lib/hydrate-lit-html.js
import { Buffer as e7 } from "buffer";
var { TemplateInstance: s5, isIterable: d4, resolveDirective: c4, ChildPart: p4, ElementPart: f6 } = i6;
var v2 = /* @__PURE__ */ new WeakMap();
var b3 = (t7) => {
  let r10 = v2.get(t7.strings);
  if (void 0 !== r10) return r10;
  const n9 = new Uint32Array(2).fill(5381);
  for (const e11 of t7.strings) for (let t8 = 0; t8 < e11.length; t8++) n9[t8 % 2] = 33 * n9[t8 % 2] ^ e11.charCodeAt(t8);
  const o11 = String.fromCharCode(...new Uint8Array(n9.buffer));
  return r10 = e7.from(o11, "binary").toString("base64"), v2.set(t7.strings, r10), r10;
};

// node_modules/@lit-labs/ssr/node_modules/parse5/dist/common/unicode.js
var UNDEFINED_CODE_POINTS = /* @__PURE__ */ new Set([
  65534,
  65535,
  131070,
  131071,
  196606,
  196607,
  262142,
  262143,
  327678,
  327679,
  393214,
  393215,
  458750,
  458751,
  524286,
  524287,
  589822,
  589823,
  655358,
  655359,
  720894,
  720895,
  786430,
  786431,
  851966,
  851967,
  917502,
  917503,
  983038,
  983039,
  1048574,
  1048575,
  1114110,
  1114111
]);
var REPLACEMENT_CHARACTER = "\uFFFD";
var CODE_POINTS;
(function(CODE_POINTS3) {
  CODE_POINTS3[CODE_POINTS3["EOF"] = -1] = "EOF";
  CODE_POINTS3[CODE_POINTS3["NULL"] = 0] = "NULL";
  CODE_POINTS3[CODE_POINTS3["TABULATION"] = 9] = "TABULATION";
  CODE_POINTS3[CODE_POINTS3["CARRIAGE_RETURN"] = 13] = "CARRIAGE_RETURN";
  CODE_POINTS3[CODE_POINTS3["LINE_FEED"] = 10] = "LINE_FEED";
  CODE_POINTS3[CODE_POINTS3["FORM_FEED"] = 12] = "FORM_FEED";
  CODE_POINTS3[CODE_POINTS3["SPACE"] = 32] = "SPACE";
  CODE_POINTS3[CODE_POINTS3["EXCLAMATION_MARK"] = 33] = "EXCLAMATION_MARK";
  CODE_POINTS3[CODE_POINTS3["QUOTATION_MARK"] = 34] = "QUOTATION_MARK";
  CODE_POINTS3[CODE_POINTS3["AMPERSAND"] = 38] = "AMPERSAND";
  CODE_POINTS3[CODE_POINTS3["APOSTROPHE"] = 39] = "APOSTROPHE";
  CODE_POINTS3[CODE_POINTS3["HYPHEN_MINUS"] = 45] = "HYPHEN_MINUS";
  CODE_POINTS3[CODE_POINTS3["SOLIDUS"] = 47] = "SOLIDUS";
  CODE_POINTS3[CODE_POINTS3["DIGIT_0"] = 48] = "DIGIT_0";
  CODE_POINTS3[CODE_POINTS3["DIGIT_9"] = 57] = "DIGIT_9";
  CODE_POINTS3[CODE_POINTS3["SEMICOLON"] = 59] = "SEMICOLON";
  CODE_POINTS3[CODE_POINTS3["LESS_THAN_SIGN"] = 60] = "LESS_THAN_SIGN";
  CODE_POINTS3[CODE_POINTS3["EQUALS_SIGN"] = 61] = "EQUALS_SIGN";
  CODE_POINTS3[CODE_POINTS3["GREATER_THAN_SIGN"] = 62] = "GREATER_THAN_SIGN";
  CODE_POINTS3[CODE_POINTS3["QUESTION_MARK"] = 63] = "QUESTION_MARK";
  CODE_POINTS3[CODE_POINTS3["LATIN_CAPITAL_A"] = 65] = "LATIN_CAPITAL_A";
  CODE_POINTS3[CODE_POINTS3["LATIN_CAPITAL_Z"] = 90] = "LATIN_CAPITAL_Z";
  CODE_POINTS3[CODE_POINTS3["RIGHT_SQUARE_BRACKET"] = 93] = "RIGHT_SQUARE_BRACKET";
  CODE_POINTS3[CODE_POINTS3["GRAVE_ACCENT"] = 96] = "GRAVE_ACCENT";
  CODE_POINTS3[CODE_POINTS3["LATIN_SMALL_A"] = 97] = "LATIN_SMALL_A";
  CODE_POINTS3[CODE_POINTS3["LATIN_SMALL_Z"] = 122] = "LATIN_SMALL_Z";
})(CODE_POINTS || (CODE_POINTS = {}));
var SEQUENCES = {
  DASH_DASH: "--",
  CDATA_START: "[CDATA[",
  DOCTYPE: "doctype",
  SCRIPT: "script",
  PUBLIC: "public",
  SYSTEM: "system"
};
function isSurrogate(cp) {
  return cp >= 55296 && cp <= 57343;
}
function isSurrogatePair(cp) {
  return cp >= 56320 && cp <= 57343;
}
function getSurrogatePairCodePoint(cp1, cp2) {
  return (cp1 - 55296) * 1024 + 9216 + cp2;
}
function isControlCodePoint(cp) {
  return cp !== 32 && cp !== 10 && cp !== 13 && cp !== 9 && cp !== 12 && cp >= 1 && cp <= 31 || cp >= 127 && cp <= 159;
}
function isUndefinedCodePoint(cp) {
  return cp >= 64976 && cp <= 65007 || UNDEFINED_CODE_POINTS.has(cp);
}

// node_modules/@lit-labs/ssr/node_modules/parse5/dist/common/error-codes.js
var ERR;
(function(ERR3) {
  ERR3["controlCharacterInInputStream"] = "control-character-in-input-stream";
  ERR3["noncharacterInInputStream"] = "noncharacter-in-input-stream";
  ERR3["surrogateInInputStream"] = "surrogate-in-input-stream";
  ERR3["nonVoidHtmlElementStartTagWithTrailingSolidus"] = "non-void-html-element-start-tag-with-trailing-solidus";
  ERR3["endTagWithAttributes"] = "end-tag-with-attributes";
  ERR3["endTagWithTrailingSolidus"] = "end-tag-with-trailing-solidus";
  ERR3["unexpectedSolidusInTag"] = "unexpected-solidus-in-tag";
  ERR3["unexpectedNullCharacter"] = "unexpected-null-character";
  ERR3["unexpectedQuestionMarkInsteadOfTagName"] = "unexpected-question-mark-instead-of-tag-name";
  ERR3["invalidFirstCharacterOfTagName"] = "invalid-first-character-of-tag-name";
  ERR3["unexpectedEqualsSignBeforeAttributeName"] = "unexpected-equals-sign-before-attribute-name";
  ERR3["missingEndTagName"] = "missing-end-tag-name";
  ERR3["unexpectedCharacterInAttributeName"] = "unexpected-character-in-attribute-name";
  ERR3["unknownNamedCharacterReference"] = "unknown-named-character-reference";
  ERR3["missingSemicolonAfterCharacterReference"] = "missing-semicolon-after-character-reference";
  ERR3["unexpectedCharacterAfterDoctypeSystemIdentifier"] = "unexpected-character-after-doctype-system-identifier";
  ERR3["unexpectedCharacterInUnquotedAttributeValue"] = "unexpected-character-in-unquoted-attribute-value";
  ERR3["eofBeforeTagName"] = "eof-before-tag-name";
  ERR3["eofInTag"] = "eof-in-tag";
  ERR3["missingAttributeValue"] = "missing-attribute-value";
  ERR3["missingWhitespaceBetweenAttributes"] = "missing-whitespace-between-attributes";
  ERR3["missingWhitespaceAfterDoctypePublicKeyword"] = "missing-whitespace-after-doctype-public-keyword";
  ERR3["missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers"] = "missing-whitespace-between-doctype-public-and-system-identifiers";
  ERR3["missingWhitespaceAfterDoctypeSystemKeyword"] = "missing-whitespace-after-doctype-system-keyword";
  ERR3["missingQuoteBeforeDoctypePublicIdentifier"] = "missing-quote-before-doctype-public-identifier";
  ERR3["missingQuoteBeforeDoctypeSystemIdentifier"] = "missing-quote-before-doctype-system-identifier";
  ERR3["missingDoctypePublicIdentifier"] = "missing-doctype-public-identifier";
  ERR3["missingDoctypeSystemIdentifier"] = "missing-doctype-system-identifier";
  ERR3["abruptDoctypePublicIdentifier"] = "abrupt-doctype-public-identifier";
  ERR3["abruptDoctypeSystemIdentifier"] = "abrupt-doctype-system-identifier";
  ERR3["cdataInHtmlContent"] = "cdata-in-html-content";
  ERR3["incorrectlyOpenedComment"] = "incorrectly-opened-comment";
  ERR3["eofInScriptHtmlCommentLikeText"] = "eof-in-script-html-comment-like-text";
  ERR3["eofInDoctype"] = "eof-in-doctype";
  ERR3["nestedComment"] = "nested-comment";
  ERR3["abruptClosingOfEmptyComment"] = "abrupt-closing-of-empty-comment";
  ERR3["eofInComment"] = "eof-in-comment";
  ERR3["incorrectlyClosedComment"] = "incorrectly-closed-comment";
  ERR3["eofInCdata"] = "eof-in-cdata";
  ERR3["absenceOfDigitsInNumericCharacterReference"] = "absence-of-digits-in-numeric-character-reference";
  ERR3["nullCharacterReference"] = "null-character-reference";
  ERR3["surrogateCharacterReference"] = "surrogate-character-reference";
  ERR3["characterReferenceOutsideUnicodeRange"] = "character-reference-outside-unicode-range";
  ERR3["controlCharacterReference"] = "control-character-reference";
  ERR3["noncharacterCharacterReference"] = "noncharacter-character-reference";
  ERR3["missingWhitespaceBeforeDoctypeName"] = "missing-whitespace-before-doctype-name";
  ERR3["missingDoctypeName"] = "missing-doctype-name";
  ERR3["invalidCharacterSequenceAfterDoctypeName"] = "invalid-character-sequence-after-doctype-name";
  ERR3["duplicateAttribute"] = "duplicate-attribute";
  ERR3["nonConformingDoctype"] = "non-conforming-doctype";
  ERR3["missingDoctype"] = "missing-doctype";
  ERR3["misplacedDoctype"] = "misplaced-doctype";
  ERR3["endTagWithoutMatchingOpenElement"] = "end-tag-without-matching-open-element";
  ERR3["closingOfElementWithOpenChildElements"] = "closing-of-element-with-open-child-elements";
  ERR3["disallowedContentInNoscriptInHead"] = "disallowed-content-in-noscript-in-head";
  ERR3["openElementsLeftAfterEof"] = "open-elements-left-after-eof";
  ERR3["abandonedHeadElementChild"] = "abandoned-head-element-child";
  ERR3["misplacedStartTagForHeadElement"] = "misplaced-start-tag-for-head-element";
  ERR3["nestedNoscriptInHead"] = "nested-noscript-in-head";
  ERR3["eofInElementThatCanContainOnlyText"] = "eof-in-element-that-can-contain-only-text";
})(ERR || (ERR = {}));

// node_modules/@lit-labs/ssr/node_modules/parse5/dist/tokenizer/preprocessor.js
var DEFAULT_BUFFER_WATERLINE = 1 << 16;
var Preprocessor = class {
  constructor(handler) {
    this.handler = handler;
    this.html = "";
    this.pos = -1;
    this.lastGapPos = -2;
    this.gapStack = [];
    this.skipNextNewLine = false;
    this.lastChunkWritten = false;
    this.endOfChunkHit = false;
    this.bufferWaterline = DEFAULT_BUFFER_WATERLINE;
    this.isEol = false;
    this.lineStartPos = 0;
    this.droppedBufferSize = 0;
    this.line = 1;
    this.lastErrOffset = -1;
  }
  /** The column on the current line. If we just saw a gap (eg. a surrogate pair), return the index before. */
  get col() {
    return this.pos - this.lineStartPos + Number(this.lastGapPos !== this.pos);
  }
  get offset() {
    return this.droppedBufferSize + this.pos;
  }
  getError(code, cpOffset) {
    const { line, col, offset: offset3 } = this;
    const startCol = col + cpOffset;
    const startOffset = offset3 + cpOffset;
    return {
      code,
      startLine: line,
      endLine: line,
      startCol,
      endCol: startCol,
      startOffset,
      endOffset: startOffset
    };
  }
  _err(code) {
    if (this.handler.onParseError && this.lastErrOffset !== this.offset) {
      this.lastErrOffset = this.offset;
      this.handler.onParseError(this.getError(code, 0));
    }
  }
  _addGap() {
    this.gapStack.push(this.lastGapPos);
    this.lastGapPos = this.pos;
  }
  _processSurrogate(cp) {
    if (this.pos !== this.html.length - 1) {
      const nextCp = this.html.charCodeAt(this.pos + 1);
      if (isSurrogatePair(nextCp)) {
        this.pos++;
        this._addGap();
        return getSurrogatePairCodePoint(cp, nextCp);
      }
    } else if (!this.lastChunkWritten) {
      this.endOfChunkHit = true;
      return CODE_POINTS.EOF;
    }
    this._err(ERR.surrogateInInputStream);
    return cp;
  }
  willDropParsedChunk() {
    return this.pos > this.bufferWaterline;
  }
  dropParsedChunk() {
    if (this.willDropParsedChunk()) {
      this.html = this.html.substring(this.pos);
      this.lineStartPos -= this.pos;
      this.droppedBufferSize += this.pos;
      this.pos = 0;
      this.lastGapPos = -2;
      this.gapStack.length = 0;
    }
  }
  write(chunk, isLastChunk) {
    if (this.html.length > 0) {
      this.html += chunk;
    } else {
      this.html = chunk;
    }
    this.endOfChunkHit = false;
    this.lastChunkWritten = isLastChunk;
  }
  insertHtmlAtCurrentPos(chunk) {
    this.html = this.html.substring(0, this.pos + 1) + chunk + this.html.substring(this.pos + 1);
    this.endOfChunkHit = false;
  }
  startsWith(pattern, caseSensitive) {
    if (this.pos + pattern.length > this.html.length) {
      this.endOfChunkHit = !this.lastChunkWritten;
      return false;
    }
    if (caseSensitive) {
      return this.html.startsWith(pattern, this.pos);
    }
    for (let i8 = 0; i8 < pattern.length; i8++) {
      const cp = this.html.charCodeAt(this.pos + i8) | 32;
      if (cp !== pattern.charCodeAt(i8)) {
        return false;
      }
    }
    return true;
  }
  peek(offset3) {
    const pos = this.pos + offset3;
    if (pos >= this.html.length) {
      this.endOfChunkHit = !this.lastChunkWritten;
      return CODE_POINTS.EOF;
    }
    const code = this.html.charCodeAt(pos);
    return code === CODE_POINTS.CARRIAGE_RETURN ? CODE_POINTS.LINE_FEED : code;
  }
  advance() {
    this.pos++;
    if (this.isEol) {
      this.isEol = false;
      this.line++;
      this.lineStartPos = this.pos;
    }
    if (this.pos >= this.html.length) {
      this.endOfChunkHit = !this.lastChunkWritten;
      return CODE_POINTS.EOF;
    }
    let cp = this.html.charCodeAt(this.pos);
    if (cp === CODE_POINTS.CARRIAGE_RETURN) {
      this.isEol = true;
      this.skipNextNewLine = true;
      return CODE_POINTS.LINE_FEED;
    }
    if (cp === CODE_POINTS.LINE_FEED) {
      this.isEol = true;
      if (this.skipNextNewLine) {
        this.line--;
        this.skipNextNewLine = false;
        this._addGap();
        return this.advance();
      }
    }
    this.skipNextNewLine = false;
    if (isSurrogate(cp)) {
      cp = this._processSurrogate(cp);
    }
    const isCommonValidRange = this.handler.onParseError === null || cp > 31 && cp < 127 || cp === CODE_POINTS.LINE_FEED || cp === CODE_POINTS.CARRIAGE_RETURN || cp > 159 && cp < 64976;
    if (!isCommonValidRange) {
      this._checkForProblematicCharacters(cp);
    }
    return cp;
  }
  _checkForProblematicCharacters(cp) {
    if (isControlCodePoint(cp)) {
      this._err(ERR.controlCharacterInInputStream);
    } else if (isUndefinedCodePoint(cp)) {
      this._err(ERR.noncharacterInInputStream);
    }
  }
  retreat(count) {
    this.pos -= count;
    while (this.pos < this.lastGapPos) {
      this.lastGapPos = this.gapStack.pop();
      this.pos--;
    }
    this.isEol = false;
  }
};

// node_modules/@lit-labs/ssr/node_modules/parse5/dist/common/token.js
var TokenType;
(function(TokenType3) {
  TokenType3[TokenType3["CHARACTER"] = 0] = "CHARACTER";
  TokenType3[TokenType3["NULL_CHARACTER"] = 1] = "NULL_CHARACTER";
  TokenType3[TokenType3["WHITESPACE_CHARACTER"] = 2] = "WHITESPACE_CHARACTER";
  TokenType3[TokenType3["START_TAG"] = 3] = "START_TAG";
  TokenType3[TokenType3["END_TAG"] = 4] = "END_TAG";
  TokenType3[TokenType3["COMMENT"] = 5] = "COMMENT";
  TokenType3[TokenType3["DOCTYPE"] = 6] = "DOCTYPE";
  TokenType3[TokenType3["EOF"] = 7] = "EOF";
  TokenType3[TokenType3["HIBERNATION"] = 8] = "HIBERNATION";
})(TokenType || (TokenType = {}));
function getTokenAttr(token, attrName) {
  for (let i8 = token.attrs.length - 1; i8 >= 0; i8--) {
    if (token.attrs[i8].name === attrName) {
      return token.attrs[i8].value;
    }
  }
  return null;
}

// node_modules/entities/dist/esm/generated/decode-data-html.js
var htmlDecodeTree = /* @__PURE__ */ new Uint16Array(
  // prettier-ignore
  /* @__PURE__ */ '\u1D41<\xD5\u0131\u028A\u049D\u057B\u05D0\u0675\u06DE\u07A2\u07D6\u080F\u0A4A\u0A91\u0DA1\u0E6D\u0F09\u0F26\u10CA\u1228\u12E1\u1415\u149D\u14C3\u14DF\u1525\0\0\0\0\0\0\u156B\u16CD\u198D\u1C12\u1DDD\u1F7E\u2060\u21B0\u228D\u23C0\u23FB\u2442\u2824\u2912\u2D08\u2E48\u2FCE\u3016\u32BA\u3639\u37AC\u38FE\u3A28\u3A71\u3AE0\u3B2E\u0800EMabcfglmnoprstu\\bfms\x7F\x84\x8B\x90\x95\x98\xA6\xB3\xB9\xC8\xCFlig\u803B\xC6\u40C6P\u803B&\u4026cute\u803B\xC1\u40C1reve;\u4102\u0100iyx}rc\u803B\xC2\u40C2;\u4410r;\uC000\u{1D504}rave\u803B\xC0\u40C0pha;\u4391acr;\u4100d;\u6A53\u0100gp\x9D\xA1on;\u4104f;\uC000\u{1D538}plyFunction;\u6061ing\u803B\xC5\u40C5\u0100cs\xBE\xC3r;\uC000\u{1D49C}ign;\u6254ilde\u803B\xC3\u40C3ml\u803B\xC4\u40C4\u0400aceforsu\xE5\xFB\xFE\u0117\u011C\u0122\u0127\u012A\u0100cr\xEA\xF2kslash;\u6216\u0176\xF6\xF8;\u6AE7ed;\u6306y;\u4411\u0180crt\u0105\u010B\u0114ause;\u6235noullis;\u612Ca;\u4392r;\uC000\u{1D505}pf;\uC000\u{1D539}eve;\u42D8c\xF2\u0113mpeq;\u624E\u0700HOacdefhilorsu\u014D\u0151\u0156\u0180\u019E\u01A2\u01B5\u01B7\u01BA\u01DC\u0215\u0273\u0278\u027Ecy;\u4427PY\u803B\xA9\u40A9\u0180cpy\u015D\u0162\u017Aute;\u4106\u0100;i\u0167\u0168\u62D2talDifferentialD;\u6145leys;\u612D\u0200aeio\u0189\u018E\u0194\u0198ron;\u410Cdil\u803B\xC7\u40C7rc;\u4108nint;\u6230ot;\u410A\u0100dn\u01A7\u01ADilla;\u40B8terDot;\u40B7\xF2\u017Fi;\u43A7rcle\u0200DMPT\u01C7\u01CB\u01D1\u01D6ot;\u6299inus;\u6296lus;\u6295imes;\u6297o\u0100cs\u01E2\u01F8kwiseContourIntegral;\u6232eCurly\u0100DQ\u0203\u020FoubleQuote;\u601Duote;\u6019\u0200lnpu\u021E\u0228\u0247\u0255on\u0100;e\u0225\u0226\u6237;\u6A74\u0180git\u022F\u0236\u023Aruent;\u6261nt;\u622FourIntegral;\u622E\u0100fr\u024C\u024E;\u6102oduct;\u6210nterClockwiseContourIntegral;\u6233oss;\u6A2Fcr;\uC000\u{1D49E}p\u0100;C\u0284\u0285\u62D3ap;\u624D\u0580DJSZacefios\u02A0\u02AC\u02B0\u02B4\u02B8\u02CB\u02D7\u02E1\u02E6\u0333\u048D\u0100;o\u0179\u02A5trahd;\u6911cy;\u4402cy;\u4405cy;\u440F\u0180grs\u02BF\u02C4\u02C7ger;\u6021r;\u61A1hv;\u6AE4\u0100ay\u02D0\u02D5ron;\u410E;\u4414l\u0100;t\u02DD\u02DE\u6207a;\u4394r;\uC000\u{1D507}\u0100af\u02EB\u0327\u0100cm\u02F0\u0322ritical\u0200ADGT\u0300\u0306\u0316\u031Ccute;\u40B4o\u0174\u030B\u030D;\u42D9bleAcute;\u42DDrave;\u4060ilde;\u42DCond;\u62C4ferentialD;\u6146\u0470\u033D\0\0\0\u0342\u0354\0\u0405f;\uC000\u{1D53B}\u0180;DE\u0348\u0349\u034D\u40A8ot;\u60DCqual;\u6250ble\u0300CDLRUV\u0363\u0372\u0382\u03CF\u03E2\u03F8ontourIntegra\xEC\u0239o\u0274\u0379\0\0\u037B\xBB\u0349nArrow;\u61D3\u0100eo\u0387\u03A4ft\u0180ART\u0390\u0396\u03A1rrow;\u61D0ightArrow;\u61D4e\xE5\u02CAng\u0100LR\u03AB\u03C4eft\u0100AR\u03B3\u03B9rrow;\u67F8ightArrow;\u67FAightArrow;\u67F9ight\u0100AT\u03D8\u03DErrow;\u61D2ee;\u62A8p\u0241\u03E9\0\0\u03EFrrow;\u61D1ownArrow;\u61D5erticalBar;\u6225n\u0300ABLRTa\u0412\u042A\u0430\u045E\u047F\u037Crrow\u0180;BU\u041D\u041E\u0422\u6193ar;\u6913pArrow;\u61F5reve;\u4311eft\u02D2\u043A\0\u0446\0\u0450ightVector;\u6950eeVector;\u695Eector\u0100;B\u0459\u045A\u61BDar;\u6956ight\u01D4\u0467\0\u0471eeVector;\u695Fector\u0100;B\u047A\u047B\u61C1ar;\u6957ee\u0100;A\u0486\u0487\u62A4rrow;\u61A7\u0100ct\u0492\u0497r;\uC000\u{1D49F}rok;\u4110\u0800NTacdfglmopqstux\u04BD\u04C0\u04C4\u04CB\u04DE\u04E2\u04E7\u04EE\u04F5\u0521\u052F\u0536\u0552\u055D\u0560\u0565G;\u414AH\u803B\xD0\u40D0cute\u803B\xC9\u40C9\u0180aiy\u04D2\u04D7\u04DCron;\u411Arc\u803B\xCA\u40CA;\u442Dot;\u4116r;\uC000\u{1D508}rave\u803B\xC8\u40C8ement;\u6208\u0100ap\u04FA\u04FEcr;\u4112ty\u0253\u0506\0\0\u0512mallSquare;\u65FBerySmallSquare;\u65AB\u0100gp\u0526\u052Aon;\u4118f;\uC000\u{1D53C}silon;\u4395u\u0100ai\u053C\u0549l\u0100;T\u0542\u0543\u6A75ilde;\u6242librium;\u61CC\u0100ci\u0557\u055Ar;\u6130m;\u6A73a;\u4397ml\u803B\xCB\u40CB\u0100ip\u056A\u056Fsts;\u6203onentialE;\u6147\u0280cfios\u0585\u0588\u058D\u05B2\u05CCy;\u4424r;\uC000\u{1D509}lled\u0253\u0597\0\0\u05A3mallSquare;\u65FCerySmallSquare;\u65AA\u0370\u05BA\0\u05BF\0\0\u05C4f;\uC000\u{1D53D}All;\u6200riertrf;\u6131c\xF2\u05CB\u0600JTabcdfgorst\u05E8\u05EC\u05EF\u05FA\u0600\u0612\u0616\u061B\u061D\u0623\u066C\u0672cy;\u4403\u803B>\u403Emma\u0100;d\u05F7\u05F8\u4393;\u43DCreve;\u411E\u0180eiy\u0607\u060C\u0610dil;\u4122rc;\u411C;\u4413ot;\u4120r;\uC000\u{1D50A};\u62D9pf;\uC000\u{1D53E}eater\u0300EFGLST\u0635\u0644\u064E\u0656\u065B\u0666qual\u0100;L\u063E\u063F\u6265ess;\u62DBullEqual;\u6267reater;\u6AA2ess;\u6277lantEqual;\u6A7Eilde;\u6273cr;\uC000\u{1D4A2};\u626B\u0400Aacfiosu\u0685\u068B\u0696\u069B\u069E\u06AA\u06BE\u06CARDcy;\u442A\u0100ct\u0690\u0694ek;\u42C7;\u405Eirc;\u4124r;\u610ClbertSpace;\u610B\u01F0\u06AF\0\u06B2f;\u610DizontalLine;\u6500\u0100ct\u06C3\u06C5\xF2\u06A9rok;\u4126mp\u0144\u06D0\u06D8ownHum\xF0\u012Fqual;\u624F\u0700EJOacdfgmnostu\u06FA\u06FE\u0703\u0707\u070E\u071A\u071E\u0721\u0728\u0744\u0778\u078B\u078F\u0795cy;\u4415lig;\u4132cy;\u4401cute\u803B\xCD\u40CD\u0100iy\u0713\u0718rc\u803B\xCE\u40CE;\u4418ot;\u4130r;\u6111rave\u803B\xCC\u40CC\u0180;ap\u0720\u072F\u073F\u0100cg\u0734\u0737r;\u412AinaryI;\u6148lie\xF3\u03DD\u01F4\u0749\0\u0762\u0100;e\u074D\u074E\u622C\u0100gr\u0753\u0758ral;\u622Bsection;\u62C2isible\u0100CT\u076C\u0772omma;\u6063imes;\u6062\u0180gpt\u077F\u0783\u0788on;\u412Ef;\uC000\u{1D540}a;\u4399cr;\u6110ilde;\u4128\u01EB\u079A\0\u079Ecy;\u4406l\u803B\xCF\u40CF\u0280cfosu\u07AC\u07B7\u07BC\u07C2\u07D0\u0100iy\u07B1\u07B5rc;\u4134;\u4419r;\uC000\u{1D50D}pf;\uC000\u{1D541}\u01E3\u07C7\0\u07CCr;\uC000\u{1D4A5}rcy;\u4408kcy;\u4404\u0380HJacfos\u07E4\u07E8\u07EC\u07F1\u07FD\u0802\u0808cy;\u4425cy;\u440Cppa;\u439A\u0100ey\u07F6\u07FBdil;\u4136;\u441Ar;\uC000\u{1D50E}pf;\uC000\u{1D542}cr;\uC000\u{1D4A6}\u0580JTaceflmost\u0825\u0829\u082C\u0850\u0863\u09B3\u09B8\u09C7\u09CD\u0A37\u0A47cy;\u4409\u803B<\u403C\u0280cmnpr\u0837\u083C\u0841\u0844\u084Dute;\u4139bda;\u439Bg;\u67EAlacetrf;\u6112r;\u619E\u0180aey\u0857\u085C\u0861ron;\u413Ddil;\u413B;\u441B\u0100fs\u0868\u0970t\u0500ACDFRTUVar\u087E\u08A9\u08B1\u08E0\u08E6\u08FC\u092F\u095B\u0390\u096A\u0100nr\u0883\u088FgleBracket;\u67E8row\u0180;BR\u0899\u089A\u089E\u6190ar;\u61E4ightArrow;\u61C6eiling;\u6308o\u01F5\u08B7\0\u08C3bleBracket;\u67E6n\u01D4\u08C8\0\u08D2eeVector;\u6961ector\u0100;B\u08DB\u08DC\u61C3ar;\u6959loor;\u630Aight\u0100AV\u08EF\u08F5rrow;\u6194ector;\u694E\u0100er\u0901\u0917e\u0180;AV\u0909\u090A\u0910\u62A3rrow;\u61A4ector;\u695Aiangle\u0180;BE\u0924\u0925\u0929\u62B2ar;\u69CFqual;\u62B4p\u0180DTV\u0937\u0942\u094CownVector;\u6951eeVector;\u6960ector\u0100;B\u0956\u0957\u61BFar;\u6958ector\u0100;B\u0965\u0966\u61BCar;\u6952ight\xE1\u039Cs\u0300EFGLST\u097E\u098B\u0995\u099D\u09A2\u09ADqualGreater;\u62DAullEqual;\u6266reater;\u6276ess;\u6AA1lantEqual;\u6A7Dilde;\u6272r;\uC000\u{1D50F}\u0100;e\u09BD\u09BE\u62D8ftarrow;\u61DAidot;\u413F\u0180npw\u09D4\u0A16\u0A1Bg\u0200LRlr\u09DE\u09F7\u0A02\u0A10eft\u0100AR\u09E6\u09ECrrow;\u67F5ightArrow;\u67F7ightArrow;\u67F6eft\u0100ar\u03B3\u0A0Aight\xE1\u03BFight\xE1\u03CAf;\uC000\u{1D543}er\u0100LR\u0A22\u0A2CeftArrow;\u6199ightArrow;\u6198\u0180cht\u0A3E\u0A40\u0A42\xF2\u084C;\u61B0rok;\u4141;\u626A\u0400acefiosu\u0A5A\u0A5D\u0A60\u0A77\u0A7C\u0A85\u0A8B\u0A8Ep;\u6905y;\u441C\u0100dl\u0A65\u0A6FiumSpace;\u605Flintrf;\u6133r;\uC000\u{1D510}nusPlus;\u6213pf;\uC000\u{1D544}c\xF2\u0A76;\u439C\u0480Jacefostu\u0AA3\u0AA7\u0AAD\u0AC0\u0B14\u0B19\u0D91\u0D97\u0D9Ecy;\u440Acute;\u4143\u0180aey\u0AB4\u0AB9\u0ABEron;\u4147dil;\u4145;\u441D\u0180gsw\u0AC7\u0AF0\u0B0Eative\u0180MTV\u0AD3\u0ADF\u0AE8ediumSpace;\u600Bhi\u0100cn\u0AE6\u0AD8\xEB\u0AD9eryThi\xEE\u0AD9ted\u0100GL\u0AF8\u0B06reaterGreate\xF2\u0673essLes\xF3\u0A48Line;\u400Ar;\uC000\u{1D511}\u0200Bnpt\u0B22\u0B28\u0B37\u0B3Areak;\u6060BreakingSpace;\u40A0f;\u6115\u0680;CDEGHLNPRSTV\u0B55\u0B56\u0B6A\u0B7C\u0BA1\u0BEB\u0C04\u0C5E\u0C84\u0CA6\u0CD8\u0D61\u0D85\u6AEC\u0100ou\u0B5B\u0B64ngruent;\u6262pCap;\u626DoubleVerticalBar;\u6226\u0180lqx\u0B83\u0B8A\u0B9Bement;\u6209ual\u0100;T\u0B92\u0B93\u6260ilde;\uC000\u2242\u0338ists;\u6204reater\u0380;EFGLST\u0BB6\u0BB7\u0BBD\u0BC9\u0BD3\u0BD8\u0BE5\u626Fqual;\u6271ullEqual;\uC000\u2267\u0338reater;\uC000\u226B\u0338ess;\u6279lantEqual;\uC000\u2A7E\u0338ilde;\u6275ump\u0144\u0BF2\u0BFDownHump;\uC000\u224E\u0338qual;\uC000\u224F\u0338e\u0100fs\u0C0A\u0C27tTriangle\u0180;BE\u0C1A\u0C1B\u0C21\u62EAar;\uC000\u29CF\u0338qual;\u62ECs\u0300;EGLST\u0C35\u0C36\u0C3C\u0C44\u0C4B\u0C58\u626Equal;\u6270reater;\u6278ess;\uC000\u226A\u0338lantEqual;\uC000\u2A7D\u0338ilde;\u6274ested\u0100GL\u0C68\u0C79reaterGreater;\uC000\u2AA2\u0338essLess;\uC000\u2AA1\u0338recedes\u0180;ES\u0C92\u0C93\u0C9B\u6280qual;\uC000\u2AAF\u0338lantEqual;\u62E0\u0100ei\u0CAB\u0CB9verseElement;\u620CghtTriangle\u0180;BE\u0CCB\u0CCC\u0CD2\u62EBar;\uC000\u29D0\u0338qual;\u62ED\u0100qu\u0CDD\u0D0CuareSu\u0100bp\u0CE8\u0CF9set\u0100;E\u0CF0\u0CF3\uC000\u228F\u0338qual;\u62E2erset\u0100;E\u0D03\u0D06\uC000\u2290\u0338qual;\u62E3\u0180bcp\u0D13\u0D24\u0D4Eset\u0100;E\u0D1B\u0D1E\uC000\u2282\u20D2qual;\u6288ceeds\u0200;EST\u0D32\u0D33\u0D3B\u0D46\u6281qual;\uC000\u2AB0\u0338lantEqual;\u62E1ilde;\uC000\u227F\u0338erset\u0100;E\u0D58\u0D5B\uC000\u2283\u20D2qual;\u6289ilde\u0200;EFT\u0D6E\u0D6F\u0D75\u0D7F\u6241qual;\u6244ullEqual;\u6247ilde;\u6249erticalBar;\u6224cr;\uC000\u{1D4A9}ilde\u803B\xD1\u40D1;\u439D\u0700Eacdfgmoprstuv\u0DBD\u0DC2\u0DC9\u0DD5\u0DDB\u0DE0\u0DE7\u0DFC\u0E02\u0E20\u0E22\u0E32\u0E3F\u0E44lig;\u4152cute\u803B\xD3\u40D3\u0100iy\u0DCE\u0DD3rc\u803B\xD4\u40D4;\u441Eblac;\u4150r;\uC000\u{1D512}rave\u803B\xD2\u40D2\u0180aei\u0DEE\u0DF2\u0DF6cr;\u414Cga;\u43A9cron;\u439Fpf;\uC000\u{1D546}enCurly\u0100DQ\u0E0E\u0E1AoubleQuote;\u601Cuote;\u6018;\u6A54\u0100cl\u0E27\u0E2Cr;\uC000\u{1D4AA}ash\u803B\xD8\u40D8i\u016C\u0E37\u0E3Cde\u803B\xD5\u40D5es;\u6A37ml\u803B\xD6\u40D6er\u0100BP\u0E4B\u0E60\u0100ar\u0E50\u0E53r;\u603Eac\u0100ek\u0E5A\u0E5C;\u63DEet;\u63B4arenthesis;\u63DC\u0480acfhilors\u0E7F\u0E87\u0E8A\u0E8F\u0E92\u0E94\u0E9D\u0EB0\u0EFCrtialD;\u6202y;\u441Fr;\uC000\u{1D513}i;\u43A6;\u43A0usMinus;\u40B1\u0100ip\u0EA2\u0EADncareplan\xE5\u069Df;\u6119\u0200;eio\u0EB9\u0EBA\u0EE0\u0EE4\u6ABBcedes\u0200;EST\u0EC8\u0EC9\u0ECF\u0EDA\u627Aqual;\u6AAFlantEqual;\u627Cilde;\u627Eme;\u6033\u0100dp\u0EE9\u0EEEuct;\u620Fortion\u0100;a\u0225\u0EF9l;\u621D\u0100ci\u0F01\u0F06r;\uC000\u{1D4AB};\u43A8\u0200Ufos\u0F11\u0F16\u0F1B\u0F1FOT\u803B"\u4022r;\uC000\u{1D514}pf;\u611Acr;\uC000\u{1D4AC}\u0600BEacefhiorsu\u0F3E\u0F43\u0F47\u0F60\u0F73\u0FA7\u0FAA\u0FAD\u1096\u10A9\u10B4\u10BEarr;\u6910G\u803B\xAE\u40AE\u0180cnr\u0F4E\u0F53\u0F56ute;\u4154g;\u67EBr\u0100;t\u0F5C\u0F5D\u61A0l;\u6916\u0180aey\u0F67\u0F6C\u0F71ron;\u4158dil;\u4156;\u4420\u0100;v\u0F78\u0F79\u611Cerse\u0100EU\u0F82\u0F99\u0100lq\u0F87\u0F8Eement;\u620Builibrium;\u61CBpEquilibrium;\u696Fr\xBB\u0F79o;\u43A1ght\u0400ACDFTUVa\u0FC1\u0FEB\u0FF3\u1022\u1028\u105B\u1087\u03D8\u0100nr\u0FC6\u0FD2gleBracket;\u67E9row\u0180;BL\u0FDC\u0FDD\u0FE1\u6192ar;\u61E5eftArrow;\u61C4eiling;\u6309o\u01F5\u0FF9\0\u1005bleBracket;\u67E7n\u01D4\u100A\0\u1014eeVector;\u695Dector\u0100;B\u101D\u101E\u61C2ar;\u6955loor;\u630B\u0100er\u102D\u1043e\u0180;AV\u1035\u1036\u103C\u62A2rrow;\u61A6ector;\u695Biangle\u0180;BE\u1050\u1051\u1055\u62B3ar;\u69D0qual;\u62B5p\u0180DTV\u1063\u106E\u1078ownVector;\u694FeeVector;\u695Cector\u0100;B\u1082\u1083\u61BEar;\u6954ector\u0100;B\u1091\u1092\u61C0ar;\u6953\u0100pu\u109B\u109Ef;\u611DndImplies;\u6970ightarrow;\u61DB\u0100ch\u10B9\u10BCr;\u611B;\u61B1leDelayed;\u69F4\u0680HOacfhimoqstu\u10E4\u10F1\u10F7\u10FD\u1119\u111E\u1151\u1156\u1161\u1167\u11B5\u11BB\u11BF\u0100Cc\u10E9\u10EEHcy;\u4429y;\u4428FTcy;\u442Ccute;\u415A\u0280;aeiy\u1108\u1109\u110E\u1113\u1117\u6ABCron;\u4160dil;\u415Erc;\u415C;\u4421r;\uC000\u{1D516}ort\u0200DLRU\u112A\u1134\u113E\u1149ownArrow\xBB\u041EeftArrow\xBB\u089AightArrow\xBB\u0FDDpArrow;\u6191gma;\u43A3allCircle;\u6218pf;\uC000\u{1D54A}\u0272\u116D\0\0\u1170t;\u621Aare\u0200;ISU\u117B\u117C\u1189\u11AF\u65A1ntersection;\u6293u\u0100bp\u118F\u119Eset\u0100;E\u1197\u1198\u628Fqual;\u6291erset\u0100;E\u11A8\u11A9\u6290qual;\u6292nion;\u6294cr;\uC000\u{1D4AE}ar;\u62C6\u0200bcmp\u11C8\u11DB\u1209\u120B\u0100;s\u11CD\u11CE\u62D0et\u0100;E\u11CD\u11D5qual;\u6286\u0100ch\u11E0\u1205eeds\u0200;EST\u11ED\u11EE\u11F4\u11FF\u627Bqual;\u6AB0lantEqual;\u627Dilde;\u627FTh\xE1\u0F8C;\u6211\u0180;es\u1212\u1213\u1223\u62D1rset\u0100;E\u121C\u121D\u6283qual;\u6287et\xBB\u1213\u0580HRSacfhiors\u123E\u1244\u1249\u1255\u125E\u1271\u1276\u129F\u12C2\u12C8\u12D1ORN\u803B\xDE\u40DEADE;\u6122\u0100Hc\u124E\u1252cy;\u440By;\u4426\u0100bu\u125A\u125C;\u4009;\u43A4\u0180aey\u1265\u126A\u126Fron;\u4164dil;\u4162;\u4422r;\uC000\u{1D517}\u0100ei\u127B\u1289\u01F2\u1280\0\u1287efore;\u6234a;\u4398\u0100cn\u128E\u1298kSpace;\uC000\u205F\u200ASpace;\u6009lde\u0200;EFT\u12AB\u12AC\u12B2\u12BC\u623Cqual;\u6243ullEqual;\u6245ilde;\u6248pf;\uC000\u{1D54B}ipleDot;\u60DB\u0100ct\u12D6\u12DBr;\uC000\u{1D4AF}rok;\u4166\u0AE1\u12F7\u130E\u131A\u1326\0\u132C\u1331\0\0\0\0\0\u1338\u133D\u1377\u1385\0\u13FF\u1404\u140A\u1410\u0100cr\u12FB\u1301ute\u803B\xDA\u40DAr\u0100;o\u1307\u1308\u619Fcir;\u6949r\u01E3\u1313\0\u1316y;\u440Eve;\u416C\u0100iy\u131E\u1323rc\u803B\xDB\u40DB;\u4423blac;\u4170r;\uC000\u{1D518}rave\u803B\xD9\u40D9acr;\u416A\u0100di\u1341\u1369er\u0100BP\u1348\u135D\u0100ar\u134D\u1350r;\u405Fac\u0100ek\u1357\u1359;\u63DFet;\u63B5arenthesis;\u63DDon\u0100;P\u1370\u1371\u62C3lus;\u628E\u0100gp\u137B\u137Fon;\u4172f;\uC000\u{1D54C}\u0400ADETadps\u1395\u13AE\u13B8\u13C4\u03E8\u13D2\u13D7\u13F3rrow\u0180;BD\u1150\u13A0\u13A4ar;\u6912ownArrow;\u61C5ownArrow;\u6195quilibrium;\u696Eee\u0100;A\u13CB\u13CC\u62A5rrow;\u61A5own\xE1\u03F3er\u0100LR\u13DE\u13E8eftArrow;\u6196ightArrow;\u6197i\u0100;l\u13F9\u13FA\u43D2on;\u43A5ing;\u416Ecr;\uC000\u{1D4B0}ilde;\u4168ml\u803B\xDC\u40DC\u0480Dbcdefosv\u1427\u142C\u1430\u1433\u143E\u1485\u148A\u1490\u1496ash;\u62ABar;\u6AEBy;\u4412ash\u0100;l\u143B\u143C\u62A9;\u6AE6\u0100er\u1443\u1445;\u62C1\u0180bty\u144C\u1450\u147Aar;\u6016\u0100;i\u144F\u1455cal\u0200BLST\u1461\u1465\u146A\u1474ar;\u6223ine;\u407Ceparator;\u6758ilde;\u6240ThinSpace;\u600Ar;\uC000\u{1D519}pf;\uC000\u{1D54D}cr;\uC000\u{1D4B1}dash;\u62AA\u0280cefos\u14A7\u14AC\u14B1\u14B6\u14BCirc;\u4174dge;\u62C0r;\uC000\u{1D51A}pf;\uC000\u{1D54E}cr;\uC000\u{1D4B2}\u0200fios\u14CB\u14D0\u14D2\u14D8r;\uC000\u{1D51B};\u439Epf;\uC000\u{1D54F}cr;\uC000\u{1D4B3}\u0480AIUacfosu\u14F1\u14F5\u14F9\u14FD\u1504\u150F\u1514\u151A\u1520cy;\u442Fcy;\u4407cy;\u442Ecute\u803B\xDD\u40DD\u0100iy\u1509\u150Drc;\u4176;\u442Br;\uC000\u{1D51C}pf;\uC000\u{1D550}cr;\uC000\u{1D4B4}ml;\u4178\u0400Hacdefos\u1535\u1539\u153F\u154B\u154F\u155D\u1560\u1564cy;\u4416cute;\u4179\u0100ay\u1544\u1549ron;\u417D;\u4417ot;\u417B\u01F2\u1554\0\u155BoWidt\xE8\u0AD9a;\u4396r;\u6128pf;\u6124cr;\uC000\u{1D4B5}\u0BE1\u1583\u158A\u1590\0\u15B0\u15B6\u15BF\0\0\0\0\u15C6\u15DB\u15EB\u165F\u166D\0\u1695\u169B\u16B2\u16B9\0\u16BEcute\u803B\xE1\u40E1reve;\u4103\u0300;Ediuy\u159C\u159D\u15A1\u15A3\u15A8\u15AD\u623E;\uC000\u223E\u0333;\u623Frc\u803B\xE2\u40E2te\u80BB\xB4\u0306;\u4430lig\u803B\xE6\u40E6\u0100;r\xB2\u15BA;\uC000\u{1D51E}rave\u803B\xE0\u40E0\u0100ep\u15CA\u15D6\u0100fp\u15CF\u15D4sym;\u6135\xE8\u15D3ha;\u43B1\u0100ap\u15DFc\u0100cl\u15E4\u15E7r;\u4101g;\u6A3F\u0264\u15F0\0\0\u160A\u0280;adsv\u15FA\u15FB\u15FF\u1601\u1607\u6227nd;\u6A55;\u6A5Clope;\u6A58;\u6A5A\u0380;elmrsz\u1618\u1619\u161B\u161E\u163F\u164F\u1659\u6220;\u69A4e\xBB\u1619sd\u0100;a\u1625\u1626\u6221\u0461\u1630\u1632\u1634\u1636\u1638\u163A\u163C\u163E;\u69A8;\u69A9;\u69AA;\u69AB;\u69AC;\u69AD;\u69AE;\u69AFt\u0100;v\u1645\u1646\u621Fb\u0100;d\u164C\u164D\u62BE;\u699D\u0100pt\u1654\u1657h;\u6222\xBB\xB9arr;\u637C\u0100gp\u1663\u1667on;\u4105f;\uC000\u{1D552}\u0380;Eaeiop\u12C1\u167B\u167D\u1682\u1684\u1687\u168A;\u6A70cir;\u6A6F;\u624Ad;\u624Bs;\u4027rox\u0100;e\u12C1\u1692\xF1\u1683ing\u803B\xE5\u40E5\u0180cty\u16A1\u16A6\u16A8r;\uC000\u{1D4B6};\u402Amp\u0100;e\u12C1\u16AF\xF1\u0288ilde\u803B\xE3\u40E3ml\u803B\xE4\u40E4\u0100ci\u16C2\u16C8onin\xF4\u0272nt;\u6A11\u0800Nabcdefiklnoprsu\u16ED\u16F1\u1730\u173C\u1743\u1748\u1778\u177D\u17E0\u17E6\u1839\u1850\u170D\u193D\u1948\u1970ot;\u6AED\u0100cr\u16F6\u171Ek\u0200ceps\u1700\u1705\u170D\u1713ong;\u624Cpsilon;\u43F6rime;\u6035im\u0100;e\u171A\u171B\u623Dq;\u62CD\u0176\u1722\u1726ee;\u62BDed\u0100;g\u172C\u172D\u6305e\xBB\u172Drk\u0100;t\u135C\u1737brk;\u63B6\u0100oy\u1701\u1741;\u4431quo;\u601E\u0280cmprt\u1753\u175B\u1761\u1764\u1768aus\u0100;e\u010A\u0109ptyv;\u69B0s\xE9\u170Cno\xF5\u0113\u0180ahw\u176F\u1771\u1773;\u43B2;\u6136een;\u626Cr;\uC000\u{1D51F}g\u0380costuvw\u178D\u179D\u17B3\u17C1\u17D5\u17DB\u17DE\u0180aiu\u1794\u1796\u179A\xF0\u0760rc;\u65EFp\xBB\u1371\u0180dpt\u17A4\u17A8\u17ADot;\u6A00lus;\u6A01imes;\u6A02\u0271\u17B9\0\0\u17BEcup;\u6A06ar;\u6605riangle\u0100du\u17CD\u17D2own;\u65BDp;\u65B3plus;\u6A04e\xE5\u1444\xE5\u14ADarow;\u690D\u0180ako\u17ED\u1826\u1835\u0100cn\u17F2\u1823k\u0180lst\u17FA\u05AB\u1802ozenge;\u69EBriangle\u0200;dlr\u1812\u1813\u1818\u181D\u65B4own;\u65BEeft;\u65C2ight;\u65B8k;\u6423\u01B1\u182B\0\u1833\u01B2\u182F\0\u1831;\u6592;\u65914;\u6593ck;\u6588\u0100eo\u183E\u184D\u0100;q\u1843\u1846\uC000=\u20E5uiv;\uC000\u2261\u20E5t;\u6310\u0200ptwx\u1859\u185E\u1867\u186Cf;\uC000\u{1D553}\u0100;t\u13CB\u1863om\xBB\u13CCtie;\u62C8\u0600DHUVbdhmptuv\u1885\u1896\u18AA\u18BB\u18D7\u18DB\u18EC\u18FF\u1905\u190A\u1910\u1921\u0200LRlr\u188E\u1890\u1892\u1894;\u6557;\u6554;\u6556;\u6553\u0280;DUdu\u18A1\u18A2\u18A4\u18A6\u18A8\u6550;\u6566;\u6569;\u6564;\u6567\u0200LRlr\u18B3\u18B5\u18B7\u18B9;\u655D;\u655A;\u655C;\u6559\u0380;HLRhlr\u18CA\u18CB\u18CD\u18CF\u18D1\u18D3\u18D5\u6551;\u656C;\u6563;\u6560;\u656B;\u6562;\u655Fox;\u69C9\u0200LRlr\u18E4\u18E6\u18E8\u18EA;\u6555;\u6552;\u6510;\u650C\u0280;DUdu\u06BD\u18F7\u18F9\u18FB\u18FD;\u6565;\u6568;\u652C;\u6534inus;\u629Flus;\u629Eimes;\u62A0\u0200LRlr\u1919\u191B\u191D\u191F;\u655B;\u6558;\u6518;\u6514\u0380;HLRhlr\u1930\u1931\u1933\u1935\u1937\u1939\u193B\u6502;\u656A;\u6561;\u655E;\u653C;\u6524;\u651C\u0100ev\u0123\u1942bar\u803B\xA6\u40A6\u0200ceio\u1951\u1956\u195A\u1960r;\uC000\u{1D4B7}mi;\u604Fm\u0100;e\u171A\u171Cl\u0180;bh\u1968\u1969\u196B\u405C;\u69C5sub;\u67C8\u016C\u1974\u197El\u0100;e\u1979\u197A\u6022t\xBB\u197Ap\u0180;Ee\u012F\u1985\u1987;\u6AAE\u0100;q\u06DC\u06DB\u0CE1\u19A7\0\u19E8\u1A11\u1A15\u1A32\0\u1A37\u1A50\0\0\u1AB4\0\0\u1AC1\0\0\u1B21\u1B2E\u1B4D\u1B52\0\u1BFD\0\u1C0C\u0180cpr\u19AD\u19B2\u19DDute;\u4107\u0300;abcds\u19BF\u19C0\u19C4\u19CA\u19D5\u19D9\u6229nd;\u6A44rcup;\u6A49\u0100au\u19CF\u19D2p;\u6A4Bp;\u6A47ot;\u6A40;\uC000\u2229\uFE00\u0100eo\u19E2\u19E5t;\u6041\xEE\u0693\u0200aeiu\u19F0\u19FB\u1A01\u1A05\u01F0\u19F5\0\u19F8s;\u6A4Don;\u410Ddil\u803B\xE7\u40E7rc;\u4109ps\u0100;s\u1A0C\u1A0D\u6A4Cm;\u6A50ot;\u410B\u0180dmn\u1A1B\u1A20\u1A26il\u80BB\xB8\u01ADptyv;\u69B2t\u8100\xA2;e\u1A2D\u1A2E\u40A2r\xE4\u01B2r;\uC000\u{1D520}\u0180cei\u1A3D\u1A40\u1A4Dy;\u4447ck\u0100;m\u1A47\u1A48\u6713ark\xBB\u1A48;\u43C7r\u0380;Ecefms\u1A5F\u1A60\u1A62\u1A6B\u1AA4\u1AAA\u1AAE\u65CB;\u69C3\u0180;el\u1A69\u1A6A\u1A6D\u42C6q;\u6257e\u0261\u1A74\0\0\u1A88rrow\u0100lr\u1A7C\u1A81eft;\u61BAight;\u61BB\u0280RSacd\u1A92\u1A94\u1A96\u1A9A\u1A9F\xBB\u0F47;\u64C8st;\u629Birc;\u629Aash;\u629Dnint;\u6A10id;\u6AEFcir;\u69C2ubs\u0100;u\u1ABB\u1ABC\u6663it\xBB\u1ABC\u02EC\u1AC7\u1AD4\u1AFA\0\u1B0Aon\u0100;e\u1ACD\u1ACE\u403A\u0100;q\xC7\xC6\u026D\u1AD9\0\0\u1AE2a\u0100;t\u1ADE\u1ADF\u402C;\u4040\u0180;fl\u1AE8\u1AE9\u1AEB\u6201\xEE\u1160e\u0100mx\u1AF1\u1AF6ent\xBB\u1AE9e\xF3\u024D\u01E7\u1AFE\0\u1B07\u0100;d\u12BB\u1B02ot;\u6A6Dn\xF4\u0246\u0180fry\u1B10\u1B14\u1B17;\uC000\u{1D554}o\xE4\u0254\u8100\xA9;s\u0155\u1B1Dr;\u6117\u0100ao\u1B25\u1B29rr;\u61B5ss;\u6717\u0100cu\u1B32\u1B37r;\uC000\u{1D4B8}\u0100bp\u1B3C\u1B44\u0100;e\u1B41\u1B42\u6ACF;\u6AD1\u0100;e\u1B49\u1B4A\u6AD0;\u6AD2dot;\u62EF\u0380delprvw\u1B60\u1B6C\u1B77\u1B82\u1BAC\u1BD4\u1BF9arr\u0100lr\u1B68\u1B6A;\u6938;\u6935\u0270\u1B72\0\0\u1B75r;\u62DEc;\u62DFarr\u0100;p\u1B7F\u1B80\u61B6;\u693D\u0300;bcdos\u1B8F\u1B90\u1B96\u1BA1\u1BA5\u1BA8\u622Arcap;\u6A48\u0100au\u1B9B\u1B9Ep;\u6A46p;\u6A4Aot;\u628Dr;\u6A45;\uC000\u222A\uFE00\u0200alrv\u1BB5\u1BBF\u1BDE\u1BE3rr\u0100;m\u1BBC\u1BBD\u61B7;\u693Cy\u0180evw\u1BC7\u1BD4\u1BD8q\u0270\u1BCE\0\0\u1BD2re\xE3\u1B73u\xE3\u1B75ee;\u62CEedge;\u62CFen\u803B\xA4\u40A4earrow\u0100lr\u1BEE\u1BF3eft\xBB\u1B80ight\xBB\u1BBDe\xE4\u1BDD\u0100ci\u1C01\u1C07onin\xF4\u01F7nt;\u6231lcty;\u632D\u0980AHabcdefhijlorstuwz\u1C38\u1C3B\u1C3F\u1C5D\u1C69\u1C75\u1C8A\u1C9E\u1CAC\u1CB7\u1CFB\u1CFF\u1D0D\u1D7B\u1D91\u1DAB\u1DBB\u1DC6\u1DCDr\xF2\u0381ar;\u6965\u0200glrs\u1C48\u1C4D\u1C52\u1C54ger;\u6020eth;\u6138\xF2\u1133h\u0100;v\u1C5A\u1C5B\u6010\xBB\u090A\u016B\u1C61\u1C67arow;\u690Fa\xE3\u0315\u0100ay\u1C6E\u1C73ron;\u410F;\u4434\u0180;ao\u0332\u1C7C\u1C84\u0100gr\u02BF\u1C81r;\u61CAtseq;\u6A77\u0180glm\u1C91\u1C94\u1C98\u803B\xB0\u40B0ta;\u43B4ptyv;\u69B1\u0100ir\u1CA3\u1CA8sht;\u697F;\uC000\u{1D521}ar\u0100lr\u1CB3\u1CB5\xBB\u08DC\xBB\u101E\u0280aegsv\u1CC2\u0378\u1CD6\u1CDC\u1CE0m\u0180;os\u0326\u1CCA\u1CD4nd\u0100;s\u0326\u1CD1uit;\u6666amma;\u43DDin;\u62F2\u0180;io\u1CE7\u1CE8\u1CF8\u40F7de\u8100\xF7;o\u1CE7\u1CF0ntimes;\u62C7n\xF8\u1CF7cy;\u4452c\u026F\u1D06\0\0\u1D0Arn;\u631Eop;\u630D\u0280lptuw\u1D18\u1D1D\u1D22\u1D49\u1D55lar;\u4024f;\uC000\u{1D555}\u0280;emps\u030B\u1D2D\u1D37\u1D3D\u1D42q\u0100;d\u0352\u1D33ot;\u6251inus;\u6238lus;\u6214quare;\u62A1blebarwedg\xE5\xFAn\u0180adh\u112E\u1D5D\u1D67ownarrow\xF3\u1C83arpoon\u0100lr\u1D72\u1D76ef\xF4\u1CB4igh\xF4\u1CB6\u0162\u1D7F\u1D85karo\xF7\u0F42\u026F\u1D8A\0\0\u1D8Ern;\u631Fop;\u630C\u0180cot\u1D98\u1DA3\u1DA6\u0100ry\u1D9D\u1DA1;\uC000\u{1D4B9};\u4455l;\u69F6rok;\u4111\u0100dr\u1DB0\u1DB4ot;\u62F1i\u0100;f\u1DBA\u1816\u65BF\u0100ah\u1DC0\u1DC3r\xF2\u0429a\xF2\u0FA6angle;\u69A6\u0100ci\u1DD2\u1DD5y;\u445Fgrarr;\u67FF\u0900Dacdefglmnopqrstux\u1E01\u1E09\u1E19\u1E38\u0578\u1E3C\u1E49\u1E61\u1E7E\u1EA5\u1EAF\u1EBD\u1EE1\u1F2A\u1F37\u1F44\u1F4E\u1F5A\u0100Do\u1E06\u1D34o\xF4\u1C89\u0100cs\u1E0E\u1E14ute\u803B\xE9\u40E9ter;\u6A6E\u0200aioy\u1E22\u1E27\u1E31\u1E36ron;\u411Br\u0100;c\u1E2D\u1E2E\u6256\u803B\xEA\u40EAlon;\u6255;\u444Dot;\u4117\u0100Dr\u1E41\u1E45ot;\u6252;\uC000\u{1D522}\u0180;rs\u1E50\u1E51\u1E57\u6A9Aave\u803B\xE8\u40E8\u0100;d\u1E5C\u1E5D\u6A96ot;\u6A98\u0200;ils\u1E6A\u1E6B\u1E72\u1E74\u6A99nters;\u63E7;\u6113\u0100;d\u1E79\u1E7A\u6A95ot;\u6A97\u0180aps\u1E85\u1E89\u1E97cr;\u4113ty\u0180;sv\u1E92\u1E93\u1E95\u6205et\xBB\u1E93p\u01001;\u1E9D\u1EA4\u0133\u1EA1\u1EA3;\u6004;\u6005\u6003\u0100gs\u1EAA\u1EAC;\u414Bp;\u6002\u0100gp\u1EB4\u1EB8on;\u4119f;\uC000\u{1D556}\u0180als\u1EC4\u1ECE\u1ED2r\u0100;s\u1ECA\u1ECB\u62D5l;\u69E3us;\u6A71i\u0180;lv\u1EDA\u1EDB\u1EDF\u43B5on\xBB\u1EDB;\u43F5\u0200csuv\u1EEA\u1EF3\u1F0B\u1F23\u0100io\u1EEF\u1E31rc\xBB\u1E2E\u0269\u1EF9\0\0\u1EFB\xED\u0548ant\u0100gl\u1F02\u1F06tr\xBB\u1E5Dess\xBB\u1E7A\u0180aei\u1F12\u1F16\u1F1Als;\u403Dst;\u625Fv\u0100;D\u0235\u1F20D;\u6A78parsl;\u69E5\u0100Da\u1F2F\u1F33ot;\u6253rr;\u6971\u0180cdi\u1F3E\u1F41\u1EF8r;\u612Fo\xF4\u0352\u0100ah\u1F49\u1F4B;\u43B7\u803B\xF0\u40F0\u0100mr\u1F53\u1F57l\u803B\xEB\u40EBo;\u60AC\u0180cip\u1F61\u1F64\u1F67l;\u4021s\xF4\u056E\u0100eo\u1F6C\u1F74ctatio\xEE\u0559nential\xE5\u0579\u09E1\u1F92\0\u1F9E\0\u1FA1\u1FA7\0\0\u1FC6\u1FCC\0\u1FD3\0\u1FE6\u1FEA\u2000\0\u2008\u205Allingdotse\xF1\u1E44y;\u4444male;\u6640\u0180ilr\u1FAD\u1FB3\u1FC1lig;\u8000\uFB03\u0269\u1FB9\0\0\u1FBDg;\u8000\uFB00ig;\u8000\uFB04;\uC000\u{1D523}lig;\u8000\uFB01lig;\uC000fj\u0180alt\u1FD9\u1FDC\u1FE1t;\u666Dig;\u8000\uFB02ns;\u65B1of;\u4192\u01F0\u1FEE\0\u1FF3f;\uC000\u{1D557}\u0100ak\u05BF\u1FF7\u0100;v\u1FFC\u1FFD\u62D4;\u6AD9artint;\u6A0D\u0100ao\u200C\u2055\u0100cs\u2011\u2052\u03B1\u201A\u2030\u2038\u2045\u2048\0\u2050\u03B2\u2022\u2025\u2027\u202A\u202C\0\u202E\u803B\xBD\u40BD;\u6153\u803B\xBC\u40BC;\u6155;\u6159;\u615B\u01B3\u2034\0\u2036;\u6154;\u6156\u02B4\u203E\u2041\0\0\u2043\u803B\xBE\u40BE;\u6157;\u615C5;\u6158\u01B6\u204C\0\u204E;\u615A;\u615D8;\u615El;\u6044wn;\u6322cr;\uC000\u{1D4BB}\u0880Eabcdefgijlnorstv\u2082\u2089\u209F\u20A5\u20B0\u20B4\u20F0\u20F5\u20FA\u20FF\u2103\u2112\u2138\u0317\u213E\u2152\u219E\u0100;l\u064D\u2087;\u6A8C\u0180cmp\u2090\u2095\u209Dute;\u41F5ma\u0100;d\u209C\u1CDA\u43B3;\u6A86reve;\u411F\u0100iy\u20AA\u20AErc;\u411D;\u4433ot;\u4121\u0200;lqs\u063E\u0642\u20BD\u20C9\u0180;qs\u063E\u064C\u20C4lan\xF4\u0665\u0200;cdl\u0665\u20D2\u20D5\u20E5c;\u6AA9ot\u0100;o\u20DC\u20DD\u6A80\u0100;l\u20E2\u20E3\u6A82;\u6A84\u0100;e\u20EA\u20ED\uC000\u22DB\uFE00s;\u6A94r;\uC000\u{1D524}\u0100;g\u0673\u061Bmel;\u6137cy;\u4453\u0200;Eaj\u065A\u210C\u210E\u2110;\u6A92;\u6AA5;\u6AA4\u0200Eaes\u211B\u211D\u2129\u2134;\u6269p\u0100;p\u2123\u2124\u6A8Arox\xBB\u2124\u0100;q\u212E\u212F\u6A88\u0100;q\u212E\u211Bim;\u62E7pf;\uC000\u{1D558}\u0100ci\u2143\u2146r;\u610Am\u0180;el\u066B\u214E\u2150;\u6A8E;\u6A90\u8300>;cdlqr\u05EE\u2160\u216A\u216E\u2173\u2179\u0100ci\u2165\u2167;\u6AA7r;\u6A7Aot;\u62D7Par;\u6995uest;\u6A7C\u0280adels\u2184\u216A\u2190\u0656\u219B\u01F0\u2189\0\u218Epro\xF8\u209Er;\u6978q\u0100lq\u063F\u2196les\xF3\u2088i\xED\u066B\u0100en\u21A3\u21ADrtneqq;\uC000\u2269\uFE00\xC5\u21AA\u0500Aabcefkosy\u21C4\u21C7\u21F1\u21F5\u21FA\u2218\u221D\u222F\u2268\u227Dr\xF2\u03A0\u0200ilmr\u21D0\u21D4\u21D7\u21DBrs\xF0\u1484f\xBB\u2024il\xF4\u06A9\u0100dr\u21E0\u21E4cy;\u444A\u0180;cw\u08F4\u21EB\u21EFir;\u6948;\u61ADar;\u610Firc;\u4125\u0180alr\u2201\u220E\u2213rts\u0100;u\u2209\u220A\u6665it\xBB\u220Alip;\u6026con;\u62B9r;\uC000\u{1D525}s\u0100ew\u2223\u2229arow;\u6925arow;\u6926\u0280amopr\u223A\u223E\u2243\u225E\u2263rr;\u61FFtht;\u623Bk\u0100lr\u2249\u2253eftarrow;\u61A9ightarrow;\u61AAf;\uC000\u{1D559}bar;\u6015\u0180clt\u226F\u2274\u2278r;\uC000\u{1D4BD}as\xE8\u21F4rok;\u4127\u0100bp\u2282\u2287ull;\u6043hen\xBB\u1C5B\u0AE1\u22A3\0\u22AA\0\u22B8\u22C5\u22CE\0\u22D5\u22F3\0\0\u22F8\u2322\u2367\u2362\u237F\0\u2386\u23AA\u23B4cute\u803B\xED\u40ED\u0180;iy\u0771\u22B0\u22B5rc\u803B\xEE\u40EE;\u4438\u0100cx\u22BC\u22BFy;\u4435cl\u803B\xA1\u40A1\u0100fr\u039F\u22C9;\uC000\u{1D526}rave\u803B\xEC\u40EC\u0200;ino\u073E\u22DD\u22E9\u22EE\u0100in\u22E2\u22E6nt;\u6A0Ct;\u622Dfin;\u69DCta;\u6129lig;\u4133\u0180aop\u22FE\u231A\u231D\u0180cgt\u2305\u2308\u2317r;\u412B\u0180elp\u071F\u230F\u2313in\xE5\u078Ear\xF4\u0720h;\u4131f;\u62B7ed;\u41B5\u0280;cfot\u04F4\u232C\u2331\u233D\u2341are;\u6105in\u0100;t\u2338\u2339\u621Eie;\u69DDdo\xF4\u2319\u0280;celp\u0757\u234C\u2350\u235B\u2361al;\u62BA\u0100gr\u2355\u2359er\xF3\u1563\xE3\u234Darhk;\u6A17rod;\u6A3C\u0200cgpt\u236F\u2372\u2376\u237By;\u4451on;\u412Ff;\uC000\u{1D55A}a;\u43B9uest\u803B\xBF\u40BF\u0100ci\u238A\u238Fr;\uC000\u{1D4BE}n\u0280;Edsv\u04F4\u239B\u239D\u23A1\u04F3;\u62F9ot;\u62F5\u0100;v\u23A6\u23A7\u62F4;\u62F3\u0100;i\u0777\u23AElde;\u4129\u01EB\u23B8\0\u23BCcy;\u4456l\u803B\xEF\u40EF\u0300cfmosu\u23CC\u23D7\u23DC\u23E1\u23E7\u23F5\u0100iy\u23D1\u23D5rc;\u4135;\u4439r;\uC000\u{1D527}ath;\u4237pf;\uC000\u{1D55B}\u01E3\u23EC\0\u23F1r;\uC000\u{1D4BF}rcy;\u4458kcy;\u4454\u0400acfghjos\u240B\u2416\u2422\u2427\u242D\u2431\u2435\u243Bppa\u0100;v\u2413\u2414\u43BA;\u43F0\u0100ey\u241B\u2420dil;\u4137;\u443Ar;\uC000\u{1D528}reen;\u4138cy;\u4445cy;\u445Cpf;\uC000\u{1D55C}cr;\uC000\u{1D4C0}\u0B80ABEHabcdefghjlmnoprstuv\u2470\u2481\u2486\u248D\u2491\u250E\u253D\u255A\u2580\u264E\u265E\u2665\u2679\u267D\u269A\u26B2\u26D8\u275D\u2768\u278B\u27C0\u2801\u2812\u0180art\u2477\u247A\u247Cr\xF2\u09C6\xF2\u0395ail;\u691Barr;\u690E\u0100;g\u0994\u248B;\u6A8Bar;\u6962\u0963\u24A5\0\u24AA\0\u24B1\0\0\0\0\0\u24B5\u24BA\0\u24C6\u24C8\u24CD\0\u24F9ute;\u413Amptyv;\u69B4ra\xEE\u084Cbda;\u43BBg\u0180;dl\u088E\u24C1\u24C3;\u6991\xE5\u088E;\u6A85uo\u803B\xAB\u40ABr\u0400;bfhlpst\u0899\u24DE\u24E6\u24E9\u24EB\u24EE\u24F1\u24F5\u0100;f\u089D\u24E3s;\u691Fs;\u691D\xEB\u2252p;\u61ABl;\u6939im;\u6973l;\u61A2\u0180;ae\u24FF\u2500\u2504\u6AABil;\u6919\u0100;s\u2509\u250A\u6AAD;\uC000\u2AAD\uFE00\u0180abr\u2515\u2519\u251Drr;\u690Crk;\u6772\u0100ak\u2522\u252Cc\u0100ek\u2528\u252A;\u407B;\u405B\u0100es\u2531\u2533;\u698Bl\u0100du\u2539\u253B;\u698F;\u698D\u0200aeuy\u2546\u254B\u2556\u2558ron;\u413E\u0100di\u2550\u2554il;\u413C\xEC\u08B0\xE2\u2529;\u443B\u0200cqrs\u2563\u2566\u256D\u257Da;\u6936uo\u0100;r\u0E19\u1746\u0100du\u2572\u2577har;\u6967shar;\u694Bh;\u61B2\u0280;fgqs\u258B\u258C\u0989\u25F3\u25FF\u6264t\u0280ahlrt\u2598\u25A4\u25B7\u25C2\u25E8rrow\u0100;t\u0899\u25A1a\xE9\u24F6arpoon\u0100du\u25AF\u25B4own\xBB\u045Ap\xBB\u0966eftarrows;\u61C7ight\u0180ahs\u25CD\u25D6\u25DErrow\u0100;s\u08F4\u08A7arpoon\xF3\u0F98quigarro\xF7\u21F0hreetimes;\u62CB\u0180;qs\u258B\u0993\u25FAlan\xF4\u09AC\u0280;cdgs\u09AC\u260A\u260D\u261D\u2628c;\u6AA8ot\u0100;o\u2614\u2615\u6A7F\u0100;r\u261A\u261B\u6A81;\u6A83\u0100;e\u2622\u2625\uC000\u22DA\uFE00s;\u6A93\u0280adegs\u2633\u2639\u263D\u2649\u264Bppro\xF8\u24C6ot;\u62D6q\u0100gq\u2643\u2645\xF4\u0989gt\xF2\u248C\xF4\u099Bi\xED\u09B2\u0180ilr\u2655\u08E1\u265Asht;\u697C;\uC000\u{1D529}\u0100;E\u099C\u2663;\u6A91\u0161\u2669\u2676r\u0100du\u25B2\u266E\u0100;l\u0965\u2673;\u696Alk;\u6584cy;\u4459\u0280;acht\u0A48\u2688\u268B\u2691\u2696r\xF2\u25C1orne\xF2\u1D08ard;\u696Bri;\u65FA\u0100io\u269F\u26A4dot;\u4140ust\u0100;a\u26AC\u26AD\u63B0che\xBB\u26AD\u0200Eaes\u26BB\u26BD\u26C9\u26D4;\u6268p\u0100;p\u26C3\u26C4\u6A89rox\xBB\u26C4\u0100;q\u26CE\u26CF\u6A87\u0100;q\u26CE\u26BBim;\u62E6\u0400abnoptwz\u26E9\u26F4\u26F7\u271A\u272F\u2741\u2747\u2750\u0100nr\u26EE\u26F1g;\u67ECr;\u61FDr\xEB\u08C1g\u0180lmr\u26FF\u270D\u2714eft\u0100ar\u09E6\u2707ight\xE1\u09F2apsto;\u67FCight\xE1\u09FDparrow\u0100lr\u2725\u2729ef\xF4\u24EDight;\u61AC\u0180afl\u2736\u2739\u273Dr;\u6985;\uC000\u{1D55D}us;\u6A2Dimes;\u6A34\u0161\u274B\u274Fst;\u6217\xE1\u134E\u0180;ef\u2757\u2758\u1800\u65CAnge\xBB\u2758ar\u0100;l\u2764\u2765\u4028t;\u6993\u0280achmt\u2773\u2776\u277C\u2785\u2787r\xF2\u08A8orne\xF2\u1D8Car\u0100;d\u0F98\u2783;\u696D;\u600Eri;\u62BF\u0300achiqt\u2798\u279D\u0A40\u27A2\u27AE\u27BBquo;\u6039r;\uC000\u{1D4C1}m\u0180;eg\u09B2\u27AA\u27AC;\u6A8D;\u6A8F\u0100bu\u252A\u27B3o\u0100;r\u0E1F\u27B9;\u601Arok;\u4142\u8400<;cdhilqr\u082B\u27D2\u2639\u27DC\u27E0\u27E5\u27EA\u27F0\u0100ci\u27D7\u27D9;\u6AA6r;\u6A79re\xE5\u25F2mes;\u62C9arr;\u6976uest;\u6A7B\u0100Pi\u27F5\u27F9ar;\u6996\u0180;ef\u2800\u092D\u181B\u65C3r\u0100du\u2807\u280Dshar;\u694Ahar;\u6966\u0100en\u2817\u2821rtneqq;\uC000\u2268\uFE00\xC5\u281E\u0700Dacdefhilnopsu\u2840\u2845\u2882\u288E\u2893\u28A0\u28A5\u28A8\u28DA\u28E2\u28E4\u0A83\u28F3\u2902Dot;\u623A\u0200clpr\u284E\u2852\u2863\u287Dr\u803B\xAF\u40AF\u0100et\u2857\u2859;\u6642\u0100;e\u285E\u285F\u6720se\xBB\u285F\u0100;s\u103B\u2868to\u0200;dlu\u103B\u2873\u2877\u287Bow\xEE\u048Cef\xF4\u090F\xF0\u13D1ker;\u65AE\u0100oy\u2887\u288Cmma;\u6A29;\u443Cash;\u6014asuredangle\xBB\u1626r;\uC000\u{1D52A}o;\u6127\u0180cdn\u28AF\u28B4\u28C9ro\u803B\xB5\u40B5\u0200;acd\u1464\u28BD\u28C0\u28C4s\xF4\u16A7ir;\u6AF0ot\u80BB\xB7\u01B5us\u0180;bd\u28D2\u1903\u28D3\u6212\u0100;u\u1D3C\u28D8;\u6A2A\u0163\u28DE\u28E1p;\u6ADB\xF2\u2212\xF0\u0A81\u0100dp\u28E9\u28EEels;\u62A7f;\uC000\u{1D55E}\u0100ct\u28F8\u28FDr;\uC000\u{1D4C2}pos\xBB\u159D\u0180;lm\u2909\u290A\u290D\u43BCtimap;\u62B8\u0C00GLRVabcdefghijlmoprstuvw\u2942\u2953\u297E\u2989\u2998\u29DA\u29E9\u2A15\u2A1A\u2A58\u2A5D\u2A83\u2A95\u2AA4\u2AA8\u2B04\u2B07\u2B44\u2B7F\u2BAE\u2C34\u2C67\u2C7C\u2CE9\u0100gt\u2947\u294B;\uC000\u22D9\u0338\u0100;v\u2950\u0BCF\uC000\u226B\u20D2\u0180elt\u295A\u2972\u2976ft\u0100ar\u2961\u2967rrow;\u61CDightarrow;\u61CE;\uC000\u22D8\u0338\u0100;v\u297B\u0C47\uC000\u226A\u20D2ightarrow;\u61CF\u0100Dd\u298E\u2993ash;\u62AFash;\u62AE\u0280bcnpt\u29A3\u29A7\u29AC\u29B1\u29CCla\xBB\u02DEute;\u4144g;\uC000\u2220\u20D2\u0280;Eiop\u0D84\u29BC\u29C0\u29C5\u29C8;\uC000\u2A70\u0338d;\uC000\u224B\u0338s;\u4149ro\xF8\u0D84ur\u0100;a\u29D3\u29D4\u666El\u0100;s\u29D3\u0B38\u01F3\u29DF\0\u29E3p\u80BB\xA0\u0B37mp\u0100;e\u0BF9\u0C00\u0280aeouy\u29F4\u29FE\u2A03\u2A10\u2A13\u01F0\u29F9\0\u29FB;\u6A43on;\u4148dil;\u4146ng\u0100;d\u0D7E\u2A0Aot;\uC000\u2A6D\u0338p;\u6A42;\u443Dash;\u6013\u0380;Aadqsx\u0B92\u2A29\u2A2D\u2A3B\u2A41\u2A45\u2A50rr;\u61D7r\u0100hr\u2A33\u2A36k;\u6924\u0100;o\u13F2\u13F0ot;\uC000\u2250\u0338ui\xF6\u0B63\u0100ei\u2A4A\u2A4Ear;\u6928\xED\u0B98ist\u0100;s\u0BA0\u0B9Fr;\uC000\u{1D52B}\u0200Eest\u0BC5\u2A66\u2A79\u2A7C\u0180;qs\u0BBC\u2A6D\u0BE1\u0180;qs\u0BBC\u0BC5\u2A74lan\xF4\u0BE2i\xED\u0BEA\u0100;r\u0BB6\u2A81\xBB\u0BB7\u0180Aap\u2A8A\u2A8D\u2A91r\xF2\u2971rr;\u61AEar;\u6AF2\u0180;sv\u0F8D\u2A9C\u0F8C\u0100;d\u2AA1\u2AA2\u62FC;\u62FAcy;\u445A\u0380AEadest\u2AB7\u2ABA\u2ABE\u2AC2\u2AC5\u2AF6\u2AF9r\xF2\u2966;\uC000\u2266\u0338rr;\u619Ar;\u6025\u0200;fqs\u0C3B\u2ACE\u2AE3\u2AEFt\u0100ar\u2AD4\u2AD9rro\xF7\u2AC1ightarro\xF7\u2A90\u0180;qs\u0C3B\u2ABA\u2AEAlan\xF4\u0C55\u0100;s\u0C55\u2AF4\xBB\u0C36i\xED\u0C5D\u0100;r\u0C35\u2AFEi\u0100;e\u0C1A\u0C25i\xE4\u0D90\u0100pt\u2B0C\u2B11f;\uC000\u{1D55F}\u8180\xAC;in\u2B19\u2B1A\u2B36\u40ACn\u0200;Edv\u0B89\u2B24\u2B28\u2B2E;\uC000\u22F9\u0338ot;\uC000\u22F5\u0338\u01E1\u0B89\u2B33\u2B35;\u62F7;\u62F6i\u0100;v\u0CB8\u2B3C\u01E1\u0CB8\u2B41\u2B43;\u62FE;\u62FD\u0180aor\u2B4B\u2B63\u2B69r\u0200;ast\u0B7B\u2B55\u2B5A\u2B5Flle\xEC\u0B7Bl;\uC000\u2AFD\u20E5;\uC000\u2202\u0338lint;\u6A14\u0180;ce\u0C92\u2B70\u2B73u\xE5\u0CA5\u0100;c\u0C98\u2B78\u0100;e\u0C92\u2B7D\xF1\u0C98\u0200Aait\u2B88\u2B8B\u2B9D\u2BA7r\xF2\u2988rr\u0180;cw\u2B94\u2B95\u2B99\u619B;\uC000\u2933\u0338;\uC000\u219D\u0338ghtarrow\xBB\u2B95ri\u0100;e\u0CCB\u0CD6\u0380chimpqu\u2BBD\u2BCD\u2BD9\u2B04\u0B78\u2BE4\u2BEF\u0200;cer\u0D32\u2BC6\u0D37\u2BC9u\xE5\u0D45;\uC000\u{1D4C3}ort\u026D\u2B05\0\0\u2BD6ar\xE1\u2B56m\u0100;e\u0D6E\u2BDF\u0100;q\u0D74\u0D73su\u0100bp\u2BEB\u2BED\xE5\u0CF8\xE5\u0D0B\u0180bcp\u2BF6\u2C11\u2C19\u0200;Ees\u2BFF\u2C00\u0D22\u2C04\u6284;\uC000\u2AC5\u0338et\u0100;e\u0D1B\u2C0Bq\u0100;q\u0D23\u2C00c\u0100;e\u0D32\u2C17\xF1\u0D38\u0200;Ees\u2C22\u2C23\u0D5F\u2C27\u6285;\uC000\u2AC6\u0338et\u0100;e\u0D58\u2C2Eq\u0100;q\u0D60\u2C23\u0200gilr\u2C3D\u2C3F\u2C45\u2C47\xEC\u0BD7lde\u803B\xF1\u40F1\xE7\u0C43iangle\u0100lr\u2C52\u2C5Ceft\u0100;e\u0C1A\u2C5A\xF1\u0C26ight\u0100;e\u0CCB\u2C65\xF1\u0CD7\u0100;m\u2C6C\u2C6D\u43BD\u0180;es\u2C74\u2C75\u2C79\u4023ro;\u6116p;\u6007\u0480DHadgilrs\u2C8F\u2C94\u2C99\u2C9E\u2CA3\u2CB0\u2CB6\u2CD3\u2CE3ash;\u62ADarr;\u6904p;\uC000\u224D\u20D2ash;\u62AC\u0100et\u2CA8\u2CAC;\uC000\u2265\u20D2;\uC000>\u20D2nfin;\u69DE\u0180Aet\u2CBD\u2CC1\u2CC5rr;\u6902;\uC000\u2264\u20D2\u0100;r\u2CCA\u2CCD\uC000<\u20D2ie;\uC000\u22B4\u20D2\u0100At\u2CD8\u2CDCrr;\u6903rie;\uC000\u22B5\u20D2im;\uC000\u223C\u20D2\u0180Aan\u2CF0\u2CF4\u2D02rr;\u61D6r\u0100hr\u2CFA\u2CFDk;\u6923\u0100;o\u13E7\u13E5ear;\u6927\u1253\u1A95\0\0\0\0\0\0\0\0\0\0\0\0\0\u2D2D\0\u2D38\u2D48\u2D60\u2D65\u2D72\u2D84\u1B07\0\0\u2D8D\u2DAB\0\u2DC8\u2DCE\0\u2DDC\u2E19\u2E2B\u2E3E\u2E43\u0100cs\u2D31\u1A97ute\u803B\xF3\u40F3\u0100iy\u2D3C\u2D45r\u0100;c\u1A9E\u2D42\u803B\xF4\u40F4;\u443E\u0280abios\u1AA0\u2D52\u2D57\u01C8\u2D5Alac;\u4151v;\u6A38old;\u69BClig;\u4153\u0100cr\u2D69\u2D6Dir;\u69BF;\uC000\u{1D52C}\u036F\u2D79\0\0\u2D7C\0\u2D82n;\u42DBave\u803B\xF2\u40F2;\u69C1\u0100bm\u2D88\u0DF4ar;\u69B5\u0200acit\u2D95\u2D98\u2DA5\u2DA8r\xF2\u1A80\u0100ir\u2D9D\u2DA0r;\u69BEoss;\u69BBn\xE5\u0E52;\u69C0\u0180aei\u2DB1\u2DB5\u2DB9cr;\u414Dga;\u43C9\u0180cdn\u2DC0\u2DC5\u01CDron;\u43BF;\u69B6pf;\uC000\u{1D560}\u0180ael\u2DD4\u2DD7\u01D2r;\u69B7rp;\u69B9\u0380;adiosv\u2DEA\u2DEB\u2DEE\u2E08\u2E0D\u2E10\u2E16\u6228r\xF2\u1A86\u0200;efm\u2DF7\u2DF8\u2E02\u2E05\u6A5Dr\u0100;o\u2DFE\u2DFF\u6134f\xBB\u2DFF\u803B\xAA\u40AA\u803B\xBA\u40BAgof;\u62B6r;\u6A56lope;\u6A57;\u6A5B\u0180clo\u2E1F\u2E21\u2E27\xF2\u2E01ash\u803B\xF8\u40F8l;\u6298i\u016C\u2E2F\u2E34de\u803B\xF5\u40F5es\u0100;a\u01DB\u2E3As;\u6A36ml\u803B\xF6\u40F6bar;\u633D\u0AE1\u2E5E\0\u2E7D\0\u2E80\u2E9D\0\u2EA2\u2EB9\0\0\u2ECB\u0E9C\0\u2F13\0\0\u2F2B\u2FBC\0\u2FC8r\u0200;ast\u0403\u2E67\u2E72\u0E85\u8100\xB6;l\u2E6D\u2E6E\u40B6le\xEC\u0403\u0269\u2E78\0\0\u2E7Bm;\u6AF3;\u6AFDy;\u443Fr\u0280cimpt\u2E8B\u2E8F\u2E93\u1865\u2E97nt;\u4025od;\u402Eil;\u6030enk;\u6031r;\uC000\u{1D52D}\u0180imo\u2EA8\u2EB0\u2EB4\u0100;v\u2EAD\u2EAE\u43C6;\u43D5ma\xF4\u0A76ne;\u660E\u0180;tv\u2EBF\u2EC0\u2EC8\u43C0chfork\xBB\u1FFD;\u43D6\u0100au\u2ECF\u2EDFn\u0100ck\u2ED5\u2EDDk\u0100;h\u21F4\u2EDB;\u610E\xF6\u21F4s\u0480;abcdemst\u2EF3\u2EF4\u1908\u2EF9\u2EFD\u2F04\u2F06\u2F0A\u2F0E\u402Bcir;\u6A23ir;\u6A22\u0100ou\u1D40\u2F02;\u6A25;\u6A72n\u80BB\xB1\u0E9Dim;\u6A26wo;\u6A27\u0180ipu\u2F19\u2F20\u2F25ntint;\u6A15f;\uC000\u{1D561}nd\u803B\xA3\u40A3\u0500;Eaceinosu\u0EC8\u2F3F\u2F41\u2F44\u2F47\u2F81\u2F89\u2F92\u2F7E\u2FB6;\u6AB3p;\u6AB7u\xE5\u0ED9\u0100;c\u0ECE\u2F4C\u0300;acens\u0EC8\u2F59\u2F5F\u2F66\u2F68\u2F7Eppro\xF8\u2F43urlye\xF1\u0ED9\xF1\u0ECE\u0180aes\u2F6F\u2F76\u2F7Approx;\u6AB9qq;\u6AB5im;\u62E8i\xED\u0EDFme\u0100;s\u2F88\u0EAE\u6032\u0180Eas\u2F78\u2F90\u2F7A\xF0\u2F75\u0180dfp\u0EEC\u2F99\u2FAF\u0180als\u2FA0\u2FA5\u2FAAlar;\u632Eine;\u6312urf;\u6313\u0100;t\u0EFB\u2FB4\xEF\u0EFBrel;\u62B0\u0100ci\u2FC0\u2FC5r;\uC000\u{1D4C5};\u43C8ncsp;\u6008\u0300fiopsu\u2FDA\u22E2\u2FDF\u2FE5\u2FEB\u2FF1r;\uC000\u{1D52E}pf;\uC000\u{1D562}rime;\u6057cr;\uC000\u{1D4C6}\u0180aeo\u2FF8\u3009\u3013t\u0100ei\u2FFE\u3005rnion\xF3\u06B0nt;\u6A16st\u0100;e\u3010\u3011\u403F\xF1\u1F19\xF4\u0F14\u0A80ABHabcdefhilmnoprstux\u3040\u3051\u3055\u3059\u30E0\u310E\u312B\u3147\u3162\u3172\u318E\u3206\u3215\u3224\u3229\u3258\u326E\u3272\u3290\u32B0\u32B7\u0180art\u3047\u304A\u304Cr\xF2\u10B3\xF2\u03DDail;\u691Car\xF2\u1C65ar;\u6964\u0380cdenqrt\u3068\u3075\u3078\u307F\u308F\u3094\u30CC\u0100eu\u306D\u3071;\uC000\u223D\u0331te;\u4155i\xE3\u116Emptyv;\u69B3g\u0200;del\u0FD1\u3089\u308B\u308D;\u6992;\u69A5\xE5\u0FD1uo\u803B\xBB\u40BBr\u0580;abcfhlpstw\u0FDC\u30AC\u30AF\u30B7\u30B9\u30BC\u30BE\u30C0\u30C3\u30C7\u30CAp;\u6975\u0100;f\u0FE0\u30B4s;\u6920;\u6933s;\u691E\xEB\u225D\xF0\u272El;\u6945im;\u6974l;\u61A3;\u619D\u0100ai\u30D1\u30D5il;\u691Ao\u0100;n\u30DB\u30DC\u6236al\xF3\u0F1E\u0180abr\u30E7\u30EA\u30EEr\xF2\u17E5rk;\u6773\u0100ak\u30F3\u30FDc\u0100ek\u30F9\u30FB;\u407D;\u405D\u0100es\u3102\u3104;\u698Cl\u0100du\u310A\u310C;\u698E;\u6990\u0200aeuy\u3117\u311C\u3127\u3129ron;\u4159\u0100di\u3121\u3125il;\u4157\xEC\u0FF2\xE2\u30FA;\u4440\u0200clqs\u3134\u3137\u313D\u3144a;\u6937dhar;\u6969uo\u0100;r\u020E\u020Dh;\u61B3\u0180acg\u314E\u315F\u0F44l\u0200;ips\u0F78\u3158\u315B\u109Cn\xE5\u10BBar\xF4\u0FA9t;\u65AD\u0180ilr\u3169\u1023\u316Esht;\u697D;\uC000\u{1D52F}\u0100ao\u3177\u3186r\u0100du\u317D\u317F\xBB\u047B\u0100;l\u1091\u3184;\u696C\u0100;v\u318B\u318C\u43C1;\u43F1\u0180gns\u3195\u31F9\u31FCht\u0300ahlrst\u31A4\u31B0\u31C2\u31D8\u31E4\u31EErrow\u0100;t\u0FDC\u31ADa\xE9\u30C8arpoon\u0100du\u31BB\u31BFow\xEE\u317Ep\xBB\u1092eft\u0100ah\u31CA\u31D0rrow\xF3\u0FEAarpoon\xF3\u0551ightarrows;\u61C9quigarro\xF7\u30CBhreetimes;\u62CCg;\u42DAingdotse\xF1\u1F32\u0180ahm\u320D\u3210\u3213r\xF2\u0FEAa\xF2\u0551;\u600Foust\u0100;a\u321E\u321F\u63B1che\xBB\u321Fmid;\u6AEE\u0200abpt\u3232\u323D\u3240\u3252\u0100nr\u3237\u323Ag;\u67EDr;\u61FEr\xEB\u1003\u0180afl\u3247\u324A\u324Er;\u6986;\uC000\u{1D563}us;\u6A2Eimes;\u6A35\u0100ap\u325D\u3267r\u0100;g\u3263\u3264\u4029t;\u6994olint;\u6A12ar\xF2\u31E3\u0200achq\u327B\u3280\u10BC\u3285quo;\u603Ar;\uC000\u{1D4C7}\u0100bu\u30FB\u328Ao\u0100;r\u0214\u0213\u0180hir\u3297\u329B\u32A0re\xE5\u31F8mes;\u62CAi\u0200;efl\u32AA\u1059\u1821\u32AB\u65B9tri;\u69CEluhar;\u6968;\u611E\u0D61\u32D5\u32DB\u32DF\u332C\u3338\u3371\0\u337A\u33A4\0\0\u33EC\u33F0\0\u3428\u3448\u345A\u34AD\u34B1\u34CA\u34F1\0\u3616\0\0\u3633cute;\u415Bqu\xEF\u27BA\u0500;Eaceinpsy\u11ED\u32F3\u32F5\u32FF\u3302\u330B\u330F\u331F\u3326\u3329;\u6AB4\u01F0\u32FA\0\u32FC;\u6AB8on;\u4161u\xE5\u11FE\u0100;d\u11F3\u3307il;\u415Frc;\u415D\u0180Eas\u3316\u3318\u331B;\u6AB6p;\u6ABAim;\u62E9olint;\u6A13i\xED\u1204;\u4441ot\u0180;be\u3334\u1D47\u3335\u62C5;\u6A66\u0380Aacmstx\u3346\u334A\u3357\u335B\u335E\u3363\u336Drr;\u61D8r\u0100hr\u3350\u3352\xEB\u2228\u0100;o\u0A36\u0A34t\u803B\xA7\u40A7i;\u403Bwar;\u6929m\u0100in\u3369\xF0nu\xF3\xF1t;\u6736r\u0100;o\u3376\u2055\uC000\u{1D530}\u0200acoy\u3382\u3386\u3391\u33A0rp;\u666F\u0100hy\u338B\u338Fcy;\u4449;\u4448rt\u026D\u3399\0\0\u339Ci\xE4\u1464ara\xEC\u2E6F\u803B\xAD\u40AD\u0100gm\u33A8\u33B4ma\u0180;fv\u33B1\u33B2\u33B2\u43C3;\u43C2\u0400;deglnpr\u12AB\u33C5\u33C9\u33CE\u33D6\u33DE\u33E1\u33E6ot;\u6A6A\u0100;q\u12B1\u12B0\u0100;E\u33D3\u33D4\u6A9E;\u6AA0\u0100;E\u33DB\u33DC\u6A9D;\u6A9Fe;\u6246lus;\u6A24arr;\u6972ar\xF2\u113D\u0200aeit\u33F8\u3408\u340F\u3417\u0100ls\u33FD\u3404lsetm\xE9\u336Ahp;\u6A33parsl;\u69E4\u0100dl\u1463\u3414e;\u6323\u0100;e\u341C\u341D\u6AAA\u0100;s\u3422\u3423\u6AAC;\uC000\u2AAC\uFE00\u0180flp\u342E\u3433\u3442tcy;\u444C\u0100;b\u3438\u3439\u402F\u0100;a\u343E\u343F\u69C4r;\u633Ff;\uC000\u{1D564}a\u0100dr\u344D\u0402es\u0100;u\u3454\u3455\u6660it\xBB\u3455\u0180csu\u3460\u3479\u349F\u0100au\u3465\u346Fp\u0100;s\u1188\u346B;\uC000\u2293\uFE00p\u0100;s\u11B4\u3475;\uC000\u2294\uFE00u\u0100bp\u347F\u348F\u0180;es\u1197\u119C\u3486et\u0100;e\u1197\u348D\xF1\u119D\u0180;es\u11A8\u11AD\u3496et\u0100;e\u11A8\u349D\xF1\u11AE\u0180;af\u117B\u34A6\u05B0r\u0165\u34AB\u05B1\xBB\u117Car\xF2\u1148\u0200cemt\u34B9\u34BE\u34C2\u34C5r;\uC000\u{1D4C8}tm\xEE\xF1i\xEC\u3415ar\xE6\u11BE\u0100ar\u34CE\u34D5r\u0100;f\u34D4\u17BF\u6606\u0100an\u34DA\u34EDight\u0100ep\u34E3\u34EApsilo\xEE\u1EE0h\xE9\u2EAFs\xBB\u2852\u0280bcmnp\u34FB\u355E\u1209\u358B\u358E\u0480;Edemnprs\u350E\u350F\u3511\u3515\u351E\u3523\u352C\u3531\u3536\u6282;\u6AC5ot;\u6ABD\u0100;d\u11DA\u351Aot;\u6AC3ult;\u6AC1\u0100Ee\u3528\u352A;\u6ACB;\u628Alus;\u6ABFarr;\u6979\u0180eiu\u353D\u3552\u3555t\u0180;en\u350E\u3545\u354Bq\u0100;q\u11DA\u350Feq\u0100;q\u352B\u3528m;\u6AC7\u0100bp\u355A\u355C;\u6AD5;\u6AD3c\u0300;acens\u11ED\u356C\u3572\u3579\u357B\u3326ppro\xF8\u32FAurlye\xF1\u11FE\xF1\u11F3\u0180aes\u3582\u3588\u331Bppro\xF8\u331Aq\xF1\u3317g;\u666A\u0680123;Edehlmnps\u35A9\u35AC\u35AF\u121C\u35B2\u35B4\u35C0\u35C9\u35D5\u35DA\u35DF\u35E8\u35ED\u803B\xB9\u40B9\u803B\xB2\u40B2\u803B\xB3\u40B3;\u6AC6\u0100os\u35B9\u35BCt;\u6ABEub;\u6AD8\u0100;d\u1222\u35C5ot;\u6AC4s\u0100ou\u35CF\u35D2l;\u67C9b;\u6AD7arr;\u697Bult;\u6AC2\u0100Ee\u35E4\u35E6;\u6ACC;\u628Blus;\u6AC0\u0180eiu\u35F4\u3609\u360Ct\u0180;en\u121C\u35FC\u3602q\u0100;q\u1222\u35B2eq\u0100;q\u35E7\u35E4m;\u6AC8\u0100bp\u3611\u3613;\u6AD4;\u6AD6\u0180Aan\u361C\u3620\u362Drr;\u61D9r\u0100hr\u3626\u3628\xEB\u222E\u0100;o\u0A2B\u0A29war;\u692Alig\u803B\xDF\u40DF\u0BE1\u3651\u365D\u3660\u12CE\u3673\u3679\0\u367E\u36C2\0\0\0\0\0\u36DB\u3703\0\u3709\u376C\0\0\0\u3787\u0272\u3656\0\0\u365Bget;\u6316;\u43C4r\xEB\u0E5F\u0180aey\u3666\u366B\u3670ron;\u4165dil;\u4163;\u4442lrec;\u6315r;\uC000\u{1D531}\u0200eiko\u3686\u369D\u36B5\u36BC\u01F2\u368B\0\u3691e\u01004f\u1284\u1281a\u0180;sv\u3698\u3699\u369B\u43B8ym;\u43D1\u0100cn\u36A2\u36B2k\u0100as\u36A8\u36AEppro\xF8\u12C1im\xBB\u12ACs\xF0\u129E\u0100as\u36BA\u36AE\xF0\u12C1rn\u803B\xFE\u40FE\u01EC\u031F\u36C6\u22E7es\u8180\xD7;bd\u36CF\u36D0\u36D8\u40D7\u0100;a\u190F\u36D5r;\u6A31;\u6A30\u0180eps\u36E1\u36E3\u3700\xE1\u2A4D\u0200;bcf\u0486\u36EC\u36F0\u36F4ot;\u6336ir;\u6AF1\u0100;o\u36F9\u36FC\uC000\u{1D565}rk;\u6ADA\xE1\u3362rime;\u6034\u0180aip\u370F\u3712\u3764d\xE5\u1248\u0380adempst\u3721\u374D\u3740\u3751\u3757\u375C\u375Fngle\u0280;dlqr\u3730\u3731\u3736\u3740\u3742\u65B5own\xBB\u1DBBeft\u0100;e\u2800\u373E\xF1\u092E;\u625Cight\u0100;e\u32AA\u374B\xF1\u105Aot;\u65ECinus;\u6A3Alus;\u6A39b;\u69CDime;\u6A3Bezium;\u63E2\u0180cht\u3772\u377D\u3781\u0100ry\u3777\u377B;\uC000\u{1D4C9};\u4446cy;\u445Brok;\u4167\u0100io\u378B\u378Ex\xF4\u1777head\u0100lr\u3797\u37A0eftarro\xF7\u084Fightarrow\xBB\u0F5D\u0900AHabcdfghlmoprstuw\u37D0\u37D3\u37D7\u37E4\u37F0\u37FC\u380E\u381C\u3823\u3834\u3851\u385D\u386B\u38A9\u38CC\u38D2\u38EA\u38F6r\xF2\u03EDar;\u6963\u0100cr\u37DC\u37E2ute\u803B\xFA\u40FA\xF2\u1150r\u01E3\u37EA\0\u37EDy;\u445Eve;\u416D\u0100iy\u37F5\u37FArc\u803B\xFB\u40FB;\u4443\u0180abh\u3803\u3806\u380Br\xF2\u13ADlac;\u4171a\xF2\u13C3\u0100ir\u3813\u3818sht;\u697E;\uC000\u{1D532}rave\u803B\xF9\u40F9\u0161\u3827\u3831r\u0100lr\u382C\u382E\xBB\u0957\xBB\u1083lk;\u6580\u0100ct\u3839\u384D\u026F\u383F\0\0\u384Arn\u0100;e\u3845\u3846\u631Cr\xBB\u3846op;\u630Fri;\u65F8\u0100al\u3856\u385Acr;\u416B\u80BB\xA8\u0349\u0100gp\u3862\u3866on;\u4173f;\uC000\u{1D566}\u0300adhlsu\u114B\u3878\u387D\u1372\u3891\u38A0own\xE1\u13B3arpoon\u0100lr\u3888\u388Cef\xF4\u382Digh\xF4\u382Fi\u0180;hl\u3899\u389A\u389C\u43C5\xBB\u13FAon\xBB\u389Aparrows;\u61C8\u0180cit\u38B0\u38C4\u38C8\u026F\u38B6\0\0\u38C1rn\u0100;e\u38BC\u38BD\u631Dr\xBB\u38BDop;\u630Eng;\u416Fri;\u65F9cr;\uC000\u{1D4CA}\u0180dir\u38D9\u38DD\u38E2ot;\u62F0lde;\u4169i\u0100;f\u3730\u38E8\xBB\u1813\u0100am\u38EF\u38F2r\xF2\u38A8l\u803B\xFC\u40FCangle;\u69A7\u0780ABDacdeflnoprsz\u391C\u391F\u3929\u392D\u39B5\u39B8\u39BD\u39DF\u39E4\u39E8\u39F3\u39F9\u39FD\u3A01\u3A20r\xF2\u03F7ar\u0100;v\u3926\u3927\u6AE8;\u6AE9as\xE8\u03E1\u0100nr\u3932\u3937grt;\u699C\u0380eknprst\u34E3\u3946\u394B\u3952\u395D\u3964\u3996app\xE1\u2415othin\xE7\u1E96\u0180hir\u34EB\u2EC8\u3959op\xF4\u2FB5\u0100;h\u13B7\u3962\xEF\u318D\u0100iu\u3969\u396Dgm\xE1\u33B3\u0100bp\u3972\u3984setneq\u0100;q\u397D\u3980\uC000\u228A\uFE00;\uC000\u2ACB\uFE00setneq\u0100;q\u398F\u3992\uC000\u228B\uFE00;\uC000\u2ACC\uFE00\u0100hr\u399B\u399Fet\xE1\u369Ciangle\u0100lr\u39AA\u39AFeft\xBB\u0925ight\xBB\u1051y;\u4432ash\xBB\u1036\u0180elr\u39C4\u39D2\u39D7\u0180;be\u2DEA\u39CB\u39CFar;\u62BBq;\u625Alip;\u62EE\u0100bt\u39DC\u1468a\xF2\u1469r;\uC000\u{1D533}tr\xE9\u39AEsu\u0100bp\u39EF\u39F1\xBB\u0D1C\xBB\u0D59pf;\uC000\u{1D567}ro\xF0\u0EFBtr\xE9\u39B4\u0100cu\u3A06\u3A0Br;\uC000\u{1D4CB}\u0100bp\u3A10\u3A18n\u0100Ee\u3980\u3A16\xBB\u397En\u0100Ee\u3992\u3A1E\xBB\u3990igzag;\u699A\u0380cefoprs\u3A36\u3A3B\u3A56\u3A5B\u3A54\u3A61\u3A6Airc;\u4175\u0100di\u3A40\u3A51\u0100bg\u3A45\u3A49ar;\u6A5Fe\u0100;q\u15FA\u3A4F;\u6259erp;\u6118r;\uC000\u{1D534}pf;\uC000\u{1D568}\u0100;e\u1479\u3A66at\xE8\u1479cr;\uC000\u{1D4CC}\u0AE3\u178E\u3A87\0\u3A8B\0\u3A90\u3A9B\0\0\u3A9D\u3AA8\u3AAB\u3AAF\0\0\u3AC3\u3ACE\0\u3AD8\u17DC\u17DFtr\xE9\u17D1r;\uC000\u{1D535}\u0100Aa\u3A94\u3A97r\xF2\u03C3r\xF2\u09F6;\u43BE\u0100Aa\u3AA1\u3AA4r\xF2\u03B8r\xF2\u09EBa\xF0\u2713is;\u62FB\u0180dpt\u17A4\u3AB5\u3ABE\u0100fl\u3ABA\u17A9;\uC000\u{1D569}im\xE5\u17B2\u0100Aa\u3AC7\u3ACAr\xF2\u03CEr\xF2\u0A01\u0100cq\u3AD2\u17B8r;\uC000\u{1D4CD}\u0100pt\u17D6\u3ADCr\xE9\u17D4\u0400acefiosu\u3AF0\u3AFD\u3B08\u3B0C\u3B11\u3B15\u3B1B\u3B21c\u0100uy\u3AF6\u3AFBte\u803B\xFD\u40FD;\u444F\u0100iy\u3B02\u3B06rc;\u4177;\u444Bn\u803B\xA5\u40A5r;\uC000\u{1D536}cy;\u4457pf;\uC000\u{1D56A}cr;\uC000\u{1D4CE}\u0100cm\u3B26\u3B29y;\u444El\u803B\xFF\u40FF\u0500acdefhiosw\u3B42\u3B48\u3B54\u3B58\u3B64\u3B69\u3B6D\u3B74\u3B7A\u3B80cute;\u417A\u0100ay\u3B4D\u3B52ron;\u417E;\u4437ot;\u417C\u0100et\u3B5D\u3B61tr\xE6\u155Fa;\u43B6r;\uC000\u{1D537}cy;\u4436grarr;\u61DDpf;\uC000\u{1D56B}cr;\uC000\u{1D4CF}\u0100jn\u3B85\u3B87;\u600Dj;\u600C'.split("").map((c6) => c6.charCodeAt(0))
);

// node_modules/entities/dist/esm/decode-codepoint.js
var _a3;
var decodeMap = /* @__PURE__ */ new Map([
  [0, 65533],
  // C1 Unicode control character reference replacements
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]);
var fromCodePoint = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, n/no-unsupported-features/es-builtins
  (_a3 = String.fromCodePoint) !== null && _a3 !== void 0 ? _a3 : function(codePoint) {
    let output = "";
    if (codePoint > 65535) {
      codePoint -= 65536;
      output += String.fromCharCode(codePoint >>> 10 & 1023 | 55296);
      codePoint = 56320 | codePoint & 1023;
    }
    output += String.fromCharCode(codePoint);
    return output;
  }
);
function replaceCodePoint(codePoint) {
  var _a5;
  if (codePoint >= 55296 && codePoint <= 57343 || codePoint > 1114111) {
    return 65533;
  }
  return (_a5 = decodeMap.get(codePoint)) !== null && _a5 !== void 0 ? _a5 : codePoint;
}

// node_modules/entities/dist/esm/decode.js
var CharCodes;
(function(CharCodes2) {
  CharCodes2[CharCodes2["NUM"] = 35] = "NUM";
  CharCodes2[CharCodes2["SEMI"] = 59] = "SEMI";
  CharCodes2[CharCodes2["EQUALS"] = 61] = "EQUALS";
  CharCodes2[CharCodes2["ZERO"] = 48] = "ZERO";
  CharCodes2[CharCodes2["NINE"] = 57] = "NINE";
  CharCodes2[CharCodes2["LOWER_A"] = 97] = "LOWER_A";
  CharCodes2[CharCodes2["LOWER_F"] = 102] = "LOWER_F";
  CharCodes2[CharCodes2["LOWER_X"] = 120] = "LOWER_X";
  CharCodes2[CharCodes2["LOWER_Z"] = 122] = "LOWER_Z";
  CharCodes2[CharCodes2["UPPER_A"] = 65] = "UPPER_A";
  CharCodes2[CharCodes2["UPPER_F"] = 70] = "UPPER_F";
  CharCodes2[CharCodes2["UPPER_Z"] = 90] = "UPPER_Z";
})(CharCodes || (CharCodes = {}));
var TO_LOWER_BIT = 32;
var BinTrieFlags;
(function(BinTrieFlags2) {
  BinTrieFlags2[BinTrieFlags2["VALUE_LENGTH"] = 49152] = "VALUE_LENGTH";
  BinTrieFlags2[BinTrieFlags2["BRANCH_LENGTH"] = 16256] = "BRANCH_LENGTH";
  BinTrieFlags2[BinTrieFlags2["JUMP_TABLE"] = 127] = "JUMP_TABLE";
})(BinTrieFlags || (BinTrieFlags = {}));
function isNumber(code) {
  return code >= CharCodes.ZERO && code <= CharCodes.NINE;
}
function isHexadecimalCharacter(code) {
  return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_F || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_F;
}
function isAsciiAlphaNumeric(code) {
  return code >= CharCodes.UPPER_A && code <= CharCodes.UPPER_Z || code >= CharCodes.LOWER_A && code <= CharCodes.LOWER_Z || isNumber(code);
}
function isEntityInAttributeInvalidEnd(code) {
  return code === CharCodes.EQUALS || isAsciiAlphaNumeric(code);
}
var EntityDecoderState;
(function(EntityDecoderState2) {
  EntityDecoderState2[EntityDecoderState2["EntityStart"] = 0] = "EntityStart";
  EntityDecoderState2[EntityDecoderState2["NumericStart"] = 1] = "NumericStart";
  EntityDecoderState2[EntityDecoderState2["NumericDecimal"] = 2] = "NumericDecimal";
  EntityDecoderState2[EntityDecoderState2["NumericHex"] = 3] = "NumericHex";
  EntityDecoderState2[EntityDecoderState2["NamedEntity"] = 4] = "NamedEntity";
})(EntityDecoderState || (EntityDecoderState = {}));
var DecodingMode;
(function(DecodingMode2) {
  DecodingMode2[DecodingMode2["Legacy"] = 0] = "Legacy";
  DecodingMode2[DecodingMode2["Strict"] = 1] = "Strict";
  DecodingMode2[DecodingMode2["Attribute"] = 2] = "Attribute";
})(DecodingMode || (DecodingMode = {}));
var EntityDecoder = class {
  constructor(decodeTree, emitCodePoint, errors) {
    this.decodeTree = decodeTree;
    this.emitCodePoint = emitCodePoint;
    this.errors = errors;
    this.state = EntityDecoderState.EntityStart;
    this.consumed = 1;
    this.result = 0;
    this.treeIndex = 0;
    this.excess = 1;
    this.decodeMode = DecodingMode.Strict;
  }
  /** Resets the instance to make it reusable. */
  startEntity(decodeMode) {
    this.decodeMode = decodeMode;
    this.state = EntityDecoderState.EntityStart;
    this.result = 0;
    this.treeIndex = 0;
    this.excess = 1;
    this.consumed = 1;
  }
  /**
   * Write an entity to the decoder. This can be called multiple times with partial entities.
   * If the entity is incomplete, the decoder will return -1.
   *
   * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
   * entity is incomplete, and resume when the next string is written.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  write(input, offset3) {
    switch (this.state) {
      case EntityDecoderState.EntityStart: {
        if (input.charCodeAt(offset3) === CharCodes.NUM) {
          this.state = EntityDecoderState.NumericStart;
          this.consumed += 1;
          return this.stateNumericStart(input, offset3 + 1);
        }
        this.state = EntityDecoderState.NamedEntity;
        return this.stateNamedEntity(input, offset3);
      }
      case EntityDecoderState.NumericStart: {
        return this.stateNumericStart(input, offset3);
      }
      case EntityDecoderState.NumericDecimal: {
        return this.stateNumericDecimal(input, offset3);
      }
      case EntityDecoderState.NumericHex: {
        return this.stateNumericHex(input, offset3);
      }
      case EntityDecoderState.NamedEntity: {
        return this.stateNamedEntity(input, offset3);
      }
    }
  }
  /**
   * Switches between the numeric decimal and hexadecimal states.
   *
   * Equivalent to the `Numeric character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericStart(input, offset3) {
    if (offset3 >= input.length) {
      return -1;
    }
    if ((input.charCodeAt(offset3) | TO_LOWER_BIT) === CharCodes.LOWER_X) {
      this.state = EntityDecoderState.NumericHex;
      this.consumed += 1;
      return this.stateNumericHex(input, offset3 + 1);
    }
    this.state = EntityDecoderState.NumericDecimal;
    return this.stateNumericDecimal(input, offset3);
  }
  addToNumericResult(input, start, end, base) {
    if (start !== end) {
      const digitCount = end - start;
      this.result = this.result * Math.pow(base, digitCount) + Number.parseInt(input.substr(start, digitCount), base);
      this.consumed += digitCount;
    }
  }
  /**
   * Parses a hexadecimal numeric entity.
   *
   * Equivalent to the `Hexademical character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericHex(input, offset3) {
    const startIndex = offset3;
    while (offset3 < input.length) {
      const char = input.charCodeAt(offset3);
      if (isNumber(char) || isHexadecimalCharacter(char)) {
        offset3 += 1;
      } else {
        this.addToNumericResult(input, startIndex, offset3, 16);
        return this.emitNumericEntity(char, 3);
      }
    }
    this.addToNumericResult(input, startIndex, offset3, 16);
    return -1;
  }
  /**
   * Parses a decimal numeric entity.
   *
   * Equivalent to the `Decimal character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericDecimal(input, offset3) {
    const startIndex = offset3;
    while (offset3 < input.length) {
      const char = input.charCodeAt(offset3);
      if (isNumber(char)) {
        offset3 += 1;
      } else {
        this.addToNumericResult(input, startIndex, offset3, 10);
        return this.emitNumericEntity(char, 2);
      }
    }
    this.addToNumericResult(input, startIndex, offset3, 10);
    return -1;
  }
  /**
   * Validate and emit a numeric entity.
   *
   * Implements the logic from the `Hexademical character reference start
   * state` and `Numeric character reference end state` in the HTML spec.
   *
   * @param lastCp The last code point of the entity. Used to see if the
   *               entity was terminated with a semicolon.
   * @param expectedLength The minimum number of characters that should be
   *                       consumed. Used to validate that at least one digit
   *                       was consumed.
   * @returns The number of characters that were consumed.
   */
  emitNumericEntity(lastCp, expectedLength) {
    var _a5;
    if (this.consumed <= expectedLength) {
      (_a5 = this.errors) === null || _a5 === void 0 ? void 0 : _a5.absenceOfDigitsInNumericCharacterReference(this.consumed);
      return 0;
    }
    if (lastCp === CharCodes.SEMI) {
      this.consumed += 1;
    } else if (this.decodeMode === DecodingMode.Strict) {
      return 0;
    }
    this.emitCodePoint(replaceCodePoint(this.result), this.consumed);
    if (this.errors) {
      if (lastCp !== CharCodes.SEMI) {
        this.errors.missingSemicolonAfterCharacterReference();
      }
      this.errors.validateNumericCharacterReference(this.result);
    }
    return this.consumed;
  }
  /**
   * Parses a named entity.
   *
   * Equivalent to the `Named character reference state` in the HTML spec.
   *
   * @param input The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNamedEntity(input, offset3) {
    const { decodeTree } = this;
    let current = decodeTree[this.treeIndex];
    let valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
    for (; offset3 < input.length; offset3++, this.excess++) {
      const char = input.charCodeAt(offset3);
      this.treeIndex = determineBranch(decodeTree, current, this.treeIndex + Math.max(1, valueLength), char);
      if (this.treeIndex < 0) {
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === DecodingMode.Attribute && // We shouldn't have consumed any characters after the entity,
        (valueLength === 0 || // And there should be no invalid characters.
        isEntityInAttributeInvalidEnd(char)) ? 0 : this.emitNotTerminatedNamedEntity();
      }
      current = decodeTree[this.treeIndex];
      valueLength = (current & BinTrieFlags.VALUE_LENGTH) >> 14;
      if (valueLength !== 0) {
        if (char === CharCodes.SEMI) {
          return this.emitNamedEntityData(this.treeIndex, valueLength, this.consumed + this.excess);
        }
        if (this.decodeMode !== DecodingMode.Strict) {
          this.result = this.treeIndex;
          this.consumed += this.excess;
          this.excess = 0;
        }
      }
    }
    return -1;
  }
  /**
   * Emit a named entity that was not terminated with a semicolon.
   *
   * @returns The number of characters consumed.
   */
  emitNotTerminatedNamedEntity() {
    var _a5;
    const { result, decodeTree } = this;
    const valueLength = (decodeTree[result] & BinTrieFlags.VALUE_LENGTH) >> 14;
    this.emitNamedEntityData(result, valueLength, this.consumed);
    (_a5 = this.errors) === null || _a5 === void 0 ? void 0 : _a5.missingSemicolonAfterCharacterReference();
    return this.consumed;
  }
  /**
   * Emit a named entity.
   *
   * @param result The index of the entity in the decode tree.
   * @param valueLength The number of bytes in the entity.
   * @param consumed The number of characters consumed.
   *
   * @returns The number of characters consumed.
   */
  emitNamedEntityData(result, valueLength, consumed) {
    const { decodeTree } = this;
    this.emitCodePoint(valueLength === 1 ? decodeTree[result] & ~BinTrieFlags.VALUE_LENGTH : decodeTree[result + 1], consumed);
    if (valueLength === 3) {
      this.emitCodePoint(decodeTree[result + 2], consumed);
    }
    return consumed;
  }
  /**
   * Signal to the parser that the end of the input was reached.
   *
   * Remaining data will be emitted and relevant errors will be produced.
   *
   * @returns The number of characters consumed.
   */
  end() {
    var _a5;
    switch (this.state) {
      case EntityDecoderState.NamedEntity: {
        return this.result !== 0 && (this.decodeMode !== DecodingMode.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      }
      // Otherwise, emit a numeric entity if we have one.
      case EntityDecoderState.NumericDecimal: {
        return this.emitNumericEntity(0, 2);
      }
      case EntityDecoderState.NumericHex: {
        return this.emitNumericEntity(0, 3);
      }
      case EntityDecoderState.NumericStart: {
        (_a5 = this.errors) === null || _a5 === void 0 ? void 0 : _a5.absenceOfDigitsInNumericCharacterReference(this.consumed);
        return 0;
      }
      case EntityDecoderState.EntityStart: {
        return 0;
      }
    }
  }
};
function determineBranch(decodeTree, current, nodeIndex, char) {
  const branchCount = (current & BinTrieFlags.BRANCH_LENGTH) >> 7;
  const jumpOffset = current & BinTrieFlags.JUMP_TABLE;
  if (branchCount === 0) {
    return jumpOffset !== 0 && char === jumpOffset ? nodeIndex : -1;
  }
  if (jumpOffset) {
    const value = char - jumpOffset;
    return value < 0 || value >= branchCount ? -1 : decodeTree[nodeIndex + value] - 1;
  }
  let lo = nodeIndex;
  let hi = lo + branchCount - 1;
  while (lo <= hi) {
    const mid = lo + hi >>> 1;
    const midValue = decodeTree[mid];
    if (midValue < char) {
      lo = mid + 1;
    } else if (midValue > char) {
      hi = mid - 1;
    } else {
      return decodeTree[mid + branchCount];
    }
  }
  return -1;
}

// node_modules/@lit-labs/ssr/node_modules/parse5/dist/common/html.js
var NS;
(function(NS3) {
  NS3["HTML"] = "http://www.w3.org/1999/xhtml";
  NS3["MATHML"] = "http://www.w3.org/1998/Math/MathML";
  NS3["SVG"] = "http://www.w3.org/2000/svg";
  NS3["XLINK"] = "http://www.w3.org/1999/xlink";
  NS3["XML"] = "http://www.w3.org/XML/1998/namespace";
  NS3["XMLNS"] = "http://www.w3.org/2000/xmlns/";
})(NS || (NS = {}));
var ATTRS;
(function(ATTRS3) {
  ATTRS3["TYPE"] = "type";
  ATTRS3["ACTION"] = "action";
  ATTRS3["ENCODING"] = "encoding";
  ATTRS3["PROMPT"] = "prompt";
  ATTRS3["NAME"] = "name";
  ATTRS3["COLOR"] = "color";
  ATTRS3["FACE"] = "face";
  ATTRS3["SIZE"] = "size";
})(ATTRS || (ATTRS = {}));
var DOCUMENT_MODE;
(function(DOCUMENT_MODE3) {
  DOCUMENT_MODE3["NO_QUIRKS"] = "no-quirks";
  DOCUMENT_MODE3["QUIRKS"] = "quirks";
  DOCUMENT_MODE3["LIMITED_QUIRKS"] = "limited-quirks";
})(DOCUMENT_MODE || (DOCUMENT_MODE = {}));
var TAG_NAMES;
(function(TAG_NAMES3) {
  TAG_NAMES3["A"] = "a";
  TAG_NAMES3["ADDRESS"] = "address";
  TAG_NAMES3["ANNOTATION_XML"] = "annotation-xml";
  TAG_NAMES3["APPLET"] = "applet";
  TAG_NAMES3["AREA"] = "area";
  TAG_NAMES3["ARTICLE"] = "article";
  TAG_NAMES3["ASIDE"] = "aside";
  TAG_NAMES3["B"] = "b";
  TAG_NAMES3["BASE"] = "base";
  TAG_NAMES3["BASEFONT"] = "basefont";
  TAG_NAMES3["BGSOUND"] = "bgsound";
  TAG_NAMES3["BIG"] = "big";
  TAG_NAMES3["BLOCKQUOTE"] = "blockquote";
  TAG_NAMES3["BODY"] = "body";
  TAG_NAMES3["BR"] = "br";
  TAG_NAMES3["BUTTON"] = "button";
  TAG_NAMES3["CAPTION"] = "caption";
  TAG_NAMES3["CENTER"] = "center";
  TAG_NAMES3["CODE"] = "code";
  TAG_NAMES3["COL"] = "col";
  TAG_NAMES3["COLGROUP"] = "colgroup";
  TAG_NAMES3["DD"] = "dd";
  TAG_NAMES3["DESC"] = "desc";
  TAG_NAMES3["DETAILS"] = "details";
  TAG_NAMES3["DIALOG"] = "dialog";
  TAG_NAMES3["DIR"] = "dir";
  TAG_NAMES3["DIV"] = "div";
  TAG_NAMES3["DL"] = "dl";
  TAG_NAMES3["DT"] = "dt";
  TAG_NAMES3["EM"] = "em";
  TAG_NAMES3["EMBED"] = "embed";
  TAG_NAMES3["FIELDSET"] = "fieldset";
  TAG_NAMES3["FIGCAPTION"] = "figcaption";
  TAG_NAMES3["FIGURE"] = "figure";
  TAG_NAMES3["FONT"] = "font";
  TAG_NAMES3["FOOTER"] = "footer";
  TAG_NAMES3["FOREIGN_OBJECT"] = "foreignObject";
  TAG_NAMES3["FORM"] = "form";
  TAG_NAMES3["FRAME"] = "frame";
  TAG_NAMES3["FRAMESET"] = "frameset";
  TAG_NAMES3["H1"] = "h1";
  TAG_NAMES3["H2"] = "h2";
  TAG_NAMES3["H3"] = "h3";
  TAG_NAMES3["H4"] = "h4";
  TAG_NAMES3["H5"] = "h5";
  TAG_NAMES3["H6"] = "h6";
  TAG_NAMES3["HEAD"] = "head";
  TAG_NAMES3["HEADER"] = "header";
  TAG_NAMES3["HGROUP"] = "hgroup";
  TAG_NAMES3["HR"] = "hr";
  TAG_NAMES3["HTML"] = "html";
  TAG_NAMES3["I"] = "i";
  TAG_NAMES3["IMG"] = "img";
  TAG_NAMES3["IMAGE"] = "image";
  TAG_NAMES3["INPUT"] = "input";
  TAG_NAMES3["IFRAME"] = "iframe";
  TAG_NAMES3["KEYGEN"] = "keygen";
  TAG_NAMES3["LABEL"] = "label";
  TAG_NAMES3["LI"] = "li";
  TAG_NAMES3["LINK"] = "link";
  TAG_NAMES3["LISTING"] = "listing";
  TAG_NAMES3["MAIN"] = "main";
  TAG_NAMES3["MALIGNMARK"] = "malignmark";
  TAG_NAMES3["MARQUEE"] = "marquee";
  TAG_NAMES3["MATH"] = "math";
  TAG_NAMES3["MENU"] = "menu";
  TAG_NAMES3["META"] = "meta";
  TAG_NAMES3["MGLYPH"] = "mglyph";
  TAG_NAMES3["MI"] = "mi";
  TAG_NAMES3["MO"] = "mo";
  TAG_NAMES3["MN"] = "mn";
  TAG_NAMES3["MS"] = "ms";
  TAG_NAMES3["MTEXT"] = "mtext";
  TAG_NAMES3["NAV"] = "nav";
  TAG_NAMES3["NOBR"] = "nobr";
  TAG_NAMES3["NOFRAMES"] = "noframes";
  TAG_NAMES3["NOEMBED"] = "noembed";
  TAG_NAMES3["NOSCRIPT"] = "noscript";
  TAG_NAMES3["OBJECT"] = "object";
  TAG_NAMES3["OL"] = "ol";
  TAG_NAMES3["OPTGROUP"] = "optgroup";
  TAG_NAMES3["OPTION"] = "option";
  TAG_NAMES3["P"] = "p";
  TAG_NAMES3["PARAM"] = "param";
  TAG_NAMES3["PLAINTEXT"] = "plaintext";
  TAG_NAMES3["PRE"] = "pre";
  TAG_NAMES3["RB"] = "rb";
  TAG_NAMES3["RP"] = "rp";
  TAG_NAMES3["RT"] = "rt";
  TAG_NAMES3["RTC"] = "rtc";
  TAG_NAMES3["RUBY"] = "ruby";
  TAG_NAMES3["S"] = "s";
  TAG_NAMES3["SCRIPT"] = "script";
  TAG_NAMES3["SEARCH"] = "search";
  TAG_NAMES3["SECTION"] = "section";
  TAG_NAMES3["SELECT"] = "select";
  TAG_NAMES3["SOURCE"] = "source";
  TAG_NAMES3["SMALL"] = "small";
  TAG_NAMES3["SPAN"] = "span";
  TAG_NAMES3["STRIKE"] = "strike";
  TAG_NAMES3["STRONG"] = "strong";
  TAG_NAMES3["STYLE"] = "style";
  TAG_NAMES3["SUB"] = "sub";
  TAG_NAMES3["SUMMARY"] = "summary";
  TAG_NAMES3["SUP"] = "sup";
  TAG_NAMES3["TABLE"] = "table";
  TAG_NAMES3["TBODY"] = "tbody";
  TAG_NAMES3["TEMPLATE"] = "template";
  TAG_NAMES3["TEXTAREA"] = "textarea";
  TAG_NAMES3["TFOOT"] = "tfoot";
  TAG_NAMES3["TD"] = "td";
  TAG_NAMES3["TH"] = "th";
  TAG_NAMES3["THEAD"] = "thead";
  TAG_NAMES3["TITLE"] = "title";
  TAG_NAMES3["TR"] = "tr";
  TAG_NAMES3["TRACK"] = "track";
  TAG_NAMES3["TT"] = "tt";
  TAG_NAMES3["U"] = "u";
  TAG_NAMES3["UL"] = "ul";
  TAG_NAMES3["SVG"] = "svg";
  TAG_NAMES3["VAR"] = "var";
  TAG_NAMES3["WBR"] = "wbr";
  TAG_NAMES3["XMP"] = "xmp";
})(TAG_NAMES || (TAG_NAMES = {}));
var TAG_ID;
(function(TAG_ID3) {
  TAG_ID3[TAG_ID3["UNKNOWN"] = 0] = "UNKNOWN";
  TAG_ID3[TAG_ID3["A"] = 1] = "A";
  TAG_ID3[TAG_ID3["ADDRESS"] = 2] = "ADDRESS";
  TAG_ID3[TAG_ID3["ANNOTATION_XML"] = 3] = "ANNOTATION_XML";
  TAG_ID3[TAG_ID3["APPLET"] = 4] = "APPLET";
  TAG_ID3[TAG_ID3["AREA"] = 5] = "AREA";
  TAG_ID3[TAG_ID3["ARTICLE"] = 6] = "ARTICLE";
  TAG_ID3[TAG_ID3["ASIDE"] = 7] = "ASIDE";
  TAG_ID3[TAG_ID3["B"] = 8] = "B";
  TAG_ID3[TAG_ID3["BASE"] = 9] = "BASE";
  TAG_ID3[TAG_ID3["BASEFONT"] = 10] = "BASEFONT";
  TAG_ID3[TAG_ID3["BGSOUND"] = 11] = "BGSOUND";
  TAG_ID3[TAG_ID3["BIG"] = 12] = "BIG";
  TAG_ID3[TAG_ID3["BLOCKQUOTE"] = 13] = "BLOCKQUOTE";
  TAG_ID3[TAG_ID3["BODY"] = 14] = "BODY";
  TAG_ID3[TAG_ID3["BR"] = 15] = "BR";
  TAG_ID3[TAG_ID3["BUTTON"] = 16] = "BUTTON";
  TAG_ID3[TAG_ID3["CAPTION"] = 17] = "CAPTION";
  TAG_ID3[TAG_ID3["CENTER"] = 18] = "CENTER";
  TAG_ID3[TAG_ID3["CODE"] = 19] = "CODE";
  TAG_ID3[TAG_ID3["COL"] = 20] = "COL";
  TAG_ID3[TAG_ID3["COLGROUP"] = 21] = "COLGROUP";
  TAG_ID3[TAG_ID3["DD"] = 22] = "DD";
  TAG_ID3[TAG_ID3["DESC"] = 23] = "DESC";
  TAG_ID3[TAG_ID3["DETAILS"] = 24] = "DETAILS";
  TAG_ID3[TAG_ID3["DIALOG"] = 25] = "DIALOG";
  TAG_ID3[TAG_ID3["DIR"] = 26] = "DIR";
  TAG_ID3[TAG_ID3["DIV"] = 27] = "DIV";
  TAG_ID3[TAG_ID3["DL"] = 28] = "DL";
  TAG_ID3[TAG_ID3["DT"] = 29] = "DT";
  TAG_ID3[TAG_ID3["EM"] = 30] = "EM";
  TAG_ID3[TAG_ID3["EMBED"] = 31] = "EMBED";
  TAG_ID3[TAG_ID3["FIELDSET"] = 32] = "FIELDSET";
  TAG_ID3[TAG_ID3["FIGCAPTION"] = 33] = "FIGCAPTION";
  TAG_ID3[TAG_ID3["FIGURE"] = 34] = "FIGURE";
  TAG_ID3[TAG_ID3["FONT"] = 35] = "FONT";
  TAG_ID3[TAG_ID3["FOOTER"] = 36] = "FOOTER";
  TAG_ID3[TAG_ID3["FOREIGN_OBJECT"] = 37] = "FOREIGN_OBJECT";
  TAG_ID3[TAG_ID3["FORM"] = 38] = "FORM";
  TAG_ID3[TAG_ID3["FRAME"] = 39] = "FRAME";
  TAG_ID3[TAG_ID3["FRAMESET"] = 40] = "FRAMESET";
  TAG_ID3[TAG_ID3["H1"] = 41] = "H1";
  TAG_ID3[TAG_ID3["H2"] = 42] = "H2";
  TAG_ID3[TAG_ID3["H3"] = 43] = "H3";
  TAG_ID3[TAG_ID3["H4"] = 44] = "H4";
  TAG_ID3[TAG_ID3["H5"] = 45] = "H5";
  TAG_ID3[TAG_ID3["H6"] = 46] = "H6";
  TAG_ID3[TAG_ID3["HEAD"] = 47] = "HEAD";
  TAG_ID3[TAG_ID3["HEADER"] = 48] = "HEADER";
  TAG_ID3[TAG_ID3["HGROUP"] = 49] = "HGROUP";
  TAG_ID3[TAG_ID3["HR"] = 50] = "HR";
  TAG_ID3[TAG_ID3["HTML"] = 51] = "HTML";
  TAG_ID3[TAG_ID3["I"] = 52] = "I";
  TAG_ID3[TAG_ID3["IMG"] = 53] = "IMG";
  TAG_ID3[TAG_ID3["IMAGE"] = 54] = "IMAGE";
  TAG_ID3[TAG_ID3["INPUT"] = 55] = "INPUT";
  TAG_ID3[TAG_ID3["IFRAME"] = 56] = "IFRAME";
  TAG_ID3[TAG_ID3["KEYGEN"] = 57] = "KEYGEN";
  TAG_ID3[TAG_ID3["LABEL"] = 58] = "LABEL";
  TAG_ID3[TAG_ID3["LI"] = 59] = "LI";
  TAG_ID3[TAG_ID3["LINK"] = 60] = "LINK";
  TAG_ID3[TAG_ID3["LISTING"] = 61] = "LISTING";
  TAG_ID3[TAG_ID3["MAIN"] = 62] = "MAIN";
  TAG_ID3[TAG_ID3["MALIGNMARK"] = 63] = "MALIGNMARK";
  TAG_ID3[TAG_ID3["MARQUEE"] = 64] = "MARQUEE";
  TAG_ID3[TAG_ID3["MATH"] = 65] = "MATH";
  TAG_ID3[TAG_ID3["MENU"] = 66] = "MENU";
  TAG_ID3[TAG_ID3["META"] = 67] = "META";
  TAG_ID3[TAG_ID3["MGLYPH"] = 68] = "MGLYPH";
  TAG_ID3[TAG_ID3["MI"] = 69] = "MI";
  TAG_ID3[TAG_ID3["MO"] = 70] = "MO";
  TAG_ID3[TAG_ID3["MN"] = 71] = "MN";
  TAG_ID3[TAG_ID3["MS"] = 72] = "MS";
  TAG_ID3[TAG_ID3["MTEXT"] = 73] = "MTEXT";
  TAG_ID3[TAG_ID3["NAV"] = 74] = "NAV";
  TAG_ID3[TAG_ID3["NOBR"] = 75] = "NOBR";
  TAG_ID3[TAG_ID3["NOFRAMES"] = 76] = "NOFRAMES";
  TAG_ID3[TAG_ID3["NOEMBED"] = 77] = "NOEMBED";
  TAG_ID3[TAG_ID3["NOSCRIPT"] = 78] = "NOSCRIPT";
  TAG_ID3[TAG_ID3["OBJECT"] = 79] = "OBJECT";
  TAG_ID3[TAG_ID3["OL"] = 80] = "OL";
  TAG_ID3[TAG_ID3["OPTGROUP"] = 81] = "OPTGROUP";
  TAG_ID3[TAG_ID3["OPTION"] = 82] = "OPTION";
  TAG_ID3[TAG_ID3["P"] = 83] = "P";
  TAG_ID3[TAG_ID3["PARAM"] = 84] = "PARAM";
  TAG_ID3[TAG_ID3["PLAINTEXT"] = 85] = "PLAINTEXT";
  TAG_ID3[TAG_ID3["PRE"] = 86] = "PRE";
  TAG_ID3[TAG_ID3["RB"] = 87] = "RB";
  TAG_ID3[TAG_ID3["RP"] = 88] = "RP";
  TAG_ID3[TAG_ID3["RT"] = 89] = "RT";
  TAG_ID3[TAG_ID3["RTC"] = 90] = "RTC";
  TAG_ID3[TAG_ID3["RUBY"] = 91] = "RUBY";
  TAG_ID3[TAG_ID3["S"] = 92] = "S";
  TAG_ID3[TAG_ID3["SCRIPT"] = 93] = "SCRIPT";
  TAG_ID3[TAG_ID3["SEARCH"] = 94] = "SEARCH";
  TAG_ID3[TAG_ID3["SECTION"] = 95] = "SECTION";
  TAG_ID3[TAG_ID3["SELECT"] = 96] = "SELECT";
  TAG_ID3[TAG_ID3["SOURCE"] = 97] = "SOURCE";
  TAG_ID3[TAG_ID3["SMALL"] = 98] = "SMALL";
  TAG_ID3[TAG_ID3["SPAN"] = 99] = "SPAN";
  TAG_ID3[TAG_ID3["STRIKE"] = 100] = "STRIKE";
  TAG_ID3[TAG_ID3["STRONG"] = 101] = "STRONG";
  TAG_ID3[TAG_ID3["STYLE"] = 102] = "STYLE";
  TAG_ID3[TAG_ID3["SUB"] = 103] = "SUB";
  TAG_ID3[TAG_ID3["SUMMARY"] = 104] = "SUMMARY";
  TAG_ID3[TAG_ID3["SUP"] = 105] = "SUP";
  TAG_ID3[TAG_ID3["TABLE"] = 106] = "TABLE";
  TAG_ID3[TAG_ID3["TBODY"] = 107] = "TBODY";
  TAG_ID3[TAG_ID3["TEMPLATE"] = 108] = "TEMPLATE";
  TAG_ID3[TAG_ID3["TEXTAREA"] = 109] = "TEXTAREA";
  TAG_ID3[TAG_ID3["TFOOT"] = 110] = "TFOOT";
  TAG_ID3[TAG_ID3["TD"] = 111] = "TD";
  TAG_ID3[TAG_ID3["TH"] = 112] = "TH";
  TAG_ID3[TAG_ID3["THEAD"] = 113] = "THEAD";
  TAG_ID3[TAG_ID3["TITLE"] = 114] = "TITLE";
  TAG_ID3[TAG_ID3["TR"] = 115] = "TR";
  TAG_ID3[TAG_ID3["TRACK"] = 116] = "TRACK";
  TAG_ID3[TAG_ID3["TT"] = 117] = "TT";
  TAG_ID3[TAG_ID3["U"] = 118] = "U";
  TAG_ID3[TAG_ID3["UL"] = 119] = "UL";
  TAG_ID3[TAG_ID3["SVG"] = 120] = "SVG";
  TAG_ID3[TAG_ID3["VAR"] = 121] = "VAR";
  TAG_ID3[TAG_ID3["WBR"] = 122] = "WBR";
  TAG_ID3[TAG_ID3["XMP"] = 123] = "XMP";
})(TAG_ID || (TAG_ID = {}));
var TAG_NAME_TO_ID = /* @__PURE__ */ new Map([
  [TAG_NAMES.A, TAG_ID.A],
  [TAG_NAMES.ADDRESS, TAG_ID.ADDRESS],
  [TAG_NAMES.ANNOTATION_XML, TAG_ID.ANNOTATION_XML],
  [TAG_NAMES.APPLET, TAG_ID.APPLET],
  [TAG_NAMES.AREA, TAG_ID.AREA],
  [TAG_NAMES.ARTICLE, TAG_ID.ARTICLE],
  [TAG_NAMES.ASIDE, TAG_ID.ASIDE],
  [TAG_NAMES.B, TAG_ID.B],
  [TAG_NAMES.BASE, TAG_ID.BASE],
  [TAG_NAMES.BASEFONT, TAG_ID.BASEFONT],
  [TAG_NAMES.BGSOUND, TAG_ID.BGSOUND],
  [TAG_NAMES.BIG, TAG_ID.BIG],
  [TAG_NAMES.BLOCKQUOTE, TAG_ID.BLOCKQUOTE],
  [TAG_NAMES.BODY, TAG_ID.BODY],
  [TAG_NAMES.BR, TAG_ID.BR],
  [TAG_NAMES.BUTTON, TAG_ID.BUTTON],
  [TAG_NAMES.CAPTION, TAG_ID.CAPTION],
  [TAG_NAMES.CENTER, TAG_ID.CENTER],
  [TAG_NAMES.CODE, TAG_ID.CODE],
  [TAG_NAMES.COL, TAG_ID.COL],
  [TAG_NAMES.COLGROUP, TAG_ID.COLGROUP],
  [TAG_NAMES.DD, TAG_ID.DD],
  [TAG_NAMES.DESC, TAG_ID.DESC],
  [TAG_NAMES.DETAILS, TAG_ID.DETAILS],
  [TAG_NAMES.DIALOG, TAG_ID.DIALOG],
  [TAG_NAMES.DIR, TAG_ID.DIR],
  [TAG_NAMES.DIV, TAG_ID.DIV],
  [TAG_NAMES.DL, TAG_ID.DL],
  [TAG_NAMES.DT, TAG_ID.DT],
  [TAG_NAMES.EM, TAG_ID.EM],
  [TAG_NAMES.EMBED, TAG_ID.EMBED],
  [TAG_NAMES.FIELDSET, TAG_ID.FIELDSET],
  [TAG_NAMES.FIGCAPTION, TAG_ID.FIGCAPTION],
  [TAG_NAMES.FIGURE, TAG_ID.FIGURE],
  [TAG_NAMES.FONT, TAG_ID.FONT],
  [TAG_NAMES.FOOTER, TAG_ID.FOOTER],
  [TAG_NAMES.FOREIGN_OBJECT, TAG_ID.FOREIGN_OBJECT],
  [TAG_NAMES.FORM, TAG_ID.FORM],
  [TAG_NAMES.FRAME, TAG_ID.FRAME],
  [TAG_NAMES.FRAMESET, TAG_ID.FRAMESET],
  [TAG_NAMES.H1, TAG_ID.H1],
  [TAG_NAMES.H2, TAG_ID.H2],
  [TAG_NAMES.H3, TAG_ID.H3],
  [TAG_NAMES.H4, TAG_ID.H4],
  [TAG_NAMES.H5, TAG_ID.H5],
  [TAG_NAMES.H6, TAG_ID.H6],
  [TAG_NAMES.HEAD, TAG_ID.HEAD],
  [TAG_NAMES.HEADER, TAG_ID.HEADER],
  [TAG_NAMES.HGROUP, TAG_ID.HGROUP],
  [TAG_NAMES.HR, TAG_ID.HR],
  [TAG_NAMES.HTML, TAG_ID.HTML],
  [TAG_NAMES.I, TAG_ID.I],
  [TAG_NAMES.IMG, TAG_ID.IMG],
  [TAG_NAMES.IMAGE, TAG_ID.IMAGE],
  [TAG_NAMES.INPUT, TAG_ID.INPUT],
  [TAG_NAMES.IFRAME, TAG_ID.IFRAME],
  [TAG_NAMES.KEYGEN, TAG_ID.KEYGEN],
  [TAG_NAMES.LABEL, TAG_ID.LABEL],
  [TAG_NAMES.LI, TAG_ID.LI],
  [TAG_NAMES.LINK, TAG_ID.LINK],
  [TAG_NAMES.LISTING, TAG_ID.LISTING],
  [TAG_NAMES.MAIN, TAG_ID.MAIN],
  [TAG_NAMES.MALIGNMARK, TAG_ID.MALIGNMARK],
  [TAG_NAMES.MARQUEE, TAG_ID.MARQUEE],
  [TAG_NAMES.MATH, TAG_ID.MATH],
  [TAG_NAMES.MENU, TAG_ID.MENU],
  [TAG_NAMES.META, TAG_ID.META],
  [TAG_NAMES.MGLYPH, TAG_ID.MGLYPH],
  [TAG_NAMES.MI, TAG_ID.MI],
  [TAG_NAMES.MO, TAG_ID.MO],
  [TAG_NAMES.MN, TAG_ID.MN],
  [TAG_NAMES.MS, TAG_ID.MS],
  [TAG_NAMES.MTEXT, TAG_ID.MTEXT],
  [TAG_NAMES.NAV, TAG_ID.NAV],
  [TAG_NAMES.NOBR, TAG_ID.NOBR],
  [TAG_NAMES.NOFRAMES, TAG_ID.NOFRAMES],
  [TAG_NAMES.NOEMBED, TAG_ID.NOEMBED],
  [TAG_NAMES.NOSCRIPT, TAG_ID.NOSCRIPT],
  [TAG_NAMES.OBJECT, TAG_ID.OBJECT],
  [TAG_NAMES.OL, TAG_ID.OL],
  [TAG_NAMES.OPTGROUP, TAG_ID.OPTGROUP],
  [TAG_NAMES.OPTION, TAG_ID.OPTION],
  [TAG_NAMES.P, TAG_ID.P],
  [TAG_NAMES.PARAM, TAG_ID.PARAM],
  [TAG_NAMES.PLAINTEXT, TAG_ID.PLAINTEXT],
  [TAG_NAMES.PRE, TAG_ID.PRE],
  [TAG_NAMES.RB, TAG_ID.RB],
  [TAG_NAMES.RP, TAG_ID.RP],
  [TAG_NAMES.RT, TAG_ID.RT],
  [TAG_NAMES.RTC, TAG_ID.RTC],
  [TAG_NAMES.RUBY, TAG_ID.RUBY],
  [TAG_NAMES.S, TAG_ID.S],
  [TAG_NAMES.SCRIPT, TAG_ID.SCRIPT],
  [TAG_NAMES.SEARCH, TAG_ID.SEARCH],
  [TAG_NAMES.SECTION, TAG_ID.SECTION],
  [TAG_NAMES.SELECT, TAG_ID.SELECT],
  [TAG_NAMES.SOURCE, TAG_ID.SOURCE],
  [TAG_NAMES.SMALL, TAG_ID.SMALL],
  [TAG_NAMES.SPAN, TAG_ID.SPAN],
  [TAG_NAMES.STRIKE, TAG_ID.STRIKE],
  [TAG_NAMES.STRONG, TAG_ID.STRONG],
  [TAG_NAMES.STYLE, TAG_ID.STYLE],
  [TAG_NAMES.SUB, TAG_ID.SUB],
  [TAG_NAMES.SUMMARY, TAG_ID.SUMMARY],
  [TAG_NAMES.SUP, TAG_ID.SUP],
  [TAG_NAMES.TABLE, TAG_ID.TABLE],
  [TAG_NAMES.TBODY, TAG_ID.TBODY],
  [TAG_NAMES.TEMPLATE, TAG_ID.TEMPLATE],
  [TAG_NAMES.TEXTAREA, TAG_ID.TEXTAREA],
  [TAG_NAMES.TFOOT, TAG_ID.TFOOT],
  [TAG_NAMES.TD, TAG_ID.TD],
  [TAG_NAMES.TH, TAG_ID.TH],
  [TAG_NAMES.THEAD, TAG_ID.THEAD],
  [TAG_NAMES.TITLE, TAG_ID.TITLE],
  [TAG_NAMES.TR, TAG_ID.TR],
  [TAG_NAMES.TRACK, TAG_ID.TRACK],
  [TAG_NAMES.TT, TAG_ID.TT],
  [TAG_NAMES.U, TAG_ID.U],
  [TAG_NAMES.UL, TAG_ID.UL],
  [TAG_NAMES.SVG, TAG_ID.SVG],
  [TAG_NAMES.VAR, TAG_ID.VAR],
  [TAG_NAMES.WBR, TAG_ID.WBR],
  [TAG_NAMES.XMP, TAG_ID.XMP]
]);
function getTagID(tagName) {
  var _a5;
  return (_a5 = TAG_NAME_TO_ID.get(tagName)) !== null && _a5 !== void 0 ? _a5 : TAG_ID.UNKNOWN;
}
var $2 = TAG_ID;
var SPECIAL_ELEMENTS = {
  [NS.HTML]: /* @__PURE__ */ new Set([
    $2.ADDRESS,
    $2.APPLET,
    $2.AREA,
    $2.ARTICLE,
    $2.ASIDE,
    $2.BASE,
    $2.BASEFONT,
    $2.BGSOUND,
    $2.BLOCKQUOTE,
    $2.BODY,
    $2.BR,
    $2.BUTTON,
    $2.CAPTION,
    $2.CENTER,
    $2.COL,
    $2.COLGROUP,
    $2.DD,
    $2.DETAILS,
    $2.DIR,
    $2.DIV,
    $2.DL,
    $2.DT,
    $2.EMBED,
    $2.FIELDSET,
    $2.FIGCAPTION,
    $2.FIGURE,
    $2.FOOTER,
    $2.FORM,
    $2.FRAME,
    $2.FRAMESET,
    $2.H1,
    $2.H2,
    $2.H3,
    $2.H4,
    $2.H5,
    $2.H6,
    $2.HEAD,
    $2.HEADER,
    $2.HGROUP,
    $2.HR,
    $2.HTML,
    $2.IFRAME,
    $2.IMG,
    $2.INPUT,
    $2.LI,
    $2.LINK,
    $2.LISTING,
    $2.MAIN,
    $2.MARQUEE,
    $2.MENU,
    $2.META,
    $2.NAV,
    $2.NOEMBED,
    $2.NOFRAMES,
    $2.NOSCRIPT,
    $2.OBJECT,
    $2.OL,
    $2.P,
    $2.PARAM,
    $2.PLAINTEXT,
    $2.PRE,
    $2.SCRIPT,
    $2.SECTION,
    $2.SELECT,
    $2.SOURCE,
    $2.STYLE,
    $2.SUMMARY,
    $2.TABLE,
    $2.TBODY,
    $2.TD,
    $2.TEMPLATE,
    $2.TEXTAREA,
    $2.TFOOT,
    $2.TH,
    $2.THEAD,
    $2.TITLE,
    $2.TR,
    $2.TRACK,
    $2.UL,
    $2.WBR,
    $2.XMP
  ]),
  [NS.MATHML]: /* @__PURE__ */ new Set([$2.MI, $2.MO, $2.MN, $2.MS, $2.MTEXT, $2.ANNOTATION_XML]),
  [NS.SVG]: /* @__PURE__ */ new Set([$2.TITLE, $2.FOREIGN_OBJECT, $2.DESC]),
  [NS.XLINK]: /* @__PURE__ */ new Set(),
  [NS.XML]: /* @__PURE__ */ new Set(),
  [NS.XMLNS]: /* @__PURE__ */ new Set()
};
var NUMBERED_HEADERS = /* @__PURE__ */ new Set([$2.H1, $2.H2, $2.H3, $2.H4, $2.H5, $2.H6]);
var UNESCAPED_TEXT = /* @__PURE__ */ new Set([
  TAG_NAMES.STYLE,
  TAG_NAMES.SCRIPT,
  TAG_NAMES.XMP,
  TAG_NAMES.IFRAME,
  TAG_NAMES.NOEMBED,
  TAG_NAMES.NOFRAMES,
  TAG_NAMES.PLAINTEXT
]);

// node_modules/@lit-labs/ssr/node_modules/parse5/dist/tokenizer/index.js
var State;
(function(State3) {
  State3[State3["DATA"] = 0] = "DATA";
  State3[State3["RCDATA"] = 1] = "RCDATA";
  State3[State3["RAWTEXT"] = 2] = "RAWTEXT";
  State3[State3["SCRIPT_DATA"] = 3] = "SCRIPT_DATA";
  State3[State3["PLAINTEXT"] = 4] = "PLAINTEXT";
  State3[State3["TAG_OPEN"] = 5] = "TAG_OPEN";
  State3[State3["END_TAG_OPEN"] = 6] = "END_TAG_OPEN";
  State3[State3["TAG_NAME"] = 7] = "TAG_NAME";
  State3[State3["RCDATA_LESS_THAN_SIGN"] = 8] = "RCDATA_LESS_THAN_SIGN";
  State3[State3["RCDATA_END_TAG_OPEN"] = 9] = "RCDATA_END_TAG_OPEN";
  State3[State3["RCDATA_END_TAG_NAME"] = 10] = "RCDATA_END_TAG_NAME";
  State3[State3["RAWTEXT_LESS_THAN_SIGN"] = 11] = "RAWTEXT_LESS_THAN_SIGN";
  State3[State3["RAWTEXT_END_TAG_OPEN"] = 12] = "RAWTEXT_END_TAG_OPEN";
  State3[State3["RAWTEXT_END_TAG_NAME"] = 13] = "RAWTEXT_END_TAG_NAME";
  State3[State3["SCRIPT_DATA_LESS_THAN_SIGN"] = 14] = "SCRIPT_DATA_LESS_THAN_SIGN";
  State3[State3["SCRIPT_DATA_END_TAG_OPEN"] = 15] = "SCRIPT_DATA_END_TAG_OPEN";
  State3[State3["SCRIPT_DATA_END_TAG_NAME"] = 16] = "SCRIPT_DATA_END_TAG_NAME";
  State3[State3["SCRIPT_DATA_ESCAPE_START"] = 17] = "SCRIPT_DATA_ESCAPE_START";
  State3[State3["SCRIPT_DATA_ESCAPE_START_DASH"] = 18] = "SCRIPT_DATA_ESCAPE_START_DASH";
  State3[State3["SCRIPT_DATA_ESCAPED"] = 19] = "SCRIPT_DATA_ESCAPED";
  State3[State3["SCRIPT_DATA_ESCAPED_DASH"] = 20] = "SCRIPT_DATA_ESCAPED_DASH";
  State3[State3["SCRIPT_DATA_ESCAPED_DASH_DASH"] = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH";
  State3[State3["SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN"] = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN";
  State3[State3["SCRIPT_DATA_ESCAPED_END_TAG_OPEN"] = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN";
  State3[State3["SCRIPT_DATA_ESCAPED_END_TAG_NAME"] = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME";
  State3[State3["SCRIPT_DATA_DOUBLE_ESCAPE_START"] = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START";
  State3[State3["SCRIPT_DATA_DOUBLE_ESCAPED"] = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED";
  State3[State3["SCRIPT_DATA_DOUBLE_ESCAPED_DASH"] = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH";
  State3[State3["SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH"] = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH";
  State3[State3["SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN"] = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN";
  State3[State3["SCRIPT_DATA_DOUBLE_ESCAPE_END"] = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END";
  State3[State3["BEFORE_ATTRIBUTE_NAME"] = 31] = "BEFORE_ATTRIBUTE_NAME";
  State3[State3["ATTRIBUTE_NAME"] = 32] = "ATTRIBUTE_NAME";
  State3[State3["AFTER_ATTRIBUTE_NAME"] = 33] = "AFTER_ATTRIBUTE_NAME";
  State3[State3["BEFORE_ATTRIBUTE_VALUE"] = 34] = "BEFORE_ATTRIBUTE_VALUE";
  State3[State3["ATTRIBUTE_VALUE_DOUBLE_QUOTED"] = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED";
  State3[State3["ATTRIBUTE_VALUE_SINGLE_QUOTED"] = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED";
  State3[State3["ATTRIBUTE_VALUE_UNQUOTED"] = 37] = "ATTRIBUTE_VALUE_UNQUOTED";
  State3[State3["AFTER_ATTRIBUTE_VALUE_QUOTED"] = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED";
  State3[State3["SELF_CLOSING_START_TAG"] = 39] = "SELF_CLOSING_START_TAG";
  State3[State3["BOGUS_COMMENT"] = 40] = "BOGUS_COMMENT";
  State3[State3["MARKUP_DECLARATION_OPEN"] = 41] = "MARKUP_DECLARATION_OPEN";
  State3[State3["COMMENT_START"] = 42] = "COMMENT_START";
  State3[State3["COMMENT_START_DASH"] = 43] = "COMMENT_START_DASH";
  State3[State3["COMMENT"] = 44] = "COMMENT";
  State3[State3["COMMENT_LESS_THAN_SIGN"] = 45] = "COMMENT_LESS_THAN_SIGN";
  State3[State3["COMMENT_LESS_THAN_SIGN_BANG"] = 46] = "COMMENT_LESS_THAN_SIGN_BANG";
  State3[State3["COMMENT_LESS_THAN_SIGN_BANG_DASH"] = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH";
  State3[State3["COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH"] = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH";
  State3[State3["COMMENT_END_DASH"] = 49] = "COMMENT_END_DASH";
  State3[State3["COMMENT_END"] = 50] = "COMMENT_END";
  State3[State3["COMMENT_END_BANG"] = 51] = "COMMENT_END_BANG";
  State3[State3["DOCTYPE"] = 52] = "DOCTYPE";
  State3[State3["BEFORE_DOCTYPE_NAME"] = 53] = "BEFORE_DOCTYPE_NAME";
  State3[State3["DOCTYPE_NAME"] = 54] = "DOCTYPE_NAME";
  State3[State3["AFTER_DOCTYPE_NAME"] = 55] = "AFTER_DOCTYPE_NAME";
  State3[State3["AFTER_DOCTYPE_PUBLIC_KEYWORD"] = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD";
  State3[State3["BEFORE_DOCTYPE_PUBLIC_IDENTIFIER"] = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER";
  State3[State3["DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED"] = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED";
  State3[State3["DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED"] = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED";
  State3[State3["AFTER_DOCTYPE_PUBLIC_IDENTIFIER"] = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER";
  State3[State3["BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS"] = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS";
  State3[State3["AFTER_DOCTYPE_SYSTEM_KEYWORD"] = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD";
  State3[State3["BEFORE_DOCTYPE_SYSTEM_IDENTIFIER"] = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER";
  State3[State3["DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED"] = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED";
  State3[State3["DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED"] = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED";
  State3[State3["AFTER_DOCTYPE_SYSTEM_IDENTIFIER"] = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER";
  State3[State3["BOGUS_DOCTYPE"] = 67] = "BOGUS_DOCTYPE";
  State3[State3["CDATA_SECTION"] = 68] = "CDATA_SECTION";
  State3[State3["CDATA_SECTION_BRACKET"] = 69] = "CDATA_SECTION_BRACKET";
  State3[State3["CDATA_SECTION_END"] = 70] = "CDATA_SECTION_END";
  State3[State3["CHARACTER_REFERENCE"] = 71] = "CHARACTER_REFERENCE";
  State3[State3["AMBIGUOUS_AMPERSAND"] = 72] = "AMBIGUOUS_AMPERSAND";
})(State || (State = {}));
var TokenizerMode = {
  DATA: State.DATA,
  RCDATA: State.RCDATA,
  RAWTEXT: State.RAWTEXT,
  SCRIPT_DATA: State.SCRIPT_DATA,
  PLAINTEXT: State.PLAINTEXT,
  CDATA_SECTION: State.CDATA_SECTION
};
function isAsciiDigit(cp) {
  return cp >= CODE_POINTS.DIGIT_0 && cp <= CODE_POINTS.DIGIT_9;
}
function isAsciiUpper(cp) {
  return cp >= CODE_POINTS.LATIN_CAPITAL_A && cp <= CODE_POINTS.LATIN_CAPITAL_Z;
}
function isAsciiLower(cp) {
  return cp >= CODE_POINTS.LATIN_SMALL_A && cp <= CODE_POINTS.LATIN_SMALL_Z;
}
function isAsciiLetter(cp) {
  return isAsciiLower(cp) || isAsciiUpper(cp);
}
function isAsciiAlphaNumeric2(cp) {
  return isAsciiLetter(cp) || isAsciiDigit(cp);
}
function toAsciiLower(cp) {
  return cp + 32;
}
function isWhitespace(cp) {
  return cp === CODE_POINTS.SPACE || cp === CODE_POINTS.LINE_FEED || cp === CODE_POINTS.TABULATION || cp === CODE_POINTS.FORM_FEED;
}
function isScriptDataDoubleEscapeSequenceEnd(cp) {
  return isWhitespace(cp) || cp === CODE_POINTS.SOLIDUS || cp === CODE_POINTS.GREATER_THAN_SIGN;
}
function getErrorForNumericCharacterReference(code) {
  if (code === CODE_POINTS.NULL) {
    return ERR.nullCharacterReference;
  } else if (code > 1114111) {
    return ERR.characterReferenceOutsideUnicodeRange;
  } else if (isSurrogate(code)) {
    return ERR.surrogateCharacterReference;
  } else if (isUndefinedCodePoint(code)) {
    return ERR.noncharacterCharacterReference;
  } else if (isControlCodePoint(code) || code === CODE_POINTS.CARRIAGE_RETURN) {
    return ERR.controlCharacterReference;
  }
  return null;
}
var Tokenizer = class {
  constructor(options, handler) {
    this.options = options;
    this.handler = handler;
    this.paused = false;
    this.inLoop = false;
    this.inForeignNode = false;
    this.lastStartTagName = "";
    this.active = false;
    this.state = State.DATA;
    this.returnState = State.DATA;
    this.entityStartPos = 0;
    this.consumedAfterSnapshot = -1;
    this.currentCharacterToken = null;
    this.currentToken = null;
    this.currentAttr = { name: "", value: "" };
    this.preprocessor = new Preprocessor(handler);
    this.currentLocation = this.getCurrentLocation(-1);
    this.entityDecoder = new EntityDecoder(htmlDecodeTree, (cp, consumed) => {
      this.preprocessor.pos = this.entityStartPos + consumed - 1;
      this._flushCodePointConsumedAsCharacterReference(cp);
    }, handler.onParseError ? {
      missingSemicolonAfterCharacterReference: () => {
        this._err(ERR.missingSemicolonAfterCharacterReference, 1);
      },
      absenceOfDigitsInNumericCharacterReference: (consumed) => {
        this._err(ERR.absenceOfDigitsInNumericCharacterReference, this.entityStartPos - this.preprocessor.pos + consumed);
      },
      validateNumericCharacterReference: (code) => {
        const error = getErrorForNumericCharacterReference(code);
        if (error)
          this._err(error, 1);
      }
    } : void 0);
  }
  //Errors
  _err(code, cpOffset = 0) {
    var _a5, _b2;
    (_b2 = (_a5 = this.handler).onParseError) === null || _b2 === void 0 ? void 0 : _b2.call(_a5, this.preprocessor.getError(code, cpOffset));
  }
  // NOTE: `offset` may never run across line boundaries.
  getCurrentLocation(offset3) {
    if (!this.options.sourceCodeLocationInfo) {
      return null;
    }
    return {
      startLine: this.preprocessor.line,
      startCol: this.preprocessor.col - offset3,
      startOffset: this.preprocessor.offset - offset3,
      endLine: -1,
      endCol: -1,
      endOffset: -1
    };
  }
  _runParsingLoop() {
    if (this.inLoop)
      return;
    this.inLoop = true;
    while (this.active && !this.paused) {
      this.consumedAfterSnapshot = 0;
      const cp = this._consume();
      if (!this._ensureHibernation()) {
        this._callState(cp);
      }
    }
    this.inLoop = false;
  }
  //API
  pause() {
    this.paused = true;
  }
  resume(writeCallback) {
    if (!this.paused) {
      throw new Error("Parser was already resumed");
    }
    this.paused = false;
    if (this.inLoop)
      return;
    this._runParsingLoop();
    if (!this.paused) {
      writeCallback === null || writeCallback === void 0 ? void 0 : writeCallback();
    }
  }
  write(chunk, isLastChunk, writeCallback) {
    this.active = true;
    this.preprocessor.write(chunk, isLastChunk);
    this._runParsingLoop();
    if (!this.paused) {
      writeCallback === null || writeCallback === void 0 ? void 0 : writeCallback();
    }
  }
  insertHtmlAtCurrentPos(chunk) {
    this.active = true;
    this.preprocessor.insertHtmlAtCurrentPos(chunk);
    this._runParsingLoop();
  }
  //Hibernation
  _ensureHibernation() {
    if (this.preprocessor.endOfChunkHit) {
      this.preprocessor.retreat(this.consumedAfterSnapshot);
      this.consumedAfterSnapshot = 0;
      this.active = false;
      return true;
    }
    return false;
  }
  //Consumption
  _consume() {
    this.consumedAfterSnapshot++;
    return this.preprocessor.advance();
  }
  _advanceBy(count) {
    this.consumedAfterSnapshot += count;
    for (let i8 = 0; i8 < count; i8++) {
      this.preprocessor.advance();
    }
  }
  _consumeSequenceIfMatch(pattern, caseSensitive) {
    if (this.preprocessor.startsWith(pattern, caseSensitive)) {
      this._advanceBy(pattern.length - 1);
      return true;
    }
    return false;
  }
  //Token creation
  _createStartTagToken() {
    this.currentToken = {
      type: TokenType.START_TAG,
      tagName: "",
      tagID: TAG_ID.UNKNOWN,
      selfClosing: false,
      ackSelfClosing: false,
      attrs: [],
      location: this.getCurrentLocation(1)
    };
  }
  _createEndTagToken() {
    this.currentToken = {
      type: TokenType.END_TAG,
      tagName: "",
      tagID: TAG_ID.UNKNOWN,
      selfClosing: false,
      ackSelfClosing: false,
      attrs: [],
      location: this.getCurrentLocation(2)
    };
  }
  _createCommentToken(offset3) {
    this.currentToken = {
      type: TokenType.COMMENT,
      data: "",
      location: this.getCurrentLocation(offset3)
    };
  }
  _createDoctypeToken(initialName) {
    this.currentToken = {
      type: TokenType.DOCTYPE,
      name: initialName,
      forceQuirks: false,
      publicId: null,
      systemId: null,
      location: this.currentLocation
    };
  }
  _createCharacterToken(type, chars) {
    this.currentCharacterToken = {
      type,
      chars,
      location: this.currentLocation
    };
  }
  //Tag attributes
  _createAttr(attrNameFirstCh) {
    this.currentAttr = {
      name: attrNameFirstCh,
      value: ""
    };
    this.currentLocation = this.getCurrentLocation(0);
  }
  _leaveAttrName() {
    var _a5;
    var _b2;
    const token = this.currentToken;
    if (getTokenAttr(token, this.currentAttr.name) === null) {
      token.attrs.push(this.currentAttr);
      if (token.location && this.currentLocation) {
        const attrLocations = (_a5 = (_b2 = token.location).attrs) !== null && _a5 !== void 0 ? _a5 : _b2.attrs = /* @__PURE__ */ Object.create(null);
        attrLocations[this.currentAttr.name] = this.currentLocation;
        this._leaveAttrValue();
      }
    } else {
      this._err(ERR.duplicateAttribute);
    }
  }
  _leaveAttrValue() {
    if (this.currentLocation) {
      this.currentLocation.endLine = this.preprocessor.line;
      this.currentLocation.endCol = this.preprocessor.col;
      this.currentLocation.endOffset = this.preprocessor.offset;
    }
  }
  //Token emission
  prepareToken(ct) {
    this._emitCurrentCharacterToken(ct.location);
    this.currentToken = null;
    if (ct.location) {
      ct.location.endLine = this.preprocessor.line;
      ct.location.endCol = this.preprocessor.col + 1;
      ct.location.endOffset = this.preprocessor.offset + 1;
    }
    this.currentLocation = this.getCurrentLocation(-1);
  }
  emitCurrentTagToken() {
    const ct = this.currentToken;
    this.prepareToken(ct);
    ct.tagID = getTagID(ct.tagName);
    if (ct.type === TokenType.START_TAG) {
      this.lastStartTagName = ct.tagName;
      this.handler.onStartTag(ct);
    } else {
      if (ct.attrs.length > 0) {
        this._err(ERR.endTagWithAttributes);
      }
      if (ct.selfClosing) {
        this._err(ERR.endTagWithTrailingSolidus);
      }
      this.handler.onEndTag(ct);
    }
    this.preprocessor.dropParsedChunk();
  }
  emitCurrentComment(ct) {
    this.prepareToken(ct);
    this.handler.onComment(ct);
    this.preprocessor.dropParsedChunk();
  }
  emitCurrentDoctype(ct) {
    this.prepareToken(ct);
    this.handler.onDoctype(ct);
    this.preprocessor.dropParsedChunk();
  }
  _emitCurrentCharacterToken(nextLocation) {
    if (this.currentCharacterToken) {
      if (nextLocation && this.currentCharacterToken.location) {
        this.currentCharacterToken.location.endLine = nextLocation.startLine;
        this.currentCharacterToken.location.endCol = nextLocation.startCol;
        this.currentCharacterToken.location.endOffset = nextLocation.startOffset;
      }
      switch (this.currentCharacterToken.type) {
        case TokenType.CHARACTER: {
          this.handler.onCharacter(this.currentCharacterToken);
          break;
        }
        case TokenType.NULL_CHARACTER: {
          this.handler.onNullCharacter(this.currentCharacterToken);
          break;
        }
        case TokenType.WHITESPACE_CHARACTER: {
          this.handler.onWhitespaceCharacter(this.currentCharacterToken);
          break;
        }
      }
      this.currentCharacterToken = null;
    }
  }
  _emitEOFToken() {
    const location = this.getCurrentLocation(0);
    if (location) {
      location.endLine = location.startLine;
      location.endCol = location.startCol;
      location.endOffset = location.startOffset;
    }
    this._emitCurrentCharacterToken(location);
    this.handler.onEof({ type: TokenType.EOF, location });
    this.active = false;
  }
  //Characters emission
  //OPTIMIZATION: The specification uses only one type of character token (one token per character).
  //This causes a huge memory overhead and a lot of unnecessary parser loops. parse5 uses 3 groups of characters.
  //If we have a sequence of characters that belong to the same group, the parser can process it
  //as a single solid character token.
  //So, there are 3 types of character tokens in parse5:
  //1)TokenType.NULL_CHARACTER - \u0000-character sequences (e.g. '\u0000\u0000\u0000')
  //2)TokenType.WHITESPACE_CHARACTER - any whitespace/new-line character sequences (e.g. '\n  \r\t   \f')
  //3)TokenType.CHARACTER - any character sequence which don't belong to groups 1 and 2 (e.g. 'abcdef1234@@#$%^')
  _appendCharToCurrentCharacterToken(type, ch) {
    if (this.currentCharacterToken) {
      if (this.currentCharacterToken.type === type) {
        this.currentCharacterToken.chars += ch;
        return;
      } else {
        this.currentLocation = this.getCurrentLocation(0);
        this._emitCurrentCharacterToken(this.currentLocation);
        this.preprocessor.dropParsedChunk();
      }
    }
    this._createCharacterToken(type, ch);
  }
  _emitCodePoint(cp) {
    const type = isWhitespace(cp) ? TokenType.WHITESPACE_CHARACTER : cp === CODE_POINTS.NULL ? TokenType.NULL_CHARACTER : TokenType.CHARACTER;
    this._appendCharToCurrentCharacterToken(type, String.fromCodePoint(cp));
  }
  //NOTE: used when we emit characters explicitly.
  //This is always for non-whitespace and non-null characters, which allows us to avoid additional checks.
  _emitChars(ch) {
    this._appendCharToCurrentCharacterToken(TokenType.CHARACTER, ch);
  }
  // Character reference helpers
  _startCharacterReference() {
    this.returnState = this.state;
    this.state = State.CHARACTER_REFERENCE;
    this.entityStartPos = this.preprocessor.pos;
    this.entityDecoder.startEntity(this._isCharacterReferenceInAttribute() ? DecodingMode.Attribute : DecodingMode.Legacy);
  }
  _isCharacterReferenceInAttribute() {
    return this.returnState === State.ATTRIBUTE_VALUE_DOUBLE_QUOTED || this.returnState === State.ATTRIBUTE_VALUE_SINGLE_QUOTED || this.returnState === State.ATTRIBUTE_VALUE_UNQUOTED;
  }
  _flushCodePointConsumedAsCharacterReference(cp) {
    if (this._isCharacterReferenceInAttribute()) {
      this.currentAttr.value += String.fromCodePoint(cp);
    } else {
      this._emitCodePoint(cp);
    }
  }
  // Calling states this way turns out to be much faster than any other approach.
  _callState(cp) {
    switch (this.state) {
      case State.DATA: {
        this._stateData(cp);
        break;
      }
      case State.RCDATA: {
        this._stateRcdata(cp);
        break;
      }
      case State.RAWTEXT: {
        this._stateRawtext(cp);
        break;
      }
      case State.SCRIPT_DATA: {
        this._stateScriptData(cp);
        break;
      }
      case State.PLAINTEXT: {
        this._statePlaintext(cp);
        break;
      }
      case State.TAG_OPEN: {
        this._stateTagOpen(cp);
        break;
      }
      case State.END_TAG_OPEN: {
        this._stateEndTagOpen(cp);
        break;
      }
      case State.TAG_NAME: {
        this._stateTagName(cp);
        break;
      }
      case State.RCDATA_LESS_THAN_SIGN: {
        this._stateRcdataLessThanSign(cp);
        break;
      }
      case State.RCDATA_END_TAG_OPEN: {
        this._stateRcdataEndTagOpen(cp);
        break;
      }
      case State.RCDATA_END_TAG_NAME: {
        this._stateRcdataEndTagName(cp);
        break;
      }
      case State.RAWTEXT_LESS_THAN_SIGN: {
        this._stateRawtextLessThanSign(cp);
        break;
      }
      case State.RAWTEXT_END_TAG_OPEN: {
        this._stateRawtextEndTagOpen(cp);
        break;
      }
      case State.RAWTEXT_END_TAG_NAME: {
        this._stateRawtextEndTagName(cp);
        break;
      }
      case State.SCRIPT_DATA_LESS_THAN_SIGN: {
        this._stateScriptDataLessThanSign(cp);
        break;
      }
      case State.SCRIPT_DATA_END_TAG_OPEN: {
        this._stateScriptDataEndTagOpen(cp);
        break;
      }
      case State.SCRIPT_DATA_END_TAG_NAME: {
        this._stateScriptDataEndTagName(cp);
        break;
      }
      case State.SCRIPT_DATA_ESCAPE_START: {
        this._stateScriptDataEscapeStart(cp);
        break;
      }
      case State.SCRIPT_DATA_ESCAPE_START_DASH: {
        this._stateScriptDataEscapeStartDash(cp);
        break;
      }
      case State.SCRIPT_DATA_ESCAPED: {
        this._stateScriptDataEscaped(cp);
        break;
      }
      case State.SCRIPT_DATA_ESCAPED_DASH: {
        this._stateScriptDataEscapedDash(cp);
        break;
      }
      case State.SCRIPT_DATA_ESCAPED_DASH_DASH: {
        this._stateScriptDataEscapedDashDash(cp);
        break;
      }
      case State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataEscapedLessThanSign(cp);
        break;
      }
      case State.SCRIPT_DATA_ESCAPED_END_TAG_OPEN: {
        this._stateScriptDataEscapedEndTagOpen(cp);
        break;
      }
      case State.SCRIPT_DATA_ESCAPED_END_TAG_NAME: {
        this._stateScriptDataEscapedEndTagName(cp);
        break;
      }
      case State.SCRIPT_DATA_DOUBLE_ESCAPE_START: {
        this._stateScriptDataDoubleEscapeStart(cp);
        break;
      }
      case State.SCRIPT_DATA_DOUBLE_ESCAPED: {
        this._stateScriptDataDoubleEscaped(cp);
        break;
      }
      case State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH: {
        this._stateScriptDataDoubleEscapedDash(cp);
        break;
      }
      case State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH: {
        this._stateScriptDataDoubleEscapedDashDash(cp);
        break;
      }
      case State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN: {
        this._stateScriptDataDoubleEscapedLessThanSign(cp);
        break;
      }
      case State.SCRIPT_DATA_DOUBLE_ESCAPE_END: {
        this._stateScriptDataDoubleEscapeEnd(cp);
        break;
      }
      case State.BEFORE_ATTRIBUTE_NAME: {
        this._stateBeforeAttributeName(cp);
        break;
      }
      case State.ATTRIBUTE_NAME: {
        this._stateAttributeName(cp);
        break;
      }
      case State.AFTER_ATTRIBUTE_NAME: {
        this._stateAfterAttributeName(cp);
        break;
      }
      case State.BEFORE_ATTRIBUTE_VALUE: {
        this._stateBeforeAttributeValue(cp);
        break;
      }
      case State.ATTRIBUTE_VALUE_DOUBLE_QUOTED: {
        this._stateAttributeValueDoubleQuoted(cp);
        break;
      }
      case State.ATTRIBUTE_VALUE_SINGLE_QUOTED: {
        this._stateAttributeValueSingleQuoted(cp);
        break;
      }
      case State.ATTRIBUTE_VALUE_UNQUOTED: {
        this._stateAttributeValueUnquoted(cp);
        break;
      }
      case State.AFTER_ATTRIBUTE_VALUE_QUOTED: {
        this._stateAfterAttributeValueQuoted(cp);
        break;
      }
      case State.SELF_CLOSING_START_TAG: {
        this._stateSelfClosingStartTag(cp);
        break;
      }
      case State.BOGUS_COMMENT: {
        this._stateBogusComment(cp);
        break;
      }
      case State.MARKUP_DECLARATION_OPEN: {
        this._stateMarkupDeclarationOpen(cp);
        break;
      }
      case State.COMMENT_START: {
        this._stateCommentStart(cp);
        break;
      }
      case State.COMMENT_START_DASH: {
        this._stateCommentStartDash(cp);
        break;
      }
      case State.COMMENT: {
        this._stateComment(cp);
        break;
      }
      case State.COMMENT_LESS_THAN_SIGN: {
        this._stateCommentLessThanSign(cp);
        break;
      }
      case State.COMMENT_LESS_THAN_SIGN_BANG: {
        this._stateCommentLessThanSignBang(cp);
        break;
      }
      case State.COMMENT_LESS_THAN_SIGN_BANG_DASH: {
        this._stateCommentLessThanSignBangDash(cp);
        break;
      }
      case State.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH: {
        this._stateCommentLessThanSignBangDashDash(cp);
        break;
      }
      case State.COMMENT_END_DASH: {
        this._stateCommentEndDash(cp);
        break;
      }
      case State.COMMENT_END: {
        this._stateCommentEnd(cp);
        break;
      }
      case State.COMMENT_END_BANG: {
        this._stateCommentEndBang(cp);
        break;
      }
      case State.DOCTYPE: {
        this._stateDoctype(cp);
        break;
      }
      case State.BEFORE_DOCTYPE_NAME: {
        this._stateBeforeDoctypeName(cp);
        break;
      }
      case State.DOCTYPE_NAME: {
        this._stateDoctypeName(cp);
        break;
      }
      case State.AFTER_DOCTYPE_NAME: {
        this._stateAfterDoctypeName(cp);
        break;
      }
      case State.AFTER_DOCTYPE_PUBLIC_KEYWORD: {
        this._stateAfterDoctypePublicKeyword(cp);
        break;
      }
      case State.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateBeforeDoctypePublicIdentifier(cp);
        break;
      }
      case State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypePublicIdentifierDoubleQuoted(cp);
        break;
      }
      case State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypePublicIdentifierSingleQuoted(cp);
        break;
      }
      case State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER: {
        this._stateAfterDoctypePublicIdentifier(cp);
        break;
      }
      case State.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS: {
        this._stateBetweenDoctypePublicAndSystemIdentifiers(cp);
        break;
      }
      case State.AFTER_DOCTYPE_SYSTEM_KEYWORD: {
        this._stateAfterDoctypeSystemKeyword(cp);
        break;
      }
      case State.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateBeforeDoctypeSystemIdentifier(cp);
        break;
      }
      case State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED: {
        this._stateDoctypeSystemIdentifierDoubleQuoted(cp);
        break;
      }
      case State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED: {
        this._stateDoctypeSystemIdentifierSingleQuoted(cp);
        break;
      }
      case State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER: {
        this._stateAfterDoctypeSystemIdentifier(cp);
        break;
      }
      case State.BOGUS_DOCTYPE: {
        this._stateBogusDoctype(cp);
        break;
      }
      case State.CDATA_SECTION: {
        this._stateCdataSection(cp);
        break;
      }
      case State.CDATA_SECTION_BRACKET: {
        this._stateCdataSectionBracket(cp);
        break;
      }
      case State.CDATA_SECTION_END: {
        this._stateCdataSectionEnd(cp);
        break;
      }
      case State.CHARACTER_REFERENCE: {
        this._stateCharacterReference();
        break;
      }
      case State.AMBIGUOUS_AMPERSAND: {
        this._stateAmbiguousAmpersand(cp);
        break;
      }
      default: {
        throw new Error("Unknown state");
      }
    }
  }
  // State machine
  // Data state
  //------------------------------------------------------------------
  _stateData(cp) {
    switch (cp) {
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.TAG_OPEN;
        break;
      }
      case CODE_POINTS.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this._emitCodePoint(cp);
        break;
      }
      case CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp);
      }
    }
  }
  //  RCDATA state
  //------------------------------------------------------------------
  _stateRcdata(cp) {
    switch (cp) {
      case CODE_POINTS.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.RCDATA_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp);
      }
    }
  }
  // RAWTEXT state
  //------------------------------------------------------------------
  _stateRawtext(cp) {
    switch (cp) {
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.RAWTEXT_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp);
      }
    }
  }
  // Script data state
  //------------------------------------------------------------------
  _stateScriptData(cp) {
    switch (cp) {
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.SCRIPT_DATA_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp);
      }
    }
  }
  // PLAINTEXT state
  //------------------------------------------------------------------
  _statePlaintext(cp) {
    switch (cp) {
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp);
      }
    }
  }
  // Tag open state
  //------------------------------------------------------------------
  _stateTagOpen(cp) {
    if (isAsciiLetter(cp)) {
      this._createStartTagToken();
      this.state = State.TAG_NAME;
      this._stateTagName(cp);
    } else
      switch (cp) {
        case CODE_POINTS.EXCLAMATION_MARK: {
          this.state = State.MARKUP_DECLARATION_OPEN;
          break;
        }
        case CODE_POINTS.SOLIDUS: {
          this.state = State.END_TAG_OPEN;
          break;
        }
        case CODE_POINTS.QUESTION_MARK: {
          this._err(ERR.unexpectedQuestionMarkInsteadOfTagName);
          this._createCommentToken(1);
          this.state = State.BOGUS_COMMENT;
          this._stateBogusComment(cp);
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofBeforeTagName);
          this._emitChars("<");
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(ERR.invalidFirstCharacterOfTagName);
          this._emitChars("<");
          this.state = State.DATA;
          this._stateData(cp);
        }
      }
  }
  // End tag open state
  //------------------------------------------------------------------
  _stateEndTagOpen(cp) {
    if (isAsciiLetter(cp)) {
      this._createEndTagToken();
      this.state = State.TAG_NAME;
      this._stateTagName(cp);
    } else
      switch (cp) {
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.missingEndTagName);
          this.state = State.DATA;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofBeforeTagName);
          this._emitChars("</");
          this._emitEOFToken();
          break;
        }
        default: {
          this._err(ERR.invalidFirstCharacterOfTagName);
          this._createCommentToken(2);
          this.state = State.BOGUS_COMMENT;
          this._stateBogusComment(cp);
        }
      }
  }
  // Tag name state
  //------------------------------------------------------------------
  _stateTagName(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case CODE_POINTS.SOLIDUS: {
        this.state = State.SELF_CLOSING_START_TAG;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA;
        this.emitCurrentTagToken();
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token.tagName += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag);
        this._emitEOFToken();
        break;
      }
      default: {
        token.tagName += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
      }
    }
  }
  // RCDATA less-than sign state
  //------------------------------------------------------------------
  _stateRcdataLessThanSign(cp) {
    if (cp === CODE_POINTS.SOLIDUS) {
      this.state = State.RCDATA_END_TAG_OPEN;
    } else {
      this._emitChars("<");
      this.state = State.RCDATA;
      this._stateRcdata(cp);
    }
  }
  // RCDATA end tag open state
  //------------------------------------------------------------------
  _stateRcdataEndTagOpen(cp) {
    if (isAsciiLetter(cp)) {
      this.state = State.RCDATA_END_TAG_NAME;
      this._stateRcdataEndTagName(cp);
    } else {
      this._emitChars("</");
      this.state = State.RCDATA;
      this._stateRcdata(cp);
    }
  }
  handleSpecialEndTag(_cp) {
    if (!this.preprocessor.startsWith(this.lastStartTagName, false)) {
      return !this._ensureHibernation();
    }
    this._createEndTagToken();
    const token = this.currentToken;
    token.tagName = this.lastStartTagName;
    const cp = this.preprocessor.peek(this.lastStartTagName.length);
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this._advanceBy(this.lastStartTagName.length);
        this.state = State.BEFORE_ATTRIBUTE_NAME;
        return false;
      }
      case CODE_POINTS.SOLIDUS: {
        this._advanceBy(this.lastStartTagName.length);
        this.state = State.SELF_CLOSING_START_TAG;
        return false;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._advanceBy(this.lastStartTagName.length);
        this.emitCurrentTagToken();
        this.state = State.DATA;
        return false;
      }
      default: {
        return !this._ensureHibernation();
      }
    }
  }
  // RCDATA end tag name state
  //------------------------------------------------------------------
  _stateRcdataEndTagName(cp) {
    if (this.handleSpecialEndTag(cp)) {
      this._emitChars("</");
      this.state = State.RCDATA;
      this._stateRcdata(cp);
    }
  }
  // RAWTEXT less-than sign state
  //------------------------------------------------------------------
  _stateRawtextLessThanSign(cp) {
    if (cp === CODE_POINTS.SOLIDUS) {
      this.state = State.RAWTEXT_END_TAG_OPEN;
    } else {
      this._emitChars("<");
      this.state = State.RAWTEXT;
      this._stateRawtext(cp);
    }
  }
  // RAWTEXT end tag open state
  //------------------------------------------------------------------
  _stateRawtextEndTagOpen(cp) {
    if (isAsciiLetter(cp)) {
      this.state = State.RAWTEXT_END_TAG_NAME;
      this._stateRawtextEndTagName(cp);
    } else {
      this._emitChars("</");
      this.state = State.RAWTEXT;
      this._stateRawtext(cp);
    }
  }
  // RAWTEXT end tag name state
  //------------------------------------------------------------------
  _stateRawtextEndTagName(cp) {
    if (this.handleSpecialEndTag(cp)) {
      this._emitChars("</");
      this.state = State.RAWTEXT;
      this._stateRawtext(cp);
    }
  }
  // Script data less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataLessThanSign(cp) {
    switch (cp) {
      case CODE_POINTS.SOLIDUS: {
        this.state = State.SCRIPT_DATA_END_TAG_OPEN;
        break;
      }
      case CODE_POINTS.EXCLAMATION_MARK: {
        this.state = State.SCRIPT_DATA_ESCAPE_START;
        this._emitChars("<!");
        break;
      }
      default: {
        this._emitChars("<");
        this.state = State.SCRIPT_DATA;
        this._stateScriptData(cp);
      }
    }
  }
  // Script data end tag open state
  //------------------------------------------------------------------
  _stateScriptDataEndTagOpen(cp) {
    if (isAsciiLetter(cp)) {
      this.state = State.SCRIPT_DATA_END_TAG_NAME;
      this._stateScriptDataEndTagName(cp);
    } else {
      this._emitChars("</");
      this.state = State.SCRIPT_DATA;
      this._stateScriptData(cp);
    }
  }
  // Script data end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEndTagName(cp) {
    if (this.handleSpecialEndTag(cp)) {
      this._emitChars("</");
      this.state = State.SCRIPT_DATA;
      this._stateScriptData(cp);
    }
  }
  // Script data escape start state
  //------------------------------------------------------------------
  _stateScriptDataEscapeStart(cp) {
    if (cp === CODE_POINTS.HYPHEN_MINUS) {
      this.state = State.SCRIPT_DATA_ESCAPE_START_DASH;
      this._emitChars("-");
    } else {
      this.state = State.SCRIPT_DATA;
      this._stateScriptData(cp);
    }
  }
  // Script data escape start dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapeStartDash(cp) {
    if (cp === CODE_POINTS.HYPHEN_MINUS) {
      this.state = State.SCRIPT_DATA_ESCAPED_DASH_DASH;
      this._emitChars("-");
    } else {
      this.state = State.SCRIPT_DATA;
      this._stateScriptData(cp);
    }
  }
  // Script data escaped state
  //------------------------------------------------------------------
  _stateScriptDataEscaped(cp) {
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.SCRIPT_DATA_ESCAPED_DASH;
        this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText);
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp);
      }
    }
  }
  // Script data escaped dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapedDash(cp) {
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.SCRIPT_DATA_ESCAPED_DASH_DASH;
        this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.state = State.SCRIPT_DATA_ESCAPED;
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText);
        this._emitEOFToken();
        break;
      }
      default: {
        this.state = State.SCRIPT_DATA_ESCAPED;
        this._emitCodePoint(cp);
      }
    }
  }
  // Script data escaped dash dash state
  //------------------------------------------------------------------
  _stateScriptDataEscapedDashDash(cp) {
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.SCRIPT_DATA;
        this._emitChars(">");
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.state = State.SCRIPT_DATA_ESCAPED;
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText);
        this._emitEOFToken();
        break;
      }
      default: {
        this.state = State.SCRIPT_DATA_ESCAPED;
        this._emitCodePoint(cp);
      }
    }
  }
  // Script data escaped less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataEscapedLessThanSign(cp) {
    if (cp === CODE_POINTS.SOLIDUS) {
      this.state = State.SCRIPT_DATA_ESCAPED_END_TAG_OPEN;
    } else if (isAsciiLetter(cp)) {
      this._emitChars("<");
      this.state = State.SCRIPT_DATA_DOUBLE_ESCAPE_START;
      this._stateScriptDataDoubleEscapeStart(cp);
    } else {
      this._emitChars("<");
      this.state = State.SCRIPT_DATA_ESCAPED;
      this._stateScriptDataEscaped(cp);
    }
  }
  // Script data escaped end tag open state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagOpen(cp) {
    if (isAsciiLetter(cp)) {
      this.state = State.SCRIPT_DATA_ESCAPED_END_TAG_NAME;
      this._stateScriptDataEscapedEndTagName(cp);
    } else {
      this._emitChars("</");
      this.state = State.SCRIPT_DATA_ESCAPED;
      this._stateScriptDataEscaped(cp);
    }
  }
  // Script data escaped end tag name state
  //------------------------------------------------------------------
  _stateScriptDataEscapedEndTagName(cp) {
    if (this.handleSpecialEndTag(cp)) {
      this._emitChars("</");
      this.state = State.SCRIPT_DATA_ESCAPED;
      this._stateScriptDataEscaped(cp);
    }
  }
  // Script data double escape start state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeStart(cp) {
    if (this.preprocessor.startsWith(SEQUENCES.SCRIPT, false) && isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(SEQUENCES.SCRIPT.length))) {
      this._emitCodePoint(cp);
      for (let i8 = 0; i8 < SEQUENCES.SCRIPT.length; i8++) {
        this._emitCodePoint(this._consume());
      }
      this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
    } else if (!this._ensureHibernation()) {
      this.state = State.SCRIPT_DATA_ESCAPED;
      this._stateScriptDataEscaped(cp);
    }
  }
  // Script data double escaped state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscaped(cp) {
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH;
        this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
        this._emitChars("<");
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText);
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp);
      }
    }
  }
  // Script data double escaped dash state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedDash(cp) {
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH;
        this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
        this._emitChars("<");
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText);
        this._emitEOFToken();
        break;
      }
      default: {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
        this._emitCodePoint(cp);
      }
    }
  }
  // Script data double escaped dash dash state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedDashDash(cp) {
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this._emitChars("-");
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN;
        this._emitChars("<");
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.SCRIPT_DATA;
        this._emitChars(">");
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
        this._emitChars(REPLACEMENT_CHARACTER);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInScriptHtmlCommentLikeText);
        this._emitEOFToken();
        break;
      }
      default: {
        this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
        this._emitCodePoint(cp);
      }
    }
  }
  // Script data double escaped less-than sign state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapedLessThanSign(cp) {
    if (cp === CODE_POINTS.SOLIDUS) {
      this.state = State.SCRIPT_DATA_DOUBLE_ESCAPE_END;
      this._emitChars("/");
    } else {
      this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
      this._stateScriptDataDoubleEscaped(cp);
    }
  }
  // Script data double escape end state
  //------------------------------------------------------------------
  _stateScriptDataDoubleEscapeEnd(cp) {
    if (this.preprocessor.startsWith(SEQUENCES.SCRIPT, false) && isScriptDataDoubleEscapeSequenceEnd(this.preprocessor.peek(SEQUENCES.SCRIPT.length))) {
      this._emitCodePoint(cp);
      for (let i8 = 0; i8 < SEQUENCES.SCRIPT.length; i8++) {
        this._emitCodePoint(this._consume());
      }
      this.state = State.SCRIPT_DATA_ESCAPED;
    } else if (!this._ensureHibernation()) {
      this.state = State.SCRIPT_DATA_DOUBLE_ESCAPED;
      this._stateScriptDataDoubleEscaped(cp);
    }
  }
  // Before attribute name state
  //------------------------------------------------------------------
  _stateBeforeAttributeName(cp) {
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.SOLIDUS:
      case CODE_POINTS.GREATER_THAN_SIGN:
      case CODE_POINTS.EOF: {
        this.state = State.AFTER_ATTRIBUTE_NAME;
        this._stateAfterAttributeName(cp);
        break;
      }
      case CODE_POINTS.EQUALS_SIGN: {
        this._err(ERR.unexpectedEqualsSignBeforeAttributeName);
        this._createAttr("=");
        this.state = State.ATTRIBUTE_NAME;
        break;
      }
      default: {
        this._createAttr("");
        this.state = State.ATTRIBUTE_NAME;
        this._stateAttributeName(cp);
      }
    }
  }
  // Attribute name state
  //------------------------------------------------------------------
  _stateAttributeName(cp) {
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED:
      case CODE_POINTS.SOLIDUS:
      case CODE_POINTS.GREATER_THAN_SIGN:
      case CODE_POINTS.EOF: {
        this._leaveAttrName();
        this.state = State.AFTER_ATTRIBUTE_NAME;
        this._stateAfterAttributeName(cp);
        break;
      }
      case CODE_POINTS.EQUALS_SIGN: {
        this._leaveAttrName();
        this.state = State.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case CODE_POINTS.QUOTATION_MARK:
      case CODE_POINTS.APOSTROPHE:
      case CODE_POINTS.LESS_THAN_SIGN: {
        this._err(ERR.unexpectedCharacterInAttributeName);
        this.currentAttr.name += String.fromCodePoint(cp);
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.currentAttr.name += REPLACEMENT_CHARACTER;
        break;
      }
      default: {
        this.currentAttr.name += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
      }
    }
  }
  // After attribute name state
  //------------------------------------------------------------------
  _stateAfterAttributeName(cp) {
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.SOLIDUS: {
        this.state = State.SELF_CLOSING_START_TAG;
        break;
      }
      case CODE_POINTS.EQUALS_SIGN: {
        this.state = State.BEFORE_ATTRIBUTE_VALUE;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA;
        this.emitCurrentTagToken();
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag);
        this._emitEOFToken();
        break;
      }
      default: {
        this._createAttr("");
        this.state = State.ATTRIBUTE_NAME;
        this._stateAttributeName(cp);
      }
    }
  }
  // Before attribute value state
  //------------------------------------------------------------------
  _stateBeforeAttributeValue(cp) {
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        this.state = State.ATTRIBUTE_VALUE_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        this.state = State.ATTRIBUTE_VALUE_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.missingAttributeValue);
        this.state = State.DATA;
        this.emitCurrentTagToken();
        break;
      }
      default: {
        this.state = State.ATTRIBUTE_VALUE_UNQUOTED;
        this._stateAttributeValueUnquoted(cp);
      }
    }
  }
  // Attribute value (double-quoted) state
  //------------------------------------------------------------------
  _stateAttributeValueDoubleQuoted(cp) {
    switch (cp) {
      case CODE_POINTS.QUOTATION_MARK: {
        this.state = State.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case CODE_POINTS.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.currentAttr.value += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag);
        this._emitEOFToken();
        break;
      }
      default: {
        this.currentAttr.value += String.fromCodePoint(cp);
      }
    }
  }
  // Attribute value (single-quoted) state
  //------------------------------------------------------------------
  _stateAttributeValueSingleQuoted(cp) {
    switch (cp) {
      case CODE_POINTS.APOSTROPHE: {
        this.state = State.AFTER_ATTRIBUTE_VALUE_QUOTED;
        break;
      }
      case CODE_POINTS.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.currentAttr.value += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag);
        this._emitEOFToken();
        break;
      }
      default: {
        this.currentAttr.value += String.fromCodePoint(cp);
      }
    }
  }
  // Attribute value (unquoted) state
  //------------------------------------------------------------------
  _stateAttributeValueUnquoted(cp) {
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this._leaveAttrValue();
        this.state = State.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case CODE_POINTS.AMPERSAND: {
        this._startCharacterReference();
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._leaveAttrValue();
        this.state = State.DATA;
        this.emitCurrentTagToken();
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        this.currentAttr.value += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.QUOTATION_MARK:
      case CODE_POINTS.APOSTROPHE:
      case CODE_POINTS.LESS_THAN_SIGN:
      case CODE_POINTS.EQUALS_SIGN:
      case CODE_POINTS.GRAVE_ACCENT: {
        this._err(ERR.unexpectedCharacterInUnquotedAttributeValue);
        this.currentAttr.value += String.fromCodePoint(cp);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag);
        this._emitEOFToken();
        break;
      }
      default: {
        this.currentAttr.value += String.fromCodePoint(cp);
      }
    }
  }
  // After attribute value (quoted) state
  //------------------------------------------------------------------
  _stateAfterAttributeValueQuoted(cp) {
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this._leaveAttrValue();
        this.state = State.BEFORE_ATTRIBUTE_NAME;
        break;
      }
      case CODE_POINTS.SOLIDUS: {
        this._leaveAttrValue();
        this.state = State.SELF_CLOSING_START_TAG;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._leaveAttrValue();
        this.state = State.DATA;
        this.emitCurrentTagToken();
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingWhitespaceBetweenAttributes);
        this.state = State.BEFORE_ATTRIBUTE_NAME;
        this._stateBeforeAttributeName(cp);
      }
    }
  }
  // Self-closing start tag state
  //------------------------------------------------------------------
  _stateSelfClosingStartTag(cp) {
    switch (cp) {
      case CODE_POINTS.GREATER_THAN_SIGN: {
        const token = this.currentToken;
        token.selfClosing = true;
        this.state = State.DATA;
        this.emitCurrentTagToken();
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInTag);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.unexpectedSolidusInTag);
        this.state = State.BEFORE_ATTRIBUTE_NAME;
        this._stateBeforeAttributeName(cp);
      }
    }
  }
  // Bogus comment state
  //------------------------------------------------------------------
  _stateBogusComment(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA;
        this.emitCurrentComment(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this.emitCurrentComment(token);
        this._emitEOFToken();
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token.data += REPLACEMENT_CHARACTER;
        break;
      }
      default: {
        token.data += String.fromCodePoint(cp);
      }
    }
  }
  // Markup declaration open state
  //------------------------------------------------------------------
  _stateMarkupDeclarationOpen(cp) {
    if (this._consumeSequenceIfMatch(SEQUENCES.DASH_DASH, true)) {
      this._createCommentToken(SEQUENCES.DASH_DASH.length + 1);
      this.state = State.COMMENT_START;
    } else if (this._consumeSequenceIfMatch(SEQUENCES.DOCTYPE, false)) {
      this.currentLocation = this.getCurrentLocation(SEQUENCES.DOCTYPE.length + 1);
      this.state = State.DOCTYPE;
    } else if (this._consumeSequenceIfMatch(SEQUENCES.CDATA_START, true)) {
      if (this.inForeignNode) {
        this.state = State.CDATA_SECTION;
      } else {
        this._err(ERR.cdataInHtmlContent);
        this._createCommentToken(SEQUENCES.CDATA_START.length + 1);
        this.currentToken.data = "[CDATA[";
        this.state = State.BOGUS_COMMENT;
      }
    } else if (!this._ensureHibernation()) {
      this._err(ERR.incorrectlyOpenedComment);
      this._createCommentToken(2);
      this.state = State.BOGUS_COMMENT;
      this._stateBogusComment(cp);
    }
  }
  // Comment start state
  //------------------------------------------------------------------
  _stateCommentStart(cp) {
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.COMMENT_START_DASH;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptClosingOfEmptyComment);
        this.state = State.DATA;
        const token = this.currentToken;
        this.emitCurrentComment(token);
        break;
      }
      default: {
        this.state = State.COMMENT;
        this._stateComment(cp);
      }
    }
  }
  // Comment start dash state
  //------------------------------------------------------------------
  _stateCommentStartDash(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.COMMENT_END;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptClosingOfEmptyComment);
        this.state = State.DATA;
        this.emitCurrentComment(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInComment);
        this.emitCurrentComment(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.data += "-";
        this.state = State.COMMENT;
        this._stateComment(cp);
      }
    }
  }
  // Comment state
  //------------------------------------------------------------------
  _stateComment(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.COMMENT_END_DASH;
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        token.data += "<";
        this.state = State.COMMENT_LESS_THAN_SIGN;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token.data += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInComment);
        this.emitCurrentComment(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.data += String.fromCodePoint(cp);
      }
    }
  }
  // Comment less-than sign state
  //------------------------------------------------------------------
  _stateCommentLessThanSign(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.EXCLAMATION_MARK: {
        token.data += "!";
        this.state = State.COMMENT_LESS_THAN_SIGN_BANG;
        break;
      }
      case CODE_POINTS.LESS_THAN_SIGN: {
        token.data += "<";
        break;
      }
      default: {
        this.state = State.COMMENT;
        this._stateComment(cp);
      }
    }
  }
  // Comment less-than sign bang state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBang(cp) {
    if (cp === CODE_POINTS.HYPHEN_MINUS) {
      this.state = State.COMMENT_LESS_THAN_SIGN_BANG_DASH;
    } else {
      this.state = State.COMMENT;
      this._stateComment(cp);
    }
  }
  // Comment less-than sign bang dash state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBangDash(cp) {
    if (cp === CODE_POINTS.HYPHEN_MINUS) {
      this.state = State.COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH;
    } else {
      this.state = State.COMMENT_END_DASH;
      this._stateCommentEndDash(cp);
    }
  }
  // Comment less-than sign bang dash dash state
  //------------------------------------------------------------------
  _stateCommentLessThanSignBangDashDash(cp) {
    if (cp !== CODE_POINTS.GREATER_THAN_SIGN && cp !== CODE_POINTS.EOF) {
      this._err(ERR.nestedComment);
    }
    this.state = State.COMMENT_END;
    this._stateCommentEnd(cp);
  }
  // Comment end dash state
  //------------------------------------------------------------------
  _stateCommentEndDash(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        this.state = State.COMMENT_END;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInComment);
        this.emitCurrentComment(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.data += "-";
        this.state = State.COMMENT;
        this._stateComment(cp);
      }
    }
  }
  // Comment end state
  //------------------------------------------------------------------
  _stateCommentEnd(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA;
        this.emitCurrentComment(token);
        break;
      }
      case CODE_POINTS.EXCLAMATION_MARK: {
        this.state = State.COMMENT_END_BANG;
        break;
      }
      case CODE_POINTS.HYPHEN_MINUS: {
        token.data += "-";
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInComment);
        this.emitCurrentComment(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.data += "--";
        this.state = State.COMMENT;
        this._stateComment(cp);
      }
    }
  }
  // Comment end bang state
  //------------------------------------------------------------------
  _stateCommentEndBang(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.HYPHEN_MINUS: {
        token.data += "--!";
        this.state = State.COMMENT_END_DASH;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.incorrectlyClosedComment);
        this.state = State.DATA;
        this.emitCurrentComment(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInComment);
        this.emitCurrentComment(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.data += "--!";
        this.state = State.COMMENT;
        this._stateComment(cp);
      }
    }
  }
  // DOCTYPE state
  //------------------------------------------------------------------
  _stateDoctype(cp) {
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State.BEFORE_DOCTYPE_NAME;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.BEFORE_DOCTYPE_NAME;
        this._stateBeforeDoctypeName(cp);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        this._createDoctypeToken(null);
        const token = this.currentToken;
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingWhitespaceBeforeDoctypeName);
        this.state = State.BEFORE_DOCTYPE_NAME;
        this._stateBeforeDoctypeName(cp);
      }
    }
  }
  // Before DOCTYPE name state
  //------------------------------------------------------------------
  _stateBeforeDoctypeName(cp) {
    if (isAsciiUpper(cp)) {
      this._createDoctypeToken(String.fromCharCode(toAsciiLower(cp)));
      this.state = State.DOCTYPE_NAME;
    } else
      switch (cp) {
        case CODE_POINTS.SPACE:
        case CODE_POINTS.LINE_FEED:
        case CODE_POINTS.TABULATION:
        case CODE_POINTS.FORM_FEED: {
          break;
        }
        case CODE_POINTS.NULL: {
          this._err(ERR.unexpectedNullCharacter);
          this._createDoctypeToken(REPLACEMENT_CHARACTER);
          this.state = State.DOCTYPE_NAME;
          break;
        }
        case CODE_POINTS.GREATER_THAN_SIGN: {
          this._err(ERR.missingDoctypeName);
          this._createDoctypeToken(null);
          const token = this.currentToken;
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this.state = State.DATA;
          break;
        }
        case CODE_POINTS.EOF: {
          this._err(ERR.eofInDoctype);
          this._createDoctypeToken(null);
          const token = this.currentToken;
          token.forceQuirks = true;
          this.emitCurrentDoctype(token);
          this._emitEOFToken();
          break;
        }
        default: {
          this._createDoctypeToken(String.fromCodePoint(cp));
          this.state = State.DOCTYPE_NAME;
        }
      }
  }
  // DOCTYPE name state
  //------------------------------------------------------------------
  _stateDoctypeName(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State.AFTER_DOCTYPE_NAME;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA;
        this.emitCurrentDoctype(token);
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token.name += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.name += String.fromCodePoint(isAsciiUpper(cp) ? toAsciiLower(cp) : cp);
      }
    }
  }
  // After DOCTYPE name state
  //------------------------------------------------------------------
  _stateAfterDoctypeName(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA;
        this.emitCurrentDoctype(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        if (this._consumeSequenceIfMatch(SEQUENCES.PUBLIC, false)) {
          this.state = State.AFTER_DOCTYPE_PUBLIC_KEYWORD;
        } else if (this._consumeSequenceIfMatch(SEQUENCES.SYSTEM, false)) {
          this.state = State.AFTER_DOCTYPE_SYSTEM_KEYWORD;
        } else if (!this._ensureHibernation()) {
          this._err(ERR.invalidCharacterSequenceAfterDoctypeName);
          token.forceQuirks = true;
          this.state = State.BOGUS_DOCTYPE;
          this._stateBogusDoctype(cp);
        }
      }
    }
  }
  // After DOCTYPE public keyword state
  //------------------------------------------------------------------
  _stateAfterDoctypePublicKeyword(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State.BEFORE_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        this._err(ERR.missingWhitespaceAfterDoctypePublicKeyword);
        token.publicId = "";
        this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        this._err(ERR.missingWhitespaceAfterDoctypePublicKeyword);
        token.publicId = "";
        this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.missingDoctypePublicIdentifier);
        token.forceQuirks = true;
        this.state = State.DATA;
        this.emitCurrentDoctype(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingQuoteBeforeDoctypePublicIdentifier);
        token.forceQuirks = true;
        this.state = State.BOGUS_DOCTYPE;
        this._stateBogusDoctype(cp);
      }
    }
  }
  // Before DOCTYPE public identifier state
  //------------------------------------------------------------------
  _stateBeforeDoctypePublicIdentifier(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        token.publicId = "";
        this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        token.publicId = "";
        this.state = State.DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.missingDoctypePublicIdentifier);
        token.forceQuirks = true;
        this.state = State.DATA;
        this.emitCurrentDoctype(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingQuoteBeforeDoctypePublicIdentifier);
        token.forceQuirks = true;
        this.state = State.BOGUS_DOCTYPE;
        this._stateBogusDoctype(cp);
      }
    }
  }
  // DOCTYPE public identifier (double-quoted) state
  //------------------------------------------------------------------
  _stateDoctypePublicIdentifierDoubleQuoted(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.QUOTATION_MARK: {
        this.state = State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token.publicId += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptDoctypePublicIdentifier);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this.state = State.DATA;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.publicId += String.fromCodePoint(cp);
      }
    }
  }
  // DOCTYPE public identifier (single-quoted) state
  //------------------------------------------------------------------
  _stateDoctypePublicIdentifierSingleQuoted(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.APOSTROPHE: {
        this.state = State.AFTER_DOCTYPE_PUBLIC_IDENTIFIER;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token.publicId += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptDoctypePublicIdentifier);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this.state = State.DATA;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.publicId += String.fromCodePoint(cp);
      }
    }
  }
  // After DOCTYPE public identifier state
  //------------------------------------------------------------------
  _stateAfterDoctypePublicIdentifier(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State.BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA;
        this.emitCurrentDoctype(token);
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        this._err(ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
        token.systemId = "";
        this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        this._err(ERR.missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers);
        token.systemId = "";
        this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
        token.forceQuirks = true;
        this.state = State.BOGUS_DOCTYPE;
        this._stateBogusDoctype(cp);
      }
    }
  }
  // Between DOCTYPE public and system identifiers state
  //------------------------------------------------------------------
  _stateBetweenDoctypePublicAndSystemIdentifiers(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(token);
        this.state = State.DATA;
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        token.systemId = "";
        this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        token.systemId = "";
        this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
        token.forceQuirks = true;
        this.state = State.BOGUS_DOCTYPE;
        this._stateBogusDoctype(cp);
      }
    }
  }
  // After DOCTYPE system keyword state
  //------------------------------------------------------------------
  _stateAfterDoctypeSystemKeyword(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        this.state = State.BEFORE_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        this._err(ERR.missingWhitespaceAfterDoctypeSystemKeyword);
        token.systemId = "";
        this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        this._err(ERR.missingWhitespaceAfterDoctypeSystemKeyword);
        token.systemId = "";
        this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.missingDoctypeSystemIdentifier);
        token.forceQuirks = true;
        this.state = State.DATA;
        this.emitCurrentDoctype(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
        token.forceQuirks = true;
        this.state = State.BOGUS_DOCTYPE;
        this._stateBogusDoctype(cp);
      }
    }
  }
  // Before DOCTYPE system identifier state
  //------------------------------------------------------------------
  _stateBeforeDoctypeSystemIdentifier(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.QUOTATION_MARK: {
        token.systemId = "";
        this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED;
        break;
      }
      case CODE_POINTS.APOSTROPHE: {
        token.systemId = "";
        this.state = State.DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.missingDoctypeSystemIdentifier);
        token.forceQuirks = true;
        this.state = State.DATA;
        this.emitCurrentDoctype(token);
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.missingQuoteBeforeDoctypeSystemIdentifier);
        token.forceQuirks = true;
        this.state = State.BOGUS_DOCTYPE;
        this._stateBogusDoctype(cp);
      }
    }
  }
  // DOCTYPE system identifier (double-quoted) state
  //------------------------------------------------------------------
  _stateDoctypeSystemIdentifierDoubleQuoted(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.QUOTATION_MARK: {
        this.state = State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token.systemId += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptDoctypeSystemIdentifier);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this.state = State.DATA;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.systemId += String.fromCodePoint(cp);
      }
    }
  }
  // DOCTYPE system identifier (single-quoted) state
  //------------------------------------------------------------------
  _stateDoctypeSystemIdentifierSingleQuoted(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.APOSTROPHE: {
        this.state = State.AFTER_DOCTYPE_SYSTEM_IDENTIFIER;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        token.systemId += REPLACEMENT_CHARACTER;
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this._err(ERR.abruptDoctypeSystemIdentifier);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this.state = State.DATA;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        token.systemId += String.fromCodePoint(cp);
      }
    }
  }
  // After DOCTYPE system identifier state
  //------------------------------------------------------------------
  _stateAfterDoctypeSystemIdentifier(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.SPACE:
      case CODE_POINTS.LINE_FEED:
      case CODE_POINTS.TABULATION:
      case CODE_POINTS.FORM_FEED: {
        break;
      }
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(token);
        this.state = State.DATA;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInDoctype);
        token.forceQuirks = true;
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default: {
        this._err(ERR.unexpectedCharacterAfterDoctypeSystemIdentifier);
        this.state = State.BOGUS_DOCTYPE;
        this._stateBogusDoctype(cp);
      }
    }
  }
  // Bogus DOCTYPE state
  //------------------------------------------------------------------
  _stateBogusDoctype(cp) {
    const token = this.currentToken;
    switch (cp) {
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.emitCurrentDoctype(token);
        this.state = State.DATA;
        break;
      }
      case CODE_POINTS.NULL: {
        this._err(ERR.unexpectedNullCharacter);
        break;
      }
      case CODE_POINTS.EOF: {
        this.emitCurrentDoctype(token);
        this._emitEOFToken();
        break;
      }
      default:
    }
  }
  // CDATA section state
  //------------------------------------------------------------------
  _stateCdataSection(cp) {
    switch (cp) {
      case CODE_POINTS.RIGHT_SQUARE_BRACKET: {
        this.state = State.CDATA_SECTION_BRACKET;
        break;
      }
      case CODE_POINTS.EOF: {
        this._err(ERR.eofInCdata);
        this._emitEOFToken();
        break;
      }
      default: {
        this._emitCodePoint(cp);
      }
    }
  }
  // CDATA section bracket state
  //------------------------------------------------------------------
  _stateCdataSectionBracket(cp) {
    if (cp === CODE_POINTS.RIGHT_SQUARE_BRACKET) {
      this.state = State.CDATA_SECTION_END;
    } else {
      this._emitChars("]");
      this.state = State.CDATA_SECTION;
      this._stateCdataSection(cp);
    }
  }
  // CDATA section end state
  //------------------------------------------------------------------
  _stateCdataSectionEnd(cp) {
    switch (cp) {
      case CODE_POINTS.GREATER_THAN_SIGN: {
        this.state = State.DATA;
        break;
      }
      case CODE_POINTS.RIGHT_SQUARE_BRACKET: {
        this._emitChars("]");
        break;
      }
      default: {
        this._emitChars("]]");
        this.state = State.CDATA_SECTION;
        this._stateCdataSection(cp);
      }
    }
  }
  // Character reference state
  //------------------------------------------------------------------
  _stateCharacterReference() {
    let length = this.entityDecoder.write(this.preprocessor.html, this.preprocessor.pos);
    if (length < 0) {
      if (this.preprocessor.lastChunkWritten) {
        length = this.entityDecoder.end();
      } else {
        this.active = false;
        this.preprocessor.pos = this.preprocessor.html.length - 1;
        this.consumedAfterSnapshot = 0;
        this.preprocessor.endOfChunkHit = true;
        return;
      }
    }
    if (length === 0) {
      this.preprocessor.pos = this.entityStartPos;
      this._flushCodePointConsumedAsCharacterReference(CODE_POINTS.AMPERSAND);
      this.state = !this._isCharacterReferenceInAttribute() && isAsciiAlphaNumeric2(this.preprocessor.peek(1)) ? State.AMBIGUOUS_AMPERSAND : this.returnState;
    } else {
      this.state = this.returnState;
    }
  }
  // Ambiguos ampersand state
  //------------------------------------------------------------------
  _stateAmbiguousAmpersand(cp) {
    if (isAsciiAlphaNumeric2(cp)) {
      this._flushCodePointConsumedAsCharacterReference(cp);
    } else {
      if (cp === CODE_POINTS.SEMICOLON) {
        this._err(ERR.unknownNamedCharacterReference);
      }
      this.state = this.returnState;
      this._callState(cp);
    }
  }
};

// node_modules/@lit-labs/ssr/node_modules/parse5/dist/parser/open-element-stack.js
var IMPLICIT_END_TAG_REQUIRED = /* @__PURE__ */ new Set([TAG_ID.DD, TAG_ID.DT, TAG_ID.LI, TAG_ID.OPTGROUP, TAG_ID.OPTION, TAG_ID.P, TAG_ID.RB, TAG_ID.RP, TAG_ID.RT, TAG_ID.RTC]);
var IMPLICIT_END_TAG_REQUIRED_THOROUGHLY = /* @__PURE__ */ new Set([
  ...IMPLICIT_END_TAG_REQUIRED,
  TAG_ID.CAPTION,
  TAG_ID.COLGROUP,
  TAG_ID.TBODY,
  TAG_ID.TD,
  TAG_ID.TFOOT,
  TAG_ID.TH,
  TAG_ID.THEAD,
  TAG_ID.TR
]);
var SCOPING_ELEMENTS_HTML = /* @__PURE__ */ new Set([
  TAG_ID.APPLET,
  TAG_ID.CAPTION,
  TAG_ID.HTML,
  TAG_ID.MARQUEE,
  TAG_ID.OBJECT,
  TAG_ID.TABLE,
  TAG_ID.TD,
  TAG_ID.TEMPLATE,
  TAG_ID.TH
]);
var SCOPING_ELEMENTS_HTML_LIST = /* @__PURE__ */ new Set([...SCOPING_ELEMENTS_HTML, TAG_ID.OL, TAG_ID.UL]);
var SCOPING_ELEMENTS_HTML_BUTTON = /* @__PURE__ */ new Set([...SCOPING_ELEMENTS_HTML, TAG_ID.BUTTON]);
var SCOPING_ELEMENTS_MATHML = /* @__PURE__ */ new Set([TAG_ID.ANNOTATION_XML, TAG_ID.MI, TAG_ID.MN, TAG_ID.MO, TAG_ID.MS, TAG_ID.MTEXT]);
var SCOPING_ELEMENTS_SVG = /* @__PURE__ */ new Set([TAG_ID.DESC, TAG_ID.FOREIGN_OBJECT, TAG_ID.TITLE]);
var TABLE_ROW_CONTEXT = /* @__PURE__ */ new Set([TAG_ID.TR, TAG_ID.TEMPLATE, TAG_ID.HTML]);
var TABLE_BODY_CONTEXT = /* @__PURE__ */ new Set([TAG_ID.TBODY, TAG_ID.TFOOT, TAG_ID.THEAD, TAG_ID.TEMPLATE, TAG_ID.HTML]);
var TABLE_CONTEXT = /* @__PURE__ */ new Set([TAG_ID.TABLE, TAG_ID.TEMPLATE, TAG_ID.HTML]);
var TABLE_CELLS = /* @__PURE__ */ new Set([TAG_ID.TD, TAG_ID.TH]);
var OpenElementStack = class {
  get currentTmplContentOrNode() {
    return this._isInTemplate() ? this.treeAdapter.getTemplateContent(this.current) : this.current;
  }
  constructor(document3, treeAdapter, handler) {
    this.treeAdapter = treeAdapter;
    this.handler = handler;
    this.items = [];
    this.tagIDs = [];
    this.stackTop = -1;
    this.tmplCount = 0;
    this.currentTagId = TAG_ID.UNKNOWN;
    this.current = document3;
  }
  //Index of element
  _indexOf(element) {
    return this.items.lastIndexOf(element, this.stackTop);
  }
  //Update current element
  _isInTemplate() {
    return this.currentTagId === TAG_ID.TEMPLATE && this.treeAdapter.getNamespaceURI(this.current) === NS.HTML;
  }
  _updateCurrentElement() {
    this.current = this.items[this.stackTop];
    this.currentTagId = this.tagIDs[this.stackTop];
  }
  //Mutations
  push(element, tagID) {
    this.stackTop++;
    this.items[this.stackTop] = element;
    this.current = element;
    this.tagIDs[this.stackTop] = tagID;
    this.currentTagId = tagID;
    if (this._isInTemplate()) {
      this.tmplCount++;
    }
    this.handler.onItemPush(element, tagID, true);
  }
  pop() {
    const popped = this.current;
    if (this.tmplCount > 0 && this._isInTemplate()) {
      this.tmplCount--;
    }
    this.stackTop--;
    this._updateCurrentElement();
    this.handler.onItemPop(popped, true);
  }
  replace(oldElement, newElement) {
    const idx = this._indexOf(oldElement);
    this.items[idx] = newElement;
    if (idx === this.stackTop) {
      this.current = newElement;
    }
  }
  insertAfter(referenceElement, newElement, newElementID) {
    const insertionIdx = this._indexOf(referenceElement) + 1;
    this.items.splice(insertionIdx, 0, newElement);
    this.tagIDs.splice(insertionIdx, 0, newElementID);
    this.stackTop++;
    if (insertionIdx === this.stackTop) {
      this._updateCurrentElement();
    }
    if (this.current && this.currentTagId !== void 0) {
      this.handler.onItemPush(this.current, this.currentTagId, insertionIdx === this.stackTop);
    }
  }
  popUntilTagNamePopped(tagName) {
    let targetIdx = this.stackTop + 1;
    do {
      targetIdx = this.tagIDs.lastIndexOf(tagName, targetIdx - 1);
    } while (targetIdx > 0 && this.treeAdapter.getNamespaceURI(this.items[targetIdx]) !== NS.HTML);
    this.shortenToLength(Math.max(targetIdx, 0));
  }
  shortenToLength(idx) {
    while (this.stackTop >= idx) {
      const popped = this.current;
      if (this.tmplCount > 0 && this._isInTemplate()) {
        this.tmplCount -= 1;
      }
      this.stackTop--;
      this._updateCurrentElement();
      this.handler.onItemPop(popped, this.stackTop < idx);
    }
  }
  popUntilElementPopped(element) {
    const idx = this._indexOf(element);
    this.shortenToLength(Math.max(idx, 0));
  }
  popUntilPopped(tagNames, targetNS) {
    const idx = this._indexOfTagNames(tagNames, targetNS);
    this.shortenToLength(Math.max(idx, 0));
  }
  popUntilNumberedHeaderPopped() {
    this.popUntilPopped(NUMBERED_HEADERS, NS.HTML);
  }
  popUntilTableCellPopped() {
    this.popUntilPopped(TABLE_CELLS, NS.HTML);
  }
  popAllUpToHtmlElement() {
    this.tmplCount = 0;
    this.shortenToLength(1);
  }
  _indexOfTagNames(tagNames, namespace) {
    for (let i8 = this.stackTop; i8 >= 0; i8--) {
      if (tagNames.has(this.tagIDs[i8]) && this.treeAdapter.getNamespaceURI(this.items[i8]) === namespace) {
        return i8;
      }
    }
    return -1;
  }
  clearBackTo(tagNames, targetNS) {
    const idx = this._indexOfTagNames(tagNames, targetNS);
    this.shortenToLength(idx + 1);
  }
  clearBackToTableContext() {
    this.clearBackTo(TABLE_CONTEXT, NS.HTML);
  }
  clearBackToTableBodyContext() {
    this.clearBackTo(TABLE_BODY_CONTEXT, NS.HTML);
  }
  clearBackToTableRowContext() {
    this.clearBackTo(TABLE_ROW_CONTEXT, NS.HTML);
  }
  remove(element) {
    const idx = this._indexOf(element);
    if (idx >= 0) {
      if (idx === this.stackTop) {
        this.pop();
      } else {
        this.items.splice(idx, 1);
        this.tagIDs.splice(idx, 1);
        this.stackTop--;
        this._updateCurrentElement();
        this.handler.onItemPop(element, false);
      }
    }
  }
  //Search
  tryPeekProperlyNestedBodyElement() {
    return this.stackTop >= 1 && this.tagIDs[1] === TAG_ID.BODY ? this.items[1] : null;
  }
  contains(element) {
    return this._indexOf(element) > -1;
  }
  getCommonAncestor(element) {
    const elementIdx = this._indexOf(element) - 1;
    return elementIdx >= 0 ? this.items[elementIdx] : null;
  }
  isRootHtmlElementCurrent() {
    return this.stackTop === 0 && this.tagIDs[0] === TAG_ID.HTML;
  }
  //Element in scope
  hasInDynamicScope(tagName, htmlScope) {
    for (let i8 = this.stackTop; i8 >= 0; i8--) {
      const tn = this.tagIDs[i8];
      switch (this.treeAdapter.getNamespaceURI(this.items[i8])) {
        case NS.HTML: {
          if (tn === tagName)
            return true;
          if (htmlScope.has(tn))
            return false;
          break;
        }
        case NS.SVG: {
          if (SCOPING_ELEMENTS_SVG.has(tn))
            return false;
          break;
        }
        case NS.MATHML: {
          if (SCOPING_ELEMENTS_MATHML.has(tn))
            return false;
          break;
        }
      }
    }
    return true;
  }
  hasInScope(tagName) {
    return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML);
  }
  hasInListItemScope(tagName) {
    return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML_LIST);
  }
  hasInButtonScope(tagName) {
    return this.hasInDynamicScope(tagName, SCOPING_ELEMENTS_HTML_BUTTON);
  }
  hasNumberedHeaderInScope() {
    for (let i8 = this.stackTop; i8 >= 0; i8--) {
      const tn = this.tagIDs[i8];
      switch (this.treeAdapter.getNamespaceURI(this.items[i8])) {
        case NS.HTML: {
          if (NUMBERED_HEADERS.has(tn))
            return true;
          if (SCOPING_ELEMENTS_HTML.has(tn))
            return false;
          break;
        }
        case NS.SVG: {
          if (SCOPING_ELEMENTS_SVG.has(tn))
            return false;
          break;
        }
        case NS.MATHML: {
          if (SCOPING_ELEMENTS_MATHML.has(tn))
            return false;
          break;
        }
      }
    }
    return true;
  }
  hasInTableScope(tagName) {
    for (let i8 = this.stackTop; i8 >= 0; i8--) {
      if (this.treeAdapter.getNamespaceURI(this.items[i8]) !== NS.HTML) {
        continue;
      }
      switch (this.tagIDs[i8]) {
        case tagName: {
          return true;
        }
        case TAG_ID.TABLE:
        case TAG_ID.HTML: {
          return false;
        }
      }
    }
    return true;
  }
  hasTableBodyContextInTableScope() {
    for (let i8 = this.stackTop; i8 >= 0; i8--) {
      if (this.treeAdapter.getNamespaceURI(this.items[i8]) !== NS.HTML) {
        continue;
      }
      switch (this.tagIDs[i8]) {
        case TAG_ID.TBODY:
        case TAG_ID.THEAD:
        case TAG_ID.TFOOT: {
          return true;
        }
        case TAG_ID.TABLE:
        case TAG_ID.HTML: {
          return false;
        }
      }
    }
    return true;
  }
  hasInSelectScope(tagName) {
    for (let i8 = this.stackTop; i8 >= 0; i8--) {
      if (this.treeAdapter.getNamespaceURI(this.items[i8]) !== NS.HTML) {
        continue;
      }
      switch (this.tagIDs[i8]) {
        case tagName: {
          return true;
        }
        case TAG_ID.OPTION:
        case TAG_ID.OPTGROUP: {
          break;
        }
        default: {
          return false;
        }
      }
    }
    return true;
  }
  //Implied end tags
  generateImpliedEndTags() {
    while (this.currentTagId !== void 0 && IMPLICIT_END_TAG_REQUIRED.has(this.currentTagId)) {
      this.pop();
    }
  }
  generateImpliedEndTagsThoroughly() {
    while (this.currentTagId !== void 0 && IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId)) {
      this.pop();
    }
  }
  generateImpliedEndTagsWithExclusion(exclusionId) {
    while (this.currentTagId !== void 0 && this.currentTagId !== exclusionId && IMPLICIT_END_TAG_REQUIRED_THOROUGHLY.has(this.currentTagId)) {
      this.pop();
    }
  }
};

// node_modules/@lit-labs/ssr/node_modules/parse5/dist/parser/formatting-element-list.js
var NOAH_ARK_CAPACITY = 3;
var EntryType;
(function(EntryType3) {
  EntryType3[EntryType3["Marker"] = 0] = "Marker";
  EntryType3[EntryType3["Element"] = 1] = "Element";
})(EntryType || (EntryType = {}));
var MARKER = { type: EntryType.Marker };
var FormattingElementList = class {
  constructor(treeAdapter) {
    this.treeAdapter = treeAdapter;
    this.entries = [];
    this.bookmark = null;
  }
  //Noah Ark's condition
  //OPTIMIZATION: at first we try to find possible candidates for exclusion using
  //lightweight heuristics without thorough attributes check.
  _getNoahArkConditionCandidates(newElement, neAttrs) {
    const candidates = [];
    const neAttrsLength = neAttrs.length;
    const neTagName = this.treeAdapter.getTagName(newElement);
    const neNamespaceURI = this.treeAdapter.getNamespaceURI(newElement);
    for (let i8 = 0; i8 < this.entries.length; i8++) {
      const entry = this.entries[i8];
      if (entry.type === EntryType.Marker) {
        break;
      }
      const { element } = entry;
      if (this.treeAdapter.getTagName(element) === neTagName && this.treeAdapter.getNamespaceURI(element) === neNamespaceURI) {
        const elementAttrs = this.treeAdapter.getAttrList(element);
        if (elementAttrs.length === neAttrsLength) {
          candidates.push({ idx: i8, attrs: elementAttrs });
        }
      }
    }
    return candidates;
  }
  _ensureNoahArkCondition(newElement) {
    if (this.entries.length < NOAH_ARK_CAPACITY)
      return;
    const neAttrs = this.treeAdapter.getAttrList(newElement);
    const candidates = this._getNoahArkConditionCandidates(newElement, neAttrs);
    if (candidates.length < NOAH_ARK_CAPACITY)
      return;
    const neAttrsMap = new Map(neAttrs.map((neAttr) => [neAttr.name, neAttr.value]));
    let validCandidates = 0;
    for (let i8 = 0; i8 < candidates.length; i8++) {
      const candidate = candidates[i8];
      if (candidate.attrs.every((cAttr) => neAttrsMap.get(cAttr.name) === cAttr.value)) {
        validCandidates += 1;
        if (validCandidates >= NOAH_ARK_CAPACITY) {
          this.entries.splice(candidate.idx, 1);
        }
      }
    }
  }
  //Mutations
  insertMarker() {
    this.entries.unshift(MARKER);
  }
  pushElement(element, token) {
    this._ensureNoahArkCondition(element);
    this.entries.unshift({
      type: EntryType.Element,
      element,
      token
    });
  }
  insertElementAfterBookmark(element, token) {
    const bookmarkIdx = this.entries.indexOf(this.bookmark);
    this.entries.splice(bookmarkIdx, 0, {
      type: EntryType.Element,
      element,
      token
    });
  }
  removeEntry(entry) {
    const entryIndex = this.entries.indexOf(entry);
    if (entryIndex !== -1) {
      this.entries.splice(entryIndex, 1);
    }
  }
  /**
   * Clears the list of formatting elements up to the last marker.
   *
   * @see https://html.spec.whatwg.org/multipage/parsing.html#clear-the-list-of-active-formatting-elements-up-to-the-last-marker
   */
  clearToLastMarker() {
    const markerIdx = this.entries.indexOf(MARKER);
    if (markerIdx === -1) {
      this.entries.length = 0;
    } else {
      this.entries.splice(0, markerIdx + 1);
    }
  }
  //Search
  getElementEntryInScopeWithTagName(tagName) {
    const entry = this.entries.find((entry2) => entry2.type === EntryType.Marker || this.treeAdapter.getTagName(entry2.element) === tagName);
    return entry && entry.type === EntryType.Element ? entry : null;
  }
  getElementEntry(element) {
    return this.entries.find((entry) => entry.type === EntryType.Element && entry.element === element);
  }
};

// node_modules/@lit-labs/ssr/node_modules/parse5/dist/tree-adapters/default.js
var defaultTreeAdapter = {
  //Node construction
  createDocument() {
    return {
      nodeName: "#document",
      mode: DOCUMENT_MODE.NO_QUIRKS,
      childNodes: []
    };
  },
  createDocumentFragment() {
    return {
      nodeName: "#document-fragment",
      childNodes: []
    };
  },
  createElement(tagName, namespaceURI, attrs) {
    return {
      nodeName: tagName,
      tagName,
      attrs,
      namespaceURI,
      childNodes: [],
      parentNode: null
    };
  },
  createCommentNode(data) {
    return {
      nodeName: "#comment",
      data,
      parentNode: null
    };
  },
  createTextNode(value) {
    return {
      nodeName: "#text",
      value,
      parentNode: null
    };
  },
  //Tree mutation
  appendChild(parentNode, newNode) {
    parentNode.childNodes.push(newNode);
    newNode.parentNode = parentNode;
  },
  insertBefore(parentNode, newNode, referenceNode) {
    const insertionIdx = parentNode.childNodes.indexOf(referenceNode);
    parentNode.childNodes.splice(insertionIdx, 0, newNode);
    newNode.parentNode = parentNode;
  },
  setTemplateContent(templateElement, contentElement) {
    templateElement.content = contentElement;
  },
  getTemplateContent(templateElement) {
    return templateElement.content;
  },
  setDocumentType(document3, name, publicId, systemId) {
    const doctypeNode = document3.childNodes.find((node) => node.nodeName === "#documentType");
    if (doctypeNode) {
      doctypeNode.name = name;
      doctypeNode.publicId = publicId;
      doctypeNode.systemId = systemId;
    } else {
      const node = {
        nodeName: "#documentType",
        name,
        publicId,
        systemId,
        parentNode: null
      };
      defaultTreeAdapter.appendChild(document3, node);
    }
  },
  setDocumentMode(document3, mode) {
    document3.mode = mode;
  },
  getDocumentMode(document3) {
    return document3.mode;
  },
  detachNode(node) {
    if (node.parentNode) {
      const idx = node.parentNode.childNodes.indexOf(node);
      node.parentNode.childNodes.splice(idx, 1);
      node.parentNode = null;
    }
  },
  insertText(parentNode, text) {
    if (parentNode.childNodes.length > 0) {
      const prevNode = parentNode.childNodes[parentNode.childNodes.length - 1];
      if (defaultTreeAdapter.isTextNode(prevNode)) {
        prevNode.value += text;
        return;
      }
    }
    defaultTreeAdapter.appendChild(parentNode, defaultTreeAdapter.createTextNode(text));
  },
  insertTextBefore(parentNode, text, referenceNode) {
    const prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];
    if (prevNode && defaultTreeAdapter.isTextNode(prevNode)) {
      prevNode.value += text;
    } else {
      defaultTreeAdapter.insertBefore(parentNode, defaultTreeAdapter.createTextNode(text), referenceNode);
    }
  },
  adoptAttributes(recipient, attrs) {
    const recipientAttrsMap = new Set(recipient.attrs.map((attr) => attr.name));
    for (let j2 = 0; j2 < attrs.length; j2++) {
      if (!recipientAttrsMap.has(attrs[j2].name)) {
        recipient.attrs.push(attrs[j2]);
      }
    }
  },
  //Tree traversing
  getFirstChild(node) {
    return node.childNodes[0];
  },
  getChildNodes(node) {
    return node.childNodes;
  },
  getParentNode(node) {
    return node.parentNode;
  },
  getAttrList(element) {
    return element.attrs;
  },
  //Node data
  getTagName(element) {
    return element.tagName;
  },
  getNamespaceURI(element) {
    return element.namespaceURI;
  },
  getTextNodeContent(textNode) {
    return textNode.value;
  },
  getCommentNodeContent(commentNode) {
    return commentNode.data;
  },
  getDocumentTypeNodeName(doctypeNode) {
    return doctypeNode.name;
  },
  getDocumentTypeNodePublicId(doctypeNode) {
    return doctypeNode.publicId;
  },
  getDocumentTypeNodeSystemId(doctypeNode) {
    return doctypeNode.systemId;
  },
  //Node types
  isTextNode(node) {
    return node.nodeName === "#text";
  },
  isCommentNode(node) {
    return node.nodeName === "#comment";
  },
  isDocumentTypeNode(node) {
    return node.nodeName === "#documentType";
  },
  isElementNode(node) {
    return Object.prototype.hasOwnProperty.call(node, "tagName");
  },
  // Source code location
  setNodeSourceCodeLocation(node, location) {
    node.sourceCodeLocation = location;
  },
  getNodeSourceCodeLocation(node) {
    return node.sourceCodeLocation;
  },
  updateNodeSourceCodeLocation(node, endLocation) {
    node.sourceCodeLocation = { ...node.sourceCodeLocation, ...endLocation };
  }
};

// node_modules/@lit-labs/ssr/node_modules/parse5/dist/common/doctype.js
var VALID_DOCTYPE_NAME = "html";
var VALID_SYSTEM_ID = "about:legacy-compat";
var QUIRKS_MODE_SYSTEM_ID = "http://www.ibm.com/data/dtd/v11/ibmxhtml1-transitional.dtd";
var QUIRKS_MODE_PUBLIC_ID_PREFIXES = [
  "+//silmaril//dtd html pro v0r11 19970101//",
  "-//as//dtd html 3.0 aswedit + extensions//",
  "-//advasoft ltd//dtd html 3.0 aswedit + extensions//",
  "-//ietf//dtd html 2.0 level 1//",
  "-//ietf//dtd html 2.0 level 2//",
  "-//ietf//dtd html 2.0 strict level 1//",
  "-//ietf//dtd html 2.0 strict level 2//",
  "-//ietf//dtd html 2.0 strict//",
  "-//ietf//dtd html 2.0//",
  "-//ietf//dtd html 2.1e//",
  "-//ietf//dtd html 3.0//",
  "-//ietf//dtd html 3.2 final//",
  "-//ietf//dtd html 3.2//",
  "-//ietf//dtd html 3//",
  "-//ietf//dtd html level 0//",
  "-//ietf//dtd html level 1//",
  "-//ietf//dtd html level 2//",
  "-//ietf//dtd html level 3//",
  "-//ietf//dtd html strict level 0//",
  "-//ietf//dtd html strict level 1//",
  "-//ietf//dtd html strict level 2//",
  "-//ietf//dtd html strict level 3//",
  "-//ietf//dtd html strict//",
  "-//ietf//dtd html//",
  "-//metrius//dtd metrius presentational//",
  "-//microsoft//dtd internet explorer 2.0 html strict//",
  "-//microsoft//dtd internet explorer 2.0 html//",
  "-//microsoft//dtd internet explorer 2.0 tables//",
  "-//microsoft//dtd internet explorer 3.0 html strict//",
  "-//microsoft//dtd internet explorer 3.0 html//",
  "-//microsoft//dtd internet explorer 3.0 tables//",
  "-//netscape comm. corp.//dtd html//",
  "-//netscape comm. corp.//dtd strict html//",
  "-//o'reilly and associates//dtd html 2.0//",
  "-//o'reilly and associates//dtd html extended 1.0//",
  "-//o'reilly and associates//dtd html extended relaxed 1.0//",
  "-//sq//dtd html 2.0 hotmetal + extensions//",
  "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//",
  "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//",
  "-//spyglass//dtd html 2.0 extended//",
  "-//sun microsystems corp.//dtd hotjava html//",
  "-//sun microsystems corp.//dtd hotjava strict html//",
  "-//w3c//dtd html 3 1995-03-24//",
  "-//w3c//dtd html 3.2 draft//",
  "-//w3c//dtd html 3.2 final//",
  "-//w3c//dtd html 3.2//",
  "-//w3c//dtd html 3.2s draft//",
  "-//w3c//dtd html 4.0 frameset//",
  "-//w3c//dtd html 4.0 transitional//",
  "-//w3c//dtd html experimental 19960712//",
  "-//w3c//dtd html experimental 970421//",
  "-//w3c//dtd w3 html//",
  "-//w3o//dtd w3 html 3.0//",
  "-//webtechs//dtd mozilla html 2.0//",
  "-//webtechs//dtd mozilla html//"
];
var QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
  ...QUIRKS_MODE_PUBLIC_ID_PREFIXES,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
];
var QUIRKS_MODE_PUBLIC_IDS = /* @__PURE__ */ new Set([
  "-//w3o//dtd w3 html strict 3.0//en//",
  "-/w3c/dtd html 4.0 transitional/en",
  "html"
]);
var LIMITED_QUIRKS_PUBLIC_ID_PREFIXES = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"];
var LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES = [
  ...LIMITED_QUIRKS_PUBLIC_ID_PREFIXES,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
];
function hasPrefix(publicId, prefixes) {
  return prefixes.some((prefix) => publicId.startsWith(prefix));
}
function isConforming(token) {
  return token.name === VALID_DOCTYPE_NAME && token.publicId === null && (token.systemId === null || token.systemId === VALID_SYSTEM_ID);
}
function getDocumentMode(token) {
  if (token.name !== VALID_DOCTYPE_NAME) {
    return DOCUMENT_MODE.QUIRKS;
  }
  const { systemId } = token;
  if (systemId && systemId.toLowerCase() === QUIRKS_MODE_SYSTEM_ID) {
    return DOCUMENT_MODE.QUIRKS;
  }
  let { publicId } = token;
  if (publicId !== null) {
    publicId = publicId.toLowerCase();
    if (QUIRKS_MODE_PUBLIC_IDS.has(publicId)) {
      return DOCUMENT_MODE.QUIRKS;
    }
    let prefixes = systemId === null ? QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES : QUIRKS_MODE_PUBLIC_ID_PREFIXES;
    if (hasPrefix(publicId, prefixes)) {
      return DOCUMENT_MODE.QUIRKS;
    }
    prefixes = systemId === null ? LIMITED_QUIRKS_PUBLIC_ID_PREFIXES : LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES;
    if (hasPrefix(publicId, prefixes)) {
      return DOCUMENT_MODE.LIMITED_QUIRKS;
    }
  }
  return DOCUMENT_MODE.NO_QUIRKS;
}

// node_modules/@lit-labs/ssr/node_modules/parse5/dist/common/foreign-content.js
var MIME_TYPES = {
  TEXT_HTML: "text/html",
  APPLICATION_XML: "application/xhtml+xml"
};
var DEFINITION_URL_ATTR = "definitionurl";
var ADJUSTED_DEFINITION_URL_ATTR = "definitionURL";
var SVG_ATTRS_ADJUSTMENT_MAP = new Map([
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "diffuseConstant",
  "edgeMode",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan"
].map((attr) => [attr.toLowerCase(), attr]));
var XML_ATTRS_ADJUSTMENT_MAP = /* @__PURE__ */ new Map([
  ["xlink:actuate", { prefix: "xlink", name: "actuate", namespace: NS.XLINK }],
  ["xlink:arcrole", { prefix: "xlink", name: "arcrole", namespace: NS.XLINK }],
  ["xlink:href", { prefix: "xlink", name: "href", namespace: NS.XLINK }],
  ["xlink:role", { prefix: "xlink", name: "role", namespace: NS.XLINK }],
  ["xlink:show", { prefix: "xlink", name: "show", namespace: NS.XLINK }],
  ["xlink:title", { prefix: "xlink", name: "title", namespace: NS.XLINK }],
  ["xlink:type", { prefix: "xlink", name: "type", namespace: NS.XLINK }],
  ["xml:lang", { prefix: "xml", name: "lang", namespace: NS.XML }],
  ["xml:space", { prefix: "xml", name: "space", namespace: NS.XML }],
  ["xmlns", { prefix: "", name: "xmlns", namespace: NS.XMLNS }],
  ["xmlns:xlink", { prefix: "xmlns", name: "xlink", namespace: NS.XMLNS }]
]);
var SVG_TAG_NAMES_ADJUSTMENT_MAP = new Map([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "textPath"
].map((tn) => [tn.toLowerCase(), tn]));
var EXITS_FOREIGN_CONTENT = /* @__PURE__ */ new Set([
  TAG_ID.B,
  TAG_ID.BIG,
  TAG_ID.BLOCKQUOTE,
  TAG_ID.BODY,
  TAG_ID.BR,
  TAG_ID.CENTER,
  TAG_ID.CODE,
  TAG_ID.DD,
  TAG_ID.DIV,
  TAG_ID.DL,
  TAG_ID.DT,
  TAG_ID.EM,
  TAG_ID.EMBED,
  TAG_ID.H1,
  TAG_ID.H2,
  TAG_ID.H3,
  TAG_ID.H4,
  TAG_ID.H5,
  TAG_ID.H6,
  TAG_ID.HEAD,
  TAG_ID.HR,
  TAG_ID.I,
  TAG_ID.IMG,
  TAG_ID.LI,
  TAG_ID.LISTING,
  TAG_ID.MENU,
  TAG_ID.META,
  TAG_ID.NOBR,
  TAG_ID.OL,
  TAG_ID.P,
  TAG_ID.PRE,
  TAG_ID.RUBY,
  TAG_ID.S,
  TAG_ID.SMALL,
  TAG_ID.SPAN,
  TAG_ID.STRONG,
  TAG_ID.STRIKE,
  TAG_ID.SUB,
  TAG_ID.SUP,
  TAG_ID.TABLE,
  TAG_ID.TT,
  TAG_ID.U,
  TAG_ID.UL,
  TAG_ID.VAR
]);
function causesExit(startTagToken) {
  const tn = startTagToken.tagID;
  const isFontWithAttrs = tn === TAG_ID.FONT && startTagToken.attrs.some(({ name }) => name === ATTRS.COLOR || name === ATTRS.SIZE || name === ATTRS.FACE);
  return isFontWithAttrs || EXITS_FOREIGN_CONTENT.has(tn);
}
function adjustTokenMathMLAttrs(token) {
  for (let i8 = 0; i8 < token.attrs.length; i8++) {
    if (token.attrs[i8].name === DEFINITION_URL_ATTR) {
      token.attrs[i8].name = ADJUSTED_DEFINITION_URL_ATTR;
      break;
    }
  }
}
function adjustTokenSVGAttrs(token) {
  for (let i8 = 0; i8 < token.attrs.length; i8++) {
    const adjustedAttrName = SVG_ATTRS_ADJUSTMENT_MAP.get(token.attrs[i8].name);
    if (adjustedAttrName != null) {
      token.attrs[i8].name = adjustedAttrName;
    }
  }
}
function adjustTokenXMLAttrs(token) {
  for (let i8 = 0; i8 < token.attrs.length; i8++) {
    const adjustedAttrEntry = XML_ATTRS_ADJUSTMENT_MAP.get(token.attrs[i8].name);
    if (adjustedAttrEntry) {
      token.attrs[i8].prefix = adjustedAttrEntry.prefix;
      token.attrs[i8].name = adjustedAttrEntry.name;
      token.attrs[i8].namespace = adjustedAttrEntry.namespace;
    }
  }
}
function adjustTokenSVGTagName(token) {
  const adjustedTagName = SVG_TAG_NAMES_ADJUSTMENT_MAP.get(token.tagName);
  if (adjustedTagName != null) {
    token.tagName = adjustedTagName;
    token.tagID = getTagID(token.tagName);
  }
}
function isMathMLTextIntegrationPoint(tn, ns) {
  return ns === NS.MATHML && (tn === TAG_ID.MI || tn === TAG_ID.MO || tn === TAG_ID.MN || tn === TAG_ID.MS || tn === TAG_ID.MTEXT);
}
function isHtmlIntegrationPoint(tn, ns, attrs) {
  if (ns === NS.MATHML && tn === TAG_ID.ANNOTATION_XML) {
    for (let i8 = 0; i8 < attrs.length; i8++) {
      if (attrs[i8].name === ATTRS.ENCODING) {
        const value = attrs[i8].value.toLowerCase();
        return value === MIME_TYPES.TEXT_HTML || value === MIME_TYPES.APPLICATION_XML;
      }
    }
  }
  return ns === NS.SVG && (tn === TAG_ID.FOREIGN_OBJECT || tn === TAG_ID.DESC || tn === TAG_ID.TITLE);
}
function isIntegrationPoint(tn, ns, attrs, foreignNS) {
  return (!foreignNS || foreignNS === NS.HTML) && isHtmlIntegrationPoint(tn, ns, attrs) || (!foreignNS || foreignNS === NS.MATHML) && isMathMLTextIntegrationPoint(tn, ns);
}

// node_modules/@lit-labs/ssr/node_modules/parse5/dist/parser/index.js
var HIDDEN_INPUT_TYPE = "hidden";
var AA_OUTER_LOOP_ITER = 8;
var AA_INNER_LOOP_ITER = 3;
var InsertionMode;
(function(InsertionMode3) {
  InsertionMode3[InsertionMode3["INITIAL"] = 0] = "INITIAL";
  InsertionMode3[InsertionMode3["BEFORE_HTML"] = 1] = "BEFORE_HTML";
  InsertionMode3[InsertionMode3["BEFORE_HEAD"] = 2] = "BEFORE_HEAD";
  InsertionMode3[InsertionMode3["IN_HEAD"] = 3] = "IN_HEAD";
  InsertionMode3[InsertionMode3["IN_HEAD_NO_SCRIPT"] = 4] = "IN_HEAD_NO_SCRIPT";
  InsertionMode3[InsertionMode3["AFTER_HEAD"] = 5] = "AFTER_HEAD";
  InsertionMode3[InsertionMode3["IN_BODY"] = 6] = "IN_BODY";
  InsertionMode3[InsertionMode3["TEXT"] = 7] = "TEXT";
  InsertionMode3[InsertionMode3["IN_TABLE"] = 8] = "IN_TABLE";
  InsertionMode3[InsertionMode3["IN_TABLE_TEXT"] = 9] = "IN_TABLE_TEXT";
  InsertionMode3[InsertionMode3["IN_CAPTION"] = 10] = "IN_CAPTION";
  InsertionMode3[InsertionMode3["IN_COLUMN_GROUP"] = 11] = "IN_COLUMN_GROUP";
  InsertionMode3[InsertionMode3["IN_TABLE_BODY"] = 12] = "IN_TABLE_BODY";
  InsertionMode3[InsertionMode3["IN_ROW"] = 13] = "IN_ROW";
  InsertionMode3[InsertionMode3["IN_CELL"] = 14] = "IN_CELL";
  InsertionMode3[InsertionMode3["IN_SELECT"] = 15] = "IN_SELECT";
  InsertionMode3[InsertionMode3["IN_SELECT_IN_TABLE"] = 16] = "IN_SELECT_IN_TABLE";
  InsertionMode3[InsertionMode3["IN_TEMPLATE"] = 17] = "IN_TEMPLATE";
  InsertionMode3[InsertionMode3["AFTER_BODY"] = 18] = "AFTER_BODY";
  InsertionMode3[InsertionMode3["IN_FRAMESET"] = 19] = "IN_FRAMESET";
  InsertionMode3[InsertionMode3["AFTER_FRAMESET"] = 20] = "AFTER_FRAMESET";
  InsertionMode3[InsertionMode3["AFTER_AFTER_BODY"] = 21] = "AFTER_AFTER_BODY";
  InsertionMode3[InsertionMode3["AFTER_AFTER_FRAMESET"] = 22] = "AFTER_AFTER_FRAMESET";
})(InsertionMode || (InsertionMode = {}));
var BASE_LOC = {
  startLine: -1,
  startCol: -1,
  startOffset: -1,
  endLine: -1,
  endCol: -1,
  endOffset: -1
};
var TABLE_STRUCTURE_TAGS = /* @__PURE__ */ new Set([TAG_ID.TABLE, TAG_ID.TBODY, TAG_ID.TFOOT, TAG_ID.THEAD, TAG_ID.TR]);
var defaultParserOptions = {
  scriptingEnabled: true,
  sourceCodeLocationInfo: false,
  treeAdapter: defaultTreeAdapter,
  onParseError: null
};
var Parser = class {
  constructor(options, document3, fragmentContext = null, scriptHandler = null) {
    this.fragmentContext = fragmentContext;
    this.scriptHandler = scriptHandler;
    this.currentToken = null;
    this.stopped = false;
    this.insertionMode = InsertionMode.INITIAL;
    this.originalInsertionMode = InsertionMode.INITIAL;
    this.headElement = null;
    this.formElement = null;
    this.currentNotInHTML = false;
    this.tmplInsertionModeStack = [];
    this.pendingCharacterTokens = [];
    this.hasNonWhitespacePendingCharacterToken = false;
    this.framesetOk = true;
    this.skipNextNewLine = false;
    this.fosterParentingEnabled = false;
    this.options = {
      ...defaultParserOptions,
      ...options
    };
    this.treeAdapter = this.options.treeAdapter;
    this.onParseError = this.options.onParseError;
    if (this.onParseError) {
      this.options.sourceCodeLocationInfo = true;
    }
    this.document = document3 !== null && document3 !== void 0 ? document3 : this.treeAdapter.createDocument();
    this.tokenizer = new Tokenizer(this.options, this);
    this.activeFormattingElements = new FormattingElementList(this.treeAdapter);
    this.fragmentContextID = fragmentContext ? getTagID(this.treeAdapter.getTagName(fragmentContext)) : TAG_ID.UNKNOWN;
    this._setContextModes(fragmentContext !== null && fragmentContext !== void 0 ? fragmentContext : this.document, this.fragmentContextID);
    this.openElements = new OpenElementStack(this.document, this.treeAdapter, this);
  }
  // API
  static parse(html, options) {
    const parser = new this(options);
    parser.tokenizer.write(html, true);
    return parser.document;
  }
  static getFragmentParser(fragmentContext, options) {
    const opts = {
      ...defaultParserOptions,
      ...options
    };
    fragmentContext !== null && fragmentContext !== void 0 ? fragmentContext : fragmentContext = opts.treeAdapter.createElement(TAG_NAMES.TEMPLATE, NS.HTML, []);
    const documentMock = opts.treeAdapter.createElement("documentmock", NS.HTML, []);
    const parser = new this(opts, documentMock, fragmentContext);
    if (parser.fragmentContextID === TAG_ID.TEMPLATE) {
      parser.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
    }
    parser._initTokenizerForFragmentParsing();
    parser._insertFakeRootElement();
    parser._resetInsertionMode();
    parser._findFormInFragmentContext();
    return parser;
  }
  getFragment() {
    const rootElement = this.treeAdapter.getFirstChild(this.document);
    const fragment = this.treeAdapter.createDocumentFragment();
    this._adoptNodes(rootElement, fragment);
    return fragment;
  }
  //Errors
  /** @internal */
  _err(token, code, beforeToken) {
    var _a5;
    if (!this.onParseError)
      return;
    const loc = (_a5 = token.location) !== null && _a5 !== void 0 ? _a5 : BASE_LOC;
    const err = {
      code,
      startLine: loc.startLine,
      startCol: loc.startCol,
      startOffset: loc.startOffset,
      endLine: beforeToken ? loc.startLine : loc.endLine,
      endCol: beforeToken ? loc.startCol : loc.endCol,
      endOffset: beforeToken ? loc.startOffset : loc.endOffset
    };
    this.onParseError(err);
  }
  //Stack events
  /** @internal */
  onItemPush(node, tid, isTop) {
    var _a5, _b2;
    (_b2 = (_a5 = this.treeAdapter).onItemPush) === null || _b2 === void 0 ? void 0 : _b2.call(_a5, node);
    if (isTop && this.openElements.stackTop > 0)
      this._setContextModes(node, tid);
  }
  /** @internal */
  onItemPop(node, isTop) {
    var _a5, _b2;
    if (this.options.sourceCodeLocationInfo) {
      this._setEndLocation(node, this.currentToken);
    }
    (_b2 = (_a5 = this.treeAdapter).onItemPop) === null || _b2 === void 0 ? void 0 : _b2.call(_a5, node, this.openElements.current);
    if (isTop) {
      let current;
      let currentTagId;
      if (this.openElements.stackTop === 0 && this.fragmentContext) {
        current = this.fragmentContext;
        currentTagId = this.fragmentContextID;
      } else {
        ({ current, currentTagId } = this.openElements);
      }
      this._setContextModes(current, currentTagId);
    }
  }
  _setContextModes(current, tid) {
    const isHTML = current === this.document || current && this.treeAdapter.getNamespaceURI(current) === NS.HTML;
    this.currentNotInHTML = !isHTML;
    this.tokenizer.inForeignNode = !isHTML && current !== void 0 && tid !== void 0 && !this._isIntegrationPoint(tid, current);
  }
  /** @protected */
  _switchToTextParsing(currentToken, nextTokenizerState) {
    this._insertElement(currentToken, NS.HTML);
    this.tokenizer.state = nextTokenizerState;
    this.originalInsertionMode = this.insertionMode;
    this.insertionMode = InsertionMode.TEXT;
  }
  switchToPlaintextParsing() {
    this.insertionMode = InsertionMode.TEXT;
    this.originalInsertionMode = InsertionMode.IN_BODY;
    this.tokenizer.state = TokenizerMode.PLAINTEXT;
  }
  //Fragment parsing
  /** @protected */
  _getAdjustedCurrentElement() {
    return this.openElements.stackTop === 0 && this.fragmentContext ? this.fragmentContext : this.openElements.current;
  }
  /** @protected */
  _findFormInFragmentContext() {
    let node = this.fragmentContext;
    while (node) {
      if (this.treeAdapter.getTagName(node) === TAG_NAMES.FORM) {
        this.formElement = node;
        break;
      }
      node = this.treeAdapter.getParentNode(node);
    }
  }
  _initTokenizerForFragmentParsing() {
    if (!this.fragmentContext || this.treeAdapter.getNamespaceURI(this.fragmentContext) !== NS.HTML) {
      return;
    }
    switch (this.fragmentContextID) {
      case TAG_ID.TITLE:
      case TAG_ID.TEXTAREA: {
        this.tokenizer.state = TokenizerMode.RCDATA;
        break;
      }
      case TAG_ID.STYLE:
      case TAG_ID.XMP:
      case TAG_ID.IFRAME:
      case TAG_ID.NOEMBED:
      case TAG_ID.NOFRAMES:
      case TAG_ID.NOSCRIPT: {
        this.tokenizer.state = TokenizerMode.RAWTEXT;
        break;
      }
      case TAG_ID.SCRIPT: {
        this.tokenizer.state = TokenizerMode.SCRIPT_DATA;
        break;
      }
      case TAG_ID.PLAINTEXT: {
        this.tokenizer.state = TokenizerMode.PLAINTEXT;
        break;
      }
      default:
    }
  }
  //Tree mutation
  /** @protected */
  _setDocumentType(token) {
    const name = token.name || "";
    const publicId = token.publicId || "";
    const systemId = token.systemId || "";
    this.treeAdapter.setDocumentType(this.document, name, publicId, systemId);
    if (token.location) {
      const documentChildren = this.treeAdapter.getChildNodes(this.document);
      const docTypeNode = documentChildren.find((node) => this.treeAdapter.isDocumentTypeNode(node));
      if (docTypeNode) {
        this.treeAdapter.setNodeSourceCodeLocation(docTypeNode, token.location);
      }
    }
  }
  /** @protected */
  _attachElementToTree(element, location) {
    if (this.options.sourceCodeLocationInfo) {
      const loc = location && {
        ...location,
        startTag: location
      };
      this.treeAdapter.setNodeSourceCodeLocation(element, loc);
    }
    if (this._shouldFosterParentOnInsertion()) {
      this._fosterParentElement(element);
    } else {
      const parent = this.openElements.currentTmplContentOrNode;
      this.treeAdapter.appendChild(parent !== null && parent !== void 0 ? parent : this.document, element);
    }
  }
  /**
   * For self-closing tags. Add an element to the tree, but skip adding it
   * to the stack.
   */
  /** @protected */
  _appendElement(token, namespaceURI) {
    const element = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
    this._attachElementToTree(element, token.location);
  }
  /** @protected */
  _insertElement(token, namespaceURI) {
    const element = this.treeAdapter.createElement(token.tagName, namespaceURI, token.attrs);
    this._attachElementToTree(element, token.location);
    this.openElements.push(element, token.tagID);
  }
  /** @protected */
  _insertFakeElement(tagName, tagID) {
    const element = this.treeAdapter.createElement(tagName, NS.HTML, []);
    this._attachElementToTree(element, null);
    this.openElements.push(element, tagID);
  }
  /** @protected */
  _insertTemplate(token) {
    const tmpl = this.treeAdapter.createElement(token.tagName, NS.HTML, token.attrs);
    const content = this.treeAdapter.createDocumentFragment();
    this.treeAdapter.setTemplateContent(tmpl, content);
    this._attachElementToTree(tmpl, token.location);
    this.openElements.push(tmpl, token.tagID);
    if (this.options.sourceCodeLocationInfo)
      this.treeAdapter.setNodeSourceCodeLocation(content, null);
  }
  /** @protected */
  _insertFakeRootElement() {
    const element = this.treeAdapter.createElement(TAG_NAMES.HTML, NS.HTML, []);
    if (this.options.sourceCodeLocationInfo)
      this.treeAdapter.setNodeSourceCodeLocation(element, null);
    this.treeAdapter.appendChild(this.openElements.current, element);
    this.openElements.push(element, TAG_ID.HTML);
  }
  /** @protected */
  _appendCommentNode(token, parent) {
    const commentNode = this.treeAdapter.createCommentNode(token.data);
    this.treeAdapter.appendChild(parent, commentNode);
    if (this.options.sourceCodeLocationInfo) {
      this.treeAdapter.setNodeSourceCodeLocation(commentNode, token.location);
    }
  }
  /** @protected */
  _insertCharacters(token) {
    let parent;
    let beforeElement;
    if (this._shouldFosterParentOnInsertion()) {
      ({ parent, beforeElement } = this._findFosterParentingLocation());
      if (beforeElement) {
        this.treeAdapter.insertTextBefore(parent, token.chars, beforeElement);
      } else {
        this.treeAdapter.insertText(parent, token.chars);
      }
    } else {
      parent = this.openElements.currentTmplContentOrNode;
      this.treeAdapter.insertText(parent, token.chars);
    }
    if (!token.location)
      return;
    const siblings = this.treeAdapter.getChildNodes(parent);
    const textNodeIdx = beforeElement ? siblings.lastIndexOf(beforeElement) : siblings.length;
    const textNode = siblings[textNodeIdx - 1];
    const tnLoc = this.treeAdapter.getNodeSourceCodeLocation(textNode);
    if (tnLoc) {
      const { endLine, endCol, endOffset } = token.location;
      this.treeAdapter.updateNodeSourceCodeLocation(textNode, { endLine, endCol, endOffset });
    } else if (this.options.sourceCodeLocationInfo) {
      this.treeAdapter.setNodeSourceCodeLocation(textNode, token.location);
    }
  }
  /** @protected */
  _adoptNodes(donor, recipient) {
    for (let child = this.treeAdapter.getFirstChild(donor); child; child = this.treeAdapter.getFirstChild(donor)) {
      this.treeAdapter.detachNode(child);
      this.treeAdapter.appendChild(recipient, child);
    }
  }
  /** @protected */
  _setEndLocation(element, closingToken) {
    if (this.treeAdapter.getNodeSourceCodeLocation(element) && closingToken.location) {
      const ctLoc = closingToken.location;
      const tn = this.treeAdapter.getTagName(element);
      const endLoc = (
        // NOTE: For cases like <p> <p> </p> - First 'p' closes without a closing
        // tag and for cases like <td> <p> </td> - 'p' closes without a closing tag.
        closingToken.type === TokenType.END_TAG && tn === closingToken.tagName ? {
          endTag: { ...ctLoc },
          endLine: ctLoc.endLine,
          endCol: ctLoc.endCol,
          endOffset: ctLoc.endOffset
        } : {
          endLine: ctLoc.startLine,
          endCol: ctLoc.startCol,
          endOffset: ctLoc.startOffset
        }
      );
      this.treeAdapter.updateNodeSourceCodeLocation(element, endLoc);
    }
  }
  //Token processing
  shouldProcessStartTagTokenInForeignContent(token) {
    if (!this.currentNotInHTML)
      return false;
    let current;
    let currentTagId;
    if (this.openElements.stackTop === 0 && this.fragmentContext) {
      current = this.fragmentContext;
      currentTagId = this.fragmentContextID;
    } else {
      ({ current, currentTagId } = this.openElements);
    }
    if (token.tagID === TAG_ID.SVG && this.treeAdapter.getTagName(current) === TAG_NAMES.ANNOTATION_XML && this.treeAdapter.getNamespaceURI(current) === NS.MATHML) {
      return false;
    }
    return (
      // Check that `current` is not an integration point for HTML or MathML elements.
      this.tokenizer.inForeignNode || // If it _is_ an integration point, then we might have to check that it is not an HTML
      // integration point.
      (token.tagID === TAG_ID.MGLYPH || token.tagID === TAG_ID.MALIGNMARK) && currentTagId !== void 0 && !this._isIntegrationPoint(currentTagId, current, NS.HTML)
    );
  }
  /** @protected */
  _processToken(token) {
    switch (token.type) {
      case TokenType.CHARACTER: {
        this.onCharacter(token);
        break;
      }
      case TokenType.NULL_CHARACTER: {
        this.onNullCharacter(token);
        break;
      }
      case TokenType.COMMENT: {
        this.onComment(token);
        break;
      }
      case TokenType.DOCTYPE: {
        this.onDoctype(token);
        break;
      }
      case TokenType.START_TAG: {
        this._processStartTag(token);
        break;
      }
      case TokenType.END_TAG: {
        this.onEndTag(token);
        break;
      }
      case TokenType.EOF: {
        this.onEof(token);
        break;
      }
      case TokenType.WHITESPACE_CHARACTER: {
        this.onWhitespaceCharacter(token);
        break;
      }
    }
  }
  //Integration points
  /** @protected */
  _isIntegrationPoint(tid, element, foreignNS) {
    const ns = this.treeAdapter.getNamespaceURI(element);
    const attrs = this.treeAdapter.getAttrList(element);
    return isIntegrationPoint(tid, ns, attrs, foreignNS);
  }
  //Active formatting elements reconstruction
  /** @protected */
  _reconstructActiveFormattingElements() {
    const listLength = this.activeFormattingElements.entries.length;
    if (listLength) {
      const endIndex = this.activeFormattingElements.entries.findIndex((entry) => entry.type === EntryType.Marker || this.openElements.contains(entry.element));
      const unopenIdx = endIndex === -1 ? listLength - 1 : endIndex - 1;
      for (let i8 = unopenIdx; i8 >= 0; i8--) {
        const entry = this.activeFormattingElements.entries[i8];
        this._insertElement(entry.token, this.treeAdapter.getNamespaceURI(entry.element));
        entry.element = this.openElements.current;
      }
    }
  }
  //Close elements
  /** @protected */
  _closeTableCell() {
    this.openElements.generateImpliedEndTags();
    this.openElements.popUntilTableCellPopped();
    this.activeFormattingElements.clearToLastMarker();
    this.insertionMode = InsertionMode.IN_ROW;
  }
  /** @protected */
  _closePElement() {
    this.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.P);
    this.openElements.popUntilTagNamePopped(TAG_ID.P);
  }
  //Insertion modes
  /** @protected */
  _resetInsertionMode() {
    for (let i8 = this.openElements.stackTop; i8 >= 0; i8--) {
      switch (i8 === 0 && this.fragmentContext ? this.fragmentContextID : this.openElements.tagIDs[i8]) {
        case TAG_ID.TR: {
          this.insertionMode = InsertionMode.IN_ROW;
          return;
        }
        case TAG_ID.TBODY:
        case TAG_ID.THEAD:
        case TAG_ID.TFOOT: {
          this.insertionMode = InsertionMode.IN_TABLE_BODY;
          return;
        }
        case TAG_ID.CAPTION: {
          this.insertionMode = InsertionMode.IN_CAPTION;
          return;
        }
        case TAG_ID.COLGROUP: {
          this.insertionMode = InsertionMode.IN_COLUMN_GROUP;
          return;
        }
        case TAG_ID.TABLE: {
          this.insertionMode = InsertionMode.IN_TABLE;
          return;
        }
        case TAG_ID.BODY: {
          this.insertionMode = InsertionMode.IN_BODY;
          return;
        }
        case TAG_ID.FRAMESET: {
          this.insertionMode = InsertionMode.IN_FRAMESET;
          return;
        }
        case TAG_ID.SELECT: {
          this._resetInsertionModeForSelect(i8);
          return;
        }
        case TAG_ID.TEMPLATE: {
          this.insertionMode = this.tmplInsertionModeStack[0];
          return;
        }
        case TAG_ID.HTML: {
          this.insertionMode = this.headElement ? InsertionMode.AFTER_HEAD : InsertionMode.BEFORE_HEAD;
          return;
        }
        case TAG_ID.TD:
        case TAG_ID.TH: {
          if (i8 > 0) {
            this.insertionMode = InsertionMode.IN_CELL;
            return;
          }
          break;
        }
        case TAG_ID.HEAD: {
          if (i8 > 0) {
            this.insertionMode = InsertionMode.IN_HEAD;
            return;
          }
          break;
        }
      }
    }
    this.insertionMode = InsertionMode.IN_BODY;
  }
  /** @protected */
  _resetInsertionModeForSelect(selectIdx) {
    if (selectIdx > 0) {
      for (let i8 = selectIdx - 1; i8 > 0; i8--) {
        const tn = this.openElements.tagIDs[i8];
        if (tn === TAG_ID.TEMPLATE) {
          break;
        } else if (tn === TAG_ID.TABLE) {
          this.insertionMode = InsertionMode.IN_SELECT_IN_TABLE;
          return;
        }
      }
    }
    this.insertionMode = InsertionMode.IN_SELECT;
  }
  //Foster parenting
  /** @protected */
  _isElementCausesFosterParenting(tn) {
    return TABLE_STRUCTURE_TAGS.has(tn);
  }
  /** @protected */
  _shouldFosterParentOnInsertion() {
    return this.fosterParentingEnabled && this.openElements.currentTagId !== void 0 && this._isElementCausesFosterParenting(this.openElements.currentTagId);
  }
  /** @protected */
  _findFosterParentingLocation() {
    for (let i8 = this.openElements.stackTop; i8 >= 0; i8--) {
      const openElement = this.openElements.items[i8];
      switch (this.openElements.tagIDs[i8]) {
        case TAG_ID.TEMPLATE: {
          if (this.treeAdapter.getNamespaceURI(openElement) === NS.HTML) {
            return { parent: this.treeAdapter.getTemplateContent(openElement), beforeElement: null };
          }
          break;
        }
        case TAG_ID.TABLE: {
          const parent = this.treeAdapter.getParentNode(openElement);
          if (parent) {
            return { parent, beforeElement: openElement };
          }
          return { parent: this.openElements.items[i8 - 1], beforeElement: null };
        }
        default:
      }
    }
    return { parent: this.openElements.items[0], beforeElement: null };
  }
  /** @protected */
  _fosterParentElement(element) {
    const location = this._findFosterParentingLocation();
    if (location.beforeElement) {
      this.treeAdapter.insertBefore(location.parent, element, location.beforeElement);
    } else {
      this.treeAdapter.appendChild(location.parent, element);
    }
  }
  //Special elements
  /** @protected */
  _isSpecialElement(element, id) {
    const ns = this.treeAdapter.getNamespaceURI(element);
    return SPECIAL_ELEMENTS[ns].has(id);
  }
  /** @internal */
  onCharacter(token) {
    this.skipNextNewLine = false;
    if (this.tokenizer.inForeignNode) {
      characterInForeignContent(this, token);
      return;
    }
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        tokenBeforeHtml(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        tokenBeforeHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD: {
        tokenInHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        tokenInHeadNoScript(this, token);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        tokenAfterHead(this, token);
        break;
      }
      case InsertionMode.IN_BODY:
      case InsertionMode.IN_CAPTION:
      case InsertionMode.IN_CELL:
      case InsertionMode.IN_TEMPLATE: {
        characterInBody(this, token);
        break;
      }
      case InsertionMode.TEXT:
      case InsertionMode.IN_SELECT:
      case InsertionMode.IN_SELECT_IN_TABLE: {
        this._insertCharacters(token);
        break;
      }
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW: {
        characterInTable(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        characterInTableText(this, token);
        break;
      }
      case InsertionMode.IN_COLUMN_GROUP: {
        tokenInColumnGroup(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        tokenAfterBody(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY: {
        tokenAfterAfterBody(this, token);
        break;
      }
      default:
    }
  }
  /** @internal */
  onNullCharacter(token) {
    this.skipNextNewLine = false;
    if (this.tokenizer.inForeignNode) {
      nullCharacterInForeignContent(this, token);
      return;
    }
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        tokenBeforeHtml(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        tokenBeforeHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD: {
        tokenInHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        tokenInHeadNoScript(this, token);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        tokenAfterHead(this, token);
        break;
      }
      case InsertionMode.TEXT: {
        this._insertCharacters(token);
        break;
      }
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW: {
        characterInTable(this, token);
        break;
      }
      case InsertionMode.IN_COLUMN_GROUP: {
        tokenInColumnGroup(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        tokenAfterBody(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY: {
        tokenAfterAfterBody(this, token);
        break;
      }
      default:
    }
  }
  /** @internal */
  onComment(token) {
    this.skipNextNewLine = false;
    if (this.currentNotInHTML) {
      appendComment(this, token);
      return;
    }
    switch (this.insertionMode) {
      case InsertionMode.INITIAL:
      case InsertionMode.BEFORE_HTML:
      case InsertionMode.BEFORE_HEAD:
      case InsertionMode.IN_HEAD:
      case InsertionMode.IN_HEAD_NO_SCRIPT:
      case InsertionMode.AFTER_HEAD:
      case InsertionMode.IN_BODY:
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_CAPTION:
      case InsertionMode.IN_COLUMN_GROUP:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW:
      case InsertionMode.IN_CELL:
      case InsertionMode.IN_SELECT:
      case InsertionMode.IN_SELECT_IN_TABLE:
      case InsertionMode.IN_TEMPLATE:
      case InsertionMode.IN_FRAMESET:
      case InsertionMode.AFTER_FRAMESET: {
        appendComment(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        appendCommentToRootHtmlElement(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY:
      case InsertionMode.AFTER_AFTER_FRAMESET: {
        appendCommentToDocument(this, token);
        break;
      }
      default:
    }
  }
  /** @internal */
  onDoctype(token) {
    this.skipNextNewLine = false;
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        doctypeInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD:
      case InsertionMode.IN_HEAD:
      case InsertionMode.IN_HEAD_NO_SCRIPT:
      case InsertionMode.AFTER_HEAD: {
        this._err(token, ERR.misplacedDoctype);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token);
        break;
      }
      default:
    }
  }
  /** @internal */
  onStartTag(token) {
    this.skipNextNewLine = false;
    this.currentToken = token;
    this._processStartTag(token);
    if (token.selfClosing && !token.ackSelfClosing) {
      this._err(token, ERR.nonVoidHtmlElementStartTagWithTrailingSolidus);
    }
  }
  /**
   * Processes a given start tag.
   *
   * `onStartTag` checks if a self-closing tag was recognized. When a token
   * is moved inbetween multiple insertion modes, this check for self-closing
   * could lead to false positives. To avoid this, `_processStartTag` is used
   * for nested calls.
   *
   * @param token The token to process.
   * @protected
   */
  _processStartTag(token) {
    if (this.shouldProcessStartTagTokenInForeignContent(token)) {
      startTagInForeignContent(this, token);
    } else {
      this._startTagOutsideForeignContent(token);
    }
  }
  /** @protected */
  _startTagOutsideForeignContent(token) {
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        startTagBeforeHtml(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        startTagBeforeHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD: {
        startTagInHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        startTagInHeadNoScript(this, token);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        startTagAfterHead(this, token);
        break;
      }
      case InsertionMode.IN_BODY: {
        startTagInBody(this, token);
        break;
      }
      case InsertionMode.IN_TABLE: {
        startTagInTable(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token);
        break;
      }
      case InsertionMode.IN_CAPTION: {
        startTagInCaption(this, token);
        break;
      }
      case InsertionMode.IN_COLUMN_GROUP: {
        startTagInColumnGroup(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_BODY: {
        startTagInTableBody(this, token);
        break;
      }
      case InsertionMode.IN_ROW: {
        startTagInRow(this, token);
        break;
      }
      case InsertionMode.IN_CELL: {
        startTagInCell(this, token);
        break;
      }
      case InsertionMode.IN_SELECT: {
        startTagInSelect(this, token);
        break;
      }
      case InsertionMode.IN_SELECT_IN_TABLE: {
        startTagInSelectInTable(this, token);
        break;
      }
      case InsertionMode.IN_TEMPLATE: {
        startTagInTemplate(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        startTagAfterBody(this, token);
        break;
      }
      case InsertionMode.IN_FRAMESET: {
        startTagInFrameset(this, token);
        break;
      }
      case InsertionMode.AFTER_FRAMESET: {
        startTagAfterFrameset(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY: {
        startTagAfterAfterBody(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_FRAMESET: {
        startTagAfterAfterFrameset(this, token);
        break;
      }
      default:
    }
  }
  /** @internal */
  onEndTag(token) {
    this.skipNextNewLine = false;
    this.currentToken = token;
    if (this.currentNotInHTML) {
      endTagInForeignContent(this, token);
    } else {
      this._endTagOutsideForeignContent(token);
    }
  }
  /** @protected */
  _endTagOutsideForeignContent(token) {
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        endTagBeforeHtml(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        endTagBeforeHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD: {
        endTagInHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        endTagInHeadNoScript(this, token);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        endTagAfterHead(this, token);
        break;
      }
      case InsertionMode.IN_BODY: {
        endTagInBody(this, token);
        break;
      }
      case InsertionMode.TEXT: {
        endTagInText(this, token);
        break;
      }
      case InsertionMode.IN_TABLE: {
        endTagInTable(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token);
        break;
      }
      case InsertionMode.IN_CAPTION: {
        endTagInCaption(this, token);
        break;
      }
      case InsertionMode.IN_COLUMN_GROUP: {
        endTagInColumnGroup(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_BODY: {
        endTagInTableBody(this, token);
        break;
      }
      case InsertionMode.IN_ROW: {
        endTagInRow(this, token);
        break;
      }
      case InsertionMode.IN_CELL: {
        endTagInCell(this, token);
        break;
      }
      case InsertionMode.IN_SELECT: {
        endTagInSelect(this, token);
        break;
      }
      case InsertionMode.IN_SELECT_IN_TABLE: {
        endTagInSelectInTable(this, token);
        break;
      }
      case InsertionMode.IN_TEMPLATE: {
        endTagInTemplate(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY: {
        endTagAfterBody(this, token);
        break;
      }
      case InsertionMode.IN_FRAMESET: {
        endTagInFrameset(this, token);
        break;
      }
      case InsertionMode.AFTER_FRAMESET: {
        endTagAfterFrameset(this, token);
        break;
      }
      case InsertionMode.AFTER_AFTER_BODY: {
        tokenAfterAfterBody(this, token);
        break;
      }
      default:
    }
  }
  /** @internal */
  onEof(token) {
    switch (this.insertionMode) {
      case InsertionMode.INITIAL: {
        tokenInInitialMode(this, token);
        break;
      }
      case InsertionMode.BEFORE_HTML: {
        tokenBeforeHtml(this, token);
        break;
      }
      case InsertionMode.BEFORE_HEAD: {
        tokenBeforeHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD: {
        tokenInHead(this, token);
        break;
      }
      case InsertionMode.IN_HEAD_NO_SCRIPT: {
        tokenInHeadNoScript(this, token);
        break;
      }
      case InsertionMode.AFTER_HEAD: {
        tokenAfterHead(this, token);
        break;
      }
      case InsertionMode.IN_BODY:
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_CAPTION:
      case InsertionMode.IN_COLUMN_GROUP:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW:
      case InsertionMode.IN_CELL:
      case InsertionMode.IN_SELECT:
      case InsertionMode.IN_SELECT_IN_TABLE: {
        eofInBody(this, token);
        break;
      }
      case InsertionMode.TEXT: {
        eofInText(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        tokenInTableText(this, token);
        break;
      }
      case InsertionMode.IN_TEMPLATE: {
        eofInTemplate(this, token);
        break;
      }
      case InsertionMode.AFTER_BODY:
      case InsertionMode.IN_FRAMESET:
      case InsertionMode.AFTER_FRAMESET:
      case InsertionMode.AFTER_AFTER_BODY:
      case InsertionMode.AFTER_AFTER_FRAMESET: {
        stopParsing(this, token);
        break;
      }
      default:
    }
  }
  /** @internal */
  onWhitespaceCharacter(token) {
    if (this.skipNextNewLine) {
      this.skipNextNewLine = false;
      if (token.chars.charCodeAt(0) === CODE_POINTS.LINE_FEED) {
        if (token.chars.length === 1) {
          return;
        }
        token.chars = token.chars.substr(1);
      }
    }
    if (this.tokenizer.inForeignNode) {
      this._insertCharacters(token);
      return;
    }
    switch (this.insertionMode) {
      case InsertionMode.IN_HEAD:
      case InsertionMode.IN_HEAD_NO_SCRIPT:
      case InsertionMode.AFTER_HEAD:
      case InsertionMode.TEXT:
      case InsertionMode.IN_COLUMN_GROUP:
      case InsertionMode.IN_SELECT:
      case InsertionMode.IN_SELECT_IN_TABLE:
      case InsertionMode.IN_FRAMESET:
      case InsertionMode.AFTER_FRAMESET: {
        this._insertCharacters(token);
        break;
      }
      case InsertionMode.IN_BODY:
      case InsertionMode.IN_CAPTION:
      case InsertionMode.IN_CELL:
      case InsertionMode.IN_TEMPLATE:
      case InsertionMode.AFTER_BODY:
      case InsertionMode.AFTER_AFTER_BODY:
      case InsertionMode.AFTER_AFTER_FRAMESET: {
        whitespaceCharacterInBody(this, token);
        break;
      }
      case InsertionMode.IN_TABLE:
      case InsertionMode.IN_TABLE_BODY:
      case InsertionMode.IN_ROW: {
        characterInTable(this, token);
        break;
      }
      case InsertionMode.IN_TABLE_TEXT: {
        whitespaceCharacterInTableText(this, token);
        break;
      }
      default:
    }
  }
};
function aaObtainFormattingElementEntry(p5, token) {
  let formattingElementEntry = p5.activeFormattingElements.getElementEntryInScopeWithTagName(token.tagName);
  if (formattingElementEntry) {
    if (!p5.openElements.contains(formattingElementEntry.element)) {
      p5.activeFormattingElements.removeEntry(formattingElementEntry);
      formattingElementEntry = null;
    } else if (!p5.openElements.hasInScope(token.tagID)) {
      formattingElementEntry = null;
    }
  } else {
    genericEndTagInBody(p5, token);
  }
  return formattingElementEntry;
}
function aaObtainFurthestBlock(p5, formattingElementEntry) {
  let furthestBlock = null;
  let idx = p5.openElements.stackTop;
  for (; idx >= 0; idx--) {
    const element = p5.openElements.items[idx];
    if (element === formattingElementEntry.element) {
      break;
    }
    if (p5._isSpecialElement(element, p5.openElements.tagIDs[idx])) {
      furthestBlock = element;
    }
  }
  if (!furthestBlock) {
    p5.openElements.shortenToLength(Math.max(idx, 0));
    p5.activeFormattingElements.removeEntry(formattingElementEntry);
  }
  return furthestBlock;
}
function aaInnerLoop(p5, furthestBlock, formattingElement) {
  let lastElement = furthestBlock;
  let nextElement = p5.openElements.getCommonAncestor(furthestBlock);
  for (let i8 = 0, element = nextElement; element !== formattingElement; i8++, element = nextElement) {
    nextElement = p5.openElements.getCommonAncestor(element);
    const elementEntry = p5.activeFormattingElements.getElementEntry(element);
    const counterOverflow = elementEntry && i8 >= AA_INNER_LOOP_ITER;
    const shouldRemoveFromOpenElements = !elementEntry || counterOverflow;
    if (shouldRemoveFromOpenElements) {
      if (counterOverflow) {
        p5.activeFormattingElements.removeEntry(elementEntry);
      }
      p5.openElements.remove(element);
    } else {
      element = aaRecreateElementFromEntry(p5, elementEntry);
      if (lastElement === furthestBlock) {
        p5.activeFormattingElements.bookmark = elementEntry;
      }
      p5.treeAdapter.detachNode(lastElement);
      p5.treeAdapter.appendChild(element, lastElement);
      lastElement = element;
    }
  }
  return lastElement;
}
function aaRecreateElementFromEntry(p5, elementEntry) {
  const ns = p5.treeAdapter.getNamespaceURI(elementEntry.element);
  const newElement = p5.treeAdapter.createElement(elementEntry.token.tagName, ns, elementEntry.token.attrs);
  p5.openElements.replace(elementEntry.element, newElement);
  elementEntry.element = newElement;
  return newElement;
}
function aaInsertLastNodeInCommonAncestor(p5, commonAncestor, lastElement) {
  const tn = p5.treeAdapter.getTagName(commonAncestor);
  const tid = getTagID(tn);
  if (p5._isElementCausesFosterParenting(tid)) {
    p5._fosterParentElement(lastElement);
  } else {
    const ns = p5.treeAdapter.getNamespaceURI(commonAncestor);
    if (tid === TAG_ID.TEMPLATE && ns === NS.HTML) {
      commonAncestor = p5.treeAdapter.getTemplateContent(commonAncestor);
    }
    p5.treeAdapter.appendChild(commonAncestor, lastElement);
  }
}
function aaReplaceFormattingElement(p5, furthestBlock, formattingElementEntry) {
  const ns = p5.treeAdapter.getNamespaceURI(formattingElementEntry.element);
  const { token } = formattingElementEntry;
  const newElement = p5.treeAdapter.createElement(token.tagName, ns, token.attrs);
  p5._adoptNodes(furthestBlock, newElement);
  p5.treeAdapter.appendChild(furthestBlock, newElement);
  p5.activeFormattingElements.insertElementAfterBookmark(newElement, token);
  p5.activeFormattingElements.removeEntry(formattingElementEntry);
  p5.openElements.remove(formattingElementEntry.element);
  p5.openElements.insertAfter(furthestBlock, newElement, token.tagID);
}
function callAdoptionAgency(p5, token) {
  for (let i8 = 0; i8 < AA_OUTER_LOOP_ITER; i8++) {
    const formattingElementEntry = aaObtainFormattingElementEntry(p5, token);
    if (!formattingElementEntry) {
      break;
    }
    const furthestBlock = aaObtainFurthestBlock(p5, formattingElementEntry);
    if (!furthestBlock) {
      break;
    }
    p5.activeFormattingElements.bookmark = formattingElementEntry;
    const lastElement = aaInnerLoop(p5, furthestBlock, formattingElementEntry.element);
    const commonAncestor = p5.openElements.getCommonAncestor(formattingElementEntry.element);
    p5.treeAdapter.detachNode(lastElement);
    if (commonAncestor)
      aaInsertLastNodeInCommonAncestor(p5, commonAncestor, lastElement);
    aaReplaceFormattingElement(p5, furthestBlock, formattingElementEntry);
  }
}
function appendComment(p5, token) {
  p5._appendCommentNode(token, p5.openElements.currentTmplContentOrNode);
}
function appendCommentToRootHtmlElement(p5, token) {
  p5._appendCommentNode(token, p5.openElements.items[0]);
}
function appendCommentToDocument(p5, token) {
  p5._appendCommentNode(token, p5.document);
}
function stopParsing(p5, token) {
  p5.stopped = true;
  if (token.location) {
    const target = p5.fragmentContext ? 0 : 2;
    for (let i8 = p5.openElements.stackTop; i8 >= target; i8--) {
      p5._setEndLocation(p5.openElements.items[i8], token);
    }
    if (!p5.fragmentContext && p5.openElements.stackTop >= 0) {
      const htmlElement = p5.openElements.items[0];
      const htmlLocation = p5.treeAdapter.getNodeSourceCodeLocation(htmlElement);
      if (htmlLocation && !htmlLocation.endTag) {
        p5._setEndLocation(htmlElement, token);
        if (p5.openElements.stackTop >= 1) {
          const bodyElement = p5.openElements.items[1];
          const bodyLocation = p5.treeAdapter.getNodeSourceCodeLocation(bodyElement);
          if (bodyLocation && !bodyLocation.endTag) {
            p5._setEndLocation(bodyElement, token);
          }
        }
      }
    }
  }
}
function doctypeInInitialMode(p5, token) {
  p5._setDocumentType(token);
  const mode = token.forceQuirks ? DOCUMENT_MODE.QUIRKS : getDocumentMode(token);
  if (!isConforming(token)) {
    p5._err(token, ERR.nonConformingDoctype);
  }
  p5.treeAdapter.setDocumentMode(p5.document, mode);
  p5.insertionMode = InsertionMode.BEFORE_HTML;
}
function tokenInInitialMode(p5, token) {
  p5._err(token, ERR.missingDoctype, true);
  p5.treeAdapter.setDocumentMode(p5.document, DOCUMENT_MODE.QUIRKS);
  p5.insertionMode = InsertionMode.BEFORE_HTML;
  p5._processToken(token);
}
function startTagBeforeHtml(p5, token) {
  if (token.tagID === TAG_ID.HTML) {
    p5._insertElement(token, NS.HTML);
    p5.insertionMode = InsertionMode.BEFORE_HEAD;
  } else {
    tokenBeforeHtml(p5, token);
  }
}
function endTagBeforeHtml(p5, token) {
  const tn = token.tagID;
  if (tn === TAG_ID.HTML || tn === TAG_ID.HEAD || tn === TAG_ID.BODY || tn === TAG_ID.BR) {
    tokenBeforeHtml(p5, token);
  }
}
function tokenBeforeHtml(p5, token) {
  p5._insertFakeRootElement();
  p5.insertionMode = InsertionMode.BEFORE_HEAD;
  p5._processToken(token);
}
function startTagBeforeHead(p5, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p5, token);
      break;
    }
    case TAG_ID.HEAD: {
      p5._insertElement(token, NS.HTML);
      p5.headElement = p5.openElements.current;
      p5.insertionMode = InsertionMode.IN_HEAD;
      break;
    }
    default: {
      tokenBeforeHead(p5, token);
    }
  }
}
function endTagBeforeHead(p5, token) {
  const tn = token.tagID;
  if (tn === TAG_ID.HEAD || tn === TAG_ID.BODY || tn === TAG_ID.HTML || tn === TAG_ID.BR) {
    tokenBeforeHead(p5, token);
  } else {
    p5._err(token, ERR.endTagWithoutMatchingOpenElement);
  }
}
function tokenBeforeHead(p5, token) {
  p5._insertFakeElement(TAG_NAMES.HEAD, TAG_ID.HEAD);
  p5.headElement = p5.openElements.current;
  p5.insertionMode = InsertionMode.IN_HEAD;
  p5._processToken(token);
}
function startTagInHead(p5, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p5, token);
      break;
    }
    case TAG_ID.BASE:
    case TAG_ID.BASEFONT:
    case TAG_ID.BGSOUND:
    case TAG_ID.LINK:
    case TAG_ID.META: {
      p5._appendElement(token, NS.HTML);
      token.ackSelfClosing = true;
      break;
    }
    case TAG_ID.TITLE: {
      p5._switchToTextParsing(token, TokenizerMode.RCDATA);
      break;
    }
    case TAG_ID.NOSCRIPT: {
      if (p5.options.scriptingEnabled) {
        p5._switchToTextParsing(token, TokenizerMode.RAWTEXT);
      } else {
        p5._insertElement(token, NS.HTML);
        p5.insertionMode = InsertionMode.IN_HEAD_NO_SCRIPT;
      }
      break;
    }
    case TAG_ID.NOFRAMES:
    case TAG_ID.STYLE: {
      p5._switchToTextParsing(token, TokenizerMode.RAWTEXT);
      break;
    }
    case TAG_ID.SCRIPT: {
      p5._switchToTextParsing(token, TokenizerMode.SCRIPT_DATA);
      break;
    }
    case TAG_ID.TEMPLATE: {
      p5._insertTemplate(token);
      p5.activeFormattingElements.insertMarker();
      p5.framesetOk = false;
      p5.insertionMode = InsertionMode.IN_TEMPLATE;
      p5.tmplInsertionModeStack.unshift(InsertionMode.IN_TEMPLATE);
      break;
    }
    case TAG_ID.HEAD: {
      p5._err(token, ERR.misplacedStartTagForHeadElement);
      break;
    }
    default: {
      tokenInHead(p5, token);
    }
  }
}
function endTagInHead(p5, token) {
  switch (token.tagID) {
    case TAG_ID.HEAD: {
      p5.openElements.pop();
      p5.insertionMode = InsertionMode.AFTER_HEAD;
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.BR:
    case TAG_ID.HTML: {
      tokenInHead(p5, token);
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p5, token);
      break;
    }
    default: {
      p5._err(token, ERR.endTagWithoutMatchingOpenElement);
    }
  }
}
function templateEndTagInHead(p5, token) {
  if (p5.openElements.tmplCount > 0) {
    p5.openElements.generateImpliedEndTagsThoroughly();
    if (p5.openElements.currentTagId !== TAG_ID.TEMPLATE) {
      p5._err(token, ERR.closingOfElementWithOpenChildElements);
    }
    p5.openElements.popUntilTagNamePopped(TAG_ID.TEMPLATE);
    p5.activeFormattingElements.clearToLastMarker();
    p5.tmplInsertionModeStack.shift();
    p5._resetInsertionMode();
  } else {
    p5._err(token, ERR.endTagWithoutMatchingOpenElement);
  }
}
function tokenInHead(p5, token) {
  p5.openElements.pop();
  p5.insertionMode = InsertionMode.AFTER_HEAD;
  p5._processToken(token);
}
function startTagInHeadNoScript(p5, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p5, token);
      break;
    }
    case TAG_ID.BASEFONT:
    case TAG_ID.BGSOUND:
    case TAG_ID.HEAD:
    case TAG_ID.LINK:
    case TAG_ID.META:
    case TAG_ID.NOFRAMES:
    case TAG_ID.STYLE: {
      startTagInHead(p5, token);
      break;
    }
    case TAG_ID.NOSCRIPT: {
      p5._err(token, ERR.nestedNoscriptInHead);
      break;
    }
    default: {
      tokenInHeadNoScript(p5, token);
    }
  }
}
function endTagInHeadNoScript(p5, token) {
  switch (token.tagID) {
    case TAG_ID.NOSCRIPT: {
      p5.openElements.pop();
      p5.insertionMode = InsertionMode.IN_HEAD;
      break;
    }
    case TAG_ID.BR: {
      tokenInHeadNoScript(p5, token);
      break;
    }
    default: {
      p5._err(token, ERR.endTagWithoutMatchingOpenElement);
    }
  }
}
function tokenInHeadNoScript(p5, token) {
  const errCode = token.type === TokenType.EOF ? ERR.openElementsLeftAfterEof : ERR.disallowedContentInNoscriptInHead;
  p5._err(token, errCode);
  p5.openElements.pop();
  p5.insertionMode = InsertionMode.IN_HEAD;
  p5._processToken(token);
}
function startTagAfterHead(p5, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p5, token);
      break;
    }
    case TAG_ID.BODY: {
      p5._insertElement(token, NS.HTML);
      p5.framesetOk = false;
      p5.insertionMode = InsertionMode.IN_BODY;
      break;
    }
    case TAG_ID.FRAMESET: {
      p5._insertElement(token, NS.HTML);
      p5.insertionMode = InsertionMode.IN_FRAMESET;
      break;
    }
    case TAG_ID.BASE:
    case TAG_ID.BASEFONT:
    case TAG_ID.BGSOUND:
    case TAG_ID.LINK:
    case TAG_ID.META:
    case TAG_ID.NOFRAMES:
    case TAG_ID.SCRIPT:
    case TAG_ID.STYLE:
    case TAG_ID.TEMPLATE:
    case TAG_ID.TITLE: {
      p5._err(token, ERR.abandonedHeadElementChild);
      p5.openElements.push(p5.headElement, TAG_ID.HEAD);
      startTagInHead(p5, token);
      p5.openElements.remove(p5.headElement);
      break;
    }
    case TAG_ID.HEAD: {
      p5._err(token, ERR.misplacedStartTagForHeadElement);
      break;
    }
    default: {
      tokenAfterHead(p5, token);
    }
  }
}
function endTagAfterHead(p5, token) {
  switch (token.tagID) {
    case TAG_ID.BODY:
    case TAG_ID.HTML:
    case TAG_ID.BR: {
      tokenAfterHead(p5, token);
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p5, token);
      break;
    }
    default: {
      p5._err(token, ERR.endTagWithoutMatchingOpenElement);
    }
  }
}
function tokenAfterHead(p5, token) {
  p5._insertFakeElement(TAG_NAMES.BODY, TAG_ID.BODY);
  p5.insertionMode = InsertionMode.IN_BODY;
  modeInBody(p5, token);
}
function modeInBody(p5, token) {
  switch (token.type) {
    case TokenType.CHARACTER: {
      characterInBody(p5, token);
      break;
    }
    case TokenType.WHITESPACE_CHARACTER: {
      whitespaceCharacterInBody(p5, token);
      break;
    }
    case TokenType.COMMENT: {
      appendComment(p5, token);
      break;
    }
    case TokenType.START_TAG: {
      startTagInBody(p5, token);
      break;
    }
    case TokenType.END_TAG: {
      endTagInBody(p5, token);
      break;
    }
    case TokenType.EOF: {
      eofInBody(p5, token);
      break;
    }
    default:
  }
}
function whitespaceCharacterInBody(p5, token) {
  p5._reconstructActiveFormattingElements();
  p5._insertCharacters(token);
}
function characterInBody(p5, token) {
  p5._reconstructActiveFormattingElements();
  p5._insertCharacters(token);
  p5.framesetOk = false;
}
function htmlStartTagInBody(p5, token) {
  if (p5.openElements.tmplCount === 0) {
    p5.treeAdapter.adoptAttributes(p5.openElements.items[0], token.attrs);
  }
}
function bodyStartTagInBody(p5, token) {
  const bodyElement = p5.openElements.tryPeekProperlyNestedBodyElement();
  if (bodyElement && p5.openElements.tmplCount === 0) {
    p5.framesetOk = false;
    p5.treeAdapter.adoptAttributes(bodyElement, token.attrs);
  }
}
function framesetStartTagInBody(p5, token) {
  const bodyElement = p5.openElements.tryPeekProperlyNestedBodyElement();
  if (p5.framesetOk && bodyElement) {
    p5.treeAdapter.detachNode(bodyElement);
    p5.openElements.popAllUpToHtmlElement();
    p5._insertElement(token, NS.HTML);
    p5.insertionMode = InsertionMode.IN_FRAMESET;
  }
}
function addressStartTagInBody(p5, token) {
  if (p5.openElements.hasInButtonScope(TAG_ID.P)) {
    p5._closePElement();
  }
  p5._insertElement(token, NS.HTML);
}
function numberedHeaderStartTagInBody(p5, token) {
  if (p5.openElements.hasInButtonScope(TAG_ID.P)) {
    p5._closePElement();
  }
  if (p5.openElements.currentTagId !== void 0 && NUMBERED_HEADERS.has(p5.openElements.currentTagId)) {
    p5.openElements.pop();
  }
  p5._insertElement(token, NS.HTML);
}
function preStartTagInBody(p5, token) {
  if (p5.openElements.hasInButtonScope(TAG_ID.P)) {
    p5._closePElement();
  }
  p5._insertElement(token, NS.HTML);
  p5.skipNextNewLine = true;
  p5.framesetOk = false;
}
function formStartTagInBody(p5, token) {
  const inTemplate = p5.openElements.tmplCount > 0;
  if (!p5.formElement || inTemplate) {
    if (p5.openElements.hasInButtonScope(TAG_ID.P)) {
      p5._closePElement();
    }
    p5._insertElement(token, NS.HTML);
    if (!inTemplate) {
      p5.formElement = p5.openElements.current;
    }
  }
}
function listItemStartTagInBody(p5, token) {
  p5.framesetOk = false;
  const tn = token.tagID;
  for (let i8 = p5.openElements.stackTop; i8 >= 0; i8--) {
    const elementId = p5.openElements.tagIDs[i8];
    if (tn === TAG_ID.LI && elementId === TAG_ID.LI || (tn === TAG_ID.DD || tn === TAG_ID.DT) && (elementId === TAG_ID.DD || elementId === TAG_ID.DT)) {
      p5.openElements.generateImpliedEndTagsWithExclusion(elementId);
      p5.openElements.popUntilTagNamePopped(elementId);
      break;
    }
    if (elementId !== TAG_ID.ADDRESS && elementId !== TAG_ID.DIV && elementId !== TAG_ID.P && p5._isSpecialElement(p5.openElements.items[i8], elementId)) {
      break;
    }
  }
  if (p5.openElements.hasInButtonScope(TAG_ID.P)) {
    p5._closePElement();
  }
  p5._insertElement(token, NS.HTML);
}
function plaintextStartTagInBody(p5, token) {
  if (p5.openElements.hasInButtonScope(TAG_ID.P)) {
    p5._closePElement();
  }
  p5._insertElement(token, NS.HTML);
  p5.tokenizer.state = TokenizerMode.PLAINTEXT;
}
function buttonStartTagInBody(p5, token) {
  if (p5.openElements.hasInScope(TAG_ID.BUTTON)) {
    p5.openElements.generateImpliedEndTags();
    p5.openElements.popUntilTagNamePopped(TAG_ID.BUTTON);
  }
  p5._reconstructActiveFormattingElements();
  p5._insertElement(token, NS.HTML);
  p5.framesetOk = false;
}
function aStartTagInBody(p5, token) {
  const activeElementEntry = p5.activeFormattingElements.getElementEntryInScopeWithTagName(TAG_NAMES.A);
  if (activeElementEntry) {
    callAdoptionAgency(p5, token);
    p5.openElements.remove(activeElementEntry.element);
    p5.activeFormattingElements.removeEntry(activeElementEntry);
  }
  p5._reconstructActiveFormattingElements();
  p5._insertElement(token, NS.HTML);
  p5.activeFormattingElements.pushElement(p5.openElements.current, token);
}
function bStartTagInBody(p5, token) {
  p5._reconstructActiveFormattingElements();
  p5._insertElement(token, NS.HTML);
  p5.activeFormattingElements.pushElement(p5.openElements.current, token);
}
function nobrStartTagInBody(p5, token) {
  p5._reconstructActiveFormattingElements();
  if (p5.openElements.hasInScope(TAG_ID.NOBR)) {
    callAdoptionAgency(p5, token);
    p5._reconstructActiveFormattingElements();
  }
  p5._insertElement(token, NS.HTML);
  p5.activeFormattingElements.pushElement(p5.openElements.current, token);
}
function appletStartTagInBody(p5, token) {
  p5._reconstructActiveFormattingElements();
  p5._insertElement(token, NS.HTML);
  p5.activeFormattingElements.insertMarker();
  p5.framesetOk = false;
}
function tableStartTagInBody(p5, token) {
  if (p5.treeAdapter.getDocumentMode(p5.document) !== DOCUMENT_MODE.QUIRKS && p5.openElements.hasInButtonScope(TAG_ID.P)) {
    p5._closePElement();
  }
  p5._insertElement(token, NS.HTML);
  p5.framesetOk = false;
  p5.insertionMode = InsertionMode.IN_TABLE;
}
function areaStartTagInBody(p5, token) {
  p5._reconstructActiveFormattingElements();
  p5._appendElement(token, NS.HTML);
  p5.framesetOk = false;
  token.ackSelfClosing = true;
}
function isHiddenInput(token) {
  const inputType = getTokenAttr(token, ATTRS.TYPE);
  return inputType != null && inputType.toLowerCase() === HIDDEN_INPUT_TYPE;
}
function inputStartTagInBody(p5, token) {
  p5._reconstructActiveFormattingElements();
  p5._appendElement(token, NS.HTML);
  if (!isHiddenInput(token)) {
    p5.framesetOk = false;
  }
  token.ackSelfClosing = true;
}
function paramStartTagInBody(p5, token) {
  p5._appendElement(token, NS.HTML);
  token.ackSelfClosing = true;
}
function hrStartTagInBody(p5, token) {
  if (p5.openElements.hasInButtonScope(TAG_ID.P)) {
    p5._closePElement();
  }
  p5._appendElement(token, NS.HTML);
  p5.framesetOk = false;
  token.ackSelfClosing = true;
}
function imageStartTagInBody(p5, token) {
  token.tagName = TAG_NAMES.IMG;
  token.tagID = TAG_ID.IMG;
  areaStartTagInBody(p5, token);
}
function textareaStartTagInBody(p5, token) {
  p5._insertElement(token, NS.HTML);
  p5.skipNextNewLine = true;
  p5.tokenizer.state = TokenizerMode.RCDATA;
  p5.originalInsertionMode = p5.insertionMode;
  p5.framesetOk = false;
  p5.insertionMode = InsertionMode.TEXT;
}
function xmpStartTagInBody(p5, token) {
  if (p5.openElements.hasInButtonScope(TAG_ID.P)) {
    p5._closePElement();
  }
  p5._reconstructActiveFormattingElements();
  p5.framesetOk = false;
  p5._switchToTextParsing(token, TokenizerMode.RAWTEXT);
}
function iframeStartTagInBody(p5, token) {
  p5.framesetOk = false;
  p5._switchToTextParsing(token, TokenizerMode.RAWTEXT);
}
function rawTextStartTagInBody(p5, token) {
  p5._switchToTextParsing(token, TokenizerMode.RAWTEXT);
}
function selectStartTagInBody(p5, token) {
  p5._reconstructActiveFormattingElements();
  p5._insertElement(token, NS.HTML);
  p5.framesetOk = false;
  p5.insertionMode = p5.insertionMode === InsertionMode.IN_TABLE || p5.insertionMode === InsertionMode.IN_CAPTION || p5.insertionMode === InsertionMode.IN_TABLE_BODY || p5.insertionMode === InsertionMode.IN_ROW || p5.insertionMode === InsertionMode.IN_CELL ? InsertionMode.IN_SELECT_IN_TABLE : InsertionMode.IN_SELECT;
}
function optgroupStartTagInBody(p5, token) {
  if (p5.openElements.currentTagId === TAG_ID.OPTION) {
    p5.openElements.pop();
  }
  p5._reconstructActiveFormattingElements();
  p5._insertElement(token, NS.HTML);
}
function rbStartTagInBody(p5, token) {
  if (p5.openElements.hasInScope(TAG_ID.RUBY)) {
    p5.openElements.generateImpliedEndTags();
  }
  p5._insertElement(token, NS.HTML);
}
function rtStartTagInBody(p5, token) {
  if (p5.openElements.hasInScope(TAG_ID.RUBY)) {
    p5.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.RTC);
  }
  p5._insertElement(token, NS.HTML);
}
function mathStartTagInBody(p5, token) {
  p5._reconstructActiveFormattingElements();
  adjustTokenMathMLAttrs(token);
  adjustTokenXMLAttrs(token);
  if (token.selfClosing) {
    p5._appendElement(token, NS.MATHML);
  } else {
    p5._insertElement(token, NS.MATHML);
  }
  token.ackSelfClosing = true;
}
function svgStartTagInBody(p5, token) {
  p5._reconstructActiveFormattingElements();
  adjustTokenSVGAttrs(token);
  adjustTokenXMLAttrs(token);
  if (token.selfClosing) {
    p5._appendElement(token, NS.SVG);
  } else {
    p5._insertElement(token, NS.SVG);
  }
  token.ackSelfClosing = true;
}
function genericStartTagInBody(p5, token) {
  p5._reconstructActiveFormattingElements();
  p5._insertElement(token, NS.HTML);
}
function startTagInBody(p5, token) {
  switch (token.tagID) {
    case TAG_ID.I:
    case TAG_ID.S:
    case TAG_ID.B:
    case TAG_ID.U:
    case TAG_ID.EM:
    case TAG_ID.TT:
    case TAG_ID.BIG:
    case TAG_ID.CODE:
    case TAG_ID.FONT:
    case TAG_ID.SMALL:
    case TAG_ID.STRIKE:
    case TAG_ID.STRONG: {
      bStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.A: {
      aStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.H1:
    case TAG_ID.H2:
    case TAG_ID.H3:
    case TAG_ID.H4:
    case TAG_ID.H5:
    case TAG_ID.H6: {
      numberedHeaderStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.P:
    case TAG_ID.DL:
    case TAG_ID.OL:
    case TAG_ID.UL:
    case TAG_ID.DIV:
    case TAG_ID.DIR:
    case TAG_ID.NAV:
    case TAG_ID.MAIN:
    case TAG_ID.MENU:
    case TAG_ID.ASIDE:
    case TAG_ID.CENTER:
    case TAG_ID.FIGURE:
    case TAG_ID.FOOTER:
    case TAG_ID.HEADER:
    case TAG_ID.HGROUP:
    case TAG_ID.DIALOG:
    case TAG_ID.DETAILS:
    case TAG_ID.ADDRESS:
    case TAG_ID.ARTICLE:
    case TAG_ID.SEARCH:
    case TAG_ID.SECTION:
    case TAG_ID.SUMMARY:
    case TAG_ID.FIELDSET:
    case TAG_ID.BLOCKQUOTE:
    case TAG_ID.FIGCAPTION: {
      addressStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.LI:
    case TAG_ID.DD:
    case TAG_ID.DT: {
      listItemStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.BR:
    case TAG_ID.IMG:
    case TAG_ID.WBR:
    case TAG_ID.AREA:
    case TAG_ID.EMBED:
    case TAG_ID.KEYGEN: {
      areaStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.HR: {
      hrStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.RB:
    case TAG_ID.RTC: {
      rbStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.RT:
    case TAG_ID.RP: {
      rtStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.PRE:
    case TAG_ID.LISTING: {
      preStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.XMP: {
      xmpStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.SVG: {
      svgStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.HTML: {
      htmlStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.BASE:
    case TAG_ID.LINK:
    case TAG_ID.META:
    case TAG_ID.STYLE:
    case TAG_ID.TITLE:
    case TAG_ID.SCRIPT:
    case TAG_ID.BGSOUND:
    case TAG_ID.BASEFONT:
    case TAG_ID.TEMPLATE: {
      startTagInHead(p5, token);
      break;
    }
    case TAG_ID.BODY: {
      bodyStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.FORM: {
      formStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.NOBR: {
      nobrStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.MATH: {
      mathStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.TABLE: {
      tableStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.INPUT: {
      inputStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.PARAM:
    case TAG_ID.TRACK:
    case TAG_ID.SOURCE: {
      paramStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.IMAGE: {
      imageStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.BUTTON: {
      buttonStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.APPLET:
    case TAG_ID.OBJECT:
    case TAG_ID.MARQUEE: {
      appletStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.IFRAME: {
      iframeStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.SELECT: {
      selectStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.OPTION:
    case TAG_ID.OPTGROUP: {
      optgroupStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.NOEMBED:
    case TAG_ID.NOFRAMES: {
      rawTextStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.FRAMESET: {
      framesetStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.TEXTAREA: {
      textareaStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.NOSCRIPT: {
      if (p5.options.scriptingEnabled) {
        rawTextStartTagInBody(p5, token);
      } else {
        genericStartTagInBody(p5, token);
      }
      break;
    }
    case TAG_ID.PLAINTEXT: {
      plaintextStartTagInBody(p5, token);
      break;
    }
    case TAG_ID.COL:
    case TAG_ID.TH:
    case TAG_ID.TD:
    case TAG_ID.TR:
    case TAG_ID.HEAD:
    case TAG_ID.FRAME:
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD:
    case TAG_ID.CAPTION:
    case TAG_ID.COLGROUP: {
      break;
    }
    default: {
      genericStartTagInBody(p5, token);
    }
  }
}
function bodyEndTagInBody(p5, token) {
  if (p5.openElements.hasInScope(TAG_ID.BODY)) {
    p5.insertionMode = InsertionMode.AFTER_BODY;
    if (p5.options.sourceCodeLocationInfo) {
      const bodyElement = p5.openElements.tryPeekProperlyNestedBodyElement();
      if (bodyElement) {
        p5._setEndLocation(bodyElement, token);
      }
    }
  }
}
function htmlEndTagInBody(p5, token) {
  if (p5.openElements.hasInScope(TAG_ID.BODY)) {
    p5.insertionMode = InsertionMode.AFTER_BODY;
    endTagAfterBody(p5, token);
  }
}
function addressEndTagInBody(p5, token) {
  const tn = token.tagID;
  if (p5.openElements.hasInScope(tn)) {
    p5.openElements.generateImpliedEndTags();
    p5.openElements.popUntilTagNamePopped(tn);
  }
}
function formEndTagInBody(p5) {
  const inTemplate = p5.openElements.tmplCount > 0;
  const { formElement } = p5;
  if (!inTemplate) {
    p5.formElement = null;
  }
  if ((formElement || inTemplate) && p5.openElements.hasInScope(TAG_ID.FORM)) {
    p5.openElements.generateImpliedEndTags();
    if (inTemplate) {
      p5.openElements.popUntilTagNamePopped(TAG_ID.FORM);
    } else if (formElement) {
      p5.openElements.remove(formElement);
    }
  }
}
function pEndTagInBody(p5) {
  if (!p5.openElements.hasInButtonScope(TAG_ID.P)) {
    p5._insertFakeElement(TAG_NAMES.P, TAG_ID.P);
  }
  p5._closePElement();
}
function liEndTagInBody(p5) {
  if (p5.openElements.hasInListItemScope(TAG_ID.LI)) {
    p5.openElements.generateImpliedEndTagsWithExclusion(TAG_ID.LI);
    p5.openElements.popUntilTagNamePopped(TAG_ID.LI);
  }
}
function ddEndTagInBody(p5, token) {
  const tn = token.tagID;
  if (p5.openElements.hasInScope(tn)) {
    p5.openElements.generateImpliedEndTagsWithExclusion(tn);
    p5.openElements.popUntilTagNamePopped(tn);
  }
}
function numberedHeaderEndTagInBody(p5) {
  if (p5.openElements.hasNumberedHeaderInScope()) {
    p5.openElements.generateImpliedEndTags();
    p5.openElements.popUntilNumberedHeaderPopped();
  }
}
function appletEndTagInBody(p5, token) {
  const tn = token.tagID;
  if (p5.openElements.hasInScope(tn)) {
    p5.openElements.generateImpliedEndTags();
    p5.openElements.popUntilTagNamePopped(tn);
    p5.activeFormattingElements.clearToLastMarker();
  }
}
function brEndTagInBody(p5) {
  p5._reconstructActiveFormattingElements();
  p5._insertFakeElement(TAG_NAMES.BR, TAG_ID.BR);
  p5.openElements.pop();
  p5.framesetOk = false;
}
function genericEndTagInBody(p5, token) {
  const tn = token.tagName;
  const tid = token.tagID;
  for (let i8 = p5.openElements.stackTop; i8 > 0; i8--) {
    const element = p5.openElements.items[i8];
    const elementId = p5.openElements.tagIDs[i8];
    if (tid === elementId && (tid !== TAG_ID.UNKNOWN || p5.treeAdapter.getTagName(element) === tn)) {
      p5.openElements.generateImpliedEndTagsWithExclusion(tid);
      if (p5.openElements.stackTop >= i8)
        p5.openElements.shortenToLength(i8);
      break;
    }
    if (p5._isSpecialElement(element, elementId)) {
      break;
    }
  }
}
function endTagInBody(p5, token) {
  switch (token.tagID) {
    case TAG_ID.A:
    case TAG_ID.B:
    case TAG_ID.I:
    case TAG_ID.S:
    case TAG_ID.U:
    case TAG_ID.EM:
    case TAG_ID.TT:
    case TAG_ID.BIG:
    case TAG_ID.CODE:
    case TAG_ID.FONT:
    case TAG_ID.NOBR:
    case TAG_ID.SMALL:
    case TAG_ID.STRIKE:
    case TAG_ID.STRONG: {
      callAdoptionAgency(p5, token);
      break;
    }
    case TAG_ID.P: {
      pEndTagInBody(p5);
      break;
    }
    case TAG_ID.DL:
    case TAG_ID.UL:
    case TAG_ID.OL:
    case TAG_ID.DIR:
    case TAG_ID.DIV:
    case TAG_ID.NAV:
    case TAG_ID.PRE:
    case TAG_ID.MAIN:
    case TAG_ID.MENU:
    case TAG_ID.ASIDE:
    case TAG_ID.BUTTON:
    case TAG_ID.CENTER:
    case TAG_ID.FIGURE:
    case TAG_ID.FOOTER:
    case TAG_ID.HEADER:
    case TAG_ID.HGROUP:
    case TAG_ID.DIALOG:
    case TAG_ID.ADDRESS:
    case TAG_ID.ARTICLE:
    case TAG_ID.DETAILS:
    case TAG_ID.SEARCH:
    case TAG_ID.SECTION:
    case TAG_ID.SUMMARY:
    case TAG_ID.LISTING:
    case TAG_ID.FIELDSET:
    case TAG_ID.BLOCKQUOTE:
    case TAG_ID.FIGCAPTION: {
      addressEndTagInBody(p5, token);
      break;
    }
    case TAG_ID.LI: {
      liEndTagInBody(p5);
      break;
    }
    case TAG_ID.DD:
    case TAG_ID.DT: {
      ddEndTagInBody(p5, token);
      break;
    }
    case TAG_ID.H1:
    case TAG_ID.H2:
    case TAG_ID.H3:
    case TAG_ID.H4:
    case TAG_ID.H5:
    case TAG_ID.H6: {
      numberedHeaderEndTagInBody(p5);
      break;
    }
    case TAG_ID.BR: {
      brEndTagInBody(p5);
      break;
    }
    case TAG_ID.BODY: {
      bodyEndTagInBody(p5, token);
      break;
    }
    case TAG_ID.HTML: {
      htmlEndTagInBody(p5, token);
      break;
    }
    case TAG_ID.FORM: {
      formEndTagInBody(p5);
      break;
    }
    case TAG_ID.APPLET:
    case TAG_ID.OBJECT:
    case TAG_ID.MARQUEE: {
      appletEndTagInBody(p5, token);
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p5, token);
      break;
    }
    default: {
      genericEndTagInBody(p5, token);
    }
  }
}
function eofInBody(p5, token) {
  if (p5.tmplInsertionModeStack.length > 0) {
    eofInTemplate(p5, token);
  } else {
    stopParsing(p5, token);
  }
}
function endTagInText(p5, token) {
  var _a5;
  if (token.tagID === TAG_ID.SCRIPT) {
    (_a5 = p5.scriptHandler) === null || _a5 === void 0 ? void 0 : _a5.call(p5, p5.openElements.current);
  }
  p5.openElements.pop();
  p5.insertionMode = p5.originalInsertionMode;
}
function eofInText(p5, token) {
  p5._err(token, ERR.eofInElementThatCanContainOnlyText);
  p5.openElements.pop();
  p5.insertionMode = p5.originalInsertionMode;
  p5.onEof(token);
}
function characterInTable(p5, token) {
  if (p5.openElements.currentTagId !== void 0 && TABLE_STRUCTURE_TAGS.has(p5.openElements.currentTagId)) {
    p5.pendingCharacterTokens.length = 0;
    p5.hasNonWhitespacePendingCharacterToken = false;
    p5.originalInsertionMode = p5.insertionMode;
    p5.insertionMode = InsertionMode.IN_TABLE_TEXT;
    switch (token.type) {
      case TokenType.CHARACTER: {
        characterInTableText(p5, token);
        break;
      }
      case TokenType.WHITESPACE_CHARACTER: {
        whitespaceCharacterInTableText(p5, token);
        break;
      }
    }
  } else {
    tokenInTable(p5, token);
  }
}
function captionStartTagInTable(p5, token) {
  p5.openElements.clearBackToTableContext();
  p5.activeFormattingElements.insertMarker();
  p5._insertElement(token, NS.HTML);
  p5.insertionMode = InsertionMode.IN_CAPTION;
}
function colgroupStartTagInTable(p5, token) {
  p5.openElements.clearBackToTableContext();
  p5._insertElement(token, NS.HTML);
  p5.insertionMode = InsertionMode.IN_COLUMN_GROUP;
}
function colStartTagInTable(p5, token) {
  p5.openElements.clearBackToTableContext();
  p5._insertFakeElement(TAG_NAMES.COLGROUP, TAG_ID.COLGROUP);
  p5.insertionMode = InsertionMode.IN_COLUMN_GROUP;
  startTagInColumnGroup(p5, token);
}
function tbodyStartTagInTable(p5, token) {
  p5.openElements.clearBackToTableContext();
  p5._insertElement(token, NS.HTML);
  p5.insertionMode = InsertionMode.IN_TABLE_BODY;
}
function tdStartTagInTable(p5, token) {
  p5.openElements.clearBackToTableContext();
  p5._insertFakeElement(TAG_NAMES.TBODY, TAG_ID.TBODY);
  p5.insertionMode = InsertionMode.IN_TABLE_BODY;
  startTagInTableBody(p5, token);
}
function tableStartTagInTable(p5, token) {
  if (p5.openElements.hasInTableScope(TAG_ID.TABLE)) {
    p5.openElements.popUntilTagNamePopped(TAG_ID.TABLE);
    p5._resetInsertionMode();
    p5._processStartTag(token);
  }
}
function inputStartTagInTable(p5, token) {
  if (isHiddenInput(token)) {
    p5._appendElement(token, NS.HTML);
  } else {
    tokenInTable(p5, token);
  }
  token.ackSelfClosing = true;
}
function formStartTagInTable(p5, token) {
  if (!p5.formElement && p5.openElements.tmplCount === 0) {
    p5._insertElement(token, NS.HTML);
    p5.formElement = p5.openElements.current;
    p5.openElements.pop();
  }
}
function startTagInTable(p5, token) {
  switch (token.tagID) {
    case TAG_ID.TD:
    case TAG_ID.TH:
    case TAG_ID.TR: {
      tdStartTagInTable(p5, token);
      break;
    }
    case TAG_ID.STYLE:
    case TAG_ID.SCRIPT:
    case TAG_ID.TEMPLATE: {
      startTagInHead(p5, token);
      break;
    }
    case TAG_ID.COL: {
      colStartTagInTable(p5, token);
      break;
    }
    case TAG_ID.FORM: {
      formStartTagInTable(p5, token);
      break;
    }
    case TAG_ID.TABLE: {
      tableStartTagInTable(p5, token);
      break;
    }
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD: {
      tbodyStartTagInTable(p5, token);
      break;
    }
    case TAG_ID.INPUT: {
      inputStartTagInTable(p5, token);
      break;
    }
    case TAG_ID.CAPTION: {
      captionStartTagInTable(p5, token);
      break;
    }
    case TAG_ID.COLGROUP: {
      colgroupStartTagInTable(p5, token);
      break;
    }
    default: {
      tokenInTable(p5, token);
    }
  }
}
function endTagInTable(p5, token) {
  switch (token.tagID) {
    case TAG_ID.TABLE: {
      if (p5.openElements.hasInTableScope(TAG_ID.TABLE)) {
        p5.openElements.popUntilTagNamePopped(TAG_ID.TABLE);
        p5._resetInsertionMode();
      }
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p5, token);
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.HTML:
    case TAG_ID.TBODY:
    case TAG_ID.TD:
    case TAG_ID.TFOOT:
    case TAG_ID.TH:
    case TAG_ID.THEAD:
    case TAG_ID.TR: {
      break;
    }
    default: {
      tokenInTable(p5, token);
    }
  }
}
function tokenInTable(p5, token) {
  const savedFosterParentingState = p5.fosterParentingEnabled;
  p5.fosterParentingEnabled = true;
  modeInBody(p5, token);
  p5.fosterParentingEnabled = savedFosterParentingState;
}
function whitespaceCharacterInTableText(p5, token) {
  p5.pendingCharacterTokens.push(token);
}
function characterInTableText(p5, token) {
  p5.pendingCharacterTokens.push(token);
  p5.hasNonWhitespacePendingCharacterToken = true;
}
function tokenInTableText(p5, token) {
  let i8 = 0;
  if (p5.hasNonWhitespacePendingCharacterToken) {
    for (; i8 < p5.pendingCharacterTokens.length; i8++) {
      tokenInTable(p5, p5.pendingCharacterTokens[i8]);
    }
  } else {
    for (; i8 < p5.pendingCharacterTokens.length; i8++) {
      p5._insertCharacters(p5.pendingCharacterTokens[i8]);
    }
  }
  p5.insertionMode = p5.originalInsertionMode;
  p5._processToken(token);
}
var TABLE_VOID_ELEMENTS = /* @__PURE__ */ new Set([TAG_ID.CAPTION, TAG_ID.COL, TAG_ID.COLGROUP, TAG_ID.TBODY, TAG_ID.TD, TAG_ID.TFOOT, TAG_ID.TH, TAG_ID.THEAD, TAG_ID.TR]);
function startTagInCaption(p5, token) {
  const tn = token.tagID;
  if (TABLE_VOID_ELEMENTS.has(tn)) {
    if (p5.openElements.hasInTableScope(TAG_ID.CAPTION)) {
      p5.openElements.generateImpliedEndTags();
      p5.openElements.popUntilTagNamePopped(TAG_ID.CAPTION);
      p5.activeFormattingElements.clearToLastMarker();
      p5.insertionMode = InsertionMode.IN_TABLE;
      startTagInTable(p5, token);
    }
  } else {
    startTagInBody(p5, token);
  }
}
function endTagInCaption(p5, token) {
  const tn = token.tagID;
  switch (tn) {
    case TAG_ID.CAPTION:
    case TAG_ID.TABLE: {
      if (p5.openElements.hasInTableScope(TAG_ID.CAPTION)) {
        p5.openElements.generateImpliedEndTags();
        p5.openElements.popUntilTagNamePopped(TAG_ID.CAPTION);
        p5.activeFormattingElements.clearToLastMarker();
        p5.insertionMode = InsertionMode.IN_TABLE;
        if (tn === TAG_ID.TABLE) {
          endTagInTable(p5, token);
        }
      }
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.HTML:
    case TAG_ID.TBODY:
    case TAG_ID.TD:
    case TAG_ID.TFOOT:
    case TAG_ID.TH:
    case TAG_ID.THEAD:
    case TAG_ID.TR: {
      break;
    }
    default: {
      endTagInBody(p5, token);
    }
  }
}
function startTagInColumnGroup(p5, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p5, token);
      break;
    }
    case TAG_ID.COL: {
      p5._appendElement(token, NS.HTML);
      token.ackSelfClosing = true;
      break;
    }
    case TAG_ID.TEMPLATE: {
      startTagInHead(p5, token);
      break;
    }
    default: {
      tokenInColumnGroup(p5, token);
    }
  }
}
function endTagInColumnGroup(p5, token) {
  switch (token.tagID) {
    case TAG_ID.COLGROUP: {
      if (p5.openElements.currentTagId === TAG_ID.COLGROUP) {
        p5.openElements.pop();
        p5.insertionMode = InsertionMode.IN_TABLE;
      }
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p5, token);
      break;
    }
    case TAG_ID.COL: {
      break;
    }
    default: {
      tokenInColumnGroup(p5, token);
    }
  }
}
function tokenInColumnGroup(p5, token) {
  if (p5.openElements.currentTagId === TAG_ID.COLGROUP) {
    p5.openElements.pop();
    p5.insertionMode = InsertionMode.IN_TABLE;
    p5._processToken(token);
  }
}
function startTagInTableBody(p5, token) {
  switch (token.tagID) {
    case TAG_ID.TR: {
      p5.openElements.clearBackToTableBodyContext();
      p5._insertElement(token, NS.HTML);
      p5.insertionMode = InsertionMode.IN_ROW;
      break;
    }
    case TAG_ID.TH:
    case TAG_ID.TD: {
      p5.openElements.clearBackToTableBodyContext();
      p5._insertFakeElement(TAG_NAMES.TR, TAG_ID.TR);
      p5.insertionMode = InsertionMode.IN_ROW;
      startTagInRow(p5, token);
      break;
    }
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD: {
      if (p5.openElements.hasTableBodyContextInTableScope()) {
        p5.openElements.clearBackToTableBodyContext();
        p5.openElements.pop();
        p5.insertionMode = InsertionMode.IN_TABLE;
        startTagInTable(p5, token);
      }
      break;
    }
    default: {
      startTagInTable(p5, token);
    }
  }
}
function endTagInTableBody(p5, token) {
  const tn = token.tagID;
  switch (token.tagID) {
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD: {
      if (p5.openElements.hasInTableScope(tn)) {
        p5.openElements.clearBackToTableBodyContext();
        p5.openElements.pop();
        p5.insertionMode = InsertionMode.IN_TABLE;
      }
      break;
    }
    case TAG_ID.TABLE: {
      if (p5.openElements.hasTableBodyContextInTableScope()) {
        p5.openElements.clearBackToTableBodyContext();
        p5.openElements.pop();
        p5.insertionMode = InsertionMode.IN_TABLE;
        endTagInTable(p5, token);
      }
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.HTML:
    case TAG_ID.TD:
    case TAG_ID.TH:
    case TAG_ID.TR: {
      break;
    }
    default: {
      endTagInTable(p5, token);
    }
  }
}
function startTagInRow(p5, token) {
  switch (token.tagID) {
    case TAG_ID.TH:
    case TAG_ID.TD: {
      p5.openElements.clearBackToTableRowContext();
      p5._insertElement(token, NS.HTML);
      p5.insertionMode = InsertionMode.IN_CELL;
      p5.activeFormattingElements.insertMarker();
      break;
    }
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD:
    case TAG_ID.TR: {
      if (p5.openElements.hasInTableScope(TAG_ID.TR)) {
        p5.openElements.clearBackToTableRowContext();
        p5.openElements.pop();
        p5.insertionMode = InsertionMode.IN_TABLE_BODY;
        startTagInTableBody(p5, token);
      }
      break;
    }
    default: {
      startTagInTable(p5, token);
    }
  }
}
function endTagInRow(p5, token) {
  switch (token.tagID) {
    case TAG_ID.TR: {
      if (p5.openElements.hasInTableScope(TAG_ID.TR)) {
        p5.openElements.clearBackToTableRowContext();
        p5.openElements.pop();
        p5.insertionMode = InsertionMode.IN_TABLE_BODY;
      }
      break;
    }
    case TAG_ID.TABLE: {
      if (p5.openElements.hasInTableScope(TAG_ID.TR)) {
        p5.openElements.clearBackToTableRowContext();
        p5.openElements.pop();
        p5.insertionMode = InsertionMode.IN_TABLE_BODY;
        endTagInTableBody(p5, token);
      }
      break;
    }
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD: {
      if (p5.openElements.hasInTableScope(token.tagID) || p5.openElements.hasInTableScope(TAG_ID.TR)) {
        p5.openElements.clearBackToTableRowContext();
        p5.openElements.pop();
        p5.insertionMode = InsertionMode.IN_TABLE_BODY;
        endTagInTableBody(p5, token);
      }
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.HTML:
    case TAG_ID.TD:
    case TAG_ID.TH: {
      break;
    }
    default: {
      endTagInTable(p5, token);
    }
  }
}
function startTagInCell(p5, token) {
  const tn = token.tagID;
  if (TABLE_VOID_ELEMENTS.has(tn)) {
    if (p5.openElements.hasInTableScope(TAG_ID.TD) || p5.openElements.hasInTableScope(TAG_ID.TH)) {
      p5._closeTableCell();
      startTagInRow(p5, token);
    }
  } else {
    startTagInBody(p5, token);
  }
}
function endTagInCell(p5, token) {
  const tn = token.tagID;
  switch (tn) {
    case TAG_ID.TD:
    case TAG_ID.TH: {
      if (p5.openElements.hasInTableScope(tn)) {
        p5.openElements.generateImpliedEndTags();
        p5.openElements.popUntilTagNamePopped(tn);
        p5.activeFormattingElements.clearToLastMarker();
        p5.insertionMode = InsertionMode.IN_ROW;
      }
      break;
    }
    case TAG_ID.TABLE:
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD:
    case TAG_ID.TR: {
      if (p5.openElements.hasInTableScope(tn)) {
        p5._closeTableCell();
        endTagInRow(p5, token);
      }
      break;
    }
    case TAG_ID.BODY:
    case TAG_ID.CAPTION:
    case TAG_ID.COL:
    case TAG_ID.COLGROUP:
    case TAG_ID.HTML: {
      break;
    }
    default: {
      endTagInBody(p5, token);
    }
  }
}
function startTagInSelect(p5, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p5, token);
      break;
    }
    case TAG_ID.OPTION: {
      if (p5.openElements.currentTagId === TAG_ID.OPTION) {
        p5.openElements.pop();
      }
      p5._insertElement(token, NS.HTML);
      break;
    }
    case TAG_ID.OPTGROUP: {
      if (p5.openElements.currentTagId === TAG_ID.OPTION) {
        p5.openElements.pop();
      }
      if (p5.openElements.currentTagId === TAG_ID.OPTGROUP) {
        p5.openElements.pop();
      }
      p5._insertElement(token, NS.HTML);
      break;
    }
    case TAG_ID.HR: {
      if (p5.openElements.currentTagId === TAG_ID.OPTION) {
        p5.openElements.pop();
      }
      if (p5.openElements.currentTagId === TAG_ID.OPTGROUP) {
        p5.openElements.pop();
      }
      p5._appendElement(token, NS.HTML);
      token.ackSelfClosing = true;
      break;
    }
    case TAG_ID.INPUT:
    case TAG_ID.KEYGEN:
    case TAG_ID.TEXTAREA:
    case TAG_ID.SELECT: {
      if (p5.openElements.hasInSelectScope(TAG_ID.SELECT)) {
        p5.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
        p5._resetInsertionMode();
        if (token.tagID !== TAG_ID.SELECT) {
          p5._processStartTag(token);
        }
      }
      break;
    }
    case TAG_ID.SCRIPT:
    case TAG_ID.TEMPLATE: {
      startTagInHead(p5, token);
      break;
    }
    default:
  }
}
function endTagInSelect(p5, token) {
  switch (token.tagID) {
    case TAG_ID.OPTGROUP: {
      if (p5.openElements.stackTop > 0 && p5.openElements.currentTagId === TAG_ID.OPTION && p5.openElements.tagIDs[p5.openElements.stackTop - 1] === TAG_ID.OPTGROUP) {
        p5.openElements.pop();
      }
      if (p5.openElements.currentTagId === TAG_ID.OPTGROUP) {
        p5.openElements.pop();
      }
      break;
    }
    case TAG_ID.OPTION: {
      if (p5.openElements.currentTagId === TAG_ID.OPTION) {
        p5.openElements.pop();
      }
      break;
    }
    case TAG_ID.SELECT: {
      if (p5.openElements.hasInSelectScope(TAG_ID.SELECT)) {
        p5.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
        p5._resetInsertionMode();
      }
      break;
    }
    case TAG_ID.TEMPLATE: {
      templateEndTagInHead(p5, token);
      break;
    }
    default:
  }
}
function startTagInSelectInTable(p5, token) {
  const tn = token.tagID;
  if (tn === TAG_ID.CAPTION || tn === TAG_ID.TABLE || tn === TAG_ID.TBODY || tn === TAG_ID.TFOOT || tn === TAG_ID.THEAD || tn === TAG_ID.TR || tn === TAG_ID.TD || tn === TAG_ID.TH) {
    p5.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
    p5._resetInsertionMode();
    p5._processStartTag(token);
  } else {
    startTagInSelect(p5, token);
  }
}
function endTagInSelectInTable(p5, token) {
  const tn = token.tagID;
  if (tn === TAG_ID.CAPTION || tn === TAG_ID.TABLE || tn === TAG_ID.TBODY || tn === TAG_ID.TFOOT || tn === TAG_ID.THEAD || tn === TAG_ID.TR || tn === TAG_ID.TD || tn === TAG_ID.TH) {
    if (p5.openElements.hasInTableScope(tn)) {
      p5.openElements.popUntilTagNamePopped(TAG_ID.SELECT);
      p5._resetInsertionMode();
      p5.onEndTag(token);
    }
  } else {
    endTagInSelect(p5, token);
  }
}
function startTagInTemplate(p5, token) {
  switch (token.tagID) {
    // First, handle tags that can start without a mode change
    case TAG_ID.BASE:
    case TAG_ID.BASEFONT:
    case TAG_ID.BGSOUND:
    case TAG_ID.LINK:
    case TAG_ID.META:
    case TAG_ID.NOFRAMES:
    case TAG_ID.SCRIPT:
    case TAG_ID.STYLE:
    case TAG_ID.TEMPLATE:
    case TAG_ID.TITLE: {
      startTagInHead(p5, token);
      break;
    }
    // Re-process the token in the appropriate mode
    case TAG_ID.CAPTION:
    case TAG_ID.COLGROUP:
    case TAG_ID.TBODY:
    case TAG_ID.TFOOT:
    case TAG_ID.THEAD: {
      p5.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE;
      p5.insertionMode = InsertionMode.IN_TABLE;
      startTagInTable(p5, token);
      break;
    }
    case TAG_ID.COL: {
      p5.tmplInsertionModeStack[0] = InsertionMode.IN_COLUMN_GROUP;
      p5.insertionMode = InsertionMode.IN_COLUMN_GROUP;
      startTagInColumnGroup(p5, token);
      break;
    }
    case TAG_ID.TR: {
      p5.tmplInsertionModeStack[0] = InsertionMode.IN_TABLE_BODY;
      p5.insertionMode = InsertionMode.IN_TABLE_BODY;
      startTagInTableBody(p5, token);
      break;
    }
    case TAG_ID.TD:
    case TAG_ID.TH: {
      p5.tmplInsertionModeStack[0] = InsertionMode.IN_ROW;
      p5.insertionMode = InsertionMode.IN_ROW;
      startTagInRow(p5, token);
      break;
    }
    default: {
      p5.tmplInsertionModeStack[0] = InsertionMode.IN_BODY;
      p5.insertionMode = InsertionMode.IN_BODY;
      startTagInBody(p5, token);
    }
  }
}
function endTagInTemplate(p5, token) {
  if (token.tagID === TAG_ID.TEMPLATE) {
    templateEndTagInHead(p5, token);
  }
}
function eofInTemplate(p5, token) {
  if (p5.openElements.tmplCount > 0) {
    p5.openElements.popUntilTagNamePopped(TAG_ID.TEMPLATE);
    p5.activeFormattingElements.clearToLastMarker();
    p5.tmplInsertionModeStack.shift();
    p5._resetInsertionMode();
    p5.onEof(token);
  } else {
    stopParsing(p5, token);
  }
}
function startTagAfterBody(p5, token) {
  if (token.tagID === TAG_ID.HTML) {
    startTagInBody(p5, token);
  } else {
    tokenAfterBody(p5, token);
  }
}
function endTagAfterBody(p5, token) {
  var _a5;
  if (token.tagID === TAG_ID.HTML) {
    if (!p5.fragmentContext) {
      p5.insertionMode = InsertionMode.AFTER_AFTER_BODY;
    }
    if (p5.options.sourceCodeLocationInfo && p5.openElements.tagIDs[0] === TAG_ID.HTML) {
      p5._setEndLocation(p5.openElements.items[0], token);
      const bodyElement = p5.openElements.items[1];
      if (bodyElement && !((_a5 = p5.treeAdapter.getNodeSourceCodeLocation(bodyElement)) === null || _a5 === void 0 ? void 0 : _a5.endTag)) {
        p5._setEndLocation(bodyElement, token);
      }
    }
  } else {
    tokenAfterBody(p5, token);
  }
}
function tokenAfterBody(p5, token) {
  p5.insertionMode = InsertionMode.IN_BODY;
  modeInBody(p5, token);
}
function startTagInFrameset(p5, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p5, token);
      break;
    }
    case TAG_ID.FRAMESET: {
      p5._insertElement(token, NS.HTML);
      break;
    }
    case TAG_ID.FRAME: {
      p5._appendElement(token, NS.HTML);
      token.ackSelfClosing = true;
      break;
    }
    case TAG_ID.NOFRAMES: {
      startTagInHead(p5, token);
      break;
    }
    default:
  }
}
function endTagInFrameset(p5, token) {
  if (token.tagID === TAG_ID.FRAMESET && !p5.openElements.isRootHtmlElementCurrent()) {
    p5.openElements.pop();
    if (!p5.fragmentContext && p5.openElements.currentTagId !== TAG_ID.FRAMESET) {
      p5.insertionMode = InsertionMode.AFTER_FRAMESET;
    }
  }
}
function startTagAfterFrameset(p5, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p5, token);
      break;
    }
    case TAG_ID.NOFRAMES: {
      startTagInHead(p5, token);
      break;
    }
    default:
  }
}
function endTagAfterFrameset(p5, token) {
  if (token.tagID === TAG_ID.HTML) {
    p5.insertionMode = InsertionMode.AFTER_AFTER_FRAMESET;
  }
}
function startTagAfterAfterBody(p5, token) {
  if (token.tagID === TAG_ID.HTML) {
    startTagInBody(p5, token);
  } else {
    tokenAfterAfterBody(p5, token);
  }
}
function tokenAfterAfterBody(p5, token) {
  p5.insertionMode = InsertionMode.IN_BODY;
  modeInBody(p5, token);
}
function startTagAfterAfterFrameset(p5, token) {
  switch (token.tagID) {
    case TAG_ID.HTML: {
      startTagInBody(p5, token);
      break;
    }
    case TAG_ID.NOFRAMES: {
      startTagInHead(p5, token);
      break;
    }
    default:
  }
}
function nullCharacterInForeignContent(p5, token) {
  token.chars = REPLACEMENT_CHARACTER;
  p5._insertCharacters(token);
}
function characterInForeignContent(p5, token) {
  p5._insertCharacters(token);
  p5.framesetOk = false;
}
function popUntilHtmlOrIntegrationPoint(p5) {
  while (p5.treeAdapter.getNamespaceURI(p5.openElements.current) !== NS.HTML && p5.openElements.currentTagId !== void 0 && !p5._isIntegrationPoint(p5.openElements.currentTagId, p5.openElements.current)) {
    p5.openElements.pop();
  }
}
function startTagInForeignContent(p5, token) {
  if (causesExit(token)) {
    popUntilHtmlOrIntegrationPoint(p5);
    p5._startTagOutsideForeignContent(token);
  } else {
    const current = p5._getAdjustedCurrentElement();
    const currentNs = p5.treeAdapter.getNamespaceURI(current);
    if (currentNs === NS.MATHML) {
      adjustTokenMathMLAttrs(token);
    } else if (currentNs === NS.SVG) {
      adjustTokenSVGTagName(token);
      adjustTokenSVGAttrs(token);
    }
    adjustTokenXMLAttrs(token);
    if (token.selfClosing) {
      p5._appendElement(token, currentNs);
    } else {
      p5._insertElement(token, currentNs);
    }
    token.ackSelfClosing = true;
  }
}
function endTagInForeignContent(p5, token) {
  if (token.tagID === TAG_ID.P || token.tagID === TAG_ID.BR) {
    popUntilHtmlOrIntegrationPoint(p5);
    p5._endTagOutsideForeignContent(token);
    return;
  }
  for (let i8 = p5.openElements.stackTop; i8 > 0; i8--) {
    const element = p5.openElements.items[i8];
    if (p5.treeAdapter.getNamespaceURI(element) === NS.HTML) {
      p5._endTagOutsideForeignContent(token);
      break;
    }
    const tagName = p5.treeAdapter.getTagName(element);
    if (tagName.toLowerCase() === token.tagName) {
      token.tagName = tagName;
      p5.openElements.shortenToLength(i8);
      break;
    }
  }
}

// node_modules/entities/dist/esm/escape.js
var getCodePoint = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  String.prototype.codePointAt == null ? (c6, index) => (c6.charCodeAt(index) & 64512) === 55296 ? (c6.charCodeAt(index) - 55296) * 1024 + c6.charCodeAt(index + 1) - 56320 + 65536 : c6.charCodeAt(index) : (
    // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
    (input, index) => input.codePointAt(index)
  )
);

// node_modules/@lit-labs/ssr/node_modules/parse5/dist/serializer/index.js
var VOID_ELEMENTS = /* @__PURE__ */ new Set([
  TAG_NAMES.AREA,
  TAG_NAMES.BASE,
  TAG_NAMES.BASEFONT,
  TAG_NAMES.BGSOUND,
  TAG_NAMES.BR,
  TAG_NAMES.COL,
  TAG_NAMES.EMBED,
  TAG_NAMES.FRAME,
  TAG_NAMES.HR,
  TAG_NAMES.IMG,
  TAG_NAMES.INPUT,
  TAG_NAMES.KEYGEN,
  TAG_NAMES.LINK,
  TAG_NAMES.META,
  TAG_NAMES.PARAM,
  TAG_NAMES.SOURCE,
  TAG_NAMES.TRACK,
  TAG_NAMES.WBR
]);

// node_modules/@lit-labs/ssr/node_modules/parse5/dist/index.js
function parse(html, options) {
  return Parser.parse(html, options);
}
function parseFragment(fragmentContext, html, options) {
  if (typeof fragmentContext === "string") {
    options = html;
    html = fragmentContext;
    fragmentContext = null;
  }
  const parser = Parser.getFragmentParser(fragmentContext, options);
  parser.tokenizer.write(html, true);
  return parser.getFragment();
}

// node_modules/@parse5/tools/node_modules/parse5/dist/common/unicode.js
var CODE_POINTS2;
(function(CODE_POINTS3) {
  CODE_POINTS3[CODE_POINTS3["EOF"] = -1] = "EOF";
  CODE_POINTS3[CODE_POINTS3["NULL"] = 0] = "NULL";
  CODE_POINTS3[CODE_POINTS3["TABULATION"] = 9] = "TABULATION";
  CODE_POINTS3[CODE_POINTS3["CARRIAGE_RETURN"] = 13] = "CARRIAGE_RETURN";
  CODE_POINTS3[CODE_POINTS3["LINE_FEED"] = 10] = "LINE_FEED";
  CODE_POINTS3[CODE_POINTS3["FORM_FEED"] = 12] = "FORM_FEED";
  CODE_POINTS3[CODE_POINTS3["SPACE"] = 32] = "SPACE";
  CODE_POINTS3[CODE_POINTS3["EXCLAMATION_MARK"] = 33] = "EXCLAMATION_MARK";
  CODE_POINTS3[CODE_POINTS3["QUOTATION_MARK"] = 34] = "QUOTATION_MARK";
  CODE_POINTS3[CODE_POINTS3["AMPERSAND"] = 38] = "AMPERSAND";
  CODE_POINTS3[CODE_POINTS3["APOSTROPHE"] = 39] = "APOSTROPHE";
  CODE_POINTS3[CODE_POINTS3["HYPHEN_MINUS"] = 45] = "HYPHEN_MINUS";
  CODE_POINTS3[CODE_POINTS3["SOLIDUS"] = 47] = "SOLIDUS";
  CODE_POINTS3[CODE_POINTS3["DIGIT_0"] = 48] = "DIGIT_0";
  CODE_POINTS3[CODE_POINTS3["DIGIT_9"] = 57] = "DIGIT_9";
  CODE_POINTS3[CODE_POINTS3["SEMICOLON"] = 59] = "SEMICOLON";
  CODE_POINTS3[CODE_POINTS3["LESS_THAN_SIGN"] = 60] = "LESS_THAN_SIGN";
  CODE_POINTS3[CODE_POINTS3["EQUALS_SIGN"] = 61] = "EQUALS_SIGN";
  CODE_POINTS3[CODE_POINTS3["GREATER_THAN_SIGN"] = 62] = "GREATER_THAN_SIGN";
  CODE_POINTS3[CODE_POINTS3["QUESTION_MARK"] = 63] = "QUESTION_MARK";
  CODE_POINTS3[CODE_POINTS3["LATIN_CAPITAL_A"] = 65] = "LATIN_CAPITAL_A";
  CODE_POINTS3[CODE_POINTS3["LATIN_CAPITAL_Z"] = 90] = "LATIN_CAPITAL_Z";
  CODE_POINTS3[CODE_POINTS3["RIGHT_SQUARE_BRACKET"] = 93] = "RIGHT_SQUARE_BRACKET";
  CODE_POINTS3[CODE_POINTS3["GRAVE_ACCENT"] = 96] = "GRAVE_ACCENT";
  CODE_POINTS3[CODE_POINTS3["LATIN_SMALL_A"] = 97] = "LATIN_SMALL_A";
  CODE_POINTS3[CODE_POINTS3["LATIN_SMALL_Z"] = 122] = "LATIN_SMALL_Z";
})(CODE_POINTS2 || (CODE_POINTS2 = {}));

// node_modules/@parse5/tools/node_modules/parse5/dist/common/error-codes.js
var ERR2;
(function(ERR3) {
  ERR3["controlCharacterInInputStream"] = "control-character-in-input-stream";
  ERR3["noncharacterInInputStream"] = "noncharacter-in-input-stream";
  ERR3["surrogateInInputStream"] = "surrogate-in-input-stream";
  ERR3["nonVoidHtmlElementStartTagWithTrailingSolidus"] = "non-void-html-element-start-tag-with-trailing-solidus";
  ERR3["endTagWithAttributes"] = "end-tag-with-attributes";
  ERR3["endTagWithTrailingSolidus"] = "end-tag-with-trailing-solidus";
  ERR3["unexpectedSolidusInTag"] = "unexpected-solidus-in-tag";
  ERR3["unexpectedNullCharacter"] = "unexpected-null-character";
  ERR3["unexpectedQuestionMarkInsteadOfTagName"] = "unexpected-question-mark-instead-of-tag-name";
  ERR3["invalidFirstCharacterOfTagName"] = "invalid-first-character-of-tag-name";
  ERR3["unexpectedEqualsSignBeforeAttributeName"] = "unexpected-equals-sign-before-attribute-name";
  ERR3["missingEndTagName"] = "missing-end-tag-name";
  ERR3["unexpectedCharacterInAttributeName"] = "unexpected-character-in-attribute-name";
  ERR3["unknownNamedCharacterReference"] = "unknown-named-character-reference";
  ERR3["missingSemicolonAfterCharacterReference"] = "missing-semicolon-after-character-reference";
  ERR3["unexpectedCharacterAfterDoctypeSystemIdentifier"] = "unexpected-character-after-doctype-system-identifier";
  ERR3["unexpectedCharacterInUnquotedAttributeValue"] = "unexpected-character-in-unquoted-attribute-value";
  ERR3["eofBeforeTagName"] = "eof-before-tag-name";
  ERR3["eofInTag"] = "eof-in-tag";
  ERR3["missingAttributeValue"] = "missing-attribute-value";
  ERR3["missingWhitespaceBetweenAttributes"] = "missing-whitespace-between-attributes";
  ERR3["missingWhitespaceAfterDoctypePublicKeyword"] = "missing-whitespace-after-doctype-public-keyword";
  ERR3["missingWhitespaceBetweenDoctypePublicAndSystemIdentifiers"] = "missing-whitespace-between-doctype-public-and-system-identifiers";
  ERR3["missingWhitespaceAfterDoctypeSystemKeyword"] = "missing-whitespace-after-doctype-system-keyword";
  ERR3["missingQuoteBeforeDoctypePublicIdentifier"] = "missing-quote-before-doctype-public-identifier";
  ERR3["missingQuoteBeforeDoctypeSystemIdentifier"] = "missing-quote-before-doctype-system-identifier";
  ERR3["missingDoctypePublicIdentifier"] = "missing-doctype-public-identifier";
  ERR3["missingDoctypeSystemIdentifier"] = "missing-doctype-system-identifier";
  ERR3["abruptDoctypePublicIdentifier"] = "abrupt-doctype-public-identifier";
  ERR3["abruptDoctypeSystemIdentifier"] = "abrupt-doctype-system-identifier";
  ERR3["cdataInHtmlContent"] = "cdata-in-html-content";
  ERR3["incorrectlyOpenedComment"] = "incorrectly-opened-comment";
  ERR3["eofInScriptHtmlCommentLikeText"] = "eof-in-script-html-comment-like-text";
  ERR3["eofInDoctype"] = "eof-in-doctype";
  ERR3["nestedComment"] = "nested-comment";
  ERR3["abruptClosingOfEmptyComment"] = "abrupt-closing-of-empty-comment";
  ERR3["eofInComment"] = "eof-in-comment";
  ERR3["incorrectlyClosedComment"] = "incorrectly-closed-comment";
  ERR3["eofInCdata"] = "eof-in-cdata";
  ERR3["absenceOfDigitsInNumericCharacterReference"] = "absence-of-digits-in-numeric-character-reference";
  ERR3["nullCharacterReference"] = "null-character-reference";
  ERR3["surrogateCharacterReference"] = "surrogate-character-reference";
  ERR3["characterReferenceOutsideUnicodeRange"] = "character-reference-outside-unicode-range";
  ERR3["controlCharacterReference"] = "control-character-reference";
  ERR3["noncharacterCharacterReference"] = "noncharacter-character-reference";
  ERR3["missingWhitespaceBeforeDoctypeName"] = "missing-whitespace-before-doctype-name";
  ERR3["missingDoctypeName"] = "missing-doctype-name";
  ERR3["invalidCharacterSequenceAfterDoctypeName"] = "invalid-character-sequence-after-doctype-name";
  ERR3["duplicateAttribute"] = "duplicate-attribute";
  ERR3["nonConformingDoctype"] = "non-conforming-doctype";
  ERR3["missingDoctype"] = "missing-doctype";
  ERR3["misplacedDoctype"] = "misplaced-doctype";
  ERR3["endTagWithoutMatchingOpenElement"] = "end-tag-without-matching-open-element";
  ERR3["closingOfElementWithOpenChildElements"] = "closing-of-element-with-open-child-elements";
  ERR3["disallowedContentInNoscriptInHead"] = "disallowed-content-in-noscript-in-head";
  ERR3["openElementsLeftAfterEof"] = "open-elements-left-after-eof";
  ERR3["abandonedHeadElementChild"] = "abandoned-head-element-child";
  ERR3["misplacedStartTagForHeadElement"] = "misplaced-start-tag-for-head-element";
  ERR3["nestedNoscriptInHead"] = "nested-noscript-in-head";
  ERR3["eofInElementThatCanContainOnlyText"] = "eof-in-element-that-can-contain-only-text";
})(ERR2 || (ERR2 = {}));

// node_modules/@parse5/tools/node_modules/parse5/dist/tokenizer/preprocessor.js
var DEFAULT_BUFFER_WATERLINE2 = 1 << 16;

// node_modules/@parse5/tools/node_modules/parse5/dist/common/token.js
var TokenType2;
(function(TokenType3) {
  TokenType3[TokenType3["CHARACTER"] = 0] = "CHARACTER";
  TokenType3[TokenType3["NULL_CHARACTER"] = 1] = "NULL_CHARACTER";
  TokenType3[TokenType3["WHITESPACE_CHARACTER"] = 2] = "WHITESPACE_CHARACTER";
  TokenType3[TokenType3["START_TAG"] = 3] = "START_TAG";
  TokenType3[TokenType3["END_TAG"] = 4] = "END_TAG";
  TokenType3[TokenType3["COMMENT"] = 5] = "COMMENT";
  TokenType3[TokenType3["DOCTYPE"] = 6] = "DOCTYPE";
  TokenType3[TokenType3["EOF"] = 7] = "EOF";
  TokenType3[TokenType3["HIBERNATION"] = 8] = "HIBERNATION";
})(TokenType2 || (TokenType2 = {}));

// node_modules/@parse5/tools/node_modules/parse5/dist/common/html.js
var html_exports2 = {};
__export(html_exports2, {
  ATTRS: () => ATTRS2,
  DOCUMENT_MODE: () => DOCUMENT_MODE2,
  NS: () => NS2,
  NUMBERED_HEADERS: () => NUMBERED_HEADERS2,
  SPECIAL_ELEMENTS: () => SPECIAL_ELEMENTS2,
  TAG_ID: () => TAG_ID2,
  TAG_NAMES: () => TAG_NAMES2,
  getTagID: () => getTagID2,
  hasUnescapedText: () => hasUnescapedText2
});
var NS2;
(function(NS3) {
  NS3["HTML"] = "http://www.w3.org/1999/xhtml";
  NS3["MATHML"] = "http://www.w3.org/1998/Math/MathML";
  NS3["SVG"] = "http://www.w3.org/2000/svg";
  NS3["XLINK"] = "http://www.w3.org/1999/xlink";
  NS3["XML"] = "http://www.w3.org/XML/1998/namespace";
  NS3["XMLNS"] = "http://www.w3.org/2000/xmlns/";
})(NS2 || (NS2 = {}));
var ATTRS2;
(function(ATTRS3) {
  ATTRS3["TYPE"] = "type";
  ATTRS3["ACTION"] = "action";
  ATTRS3["ENCODING"] = "encoding";
  ATTRS3["PROMPT"] = "prompt";
  ATTRS3["NAME"] = "name";
  ATTRS3["COLOR"] = "color";
  ATTRS3["FACE"] = "face";
  ATTRS3["SIZE"] = "size";
})(ATTRS2 || (ATTRS2 = {}));
var DOCUMENT_MODE2;
(function(DOCUMENT_MODE3) {
  DOCUMENT_MODE3["NO_QUIRKS"] = "no-quirks";
  DOCUMENT_MODE3["QUIRKS"] = "quirks";
  DOCUMENT_MODE3["LIMITED_QUIRKS"] = "limited-quirks";
})(DOCUMENT_MODE2 || (DOCUMENT_MODE2 = {}));
var TAG_NAMES2;
(function(TAG_NAMES3) {
  TAG_NAMES3["A"] = "a";
  TAG_NAMES3["ADDRESS"] = "address";
  TAG_NAMES3["ANNOTATION_XML"] = "annotation-xml";
  TAG_NAMES3["APPLET"] = "applet";
  TAG_NAMES3["AREA"] = "area";
  TAG_NAMES3["ARTICLE"] = "article";
  TAG_NAMES3["ASIDE"] = "aside";
  TAG_NAMES3["B"] = "b";
  TAG_NAMES3["BASE"] = "base";
  TAG_NAMES3["BASEFONT"] = "basefont";
  TAG_NAMES3["BGSOUND"] = "bgsound";
  TAG_NAMES3["BIG"] = "big";
  TAG_NAMES3["BLOCKQUOTE"] = "blockquote";
  TAG_NAMES3["BODY"] = "body";
  TAG_NAMES3["BR"] = "br";
  TAG_NAMES3["BUTTON"] = "button";
  TAG_NAMES3["CAPTION"] = "caption";
  TAG_NAMES3["CENTER"] = "center";
  TAG_NAMES3["CODE"] = "code";
  TAG_NAMES3["COL"] = "col";
  TAG_NAMES3["COLGROUP"] = "colgroup";
  TAG_NAMES3["DD"] = "dd";
  TAG_NAMES3["DESC"] = "desc";
  TAG_NAMES3["DETAILS"] = "details";
  TAG_NAMES3["DIALOG"] = "dialog";
  TAG_NAMES3["DIR"] = "dir";
  TAG_NAMES3["DIV"] = "div";
  TAG_NAMES3["DL"] = "dl";
  TAG_NAMES3["DT"] = "dt";
  TAG_NAMES3["EM"] = "em";
  TAG_NAMES3["EMBED"] = "embed";
  TAG_NAMES3["FIELDSET"] = "fieldset";
  TAG_NAMES3["FIGCAPTION"] = "figcaption";
  TAG_NAMES3["FIGURE"] = "figure";
  TAG_NAMES3["FONT"] = "font";
  TAG_NAMES3["FOOTER"] = "footer";
  TAG_NAMES3["FOREIGN_OBJECT"] = "foreignObject";
  TAG_NAMES3["FORM"] = "form";
  TAG_NAMES3["FRAME"] = "frame";
  TAG_NAMES3["FRAMESET"] = "frameset";
  TAG_NAMES3["H1"] = "h1";
  TAG_NAMES3["H2"] = "h2";
  TAG_NAMES3["H3"] = "h3";
  TAG_NAMES3["H4"] = "h4";
  TAG_NAMES3["H5"] = "h5";
  TAG_NAMES3["H6"] = "h6";
  TAG_NAMES3["HEAD"] = "head";
  TAG_NAMES3["HEADER"] = "header";
  TAG_NAMES3["HGROUP"] = "hgroup";
  TAG_NAMES3["HR"] = "hr";
  TAG_NAMES3["HTML"] = "html";
  TAG_NAMES3["I"] = "i";
  TAG_NAMES3["IMG"] = "img";
  TAG_NAMES3["IMAGE"] = "image";
  TAG_NAMES3["INPUT"] = "input";
  TAG_NAMES3["IFRAME"] = "iframe";
  TAG_NAMES3["KEYGEN"] = "keygen";
  TAG_NAMES3["LABEL"] = "label";
  TAG_NAMES3["LI"] = "li";
  TAG_NAMES3["LINK"] = "link";
  TAG_NAMES3["LISTING"] = "listing";
  TAG_NAMES3["MAIN"] = "main";
  TAG_NAMES3["MALIGNMARK"] = "malignmark";
  TAG_NAMES3["MARQUEE"] = "marquee";
  TAG_NAMES3["MATH"] = "math";
  TAG_NAMES3["MENU"] = "menu";
  TAG_NAMES3["META"] = "meta";
  TAG_NAMES3["MGLYPH"] = "mglyph";
  TAG_NAMES3["MI"] = "mi";
  TAG_NAMES3["MO"] = "mo";
  TAG_NAMES3["MN"] = "mn";
  TAG_NAMES3["MS"] = "ms";
  TAG_NAMES3["MTEXT"] = "mtext";
  TAG_NAMES3["NAV"] = "nav";
  TAG_NAMES3["NOBR"] = "nobr";
  TAG_NAMES3["NOFRAMES"] = "noframes";
  TAG_NAMES3["NOEMBED"] = "noembed";
  TAG_NAMES3["NOSCRIPT"] = "noscript";
  TAG_NAMES3["OBJECT"] = "object";
  TAG_NAMES3["OL"] = "ol";
  TAG_NAMES3["OPTGROUP"] = "optgroup";
  TAG_NAMES3["OPTION"] = "option";
  TAG_NAMES3["P"] = "p";
  TAG_NAMES3["PARAM"] = "param";
  TAG_NAMES3["PLAINTEXT"] = "plaintext";
  TAG_NAMES3["PRE"] = "pre";
  TAG_NAMES3["RB"] = "rb";
  TAG_NAMES3["RP"] = "rp";
  TAG_NAMES3["RT"] = "rt";
  TAG_NAMES3["RTC"] = "rtc";
  TAG_NAMES3["RUBY"] = "ruby";
  TAG_NAMES3["S"] = "s";
  TAG_NAMES3["SCRIPT"] = "script";
  TAG_NAMES3["SEARCH"] = "search";
  TAG_NAMES3["SECTION"] = "section";
  TAG_NAMES3["SELECT"] = "select";
  TAG_NAMES3["SOURCE"] = "source";
  TAG_NAMES3["SMALL"] = "small";
  TAG_NAMES3["SPAN"] = "span";
  TAG_NAMES3["STRIKE"] = "strike";
  TAG_NAMES3["STRONG"] = "strong";
  TAG_NAMES3["STYLE"] = "style";
  TAG_NAMES3["SUB"] = "sub";
  TAG_NAMES3["SUMMARY"] = "summary";
  TAG_NAMES3["SUP"] = "sup";
  TAG_NAMES3["TABLE"] = "table";
  TAG_NAMES3["TBODY"] = "tbody";
  TAG_NAMES3["TEMPLATE"] = "template";
  TAG_NAMES3["TEXTAREA"] = "textarea";
  TAG_NAMES3["TFOOT"] = "tfoot";
  TAG_NAMES3["TD"] = "td";
  TAG_NAMES3["TH"] = "th";
  TAG_NAMES3["THEAD"] = "thead";
  TAG_NAMES3["TITLE"] = "title";
  TAG_NAMES3["TR"] = "tr";
  TAG_NAMES3["TRACK"] = "track";
  TAG_NAMES3["TT"] = "tt";
  TAG_NAMES3["U"] = "u";
  TAG_NAMES3["UL"] = "ul";
  TAG_NAMES3["SVG"] = "svg";
  TAG_NAMES3["VAR"] = "var";
  TAG_NAMES3["WBR"] = "wbr";
  TAG_NAMES3["XMP"] = "xmp";
})(TAG_NAMES2 || (TAG_NAMES2 = {}));
var TAG_ID2;
(function(TAG_ID3) {
  TAG_ID3[TAG_ID3["UNKNOWN"] = 0] = "UNKNOWN";
  TAG_ID3[TAG_ID3["A"] = 1] = "A";
  TAG_ID3[TAG_ID3["ADDRESS"] = 2] = "ADDRESS";
  TAG_ID3[TAG_ID3["ANNOTATION_XML"] = 3] = "ANNOTATION_XML";
  TAG_ID3[TAG_ID3["APPLET"] = 4] = "APPLET";
  TAG_ID3[TAG_ID3["AREA"] = 5] = "AREA";
  TAG_ID3[TAG_ID3["ARTICLE"] = 6] = "ARTICLE";
  TAG_ID3[TAG_ID3["ASIDE"] = 7] = "ASIDE";
  TAG_ID3[TAG_ID3["B"] = 8] = "B";
  TAG_ID3[TAG_ID3["BASE"] = 9] = "BASE";
  TAG_ID3[TAG_ID3["BASEFONT"] = 10] = "BASEFONT";
  TAG_ID3[TAG_ID3["BGSOUND"] = 11] = "BGSOUND";
  TAG_ID3[TAG_ID3["BIG"] = 12] = "BIG";
  TAG_ID3[TAG_ID3["BLOCKQUOTE"] = 13] = "BLOCKQUOTE";
  TAG_ID3[TAG_ID3["BODY"] = 14] = "BODY";
  TAG_ID3[TAG_ID3["BR"] = 15] = "BR";
  TAG_ID3[TAG_ID3["BUTTON"] = 16] = "BUTTON";
  TAG_ID3[TAG_ID3["CAPTION"] = 17] = "CAPTION";
  TAG_ID3[TAG_ID3["CENTER"] = 18] = "CENTER";
  TAG_ID3[TAG_ID3["CODE"] = 19] = "CODE";
  TAG_ID3[TAG_ID3["COL"] = 20] = "COL";
  TAG_ID3[TAG_ID3["COLGROUP"] = 21] = "COLGROUP";
  TAG_ID3[TAG_ID3["DD"] = 22] = "DD";
  TAG_ID3[TAG_ID3["DESC"] = 23] = "DESC";
  TAG_ID3[TAG_ID3["DETAILS"] = 24] = "DETAILS";
  TAG_ID3[TAG_ID3["DIALOG"] = 25] = "DIALOG";
  TAG_ID3[TAG_ID3["DIR"] = 26] = "DIR";
  TAG_ID3[TAG_ID3["DIV"] = 27] = "DIV";
  TAG_ID3[TAG_ID3["DL"] = 28] = "DL";
  TAG_ID3[TAG_ID3["DT"] = 29] = "DT";
  TAG_ID3[TAG_ID3["EM"] = 30] = "EM";
  TAG_ID3[TAG_ID3["EMBED"] = 31] = "EMBED";
  TAG_ID3[TAG_ID3["FIELDSET"] = 32] = "FIELDSET";
  TAG_ID3[TAG_ID3["FIGCAPTION"] = 33] = "FIGCAPTION";
  TAG_ID3[TAG_ID3["FIGURE"] = 34] = "FIGURE";
  TAG_ID3[TAG_ID3["FONT"] = 35] = "FONT";
  TAG_ID3[TAG_ID3["FOOTER"] = 36] = "FOOTER";
  TAG_ID3[TAG_ID3["FOREIGN_OBJECT"] = 37] = "FOREIGN_OBJECT";
  TAG_ID3[TAG_ID3["FORM"] = 38] = "FORM";
  TAG_ID3[TAG_ID3["FRAME"] = 39] = "FRAME";
  TAG_ID3[TAG_ID3["FRAMESET"] = 40] = "FRAMESET";
  TAG_ID3[TAG_ID3["H1"] = 41] = "H1";
  TAG_ID3[TAG_ID3["H2"] = 42] = "H2";
  TAG_ID3[TAG_ID3["H3"] = 43] = "H3";
  TAG_ID3[TAG_ID3["H4"] = 44] = "H4";
  TAG_ID3[TAG_ID3["H5"] = 45] = "H5";
  TAG_ID3[TAG_ID3["H6"] = 46] = "H6";
  TAG_ID3[TAG_ID3["HEAD"] = 47] = "HEAD";
  TAG_ID3[TAG_ID3["HEADER"] = 48] = "HEADER";
  TAG_ID3[TAG_ID3["HGROUP"] = 49] = "HGROUP";
  TAG_ID3[TAG_ID3["HR"] = 50] = "HR";
  TAG_ID3[TAG_ID3["HTML"] = 51] = "HTML";
  TAG_ID3[TAG_ID3["I"] = 52] = "I";
  TAG_ID3[TAG_ID3["IMG"] = 53] = "IMG";
  TAG_ID3[TAG_ID3["IMAGE"] = 54] = "IMAGE";
  TAG_ID3[TAG_ID3["INPUT"] = 55] = "INPUT";
  TAG_ID3[TAG_ID3["IFRAME"] = 56] = "IFRAME";
  TAG_ID3[TAG_ID3["KEYGEN"] = 57] = "KEYGEN";
  TAG_ID3[TAG_ID3["LABEL"] = 58] = "LABEL";
  TAG_ID3[TAG_ID3["LI"] = 59] = "LI";
  TAG_ID3[TAG_ID3["LINK"] = 60] = "LINK";
  TAG_ID3[TAG_ID3["LISTING"] = 61] = "LISTING";
  TAG_ID3[TAG_ID3["MAIN"] = 62] = "MAIN";
  TAG_ID3[TAG_ID3["MALIGNMARK"] = 63] = "MALIGNMARK";
  TAG_ID3[TAG_ID3["MARQUEE"] = 64] = "MARQUEE";
  TAG_ID3[TAG_ID3["MATH"] = 65] = "MATH";
  TAG_ID3[TAG_ID3["MENU"] = 66] = "MENU";
  TAG_ID3[TAG_ID3["META"] = 67] = "META";
  TAG_ID3[TAG_ID3["MGLYPH"] = 68] = "MGLYPH";
  TAG_ID3[TAG_ID3["MI"] = 69] = "MI";
  TAG_ID3[TAG_ID3["MO"] = 70] = "MO";
  TAG_ID3[TAG_ID3["MN"] = 71] = "MN";
  TAG_ID3[TAG_ID3["MS"] = 72] = "MS";
  TAG_ID3[TAG_ID3["MTEXT"] = 73] = "MTEXT";
  TAG_ID3[TAG_ID3["NAV"] = 74] = "NAV";
  TAG_ID3[TAG_ID3["NOBR"] = 75] = "NOBR";
  TAG_ID3[TAG_ID3["NOFRAMES"] = 76] = "NOFRAMES";
  TAG_ID3[TAG_ID3["NOEMBED"] = 77] = "NOEMBED";
  TAG_ID3[TAG_ID3["NOSCRIPT"] = 78] = "NOSCRIPT";
  TAG_ID3[TAG_ID3["OBJECT"] = 79] = "OBJECT";
  TAG_ID3[TAG_ID3["OL"] = 80] = "OL";
  TAG_ID3[TAG_ID3["OPTGROUP"] = 81] = "OPTGROUP";
  TAG_ID3[TAG_ID3["OPTION"] = 82] = "OPTION";
  TAG_ID3[TAG_ID3["P"] = 83] = "P";
  TAG_ID3[TAG_ID3["PARAM"] = 84] = "PARAM";
  TAG_ID3[TAG_ID3["PLAINTEXT"] = 85] = "PLAINTEXT";
  TAG_ID3[TAG_ID3["PRE"] = 86] = "PRE";
  TAG_ID3[TAG_ID3["RB"] = 87] = "RB";
  TAG_ID3[TAG_ID3["RP"] = 88] = "RP";
  TAG_ID3[TAG_ID3["RT"] = 89] = "RT";
  TAG_ID3[TAG_ID3["RTC"] = 90] = "RTC";
  TAG_ID3[TAG_ID3["RUBY"] = 91] = "RUBY";
  TAG_ID3[TAG_ID3["S"] = 92] = "S";
  TAG_ID3[TAG_ID3["SCRIPT"] = 93] = "SCRIPT";
  TAG_ID3[TAG_ID3["SEARCH"] = 94] = "SEARCH";
  TAG_ID3[TAG_ID3["SECTION"] = 95] = "SECTION";
  TAG_ID3[TAG_ID3["SELECT"] = 96] = "SELECT";
  TAG_ID3[TAG_ID3["SOURCE"] = 97] = "SOURCE";
  TAG_ID3[TAG_ID3["SMALL"] = 98] = "SMALL";
  TAG_ID3[TAG_ID3["SPAN"] = 99] = "SPAN";
  TAG_ID3[TAG_ID3["STRIKE"] = 100] = "STRIKE";
  TAG_ID3[TAG_ID3["STRONG"] = 101] = "STRONG";
  TAG_ID3[TAG_ID3["STYLE"] = 102] = "STYLE";
  TAG_ID3[TAG_ID3["SUB"] = 103] = "SUB";
  TAG_ID3[TAG_ID3["SUMMARY"] = 104] = "SUMMARY";
  TAG_ID3[TAG_ID3["SUP"] = 105] = "SUP";
  TAG_ID3[TAG_ID3["TABLE"] = 106] = "TABLE";
  TAG_ID3[TAG_ID3["TBODY"] = 107] = "TBODY";
  TAG_ID3[TAG_ID3["TEMPLATE"] = 108] = "TEMPLATE";
  TAG_ID3[TAG_ID3["TEXTAREA"] = 109] = "TEXTAREA";
  TAG_ID3[TAG_ID3["TFOOT"] = 110] = "TFOOT";
  TAG_ID3[TAG_ID3["TD"] = 111] = "TD";
  TAG_ID3[TAG_ID3["TH"] = 112] = "TH";
  TAG_ID3[TAG_ID3["THEAD"] = 113] = "THEAD";
  TAG_ID3[TAG_ID3["TITLE"] = 114] = "TITLE";
  TAG_ID3[TAG_ID3["TR"] = 115] = "TR";
  TAG_ID3[TAG_ID3["TRACK"] = 116] = "TRACK";
  TAG_ID3[TAG_ID3["TT"] = 117] = "TT";
  TAG_ID3[TAG_ID3["U"] = 118] = "U";
  TAG_ID3[TAG_ID3["UL"] = 119] = "UL";
  TAG_ID3[TAG_ID3["SVG"] = 120] = "SVG";
  TAG_ID3[TAG_ID3["VAR"] = 121] = "VAR";
  TAG_ID3[TAG_ID3["WBR"] = 122] = "WBR";
  TAG_ID3[TAG_ID3["XMP"] = 123] = "XMP";
})(TAG_ID2 || (TAG_ID2 = {}));
var TAG_NAME_TO_ID2 = /* @__PURE__ */ new Map([
  [TAG_NAMES2.A, TAG_ID2.A],
  [TAG_NAMES2.ADDRESS, TAG_ID2.ADDRESS],
  [TAG_NAMES2.ANNOTATION_XML, TAG_ID2.ANNOTATION_XML],
  [TAG_NAMES2.APPLET, TAG_ID2.APPLET],
  [TAG_NAMES2.AREA, TAG_ID2.AREA],
  [TAG_NAMES2.ARTICLE, TAG_ID2.ARTICLE],
  [TAG_NAMES2.ASIDE, TAG_ID2.ASIDE],
  [TAG_NAMES2.B, TAG_ID2.B],
  [TAG_NAMES2.BASE, TAG_ID2.BASE],
  [TAG_NAMES2.BASEFONT, TAG_ID2.BASEFONT],
  [TAG_NAMES2.BGSOUND, TAG_ID2.BGSOUND],
  [TAG_NAMES2.BIG, TAG_ID2.BIG],
  [TAG_NAMES2.BLOCKQUOTE, TAG_ID2.BLOCKQUOTE],
  [TAG_NAMES2.BODY, TAG_ID2.BODY],
  [TAG_NAMES2.BR, TAG_ID2.BR],
  [TAG_NAMES2.BUTTON, TAG_ID2.BUTTON],
  [TAG_NAMES2.CAPTION, TAG_ID2.CAPTION],
  [TAG_NAMES2.CENTER, TAG_ID2.CENTER],
  [TAG_NAMES2.CODE, TAG_ID2.CODE],
  [TAG_NAMES2.COL, TAG_ID2.COL],
  [TAG_NAMES2.COLGROUP, TAG_ID2.COLGROUP],
  [TAG_NAMES2.DD, TAG_ID2.DD],
  [TAG_NAMES2.DESC, TAG_ID2.DESC],
  [TAG_NAMES2.DETAILS, TAG_ID2.DETAILS],
  [TAG_NAMES2.DIALOG, TAG_ID2.DIALOG],
  [TAG_NAMES2.DIR, TAG_ID2.DIR],
  [TAG_NAMES2.DIV, TAG_ID2.DIV],
  [TAG_NAMES2.DL, TAG_ID2.DL],
  [TAG_NAMES2.DT, TAG_ID2.DT],
  [TAG_NAMES2.EM, TAG_ID2.EM],
  [TAG_NAMES2.EMBED, TAG_ID2.EMBED],
  [TAG_NAMES2.FIELDSET, TAG_ID2.FIELDSET],
  [TAG_NAMES2.FIGCAPTION, TAG_ID2.FIGCAPTION],
  [TAG_NAMES2.FIGURE, TAG_ID2.FIGURE],
  [TAG_NAMES2.FONT, TAG_ID2.FONT],
  [TAG_NAMES2.FOOTER, TAG_ID2.FOOTER],
  [TAG_NAMES2.FOREIGN_OBJECT, TAG_ID2.FOREIGN_OBJECT],
  [TAG_NAMES2.FORM, TAG_ID2.FORM],
  [TAG_NAMES2.FRAME, TAG_ID2.FRAME],
  [TAG_NAMES2.FRAMESET, TAG_ID2.FRAMESET],
  [TAG_NAMES2.H1, TAG_ID2.H1],
  [TAG_NAMES2.H2, TAG_ID2.H2],
  [TAG_NAMES2.H3, TAG_ID2.H3],
  [TAG_NAMES2.H4, TAG_ID2.H4],
  [TAG_NAMES2.H5, TAG_ID2.H5],
  [TAG_NAMES2.H6, TAG_ID2.H6],
  [TAG_NAMES2.HEAD, TAG_ID2.HEAD],
  [TAG_NAMES2.HEADER, TAG_ID2.HEADER],
  [TAG_NAMES2.HGROUP, TAG_ID2.HGROUP],
  [TAG_NAMES2.HR, TAG_ID2.HR],
  [TAG_NAMES2.HTML, TAG_ID2.HTML],
  [TAG_NAMES2.I, TAG_ID2.I],
  [TAG_NAMES2.IMG, TAG_ID2.IMG],
  [TAG_NAMES2.IMAGE, TAG_ID2.IMAGE],
  [TAG_NAMES2.INPUT, TAG_ID2.INPUT],
  [TAG_NAMES2.IFRAME, TAG_ID2.IFRAME],
  [TAG_NAMES2.KEYGEN, TAG_ID2.KEYGEN],
  [TAG_NAMES2.LABEL, TAG_ID2.LABEL],
  [TAG_NAMES2.LI, TAG_ID2.LI],
  [TAG_NAMES2.LINK, TAG_ID2.LINK],
  [TAG_NAMES2.LISTING, TAG_ID2.LISTING],
  [TAG_NAMES2.MAIN, TAG_ID2.MAIN],
  [TAG_NAMES2.MALIGNMARK, TAG_ID2.MALIGNMARK],
  [TAG_NAMES2.MARQUEE, TAG_ID2.MARQUEE],
  [TAG_NAMES2.MATH, TAG_ID2.MATH],
  [TAG_NAMES2.MENU, TAG_ID2.MENU],
  [TAG_NAMES2.META, TAG_ID2.META],
  [TAG_NAMES2.MGLYPH, TAG_ID2.MGLYPH],
  [TAG_NAMES2.MI, TAG_ID2.MI],
  [TAG_NAMES2.MO, TAG_ID2.MO],
  [TAG_NAMES2.MN, TAG_ID2.MN],
  [TAG_NAMES2.MS, TAG_ID2.MS],
  [TAG_NAMES2.MTEXT, TAG_ID2.MTEXT],
  [TAG_NAMES2.NAV, TAG_ID2.NAV],
  [TAG_NAMES2.NOBR, TAG_ID2.NOBR],
  [TAG_NAMES2.NOFRAMES, TAG_ID2.NOFRAMES],
  [TAG_NAMES2.NOEMBED, TAG_ID2.NOEMBED],
  [TAG_NAMES2.NOSCRIPT, TAG_ID2.NOSCRIPT],
  [TAG_NAMES2.OBJECT, TAG_ID2.OBJECT],
  [TAG_NAMES2.OL, TAG_ID2.OL],
  [TAG_NAMES2.OPTGROUP, TAG_ID2.OPTGROUP],
  [TAG_NAMES2.OPTION, TAG_ID2.OPTION],
  [TAG_NAMES2.P, TAG_ID2.P],
  [TAG_NAMES2.PARAM, TAG_ID2.PARAM],
  [TAG_NAMES2.PLAINTEXT, TAG_ID2.PLAINTEXT],
  [TAG_NAMES2.PRE, TAG_ID2.PRE],
  [TAG_NAMES2.RB, TAG_ID2.RB],
  [TAG_NAMES2.RP, TAG_ID2.RP],
  [TAG_NAMES2.RT, TAG_ID2.RT],
  [TAG_NAMES2.RTC, TAG_ID2.RTC],
  [TAG_NAMES2.RUBY, TAG_ID2.RUBY],
  [TAG_NAMES2.S, TAG_ID2.S],
  [TAG_NAMES2.SCRIPT, TAG_ID2.SCRIPT],
  [TAG_NAMES2.SEARCH, TAG_ID2.SEARCH],
  [TAG_NAMES2.SECTION, TAG_ID2.SECTION],
  [TAG_NAMES2.SELECT, TAG_ID2.SELECT],
  [TAG_NAMES2.SOURCE, TAG_ID2.SOURCE],
  [TAG_NAMES2.SMALL, TAG_ID2.SMALL],
  [TAG_NAMES2.SPAN, TAG_ID2.SPAN],
  [TAG_NAMES2.STRIKE, TAG_ID2.STRIKE],
  [TAG_NAMES2.STRONG, TAG_ID2.STRONG],
  [TAG_NAMES2.STYLE, TAG_ID2.STYLE],
  [TAG_NAMES2.SUB, TAG_ID2.SUB],
  [TAG_NAMES2.SUMMARY, TAG_ID2.SUMMARY],
  [TAG_NAMES2.SUP, TAG_ID2.SUP],
  [TAG_NAMES2.TABLE, TAG_ID2.TABLE],
  [TAG_NAMES2.TBODY, TAG_ID2.TBODY],
  [TAG_NAMES2.TEMPLATE, TAG_ID2.TEMPLATE],
  [TAG_NAMES2.TEXTAREA, TAG_ID2.TEXTAREA],
  [TAG_NAMES2.TFOOT, TAG_ID2.TFOOT],
  [TAG_NAMES2.TD, TAG_ID2.TD],
  [TAG_NAMES2.TH, TAG_ID2.TH],
  [TAG_NAMES2.THEAD, TAG_ID2.THEAD],
  [TAG_NAMES2.TITLE, TAG_ID2.TITLE],
  [TAG_NAMES2.TR, TAG_ID2.TR],
  [TAG_NAMES2.TRACK, TAG_ID2.TRACK],
  [TAG_NAMES2.TT, TAG_ID2.TT],
  [TAG_NAMES2.U, TAG_ID2.U],
  [TAG_NAMES2.UL, TAG_ID2.UL],
  [TAG_NAMES2.SVG, TAG_ID2.SVG],
  [TAG_NAMES2.VAR, TAG_ID2.VAR],
  [TAG_NAMES2.WBR, TAG_ID2.WBR],
  [TAG_NAMES2.XMP, TAG_ID2.XMP]
]);
function getTagID2(tagName) {
  var _a5;
  return (_a5 = TAG_NAME_TO_ID2.get(tagName)) !== null && _a5 !== void 0 ? _a5 : TAG_ID2.UNKNOWN;
}
var $3 = TAG_ID2;
var SPECIAL_ELEMENTS2 = {
  [NS2.HTML]: /* @__PURE__ */ new Set([
    $3.ADDRESS,
    $3.APPLET,
    $3.AREA,
    $3.ARTICLE,
    $3.ASIDE,
    $3.BASE,
    $3.BASEFONT,
    $3.BGSOUND,
    $3.BLOCKQUOTE,
    $3.BODY,
    $3.BR,
    $3.BUTTON,
    $3.CAPTION,
    $3.CENTER,
    $3.COL,
    $3.COLGROUP,
    $3.DD,
    $3.DETAILS,
    $3.DIR,
    $3.DIV,
    $3.DL,
    $3.DT,
    $3.EMBED,
    $3.FIELDSET,
    $3.FIGCAPTION,
    $3.FIGURE,
    $3.FOOTER,
    $3.FORM,
    $3.FRAME,
    $3.FRAMESET,
    $3.H1,
    $3.H2,
    $3.H3,
    $3.H4,
    $3.H5,
    $3.H6,
    $3.HEAD,
    $3.HEADER,
    $3.HGROUP,
    $3.HR,
    $3.HTML,
    $3.IFRAME,
    $3.IMG,
    $3.INPUT,
    $3.LI,
    $3.LINK,
    $3.LISTING,
    $3.MAIN,
    $3.MARQUEE,
    $3.MENU,
    $3.META,
    $3.NAV,
    $3.NOEMBED,
    $3.NOFRAMES,
    $3.NOSCRIPT,
    $3.OBJECT,
    $3.OL,
    $3.P,
    $3.PARAM,
    $3.PLAINTEXT,
    $3.PRE,
    $3.SCRIPT,
    $3.SECTION,
    $3.SELECT,
    $3.SOURCE,
    $3.STYLE,
    $3.SUMMARY,
    $3.TABLE,
    $3.TBODY,
    $3.TD,
    $3.TEMPLATE,
    $3.TEXTAREA,
    $3.TFOOT,
    $3.TH,
    $3.THEAD,
    $3.TITLE,
    $3.TR,
    $3.TRACK,
    $3.UL,
    $3.WBR,
    $3.XMP
  ]),
  [NS2.MATHML]: /* @__PURE__ */ new Set([$3.MI, $3.MO, $3.MN, $3.MS, $3.MTEXT, $3.ANNOTATION_XML]),
  [NS2.SVG]: /* @__PURE__ */ new Set([$3.TITLE, $3.FOREIGN_OBJECT, $3.DESC]),
  [NS2.XLINK]: /* @__PURE__ */ new Set(),
  [NS2.XML]: /* @__PURE__ */ new Set(),
  [NS2.XMLNS]: /* @__PURE__ */ new Set()
};
var NUMBERED_HEADERS2 = /* @__PURE__ */ new Set([$3.H1, $3.H2, $3.H3, $3.H4, $3.H5, $3.H6]);
var UNESCAPED_TEXT2 = /* @__PURE__ */ new Set([
  TAG_NAMES2.STYLE,
  TAG_NAMES2.SCRIPT,
  TAG_NAMES2.XMP,
  TAG_NAMES2.IFRAME,
  TAG_NAMES2.NOEMBED,
  TAG_NAMES2.NOFRAMES,
  TAG_NAMES2.PLAINTEXT
]);
function hasUnescapedText2(tn, scriptingEnabled) {
  return UNESCAPED_TEXT2.has(tn) || scriptingEnabled && tn === TAG_NAMES2.NOSCRIPT;
}

// node_modules/@parse5/tools/node_modules/parse5/dist/tokenizer/index.js
var State2;
(function(State3) {
  State3[State3["DATA"] = 0] = "DATA";
  State3[State3["RCDATA"] = 1] = "RCDATA";
  State3[State3["RAWTEXT"] = 2] = "RAWTEXT";
  State3[State3["SCRIPT_DATA"] = 3] = "SCRIPT_DATA";
  State3[State3["PLAINTEXT"] = 4] = "PLAINTEXT";
  State3[State3["TAG_OPEN"] = 5] = "TAG_OPEN";
  State3[State3["END_TAG_OPEN"] = 6] = "END_TAG_OPEN";
  State3[State3["TAG_NAME"] = 7] = "TAG_NAME";
  State3[State3["RCDATA_LESS_THAN_SIGN"] = 8] = "RCDATA_LESS_THAN_SIGN";
  State3[State3["RCDATA_END_TAG_OPEN"] = 9] = "RCDATA_END_TAG_OPEN";
  State3[State3["RCDATA_END_TAG_NAME"] = 10] = "RCDATA_END_TAG_NAME";
  State3[State3["RAWTEXT_LESS_THAN_SIGN"] = 11] = "RAWTEXT_LESS_THAN_SIGN";
  State3[State3["RAWTEXT_END_TAG_OPEN"] = 12] = "RAWTEXT_END_TAG_OPEN";
  State3[State3["RAWTEXT_END_TAG_NAME"] = 13] = "RAWTEXT_END_TAG_NAME";
  State3[State3["SCRIPT_DATA_LESS_THAN_SIGN"] = 14] = "SCRIPT_DATA_LESS_THAN_SIGN";
  State3[State3["SCRIPT_DATA_END_TAG_OPEN"] = 15] = "SCRIPT_DATA_END_TAG_OPEN";
  State3[State3["SCRIPT_DATA_END_TAG_NAME"] = 16] = "SCRIPT_DATA_END_TAG_NAME";
  State3[State3["SCRIPT_DATA_ESCAPE_START"] = 17] = "SCRIPT_DATA_ESCAPE_START";
  State3[State3["SCRIPT_DATA_ESCAPE_START_DASH"] = 18] = "SCRIPT_DATA_ESCAPE_START_DASH";
  State3[State3["SCRIPT_DATA_ESCAPED"] = 19] = "SCRIPT_DATA_ESCAPED";
  State3[State3["SCRIPT_DATA_ESCAPED_DASH"] = 20] = "SCRIPT_DATA_ESCAPED_DASH";
  State3[State3["SCRIPT_DATA_ESCAPED_DASH_DASH"] = 21] = "SCRIPT_DATA_ESCAPED_DASH_DASH";
  State3[State3["SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN"] = 22] = "SCRIPT_DATA_ESCAPED_LESS_THAN_SIGN";
  State3[State3["SCRIPT_DATA_ESCAPED_END_TAG_OPEN"] = 23] = "SCRIPT_DATA_ESCAPED_END_TAG_OPEN";
  State3[State3["SCRIPT_DATA_ESCAPED_END_TAG_NAME"] = 24] = "SCRIPT_DATA_ESCAPED_END_TAG_NAME";
  State3[State3["SCRIPT_DATA_DOUBLE_ESCAPE_START"] = 25] = "SCRIPT_DATA_DOUBLE_ESCAPE_START";
  State3[State3["SCRIPT_DATA_DOUBLE_ESCAPED"] = 26] = "SCRIPT_DATA_DOUBLE_ESCAPED";
  State3[State3["SCRIPT_DATA_DOUBLE_ESCAPED_DASH"] = 27] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH";
  State3[State3["SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH"] = 28] = "SCRIPT_DATA_DOUBLE_ESCAPED_DASH_DASH";
  State3[State3["SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN"] = 29] = "SCRIPT_DATA_DOUBLE_ESCAPED_LESS_THAN_SIGN";
  State3[State3["SCRIPT_DATA_DOUBLE_ESCAPE_END"] = 30] = "SCRIPT_DATA_DOUBLE_ESCAPE_END";
  State3[State3["BEFORE_ATTRIBUTE_NAME"] = 31] = "BEFORE_ATTRIBUTE_NAME";
  State3[State3["ATTRIBUTE_NAME"] = 32] = "ATTRIBUTE_NAME";
  State3[State3["AFTER_ATTRIBUTE_NAME"] = 33] = "AFTER_ATTRIBUTE_NAME";
  State3[State3["BEFORE_ATTRIBUTE_VALUE"] = 34] = "BEFORE_ATTRIBUTE_VALUE";
  State3[State3["ATTRIBUTE_VALUE_DOUBLE_QUOTED"] = 35] = "ATTRIBUTE_VALUE_DOUBLE_QUOTED";
  State3[State3["ATTRIBUTE_VALUE_SINGLE_QUOTED"] = 36] = "ATTRIBUTE_VALUE_SINGLE_QUOTED";
  State3[State3["ATTRIBUTE_VALUE_UNQUOTED"] = 37] = "ATTRIBUTE_VALUE_UNQUOTED";
  State3[State3["AFTER_ATTRIBUTE_VALUE_QUOTED"] = 38] = "AFTER_ATTRIBUTE_VALUE_QUOTED";
  State3[State3["SELF_CLOSING_START_TAG"] = 39] = "SELF_CLOSING_START_TAG";
  State3[State3["BOGUS_COMMENT"] = 40] = "BOGUS_COMMENT";
  State3[State3["MARKUP_DECLARATION_OPEN"] = 41] = "MARKUP_DECLARATION_OPEN";
  State3[State3["COMMENT_START"] = 42] = "COMMENT_START";
  State3[State3["COMMENT_START_DASH"] = 43] = "COMMENT_START_DASH";
  State3[State3["COMMENT"] = 44] = "COMMENT";
  State3[State3["COMMENT_LESS_THAN_SIGN"] = 45] = "COMMENT_LESS_THAN_SIGN";
  State3[State3["COMMENT_LESS_THAN_SIGN_BANG"] = 46] = "COMMENT_LESS_THAN_SIGN_BANG";
  State3[State3["COMMENT_LESS_THAN_SIGN_BANG_DASH"] = 47] = "COMMENT_LESS_THAN_SIGN_BANG_DASH";
  State3[State3["COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH"] = 48] = "COMMENT_LESS_THAN_SIGN_BANG_DASH_DASH";
  State3[State3["COMMENT_END_DASH"] = 49] = "COMMENT_END_DASH";
  State3[State3["COMMENT_END"] = 50] = "COMMENT_END";
  State3[State3["COMMENT_END_BANG"] = 51] = "COMMENT_END_BANG";
  State3[State3["DOCTYPE"] = 52] = "DOCTYPE";
  State3[State3["BEFORE_DOCTYPE_NAME"] = 53] = "BEFORE_DOCTYPE_NAME";
  State3[State3["DOCTYPE_NAME"] = 54] = "DOCTYPE_NAME";
  State3[State3["AFTER_DOCTYPE_NAME"] = 55] = "AFTER_DOCTYPE_NAME";
  State3[State3["AFTER_DOCTYPE_PUBLIC_KEYWORD"] = 56] = "AFTER_DOCTYPE_PUBLIC_KEYWORD";
  State3[State3["BEFORE_DOCTYPE_PUBLIC_IDENTIFIER"] = 57] = "BEFORE_DOCTYPE_PUBLIC_IDENTIFIER";
  State3[State3["DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED"] = 58] = "DOCTYPE_PUBLIC_IDENTIFIER_DOUBLE_QUOTED";
  State3[State3["DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED"] = 59] = "DOCTYPE_PUBLIC_IDENTIFIER_SINGLE_QUOTED";
  State3[State3["AFTER_DOCTYPE_PUBLIC_IDENTIFIER"] = 60] = "AFTER_DOCTYPE_PUBLIC_IDENTIFIER";
  State3[State3["BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS"] = 61] = "BETWEEN_DOCTYPE_PUBLIC_AND_SYSTEM_IDENTIFIERS";
  State3[State3["AFTER_DOCTYPE_SYSTEM_KEYWORD"] = 62] = "AFTER_DOCTYPE_SYSTEM_KEYWORD";
  State3[State3["BEFORE_DOCTYPE_SYSTEM_IDENTIFIER"] = 63] = "BEFORE_DOCTYPE_SYSTEM_IDENTIFIER";
  State3[State3["DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED"] = 64] = "DOCTYPE_SYSTEM_IDENTIFIER_DOUBLE_QUOTED";
  State3[State3["DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED"] = 65] = "DOCTYPE_SYSTEM_IDENTIFIER_SINGLE_QUOTED";
  State3[State3["AFTER_DOCTYPE_SYSTEM_IDENTIFIER"] = 66] = "AFTER_DOCTYPE_SYSTEM_IDENTIFIER";
  State3[State3["BOGUS_DOCTYPE"] = 67] = "BOGUS_DOCTYPE";
  State3[State3["CDATA_SECTION"] = 68] = "CDATA_SECTION";
  State3[State3["CDATA_SECTION_BRACKET"] = 69] = "CDATA_SECTION_BRACKET";
  State3[State3["CDATA_SECTION_END"] = 70] = "CDATA_SECTION_END";
  State3[State3["CHARACTER_REFERENCE"] = 71] = "CHARACTER_REFERENCE";
  State3[State3["AMBIGUOUS_AMPERSAND"] = 72] = "AMBIGUOUS_AMPERSAND";
})(State2 || (State2 = {}));
var TokenizerMode2 = {
  DATA: State2.DATA,
  RCDATA: State2.RCDATA,
  RAWTEXT: State2.RAWTEXT,
  SCRIPT_DATA: State2.SCRIPT_DATA,
  PLAINTEXT: State2.PLAINTEXT,
  CDATA_SECTION: State2.CDATA_SECTION
};

// node_modules/@parse5/tools/node_modules/parse5/dist/parser/open-element-stack.js
var IMPLICIT_END_TAG_REQUIRED2 = /* @__PURE__ */ new Set([TAG_ID2.DD, TAG_ID2.DT, TAG_ID2.LI, TAG_ID2.OPTGROUP, TAG_ID2.OPTION, TAG_ID2.P, TAG_ID2.RB, TAG_ID2.RP, TAG_ID2.RT, TAG_ID2.RTC]);
var IMPLICIT_END_TAG_REQUIRED_THOROUGHLY2 = /* @__PURE__ */ new Set([
  ...IMPLICIT_END_TAG_REQUIRED2,
  TAG_ID2.CAPTION,
  TAG_ID2.COLGROUP,
  TAG_ID2.TBODY,
  TAG_ID2.TD,
  TAG_ID2.TFOOT,
  TAG_ID2.TH,
  TAG_ID2.THEAD,
  TAG_ID2.TR
]);
var SCOPING_ELEMENTS_HTML2 = /* @__PURE__ */ new Set([
  TAG_ID2.APPLET,
  TAG_ID2.CAPTION,
  TAG_ID2.HTML,
  TAG_ID2.MARQUEE,
  TAG_ID2.OBJECT,
  TAG_ID2.TABLE,
  TAG_ID2.TD,
  TAG_ID2.TEMPLATE,
  TAG_ID2.TH
]);
var SCOPING_ELEMENTS_HTML_LIST2 = /* @__PURE__ */ new Set([...SCOPING_ELEMENTS_HTML2, TAG_ID2.OL, TAG_ID2.UL]);
var SCOPING_ELEMENTS_HTML_BUTTON2 = /* @__PURE__ */ new Set([...SCOPING_ELEMENTS_HTML2, TAG_ID2.BUTTON]);
var SCOPING_ELEMENTS_MATHML2 = /* @__PURE__ */ new Set([TAG_ID2.ANNOTATION_XML, TAG_ID2.MI, TAG_ID2.MN, TAG_ID2.MO, TAG_ID2.MS, TAG_ID2.MTEXT]);
var SCOPING_ELEMENTS_SVG2 = /* @__PURE__ */ new Set([TAG_ID2.DESC, TAG_ID2.FOREIGN_OBJECT, TAG_ID2.TITLE]);
var TABLE_ROW_CONTEXT2 = /* @__PURE__ */ new Set([TAG_ID2.TR, TAG_ID2.TEMPLATE, TAG_ID2.HTML]);
var TABLE_BODY_CONTEXT2 = /* @__PURE__ */ new Set([TAG_ID2.TBODY, TAG_ID2.TFOOT, TAG_ID2.THEAD, TAG_ID2.TEMPLATE, TAG_ID2.HTML]);
var TABLE_CONTEXT2 = /* @__PURE__ */ new Set([TAG_ID2.TABLE, TAG_ID2.TEMPLATE, TAG_ID2.HTML]);
var TABLE_CELLS2 = /* @__PURE__ */ new Set([TAG_ID2.TD, TAG_ID2.TH]);

// node_modules/@parse5/tools/node_modules/parse5/dist/parser/formatting-element-list.js
var EntryType2;
(function(EntryType3) {
  EntryType3[EntryType3["Marker"] = 0] = "Marker";
  EntryType3[EntryType3["Element"] = 1] = "Element";
})(EntryType2 || (EntryType2 = {}));
var MARKER2 = { type: EntryType2.Marker };

// node_modules/@parse5/tools/node_modules/parse5/dist/tree-adapters/default.js
var defaultTreeAdapter2 = {
  //Node construction
  createDocument() {
    return {
      nodeName: "#document",
      mode: DOCUMENT_MODE2.NO_QUIRKS,
      childNodes: []
    };
  },
  createDocumentFragment() {
    return {
      nodeName: "#document-fragment",
      childNodes: []
    };
  },
  createElement(tagName, namespaceURI, attrs) {
    return {
      nodeName: tagName,
      tagName,
      attrs,
      namespaceURI,
      childNodes: [],
      parentNode: null
    };
  },
  createCommentNode(data) {
    return {
      nodeName: "#comment",
      data,
      parentNode: null
    };
  },
  createTextNode(value) {
    return {
      nodeName: "#text",
      value,
      parentNode: null
    };
  },
  //Tree mutation
  appendChild(parentNode, newNode) {
    parentNode.childNodes.push(newNode);
    newNode.parentNode = parentNode;
  },
  insertBefore(parentNode, newNode, referenceNode) {
    const insertionIdx = parentNode.childNodes.indexOf(referenceNode);
    parentNode.childNodes.splice(insertionIdx, 0, newNode);
    newNode.parentNode = parentNode;
  },
  setTemplateContent(templateElement, contentElement) {
    templateElement.content = contentElement;
  },
  getTemplateContent(templateElement) {
    return templateElement.content;
  },
  setDocumentType(document3, name, publicId, systemId) {
    const doctypeNode = document3.childNodes.find((node) => node.nodeName === "#documentType");
    if (doctypeNode) {
      doctypeNode.name = name;
      doctypeNode.publicId = publicId;
      doctypeNode.systemId = systemId;
    } else {
      const node = {
        nodeName: "#documentType",
        name,
        publicId,
        systemId,
        parentNode: null
      };
      defaultTreeAdapter2.appendChild(document3, node);
    }
  },
  setDocumentMode(document3, mode) {
    document3.mode = mode;
  },
  getDocumentMode(document3) {
    return document3.mode;
  },
  detachNode(node) {
    if (node.parentNode) {
      const idx = node.parentNode.childNodes.indexOf(node);
      node.parentNode.childNodes.splice(idx, 1);
      node.parentNode = null;
    }
  },
  insertText(parentNode, text) {
    if (parentNode.childNodes.length > 0) {
      const prevNode = parentNode.childNodes[parentNode.childNodes.length - 1];
      if (defaultTreeAdapter2.isTextNode(prevNode)) {
        prevNode.value += text;
        return;
      }
    }
    defaultTreeAdapter2.appendChild(parentNode, defaultTreeAdapter2.createTextNode(text));
  },
  insertTextBefore(parentNode, text, referenceNode) {
    const prevNode = parentNode.childNodes[parentNode.childNodes.indexOf(referenceNode) - 1];
    if (prevNode && defaultTreeAdapter2.isTextNode(prevNode)) {
      prevNode.value += text;
    } else {
      defaultTreeAdapter2.insertBefore(parentNode, defaultTreeAdapter2.createTextNode(text), referenceNode);
    }
  },
  adoptAttributes(recipient, attrs) {
    const recipientAttrsMap = new Set(recipient.attrs.map((attr) => attr.name));
    for (let j2 = 0; j2 < attrs.length; j2++) {
      if (!recipientAttrsMap.has(attrs[j2].name)) {
        recipient.attrs.push(attrs[j2]);
      }
    }
  },
  //Tree traversing
  getFirstChild(node) {
    return node.childNodes[0];
  },
  getChildNodes(node) {
    return node.childNodes;
  },
  getParentNode(node) {
    return node.parentNode;
  },
  getAttrList(element) {
    return element.attrs;
  },
  //Node data
  getTagName(element) {
    return element.tagName;
  },
  getNamespaceURI(element) {
    return element.namespaceURI;
  },
  getTextNodeContent(textNode) {
    return textNode.value;
  },
  getCommentNodeContent(commentNode) {
    return commentNode.data;
  },
  getDocumentTypeNodeName(doctypeNode) {
    return doctypeNode.name;
  },
  getDocumentTypeNodePublicId(doctypeNode) {
    return doctypeNode.publicId;
  },
  getDocumentTypeNodeSystemId(doctypeNode) {
    return doctypeNode.systemId;
  },
  //Node types
  isTextNode(node) {
    return node.nodeName === "#text";
  },
  isCommentNode(node) {
    return node.nodeName === "#comment";
  },
  isDocumentTypeNode(node) {
    return node.nodeName === "#documentType";
  },
  isElementNode(node) {
    return Object.prototype.hasOwnProperty.call(node, "tagName");
  },
  // Source code location
  setNodeSourceCodeLocation(node, location) {
    node.sourceCodeLocation = location;
  },
  getNodeSourceCodeLocation(node) {
    return node.sourceCodeLocation;
  },
  updateNodeSourceCodeLocation(node, endLocation) {
    node.sourceCodeLocation = { ...node.sourceCodeLocation, ...endLocation };
  }
};

// node_modules/@parse5/tools/node_modules/parse5/dist/common/doctype.js
var QUIRKS_MODE_PUBLIC_ID_PREFIXES2 = [
  "+//silmaril//dtd html pro v0r11 19970101//",
  "-//as//dtd html 3.0 aswedit + extensions//",
  "-//advasoft ltd//dtd html 3.0 aswedit + extensions//",
  "-//ietf//dtd html 2.0 level 1//",
  "-//ietf//dtd html 2.0 level 2//",
  "-//ietf//dtd html 2.0 strict level 1//",
  "-//ietf//dtd html 2.0 strict level 2//",
  "-//ietf//dtd html 2.0 strict//",
  "-//ietf//dtd html 2.0//",
  "-//ietf//dtd html 2.1e//",
  "-//ietf//dtd html 3.0//",
  "-//ietf//dtd html 3.2 final//",
  "-//ietf//dtd html 3.2//",
  "-//ietf//dtd html 3//",
  "-//ietf//dtd html level 0//",
  "-//ietf//dtd html level 1//",
  "-//ietf//dtd html level 2//",
  "-//ietf//dtd html level 3//",
  "-//ietf//dtd html strict level 0//",
  "-//ietf//dtd html strict level 1//",
  "-//ietf//dtd html strict level 2//",
  "-//ietf//dtd html strict level 3//",
  "-//ietf//dtd html strict//",
  "-//ietf//dtd html//",
  "-//metrius//dtd metrius presentational//",
  "-//microsoft//dtd internet explorer 2.0 html strict//",
  "-//microsoft//dtd internet explorer 2.0 html//",
  "-//microsoft//dtd internet explorer 2.0 tables//",
  "-//microsoft//dtd internet explorer 3.0 html strict//",
  "-//microsoft//dtd internet explorer 3.0 html//",
  "-//microsoft//dtd internet explorer 3.0 tables//",
  "-//netscape comm. corp.//dtd html//",
  "-//netscape comm. corp.//dtd strict html//",
  "-//o'reilly and associates//dtd html 2.0//",
  "-//o'reilly and associates//dtd html extended 1.0//",
  "-//o'reilly and associates//dtd html extended relaxed 1.0//",
  "-//sq//dtd html 2.0 hotmetal + extensions//",
  "-//softquad software//dtd hotmetal pro 6.0::19990601::extensions to html 4.0//",
  "-//softquad//dtd hotmetal pro 4.0::19971010::extensions to html 4.0//",
  "-//spyglass//dtd html 2.0 extended//",
  "-//sun microsystems corp.//dtd hotjava html//",
  "-//sun microsystems corp.//dtd hotjava strict html//",
  "-//w3c//dtd html 3 1995-03-24//",
  "-//w3c//dtd html 3.2 draft//",
  "-//w3c//dtd html 3.2 final//",
  "-//w3c//dtd html 3.2//",
  "-//w3c//dtd html 3.2s draft//",
  "-//w3c//dtd html 4.0 frameset//",
  "-//w3c//dtd html 4.0 transitional//",
  "-//w3c//dtd html experimental 19960712//",
  "-//w3c//dtd html experimental 970421//",
  "-//w3c//dtd w3 html//",
  "-//w3o//dtd w3 html 3.0//",
  "-//webtechs//dtd mozilla html 2.0//",
  "-//webtechs//dtd mozilla html//"
];
var QUIRKS_MODE_NO_SYSTEM_ID_PUBLIC_ID_PREFIXES2 = [
  ...QUIRKS_MODE_PUBLIC_ID_PREFIXES2,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
];
var LIMITED_QUIRKS_PUBLIC_ID_PREFIXES2 = ["-//w3c//dtd xhtml 1.0 frameset//", "-//w3c//dtd xhtml 1.0 transitional//"];
var LIMITED_QUIRKS_WITH_SYSTEM_ID_PUBLIC_ID_PREFIXES2 = [
  ...LIMITED_QUIRKS_PUBLIC_ID_PREFIXES2,
  "-//w3c//dtd html 4.01 frameset//",
  "-//w3c//dtd html 4.01 transitional//"
];

// node_modules/@parse5/tools/node_modules/parse5/dist/common/foreign-content.js
var SVG_ATTRS_ADJUSTMENT_MAP2 = new Map([
  "attributeName",
  "attributeType",
  "baseFrequency",
  "baseProfile",
  "calcMode",
  "clipPathUnits",
  "diffuseConstant",
  "edgeMode",
  "filterUnits",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "kernelMatrix",
  "kernelUnitLength",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "limitingConeAngle",
  "markerHeight",
  "markerUnits",
  "markerWidth",
  "maskContentUnits",
  "maskUnits",
  "numOctaves",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "refX",
  "refY",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "specularConstant",
  "specularExponent",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stitchTiles",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textLength",
  "viewBox",
  "viewTarget",
  "xChannelSelector",
  "yChannelSelector",
  "zoomAndPan"
].map((attr) => [attr.toLowerCase(), attr]));
var XML_ATTRS_ADJUSTMENT_MAP2 = /* @__PURE__ */ new Map([
  ["xlink:actuate", { prefix: "xlink", name: "actuate", namespace: NS2.XLINK }],
  ["xlink:arcrole", { prefix: "xlink", name: "arcrole", namespace: NS2.XLINK }],
  ["xlink:href", { prefix: "xlink", name: "href", namespace: NS2.XLINK }],
  ["xlink:role", { prefix: "xlink", name: "role", namespace: NS2.XLINK }],
  ["xlink:show", { prefix: "xlink", name: "show", namespace: NS2.XLINK }],
  ["xlink:title", { prefix: "xlink", name: "title", namespace: NS2.XLINK }],
  ["xlink:type", { prefix: "xlink", name: "type", namespace: NS2.XLINK }],
  ["xml:lang", { prefix: "xml", name: "lang", namespace: NS2.XML }],
  ["xml:space", { prefix: "xml", name: "space", namespace: NS2.XML }],
  ["xmlns", { prefix: "", name: "xmlns", namespace: NS2.XMLNS }],
  ["xmlns:xlink", { prefix: "xmlns", name: "xlink", namespace: NS2.XMLNS }]
]);
var SVG_TAG_NAMES_ADJUSTMENT_MAP2 = new Map([
  "altGlyph",
  "altGlyphDef",
  "altGlyphItem",
  "animateColor",
  "animateMotion",
  "animateTransform",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "glyphRef",
  "linearGradient",
  "radialGradient",
  "textPath"
].map((tn) => [tn.toLowerCase(), tn]));
var EXITS_FOREIGN_CONTENT2 = /* @__PURE__ */ new Set([
  TAG_ID2.B,
  TAG_ID2.BIG,
  TAG_ID2.BLOCKQUOTE,
  TAG_ID2.BODY,
  TAG_ID2.BR,
  TAG_ID2.CENTER,
  TAG_ID2.CODE,
  TAG_ID2.DD,
  TAG_ID2.DIV,
  TAG_ID2.DL,
  TAG_ID2.DT,
  TAG_ID2.EM,
  TAG_ID2.EMBED,
  TAG_ID2.H1,
  TAG_ID2.H2,
  TAG_ID2.H3,
  TAG_ID2.H4,
  TAG_ID2.H5,
  TAG_ID2.H6,
  TAG_ID2.HEAD,
  TAG_ID2.HR,
  TAG_ID2.I,
  TAG_ID2.IMG,
  TAG_ID2.LI,
  TAG_ID2.LISTING,
  TAG_ID2.MENU,
  TAG_ID2.META,
  TAG_ID2.NOBR,
  TAG_ID2.OL,
  TAG_ID2.P,
  TAG_ID2.PRE,
  TAG_ID2.RUBY,
  TAG_ID2.S,
  TAG_ID2.SMALL,
  TAG_ID2.SPAN,
  TAG_ID2.STRONG,
  TAG_ID2.STRIKE,
  TAG_ID2.SUB,
  TAG_ID2.SUP,
  TAG_ID2.TABLE,
  TAG_ID2.TT,
  TAG_ID2.U,
  TAG_ID2.UL,
  TAG_ID2.VAR
]);

// node_modules/@parse5/tools/node_modules/parse5/dist/parser/index.js
var InsertionMode2;
(function(InsertionMode3) {
  InsertionMode3[InsertionMode3["INITIAL"] = 0] = "INITIAL";
  InsertionMode3[InsertionMode3["BEFORE_HTML"] = 1] = "BEFORE_HTML";
  InsertionMode3[InsertionMode3["BEFORE_HEAD"] = 2] = "BEFORE_HEAD";
  InsertionMode3[InsertionMode3["IN_HEAD"] = 3] = "IN_HEAD";
  InsertionMode3[InsertionMode3["IN_HEAD_NO_SCRIPT"] = 4] = "IN_HEAD_NO_SCRIPT";
  InsertionMode3[InsertionMode3["AFTER_HEAD"] = 5] = "AFTER_HEAD";
  InsertionMode3[InsertionMode3["IN_BODY"] = 6] = "IN_BODY";
  InsertionMode3[InsertionMode3["TEXT"] = 7] = "TEXT";
  InsertionMode3[InsertionMode3["IN_TABLE"] = 8] = "IN_TABLE";
  InsertionMode3[InsertionMode3["IN_TABLE_TEXT"] = 9] = "IN_TABLE_TEXT";
  InsertionMode3[InsertionMode3["IN_CAPTION"] = 10] = "IN_CAPTION";
  InsertionMode3[InsertionMode3["IN_COLUMN_GROUP"] = 11] = "IN_COLUMN_GROUP";
  InsertionMode3[InsertionMode3["IN_TABLE_BODY"] = 12] = "IN_TABLE_BODY";
  InsertionMode3[InsertionMode3["IN_ROW"] = 13] = "IN_ROW";
  InsertionMode3[InsertionMode3["IN_CELL"] = 14] = "IN_CELL";
  InsertionMode3[InsertionMode3["IN_SELECT"] = 15] = "IN_SELECT";
  InsertionMode3[InsertionMode3["IN_SELECT_IN_TABLE"] = 16] = "IN_SELECT_IN_TABLE";
  InsertionMode3[InsertionMode3["IN_TEMPLATE"] = 17] = "IN_TEMPLATE";
  InsertionMode3[InsertionMode3["AFTER_BODY"] = 18] = "AFTER_BODY";
  InsertionMode3[InsertionMode3["IN_FRAMESET"] = 19] = "IN_FRAMESET";
  InsertionMode3[InsertionMode3["AFTER_FRAMESET"] = 20] = "AFTER_FRAMESET";
  InsertionMode3[InsertionMode3["AFTER_AFTER_BODY"] = 21] = "AFTER_AFTER_BODY";
  InsertionMode3[InsertionMode3["AFTER_AFTER_FRAMESET"] = 22] = "AFTER_AFTER_FRAMESET";
})(InsertionMode2 || (InsertionMode2 = {}));
var TABLE_STRUCTURE_TAGS2 = /* @__PURE__ */ new Set([TAG_ID2.TABLE, TAG_ID2.TBODY, TAG_ID2.TFOOT, TAG_ID2.THEAD, TAG_ID2.TR]);
var TABLE_VOID_ELEMENTS2 = /* @__PURE__ */ new Set([TAG_ID2.CAPTION, TAG_ID2.COL, TAG_ID2.COLGROUP, TAG_ID2.TBODY, TAG_ID2.TD, TAG_ID2.TFOOT, TAG_ID2.TH, TAG_ID2.THEAD, TAG_ID2.TR]);

// node_modules/@parse5/tools/node_modules/parse5/dist/serializer/index.js
var VOID_ELEMENTS2 = /* @__PURE__ */ new Set([
  TAG_NAMES2.AREA,
  TAG_NAMES2.BASE,
  TAG_NAMES2.BASEFONT,
  TAG_NAMES2.BGSOUND,
  TAG_NAMES2.BR,
  TAG_NAMES2.COL,
  TAG_NAMES2.EMBED,
  TAG_NAMES2.FRAME,
  TAG_NAMES2.HR,
  TAG_NAMES2.IMG,
  TAG_NAMES2.INPUT,
  TAG_NAMES2.KEYGEN,
  TAG_NAMES2.LINK,
  TAG_NAMES2.META,
  TAG_NAMES2.PARAM,
  TAG_NAMES2.SOURCE,
  TAG_NAMES2.TRACK,
  TAG_NAMES2.WBR
]);

// node_modules/@parse5/tools/lib/creation.js
var namespaceMap = {
  HTML: html_exports2.NS.HTML,
  XML: html_exports2.NS.XML,
  MATHML: html_exports2.NS.MATHML,
  SVG: html_exports2.NS.SVG,
  XLINK: html_exports2.NS.XLINK,
  XMLNS: html_exports2.NS.XMLNS
};

// node_modules/@parse5/tools/lib/typeGuards.js
function isDocument(node) {
  return node.nodeName === "#document";
}
function isDocumentFragment(node) {
  return node.nodeName === "#document-fragment";
}
function isTemplateNode(node) {
  return node.nodeName === "template";
}
var isElementNode = defaultTreeAdapter2.isElementNode;
var isCommentNode = defaultTreeAdapter2.isCommentNode;
var isDocumentTypeNode = defaultTreeAdapter2.isDocumentTypeNode;
var isTextNode = defaultTreeAdapter2.isTextNode;
function isParentNode(node) {
  return isDocument(node) || isDocumentFragment(node) || isElementNode(node) || isTemplateNode(node);
}

// node_modules/@parse5/tools/lib/treeMutation.js
var appendChild = defaultTreeAdapter2.appendChild;

// node_modules/@parse5/tools/lib/traverse.js
function traverse(node, visitor, parent) {
  const shouldVisitChildren = typeof visitor["pre:node"] !== "function" || visitor["pre:node"](node, parent) !== false;
  if (shouldVisitChildren && isParentNode(node)) {
    for (const child of node.childNodes) {
      traverse(child, visitor, node);
    }
  }
  if (typeof visitor.node === "function") {
    visitor.node(node, parent);
  }
  if (typeof visitor.document === "function" && isDocument(node)) {
    visitor.document(node);
  }
  if (typeof visitor.documentFragment === "function" && isDocumentFragment(node)) {
    visitor.documentFragment(node, parent);
  }
  if (typeof visitor.element === "function" && isElementNode(node)) {
    visitor.element(node, parent);
  }
  if (typeof visitor.template === "function" && isTemplateNode(node)) {
    visitor.template(node, parent);
  }
  if (typeof visitor.comment === "function" && isCommentNode(node)) {
    visitor.comment(node, parent);
  }
  if (typeof visitor.text === "function" && isTextNode(node)) {
    visitor.text(node, parent);
  }
  if (typeof visitor.documentType === "function" && isDocumentTypeNode(node)) {
    visitor.documentType(node, parent);
  }
}

// node_modules/@lit-labs/ssr-client/directives/render-light.js
var i7 = class extends i5 {
  render() {
  }
  update(e11) {
    const t7 = e11.parentNode;
    if ("function" == typeof t7.renderLight) return t7.renderLight();
  }
};
i7.t = true;
var o6 = e6(i7);
var s6 = (e11) => f4(e11)?.t;

// node_modules/@lit-labs/ssr/lib/reflected-attributes.js
var reflectedAttributesSource = [
  ["accept", [
    /*'form',*/
    "input"
  ]],
  [["accept-charset", "acceptCharset"], ["form"]],
  [["accesskey", "accessKey"], ["*"]],
  ["action", ["form"]],
  ["align", [
    /*'applet',*/
    "caption",
    "col",
    "colgroup",
    "hr",
    "iframe",
    "img",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "tr"
  ]],
  ["allow", ["iframe"]],
  ["alt", [
    /*'applet',*/
    "area",
    "img",
    "input"
  ]],
  ["async", ["script"]],
  ["autocapitalize", ["*"]],
  ["autocomplete", ["form", "input", "select", "textarea"]],
  ["autofocus", ["button", "input", "keygen", "select", "textarea"]],
  ["autoplay", ["audio", "video"]],
  ["background", [
    "body"
    /*'table', 'td', 'th'*/
  ]],
  [["bgcolor", "bgColor"], [
    "body",
    /*'col', 'colgroup',*/
    "marquee",
    "table",
    /*'tbody', 'tfoot',*/
    "td",
    "th",
    "tr"
  ]],
  ["border", ["img", "object", "table"]],
  ["buffered", [
    /*'audio', 'video'*/
  ]],
  ["capture", [
    /*'input'*/
  ]],
  ["challenge", [
    /*'keygen'*/
  ]],
  ["charset", [
    /*'meta',*/
    "script"
  ]],
  ["checked", [
    /*'command',*/
    "input"
  ]],
  ["cite", ["blockquote", "del", "ins", "q"]],
  [["class", "className"], ["*"]],
  ["code", [
    /*'applet'*/
  ]],
  ["codebase", [
    /*'applet'*/
  ]],
  ["color", [
    /*'basefont',*/
    "font",
    "hr"
  ]],
  ["cols", ["textarea"]],
  [["colspan", "colSpan"], ["td", "th"]],
  ["content", ["meta"]],
  [["contenteditable", "contentEditable"], ["*"]],
  [["contextmenu"], [
    /*'*'*/
  ]],
  ["controls", ["audio", "video"]],
  ["coords", ["area"]],
  [["crossorigin", "crossOrigin"], ["audio", "img", "link", "script", "video"]],
  ["csp", ["iframe"]],
  ["data", ["object"]],
  [["datetime", "dateTime"], ["del", "ins", "time"]],
  ["decoding", ["img"]],
  ["default", ["track"]],
  ["defer", ["script"]],
  ["dir", ["*"]],
  [["dirname", "dirName"], ["input", "textarea"]],
  ["disabled", [
    /*'command',*/
    "button",
    "fieldset",
    "input",
    /*'keygen',*/
    "optgroup",
    "option",
    "select",
    "textarea"
  ]],
  ["download", ["a", "area"]],
  ["draggable", ["*"]],
  ["enctype", ["form"]],
  [["enterkeyhint", "enterKeyHint"], ["textarea", "contenteditable"]],
  ["for", [
    /*'label', 'output'*/
  ]],
  ["form", [
    /*'button', 'fieldset', 'input', 'keygen', 'label', 'meter', 'object', 'output', 'progress', 'select', 'textarea'*/
  ]],
  [["formaction", "formAction"], ["input", "button"]],
  [["formenctype", "formEnctype"], ["button", "input"]],
  [["formmethod", "formMethod"], ["button", "input"]],
  [["formnovalidate", "formNoValidate"], ["button", "input"]],
  [["formtarget", "formTarget"], ["button", "input"]],
  ["headers", ["td", "th"]],
  ["height", ["canvas", "embed", "iframe", "img", "input", "object", "video"]],
  ["hidden", ["*"]],
  ["high", ["meter"]],
  ["href", ["a", "area", "base", "link"]],
  ["hreflang", [
    "a",
    /*'area',*/
    "link"
  ]],
  [["http-equiv", "httpEquiv"], ["meta"]],
  ["icon", [
    /*'command'*/
  ]],
  ["id", ["*"]],
  ["importance", [
    /*'iframe', 'img', 'link', 'script'*/
  ]],
  ["integrity", ["link", "script"]],
  ["intrinsicsize", [
    /*'img'*/
  ]],
  [["inputmode", "inputMode"], ["textarea", "contenteditable"]],
  [["ismap", "isMap"], ["img"]],
  ["itemprop", [
    /*'*'*/
  ]],
  ["keytype", [
    /*'keygen'*/
  ]],
  ["kind", ["track"]],
  ["label", ["optgroup", "option", "track"]],
  ["lang", ["*"]],
  ["language", [
    /*'script'*/
  ]],
  ["loading", ["img", "iframe"]],
  ["list", [
    /*'input'*/
  ]],
  ["loop", [
    "audio",
    /*'bgsound',*/
    "marquee",
    "video"
  ]],
  ["low", ["meter"]],
  ["manifest", [
    /*'html'*/
  ]],
  ["max", ["input", "meter", "progress"]],
  [["maxlength", "maxLength"], ["input", "textarea"]],
  [["minlength", "minLength"], ["input", "textarea"]],
  ["media", [
    /*'a', 'area',*/
    "link",
    "source",
    "style"
  ]],
  ["method", ["form"]],
  ["min", ["input", "meter"]],
  ["multiple", ["input", "select"]],
  ["muted", ["audio", "video"]],
  ["name", [
    "button",
    "form",
    "fieldset",
    "iframe",
    "input",
    /*'keygen',*/
    "object",
    "output",
    "select",
    "textarea",
    "map",
    "meta",
    "param"
  ]],
  [["novalidate", "noValidate"], ["form"]],
  ["open", ["details"]],
  ["optimum", ["meter"]],
  ["pattern", ["input"]],
  ["ping", ["a", "area"]],
  ["placeholder", ["input", "textarea"]],
  ["poster", ["video"]],
  ["preload", ["audio", "video"]],
  ["radiogroup", [
    /*'command'*/
  ]],
  [["readonly", "readOnly"], ["input", "textarea"]],
  [["referrerpolicy", "referrerPolicy"], ["a", "area", "iframe", "img", "link", "script"]],
  ["rel", ["a", "area", "link"]],
  ["required", ["input", "select", "textarea"]],
  ["reversed", ["ol"]],
  ["rows", ["textarea"]],
  [["rowspan", "rowSpan"], ["td", "th"]],
  ["sandbox", ["iframe"]],
  ["scope", ["th"]],
  ["scoped", [
    /*'style'*/
  ]],
  ["selected", ["option"]],
  ["shape", ["a", "area"]],
  ["size", ["input", "select"]],
  ["sizes", ["link", "img", "source"]],
  ["slot", ["*"]],
  ["span", ["col", "colgroup"]],
  ["spellcheck", ["*"]],
  ["src", ["audio", "embed", "iframe", "img", "input", "script", "source", "track", "video"]],
  ["srcdoc", ["iframe"]],
  ["srclang", ["track"]],
  ["srcset", ["img", "source"]],
  ["start", ["ol"]],
  ["step", ["input"]],
  ["style", ["*"]],
  ["summary", ["table"]],
  [["tabindex", "tabIndex"], ["*"]],
  ["target", ["a", "area", "base", "form"]],
  ["title", ["*"]],
  ["translate", [
    /*'*'*/
  ]],
  //TODO(kschaaf): 'translate' boolean property maps to 'yes'/'no'
  ["type", [
    "button",
    "input",
    /*'command',*/
    "embed",
    "object",
    "script",
    "source",
    "style"
    /*'menu'*/
  ]],
  [["usemap", "useMap"], ["img", "input", "object"]],
  ["value", ["button", "data", "input", "li", "meter", "option", "progress", "param"]],
  ["width", ["canvas", "embed", "iframe", "img", "input", "object", "video"]],
  ["wrap", ["textarea"]]
];
var reflectedAttributes = /* @__PURE__ */ new Map();
var addPropertyForElement = (elementName, attributeName, propertyName) => {
  if (reflectedAttributes.has(elementName)) {
    reflectedAttributes.get(elementName).set(propertyName, attributeName);
  } else {
    reflectedAttributes.set(elementName, /* @__PURE__ */ new Map([[propertyName, attributeName]]));
  }
};
for (const [attr, elements] of reflectedAttributesSource) {
  for (let elementName of elements) {
    elementName = elementName.toUpperCase();
    if (attr instanceof Array) {
      addPropertyForElement(elementName, attr[0], attr[1]);
    } else {
      addPropertyForElement(elementName, attr, attr);
    }
  }
}
var reflectedAttributeName = (elementName, propertyName) => {
  const attributes2 = reflectedAttributes.get(elementName);
  if (attributes2 !== void 0 && attributes2.has(propertyName)) {
    return attributes2.get(propertyName);
  } else {
    return reflectedAttributes.get("*").get(propertyName);
  }
};

// node_modules/@lit-labs/ssr/lib/server-template.js
var SERVER_ONLY = 1;
var isHydratable = (template) => {
  return template._$litServerRenderMode !== SERVER_ONLY;
};

// node_modules/@lit-labs/ssr/lib/render-value.js
var { getTemplateHtml, marker, markerMatch, boundAttributeSuffix, patchDirectiveResolve, getAttributePartCommittedValue, resolveDirective, AttributePart, PropertyPart, BooleanAttributePart, EventPart, connectedDisconnectable, isIterable } = i6;
function ssrResolve(_part, values) {
  return patchIfDirective(this.render(...values));
}
var patchIfDirective = (value) => {
  const directiveCtor = f4(value);
  if (directiveCtor !== void 0) {
    patchDirectiveResolve(directiveCtor, ssrResolve);
  }
  return value;
};
var patchAnyDirectives = (part, value, valueIndex) => {
  if (part.strings !== void 0) {
    for (let i8 = 0; i8 < part.strings.length - 1; i8++) {
      patchIfDirective(value[valueIndex + i8]);
    }
  } else {
    patchIfDirective(value);
  }
};
var templateCache = /* @__PURE__ */ new WeakMap();
var REGEXP_TEMPLATE_HAS_TOP_LEVEL_PAGE_TAG = /^(\s|<!--[^(-->)]*-->)*(<(!doctype|html|head|body))/i;
var getTemplateOpcodes = (result) => {
  const template = templateCache.get(result.strings);
  if (template !== void 0) {
    return template;
  }
  const [html, attrNames] = getTemplateHtml(
    result.strings,
    // SVG TemplateResultType functionality is only required on the client,
    // which instantiates SVG elements within a svg namespace. Using SVG
    // on the server results in unneccesary svg containers being emitted.
    e3.HTML
  );
  const hydratable = isHydratable(result);
  const htmlString = String(html);
  const isPageLevelTemplate = !hydratable && REGEXP_TEMPLATE_HAS_TOP_LEVEL_PAGE_TAG.test(htmlString);
  const ast = (isPageLevelTemplate ? parse : parseFragment)(htmlString, {
    sourceCodeLocationInfo: true
  });
  const ops = [];
  let lastOffset = 0;
  let attrIndex = 0;
  const skipTo = (offset3) => {
    if (lastOffset === void 0) {
      throw new Error("lastOffset is undefined");
    }
    if (offset3 < lastOffset) {
      throw new Error(`offset must be greater than lastOffset.
        offset: ${offset3}
        lastOffset: ${lastOffset}
      `);
    }
    lastOffset = offset3;
  };
  const flush = (value) => {
    const op = ops.at(-1);
    if (op !== void 0 && op.type === "text") {
      op.value += value;
    } else {
      ops.push({
        type: "text",
        value
      });
    }
  };
  const flushTo = (offset3) => {
    if (lastOffset === void 0) {
      throw new Error("lastOffset is undefined");
    }
    const previousLastOffset = lastOffset;
    lastOffset = offset3;
    const value = String(html).substring(previousLastOffset, offset3);
    flush(value);
  };
  let nodeIndex = 0;
  traverse(ast, {
    "pre:node"(node, parent) {
      if (isCommentNode(node)) {
        if (node.data === markerMatch) {
          flushTo(node.sourceCodeLocation.startOffset);
          skipTo(node.sourceCodeLocation.endOffset);
          ops.push({
            type: "child-part",
            index: nodeIndex,
            useCustomElementInstance: parent && isElementNode(parent) && parent.isDefinedCustomElement
          });
        }
        nodeIndex++;
      } else if (isElementNode(node)) {
        let boundAttributesCount = 0;
        const tagName = node.tagName;
        if (node.parentNode && isElementNode(node.parentNode) && node.parentNode.isDefinedCustomElement) {
          ops.push({
            type: "slotted-element-open",
            name: node.attrs.find((a3) => a3.name === "slot")?.value
          });
        }
        if (tagName.indexOf("-") !== -1) {
          const ctor = customElements.get(tagName);
          if (ctor !== void 0) {
            node.isDefinedCustomElement = true;
            ops.push({
              type: "custom-element-open",
              tagName,
              ctor,
              staticAttributes: new Map(node.attrs.filter((attr) => !attr.name.endsWith(boundAttributeSuffix)).map((attr) => [attr.name, attr.value]))
            });
          }
        } else if (tagName === "slot") {
          ops.push({
            type: "slot-element-open",
            // Name is either assigned the slot name or undefined for
            // an unnamed slot.
            name: node.attrs.find((a3) => a3.name === "name")?.value
          });
        }
        const attrInfo = node.attrs.map((attr) => {
          const isAttrBinding = attr.name.endsWith(boundAttributeSuffix);
          const isElementBinding = attr.name.startsWith(marker);
          if (isAttrBinding || isElementBinding) {
            boundAttributesCount += 1;
          }
          return [isAttrBinding, isElementBinding, attr];
        });
        if (boundAttributesCount > 0 || node.isDefinedCustomElement) {
          flushTo(node.sourceCodeLocation.startTag.startOffset);
          ops.push({
            type: "possible-node-marker",
            boundAttributesCount,
            nodeIndex
          });
        }
        for (const [isAttrBinding, isElementBinding, attr] of attrInfo) {
          if (isAttrBinding || isElementBinding) {
            const strings = attr.value.split(marker);
            const attrSourceLocation = node.sourceCodeLocation.attrs[attr.name];
            const attrNameStartOffset = attrSourceLocation.startOffset;
            const attrEndOffset = attrSourceLocation.endOffset;
            flushTo(attrNameStartOffset);
            if (isAttrBinding) {
              const name = attrNames[attrIndex++];
              const [, prefix, caseSensitiveName] = /([.?@])?(.*)/.exec(name);
              if (!hydratable) {
                if (prefix === ".") {
                  throw new Error(`Server-only templates can't bind to properties. Bind to attributes instead, as they can be serialized when the template is rendered and sent to the browser.`);
                } else if (prefix === "@") {
                  throw new Error(`Server-only templates can't bind to events. There's no way to serialize an event listener when generating HTML and sending it to the browser.`);
                }
              }
              ops.push({
                type: "attribute-part",
                index: nodeIndex,
                name: caseSensitiveName,
                ctor: prefix === "." ? PropertyPart : prefix === "?" ? BooleanAttributePart : prefix === "@" ? EventPart : AttributePart,
                strings,
                tagName: tagName.toUpperCase(),
                useCustomElementInstance: node.isDefinedCustomElement
              });
            } else {
              if (!hydratable) {
                throw new Error(`Server-only templates don't support element parts, as their API does not currently give them any way to render anything on the server. Found in template:
    ${displayTemplateResult(result)}`);
              }
              ops.push({
                type: "element-part",
                index: nodeIndex
              });
            }
            skipTo(attrEndOffset);
          } else if (node.isDefinedCustomElement) {
            const attrSourceLocation = node.sourceCodeLocation.attrs[attr.name];
            flushTo(attrSourceLocation.startOffset);
            skipTo(attrSourceLocation.endOffset);
          }
        }
        if (node.isDefinedCustomElement) {
          flushTo(node.sourceCodeLocation.startTag.endOffset - 1);
          ops.push({
            type: "custom-element-attributes"
          });
          flush(">");
          skipTo(node.sourceCodeLocation.startTag.endOffset);
          ops.push({
            type: "custom-element-shadow"
          });
        } else if (!hydratable && /^(title|textarea|script|style)$/.test(node.tagName)) {
          const dangerous = isJavaScriptScriptTag(node);
          for (const child of node.childNodes) {
            if (!isTextNode(child)) {
              throw new Error(`Internal error: Unexpected child node inside raw text node, a ${node.tagName} should only contain text nodes, but found a ${node.nodeName} (tagname: ${node.tagName})`);
            }
            const text = child.value;
            const textStart = child.sourceCodeLocation.startOffset;
            flushTo(textStart);
            const markerRegex = new RegExp(marker.replace(/\$/g, "\\$"), "g");
            for (const mark of text.matchAll(markerRegex)) {
              flushTo(textStart + mark.index);
              if (dangerous) {
                throw new Error(`Found binding inside an executable <script> tag in a server-only template. For security reasons, this is not supported, as it could allow an attacker to execute arbitrary JavaScript. If you do need to create a script element with dynamic contents, you can use the unsafeHTML directive to make one, as that way the code is clearly marked as unsafe and needing careful handling. The template with the dangerous binding is:

    ${displayTemplateResult(result)}`);
              }
              if (node.tagName === "style") {
                throw new Error(`Found binding inside a <style> tag in a server-only template. For security reasons, this is not supported, as it could allow an attacker to exfiltrate information from the page. If you do need to create a style element with dynamic contents, you can use the unsafeHTML directive to make one, as that way the code is clearly marked as unsafe and needing careful handling. The template with the dangerous binding is:

    ${displayTemplateResult(result)}`);
              }
              ops.push({
                type: "child-part",
                index: nodeIndex,
                useCustomElementInstance: false
              });
              skipTo(textStart + mark.index + mark[0].length);
            }
            flushTo(textStart + text.length);
          }
        } else if (!hydratable && isTemplateNode(node)) {
          traverse(node.content, this, node);
        }
        nodeIndex++;
      }
    },
    node(node) {
      if (!isElementNode(node)) {
        return;
      }
      if (node.isDefinedCustomElement) {
        ops.push({
          type: "custom-element-close"
        });
      } else if (node.tagName === "slot") {
        ops.push({
          type: "slot-element-close"
        });
      }
      if (node.parentNode && isElementNode(node.parentNode) && node.parentNode.isDefinedCustomElement) {
        ops.push({
          type: "slotted-element-close"
        });
      }
    }
  });
  flushTo();
  templateCache.set(result.strings, ops);
  return ops;
};
function renderValue(value, renderInfo, hydratable = true) {
  if (renderInfo.customElementHostStack.length === 0) {
    const rootEventTarget = renderInfo.eventTargetStack[0];
    if (rootEventTarget !== litServerRoot) {
      renderInfo.eventTargetStack.unshift(litServerRoot);
      if (rootEventTarget) {
        rootEventTarget.__eventTargetParent = rootEventTarget;
      }
    }
  }
  patchIfDirective(value);
  if (s6(value)) {
    const instance = renderInfo.customElementInstanceStack.at(-1);
    if (instance !== void 0) {
      const renderLightResult = instance.renderLight(renderInfo);
      if (renderLightResult !== void 0) {
        return renderLightResult;
      }
    }
    value = null;
  } else {
    value = resolveDirective(connectedDisconnectable({ type: t5.CHILD }), value);
  }
  const result = [];
  if (value != null && l2(value)) {
    if (hydratable) {
      result.push(`<!--lit-part ${b3(value)}-->`);
    }
    result.push(() => renderTemplateResult(value, renderInfo));
    if (hydratable) {
      result.push(`<!--/lit-part-->`);
    }
  } else {
    if (hydratable) {
      result.push(`<!--lit-part-->`);
    }
    if (value === void 0 || value === null || value === A2 || value === E) {
    } else if (!n2(value) && isIterable(value)) {
      for (const item of value) {
        result.push(() => renderValue(item, renderInfo, hydratable));
      }
    } else {
      result.push(escapeHtml(typeof value === "string" ? value : String(value)));
    }
    if (hydratable) {
      result.push(`<!--/lit-part-->`);
    }
  }
  return result;
}
function renderTemplateResult(result, renderInfo) {
  const hydratable = isHydratable(result);
  const ops = getTemplateOpcodes(result);
  let partIndex = 0;
  const renderResult = [];
  for (const op of ops) {
    switch (op.type) {
      case "text":
        renderResult.push(op.value);
        break;
      case "child-part": {
        renderResult.push(() => {
          const value = result.values[partIndex++];
          let isValueHydratable = hydratable;
          if (l2(value)) {
            isValueHydratable = isHydratable(value);
            if (!isValueHydratable && hydratable) {
              throw new Error(`A server-only template can't be rendered inside an ordinary, hydratable template. A server-only template can only be rendered at the top level, or within other server-only templates. The outer template was:
    ${displayTemplateResult(result)}

And the inner template was:
    ${displayTemplateResult(value)}
              `);
            }
          }
          return renderValue(value, renderInfo, isValueHydratable);
        });
        break;
      }
      case "attribute-part": {
        renderResult.push(() => {
          const statics = op.strings;
          const part = new op.ctor(
            // Passing only object with tagName for the element is fine since the
            // directive only gets PartInfo without the node available in the
            // constructor
            { tagName: op.tagName },
            op.name,
            statics,
            connectedDisconnectable(),
            {}
          );
          const value = part.strings === void 0 ? result.values[partIndex] : result.values;
          patchAnyDirectives(part, value, partIndex);
          let committedValue = E;
          if (!(part.type === t5.EVENT)) {
            committedValue = getAttributePartCommittedValue(part, value, partIndex);
          }
          let attributeResult = void 0;
          if (committedValue !== E) {
            const instance = op.useCustomElementInstance ? renderInfo.customElementInstanceStack.at(-1) : void 0;
            if (part.type === t5.PROPERTY) {
              attributeResult = renderPropertyPart(instance, op, committedValue);
            } else if (part.type === t5.BOOLEAN_ATTRIBUTE) {
              attributeResult = renderBooleanAttributePart(instance, op, committedValue);
            } else {
              attributeResult = renderAttributePart(instance, op, committedValue);
            }
          }
          partIndex += statics.length - 1;
          return attributeResult;
        });
        break;
      }
      case "element-part": {
        renderResult.push(() => {
          partIndex++;
        });
        break;
      }
      case "custom-element-open": {
        renderResult.push(() => {
          const instance = getElementRenderer(renderInfo, op.tagName, op.ctor, op.staticAttributes);
          if (instance.element) {
            addElementToEventPath(instance.element, renderInfo);
            renderInfo.eventTargetStack.push(instance.element);
          }
          for (const [name, value] of op.staticAttributes) {
            instance.setAttribute(name, value);
          }
          renderInfo.customElementInstanceStack.push(instance);
          renderInfo.customElementRendered?.(op.tagName);
        });
        break;
      }
      case "custom-element-attributes": {
        renderResult.push(() => {
          const instance = renderInfo.customElementInstanceStack.at(-1);
          if (instance === void 0) {
            throw new Error(`Internal error: ${op.type} outside of custom element context`);
          }
          instance?.connectedCallback();
          let result2 = instance.renderAttributes();
          if (renderInfo.deferHydration || renderInfo.customElementHostStack.length > 0) {
            result2 = result2.concat(" defer-hydration");
          }
          return result2;
        });
        break;
      }
      case "possible-node-marker": {
        renderResult.push(() => {
          if ((op.boundAttributesCount > 0 || renderInfo.customElementHostStack.length > 0) && hydratable) {
            return `<!--lit-node ${op.nodeIndex}-->`;
          }
          return void 0;
        });
        break;
      }
      case "custom-element-shadow": {
        renderResult.push(() => {
          const instance = renderInfo.customElementInstanceStack.at(-1);
          if (instance === void 0) {
            throw new Error(`Internal error: ${op.type} outside of custom element context`);
          }
          renderInfo.customElementHostStack.push(instance);
          const shadowContents = instance.renderShadow(renderInfo);
          const shadowResult = [];
          if (shadowContents !== void 0) {
            const { mode = "open", delegatesFocus } = instance.shadowRootOptions ?? {};
            const delegatesfocusAttr = delegatesFocus ? " shadowrootdelegatesfocus" : "";
            shadowResult.push(`<template shadowroot="${mode}" shadowrootmode="${mode}"${delegatesfocusAttr}>`);
            shadowResult.push(() => shadowContents);
            shadowResult.push("</template>");
            shadowResult.push(() => {
              renderInfo.customElementHostStack.pop();
            });
          }
          return shadowResult;
        });
        break;
      }
      case "custom-element-close":
        renderResult.push(() => {
          renderInfo.customElementInstanceStack.pop();
          renderInfo.eventTargetStack.pop();
        });
        break;
      case "slot-element-open": {
        renderResult.push(() => {
          const host = renderInfo.customElementHostStack.at(-1);
          if (host === void 0) {
            throw new Error(`Internal error: ${op.type} outside of custom element context`);
          } else if (host.element) {
            const slots = host.element.__slots ??= /* @__PURE__ */ new Map();
            const element = new HTMLSlotElementShimWithRealType();
            element.name = op.name ?? "";
            addElementToEventPath(element, renderInfo);
            if (!slots.has(op.name)) {
              slots.set(op.name, element);
            }
            renderInfo.eventTargetStack.push(element);
          }
        });
        break;
      }
      case "slot-element-close":
        renderResult.push(() => {
          renderInfo.eventTargetStack.pop();
        });
        break;
      case "slotted-element-open":
        renderResult.push(() => {
          renderInfo.slotStack.push(op.name);
        });
        break;
      case "slotted-element-close":
        renderResult.push(() => {
          renderInfo.slotStack.pop();
        });
        break;
      default:
        throw new Error("internal error");
    }
  }
  renderResult.push(() => {
    if (partIndex !== result.values.length) {
      throwErrorForPartIndexMismatch(partIndex, result);
    }
  });
  return renderResult;
}
function throwErrorForPartIndexMismatch(partIndex, result) {
  const errorMsg = `
    Unexpected final partIndex: ${partIndex} !== ${result.values.length} while processing the following template:

    ${displayTemplateResult(result)}

    This could be because you're attempting to render an expression in an invalid location. See
    https://lit.dev/docs/templates/expressions/#invalid-locations for more information about invalid expression
    locations.
  `;
  throw new Error(errorMsg);
}
function renderPropertyPart(instance, op, value) {
  value = value === A2 ? void 0 : value;
  const reflectedName = reflectedAttributeName(op.tagName, op.name);
  if (instance !== void 0) {
    instance.setProperty(op.name, value);
  }
  return reflectedName !== void 0 ? `${reflectedName}="${escapeHtml(typeof value === "string" ? value : String(value))}"` : void 0;
}
function renderBooleanAttributePart(instance, op, value) {
  if (value && value !== A2) {
    if (instance !== void 0) {
      instance.setAttribute(op.name, "");
    } else {
      return op.name;
    }
  }
  return void 0;
}
function renderAttributePart(instance, op, value) {
  if (value !== A2) {
    value = typeof value === "string" ? value : value == null || value === E ? "" : String(value);
    if (instance !== void 0) {
      instance.setAttribute(op.name, value);
    } else {
      return `${op.name}="${escapeHtml(value)}"`;
    }
  }
  return void 0;
}
function displayTemplateResult(result) {
  if (d2(result)) {
    return result._$litType$.h.join("${...}");
  }
  return result.strings.join("${...}");
}
function isJavaScriptScriptTag(node) {
  function isScriptTag(node2) {
    return /script/i.test(node2.tagName);
  }
  if (!isScriptTag(node)) {
    return false;
  }
  let safeTypeSeen = false;
  for (const attr of node.attrs) {
    if (attr.name !== "type") {
      continue;
    }
    switch (attr.value) {
      // see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types#textjavascript
      case null:
      case void 0:
      case "":
      case "module":
      case "text/javascript":
      case "application/javascript":
      case "application/ecmascript":
      case "application/x-ecmascript":
      case "application/x-javascript":
      case "text/ecmascript":
      case "text/javascript1.0":
      case "text/javascript1.1":
      case "text/javascript1.2":
      case "text/javascript1.3":
      case "text/javascript1.4":
      case "text/javascript1.5":
      case "text/jscript":
      case "text/livescript":
      case "text/x-ecmascript":
      case "text/x-javascript":
        return true;
      default:
        safeTypeSeen = true;
    }
  }
  const willExecute = !safeTypeSeen;
  return willExecute;
}
function addElementToEventPath(element, renderInfo) {
  const eventTarget = renderInfo.eventTargetStack.at(-1);
  const slotName = renderInfo.slotStack.at(-1);
  element.__host = renderInfo.customElementHostStack.at(-1)?.element;
  const assignedSlot = eventTarget?.__slots?.get(slotName);
  if (assignedSlot) {
    element.__eventTargetParent = assignedSlot;
  } else if (element.__host === eventTarget) {
    element.__eventTargetParent = element.getRootNode() ?? eventTarget;
  } else {
    element.__eventTargetParent = eventTarget;
  }
}

// node_modules/@lit-labs/ssr/lib/lit-element-renderer.js
var { attributeToProperty, changedProperties } = e5;
i4.prototype["createRenderRoot"] = function() {
  return this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
};
var LitElementRenderer = class _LitElementRenderer extends ElementRenderer {
  static matchesClass(ctor) {
    return ctor["_$litElement$"];
  }
  constructor(tagName) {
    super(tagName);
    this._disabled = false;
    this.element = new (customElements.get(this.tagName))();
    const internals2 = this.element.__internals;
    if (internals2) {
      for (const [ariaProp, ariaAttribute] of Object.entries(ariaMixinAttributes)) {
        const value = internals2[ariaProp];
        if (value && !this.element.hasAttribute(ariaAttribute)) {
          this.element.setAttribute(ariaAttribute, value);
          this.element.setAttribute(`${HYDRATE_INTERNALS_ATTR_PREFIX}${ariaAttribute}`, value);
        }
      }
    }
  }
  get shadowRootOptions() {
    return this.element.constructor.shadowRootOptions ?? super.shadowRootOptions;
  }
  connectedCallback() {
    if (globalThis.litSsrCallConnectedCallback) {
      console.warn("litSsrCallConnectedCallback is deprecated. Please use LitElementRenderer.renderOptions instead.");
    }
    let renderOptions;
    for (const optionsCallback of _LitElementRenderer.renderOptions) {
      const options = optionsCallback(this.element);
      if (options) {
        renderOptions = options;
        break;
      }
    }
    if (renderOptions?.disableSsr) {
      this._disabled = true;
      return;
    }
    if (globalThis.litSsrCallConnectedCallback || renderOptions?.connectedCallback) {
      this.element["enableUpdating"] = function() {
      };
      try {
        this.element.connectedCallback();
      } catch (e11) {
        const className = this.element.constructor.name;
        console.warn(`Calling ${className}.connectedCallback() resulted in a thrown error. Consider configuring \`LitElementRenderer.renderOptions\` to prevent calling connectedCallback for unsupported elements or add isServer checks to your code to prevent calling browser API during SSR.`);
        throw e11;
      }
    }
    const propertyValues = changedProperties(this.element);
    this.element?.["willUpdate"](propertyValues);
    g2.prototype["update"].call(this.element, propertyValues);
  }
  attributeChangedCallback(name, _old, value) {
    attributeToProperty(this.element, name, value);
  }
  renderShadow(renderInfo) {
    if (this._disabled) {
      return void 0;
    }
    const result = [];
    const styles = this.element.constructor.elementStyles;
    if (styles !== void 0 && styles.length > 0) {
      result.push("<style>");
      for (const style of styles) {
        result.push(style.cssText);
      }
      result.push("</style>");
    }
    result.push(() => renderValue(this.element.render(), renderInfo));
    return result;
  }
  renderLight(renderInfo) {
    const value = this.element?.renderLight();
    if (value) {
      return [() => renderValue(value, renderInfo)];
    } else {
      return [""];
    }
  }
};
LitElementRenderer.renderOptions = [];

// node_modules/@lit-labs/ssr/lib/render.js
function render(value, renderInfo) {
  return new RenderResultIterator(renderThunked(value, renderInfo));
}
function renderThunked(value, renderInfo) {
  const defaultRenderInfo = {
    elementRenderers: [LitElementRenderer],
    customElementInstanceStack: [],
    customElementHostStack: [],
    eventTargetStack: [],
    slotStack: [],
    deferHydration: false
  };
  renderInfo = { ...defaultRenderInfo, ...renderInfo };
  let hydratable = true;
  if (l2(value)) {
    hydratable = isHydratable(value);
  }
  return renderValue(value, renderInfo, hydratable);
}
var RenderResultIterator = class {
  constructor(result) {
    this._waiting = false;
    this._iterators = [result[Symbol.iterator]()];
  }
  next() {
    if (this._waiting) {
      throw new Error("Cannot call next() while waiting for a Promise to resolve");
    }
    while (true) {
      const iterator = this._iterators.at(-1);
      if (iterator === void 0) {
        return { done: true, value: void 0 };
      }
      const result = iterator.next();
      if (result.done) {
        this._iterators.pop();
        continue;
      }
      let value = result.value;
      if (typeof value === "string") {
        return result;
      }
      while (typeof value === "function") {
        value = value();
      }
      if (value === void 0) {
        continue;
      }
      if (typeof value === "string") {
        return { done: false, value };
      }
      if (Array.isArray(value)) {
        this._iterators.push(value[Symbol.iterator]());
        continue;
      }
      this._waiting = true;
      return {
        done: false,
        value: value.then((r10) => {
          this._waiting = false;
          if (typeof r10 === "string") {
            return r10;
          }
          this._iterators.push(r10[Symbol.iterator]());
          return this;
        })
      };
    }
  }
  // Make the iterator itself iterable
  [Symbol.iterator]() {
    return this;
  }
};

// node_modules/@lit-labs/ssr/lib/render-result.js
var collectResult = async (result) => {
  let str = "";
  for (const chunk of result) {
    let value = chunk;
    while (value !== void 0) {
      while (typeof value === "function") {
        value = value();
      }
      if (value === void 0) {
        break;
      }
      if (typeof value === "string") {
        str += value;
        break;
      }
      if (Array.isArray(value) || typeof value[Symbol.iterator] === "function") {
        str += await collectResult(value);
        break;
      }
      if (typeof value.then !== "function") {
        throw new Error(`Unexpected value in RenderResult: ${value} (${typeof value})`);
      }
      value = await value;
    }
  }
  return str;
};

// node_modules/@lit/reactive-element/node/decorators/custom-element.js
var t6 = (t7) => (e11, o11) => {
  void 0 !== o11 ? o11.addInitializer(() => {
    customElements.define(t7, e11);
  }) : customElements.define(t7, e11);
};

// node_modules/@lit/reactive-element/node/decorators/property.js
var o7 = { attribute: true, type: String, converter: b2, reflect: false, hasChanged: m4 };
var r7 = (t7 = o7, e11, r10) => {
  const { kind: n9, metadata: i8 } = r10;
  let s8 = globalThis.litPropertyMetadata.get(i8);
  if (void 0 === s8 && globalThis.litPropertyMetadata.set(i8, s8 = /* @__PURE__ */ new Map()), "setter" === n9 && ((t7 = Object.create(t7)).wrapped = true), s8.set(r10.name, t7), "accessor" === n9) {
    const { name: o11 } = r10;
    return { set(r11) {
      const n10 = e11.get.call(this);
      e11.set.call(this, r11), this.requestUpdate(o11, n10, t7, true, r11);
    }, init(e12) {
      return void 0 !== e12 && this.C(o11, void 0, t7, e12), e12;
    } };
  }
  if ("setter" === n9) {
    const { name: o11 } = r10;
    return function(r11) {
      const n10 = this[o11];
      e11.call(this, r11), this.requestUpdate(o11, n10, t7, true, r11);
    };
  }
  throw Error("Unsupported decorator location: " + n9);
};
function n6(t7) {
  return (e11, o11) => "object" == typeof o11 ? r7(t7, e11, o11) : ((t8, e12, o12) => {
    const r10 = e12.hasOwnProperty(o12);
    return e12.constructor.createProperty(o12, t8), r10 ? Object.getOwnPropertyDescriptor(e12, o12) : void 0;
  })(t7, e11, o11);
}

// node_modules/@lit/reactive-element/node/decorators/state.js
function r8(r10) {
  return n6({ ...r10, state: true, attribute: false });
}

// node_modules/@lit/reactive-element/node/decorators/base.js
var e8 = (e11, t7, c6) => (c6.configurable = true, c6.enumerable = true, Reflect.decorate && "object" != typeof t7 && Object.defineProperty(e11, t7, c6), c6);

// node_modules/@lit/reactive-element/node/decorators/query.js
function e9(e11, r10) {
  return (n9, s8, i8) => {
    const o11 = (t7) => t7.renderRoot?.querySelector(e11) ?? null;
    if (r10) {
      const { get: e12, set: r11 } = "object" == typeof s8 ? n9 : i8 ?? /* @__PURE__ */ (() => {
        const t7 = /* @__PURE__ */ Symbol();
        return { get() {
          return this[t7];
        }, set(e13) {
          this[t7] = e13;
        } };
      })();
      return e8(n9, s8, { get() {
        let t7 = e12.call(this);
        return void 0 === t7 && (t7 = o11(this), (null !== t7 || this.hasUpdated) && r11.call(this, t7)), t7;
      } });
    }
    return e8(n9, s8, { get() {
      return o11(this);
    } });
  };
}

// node_modules/@lit/reactive-element/node/decorators/query-assigned-elements.js
function o8(o11) {
  return (e11, n9) => {
    const { slot: r10, selector: s8 } = o11 ?? {}, c6 = "slot" + (r10 ? `[name=${r10}]` : ":not([name])");
    return e8(e11, n9, { get() {
      const t7 = this.renderRoot?.querySelector(c6), e12 = t7?.assignedElements(o11) ?? [];
      return void 0 === s8 ? e12 : e12.filter((t8) => t8.matches(s8));
    } });
  };
}

// src/lib/storage.ts
var storage = typeof localStorage !== "undefined" ? localStorage : null;
function readJSON(key) {
  if (!storage) return null;
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function writeJSON(key, value) {
  if (!storage) return;
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch {
  }
}

// src/lib/settings.ts
var KEY_24H = "timor.24h";
var KEY_OFFSET = "timor.offset";
var KEY_THEME = "timor.theme";
function systemOffsetMinutes() {
  return -(/* @__PURE__ */ new Date()).getTimezoneOffset();
}
function resolveTheme(stored) {
  if (stored === "light" || stored === "dark") return stored;
  return "auto";
}
function readState() {
  const stored24h = readJSON(KEY_24H);
  const storedOffset = readJSON(KEY_OFFSET);
  let storedTheme = readJSON(KEY_THEME);
  if (storedTheme === null) {
    try {
      const raw = localStorage?.getItem(KEY_THEME);
      if (raw === "light" || raw === "dark") storedTheme = raw;
    } catch {
    }
  }
  return {
    use24h: stored24h !== null ? stored24h : true,
    offsetMinutes: storedOffset !== null && Number.isFinite(storedOffset) ? storedOffset : systemOffsetMinutes(),
    theme: resolveTheme(storedTheme)
  };
}
var SettingsStore = class extends EventTarget {
  constructor() {
    super(...arguments);
    this.state = readState();
  }
  get use24h() {
    return this.state.use24h;
  }
  get offsetMinutes() {
    return this.state.offsetMinutes;
  }
  get theme() {
    return this.state.theme;
  }
  setUse24h(value) {
    if (this.state.use24h === value) return;
    this.state = { ...this.state, use24h: value };
    writeJSON(KEY_24H, value);
    this.emit();
  }
  setOffsetMinutes(value) {
    if (!Number.isFinite(value) || this.state.offsetMinutes === value) return;
    this.state = { ...this.state, offsetMinutes: value };
    writeJSON(KEY_OFFSET, value);
    this.emit();
  }
  setTheme(value) {
    if (this.state.theme === value) return;
    this.state = { ...this.state, theme: value };
    writeJSON(KEY_THEME, value);
    this.emit();
  }
  emit() {
    this.dispatchEvent(new Event("change"));
  }
};
var settings = new SettingsStore();

// src/lib/time-sync.ts
var SYNC_INTERVAL_MS = 6e4;
var SAMPLE_COUNT = 3;
var ENDPOINT = "https://timeapi.io/api/Time/current/zone?timeZone=UTC";
var TimeSync = class extends EventTarget {
  constructor() {
    super(...arguments);
    this.snapshot = {
      status: "idle",
      offsetMs: 0,
      fastByMs: 0,
      syncedAt: 0,
      error: null
    };
    this.inFlight = null;
  }
  get status() {
    return this.snapshot.status;
  }
  get offsetMs() {
    return this.snapshot.offsetMs;
  }
  get fastByMs() {
    return this.snapshot.fastByMs;
  }
  get syncedAt() {
    return this.snapshot.syncedAt;
  }
  get error() {
    return this.snapshot.error;
  }
  start() {
    void this.sync();
    if (this.timer === void 0) {
      this.timer = window.setInterval(() => void this.sync(), SYNC_INTERVAL_MS);
    }
  }
  stop() {
    if (this.timer !== void 0) {
      window.clearInterval(this.timer);
      this.timer = void 0;
    }
  }
  /** Best-known actual time now, in ms since the Unix epoch. */
  actualNow() {
    return Date.now() + this.snapshot.offsetMs;
  }
  sync() {
    if (this.inFlight) return this.inFlight;
    this.inFlight = this.measure().then((samples) => {
      const best = samples.reduce((a3, b4) => a3.rtt < b4.rtt ? a3 : b4);
      const offsetMs = -best.fastByMs;
      this.setSnapshot({
        status: "synced",
        offsetMs,
        fastByMs: best.fastByMs,
        syncedAt: Date.now() + offsetMs,
        error: null
      });
    }).catch((err) => {
      this.setSnapshot({
        ...this.snapshot,
        status: "error",
        error: err instanceof Error ? err.message : String(err)
      });
    }).finally(() => {
      this.inFlight = null;
    });
    return this.inFlight;
  }
  async measure() {
    this.setSnapshot({ ...this.snapshot, status: "syncing", error: null });
    const samples = [];
    for (let i8 = 0; i8 < SAMPLE_COUNT; i8++) {
      try {
        samples.push(await this.sample());
      } catch {
      }
    }
    if (samples.length === 0) {
      throw new Error("all time sync samples failed");
    }
    return samples;
  }
  async sample() {
    const t0 = Date.now();
    const res = await fetch(ENDPOINT, { cache: "no-store" });
    if (!res.ok) throw new Error(`timeapi.io HTTP ${res.status}`);
    const json = await res.json();
    const t1 = Date.now();
    const year = Number(json["year"]);
    const month = Number(json["month"]) - 1;
    const day = Number(json["day"]);
    const hour = Number(json["hour"]);
    const minute = Number(json["minute"]);
    const seconds = Number(json["seconds"]);
    const milliSeconds = Number(json["milliSeconds"] ?? 0);
    if (!Number.isFinite(year + month + day + hour + minute + seconds + milliSeconds)) {
      throw new Error("unexpected timeapi.io payload");
    }
    const serverMs = Date.UTC(year, month, day, hour, minute, seconds, milliSeconds);
    const rtt = t1 - t0;
    const fastByMs = t0 - serverMs + rtt / 2;
    return { rtt, fastByMs };
  }
  setSnapshot(next) {
    this.snapshot = next;
    this.dispatchEvent(new Event("change"));
  }
};
var timeSync = new TimeSync();

// src/lib/format.ts
function pad(value, width = 2) {
  return String(Math.floor(value)).padStart(width, "0");
}
function decomposeMs(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1e3));
  return {
    h: Math.floor(totalSeconds / 3600),
    m: Math.floor(totalSeconds % 3600 / 60),
    s: totalSeconds % 60
  };
}
function formatClockTime(date, use24h, offsetMinutes) {
  const shifted2 = new Date(date.getTime() + offsetMinutes * 6e4);
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: !use24h
  }).formatToParts(shifted2);
  const get = (type) => parts.find((p5) => p5.type === type)?.value ?? "00";
  return {
    time: `${get("hour")}:${get("minute")}:${get("second")}`,
    ampm: use24h ? void 0 : get("dayPeriod") || void 0
  };
}
function formatDuration(ms) {
  const { h: h6, m: m6, s: s8 } = decomposeMs(ms);
  return `${pad(h6)}:${pad(m6)}:${pad(s8)}`;
}
function formatCountdown(ms) {
  const { h: h6, m: m6, s: s8 } = decomposeMs(ms);
  return h6 > 0 ? `${h6}:${pad(m6)}:${pad(s8)}` : `${pad(m6)}:${pad(s8)}`;
}
function formatDurationLabel(ms) {
  const { h: h6, m: m6, s: s8 } = decomposeMs(ms);
  const parts = [];
  if (h6) parts.push(`${h6} ${h6 === 1 ? "hour" : "hours"}`);
  if (m6) parts.push(`${m6} ${m6 === 1 ? "minute" : "minutes"}`);
  if (s8) parts.push(`${s8} ${s8 === 1 ? "second" : "seconds"}`);
  return parts.join(" ") || "0 seconds";
}
function formatStopwatch(ms) {
  const cs = Math.max(0, Math.floor(ms % 1e3 / 10));
  return `${formatDuration(ms)}.${pad(cs)}`;
}
function formatClockOffset(fastByMs) {
  const abs = Math.abs(fastByMs);
  if (abs < 5) return "your clock is accurate";
  const seconds = (abs / 1e3).toFixed(3);
  const direction = fastByMs > 0 ? "ahead" : "behind";
  return `your clock is ${seconds}s ${direction}`;
}

// src/lib/timer-store.ts
var STORAGE_KEY = "timor.timers";
var TICK_MS = 200;
var ALARM_TITLE_MS = 2500;
var TimerStore = class extends EventTarget {
  constructor() {
    super();
    this.timers = [];
    this.nextId = 1;
    this.audio = null;
    this.alarmUntil = 0;
    this.tick = () => {
      const now = Date.now();
      let changed = false;
      const finished = [];
      const next = this.timers.map((t7) => {
        if (!t7.running) return t7;
        const remaining = t7.endAt - now;
        if (remaining <= 0) {
          changed = true;
          finished.push(t7);
          return { ...t7, running: false, done: true, remainingMs: 0 };
        }
        if (Math.abs(remaining - t7.remainingMs) >= 1) changed = true;
        return { ...t7, remainingMs: remaining };
      });
      if (changed) {
        this.timers = next;
        if (finished.length > 0) this.persist();
      }
      if (finished.length > 0) this.onFinish(finished);
      this.changed();
    };
    this.restore();
  }
  get list() {
    return this.timers;
  }
  get titleSuffix() {
    if (Date.now() < this.alarmUntil) return "Time's up!";
    const running = this.timers.filter((t7) => t7.running);
    if (running.length === 0) return void 0;
    const nearest = Math.min(...running.map((t7) => t7.endAt - Date.now()));
    return formatCountdown(Math.max(0, nearest));
  }
  addTimer(ms, label) {
    if (ms <= 0) return;
    this.ensureAudio();
    this.requestNotificationPermission();
    const timer = {
      id: this.nextId++,
      label: label || "Timer",
      durationMs: ms,
      remainingMs: ms,
      running: true,
      done: false,
      endAt: Date.now() + ms
    };
    this.timers = [...this.timers, timer];
    this.persist();
    this.changed();
  }
  removeTimer(id) {
    this.timers = this.timers.filter((t7) => t7.id !== id);
    this.persist();
    this.changed();
  }
  toggleTimer(id, running) {
    const timer = this.timers.find((t7) => t7.id === id);
    if (!timer) return;
    if (running) {
      if (timer.done) {
        this.restartTimer(id);
        return;
      }
      this.ensureAudio();
      this.setTimer(id, {
        running: true,
        endAt: Date.now() + timer.remainingMs
      });
    } else {
      this.setTimer(id, {
        running: false,
        remainingMs: Math.max(0, timer.endAt - Date.now())
      });
    }
    this.changed();
  }
  restartTimer(id) {
    const timer = this.timers.find((t7) => t7.id === id);
    if (!timer) return;
    this.ensureAudio();
    this.setTimer(id, {
      running: true,
      done: false,
      remainingMs: timer.durationMs,
      endAt: Date.now() + timer.durationMs
    });
    this.changed();
  }
  addMinute(id) {
    const timer = this.timers.find((t7) => t7.id === id);
    if (!timer) return;
    const add = 6e4;
    const patch = {
      durationMs: timer.durationMs + add,
      remainingMs: timer.remainingMs + add
    };
    if (timer.done) {
      patch.done = false;
      patch.running = true;
      patch.endAt = Date.now() + add;
    } else if (timer.running) {
      patch.endAt = timer.endAt + add;
    }
    this.setTimer(id, patch);
    this.changed();
  }
  setTimer(id, patch) {
    this.timers = this.timers.map(
      (t7) => t7.id === id ? { ...t7, ...patch } : t7
    );
    this.persist();
  }
  onFinish(finished) {
    this.alarmUntil = Date.now() + ALARM_TITLE_MS;
    this.alarm();
    const nav = navigator;
    nav.vibrate?.([200, 100, 200]);
    for (const t7 of finished) this.notify(t7.label);
    if (this.alarmTimer !== void 0) window.clearTimeout(this.alarmTimer);
    this.alarmTimer = window.setTimeout(() => {
      this.alarmUntil = 0;
      this.alarmTimer = void 0;
      this.emit();
    }, ALARM_TITLE_MS);
  }
  sync() {
    const anyRunning = this.timers.some((t7) => t7.running);
    if (anyRunning && this.interval === void 0) {
      this.interval = window.setInterval(this.tick, TICK_MS);
    } else if (!anyRunning && this.interval !== void 0) {
      window.clearInterval(this.interval);
      this.interval = void 0;
    }
  }
  changed() {
    this.sync();
    this.emit();
  }
  persist() {
    writeJSON(STORAGE_KEY, this.timers);
  }
  restore() {
    const parsed = readJSON(STORAGE_KEY);
    if (!Array.isArray(parsed)) return;
    const now = Date.now();
    this.timers = parsed.filter((t7) => t7 && typeof t7 === "object").map((t7) => {
      const durationMs = Number.isFinite(t7.durationMs) ? Math.max(0, t7.durationMs) : 0;
      const endAt = Number.isFinite(t7.endAt) ? t7.endAt : 0;
      let running = t7.running === true;
      let done = t7.done === true;
      let remainingMs = Number.isFinite(t7.remainingMs) ? Math.max(0, t7.remainingMs) : 0;
      if (running) {
        remainingMs = endAt - now;
        if (remainingMs <= 0) {
          running = false;
          done = true;
          remainingMs = 0;
        }
      } else if (done) {
        remainingMs = 0;
      }
      return {
        id: Number.isFinite(t7.id) ? t7.id : 0,
        label: typeof t7.label === "string" ? t7.label : "Timer",
        durationMs,
        remainingMs,
        running,
        done,
        endAt
      };
    });
    this.nextId = this.timers.reduce((max2, t7) => Math.max(max2, t7.id), 0) + 1;
    this.sync();
  }
  ensureAudio() {
    if (!this.audio) {
      const Ctor = window.AudioContext ?? window.webkitAudioContext;
      if (Ctor) this.audio = new Ctor();
    }
    void this.audio?.resume();
  }
  alarm() {
    const ctx = this.audio;
    if (!ctx) return;
    void ctx.resume();
    const beep = (time, freq, dur) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(1e-4, time);
      gain.gain.exponentialRampToValueAtTime(0.4, time + 0.02);
      gain.gain.exponentialRampToValueAtTime(1e-4, time + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(time);
      osc.stop(time + dur);
    };
    const t0 = ctx.currentTime + 0.05;
    for (let i8 = 0; i8 < 4; i8++) {
      const t7 = t0 + i8 * 0.4;
      beep(t7, 880, 0.3);
      beep(t7, 1174.66, 0.3);
    }
  }
  requestNotificationPermission() {
    if ("Notification" in window && Notification.permission === "default") {
      void Notification.requestPermission();
    }
  }
  notify(label) {
    if ("Notification" in window && Notification.permission === "granted") {
      try {
        new Notification("Timor", { body: `${label} finished.` });
      } catch {
      }
    }
  }
  emit() {
    this.dispatchEvent(new Event("change"));
  }
};
var timerStore = new TimerStore();

// node_modules/iconify-icon/dist/iconify-icon.mjs
var defaultIconDimensions = Object.freeze({
  left: 0,
  top: 0,
  width: 16,
  height: 16
});
var defaultIconTransformations = Object.freeze({
  rotate: 0,
  vFlip: false,
  hFlip: false
});
var defaultIconProps = Object.freeze({
  ...defaultIconDimensions,
  ...defaultIconTransformations
});
var defaultExtendedIconProps = Object.freeze({
  ...defaultIconProps,
  body: "",
  hidden: false
});
var defaultIconSizeCustomisations = Object.freeze({
  width: null,
  height: null
});
var defaultIconCustomisations = Object.freeze({
  ...defaultIconSizeCustomisations,
  ...defaultIconTransformations
});
function rotateFromString(value, defaultValue = 0) {
  const units = value.replace(/^-?[0-9.]*/, "");
  function cleanup(value2) {
    while (value2 < 0) value2 += 4;
    return value2 % 4;
  }
  if (units === "") {
    const num = parseInt(value);
    return isNaN(num) ? 0 : cleanup(num);
  } else if (units !== value) {
    let split = 0;
    switch (units) {
      case "%":
        split = 25;
        break;
      case "deg":
        split = 90;
    }
    if (split) {
      let num = parseFloat(value.slice(0, value.length - units.length));
      if (isNaN(num)) return 0;
      num = num / split;
      return num % 1 === 0 ? cleanup(num) : 0;
    }
  }
  return defaultValue;
}
var separator = /[\s,]+/;
function flipFromString(custom, flip3) {
  flip3.split(separator).forEach((str) => {
    switch (str.trim()) {
      case "horizontal":
        custom.hFlip = true;
        break;
      case "vertical":
        custom.vFlip = true;
    }
  });
}
var defaultCustomisations = {
  ...defaultIconCustomisations,
  preserveAspectRatio: ""
};
function getCustomisations(node) {
  const customisations = {
    ...defaultCustomisations
  };
  const attr = (key, def) => node.getAttribute(key) || def;
  customisations.width = attr("width", null);
  customisations.height = attr("height", null);
  customisations.rotate = rotateFromString(attr("rotate", ""));
  flipFromString(customisations, attr("flip", ""));
  customisations.preserveAspectRatio = attr("preserveAspectRatio", attr("preserveaspectratio", ""));
  return customisations;
}
function haveCustomisationsChanged(value1, value2) {
  for (const key in defaultCustomisations) {
    if (value1[key] !== value2[key]) {
      return true;
    }
  }
  return false;
}
var matchIconName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
var stringToIcon = (value, validate, allowSimpleName, provider = "") => {
  const colonSeparated = value.split(":");
  if (value.slice(0, 1) === "@") {
    if (colonSeparated.length < 2 || colonSeparated.length > 3) return null;
    provider = colonSeparated.shift().slice(1);
  }
  if (colonSeparated.length > 3 || !colonSeparated.length) return null;
  if (colonSeparated.length > 1) {
    const name2 = colonSeparated.pop();
    const prefix = colonSeparated.pop();
    const result = {
      provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
      prefix,
      name: name2
    };
    return validate && !validateIconName(result) ? null : result;
  }
  const name = colonSeparated[0];
  const dashSeparated = name.split("-");
  if (dashSeparated.length > 1) {
    const result = {
      provider,
      prefix: dashSeparated.shift(),
      name: dashSeparated.join("-")
    };
    return validate && !validateIconName(result) ? null : result;
  }
  if (allowSimpleName && provider === "") {
    const result = {
      provider,
      prefix: "",
      name
    };
    return validate && !validateIconName(result, allowSimpleName) ? null : result;
  }
  return null;
};
var validateIconName = (icon, allowSimpleName) => {
  if (!icon) return false;
  return !!((allowSimpleName && icon.prefix === "" || !!icon.prefix) && !!icon.name);
};
function getIconsTree(data, names) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  const resolved = /* @__PURE__ */ Object.create(null);
  function resolve(name) {
    if (icons[name]) return resolved[name] = [];
    if (!(name in resolved)) {
      resolved[name] = null;
      const parent = aliases[name] && aliases[name].parent;
      const value = parent && resolve(parent);
      if (value) resolved[name] = [parent].concat(value);
    }
    return resolved[name];
  }
  Object.keys(icons).concat(Object.keys(aliases)).forEach(resolve);
  return resolved;
}
function mergeIconTransformations(obj1, obj2) {
  const result = {};
  if (!obj1.hFlip !== !obj2.hFlip) result.hFlip = true;
  if (!obj1.vFlip !== !obj2.vFlip) result.vFlip = true;
  const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
  if (rotate) result.rotate = rotate;
  return result;
}
function mergeIconData(parent, child) {
  const result = mergeIconTransformations(parent, child);
  for (const key in defaultExtendedIconProps) if (key in defaultIconTransformations) {
    if (key in parent && !(key in result)) result[key] = defaultIconTransformations[key];
  } else if (key in child) result[key] = child[key];
  else if (key in parent) result[key] = parent[key];
  return result;
}
function internalGetIconData(data, name, tree) {
  const icons = data.icons;
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  let currentProps = {};
  function parse2(name2) {
    currentProps = mergeIconData(icons[name2] || aliases[name2], currentProps);
  }
  parse2(name);
  tree.forEach(parse2);
  return mergeIconData(data, currentProps);
}
function parseIconSet(data, callback) {
  const names = [];
  if (typeof data !== "object" || typeof data.icons !== "object") return names;
  if (data.not_found instanceof Array) data.not_found.forEach((name) => {
    callback(name, null);
    names.push(name);
  });
  const tree = getIconsTree(data);
  for (const name in tree) {
    const item = tree[name];
    if (item) {
      callback(name, internalGetIconData(data, name, item));
      names.push(name);
    }
  }
  return names;
}
var optionalPropertyDefaults = {
  provider: "",
  aliases: {},
  not_found: {},
  ...defaultIconDimensions
};
function checkOptionalProps(item, defaults) {
  for (const prop in defaults) if (prop in item && typeof item[prop] !== typeof defaults[prop]) return false;
  return true;
}
function quicklyValidateIconSet(obj) {
  if (typeof obj !== "object" || obj === null) return null;
  const data = obj;
  if (typeof data.prefix !== "string" || !obj.icons || typeof obj.icons !== "object") return null;
  if (!checkOptionalProps(obj, optionalPropertyDefaults)) return null;
  const icons = data.icons;
  for (const name in icons) {
    const icon = icons[name];
    if (!name || typeof icon.body !== "string" || !checkOptionalProps(icon, defaultExtendedIconProps)) return null;
  }
  const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
  for (const name in aliases) {
    const icon = aliases[name];
    const parent = icon.parent;
    if (!name || typeof parent !== "string" || !icons[parent] && !aliases[parent] || !checkOptionalProps(icon, defaultExtendedIconProps)) return null;
  }
  return data;
}
var dataStorage = /* @__PURE__ */ Object.create(null);
function newStorage(provider, prefix) {
  return {
    provider,
    prefix,
    icons: /* @__PURE__ */ Object.create(null),
    missing: /* @__PURE__ */ new Set()
  };
}
function getStorage(provider, prefix) {
  const providerStorage = dataStorage[provider] || (dataStorage[provider] = /* @__PURE__ */ Object.create(null));
  return providerStorage[prefix] || (providerStorage[prefix] = newStorage(provider, prefix));
}
function addIconSet(storage3, data) {
  if (!quicklyValidateIconSet(data)) return [];
  return parseIconSet(data, (name, icon) => {
    if (icon) storage3.icons[name] = icon;
    else storage3.missing.add(name);
  });
}
function addIconToStorage(storage3, name, icon) {
  try {
    if (typeof icon.body === "string") {
      storage3.icons[name] = { ...icon };
      return true;
    }
  } catch (err) {
  }
  return false;
}
function listIcons$1(provider, prefix) {
  let allIcons = [];
  (typeof provider === "string" ? [provider] : Object.keys(dataStorage)).forEach((provider2) => {
    (typeof provider2 === "string" && typeof prefix === "string" ? [prefix] : Object.keys(dataStorage[provider2] || {})).forEach((prefix2) => {
      const storage3 = getStorage(provider2, prefix2);
      allIcons = allIcons.concat(Object.keys(storage3.icons).map((name) => (provider2 !== "" ? "@" + provider2 + ":" : "") + prefix2 + ":" + name));
    });
  });
  return allIcons;
}
var simpleNames = false;
function allowSimpleNames(allow) {
  if (typeof allow === "boolean") simpleNames = allow;
  return simpleNames;
}
function getIconData(name) {
  const icon = typeof name === "string" ? stringToIcon(name, true, simpleNames) : name;
  if (icon) {
    const storage3 = getStorage(icon.provider, icon.prefix);
    const iconName = icon.name;
    return storage3.icons[iconName] || (storage3.missing.has(iconName) ? null : void 0);
  }
}
function addIcon$1(name, data) {
  const icon = stringToIcon(name, true, simpleNames);
  if (!icon) return false;
  const storage3 = getStorage(icon.provider, icon.prefix);
  if (data) return addIconToStorage(storage3, icon.name, data);
  else {
    storage3.missing.add(icon.name);
    return true;
  }
}
function addCollection$1(data, provider) {
  if (typeof data !== "object") return false;
  if (typeof provider !== "string") provider = data.provider || "";
  if (simpleNames && !provider && !data.prefix) {
    let added = false;
    if (quicklyValidateIconSet(data)) {
      data.prefix = "";
      parseIconSet(data, (name, icon) => {
        if (addIcon$1(name, icon)) added = true;
      });
    }
    return added;
  }
  const prefix = data.prefix;
  if (!validateIconName({
    prefix,
    name: "a"
  })) return false;
  const storage3 = getStorage(provider, prefix);
  return !!addIconSet(storage3, data);
}
function iconLoaded$1(name) {
  return !!getIconData(name);
}
function getIcon$1(name) {
  const result = getIconData(name);
  return result ? {
    ...defaultIconProps,
    ...result
  } : result;
}
function removeCallback(storages, id) {
  storages.forEach((storage3) => {
    const items = storage3.loaderCallbacks;
    if (items) storage3.loaderCallbacks = items.filter((row) => row.id !== id);
  });
}
function updateCallbacks(storage3) {
  if (!storage3.pendingCallbacksFlag) {
    storage3.pendingCallbacksFlag = true;
    setTimeout(() => {
      storage3.pendingCallbacksFlag = false;
      const items = storage3.loaderCallbacks ? storage3.loaderCallbacks.slice(0) : [];
      if (!items.length) return;
      let hasPending = false;
      const provider = storage3.provider;
      const prefix = storage3.prefix;
      items.forEach((item) => {
        const icons = item.icons;
        const oldLength = icons.pending.length;
        icons.pending = icons.pending.filter((icon) => {
          if (icon.prefix !== prefix) return true;
          const name = icon.name;
          if (storage3.icons[name]) icons.loaded.push({
            provider,
            prefix,
            name
          });
          else if (storage3.missing.has(name)) icons.missing.push({
            provider,
            prefix,
            name
          });
          else {
            hasPending = true;
            return true;
          }
          return false;
        });
        if (icons.pending.length !== oldLength) {
          if (!hasPending) removeCallback([storage3], item.id);
          item.callback(icons.loaded.slice(0), icons.missing.slice(0), icons.pending.slice(0), item.abort);
        }
      });
    });
  }
}
var idCounter = 0;
function storeCallback(callback, icons, pendingSources) {
  const id = idCounter++;
  const abort = removeCallback.bind(null, pendingSources, id);
  if (!icons.pending.length) return abort;
  const item = {
    id,
    icons,
    callback,
    abort
  };
  pendingSources.forEach((storage3) => {
    (storage3.loaderCallbacks || (storage3.loaderCallbacks = [])).push(item);
  });
  return abort;
}
function sortIcons(icons) {
  const result = {
    loaded: [],
    missing: [],
    pending: []
  };
  const storage3 = /* @__PURE__ */ Object.create(null);
  icons.sort((a3, b4) => {
    if (a3.provider !== b4.provider) return a3.provider.localeCompare(b4.provider);
    if (a3.prefix !== b4.prefix) return a3.prefix.localeCompare(b4.prefix);
    return a3.name.localeCompare(b4.name);
  });
  let lastIcon = {
    provider: "",
    prefix: "",
    name: ""
  };
  icons.forEach((icon) => {
    if (lastIcon.name === icon.name && lastIcon.prefix === icon.prefix && lastIcon.provider === icon.provider) return;
    lastIcon = icon;
    const provider = icon.provider;
    const prefix = icon.prefix;
    const name = icon.name;
    const providerStorage = storage3[provider] || (storage3[provider] = /* @__PURE__ */ Object.create(null));
    const localStorage2 = providerStorage[prefix] || (providerStorage[prefix] = getStorage(provider, prefix));
    let list;
    if (name in localStorage2.icons) list = result.loaded;
    else if (prefix === "" || localStorage2.missing.has(name)) list = result.missing;
    else list = result.pending;
    const item = {
      provider,
      prefix,
      name
    };
    list.push(item);
  });
  return result;
}
var storage2 = /* @__PURE__ */ Object.create(null);
function setAPIModule(provider, item) {
  storage2[provider] = item;
}
function getAPIModule(provider) {
  return storage2[provider] || storage2[""];
}
function listToIcons(list, validate = true, simpleNames2 = false) {
  const result = [];
  list.forEach((item) => {
    const icon = typeof item === "string" ? stringToIcon(item, validate, simpleNames2) : item;
    if (icon) result.push(icon);
  });
  return result;
}
function createAPIConfig(source) {
  let resources;
  if (typeof source.resources === "string") resources = [source.resources];
  else {
    resources = source.resources;
    if (!(resources instanceof Array) || !resources.length) return null;
  }
  return {
    resources,
    path: source.path || "/",
    maxURL: source.maxURL || 500,
    rotate: source.rotate || 750,
    timeout: source.timeout || 5e3,
    random: source.random === true,
    index: source.index || 0,
    dataAfterTimeout: source.dataAfterTimeout !== false
  };
}
var configStorage = /* @__PURE__ */ Object.create(null);
var fallBackAPISources = ["https://api.simplesvg.com", "https://api.unisvg.com"];
var fallBackAPI = [];
while (fallBackAPISources.length > 0) if (fallBackAPISources.length === 1) fallBackAPI.push(fallBackAPISources.shift());
else if (Math.random() > 0.5) fallBackAPI.push(fallBackAPISources.shift());
else fallBackAPI.push(fallBackAPISources.pop());
configStorage[""] = createAPIConfig({ resources: ["https://api.iconify.design"].concat(fallBackAPI) });
function addAPIProvider$1(provider, customConfig) {
  const config = createAPIConfig(customConfig);
  if (config === null) return false;
  configStorage[provider] = config;
  return true;
}
function getAPIConfig(provider) {
  return configStorage[provider];
}
function listAPIProviders() {
  return Object.keys(configStorage);
}
var defaultConfig = {
  resources: [],
  index: 0,
  timeout: 2e3,
  rotate: 750,
  random: false,
  dataAfterTimeout: false
};
function sendQuery(config, payload, query, done) {
  const resourcesCount = config.resources.length;
  const startIndex = config.random ? Math.floor(Math.random() * resourcesCount) : config.index;
  let resources;
  if (config.random) {
    let list = config.resources.slice(0);
    resources = [];
    while (list.length > 1) {
      const nextIndex = Math.floor(Math.random() * list.length);
      resources.push(list[nextIndex]);
      list = list.slice(0, nextIndex).concat(list.slice(nextIndex + 1));
    }
    resources = resources.concat(list);
  } else resources = config.resources.slice(startIndex).concat(config.resources.slice(0, startIndex));
  const startTime = Date.now();
  let status = "pending";
  let queriesSent = 0;
  let lastError;
  let timer = null;
  let queue = [];
  let doneCallbacks = [];
  if (typeof done === "function") doneCallbacks.push(done);
  function resetTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }
  function abort() {
    if (status === "pending") status = "aborted";
    resetTimer();
    queue.forEach((item) => {
      if (item.status === "pending") item.status = "aborted";
    });
    queue = [];
  }
  function subscribe(callback, overwrite) {
    if (overwrite) doneCallbacks = [];
    if (typeof callback === "function") doneCallbacks.push(callback);
  }
  function getQueryStatus() {
    return {
      startTime,
      payload,
      status,
      queriesSent,
      queriesPending: queue.length,
      subscribe,
      abort
    };
  }
  function failQuery() {
    status = "failed";
    doneCallbacks.forEach((callback) => {
      callback(void 0, lastError);
    });
  }
  function clearQueue() {
    queue.forEach((item) => {
      if (item.status === "pending") item.status = "aborted";
    });
    queue = [];
  }
  function moduleResponse(item, response, data) {
    const isError = response !== "success";
    queue = queue.filter((queued) => queued !== item);
    switch (status) {
      case "pending":
        break;
      case "failed":
        if (isError || !config.dataAfterTimeout) return;
        break;
      default:
        return;
    }
    if (response === "abort") {
      lastError = data;
      failQuery();
      return;
    }
    if (isError) {
      lastError = data;
      if (!queue.length) {
        if (!resources.length) failQuery();
        else execNext();
      }
      return;
    }
    resetTimer();
    clearQueue();
    if (!config.random) {
      const index = config.resources.indexOf(item.resource);
      if (index !== -1 && index !== config.index) config.index = index;
    }
    status = "completed";
    doneCallbacks.forEach((callback) => {
      callback(data);
    });
  }
  function execNext() {
    if (status !== "pending") return;
    resetTimer();
    const resource = resources.shift();
    if (resource === void 0) {
      if (queue.length) {
        timer = setTimeout(() => {
          resetTimer();
          if (status === "pending") {
            clearQueue();
            failQuery();
          }
        }, config.timeout);
        return;
      }
      failQuery();
      return;
    }
    const item = {
      status: "pending",
      resource,
      callback: (status2, data) => {
        moduleResponse(item, status2, data);
      }
    };
    queue.push(item);
    queriesSent++;
    timer = setTimeout(execNext, config.rotate);
    query(resource, payload, item.callback);
  }
  setTimeout(execNext);
  return getQueryStatus;
}
function initRedundancy(cfg) {
  const config = {
    ...defaultConfig,
    ...cfg
  };
  let queries = [];
  function cleanup() {
    queries = queries.filter((item) => item().status === "pending");
  }
  function query(payload, queryCallback, doneCallback) {
    const query2 = sendQuery(config, payload, queryCallback, (data, error) => {
      cleanup();
      if (doneCallback) doneCallback(data, error);
    });
    queries.push(query2);
    return query2;
  }
  function find(callback) {
    return queries.find((value) => {
      return callback(value);
    }) || null;
  }
  return {
    query,
    find,
    setIndex: (index) => {
      config.index = index;
    },
    getIndex: () => config.index,
    cleanup
  };
}
function emptyCallback$1() {
}
var redundancyCache = /* @__PURE__ */ Object.create(null);
function getRedundancyCache(provider) {
  if (!redundancyCache[provider]) {
    const config = getAPIConfig(provider);
    if (!config) return;
    const cachedReundancy = {
      config,
      redundancy: initRedundancy(config)
    };
    redundancyCache[provider] = cachedReundancy;
  }
  return redundancyCache[provider];
}
function sendAPIQuery(target, query, callback) {
  let redundancy;
  let send2;
  if (typeof target === "string") {
    const api = getAPIModule(target);
    if (!api) {
      callback(void 0, 424);
      return emptyCallback$1;
    }
    send2 = api.send;
    const cached = getRedundancyCache(target);
    if (cached) redundancy = cached.redundancy;
  } else {
    const config = createAPIConfig(target);
    if (config) {
      redundancy = initRedundancy(config);
      const moduleKey = target.resources ? target.resources[0] : "";
      const api = getAPIModule(moduleKey);
      if (api) send2 = api.send;
    }
  }
  if (!redundancy || !send2) {
    callback(void 0, 424);
    return emptyCallback$1;
  }
  return redundancy.query(query, send2, callback)().abort;
}
function emptyCallback() {
}
function loadedNewIcons(storage3) {
  if (!storage3.iconsLoaderFlag) {
    storage3.iconsLoaderFlag = true;
    setTimeout(() => {
      storage3.iconsLoaderFlag = false;
      updateCallbacks(storage3);
    });
  }
}
function checkIconNamesForAPI(icons) {
  const valid = [];
  const invalid = [];
  icons.forEach((name) => {
    (name.match(matchIconName) ? valid : invalid).push(name);
  });
  return {
    valid,
    invalid
  };
}
function parseLoaderResponse(storage3, icons, data) {
  function checkMissing() {
    const pending = storage3.pendingIcons;
    icons.forEach((name) => {
      if (pending) pending.delete(name);
      if (!storage3.icons[name]) storage3.missing.add(name);
    });
  }
  if (data && typeof data === "object") try {
    if (!addIconSet(storage3, data).length) {
      checkMissing();
      return;
    }
  } catch (err) {
    console.error(err);
  }
  checkMissing();
  loadedNewIcons(storage3);
}
function parsePossiblyAsyncResponse(response, callback) {
  if (response instanceof Promise) response.then((data) => {
    callback(data);
  }).catch(() => {
    callback(null);
  });
  else callback(response);
}
function loadNewIcons(storage3, icons) {
  if (!storage3.iconsToLoad) storage3.iconsToLoad = icons;
  else storage3.iconsToLoad = storage3.iconsToLoad.concat(icons).sort();
  if (!storage3.iconsQueueFlag) {
    storage3.iconsQueueFlag = true;
    setTimeout(() => {
      storage3.iconsQueueFlag = false;
      const { provider, prefix } = storage3;
      const icons2 = storage3.iconsToLoad;
      delete storage3.iconsToLoad;
      if (!icons2 || !icons2.length) return;
      const customIconLoader = storage3.loadIcon;
      if (storage3.loadIcons && (icons2.length > 1 || !customIconLoader)) {
        parsePossiblyAsyncResponse(storage3.loadIcons(icons2, prefix, provider), (data) => {
          parseLoaderResponse(storage3, icons2, data);
        });
        return;
      }
      if (customIconLoader) {
        icons2.forEach((name) => {
          parsePossiblyAsyncResponse(customIconLoader(name, prefix, provider), (data) => {
            parseLoaderResponse(storage3, [name], data ? {
              prefix,
              icons: { [name]: data }
            } : null);
          });
        });
        return;
      }
      const { valid, invalid } = checkIconNamesForAPI(icons2);
      if (invalid.length) parseLoaderResponse(storage3, invalid, null);
      if (!valid.length) return;
      const api = prefix.match(matchIconName) ? getAPIModule(provider) : null;
      if (!api) {
        parseLoaderResponse(storage3, valid, null);
        return;
      }
      api.prepare(provider, prefix, valid).forEach((item) => {
        sendAPIQuery(provider, item, (data) => {
          parseLoaderResponse(storage3, item.icons, data);
        });
      });
    });
  }
}
var loadIcons$1 = (icons, callback) => {
  const cleanedIcons = listToIcons(icons, true, allowSimpleNames());
  const sortedIcons = sortIcons(cleanedIcons);
  if (!sortedIcons.pending.length) {
    let callCallback = true;
    if (callback) setTimeout(() => {
      if (callCallback) callback(sortedIcons.loaded, sortedIcons.missing, sortedIcons.pending, emptyCallback);
    });
    return () => {
      callCallback = false;
    };
  }
  const newIcons = /* @__PURE__ */ Object.create(null);
  const sources = [];
  let lastProvider, lastPrefix;
  sortedIcons.pending.forEach((icon) => {
    const { provider, prefix } = icon;
    if (prefix === lastPrefix && provider === lastProvider) return;
    lastProvider = provider;
    lastPrefix = prefix;
    sources.push(getStorage(provider, prefix));
    const providerNewIcons = newIcons[provider] || (newIcons[provider] = /* @__PURE__ */ Object.create(null));
    if (!providerNewIcons[prefix]) providerNewIcons[prefix] = [];
  });
  sortedIcons.pending.forEach((icon) => {
    const { provider, prefix, name } = icon;
    const storage3 = getStorage(provider, prefix);
    const pendingQueue = storage3.pendingIcons || (storage3.pendingIcons = /* @__PURE__ */ new Set());
    if (!pendingQueue.has(name)) {
      pendingQueue.add(name);
      newIcons[provider][prefix].push(name);
    }
  });
  sources.forEach((storage3) => {
    const list = newIcons[storage3.provider][storage3.prefix];
    if (list.length) loadNewIcons(storage3, list);
  });
  return callback ? storeCallback(callback, sortedIcons, sources) : emptyCallback;
};
var loadIcon$1 = (icon) => {
  return new Promise((fulfill, reject) => {
    const iconObj = typeof icon === "string" ? stringToIcon(icon, true) : icon;
    if (!iconObj) {
      reject(icon);
      return;
    }
    loadIcons$1([iconObj || icon], (loaded) => {
      if (loaded.length && iconObj) {
        const data = getIconData(iconObj);
        if (data) {
          fulfill({
            ...defaultIconProps,
            ...data
          });
          return;
        }
      }
      reject(icon);
    });
  });
};
function testIconObject(value) {
  try {
    const obj = typeof value === "string" ? JSON.parse(value) : value;
    if (typeof obj.body === "string") {
      return {
        ...obj
      };
    }
  } catch (err) {
  }
}
function parseIconValue(value, onload) {
  if (typeof value === "object") {
    const data2 = testIconObject(value);
    return {
      data: data2,
      value
    };
  }
  if (typeof value !== "string") {
    return {
      value
    };
  }
  if (value.includes("{")) {
    const data2 = testIconObject(value);
    if (data2) {
      return {
        data: data2,
        value
      };
    }
  }
  const name = stringToIcon(value, true, true);
  if (!name) {
    return {
      value
    };
  }
  const data = getIconData(name);
  if (data !== void 0 || !name.prefix) {
    return {
      value,
      name,
      data
      // could be 'null' -> icon is missing
    };
  }
  const loading = loadIcons$1([name], () => onload(value, name, getIconData(name)));
  return {
    value,
    name,
    loading
  };
}
var isBuggedSafari = false;
try {
  isBuggedSafari = navigator.vendor.indexOf("Apple") === 0;
} catch (err) {
}
function getRenderMode(body, mode) {
  switch (mode) {
    // Force mode
    case "svg":
    case "bg":
    case "mask":
      return mode;
  }
  if (mode !== "style" && (isBuggedSafari || body.indexOf("<a") === -1)) {
    return "svg";
  }
  return body.indexOf("currentColor") === -1 ? "bg" : "mask";
}
var unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
var unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
function calculateSize$1(size2, ratio, precision) {
  if (ratio === 1) return size2;
  precision = precision || 100;
  if (typeof size2 === "number") return Math.ceil(size2 * ratio * precision) / precision;
  if (typeof size2 !== "string") return size2;
  const oldParts = size2.split(unitsSplit);
  if (oldParts === null || !oldParts.length) return size2;
  const newParts = [];
  let code = oldParts.shift();
  let isNumber2 = unitsTest.test(code);
  while (true) {
    if (isNumber2) {
      const num = parseFloat(code);
      if (isNaN(num)) newParts.push(code);
      else newParts.push(Math.ceil(num * ratio * precision) / precision);
    } else newParts.push(code);
    code = oldParts.shift();
    if (code === void 0) return newParts.join("");
    isNumber2 = !isNumber2;
  }
}
function splitSVGDefs(content, tag = "defs") {
  let defs = "";
  const index = content.indexOf("<" + tag);
  while (index >= 0) {
    const start = content.indexOf(">", index);
    const end = content.indexOf("</" + tag);
    if (start === -1 || end === -1) break;
    const endEnd = content.indexOf(">", end);
    if (endEnd === -1) break;
    defs += content.slice(start + 1, end).trim();
    content = content.slice(0, index).trim() + content.slice(endEnd + 1);
  }
  return {
    defs,
    content
  };
}
function mergeDefsAndContent(defs, content) {
  return defs ? "<defs>" + defs + "</defs>" + content : content;
}
function wrapSVGContent(body, start, end) {
  const split = splitSVGDefs(body);
  return mergeDefsAndContent(split.defs, start + split.content + end);
}
var isUnsetKeyword = (value) => value === "unset" || value === "undefined" || value === "none";
function iconToSVG(icon, customisations) {
  const fullIcon = {
    ...defaultIconProps,
    ...icon
  };
  const fullCustomisations = {
    ...defaultIconCustomisations,
    ...customisations
  };
  const box = {
    left: fullIcon.left,
    top: fullIcon.top,
    width: fullIcon.width,
    height: fullIcon.height
  };
  let body = fullIcon.body;
  [fullIcon, fullCustomisations].forEach((props) => {
    const transformations = [];
    const hFlip = props.hFlip;
    const vFlip = props.vFlip;
    let rotation = props.rotate;
    if (hFlip) {
      if (vFlip) rotation += 2;
      else {
        transformations.push("translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")");
        transformations.push("scale(-1 1)");
        box.top = box.left = 0;
      }
    } else if (vFlip) {
      transformations.push("translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")");
      transformations.push("scale(1 -1)");
      box.top = box.left = 0;
    }
    let tempValue;
    if (rotation < 0) rotation -= Math.floor(rotation / 4) * 4;
    rotation = rotation % 4;
    switch (rotation) {
      case 1:
        tempValue = box.height / 2 + box.top;
        transformations.unshift("rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")");
        break;
      case 2:
        transformations.unshift("rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")");
        break;
      case 3:
        tempValue = box.width / 2 + box.left;
        transformations.unshift("rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")");
    }
    if (rotation % 2 === 1) {
      if (box.left !== box.top) {
        tempValue = box.left;
        box.left = box.top;
        box.top = tempValue;
      }
      if (box.width !== box.height) {
        tempValue = box.width;
        box.width = box.height;
        box.height = tempValue;
      }
    }
    if (transformations.length) body = wrapSVGContent(body, '<g transform="' + transformations.join(" ") + '">', "</g>");
  });
  const customisationsWidth = fullCustomisations.width;
  const customisationsHeight = fullCustomisations.height;
  const boxWidth = box.width;
  const boxHeight = box.height;
  let width;
  let height;
  if (customisationsWidth === null) {
    height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
    width = calculateSize$1(height, boxWidth / boxHeight);
  } else {
    width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
    height = customisationsHeight === null ? calculateSize$1(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
  }
  const attributes2 = {};
  const setAttr = (prop, value) => {
    if (!isUnsetKeyword(value)) attributes2[prop] = value.toString();
  };
  setAttr("width", width);
  setAttr("height", height);
  const viewBox = [
    box.left,
    box.top,
    boxWidth,
    boxHeight
  ];
  attributes2.viewBox = viewBox.join(" ");
  return {
    attributes: attributes2,
    viewBox,
    body
  };
}
function iconToHTML$1(body, attributes2) {
  let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
  for (const attr in attributes2) renderAttribsHTML += " " + attr + '="' + attributes2[attr] + '"';
  return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + ">" + body + "</svg>";
}
function encodeSVGforURL(svg) {
  return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ").replace(/:/g, "%3A").replace(/\//g, "%2F");
}
function svgToData(svg) {
  return "data:image/svg+xml," + encodeSVGforURL(svg);
}
function svgToURL$1(svg) {
  return 'url("' + svgToData(svg) + '")';
}
var detectFetch = () => {
  let callback;
  try {
    callback = fetch;
    if (typeof callback === "function") return callback;
  } catch (err) {
  }
};
var fetchModule = detectFetch();
function setFetch(fetch3) {
  fetchModule = fetch3;
}
function getFetch() {
  return fetchModule;
}
function calculateMaxLength(provider, prefix) {
  const config = getAPIConfig(provider);
  if (!config) return 0;
  let result;
  if (!config.maxURL) result = 0;
  else {
    let maxHostLength = 0;
    config.resources.forEach((item) => {
      maxHostLength = Math.max(maxHostLength, item.length);
    });
    const url = prefix + ".json?icons=";
    result = config.maxURL - maxHostLength - config.path.length - url.length;
  }
  return result;
}
function shouldAbort(status) {
  return status === 404;
}
var prepare = (provider, prefix, icons) => {
  const results = [];
  const maxLength = calculateMaxLength(provider, prefix);
  const type = "icons";
  let item = {
    type,
    provider,
    prefix,
    icons: []
  };
  let length = 0;
  icons.forEach((name, index) => {
    length += name.length + 1;
    if (length >= maxLength && index > 0) {
      results.push(item);
      item = {
        type,
        provider,
        prefix,
        icons: []
      };
      length = name.length;
    }
    item.icons.push(name);
  });
  results.push(item);
  return results;
};
function getPath(provider) {
  if (typeof provider === "string") {
    const config = getAPIConfig(provider);
    if (config) return config.path;
  }
  return "/";
}
var send = (host, params, callback) => {
  if (!fetchModule) {
    callback("abort", 424);
    return;
  }
  let path = getPath(params.provider);
  switch (params.type) {
    case "icons": {
      const prefix = params.prefix;
      const iconsList = params.icons.join(",");
      const urlParams = new URLSearchParams({ icons: iconsList });
      path += prefix + ".json?" + urlParams.toString();
      break;
    }
    case "custom": {
      const uri = params.uri;
      path += uri.slice(0, 1) === "/" ? uri.slice(1) : uri;
      break;
    }
    default:
      callback("abort", 400);
      return;
  }
  let defaultError = 503;
  fetchModule(host + path).then((response) => {
    const status = response.status;
    if (status !== 200) {
      setTimeout(() => {
        callback(shouldAbort(status) ? "abort" : "next", status);
      });
      return;
    }
    defaultError = 501;
    return response.json();
  }).then((data) => {
    if (typeof data !== "object" || data === null) {
      setTimeout(() => {
        if (data === 404) callback("abort", data);
        else callback("next", defaultError);
      });
      return;
    }
    setTimeout(() => {
      callback("success", data);
    });
  }).catch(() => {
    callback("next", defaultError);
  });
};
var fetchAPIModule = {
  prepare,
  send
};
function setCustomIconsLoader$1(loader, prefix, provider) {
  getStorage(provider || "", prefix).loadIcons = loader;
}
function setCustomIconLoader$1(loader, prefix, provider) {
  getStorage(provider || "", prefix).loadIcon = loader;
}
var nodeAttr = "data-style";
var customStyle = "";
var sharedSheets = {};
function getStyleContent(inline2) {
  return ":host{display:inline-block;vertical-align:" + (inline2 ? "-0.125em" : "0") + "}span,svg{display:block;margin:auto}" + customStyle;
}
function supportsAdoptedStyleSheets(parent) {
  return "adoptedStyleSheets" in parent && typeof CSSStyleSheet === "function" && typeof CSSStyleSheet.prototype.replaceSync === "function";
}
function getSharedSheet(inline2) {
  const key = inline2 ? "inline" : "block";
  let sheet = sharedSheets[key];
  if (!sheet) {
    sheet = sharedSheets[key] = new CSSStyleSheet();
    sheet.replaceSync(getStyleContent(inline2));
  }
  return sheet;
}
function appendCustomStyle(style) {
  customStyle = style;
  sharedSheets.inline?.replaceSync(getStyleContent(true));
  sharedSheets.block?.replaceSync(getStyleContent(false));
}
function updateStyle(parent, inline2) {
  if (supportsAdoptedStyleSheets(parent)) {
    const sheet = getSharedSheet(inline2);
    const current = parent.adoptedStyleSheets;
    if (current.includes(sheet)) {
      return;
    }
    parent.adoptedStyleSheets = current.filter((item) => item !== sharedSheets.inline && item !== sharedSheets.block).concat(sheet);
    return;
  }
  let styleNode = Array.from(parent.childNodes).find((node) => node.hasAttribute && node.hasAttribute(nodeAttr));
  if (!styleNode) {
    styleNode = document.createElement("style");
    styleNode.setAttribute(nodeAttr, nodeAttr);
    parent.appendChild(styleNode);
  }
  styleNode.textContent = getStyleContent(inline2);
}
function exportFunctions() {
  setAPIModule("", fetchAPIModule);
  allowSimpleNames(true);
  let _window;
  try {
    _window = window;
  } catch (err) {
  }
  if (_window) {
    if (_window.IconifyPreload !== void 0) {
      const preload = _window.IconifyPreload;
      const err = "Invalid IconifyPreload syntax.";
      if (typeof preload === "object" && preload !== null) {
        (preload instanceof Array ? preload : [preload]).forEach((item) => {
          try {
            if (
              // Check if item is an object and not null/array
              typeof item !== "object" || item === null || item instanceof Array || // Check for 'icons' and 'prefix'
              typeof item.icons !== "object" || typeof item.prefix !== "string" || // Add icon set
              !addCollection$1(item)
            ) {
              console.error(err);
            }
          } catch (e11) {
            console.error(err);
          }
        });
      }
    }
    if (_window.IconifyProviders !== void 0) {
      const providers = _window.IconifyProviders;
      if (typeof providers === "object" && providers !== null) {
        for (const key in providers) {
          const err = "IconifyProviders[" + key + "] is invalid.";
          try {
            const value = providers[key];
            if (typeof value !== "object" || !value || value.resources === void 0) {
              continue;
            }
            if (!addAPIProvider$1(key, value)) {
              console.error(err);
            }
          } catch (e11) {
            console.error(err);
          }
        }
      }
    }
  }
  const _api2 = {
    getAPIConfig,
    setAPIModule,
    sendAPIQuery,
    setFetch,
    getFetch,
    listAPIProviders
  };
  return {
    iconLoaded: iconLoaded$1,
    getIcon: getIcon$1,
    listIcons: listIcons$1,
    addIcon: addIcon$1,
    addCollection: addCollection$1,
    calculateSize: calculateSize$1,
    buildIcon: iconToSVG,
    iconToHTML: iconToHTML$1,
    svgToURL: svgToURL$1,
    loadIcons: loadIcons$1,
    loadIcon: loadIcon$1,
    addAPIProvider: addAPIProvider$1,
    setCustomIconLoader: setCustomIconLoader$1,
    setCustomIconsLoader: setCustomIconsLoader$1,
    appendCustomStyle,
    _api: _api2
  };
}
var monotoneProps = {
  "background-color": "currentColor"
};
var coloredProps = {
  "background-color": "transparent"
};
var propsToAdd = {
  image: "var(--svg)",
  repeat: "no-repeat",
  size: "100% 100%"
};
var propsToAddTo = {
  "-webkit-mask": monotoneProps,
  "mask": monotoneProps,
  "background": coloredProps
};
for (const prefix in propsToAddTo) {
  const list = propsToAddTo[prefix];
  for (const prop in propsToAdd) {
    list[prefix + "-" + prop] = propsToAdd[prop];
  }
}
function fixSize(value) {
  return value ? value + (value.match(/^[-0-9.]+$/) ? "px" : "") : "inherit";
}
function renderSPAN(data, icon, useMask) {
  const node = document.createElement("span");
  let body = data.body;
  if (body.indexOf("<a") !== -1) {
    body += "<!-- " + Date.now() + " -->";
  }
  const renderAttribs = data.attributes;
  const html = iconToHTML$1(body, {
    ...renderAttribs,
    width: icon.width + "",
    height: icon.height + ""
  });
  const url = svgToURL$1(html);
  const svgStyle = node.style;
  const styles = {
    "--svg": url,
    "width": fixSize(renderAttribs.width),
    "height": fixSize(renderAttribs.height),
    ...useMask ? monotoneProps : coloredProps
  };
  for (const prop in styles) {
    svgStyle.setProperty(prop, styles[prop]);
  }
  return node;
}
var policy;
function createPolicy() {
  try {
    policy = window.trustedTypes.createPolicy("iconify", { createHTML: (s8) => s8 });
  } catch (err) {
    policy = null;
  }
}
function cleanUpInnerHTML(html) {
  if (policy === void 0) createPolicy();
  return policy ? policy.createHTML(html) : html;
}
function renderSVG(data) {
  const node = document.createElement("span");
  const attr = data.attributes;
  let style = "";
  if (!attr.width) {
    style = "width: inherit;";
  }
  if (!attr.height) {
    style += "height: inherit;";
  }
  if (style) {
    attr.style = style;
  }
  const html = iconToHTML$1(data.body, attr);
  node.innerHTML = cleanUpInnerHTML(html);
  return node.firstChild;
}
function findIconElement(parent) {
  return Array.from(parent.childNodes).find((node) => {
    const tag = node.tagName && node.tagName.toUpperCase();
    return tag === "SPAN" || tag === "SVG";
  });
}
function renderIcon(parent, state) {
  const iconData = state.icon.data;
  const customisations = state.customisations;
  const renderData = iconToSVG(iconData, customisations);
  if (customisations.preserveAspectRatio) {
    renderData.attributes["preserveAspectRatio"] = customisations.preserveAspectRatio;
  }
  const mode = state.renderedMode;
  let node;
  switch (mode) {
    case "svg":
      node = renderSVG(renderData);
      break;
    default:
      node = renderSPAN(renderData, {
        ...defaultIconProps,
        ...iconData
      }, mode === "mask");
  }
  const oldNode = findIconElement(parent);
  if (oldNode) {
    if (node.tagName === "SPAN" && oldNode.tagName === node.tagName) {
      oldNode.setAttribute("style", node.getAttribute("style"));
    } else {
      parent.replaceChild(node, oldNode);
    }
  } else {
    parent.appendChild(node);
  }
}
function setPendingState(icon, inline2, lastState) {
  const lastRender = lastState && (lastState.rendered ? lastState : lastState.lastRender);
  return {
    rendered: false,
    inline: inline2,
    icon,
    lastRender
  };
}
function defineIconifyIcon(name = "iconify-icon") {
  let customElements3;
  let ParentClass;
  try {
    customElements3 = window.customElements;
    ParentClass = window.HTMLElement;
  } catch (err) {
    return;
  }
  if (!customElements3 || !ParentClass) {
    return;
  }
  const ConflictingClass = customElements3.get(name);
  if (ConflictingClass) {
    return ConflictingClass;
  }
  const attributes2 = [
    // Icon
    "icon",
    // Mode
    "mode",
    "inline",
    "noobserver",
    // Customisations
    "width",
    "height",
    "rotate",
    "flip"
  ];
  const IconifyIcon = class extends ParentClass {
    // Root
    _shadowRoot;
    // Initialised
    _initialised = false;
    // Icon state
    _state;
    // Attributes check queued
    _checkQueued = false;
    // Connected
    _connected = false;
    // Observer
    _observer = null;
    _visible = true;
    /**
     * Constructor
     */
    constructor() {
      super();
      const root = this._shadowRoot = this.attachShadow({
        mode: "open"
      });
      const inline2 = this.hasAttribute("inline");
      updateStyle(root, inline2);
      this._state = setPendingState({
        value: ""
      }, inline2);
      this._queueCheck();
    }
    /**
     * Connected to DOM
     */
    connectedCallback() {
      this._connected = true;
      this.startObserver();
    }
    /**
     * Disconnected from DOM
     */
    disconnectedCallback() {
      this._connected = false;
      this.stopObserver();
    }
    /**
     * Observed attributes
     */
    static get observedAttributes() {
      return attributes2.slice(0);
    }
    /**
     * Observed properties that are different from attributes
     *
     * Experimental! Need to test with various frameworks that support it
     */
    /*
    static get properties() {
        return {
            inline: {
                type: Boolean,
                reflect: true,
            },
            // Not listing other attributes because they are strings or combination
            // of string and another type. Cannot have multiple types
        };
    }
    */
    /**
     * Attribute has changed
     */
    attributeChangedCallback(name2) {
      switch (name2) {
        case "inline": {
          const newInline = this.hasAttribute("inline");
          const state = this._state;
          if (newInline !== state.inline) {
            state.inline = newInline;
            updateStyle(this._shadowRoot, newInline);
          }
          break;
        }
        case "noobserver": {
          const value = this.hasAttribute("noobserver");
          if (value) {
            this.startObserver();
          } else {
            this.stopObserver();
          }
          break;
        }
        default:
          this._queueCheck();
      }
    }
    /**
     * Get/set icon
     */
    get icon() {
      const value = this.getAttribute("icon");
      if (value && value.slice(0, 1) === "{") {
        try {
          return JSON.parse(value);
        } catch (err) {
        }
      }
      return value;
    }
    set icon(value) {
      if (typeof value === "object") {
        value = JSON.stringify(value);
      }
      this.setAttribute("icon", value);
    }
    /**
     * Get/set inline
     */
    get inline() {
      return this.hasAttribute("inline");
    }
    set inline(value) {
      if (value) {
        this.setAttribute("inline", "true");
      } else {
        this.removeAttribute("inline");
      }
    }
    /**
     * Get/set observer
     */
    get observer() {
      return this.hasAttribute("observer");
    }
    set observer(value) {
      if (value) {
        this.setAttribute("observer", "true");
      } else {
        this.removeAttribute("observer");
      }
    }
    /**
     * Restart animation
     */
    restartAnimation() {
      const state = this._state;
      if (state.rendered) {
        const root = this._shadowRoot;
        if (state.renderedMode === "svg") {
          try {
            root.lastChild.setCurrentTime(0);
            return;
          } catch (err) {
          }
        }
        renderIcon(root, state);
      }
    }
    /**
     * Get status
     */
    get status() {
      const state = this._state;
      return state.rendered ? "rendered" : state.icon.data === null ? "failed" : "loading";
    }
    /**
     * Queue attributes re-check
     */
    _queueCheck() {
      if (!this._checkQueued) {
        this._checkQueued = true;
        setTimeout(() => {
          this._check();
        });
      }
    }
    /**
     * Check for changes
     */
    _check() {
      if (!this._checkQueued) {
        return;
      }
      this._checkQueued = false;
      const state = this._state;
      const newIcon = this.getAttribute("icon");
      if (newIcon !== state.icon.value) {
        this._iconChanged(newIcon);
        return;
      }
      if (!state.rendered || !this._visible) {
        return;
      }
      const mode = this.getAttribute("mode");
      const customisations = getCustomisations(this);
      if (state.attrMode !== mode || haveCustomisationsChanged(state.customisations, customisations) || !findIconElement(this._shadowRoot)) {
        this._renderIcon(state.icon, customisations, mode);
      }
    }
    /**
     * Icon value has changed
     */
    _iconChanged(newValue) {
      const icon = parseIconValue(newValue, (value, name2, data) => {
        const state = this._state;
        if (state.rendered || this.getAttribute("icon") !== value) {
          return;
        }
        const icon2 = {
          value,
          name: name2,
          data
        };
        if (icon2.data) {
          this._gotIconData(icon2);
        } else {
          state.icon = icon2;
        }
      });
      if (icon.data) {
        this._gotIconData(icon);
      } else {
        this._state = setPendingState(icon, this._state.inline, this._state);
      }
    }
    /**
     * Force render icon on state change
     */
    _forceRender() {
      if (!this._visible) {
        const node = findIconElement(this._shadowRoot);
        if (node) {
          this._shadowRoot.removeChild(node);
        }
        return;
      }
      this._queueCheck();
    }
    /**
     * Got new icon data, icon is ready to (re)render
     */
    _gotIconData(icon) {
      this._checkQueued = false;
      this._renderIcon(icon, getCustomisations(this), this.getAttribute("mode"));
    }
    /**
     * Re-render based on icon data
     */
    _renderIcon(icon, customisations, attrMode) {
      const renderedMode = getRenderMode(icon.data.body, attrMode);
      const inline2 = this._state.inline;
      renderIcon(this._shadowRoot, this._state = {
        rendered: true,
        icon,
        inline: inline2,
        customisations,
        attrMode,
        renderedMode
      });
    }
    /**
     * Start observer
     */
    startObserver() {
      if (!this._observer && !this.hasAttribute("noobserver")) {
        try {
          this._observer = new IntersectionObserver((entries) => {
            const intersecting = entries.some((entry) => entry.isIntersecting);
            if (intersecting !== this._visible) {
              this._visible = intersecting;
              this._forceRender();
            }
          });
          this._observer.observe(this);
        } catch (err) {
          if (this._observer) {
            try {
              this._observer.disconnect();
            } catch (err2) {
            }
            this._observer = null;
          }
        }
      }
    }
    /**
     * Stop observer
     */
    stopObserver() {
      if (this._observer) {
        this._observer.disconnect();
        this._observer = null;
        this._visible = true;
        if (this._connected) {
          this._forceRender();
        }
      }
    }
  };
  attributes2.forEach((attr) => {
    if (!(attr in IconifyIcon.prototype)) {
      Object.defineProperty(IconifyIcon.prototype, attr, {
        get: function() {
          return this.getAttribute(attr);
        },
        set: function(value) {
          if (value !== null) {
            this.setAttribute(attr, value);
          } else {
            this.removeAttribute(attr);
          }
        }
      });
    }
  });
  const functions = exportFunctions();
  for (const key in functions) {
    IconifyIcon[key] = IconifyIcon.prototype[key] = functions[key];
  }
  customElements3.define(name, IconifyIcon);
  return IconifyIcon;
}
var IconifyIconComponent = defineIconifyIcon() || exportFunctions();
var { iconLoaded, getIcon, listIcons, addIcon, addCollection, calculateSize, buildIcon, iconToHTML, svgToURL, loadIcons, loadIcon, setCustomIconLoader, setCustomIconsLoader, addAPIProvider, _api } = IconifyIconComponent;

// node_modules/tslib/tslib.es6.mjs
function __decorate(decorators, target, key, desc) {
  var c6 = arguments.length, r10 = c6 < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d5;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r10 = Reflect.decorate(decorators, target, key, desc);
  else for (var i8 = decorators.length - 1; i8 >= 0; i8--) if (d5 = decorators[i8]) r10 = (c6 < 3 ? d5(r10) : c6 > 3 ? d5(target, key, r10) : d5(target, key)) || r10;
  return c6 > 3 && r10 && Object.defineProperty(target, key, r10), r10;
}

// node_modules/@vollowx/seele/src/m3/navigation/navigation-rail-styles.css.js
var navigationRailStyles = i3`:host{background-color:var(--md-sys-color-surface-container);box-sizing:border-box;-webkit-user-select:none;user-select:none;flex-shrink:0;grid-template-rows:min-content auto;justify-content:space-between;gap:40px;width:96px;height:100%;padding-block:20px;display:grid;overflow:visible}.actions{place-self:center;display:grid;position:sticky;top:-44px}::slotted(md-fab){box-shadow:none}.items{grid-template-areas:"stack";display:grid}slot:not([name]){flex-direction:column;grid-area:stack;gap:8px;padding:0;list-style:none;display:flex;position:relative}::slotted([end]){margin-block-start:auto}`;

// node_modules/@vollowx/seele/src/m3/navigation/navigation-rail.js
var M3NavigationRail = class M3NavigationRail2 extends i4 {
  get $items() {
    return [...this.querySelectorAll("md-nav-rail-item")];
  }
  static {
    this.styles = [navigationRailStyles];
  }
  render() {
    return T`<div class="actions"><slot name="menu"></slot><slot name="fab"></slot></div><div class="items"><slot></slot></div>`;
  }
};
M3NavigationRail = __decorate([
  t6("md-nav-rail")
], M3NavigationRail);

// node_modules/@vollowx/seele/src/base/mixins/internals-attached.js
var internals = /* @__PURE__ */ Symbol("internals");
var privateInternals = /* @__PURE__ */ Symbol("privateInternals");
var updateInternals = /* @__PURE__ */ Symbol("updateInternals");
var replaceStates = /* @__PURE__ */ Symbol("replaceStates");
var InternalsAttached = (superClass) => {
  class InternalsAttachedElement extends superClass {
    get [internals]() {
      if (!this[privateInternals]) {
        this[privateInternals] = this.attachInternals();
      }
      return this[privateInternals];
    }
    [replaceStates](del, add) {
      del.forEach((state) => this[internals].states.delete(state));
      add.forEach((state) => this[internals].states.add(state));
    }
  }
  return InternalsAttachedElement;
};

// node_modules/@vollowx/seele/src/base/mixins/form-associated.js
var FormAssociated = (superClass) => {
  class FormAssociatedElement extends superClass {
    static {
      this.formAssociated = true;
    }
    get form() {
      return this[internals].form;
    }
    get labels() {
      return this[internals].labels;
    }
    // From https://github.com/material-components/material-web/blob/main/labs/behaviors/form-associated.ts
    // Use @property for the `name` and `disabled` properties to add them to the
    // `observedAttributes` array and trigger `attributeChangedCallback()`.
    //
    // We don't use Lit's default getter/setter (`noAccessor: true`) because
    // the attributes need to be updated synchronously to work with synchronous
    // form APIs, and Lit updates attributes async by default.
    get name() {
      return this.getAttribute("name") ?? "";
    }
    set name(name) {
      this.setAttribute("name", name);
    }
    get disabled() {
      return this.hasAttribute("disabled");
    }
    set disabled(disabled) {
      this.toggleAttribute("disabled", disabled);
    }
    attributeChangedCallback(name, old, value) {
      if (name === "disabled") {
        this.requestUpdate("disabled", old !== null);
      }
      super.attributeChangedCallback(name, old, value);
    }
    get validity() {
      return this[internals].validity;
    }
    get validationMessage() {
      return this[internals].validationMessage;
    }
    get willValidate() {
      return this[internals].willValidate;
    }
    formDisabledCallback(disabled) {
      this.disabled = disabled;
    }
    checkValidity() {
      return this[internals].checkValidity();
    }
    reportValidity() {
      return this[internals].reportValidity();
    }
  }
  __decorate([
    n6({ noAccessor: true })
  ], FormAssociatedElement.prototype, "name", null);
  __decorate([
    n6({ type: Boolean, noAccessor: true })
  ], FormAssociatedElement.prototype, "disabled", null);
  return FormAssociatedElement;
};

// node_modules/@vollowx/seele/src/base/hidden-styles.css.js
var hiddenStyles = i3`:host([hidden]){visibility:hidden;display:none}`;

// node_modules/@vollowx/seele/src/base/button.js
var Base = FormAssociated(InternalsAttached(i4));
var Button = class extends Base {
  static {
    this.styles = [hiddenStyles];
  }
  constructor() {
    super();
    this.type = "button";
    this.#handleKeyDown = (e11) => {
      if (e11.key !== " " && e11.key !== "Enter")
        return;
      e11.preventDefault();
      e11.stopPropagation();
      if (e11.key === "Enter")
        this.click();
      else
        this[internals].states.add("active");
    };
    this.#handleKeyUp = (e11) => {
      if (e11.key === " " && this[internals].states.has("active")) {
        this[internals].states.delete("active");
        e11.preventDefault();
        e11.stopPropagation();
        this.click();
      }
    };
    this[internals].role = "button";
    this[updateInternals]();
    this.setAttribute("notransition", "");
    if (!o5) {
      this.addEventListener("keydown", this.#handleKeyDown);
      this.addEventListener("keyup", this.#handleKeyUp);
      this.addEventListener("click", this._handleClick.bind(this));
    }
  }
  connectedCallback() {
    super.connectedCallback();
    requestAnimationFrame(() => requestAnimationFrame(() => this.removeAttribute("notransition")));
  }
  updated(changed) {
    if (changed.has("disabled"))
      this[updateInternals]();
  }
  [updateInternals]() {
    this.tabIndex = this.disabled ? -1 : 0;
    this[internals].ariaDisabled = String(this.disabled);
  }
  #handleKeyDown;
  #handleKeyUp;
  _handleClick(e11) {
    if (this.type !== "button")
      this[internals].form?.[this.type]();
  }
};
__decorate([
  n6({ reflect: true })
], Button.prototype, "type", void 0);

// node_modules/@vollowx/seele/src/core/decorators.js
var wrappedCustomElement = (tagName, allowSSR = true) => {
  if (o5 && !allowSSR) {
    console.log(`[seele] <${tagName}> will not be rendered server-side`);
    return (cls) => cls;
  } else {
    return t6(tagName);
  }
};

// node_modules/@vollowx/seele/src/core/focus.js
var focusVisible = false;
function setFocusVisible(value) {
  focusVisible = value;
}
if (!o5) {
  window.addEventListener("keydown", () => focusVisible = true, {
    capture: true
  });
  window.addEventListener("mousedown", () => focusVisible = false, {
    capture: true
  });
}
function getFirstTabbable(root) {
  if (root.nodeName === "SLOT") {
    const assigned = root.assignedElements({
      flatten: true
    });
    for (const el of assigned) {
      const found = getFirstTabbable(el);
      if (found)
        return found;
    }
    return null;
  }
  if (root instanceof HTMLElement) {
    const isTabbable = root.tabIndex >= 0 && !root.hasAttribute("disabled") && !root.hidden && root.getAttribute("tabindex") !== "-1";
    if (isTabbable)
      return root;
  }
  if ("shadowRoot" in root && root.shadowRoot) {
    const found = getFirstTabbable(root.shadowRoot);
    if (found)
      return found;
  }
  for (const child of root.children) {
    const found = getFirstTabbable(child);
    if (found)
      return found;
  }
  return null;
}

// node_modules/@vollowx/seele/src/base/mixins/attachable.js
var autoAttachToParent = /* @__PURE__ */ Symbol("autoAttachToParent");
var handleControlChange = /* @__PURE__ */ Symbol("handleControlChange");
var Attachable = (superClass) => {
  var _a5;
  class AttachableElement extends superClass {
    constructor() {
      super(...arguments);
      this.#$control = null;
      this[_a5] = true;
    }
    /**
     * If has `for` attribute, use it to find the control element.
     * Otherwise, use the parent element as the control.
     */
    get $control() {
      if (this.hasAttribute("for")) {
        if (!this.htmlFor || !this.isConnected) {
          return null;
        }
        const root = this.getRootNode();
        if (!root || !("querySelector" in root)) {
          return null;
        }
        return root.querySelector(`#${CSS.escape(this.htmlFor)}`);
      }
      if (this.#$control) {
        return this.#$control;
      }
      if (!this[autoAttachToParent]) {
        return null;
      }
      return this.parentNode instanceof ShadowRoot ? this.parentNode.host : this.parentElement;
    }
    set $control(control) {
      if (control) {
        this.attach(control);
      } else {
        this.detach();
      }
    }
    connectedCallback() {
      super.connectedCallback();
      this.#setControl(this.$control);
    }
    disconnectedCallback() {
      this.#setControl(null);
      super.disconnectedCallback();
    }
    firstUpdated(changed) {
      super.firstUpdated(changed);
      if (!this.#$control && this.htmlFor) {
        this.#setControl(this.$control);
      }
    }
    updated(changed) {
      super.updated(changed);
      if (changed.has("htmlFor")) {
        this.#setControl(this.$control);
      }
    }
    attach(control, force = false) {
      this.#setControl(control, force);
      this.removeAttribute("for");
    }
    detach() {
      this.#setControl(null);
      this.removeAttribute("for");
      this[autoAttachToParent] = false;
    }
    /**
     * The control element currently attached to
     */
    #$control;
    #setControl(control, force = false) {
      if (control === this.#$control && !force)
        return;
      this[handleControlChange](this.#$control, control);
      this.#$control = control;
    }
    /**
     * Handles the first attaching and actual control element changing
     */
    [(_a5 = autoAttachToParent, handleControlChange)](_prev = null, _next = null) {
      console.warn("[seele] You should implement [onControlChange] on any class that mixes Attachable");
    }
  }
  __decorate([
    n6({ attribute: "for", type: String })
  ], AttachableElement.prototype, "htmlFor", void 0);
  return AttachableElement;
};

// node_modules/@vollowx/seele/src/m3/focus-ring/focus-ring-styles.css.js
var focusRingStyles = i3`:host{animation-delay:0s, calc(var(--md-focus-ring-duration,.6s) * .25);animation-duration:calc(var(--md-focus-ring-duration,.6s) * .25), calc(var(--md-focus-ring-duration,.6s) * .75);box-sizing:border-box;color:var(--md-focus-ring-color,var(--md-sys-color-secondary));pointer-events:none;animation-timing-function:cubic-bezier(.2,0,0,1),cubic-bezier(.2,0,0,1);display:none;position:absolute}:host(:state(visible)){display:flex}:host(:not([inward])){box-shadow:0 0 0 var(--md-focus-ring-width,3px) currentColor;inset:calc(-1 * var(--md-focus-ring-outward-offset,2px));border-start-start-radius:calc(var(--md-focus-ring-shape-start-start,var(--md-focus-ring-shape,9999px)) + var(--md-focus-ring-outward-offset,2px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end,var(--md-focus-ring-shape,9999px)) + var(--md-focus-ring-outward-offset,2px));border-end-end-radius:calc(var(--md-focus-ring-shape-end-end,var(--md-focus-ring-shape,9999px)) + var(--md-focus-ring-outward-offset,2px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start,var(--md-focus-ring-shape,9999px)) + var(--md-focus-ring-outward-offset,2px));animation-name:outward-grow,outward-shrink}:host([inward]){box-shadow:inset 0 0 0 var(--md-focus-ring-width,3px) currentColor;inset:var(--md-focus-ring-inward-offset,0px);border-start-start-radius:calc(var(--md-focus-ring-shape-start-start,var(--md-focus-ring-shape,9999px)) - var(--md-focus-ring-inward-offset,0px));border-start-end-radius:calc(var(--md-focus-ring-shape-start-end,var(--md-focus-ring-shape,9999px)) - var(--md-focus-ring-inward-offset,0px));border-end-end-radius:calc(var(--md-focus-ring-shape-end-end,var(--md-focus-ring-shape,9999px)) - var(--md-focus-ring-inward-offset,0px));border-end-start-radius:calc(var(--md-focus-ring-shape-end-start,var(--md-focus-ring-shape,9999px)) - var(--md-focus-ring-inward-offset,0px));animation-name:inward-grow,inward-shrink}@keyframes outward-grow{0%{box-shadow:0 0}to{box-shadow:0 0 0 var(--md-focus-ring-active-width,8px) currentColor}}@keyframes outward-shrink{0%{box-shadow:0 0 0 var(--md-focus-ring-active-width,8px) currentColor}}@keyframes inward-grow{0%{box-shadow:inset 0 0}to{box-shadow:inset 0 0 0 var(--md-focus-ring-active-width,8px) currentColor}}@keyframes inward-shrink{0%{box-shadow:inset 0 0 0 var(--md-focus-ring-active-width,8px) currentColor}}@media (prefers-reduced-motion){:host{animation:none}}@media (forced-colors:active){:host{color:highlight}}`;

// node_modules/@vollowx/seele/src/m3/focus-ring/focus-ring.js
var M3FocusRing = class M3FocusRing2 extends Attachable(InternalsAttached(i4)) {
  static {
    this.styles = [focusRingStyles];
  }
  constructor() {
    super();
    this.inward = false;
    this.#handleFocusIn = () => {
      this[replaceStates](["visible"], [focusVisible ? "visible" : null]);
    };
    this.#handleFocusOut = () => {
      this[internals].states.delete("visible");
    };
    this.#handlePointerDown = () => {
      this[internals].states.delete("visible");
    };
    this[internals].ariaHidden = "true";
  }
  #handleFocusIn;
  #handleFocusOut;
  #handlePointerDown;
  visualFocus() {
    this.#handleFocusIn();
  }
  visualBlur() {
    this.#handleFocusOut();
  }
  [handleControlChange](prev = null, next = null) {
    const eventHandlers = {
      focusin: this.#handleFocusIn,
      focusout: this.#handleFocusOut,
      pointerdown: this.#handlePointerDown
    };
    Object.keys(eventHandlers).forEach((eventName) => {
      prev?.removeEventListener(eventName, eventHandlers[eventName]);
      next?.addEventListener(eventName, eventHandlers[eventName]);
    });
  }
};
__decorate([
  n6({ type: Boolean, reflect: true })
], M3FocusRing.prototype, "inward", void 0);
M3FocusRing = __decorate([
  wrappedCustomElement("md-focus-ring", false)
], M3FocusRing);

// node_modules/@vollowx/seele/src/m3/ripple/ripple-styles.css.js
var rippleStyles = i3`:host{--_color:var(--md-ripple-color,currentColor);border-radius:inherit;pointer-events:none;display:block;position:absolute;inset:0;overflow:hidden}[part~=ripple]{background-image:radial-gradient(closest-side, var(--_color) max(calc(100% - 70px), 65%), transparent 100%);position:absolute;top:0;left:0}:host:before{background-color:var(--_color);border-radius:inherit;content:"";opacity:0;transition:opacity 67ms linear;display:block;position:absolute;inset:0}:host(:state(hover)):before{opacity:.08}@media (forced-colors:active){:host{--_color:var(--md-ripple-color,Highlight)}}`;

// node_modules/@vollowx/seele/src/m3/ripple/ripple.js
var PRESS_GROW_MS = 450;
var MINIMUM_PRESS_MS = 225;
var OPACITY_IN_MS = 105;
var OPACITY_OUT_MS = 375;
var distance = ({ x: ax, y: ay }, { x: bx, y: by }) => {
  return Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2);
};
var M3Ripple = class M3Ripple2 extends Attachable(InternalsAttached(i4)) {
  static {
    this.styles = [rippleStyles];
  }
  constructor() {
    super();
    this.clickBehavior = "always";
    this.enterBehavior = "always";
    this.spaceBehavior = "once";
    this.$ripples = [];
    this.#spaceKeyDown = false;
    this.#pointerDown = false;
    this.#lastTime = 0;
    this.handleKeyDown = (e11) => {
      if (e11.key === "Enter" && this.enterBehavior === "always" || e11.key === " " && this.spaceBehavior === "always") {
        this.addRipple();
        this.keepLastRipple();
      } else if (e11.key === " " && this.spaceBehavior === "once") {
        if (!this.#spaceKeyDown)
          this.addRipple();
        this.#spaceKeyDown = true;
      }
    };
    this.handleKeyUp = (e11) => {
      if (e11.key === " " && this.spaceBehavior === "once") {
        this.#spaceKeyDown = false;
        this.keepLastRipple();
      }
    };
    this.handlePointerEnter = (e11) => {
      if (e11.pointerType === "touch")
        return;
      this[internals].states.add("hover");
      if (this.#pointerDown && this.clickBehavior === "always")
        this.addRipple(e11);
    };
    this.handlePointerLeave = () => {
      this[internals].states.delete("hover");
      if (this.#pointerDown && this.clickBehavior === "always")
        this.keepLastRipple();
    };
    this.handlePointerDown = (e11) => {
      if (e11.pointerType === "mouse")
        this.#pointerDown = true;
      document.addEventListener("pointerup", this.handlePointerUp);
      document.addEventListener("touchcancel", this.handlePointerUp);
      document.addEventListener("touchend", this.handlePointerUp);
      document.addEventListener("touchmove", this.handlePointerUp);
      if (e11.button !== 0)
        return;
      if (this.clickBehavior === "always")
        this.addRipple(e11);
    };
    this.handlePointerUp = () => {
      this.#pointerDown = false;
      document.removeEventListener("pointerup", this.handlePointerUp);
      document.removeEventListener("touchcancel", this.handlePointerUp);
      document.removeEventListener("touchend", this.handlePointerUp);
      document.removeEventListener("touchmove", this.handlePointerUp);
      this.keepLastRipple();
    };
    this[internals].ariaHidden = "true";
  }
  #spaceKeyDown;
  #pointerDown;
  #lastTime;
  [handleControlChange](prev = null, next = null) {
    const eventHandlers = {
      keydown: { fn: this.handleKeyDown, kbd: true },
      keyup: { fn: this.handleKeyUp, kbd: true },
      pointerenter: { fn: this.handlePointerEnter, kbd: false },
      pointerleave: { fn: this.handlePointerLeave, kbd: false },
      pointerdown: { fn: this.handlePointerDown, kbd: false }
    };
    Object.entries(eventHandlers).forEach(([eventName, { fn, kbd }]) => {
      prev?.labels?.forEach((label) => label.removeEventListener(eventName, fn));
      prev?.removeEventListener(eventName, fn);
      let isNestedInLabel = false;
      next?.labels?.forEach((label) => {
        if (label.contains(next)) {
          isNestedInLabel = true;
        }
        if (!kbd) {
          label.addEventListener(eventName, fn);
        }
      });
      if (!isNestedInLabel || kbd) {
        next?.addEventListener(eventName, fn);
      }
    });
  }
  #calculateRipple(e11 = null) {
    const containerRect = this.getBoundingClientRect();
    const containerMiddle = {
      x: containerRect.width / 2,
      y: containerRect.height / 2
    };
    const centered = !e11;
    const endCenter = containerMiddle;
    let startCenter = { ...endCenter };
    if (!centered) {
      startCenter.x = e11.clientX - containerRect.left;
      startCenter.y = e11.clientY - containerRect.top;
    }
    const corners = [
      { x: 0, y: 0 },
      { x: containerRect.width, y: 0 },
      { x: 0, y: containerRect.height },
      { x: containerRect.width, y: containerRect.height }
    ];
    const radius = Math.max(...corners.map((corner) => distance(endCenter, corner)));
    return { startCenter, endCenter, radius };
  }
  addRipple(e11 = null) {
    const { startCenter, endCenter, radius } = this.#calculateRipple(e11);
    const diameter = radius * 2 + "px";
    const translateStart = `${startCenter.x - radius}px ${startCenter.y - radius}px`;
    const translateEnd = `${endCenter.x - radius}px ${endCenter.y - radius}px`;
    const ripple = document.createElement("div");
    ripple.setAttribute("part", "ripple");
    this.renderRoot.append(ripple);
    this.$ripples.push(ripple);
    ripple.animate({
      opacity: [0, 0.1]
    }, {
      duration: OPACITY_IN_MS,
      easing: "linear",
      fill: "forwards"
    });
    ripple.animate({
      height: [diameter, diameter],
      width: [diameter, diameter],
      translate: [translateStart, translateEnd],
      scale: [0.2, 1.35]
    }, {
      duration: PRESS_GROW_MS,
      easing: "cubic-bezier(0.2, 0, 0, 1)",
      fill: "forwards"
    });
    this.#lastTime = Date.now();
  }
  removeRipple(ripple) {
    setTimeout(() => {
      const animation = ripple.animate({
        opacity: [getComputedStyle(ripple).opacity, "0"]
      }, {
        duration: OPACITY_OUT_MS,
        fill: "forwards",
        easing: "linear"
      });
      animation.onfinish = animation.oncancel = () => ripple.remove();
    }, Math.max(MINIMUM_PRESS_MS - (Date.now() - this.#lastTime), 0));
  }
  keepLastRipple() {
    for (const ripple of this.$ripples.splice(0))
      this.removeRipple(ripple);
  }
};
__decorate([
  n6({ attribute: "click-behavior" })
], M3Ripple.prototype, "clickBehavior", void 0);
__decorate([
  n6({ attribute: "enter-behavior" })
], M3Ripple.prototype, "enterBehavior", void 0);
__decorate([
  n6({ attribute: "space-behavior" })
], M3Ripple.prototype, "spaceBehavior", void 0);
M3Ripple = __decorate([
  wrappedCustomElement("md-ripple", false)
], M3Ripple);

// node_modules/@vollowx/seele/src/m3/navigation/navigation-rail-item-styles.css.js
var navigationRailItemStyles = i3`:host{color:var(--md-sys-color-on-surface-variant);cursor:pointer;outline:0;grid-template-rows:40px 1fr;justify-content:flex-start;width:max-content;display:grid;position:relative}.pill-root{grid-template:".start icon.label end."32px/20px 16px 24px 0 0fr 16px 20px;place-self:center;display:grid;position:relative}.pill{border-radius:9999px;grid-area:1/start-start/auto/end-end;position:relative}::slotted(*){fill:currentColor;place-self:center;block-size:1em;inline-size:1em;font-size:24px;position:absolute}::slotted([slot=active]){opacity:0}.label-inside{font:var(--md-sys-typography-label-large);display:none}.label-outside{font:var(--md-sys-typography-label-medium);pointer-events:none;text-align:center;word-break:break-word;grid-template-rows:1fr;width:96px;display:block;overflow:hidden}:host([active]){& .pill{color:var(--md-sys-color-on-secondary-container)}& md-ripple{background-color:var(--md-sys-color-secondary-container)}& ::slotted([slot=active]){opacity:1}& ::slotted(:not([slot=active])){opacity:0}& .label-outside{color:var(--md-sys-color-secondary)}}`;

// node_modules/@vollowx/seele/src/m3/navigation/navigation-rail-item.js
var M3NavigationRailItem = class M3NavigationRailItem2 extends Button {
  constructor() {
    super(...arguments);
    this.active = false;
  }
  static {
    this.styles = [navigationRailItemStyles];
  }
  render() {
    return T`<div class="pill-root"><div class="pill"><md-focus-ring></md-focus-ring><md-ripple></md-ripple></div><slot aria-hidden="true"></slot><slot aria-hidden="true" name="active"></slot><span class="label-inside">${this.label}</span></div><span class="label-outside">${this.label}</span>`;
  }
  updated(changed) {
    if (changed.has("label"))
      this[internals].ariaLabel = this.label;
    if (changed.has("active"))
      this[internals].ariaCurrent = this.active ? "true" : null;
  }
  firstUpdated() {
    this.$focusRing.attach(this);
    this.$ripple.attach(this);
  }
};
__decorate([
  n6({ reflect: true })
], M3NavigationRailItem.prototype, "label", void 0);
__decorate([
  n6({ type: Boolean, reflect: true })
], M3NavigationRailItem.prototype, "active", void 0);
__decorate([
  e9("md-focus-ring")
], M3NavigationRailItem.prototype, "$focusRing", void 0);
__decorate([
  e9("md-ripple")
], M3NavigationRailItem.prototype, "$ripple", void 0);
M3NavigationRailItem = __decorate([
  t6("md-nav-rail-item")
], M3NavigationRailItem);

// node_modules/@vollowx/seele/src/m3/fab/fab-styles.css.js
var fabStyles = i3`:host{--md-focus-ring-shape:var(--_border-radius);--_size:56px;--_border-radius:16px;--_icon-size:24px;background-color:var(--md-sys-color-primary);border-radius:var(--_border-radius);box-shadow:var(--md-sys-elevation-shadow-3);box-sizing:border-box;color:var(--md-sys-color-on-primary);cursor:pointer;font:var(--md-sys-typography-label-large);height:var(--_size);min-width:var(--_size);padding-inline:calc((var(--_size) - var(--_icon-size)) / 2);-webkit-tap-highlight-color:transparent;transition:box-shadow var(--md-sys-motion-effects-default-duration) var(--md-sys-motion-effects-default);-webkit-user-select:none;user-select:none;vertical-align:middle;outline:0;justify-content:center;align-items:center;gap:8px;display:inline-flex;position:relative}md-ripple,md-focus-ring{position:absolute}:host([size=m]){--_size:80px;--_border-radius:20px;--_icon-size:28px}:host([size=l]){--_size:96px;--_border-radius:28px;--_icon-size:36px}:host([color=primary-container]){color:var(--md-sys-color-on-primary-container);background-color:var(--md-sys-color-primary-container)}:host([color=secondary-container]){color:var(--md-sys-color-on-secondary-container);background-color:var(--md-sys-color-secondary-container)}:host([color=tertiary-container]){color:var(--md-sys-color-on-tertiary-container);background-color:var(--md-sys-color-tertiary-container)}:host([color=secondary]){color:var(--md-sys-color-on-secondary);background-color:var(--md-sys-color-secondary)}:host([color=tertiary]){color:var(--md-sys-color-on-tertiary);background-color:var(--md-sys-color-tertiary)}:host([color=surface]){color:var(--md-sys-color-primary);background-color:var(--md-sys-color-surface-container-high)}:host(:disabled){background-color:oklch(from var(--md-sys-color-on-surface) l c h / 10%);color:oklch(from var(--md-sys-color-on-surface) l c h / 38%);box-shadow:none;pointer-events:none}@media (hover:hover) and (pointer:fine){:host(:hover:not(:active)){box-shadow:var(--md-sys-elevation-shadow-4)}}::slotted(:not([slot=label])){fill:currentColor;block-size:1em;font-size:var(--_icon-size);inline-size:1em}::slotted([slot=label]){margin-inline:4px}@media (forced-colors:active){:host{forced-color-adjust:none;color:buttontext;background:buttonface;border:1px solid buttonborder}}`;

// node_modules/@vollowx/seele/src/m3/target-styles.css.js
var targetStyles = i3`[part~=target]{box-sizing:border-box;content:"";width:100%;min-width:48px;height:100%;min-height:48px;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}`;

// node_modules/@vollowx/seele/src/m3/fab/fab.js
var M3Fab = class M3Fab2 extends Button {
  constructor() {
    super(...arguments);
    this.size = "s";
    this.color = "primary";
  }
  static {
    this.styles = [...super.styles, targetStyles, fabStyles];
  }
  render() {
    return T`<md-focus-ring></md-focus-ring><md-ripple></md-ripple><span part="target"></span><slot part="icon" aria-hidden="true"></slot><slot part="label" name="label"></slot>`;
  }
};
__decorate([
  n6({ reflect: true })
], M3Fab.prototype, "size", void 0);
__decorate([
  n6({ reflect: true })
], M3Fab.prototype, "color", void 0);
M3Fab = __decorate([
  t6("md-fab")
], M3Fab);

// src/lib/timezones.ts
var KEY = "timor.timezones";
var _all = null;
function allTimezones() {
  if (_all) return _all;
  try {
    _all = Intl.supportedValuesOf("timeZone").map((id) => {
      const parts = id.split("/");
      const city = parts[parts.length - 1].replace(/_/g, " ");
      const region = parts.length > 1 ? parts[0].replace(/_/g, " ") : "";
      const label = region && region !== city ? `${city}, ${region}` : city;
      return { id, label };
    });
  } catch {
    _all = [];
  }
  return _all;
}
function tzOffset(id) {
  const now = /* @__PURE__ */ new Date();
  const fmt = new Intl.DateTimeFormat("en", { timeZone: id, timeZoneName: "longOffset" });
  const off = fmt.formatToParts(now).find((p5) => p5.type === "timeZoneName")?.value ?? "GMT";
  const m6 = off.match(/GMT([+-]\d+):?(\d+)?/);
  return m6 ? parseInt(m6[1]) * 60 + (m6[1][0] === "-" ? -1 : 1) * (parseInt(m6[2] ?? "0") || 0) : 0;
}
function systemTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "UTC";
  }
}
var TimezoneStore = class extends EventTarget {
  #selected;
  constructor() {
    super();
    const saved = readJSON(KEY);
    this.#selected = Array.isArray(saved) ? [...new Set(saved)] : [systemTimezone()];
  }
  get list() {
    return this.#selected;
  }
  add(id) {
    if (this.#selected.includes(id)) return;
    this.#selected = [...this.#selected, id];
    this.#save();
  }
  remove(id) {
    if (this.#selected.length <= 1) return;
    this.#selected = this.#selected.filter((t7) => t7 !== id);
    this.#save();
  }
  reorder(from, to) {
    const list = [...this.#selected];
    const [item] = list.splice(from, 1);
    list.splice(to, 0, item);
    this.#selected = list;
    this.#save();
  }
  #save() {
    writeJSON(KEY, this.#selected);
    this.dispatchEvent(new Event("change"));
  }
};
var timezoneStore = new TimezoneStore();

// node_modules/@vollowx/seele/src/m3/loading/loading-styles.css.js
var loadingStyles = i3`:host{aspect-ratio:1;background-color:var(--md-sys-color-surface);border-radius:9999px;place-items:center;width:48px;display:grid}:host([contained]){background-color:var(--md-sys-color-primary-container)}canvas{width:82%;height:82%;display:block}`;

// node_modules/@vollowx/seele/src/m3/loading/loading.js
var STEP_MS = 650;
var FULL_ROTATION_MS = 4666;
var QUARTER_ROTATION = 90;
var TOTAL_POINTS = 240;
var CANVAS_SIZE = 640;
var RADIUS_BASE = CANVAS_SIZE / 2;
var CENTER = CANVAS_SIZE / 2;
var M3Loading = class M3Loading2 extends InternalsAttached(i4) {
  static {
    this.styles = [loadingStyles];
  }
  render() {
    return T`<canvas width="${CANVAS_SIZE}" height="${CANVAS_SIZE}" aria-hidden="true"></canvas>`;
  }
  #ctx;
  #animationFrame;
  #startTime;
  #color;
  constructor() {
    super();
    this.contained = false;
    this.#animationFrame = 0;
    this.#startTime = 0;
    this.#color = "#ff0000";
    this.#animate = (now) => {
      if (this.#startTime === 0) {
        this.#startTime = now;
      }
      const elapsed = now - this.#startTime;
      const step = Math.floor(elapsed / STEP_MS);
      const morphElapsed = elapsed % STEP_MS;
      const progress = springProgress(morphElapsed);
      const from = sampledSequence[step % sampledSequence.length];
      const to = sampledSequence[(step + 1) % sampledSequence.length];
      const stepRotation = step * QUARTER_ROTATION + progress * QUARTER_ROTATION;
      const globalRotation = elapsed % FULL_ROTATION_MS / FULL_ROTATION_MS * 360;
      this.#draw(from, to, progress, stepRotation + globalRotation, scalePulse(morphElapsed));
      this.#animationFrame = requestAnimationFrame(this.#animate);
    };
    this[internals].role = "progressbar";
    this[internals].ariaValueMin = "0";
    this[internals].ariaValueMax = "1";
  }
  firstUpdated() {
    this.#ctx = this.$canvas.getContext("2d");
    this.#cacheColors();
    setInterval(this.#cacheColors.bind(this), 1e3);
    this.#animationFrame = requestAnimationFrame(this.#animate);
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    cancelAnimationFrame(this.#animationFrame);
  }
  #cacheColors() {
    const computed = getComputedStyle(this);
    const color = computed.getPropertyValue(this.contained ? "--md-sys-color-on-primary-container" : "--md-sys-color-primary").trim();
    if (color)
      this.#color = color;
  }
  #draw(from, to, progress, rotation, scale) {
    if (!this.#ctx || !this.$canvas)
      return;
    const ctx = this.#ctx;
    ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    ctx.save();
    ctx.translate(CENTER, CENTER);
    ctx.scale(scale, scale);
    ctx.rotate(rotation * Math.PI / 180);
    ctx.translate(-CENTER, -CENTER);
    ctx.beginPath();
    from.points.forEach((point, i8) => {
      const next = to.points[i8];
      const x3 = lerp(point.x, next.x, progress);
      const y3 = lerp(point.y, next.y, progress);
      if (i8 === 0)
        ctx.moveTo(x3, y3);
      else
        ctx.lineTo(x3, y3);
    });
    ctx.closePath();
    ctx.fillStyle = this.#color;
    ctx.fill();
    ctx.restore();
  }
  #animate;
};
__decorate([
  n6({ type: Boolean, reflect: true })
], M3Loading.prototype, "contained", void 0);
__decorate([
  e9("canvas")
], M3Loading.prototype, "$canvas", void 0);
M3Loading = __decorate([
  t6("md-loading")
], M3Loading);
var lerp = (a3, b4, t7) => a3 + (b4 - a3) * t7;
var clamp = (v3, lo, hi) => Math.max(lo, Math.min(hi, v3));
var dist = (a3, b4) => Math.hypot(a3.x - b4.x, a3.y - b4.y);
var norm = (x3, y3, fallback = { x: 1, y: 0 }) => {
  const len = Math.hypot(x3, y3);
  return len < 1e-6 ? fallback : { x: x3 / len, y: y3 / len };
};
var sequence = [
  [10, 0.85, 0.67, 0.75, 0.5],
  [9, 0.85, 0.755, 0.8, 0.5],
  [5, 0.85, 0.731, 0.45, 1],
  [2, 0.85, 0.67, 0.8, 0.95],
  [8, 0.85, 0.731, 0.6, 0.45],
  [4, 0.925, 0.67, 1, 0.4],
  [2, 0.9, 0.565, 0.8, 0.6]
].map(([points, outerRadius, innerRadius, outerRoundness, innerRoundness]) => ({
  points,
  outerRadius,
  innerRadius,
  outerRoundness,
  innerRoundness
}));
function springProgress(ms) {
  const t7 = ms / 1e3;
  const stiffness = 200;
  const damping = 0.6;
  const omega0 = Math.sqrt(stiffness);
  const omegaD = omega0 * Math.sqrt(1 - damping * damping);
  const displacement = Math.exp(-damping * omega0 * t7) * (-Math.cos(omegaD * t7) - damping * omega0 / omegaD * Math.sin(omegaD * t7));
  return clamp(1 + displacement, 0, 1);
}
function scalePulse(ms) {
  const t7 = ms / STEP_MS;
  const smooth = (p5) => p5 * p5 * (3 - 2 * p5);
  const outCubic = (p5) => 1 - (1 - p5) ** 3;
  const segments = [
    [0, 0.14, 1, 0.985, smooth],
    [0.14, 0.46, 0.985, 1.04, outCubic],
    [0.46, 0.76, 1.04, 1, smooth]
  ];
  const segment = segments.find(([start2, end2]) => t7 < end2 && t7 >= start2);
  if (!segment)
    return 1;
  const [start, end, from, to, ease] = segment;
  return lerp(from, to, ease((t7 - start) / (end - start)));
}
function starGeometry(shape) {
  const points = Math.max(2, Math.floor(shape.points));
  const count = points * 2;
  const anchors = Array.from({ length: count }, (_2, i8) => {
    const outer = i8 % 2 === 0;
    const radius = (outer ? shape.outerRadius : shape.innerRadius) * RADIUS_BASE;
    const angle = i8 * Math.PI / points;
    return {
      x: CENTER + Math.cos(angle) * radius,
      y: CENTER + Math.sin(angle) * radius,
      outer
    };
  });
  const tangents = anchors.map((_2, i8) => {
    const prev = anchors[(i8 - 1 + count) % count];
    const next = anchors[(i8 + 1) % count];
    return norm(next.x - prev.x, next.y - prev.y);
  });
  const lengths = anchors.map((anchor, i8) => {
    const prev = anchors[(i8 - 1 + count) % count];
    const next = anchors[(i8 + 1) % count];
    const roundness = anchor.outer ? shape.outerRoundness : shape.innerRoundness;
    return Math.max(0, roundness) * Math.min(dist(anchor, prev), dist(anchor, next)) * 0.5;
  });
  const handles = anchors.map((anchor, i8) => {
    const tangent = tangents[i8];
    const length = lengths[i8];
    return {
      in: {
        x: anchor.x - tangent.x * length,
        y: anchor.y - tangent.y * length
      },
      out: {
        x: anchor.x + tangent.x * length,
        y: anchor.y + tangent.y * length
      }
    };
  });
  return { anchors, handles };
}
function cubic(p0, c1, c22, p1, t7) {
  const inv = 1 - t7;
  return {
    x: inv ** 3 * p0.x + 3 * inv * inv * t7 * c1.x + 3 * inv * t7 * t7 * c22.x + t7 ** 3 * p1.x,
    y: inv ** 3 * p0.y + 3 * inv * inv * t7 * c1.y + 3 * inv * t7 * t7 * c22.y + t7 ** 3 * p1.y
  };
}
function resample(points) {
  const lengths = points.map((point, i8) => dist(point, points[(i8 + 1) % points.length]));
  const perimeter = lengths.reduce((sum, length) => sum + length, 0);
  const sampled = [];
  let edge = 0;
  let consumed = 0;
  for (let i8 = 0; i8 < TOTAL_POINTS; i8++) {
    const target = perimeter * i8 / TOTAL_POINTS;
    while (consumed + lengths[edge] < target && edge < lengths.length - 1) {
      consumed += lengths[edge++];
    }
    const point = points[edge];
    const next = points[(edge + 1) % points.length];
    const t7 = (target - consumed) / (lengths[edge] || 1);
    sampled.push({ x: lerp(point.x, next.x, t7), y: lerp(point.y, next.y, t7) });
  }
  return sampled;
}
function sampleShape(shape) {
  const { anchors, handles } = starGeometry(shape);
  const dense = [];
  anchors.forEach((anchor, i8) => {
    const next = (i8 + 1) % anchors.length;
    for (let step = 0; step < 18; step++) {
      dense.push(cubic(anchor, handles[i8].out, handles[next].in, anchors[next], step / 18));
    }
  });
  return { points: resample(dense) };
}
function shifted(points, offset3) {
  return points.map((_2, i8) => points[(i8 + offset3) % points.length]);
}
function alignTo(from, to) {
  let bestOffset = 0;
  let bestScore = Infinity;
  for (let offset3 = 0; offset3 < to.points.length; offset3++) {
    let score = 0;
    for (let i8 = 0; i8 < from.points.length; i8 += 4) {
      const point = to.points[(i8 + offset3) % to.points.length];
      score += (from.points[i8].x - point.x) ** 2 + (from.points[i8].y - point.y) ** 2;
    }
    if (score < bestScore) {
      bestScore = score;
      bestOffset = offset3;
    }
  }
  return { ...to, points: shifted(to.points, bestOffset) };
}
var sampledSequence = sequence.map(sampleShape).reduce((aligned, shape) => {
  aligned.push(aligned.length ? alignTo(aligned.at(-1), shape) : shape);
  return aligned;
}, []);

// src/assets/world-map-shape.ts
var world_map_shape_default = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Africa" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-17, 15],
            [5, 15],
            [10, 5],
            [20, 5],
            [25, 10],
            [30, 5],
            [35, 10],
            [40, 5],
            [45, 5],
            [50, 10],
            [50, 0],
            [45, -5],
            [40, -10],
            [40, -15],
            [35, -20],
            [35, -25],
            [30, -30],
            [30, -35],
            [25, -35],
            [20, -30],
            [15, -25],
            [10, -20],
            [5, -15],
            [0, -10],
            [-5, -5],
            [-10, 0],
            [-15, 5],
            [-17, 10],
            [-17, 15]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { name: "Eurasia" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-10, 35],
            [0, 45],
            [10, 45],
            [20, 40],
            [30, 40],
            [35, 45],
            [40, 45],
            [45, 50],
            [50, 55],
            [55, 60],
            [60, 65],
            [70, 70],
            [80, 70],
            [90, 70],
            [100, 70],
            [110, 70],
            [120, 70],
            [130, 65],
            [140, 60],
            [145, 55],
            [150, 50],
            [155, 45],
            [160, 40],
            [165, 35],
            [170, 30],
            [175, 25],
            [180, 20],
            [180, 15],
            [175, 10],
            [170, 5],
            [165, 0],
            [160, -5],
            [155, -10],
            [150, -10],
            [145, -5],
            [140, -5],
            [135, 0],
            [130, 0],
            [125, 0],
            [120, -5],
            [115, -5],
            [110, 0],
            [105, 0],
            [100, 5],
            [95, 5],
            [90, 5],
            [85, 5],
            [80, 5],
            [75, 0],
            [70, 0],
            [65, 0],
            [60, 0],
            [55, 0],
            [50, 0],
            [45, 0],
            [40, 0],
            [35, 0],
            [30, 5],
            [25, 5],
            [20, 5],
            [15, 5],
            [10, 5],
            [5, 5],
            [0, 5],
            [-5, 5],
            [-10, 10],
            [-10, 20],
            [-10, 35]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { name: "North America" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-170, 70],
            [-160, 70],
            [-150, 70],
            [-140, 70],
            [-130, 70],
            [-120, 70],
            [-110, 70],
            [-100, 70],
            [-90, 70],
            [-80, 70],
            [-70, 65],
            [-60, 60],
            [-55, 55],
            [-55, 50],
            [-60, 50],
            [-65, 45],
            [-70, 45],
            [-75, 45],
            [-80, 40],
            [-85, 35],
            [-90, 30],
            [-95, 25],
            [-100, 20],
            [-105, 20],
            [-110, 20],
            [-115, 25],
            [-120, 30],
            [-125, 35],
            [-125, 40],
            [-125, 45],
            [-130, 50],
            [-135, 55],
            [-140, 55],
            [-145, 60],
            [-150, 60],
            [-155, 65],
            [-160, 65],
            [-165, 65],
            [-170, 65],
            [-170, 70]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { name: "South America" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-80, 10],
            [-75, 15],
            [-70, 15],
            [-65, 10],
            [-60, 5],
            [-55, 5],
            [-50, 0],
            [-45, -5],
            [-40, -5],
            [-35, -10],
            [-35, -15],
            [-40, -20],
            [-45, -25],
            [-50, -30],
            [-55, -35],
            [-55, -40],
            [-50, -45],
            [-55, -50],
            [-60, -55],
            [-65, -55],
            [-70, -50],
            [-75, -40],
            [-75, -35],
            [-80, -25],
            [-80, -15],
            [-80, -5],
            [-80, 5],
            [-80, 10]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { name: "Australia" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [115, -15],
            [120, -10],
            [125, -10],
            [130, -10],
            [135, -10],
            [140, -15],
            [145, -15],
            [150, -20],
            [155, -25],
            [155, -30],
            [150, -35],
            [145, -40],
            [140, -40],
            [135, -35],
            [130, -35],
            [125, -35],
            [120, -30],
            [115, -30],
            [115, -25],
            [115, -20],
            [115, -15]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { name: "Greenland" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-55, 60],
            [-50, 65],
            [-45, 70],
            [-40, 75],
            [-35, 80],
            [-25, 80],
            [-20, 75],
            [-25, 70],
            [-30, 65],
            [-35, 60],
            [-40, 60],
            [-45, 60],
            [-50, 60],
            [-55, 60]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { name: "Japan" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [130, 30],
            [135, 30],
            [140, 35],
            [145, 40],
            [145, 45],
            [140, 45],
            [135, 40],
            [130, 35],
            [130, 30]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { name: "UK-Ireland" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-10, 50],
            [-5, 52],
            [0, 52],
            [2, 55],
            [0, 58],
            [-5, 58],
            [-8, 55],
            [-10, 52],
            [-10, 50]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { name: "Southeast Asia" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [95, 20],
            [100, 20],
            [105, 15],
            [110, 10],
            [115, 5],
            [120, 0],
            [125, 0],
            [130, 5],
            [135, 5],
            [140, 0],
            [140, -5],
            [135, -5],
            [130, -5],
            [125, -5],
            [120, -5],
            [115, -5],
            [110, -5],
            [105, 0],
            [100, 0],
            [95, 5],
            [95, 10],
            [95, 15],
            [95, 20]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { name: "New Zealand" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [170, -35],
            [175, -35],
            [175, -40],
            [180, -45],
            [175, -45],
            [170, -40],
            [170, -35]
          ]
        ]
      }
    },
    {
      type: "Feature",
      properties: { name: "Madagascar" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [45, -15],
            [50, -15],
            [50, -20],
            [50, -25],
            [45, -25],
            [45, -20],
            [45, -15]
          ]
        ]
      }
    }
  ]
};

// src/components/world-map.ts
var DOT_SIZE = 8;
var DOT_GAP = 12;
var TWILIGHT = 6;
function subsolarPoint(utc) {
  const day = (utc.getTime() - Date.UTC(utc.getUTCFullYear(), 0, 0)) / 864e5;
  const decl = -23.44 * Math.cos(360 / 365 * (day + 10) * (Math.PI / 180));
  const hours = utc.getUTCHours() + utc.getUTCMinutes() / 60 + utc.getUTCSeconds() / 3600;
  const lon = (12 - hours) * 15;
  return { lat: decl, lon };
}
function toRad(deg) {
  return deg * Math.PI / 180;
}
function cosAngularDistance(lat1, lon1, lat2, lon2) {
  const a3 = toRad(lat1), b4 = toRad(lat2), d5 = toRad(lon1 - lon2);
  return Math.sin(a3) * Math.sin(b4) + Math.cos(a3) * Math.cos(b4) * Math.cos(d5);
}
var _landMask, _raf, _ro, _WorldMap_instances, buildLandMask_fn, _tick, draw_fn;
var WorldMap = class extends i4 {
  constructor() {
    super(...arguments);
    __privateAdd(this, _WorldMap_instances);
    __privateAdd(this, _landMask, null);
    __privateAdd(this, _raf, 0);
    __privateAdd(this, _ro);
    __privateAdd(this, _tick, () => {
      __privateSet(this, _raf, requestAnimationFrame(() => __privateMethod(this, _WorldMap_instances, draw_fn).call(this)));
    });
  }
  render() {
    return T`<canvas></canvas>`;
  }
  connectedCallback() {
    super.connectedCallback();
    __privateSet(this, _ro, new ResizeObserver(() => {
      __privateMethod(this, _WorldMap_instances, buildLandMask_fn).call(this);
      __privateGet(this, _tick).call(this);
    }));
    __privateGet(this, _ro).observe(this);
    timeSync.addEventListener("change", __privateGet(this, _tick));
  }
  disconnectedCallback() {
    __privateGet(this, _ro)?.disconnect();
    timeSync.removeEventListener("change", __privateGet(this, _tick));
    cancelAnimationFrame(__privateGet(this, _raf));
    super.disconnectedCallback();
  }
  async firstUpdated() {
    __privateMethod(this, _WorldMap_instances, buildLandMask_fn).call(this);
    __privateGet(this, _tick).call(this);
  }
};
_landMask = new WeakMap();
_raf = new WeakMap();
_ro = new WeakMap();
_WorldMap_instances = new WeakSet();
buildLandMask_fn = function() {
  const maxCols = Math.floor(this.clientWidth / DOT_GAP);
  const maxRows = Math.floor(this.clientHeight / DOT_GAP);
  const cols = Math.min(maxCols, 2 * maxRows);
  const rows = Math.floor(cols / 2);
  if (cols <= 0 || rows <= 0) return;
  const off = new OffscreenCanvas(cols, rows);
  const ctx = off.getContext("2d");
  for (const feat of world_map_shape_default.features) {
    const coords = feat.geometry.coordinates[0];
    ctx.beginPath();
    for (let i8 = 0; i8 < coords.length; i8++) {
      const x3 = (coords[i8][0] + 180) / 360 * cols;
      const y3 = (90 - coords[i8][1]) / 180 * rows;
      if (i8 === 0) ctx.moveTo(x3, y3);
      else ctx.lineTo(x3, y3);
    }
    ctx.closePath();
    ctx.fill();
  }
  __privateSet(this, _landMask, ctx.getImageData(0, 0, cols, rows));
};
_tick = new WeakMap();
draw_fn = function() {
  if (!__privateGet(this, _landMask)) return;
  const canvas = this.shadowRoot.querySelector(
    "canvas"
  );
  const w2 = this.clientWidth;
  canvas.width = w2 * devicePixelRatio;
  canvas.height = this.clientHeight * devicePixelRatio;
  const ctx = canvas.getContext("2d");
  ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  const cols = __privateGet(this, _landMask).width;
  const rows = __privateGet(this, _landMask).height;
  const sun = subsolarPoint(new Date(timeSync.actualNow()));
  const style = getComputedStyle(this);
  const color = style.getPropertyValue("--md-sys-color-on-primary-container").trim() || "#fff";
  const r10 = DOT_SIZE / 2;
  const step = DOT_GAP;
  const mapW = cols * step;
  const ox = (w2 - mapW) / 2 + step / 2;
  const oy = step / 2;
  ctx.fillStyle = color;
  for (let cy = 0; cy < rows; cy++) {
    for (let cx = 0; cx < cols; cx++) {
      const alpha = __privateGet(this, _landMask).data[(cy * cols + cx) * 4 + 3];
      if (alpha < 128) continue;
      const lon = cx / cols * 360 - 180;
      const lat = 90 - cy / rows * 180;
      const cosDist = cosAngularDistance(lat, lon, sun.lat, sun.lon);
      const twilight = cosDist > 0 ? 1 : 1 - Math.min(1, Math.abs(cosDist) / Math.sin(toRad(TWILIGHT)));
      ctx.globalAlpha = 0.06 + twilight * 0.18;
      ctx.beginPath();
      ctx.arc(ox + cx * step, oy + cy * step, r10, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.globalAlpha = 1;
};
WorldMap.styles = i3`
    :host {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    canvas {
      width: 100%;
      height: 100%;
    }
  `;
WorldMap = __decorateClass([
  wrappedCustomElement("world-map", false)
], WorldMap);

// node_modules/@vollowx/seele/src/base/controllers/list-controller.js
var ListController = class {
  constructor(host, config) {
    this._focusedItem = null;
    this.searchString = "";
    this.searchTimeout = null;
    const { isItem, getPossibleItems, blurItem, focusItem, wrapNavigation } = config;
    (this.host = host).addController(this);
    this.isItem = isItem;
    this.getPossibleItems = getPossibleItems;
    this.blurItem = blurItem;
    this.focusItem = focusItem;
    this.wrapNavigation = wrapNavigation;
  }
  hostConnected() {
  }
  hostDisconnected() {
  }
  get items() {
    return this.getPossibleItems().filter(this.isItem);
  }
  get currentIndex() {
    if (!this._focusedItem)
      return -1;
    return this.items.indexOf(this._focusedItem);
  }
  handleType(char) {
    const searchString = this.getSearchString(char);
    const items = this.items;
    const optionsText = items.map((item) => item.innerText);
    const searchIndex = getIndexByLetter(optionsText, searchString, this.currentIndex + 1);
    if (searchIndex >= 0) {
      this._focusItem(items[searchIndex]);
      return true;
    } else {
      if (this.searchTimeout)
        window.clearTimeout(this.searchTimeout);
      this.searchString = "";
      return false;
    }
  }
  getSearchString(char) {
    if (this.searchTimeout) {
      window.clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = window.setTimeout(() => {
      this.searchString = "";
    }, 500);
    this.searchString += char;
    return this.searchString;
  }
  clearSearch() {
    this.searchString = "";
    if (this.searchTimeout) {
      window.clearTimeout(this.searchTimeout);
      this.searchTimeout = null;
    }
  }
  _focusItem(item) {
    if (this._focusedItem !== null)
      this._blurItem(this._focusedItem);
    this.focusItem(item);
    this._focusedItem = item;
  }
  _blurItem(item) {
    this.blurItem(item);
    this._focusedItem = null;
  }
  focusFirstItem() {
    this._focusItem(this.items[0]);
  }
  focusLastItem() {
    this._focusItem(this.items[this.items.length - 1]);
  }
  focusNextItem() {
    const items = this.items;
    const count = items.length;
    if (count === 0)
      return;
    let nextIndex = this.currentIndex + 1;
    if (nextIndex >= count) {
      nextIndex = this.wrapNavigation() ? 0 : count - 1;
    }
    this._focusItem(items[nextIndex]);
  }
  focusPreviousItem() {
    const items = this.items;
    const count = items.length;
    if (count === 0)
      return;
    let prevIndex = this.currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = this.wrapNavigation() ? count - 1 : 0;
    }
    this._focusItem(items[prevIndex]);
  }
  handleSlotChange() {
    const items = this.items;
    const index = this.currentIndex;
    this._focusedItem = index >= 0 ? items[index] : null;
  }
};
function filterOptions(options = [], filter, exclude = []) {
  return options.filter((option) => {
    const matches = option.toLowerCase().indexOf(filter.toLowerCase()) === 0;
    return matches && exclude.indexOf(option) < 0;
  });
}
function getIndexByLetter(options, filter, startIndex = 0) {
  const orderedOptions = [
    ...options.slice(startIndex),
    ...options.slice(0, startIndex)
  ];
  const firstMatch = filterOptions(orderedOptions, filter)[0];
  const allSameLetter = (array) => array.every((letter) => letter === array[0]);
  if (firstMatch) {
    return options.indexOf(firstMatch);
  } else if (allSameLetter(filter.split(""))) {
    const matches = filterOptions(orderedOptions, filter[0]);
    return options.indexOf(matches[0]);
  } else {
    return -1;
  }
}

// node_modules/@vollowx/seele/src/base/menu.js
var Menu = class extends InternalsAttached(i4) {
  get $items() {
    return this.listController.items || [];
  }
  get currentIndex() {
    return this.listController?.currentIndex;
  }
  focusFirstItem() {
    this.listController.focusFirstItem();
  }
  focusLastItem() {
    this.listController.focusLastItem();
  }
  focusItem(item) {
    this.listController._focusItem(item);
  }
  render() {
    return T`<slot part="items"></slot>`;
  }
  constructor() {
    super();
    this.keepOpenAction = false;
    this.bare = false;
    this.listController = new ListController(this, {
      isItem: (item) => item.getAttribute("seele-base") === "option" && !item.hasAttribute("disabled") && !item.hidden,
      getPossibleItems: () => this.slotItems,
      blurItem: (item) => {
        item.focused = false;
      },
      focusItem: (item) => {
        item.focused = true;
        if (!this.bare)
          this[internals].ariaActiveDescendantElement = item;
        if (focusVisible)
          item.scrollIntoView({ block: "nearest" });
        this.dispatchEvent(new CustomEvent("item-focus", {
          detail: { item, index: this.$items.indexOf(item) },
          bubbles: true,
          composed: true
        }));
      },
      wrapNavigation: () => false
    });
    this.#suppressClick = false;
    this[internals].role = "menu";
    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", "0");
    }
    if (!o5) {
      this.addEventListener("keydown", this.handleKeyDown.bind(this));
      this.addEventListener("focusin", this.#handleFocusIn.bind(this));
      this.addEventListener("focusout", this.#handleFocusOut.bind(this));
      this.addEventListener("mouseover", this.#handleMouseOver.bind(this));
      this.addEventListener("click", this.#handleClick.bind(this));
      this.addEventListener("pointerdown", this.#handlePointerDown.bind(this));
      this.addEventListener("pointerup", this.#handlePointerUp.bind(this));
    }
  }
  #handleFocusIn() {
    if (this.bare)
      return;
    this.listController.focusFirstItem();
  }
  #handleFocusOut() {
    this.listController._blurItem(this.listController._focusedItem);
  }
  handleKeyDown(event) {
    if (event.defaultPrevented)
      return;
    const action = getActionFromKey(event);
    const items = this.$items;
    const currentIndex = this.listController.currentIndex;
    const maxIndex = items.length - 1;
    switch (action) {
      case MenuAction.First:
        event.preventDefault();
        this.listController.focusFirstItem();
        return;
      case MenuAction.Last:
        event.preventDefault();
        this.listController.focusLastItem();
        return;
      case MenuAction.PageUp:
      case MenuAction.PageDown: {
        event.preventDefault();
        const { first, last, pageSize } = getVisibleItems(this, items);
        const isDown = action === MenuAction.PageDown;
        const boundary = isDown ? last : first;
        const atBoundary = isDown ? currentIndex >= last : currentIndex <= first;
        const step = isDown ? pageSize : -pageSize;
        const nextIndex = atBoundary ? currentIndex + step : boundary;
        this.listController._focusItem(items[Math.max(0, Math.min(maxIndex, nextIndex))]);
        return;
      }
      case MenuAction.Next:
        event.preventDefault();
        this.listController.focusNextItem();
        return;
      case MenuAction.Previous:
        event.preventDefault();
        this.listController.focusPreviousItem();
        return;
      case MenuAction.CloseSelect:
        event.preventDefault();
        if (currentIndex >= 0) {
          items[currentIndex].focused = false;
          this.#dispatchAction({
            item: items[currentIndex],
            index: currentIndex
          });
          if (this.keepOpenAction)
            return;
          this.#dispatchHide();
        }
        return;
      case MenuAction.Type:
        this.listController.handleType(event.key);
        return;
    }
  }
  #handleMouseOver(event) {
    setFocusVisible(false);
    const item = this.#getItemFromEvent(event);
    if (item && this.currentIndex !== item.index)
      this.listController._focusItem(item.item);
  }
  #handleClick(event) {
    if (this.#suppressClick) {
      this.#suppressClick = false;
      return;
    }
    const item = this.#getItemFromEvent(event);
    if (!item)
      return;
    item.item.focused = false;
    this.#dispatchAction({ ...item });
    if (!this.keepOpenAction)
      this.#dispatchHide();
  }
  #suppressClick;
  #handlePointerDown(_event) {
    this.#suppressClick = false;
  }
  #handlePointerUp(event) {
    if (event.pointerType === "touch")
      return;
    if (event.button !== 0)
      return;
    const item = this.#getItemFromEvent(event);
    if (!item)
      return;
    this.#suppressClick = true;
    item.item.focused = false;
    this.#dispatchAction({ ...item });
    if (!this.keepOpenAction)
      this.#dispatchHide();
  }
  #getItemFromEvent(event) {
    const item = event.target.closest("[seele-base=option]");
    if (!item || !this.$items.includes(item))
      return null;
    return { item, index: this.$items.indexOf(item) };
  }
  #dispatchAction(detail) {
    this.dispatchEvent(new CustomEvent("action", {
      detail,
      bubbles: true,
      composed: true
    }));
  }
  #dispatchHide() {
    this.dispatchEvent(new Event("request-popup-hide", { bubbles: true, composed: true }));
  }
};
__decorate([
  n6({ type: Boolean, attribute: "keep-open-action" })
], Menu.prototype, "keepOpenAction", void 0);
__decorate([
  n6({ type: Boolean, reflect: true })
], Menu.prototype, "bare", void 0);
__decorate([
  o8({ flatten: true })
], Menu.prototype, "slotItems", void 0);
var MenuAction;
(function(MenuAction2) {
  MenuAction2[MenuAction2["Close"] = -11] = "Close";
  MenuAction2[MenuAction2["CloseSelect"] = -10] = "CloseSelect";
  MenuAction2[MenuAction2["First"] = 1] = "First";
  MenuAction2[MenuAction2["Last"] = 2] = "Last";
  MenuAction2[MenuAction2["Next"] = 3] = "Next";
  MenuAction2[MenuAction2["Open"] = 4] = "Open";
  MenuAction2[MenuAction2["PageDown"] = 5] = "PageDown";
  MenuAction2[MenuAction2["PageUp"] = 6] = "PageUp";
  MenuAction2[MenuAction2["Previous"] = 7] = "Previous";
  MenuAction2[MenuAction2["Select"] = 8] = "Select";
  MenuAction2[MenuAction2["Type"] = 9] = "Type";
})(MenuAction || (MenuAction = {}));
function getActionFromKey(event) {
  const { key, altKey, ctrlKey, metaKey } = event;
  if (key === "Escape")
    return MenuAction.Close;
  if (key === "Enter" || key === " ")
    return MenuAction.CloseSelect;
  if (key === "Home")
    return MenuAction.First;
  if (key === "End")
    return MenuAction.Last;
  if (key === "PageUp")
    return MenuAction.PageUp;
  if (key === "PageDown")
    return MenuAction.PageDown;
  if (key === "ArrowUp" && altKey)
    return MenuAction.CloseSelect;
  if (key === "ArrowDown" && !altKey)
    return MenuAction.Next;
  if (key === "ArrowUp" && !altKey)
    return MenuAction.Previous;
  if (key === "Backspace" || key === "Clear" || key.length === 1 && key !== " " && !altKey && !ctrlKey && !metaKey) {
    return MenuAction.Type;
  }
  return null;
}
function getVisibleItems(container, items) {
  if (!items.length)
    return { first: 0, last: 0, pageSize: 1 };
  const containerRect = container.getBoundingClientRect();
  const style = window.getComputedStyle(container);
  const paddingTop = parseFloat(style.scrollPaddingTop) || 0;
  const paddingBottom = parseFloat(style.scrollPaddingBottom) || 0;
  const top = containerRect.top + container.clientTop + paddingTop;
  const bottom = top + container.clientHeight - paddingTop - paddingBottom;
  let first = -1;
  let last = -1;
  for (let i8 = 0; i8 < items.length; i8++) {
    const itemRect = items[i8].getBoundingClientRect();
    if (itemRect.top < bottom && itemRect.bottom > top) {
      if (first === -1)
        first = i8;
      last = i8;
    } else if (first !== -1) {
      break;
    }
  }
  if (first === -1) {
    return { first: 0, last: 0, pageSize: 1 };
  }
  return { first, last, pageSize: Math.max(1, last - first + 1) };
}

// node_modules/@vollowx/seele/src/base/list.js
var List = class extends InternalsAttached(i4) {
  get $items() {
    return this.listController.items || [];
  }
  get currentIndex() {
    return this.listController?.currentIndex;
  }
  focusFirstItem() {
    this.listController.focusFirstItem();
  }
  focusLastItem() {
    this.listController.focusLastItem();
  }
  focusItem(item) {
    this.listController._focusItem(item);
  }
  render() {
    return T`<slot part="items"></slot>`;
  }
  constructor() {
    super();
    this.noFocusControl = false;
    this.listController = new ListController(this, {
      isItem: (item) => item.getAttribute("seele-base") === "option" && !item.hasAttribute("disabled") && !item.hidden,
      getPossibleItems: () => this.slotItems,
      blurItem: (item) => {
        item.focused = false;
      },
      focusItem: (item) => {
        item.focused = true;
        if (!this.noFocusControl) {
          this[internals].ariaActiveDescendantElement = item;
        }
        if (focusVisible)
          item.scrollIntoView({ block: "nearest" });
        this.dispatchEvent(new CustomEvent("item-focus", {
          detail: { item, index: this.$items.indexOf(item) },
          bubbles: true,
          composed: true
        }));
      },
      wrapNavigation: () => false
    });
    this[internals].role = "listbox";
    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", "0");
    }
    if (!o5) {
      this.addEventListener("keydown", this.handleKeyDown.bind(this));
      this.addEventListener("focusin", this.#handleFocusIn.bind(this));
      this.addEventListener("focusout", this.#handleFocusOut.bind(this));
      this.addEventListener("mouseover", this.#handleMouseOver.bind(this));
      this.addEventListener("click", this.#handleClick.bind(this));
    }
  }
  #handleFocusIn() {
    if (this.currentIndex === -1) {
      this.listController.focusFirstItem();
    } else {
      this.listController._focusItem(this.$items[this.currentIndex]);
    }
  }
  #handleFocusOut() {
    if (this.listController._focusedItem) {
      this.listController._blurItem(this.listController._focusedItem);
    }
  }
  handleKeyDown(event) {
    if (event.defaultPrevented)
      return;
    const action = getActionFromKey(event);
    const items = this.$items;
    const currentIndex = this.listController.currentIndex;
    const maxIndex = items.length - 1;
    switch (action) {
      case MenuAction.First:
        event.preventDefault();
        this.listController.focusFirstItem();
        return;
      case MenuAction.Last:
        event.preventDefault();
        this.listController.focusLastItem();
        return;
      case MenuAction.PageUp:
      case MenuAction.PageDown: {
        event.preventDefault();
        const { first, last, pageSize } = getVisibleItems(this, items);
        const isDown = action === MenuAction.PageDown;
        const boundary = isDown ? last : first;
        const atBoundary = isDown ? currentIndex >= last : currentIndex <= first;
        const step = isDown ? pageSize : -pageSize;
        const nextIndex = atBoundary ? currentIndex + step : boundary;
        this.listController._focusItem(items[Math.max(0, Math.min(maxIndex, nextIndex))]);
        return;
      }
      case MenuAction.Next:
        event.preventDefault();
        this.listController.focusNextItem();
        return;
      case MenuAction.Previous:
        event.preventDefault();
        this.listController.focusPreviousItem();
        return;
      case MenuAction.CloseSelect:
        event.preventDefault();
        if (currentIndex >= 0) {
          this.#dispatchSelect({
            item: items[currentIndex],
            index: currentIndex
          });
        }
        return;
      case MenuAction.Type:
        this.listController.handleType(event.key);
        return;
    }
  }
  #handleMouseOver(event) {
    setFocusVisible(false);
    const item = this.#getItemFromEvent(event);
    if (item && this.currentIndex !== item.index) {
      this.listController._focusItem(item.item);
    }
  }
  #handleClick(event) {
    const item = this.#getItemFromEvent(event);
    if (!item)
      return;
    this.#dispatchSelect({ ...item });
  }
  #getItemFromEvent(event) {
    const item = event.target.closest("[seele-base=option]");
    if (!item || !this.$items.includes(item))
      return null;
    return { item, index: this.$items.indexOf(item) };
  }
  #dispatchSelect(detail) {
    this.dispatchEvent(new CustomEvent("select", {
      detail,
      bubbles: true,
      composed: true
    }));
  }
};
__decorate([
  n6({ type: Boolean, attribute: "no-focus-control" })
], List.prototype, "noFocusControl", void 0);
__decorate([
  o8({ flatten: true })
], List.prototype, "slotItems", void 0);

// node_modules/@vollowx/seele/src/m3/list/list-styles.css.js
var listStyles = i3`:host{box-sizing:border-box;-webkit-user-select:none;user-select:none;outline:0;flex-direction:column;gap:2px;min-width:112px;height:max-content;padding:4px;display:flex;position:relative;overflow-y:auto}:host([color=segmented]) ::slotted(md-list-item){--_background:var(--md-sys-color-surface-container)}`;

// node_modules/@vollowx/seele/src/m3/list/list.js
var M3List = class M3List2 extends List {
  constructor() {
    super(...arguments);
    this.color = "standard";
  }
  static {
    this.styles = [listStyles];
  }
};
__decorate([
  n6({ reflect: true })
], M3List.prototype, "color", void 0);
M3List = __decorate([
  t6("md-list")
], M3List);

// node_modules/@vollowx/seele/src/base/list-item.js
var ListItem = class extends FormAssociated(InternalsAttached(i4)) {
  static {
    this.styles = [hiddenStyles];
  }
  get displayText() {
    return this.innerText.trim();
  }
  // Accessibility tools, particularly Narrator, only fires `click` event on
  // elements that have listeners for them.
  #handleDummy() {
  }
  constructor() {
    super();
    this._role = "option";
    this.selected = false;
    this.focused = false;
    this.setAttribute("seele-base", "option");
    this[internals].role = this._role;
    this.setAttribute("tabindex", "-1");
    this.#updateInternals();
    if (!o5)
      this.addEventListener("click", this.#handleDummy);
  }
  updated(changed) {
    super.updated(changed);
    if (changed.has("disabled") || changed.has("focused") || changed.has("selected")) {
      this.#updateInternals();
    }
  }
  #updateInternals() {
    this[internals].ariaDisabled = this.disabled ? "true" : "false";
    this.focused ? this[internals].states.add("focused") : this[internals].states.delete("focused");
    this[internals].ariaSelected = this.selected ? "true" : "false";
    this.selected ? this[internals].states.add("selected") : this[internals].states.delete("selected");
  }
  focus() {
    this.focused = true;
  }
  blur() {
    this.focused = false;
  }
};
__decorate([
  n6({ type: Boolean, reflect: true })
], ListItem.prototype, "selected", void 0);
__decorate([
  n6({ type: Boolean, reflect: true })
], ListItem.prototype, "focused", void 0);

// node_modules/@vollowx/seele/src/base/item.js
var Item = class extends i4 {
};

// node_modules/@vollowx/seele/src/m3/item/item-styles.css.js
var itemStyles = i3`:host{border-radius:inherit;box-sizing:border-box;font:var(--md-sys-typography-body-large);min-height:calc(48px + 4px * var(--md-sys-spacing-density,0));padding:calc(12px + 2px * var(--md-sys-spacing-density,0)) 12px;text-overflow:ellipsis;-webkit-user-select:none;user-select:none;flex:1;align-items:center;gap:16px;display:flex;position:relative}:host([multiline]){min-height:72px}[name=container]{border-radius:inherit}[name=container]::slotted(*){position:absolute;inset:0}.default-slot{display:inline}.default-slot,.text ::slotted(*){text-overflow:ellipsis;overflow:hidden}.text{flex-direction:column;flex:1;display:flex;overflow:hidden}[name=overline]{font:var(--md-sys-typography-label-small)}[name=supporting-text]{color:var(--md-item-supporting-text-color,var(--md-sys-color-on-surface-variant));font:var(--md-sys-typography-body-medium)}`;

// node_modules/@vollowx/seele/src/m3/item/item.js
var M3Item = class M3Item2 extends Item {
  constructor() {
    super(...arguments);
    this.multiline = false;
  }
  static {
    this.styles = [itemStyles];
  }
  render() {
    return T`<slot name="container"></slot><slot name="start"></slot><div class="text"><slot name="overline"></slot><slot class="default-slot"></slot><slot name="headline"></slot><slot name="supporting-text"></slot></div><slot name="trailing-supporting-text"></slot><slot name="end"></slot>`;
  }
};
__decorate([
  n6({ type: Boolean, reflect: true })
], M3Item.prototype, "multiline", void 0);
M3Item = __decorate([
  t6("md-item")
], M3Item);

// node_modules/@vollowx/seele/src/m3/list/list-item-styles.css.js
var listItemStyles = i3`:host{--md-focus-ring-shape:12px;--md-focus-ring-inward-offset:-3px;background-color:var(--_background,transparent);-webkit-tap-highlight-color:transparent;-webkit-user-select:none;user-select:none;border-radius:4px;outline:0;display:flex}:host(:not([hidden],:state(selected)):first-of-type){border-radius:12px 12px 4px 4px}:host(:not([hidden],:state(selected)):last-of-type){border-radius:4px 4px 12px 12px}:host(:state(selected)){--md-item-supporting-text-color:var(--md-sys-color-on-tertiary-container);background-color:var(--md-sys-color-tertiary-container);color:var(--md-sys-color-on-tertiary-container);border-radius:12px}:host(:disabled){cursor:default;opacity:.3;pointer-events:none}md-item,md-item div[slot=container]{border-radius:inherit}md-ripple:before{transition:none}md-ripple::part(ripple){display:none}@media (forced-colors:active){:host{forced-color-adjust:none;color:canvastext}:host(:hover),:host(:state(selected)){color:highlighttext;background:highlight}}`;

// node_modules/@vollowx/seele/src/m3/list/list-item.js
var M3ListItem = class M3ListItem2 extends ListItem {
  static {
    this.styles = [...super.styles, listItemStyles];
  }
  render() {
    return T`<md-item><div slot="container"><md-focus-ring inward></md-focus-ring><md-ripple></md-ripple></div><slot slot="start" name="start"></slot><slot slot="overline" name="overline"></slot><slot></slot><slot slot="headline" name="headline"></slot><slot slot="supporting-text" name="supporting-text"></slot><slot slot="trailing-supporting-text" name="trailing-supporting-text"></slot><slot slot="end" name="end"></slot></md-item>`;
  }
  constructor() {
    super();
    this.updateComplete.then(() => {
      this.$ripple.$control = this;
      this.$focusRing.$control = this;
    });
  }
  updated(changed) {
    super.updated(changed);
    if (changed.has("focused")) {
      if (this.focused) {
        this.$focusRing.visualFocus();
      } else {
        this.$focusRing.visualBlur();
      }
    }
  }
};
__decorate([
  e9("md-ripple")
], M3ListItem.prototype, "$ripple", void 0);
__decorate([
  e9("md-focus-ring")
], M3ListItem.prototype, "$focusRing", void 0);
M3ListItem = __decorate([
  t6("md-list-item")
], M3ListItem);

// node_modules/@vollowx/seele/src/m3/button/shared-button-styles.css.js
var sharedButtonStyles = i3`@layer main;@layer shared{:host{--_on-color:var(--md-sys-color-on-primary);--_color:var(--md-sys-color-primary);--_h:40px;--_icon-size:20px;--_rs:12px;--_rp:8px;color:var(--_on-color);background-color:var(--_color);box-sizing:border-box;cursor:pointer;block-size:var(--_h);-webkit-tap-highlight-color:transparent;-webkit-user-select:none;user-select:none;vertical-align:top;border-start-start-radius:var(--_inner-left-radius,calc(var(--_h) / 2));border-start-end-radius:var(--_inner-right-radius,calc(var(--_h) / 2));border-end-end-radius:var(--_inner-right-radius,calc(var(--_h) / 2));border-end-start-radius:var(--_inner-left-radius,calc(var(--_h) / 2));outline:0;flex-shrink:0;position:relative}:host([notransition]){transition:none!important}md-ripple,md-focus-ring{position:absolute}:host([size=xs]){--_h:32px}:host([size=m]){--_h:56px;--_icon-size:24px;--_rs:16px;--_rp:12px}:host([size=l]){--_h:96px;--_icon-size:32px;--_rs:28px;--_rp:16px}:host([size=xl]){--_h:136px;--_icon-size:40px;--_rs:28px;--_rp:16px}:host([color=secondary]){--_on-color:var(--md-sys-color-on-secondary);--_color:var(--md-sys-color-secondary)}:host([color=tertiary]){--_on-color:var(--md-sys-color-on-tertiary);--_color:var(--md-sys-color-tertiary)}:host([variant=tonal]){background-color:var(--md-sys-color-secondary-container);color:var(--md-sys-color-on-secondary-container)}:host([variant=outlined]){--md-focus-ring-offset:3px;color:var(--md-sys-color-on-surface-variant);border-color:var(--md-sys-color-outline-variant);background-color:#0000;border-style:solid;border-width:1px;& md-ripple{inset:-1px}}:host([variant=text]){color:var(--_color);background-color:#0000}:host([square]){--md-focus-ring-shape:var(--_rs);border-radius:var(--_rs)}@media (forced-colors:active){:host{forced-color-adjust:none;color:buttontext;background:buttonface;border:1px solid buttonborder}}}@layer shared-toggle,override;@layer active{:host(:active),:host(:state(active)){--md-focus-ring-shape:var(--_rp);border-radius:var(--_rp)}}@layer disabled{:host([variant=outlined]:disabled){background-color:oklch(from var(--md-sys-color-outline) l c h / 10%)}:host(:disabled),:host([variant=outlined]:state(checked):disabled){background-color:oklch(from var(--md-sys-color-on-surface) l c h / 10%);color:oklch(from var(--md-sys-color-on-surface) l c h / 38%);border-color:oklch(from var(--md-sys-color-on-surface) l c h / 10%);box-shadow:none;pointer-events:none}@media (forced-colors:active){:host(:disabled){color:graytext;border-color:graytext}}}`;

// node_modules/@vollowx/seele/src/m3/button/icon-button-styles.css.js
var iconButtonStyles = i3`@layer main{:host{--_wn:32px;--_ww:52px;transition:border-radius var(--md-sys-motion-spatial-fast-duration) var(--md-sys-motion-spatial-fast);inline-size:var(--_h);place-items:center;display:inline-grid}:host([size=xs]){--_wn:28px;--_ww:40px}:host([size=m]){--_wn:48px;--_ww:72px}:host([size=l]){--_wn:64px;--_ww:128px}:host([size=xl]){--_wn:104px;--_ww:184px}:host([width=narrow]){inline-size:var(--_wn)}:host([width=wide]){inline-size:var(--_ww)}::slotted(*){fill:currentColor;block-size:1em;font-size:var(--_icon-size);inline-size:1em}}@layer override{:host([size=small]){--_icon-size:24px}:host([variant=text]){color:var(--md-sys-color-on-surface-variant)}:host([variant=text]:state(checked)){color:var(--_color)}}`;

// node_modules/@vollowx/seele/src/m3/button/icon-button.js
var M3IconButton = class M3IconButton2 extends Button {
  constructor() {
    super(...arguments);
    this.size = "s";
    this.color = "primary";
    this.variant = "text";
    this.width = "standard";
  }
  static {
    this.styles = [
      ...super.styles,
      targetStyles,
      sharedButtonStyles,
      iconButtonStyles
    ];
  }
  render() {
    return T`<md-focus-ring></md-focus-ring><md-ripple></md-ripple><span part="target"></span><slot part="icon"></slot>`;
  }
};
__decorate([
  n6({ reflect: true })
], M3IconButton.prototype, "size", void 0);
__decorate([
  n6({ reflect: true })
], M3IconButton.prototype, "color", void 0);
__decorate([
  n6({ reflect: true })
], M3IconButton.prototype, "variant", void 0);
__decorate([
  n6({ reflect: true })
], M3IconButton.prototype, "width", void 0);
M3IconButton = __decorate([
  t6("md-icon-button")
], M3IconButton);

// node_modules/@vollowx/seele/src/core/ensure-ready.js
async function ensureReady(element, useAnimationFrame = false) {
  if (!element)
    return null;
  if (element.matches(":not(:defined)"))
    await customElements.whenDefined(element.tagName.toLowerCase());
  if ("updateComplete" in element)
    await element.updateComplete;
  if (useAnimationFrame)
    await new Promise((resolve) => requestAnimationFrame(resolve));
}
async function ensureSlottedReady(host, getSlotted, useAnimationFrame = false) {
  await ensureReady(host);
  if (getSlotted) {
    const elements = getSlotted();
    await Promise.all(elements.map((el) => ensureReady(el, false)));
  }
  if (useAnimationFrame)
    await new Promise((resolve) => requestAnimationFrame(resolve));
}

// node_modules/@vollowx/seele/src/m3/styles/motion.js
var parseCSSNum = (css) => {
  if (typeof CSSNumericValue !== "undefined") {
    try {
      return CSSNumericValue.parse(css).to("ms").value;
    } catch {
      return 0;
    }
  } else {
    css = css.trim().toLowerCase();
    if (css.endsWith("ms"))
      return parseFloat(css.substring(0, css.length - 2)) | 0;
    else if (css.endsWith("s"))
      return parseFloat(css.substring(0, css.length - 1)) * 1e3 | 0;
    else
      return 0;
  }
};
var getSpring = (element, type, duration) => {
  const styles = getComputedStyle(element);
  const get = (suffix) => styles.getPropertyValue(`--md-sys-motion-${type}-${duration}${suffix}`);
  return {
    easing: get("") || "ease",
    duration: parseCSSNum(get("-duration"))
  };
};

// node_modules/@vollowx/seele/src/m3/button-group/standard-button-group-styles.css.js
var standardButtonGroupStyles = i3`:host{gap:8px;display:inline-flex}:host([size=s]){gap:12px}:host([size=xs]){gap:18px}`;

// node_modules/@vollowx/seele/src/m3/button-group/standard-button-group.js
var EXPAND_FACTOR = 1.15;
var shapeAnimation = /* @__PURE__ */ Symbol("shapeAnimation");
var M3StandardButtonGroup = class M3StandardButtonGroup2 extends i4 {
  static {
    this.styles = [standardButtonGroupStyles];
  }
  render() {
    return T`<slot @slotchange="${this.#handleSlotChange}"></slot>`;
  }
  constructor() {
    super();
    this.size = "";
    this.#activeIndex = -1;
    this.#baseWidths = [];
    this.#handleSlotChange = () => {
      this.#resizeObserver.disconnect();
      this.$buttons.forEach((btn, i8) => {
        this.#baseWidths[i8] = btn.getBoundingClientRect().width;
        this.#resizeObserver.observe(btn);
      });
    };
    this.#handlePointerDown = (e11) => {
      if (this === e11.target)
        return;
      this.updateLayout(e11.target);
    };
    this.#handleKeyDown = (e11) => {
      if (e11.key !== " " && e11.key !== "Enter")
        return;
      this.updateLayout(e11.target);
    };
    this.#reset = (e11) => {
      if (e11 && e11.type === "keyup" && e11.key !== " " && e11.key !== "Enter")
        return;
      if (this.#activeIndex !== -1) {
        this.#activeIndex = -1;
        this.updateLayout();
      }
    };
    if (!o5) {
      this.addEventListener("pointerdown", this.#handlePointerDown);
      this.addEventListener("keydown", this.#handleKeyDown, { capture: true });
    }
  }
  connectedCallback() {
    super.connectedCallback();
    const signal = (this.#abortController = new AbortController()).signal;
    window.addEventListener("pointerup", this.#reset, { signal });
    window.addEventListener("pointercancel", this.#reset, { signal });
    window.addEventListener("keyup", this.#reset, { capture: true, signal });
    this.#resizeObserver = new ResizeObserver((entries) => {
      const isAnimating = this.#activeIndex !== -1 || this.$buttons.some((btn) => btn[shapeAnimation]);
      if (isAnimating)
        return;
      entries.forEach((entry) => {
        const target = entry.target;
        const index = this.$buttons.indexOf(target);
        if (index !== -1) {
          const currentWidth = target.style.width;
          target.style.width = "";
          this.#baseWidths[index] = target.getBoundingClientRect().width;
          if (currentWidth)
            target.style.width = currentWidth;
        }
      });
    });
  }
  async firstUpdated() {
    await ensureSlottedReady(this, () => this.$buttons, true);
    this.#handleSlotChange();
  }
  disconnectedCallback() {
    this.#abortController.abort();
    this.#resizeObserver.disconnect();
    super.disconnectedCallback();
  }
  #abortController;
  #activeIndex;
  #resizeObserver;
  #baseWidths;
  #handleSlotChange;
  #handlePointerDown;
  #handleKeyDown;
  #reset;
  /**
   * Passing no element resets all shape changes
   */
  updateLayout(target = null) {
    const pressedIndex = target ? this.$buttons.indexOf(target) : -1;
    this.#activeIndex = pressedIndex;
    const pressedBaseWidth = pressedIndex !== -1 ? this.#baseWidths[pressedIndex] : 0;
    const isPressedAtEdge = pressedIndex === 0 || pressedIndex === this.$buttons.length - 1;
    const delta = pressedBaseWidth * (EXPAND_FACTOR - 1) / (isPressedAtEdge ? 1 : 2);
    const spring = getSpring(this, "spatial", "fast");
    this.$buttons.forEach((btn, i8) => {
      const currentWidth = btn.getBoundingClientRect().width;
      let targetWidth = this.#baseWidths[i8];
      if (pressedIndex !== -1) {
        if (i8 === pressedIndex)
          targetWidth = pressedBaseWidth * EXPAND_FACTOR;
        else if (Math.abs(i8 - pressedIndex) === 1)
          targetWidth -= delta;
      }
      btn[shapeAnimation]?.cancel();
      const anim = btn[shapeAnimation] = btn.animate([{ width: `${currentWidth}px` }, { width: `${targetWidth}px` }], {
        ...spring,
        fill: "forwards"
      });
      anim.finished.then(() => {
        if (btn[shapeAnimation] === anim) {
          if (pressedIndex === -1) {
            btn.style.width = "";
            anim.cancel();
          }
          delete btn[shapeAnimation];
        }
      }).catch(() => {
      });
    });
  }
};
__decorate([
  n6({ reflect: true })
], M3StandardButtonGroup.prototype, "size", void 0);
__decorate([
  o8()
], M3StandardButtonGroup.prototype, "$buttons", void 0);
M3StandardButtonGroup = __decorate([
  wrappedCustomElement("md-button-group")
], M3StandardButtonGroup);

// src/components/timezone-list.ts
var _TimezoneList_instances, offsetLabel_fn, _onChange;
var TimezoneList = class extends i4 {
  constructor() {
    super(...arguments);
    __privateAdd(this, _TimezoneList_instances);
    this.now = Date.now();
    __privateAdd(this, _onChange, () => this.requestUpdate());
  }
  render() {
    if (this.now == null) return T``;
    const correct = this.now + timeSync.offsetMs;
    const selected = timezoneStore.list;
    const tzs = allTimezones();
    const byId = new Map(tzs.map((t7) => [t7.id, t7]));
    const sys = systemTimezone();
    return T`
      <md-list>
        ${selected.map((id, i8) => {
      const tz = byId.get(id);
      if (!tz) return null;
      const offset3 = tzOffset(id);
      const date = new Date(correct);
      const { time, ampm } = formatClockTime(date, settings.use24h, offset3);
      const last = selected.length - 1;
      return T`
            <md-list-item class="${id === sys ? "current" : ""}">
              <span slot="headline">${tz.label}</span>
              <span slot="supporting-text">${__privateMethod(this, _TimezoneList_instances, offsetLabel_fn).call(this, offset3)}</span>
              <span class="end-slot" slot="end">
                <span class="clock-time">
                  ${time}${ampm ? T` ${ampm}` : ""}
                </span>
                ${selected.length > 1 ? T`
                      <md-button-group class="reorder-group" size="s">
                        <md-icon-button
                          width="narrow"
                          ?disabled=${i8 === 0}
                          @click=${(e11) => {
        e11.stopPropagation();
        timezoneStore.reorder(i8, i8 - 1);
      }}
                        >
                          <iconify-icon
                            icon="material-symbols:arrow-upward"
                          ></iconify-icon>
                        </md-icon-button>
                        <md-icon-button
                          width="narrow"
                          ?disabled=${i8 === last}
                          @click=${(e11) => {
        e11.stopPropagation();
        timezoneStore.reorder(i8, i8 + 1);
      }}
                        >
                          <iconify-icon
                            icon="material-symbols:arrow-downward"
                          ></iconify-icon>
                        </md-icon-button>
                        <md-icon-button
                          class="remove-btn"
                          width="narrow"
                          @click=${(e11) => {
        e11.stopPropagation();
        timezoneStore.remove(id);
      }}
                        >
                          <iconify-icon
                            icon="material-symbols:close"
                          ></iconify-icon>
                        </md-icon-button>
                      </md-button-group>
                    ` : null}
              </span>
            </md-list-item>
          `;
    })}
      </md-list>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    settings.addEventListener("change", __privateGet(this, _onChange));
    timeSync.addEventListener("change", __privateGet(this, _onChange));
    timezoneStore.addEventListener("change", __privateGet(this, _onChange));
  }
  disconnectedCallback() {
    settings.removeEventListener("change", __privateGet(this, _onChange));
    timeSync.removeEventListener("change", __privateGet(this, _onChange));
    timezoneStore.removeEventListener("change", __privateGet(this, _onChange));
    super.disconnectedCallback();
  }
};
_TimezoneList_instances = new WeakSet();
offsetLabel_fn = function(minutes) {
  if (minutes === 0) return "UTC";
  const sign = minutes > 0 ? "+" : "-";
  const h6 = Math.abs(Math.floor(minutes / 60));
  const m6 = Math.abs(minutes % 60);
  return `UTC${sign}${h6}${m6 ? `:${String(m6).padStart(2, "0")}` : ""}`;
};
_onChange = new WeakMap();
TimezoneList.styles = i3`
    :host {
      display: contents;
    }

    md-list {
      width: min(480px, 100%);
      max-height: 100%;
      overflow-y: auto;
      padding: 0;
    }

    md-list-item {
      background-color: var(--md-sys-color-surface-container);
    }

    md-list-item:first-child {
      border-radius: 12px 12px 4px 4px;
    }

    md-list-item:last-child {
      border-radius: 4px 4px 12px 12px;
    }

    md-list-item:first-child:last-child {
      border-radius: 12px;
    }

    md-list-item.current {
      background-color: var(--md-sys-color-surface-container-highest);
    }

    .clock-time {
      font: var(--md-sys-typography-title-large);
      font-variant-numeric: tabular-nums;
    }

    .remove-btn,
    .reorder-group {
      display: none;
    }

    md-list-item:hover .clock-time,
    md-list-item:focus-within .clock-time {
      display: none;
    }

    md-list-item:hover .remove-btn,
    md-list-item:focus-within .remove-btn,
    md-list-item:hover .reorder-group,
    md-list-item:focus-within .reorder-group {
      display: inline-flex;
    }
  `;
__decorateClass([
  n6({ type: Number })
], TimezoneList.prototype, "now", 2);
TimezoneList = __decorateClass([
  wrappedCustomElement("timezone-list", false)
], TimezoneList);

// node_modules/lit-html/node/async-directive.js
var s7 = (i8, t7) => {
  const e11 = i8._$AN;
  if (void 0 === e11) return false;
  for (const i9 of e11) i9._$AO?.(t7, false), s7(i9, t7);
  return true;
};
var o9 = (i8) => {
  let t7, e11;
  do {
    if (void 0 === (t7 = i8._$AM)) break;
    e11 = t7._$AN, e11.delete(i8), i8 = t7;
  } while (0 === e11?.size);
};
var r9 = (i8) => {
  for (let t7; t7 = i8._$AM; i8 = t7) {
    let e11 = t7._$AN;
    if (void 0 === e11) t7._$AN = e11 = /* @__PURE__ */ new Set();
    else if (e11.has(i8)) break;
    e11.add(i8), c5(t7);
  }
};
function h4(i8) {
  void 0 !== this._$AN ? (o9(this), this._$AM = i8, r9(this)) : this._$AM = i8;
}
function n7(i8, t7 = false, e11 = 0) {
  const r10 = this._$AH, h6 = this._$AN;
  if (void 0 !== h6 && 0 !== h6.size) if (t7) if (Array.isArray(r10)) for (let i9 = e11; i9 < r10.length; i9++) s7(r10[i9], false), o9(r10[i9]);
  else null != r10 && (s7(r10, false), o9(r10));
  else s7(this, i8);
}
var c5 = (i8) => {
  i8.type == t5.CHILD && (i8._$AP ??= n7, i8._$AQ ??= h4);
};
var f7 = class extends i5 {
  constructor() {
    super(...arguments), this._$AN = void 0;
  }
  _$AT(i8, t7, e11) {
    super._$AT(i8, t7, e11), r9(this), this.isConnected = i8._$AU;
  }
  _$AO(i8, t7 = true) {
    i8 !== this.isConnected && (this.isConnected = i8, i8 ? this.reconnected?.() : this.disconnected?.()), t7 && (s7(this, i8), o9(this));
  }
  setValue(t7) {
    if (r3(this._$Ct)) this._$Ct._$AI(t7, this);
    else {
      const i8 = [...this._$Ct._$AH];
      i8[this._$Ci] = t7, this._$Ct._$AI(i8, this, 0);
    }
  }
  disconnected() {
  }
  reconnected() {
  }
};

// node_modules/lit-html/node/directives/ref.js
var e10 = () => new h5();
var h5 = class {
};
var o10 = /* @__PURE__ */ new WeakMap();
var n8 = e6(class extends f7 {
  render(i8) {
    return A2;
  }
  update(i8, [s8]) {
    const e11 = s8 !== this.G;
    return e11 && this.rt(void 0), (e11 || this.lt !== this.ct) && (this.G = s8, this.ht = i8.options?.host, this.rt(this.ct = i8.element)), A2;
  }
  rt(t7) {
    if (void 0 !== this.G) if (this.isConnected || (t7 = void 0), "function" == typeof this.G) {
      const i8 = this.ht ?? globalThis;
      let s8 = o10.get(i8);
      void 0 === s8 && (s8 = /* @__PURE__ */ new WeakMap(), o10.set(i8, s8)), void 0 !== s8.get(this.G) && this.G.call(this.ht, void 0), s8.set(this.G, t7), void 0 !== t7 && this.G.call(this.ht, t7);
    } else this.G.value = t7;
  }
  get lt() {
    return "function" == typeof this.G ? o10.get(this.ht ?? globalThis)?.get(this.G) : this.G?.value;
  }
  disconnected() {
    this.lt === this.ct && this.rt(void 0);
  }
  reconnected() {
    this.rt(this.ct);
  }
});

// node_modules/@vollowx/seele/src/base/dialog.js
var Dialog = class extends i4 {
  constructor() {
    super(...arguments);
    this._handleCancel = (e11) => {
      e11.preventDefault();
      this.close();
    };
  }
  async show() {
    this.$dialog.showModal();
    const autoFocus = this.querySelector("[autofocus]");
    if (autoFocus) {
      autoFocus.focus();
    } else {
      const firstTabbable = getFirstTabbable(this);
      firstTabbable?.focus();
    }
  }
  async close() {
    this.$dialog.close();
  }
};
__decorate([
  e9("dialog")
], Dialog.prototype, "$dialog", void 0);

// node_modules/@vollowx/seele/src/m3/dialog/dialog-styles.css.js
var dialogStyles = i3`dialog{background:0 0;border:none;outline:0;min-width:280px;max-width:min(560px,100% - 48px);min-height:140px;max-height:min(560px,100% - 48px);padding:0;overflow:visible}dialog[open]{display:flex}dialog::backdrop{background:0 0}[part=container]{box-sizing:border-box;will-change:height, transform, opacity;background-color:var(--md-sys-color-surface-container-high);border-radius:28px;flex-direction:column;flex-grow:1;padding-top:8px;display:flex;position:relative;overflow:hidden}[part=headline]{flex-direction:column;display:flex}::slotted([slot=icon]){block-size:1em;color:var(--md-sys-color-secondary);fill:currentColor;inline-size:1em;margin:16px 0 0;font-size:24px}::slotted([slot=headline]){box-sizing:border-box;font:var(--md-sys-typography-headline-small);color:var(--md-sys-color-on-surface);margin:0;padding:16px 24px 0}[part=headline].has-icon{align-items:center}[part=content]{color:var(--md-sys-color-on-surface-variant);font:var(--md-sys-typography-body-medium);will-change:opacity;padding:16px 24px 0;display:block}[part=actions]{justify-content:flex-end;gap:8px;display:flex;position:absolute;bottom:0;left:0;right:0}slot[name=actions]::slotted(*){box-sizing:border-box;justify-content:flex-end;gap:8px;padding:24px;display:flex}[part=scrim]{background:var(--md-sys-color-scrim);opacity:.32;pointer-events:none;z-index:1;display:none;position:fixed;inset:0}dialog[open]+[part=scrim]{display:block}@media (forced-colors:active){[part=container]{outline:2px solid windowtext}}`;

// node_modules/@vollowx/seele/src/m3/dialog/dialog.js
var M3Dialog = class M3Dialog2 extends Dialog {
  constructor() {
    super(...arguments);
    this._config = {
      openEase: "cubic-bezier(0, 0, 0, 1)",
      closeEase: "cubic-bezier(0.3, 0, 1, 1)",
      vertSlide: 40,
      openDur: 500,
      closeDur: 200,
      bodyFadeInDur: 200,
      bodyFadeOutDur: 100
    };
    this.hasIcon = false;
    this.#activeAnimations = [];
    this.#handleClick = (e11) => {
      const target = e11.target;
      if (!this.$container.contains(target) && !this.contains(target))
        this.close();
    };
    this.#handleIconSlotChange = () => {
      this.hasIcon = this.$icon.assignedElements({ flatten: true }).length > 0;
    };
    this.#opening = false;
    this.#closing = false;
  }
  static {
    this.styles = [dialogStyles];
  }
  render() {
    return T`<dialog part="dialog" @click="${this.#handleClick}" @cancel="${this._handleCancel}"><div part="container"><div part="body"><div part="headline" class="${this.hasIcon ? "has-icon" : ""}"><slot name="icon" @slotchange="${this.#handleIconSlotChange}"></slot><slot name="headline"></slot></div><div part="content"><slot></slot></div><div class="actions-placeholder"></div></div><div part="actions"><slot name="actions"></slot></div></div></dialog><div part="scrim"></div>`;
  }
  async firstUpdated() {
    await ensureSlottedReady(this);
    this.#handleIconSlotChange();
  }
  #activeAnimations;
  #clearAnimations() {
    this.#activeAnimations.forEach((anim) => anim.cancel());
    this.#activeAnimations = [];
    this.#opening = this.#closing = false;
  }
  #handleClick;
  #handleIconSlotChange;
  #opening;
  async show() {
    if (this.#opening)
      return;
    this.#clearAnimations();
    this.#opening = true;
    this.$dialog.style.marginTop = "auto";
    this.$dialog.style.marginBottom = "auto";
    super.show();
    const actionsHeight = this.$actions.offsetHeight;
    this.$actionsPlaceholder.style.height = `${actionsHeight}px`;
    this.$container.style.height = "auto";
    const startHeight = 0;
    const endHeight = this.$container.offsetHeight;
    const rect = this.$container.getBoundingClientRect();
    this.$dialog.style.marginTop = `${rect.top}px`;
    this.$dialog.style.marginBottom = "auto";
    this.$container.style.minHeight = "0px";
    const container = this.$container.animate([
      {
        height: `${startHeight}px`,
        transform: `translateY(-${this._config.vertSlide}px)`
      },
      {
        height: `${endHeight}px`,
        transform: "translateY(0px)"
      }
    ], { duration: this._config.openDur, easing: this._config.openEase });
    const scrim = this.$scrim.animate([{ opacity: 0 }, { opacity: 0.32 }], {
      duration: this._config.openDur,
      easing: this._config.openEase,
      fill: "forwards"
    });
    const body = this.$body.animate([{ opacity: 0.2 }, { opacity: 1 }], {
      duration: this._config.bodyFadeInDur,
      easing: "linear",
      fill: "forwards"
    });
    const actions = this.$actions.animate([{ opacity: 0.5 }, { opacity: 1 }], {
      duration: this._config.bodyFadeInDur,
      easing: "linear",
      fill: "forwards"
    });
    this.#activeAnimations.push(container, scrim, body, actions);
    container.onfinish = () => {
      this.$container.style.minHeight = "";
      this.#clearAnimations();
    };
  }
  #closing;
  async close() {
    if (this.#closing)
      return;
    this.#clearAnimations();
    this.#closing = true;
    const startHeight = this.$container.offsetHeight;
    const endHeight = startHeight * 0.35;
    this.$container.style.minHeight = "0px";
    const containerSpatial = this.$container.animate([
      { height: `${startHeight}px`, transform: "translateY(0px)" },
      {
        height: `${endHeight}px`,
        transform: `translateY(-${this._config.vertSlide}px)`
      }
    ], {
      duration: this._config.closeDur,
      easing: this._config.closeEase
    });
    const containerEffects = this.$container.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: this._config.closeDur - this._config.bodyFadeOutDur,
      delay: this._config.bodyFadeOutDur,
      easing: "linear",
      fill: "forwards"
    });
    const scrim = this.$scrim.animate([{ opacity: 0.32 }, { opacity: 0 }], {
      duration: this._config.closeDur,
      easing: this._config.closeEase,
      fill: "forwards"
    });
    const body = this.$body.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: this._config.bodyFadeOutDur,
      easing: "linear",
      fill: "forwards"
    });
    const actions = this.$actions.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: this._config.bodyFadeOutDur,
      easing: "linear",
      fill: "forwards"
    });
    this.#activeAnimations.push(containerSpatial, containerEffects, scrim, body, actions);
    containerSpatial.onfinish = () => {
      this.$container.style.minHeight = "";
      super.close();
      this.#clearAnimations();
    };
  }
};
__decorate([
  r8()
], M3Dialog.prototype, "hasIcon", void 0);
__decorate([
  e9("[part=container]")
], M3Dialog.prototype, "$container", void 0);
__decorate([
  e9("[part=body]")
], M3Dialog.prototype, "$body", void 0);
__decorate([
  e9("[name=icon]")
], M3Dialog.prototype, "$icon", void 0);
__decorate([
  e9("[part=actions]")
], M3Dialog.prototype, "$actions", void 0);
__decorate([
  e9(".actions-placeholder")
], M3Dialog.prototype, "$actionsPlaceholder", void 0);
__decorate([
  e9("[part=scrim]")
], M3Dialog.prototype, "$scrim", void 0);
M3Dialog = __decorate([
  t6("md-dialog")
], M3Dialog);

// node_modules/lit-html/node/directives/live.js
var l4 = e6(class extends i5 {
  constructor(r10) {
    if (super(r10), r10.type !== t5.PROPERTY && r10.type !== t5.ATTRIBUTE && r10.type !== t5.BOOLEAN_ATTRIBUTE) throw Error("The `live` directive is not allowed on child or event bindings");
    if (!r3(r10)) throw Error("`live` bindings can only contain a single expression");
  }
  render(r10) {
    return r10;
  }
  update(i8, [t7]) {
    if (t7 === E || t7 === A2) return t7;
    const o11 = i8.element, l5 = i8.name;
    if (i8.type === t5.PROPERTY) {
      if (t7 === o11[l5]) return E;
    } else if (i8.type === t5.BOOLEAN_ATTRIBUTE) {
      if (!!t7 === o11.hasAttribute(l5)) return E;
    } else if (i8.type === t5.ATTRIBUTE && o11.getAttribute(l5) === t7 + "") return E;
    return p2(i8), t7;
  }
});

// node_modules/@vollowx/seele/src/base/mixins/focus-delegated.js
var FocusDelegated = (superClass) => {
  class FocusDelegatedElement extends superClass {
    static {
      this.shadowRootOptions = {
        ...i4.shadowRootOptions,
        delegatesFocus: true
      };
    }
    constructor(...args) {
      super();
      this[internals].role = "presentation";
    }
  }
  return FocusDelegatedElement;
};

// node_modules/@vollowx/seele/src/base/input.js
var Base2 = FormAssociated(FocusDelegated(InternalsAttached(i4)));
var Input = class extends Base2 {
  constructor() {
    super(...arguments);
    this.type = "text";
    this.value = "";
    this.placeholder = "";
    this.required = false;
    this.readOnly = false;
    this.multiple = false;
    this.min = "";
    this.max = "";
    this.step = "";
    this.minLength = -1;
    this.maxLength = -1;
    this.pattern = "";
    this.autocomplete = "";
    this.focused = false;
  }
  render() {
    const isTextarea = this.type === "textarea";
    const minLength = this.minLength > -1 ? this.minLength : A2;
    const maxLength = this.maxLength > -1 ? this.maxLength : A2;
    if (isTextarea) {
      return T`<textarea part="input" .value="${l4(this.value)}" placeholder="${this.placeholder || A2}" ?required="${this.required}" ?readonly="${this.readOnly}" ?disabled="${this.disabled}" minlength="${minLength}" maxlength="${maxLength}" autocomplete="${this.autocomplete || A2}" @input="${this.handleInput}" @change="${this.handleChange}" @focus="${this.handleFocus}" @blur="${this.handleBlur}"></textarea>`;
    }
    return T`<input part="input" type="${this.type}" .value="${l4(this.value)}" placeholder="${this.placeholder || A2}" ?required="${this.required}" ?readonly="${this.readOnly}" ?disabled="${this.disabled}" ?multiple="${this.multiple}" min="${this.min || A2}" max="${this.max || A2}" step="${this.step || A2}" minlength="${minLength}" maxlength="${maxLength}" pattern="${this.pattern || A2}" autocomplete="${this.autocomplete || A2}" @input="${this.handleInput}" @change="${this.handleChange}" @focus="${this.handleFocus}" @blur="${this.handleBlur}">`;
  }
  updated(changedProperties2) {
    super.updated(changedProperties2);
    if (changedProperties2.has("value")) {
      this[internals].setFormValue(this.value);
      this.syncValidity();
    }
  }
  handleInput(event) {
    const target = event.target;
    this.value = target.value;
    this.syncValidity();
  }
  handleChange(event) {
    this.redispatchEvent(event);
  }
  handleFocus() {
    this.focused = true;
  }
  handleBlur() {
    this.focused = false;
  }
  redispatchEvent(event) {
    const newEvent = new Event(event.type, {
      bubbles: event.bubbles,
      cancelable: event.cancelable,
      composed: true
    });
    this.dispatchEvent(newEvent);
  }
  syncValidity() {
    if (!this.$inputOrTextarea)
      return;
    this[internals].setValidity(this.$inputOrTextarea.validity, this.$inputOrTextarea.validationMessage, this.$inputOrTextarea);
  }
  select() {
    this.$inputOrTextarea?.select();
  }
  stepUp(n9) {
    this.$inputOrTextarea?.stepUp(n9);
    this.handleInput({ target: this.$inputOrTextarea });
  }
  stepDown(n9) {
    this.$inputOrTextarea?.stepDown(n9);
    this.handleInput({ target: this.$inputOrTextarea });
  }
  formResetCallback() {
    this.value = this.getAttribute("value") || "";
    this.syncValidity();
  }
  formStateRestoreCallback(state) {
    this.value = state;
    this.syncValidity();
  }
};
__decorate([
  n6({ reflect: true })
], Input.prototype, "type", void 0);
__decorate([
  n6()
], Input.prototype, "value", void 0);
__decorate([
  n6({ reflect: true })
], Input.prototype, "placeholder", void 0);
__decorate([
  n6({ type: Boolean, reflect: true })
], Input.prototype, "required", void 0);
__decorate([
  n6({ type: Boolean, reflect: true })
], Input.prototype, "readOnly", void 0);
__decorate([
  n6({ type: Boolean, reflect: true })
], Input.prototype, "multiple", void 0);
__decorate([
  n6()
], Input.prototype, "min", void 0);
__decorate([
  n6()
], Input.prototype, "max", void 0);
__decorate([
  n6()
], Input.prototype, "step", void 0);
__decorate([
  n6({ type: Number })
], Input.prototype, "minLength", void 0);
__decorate([
  n6({ type: Number })
], Input.prototype, "maxLength", void 0);
__decorate([
  n6()
], Input.prototype, "pattern", void 0);
__decorate([
  n6({ reflect: true })
], Input.prototype, "autocomplete", void 0);
__decorate([
  n6({ type: Boolean, reflect: true })
], Input.prototype, "focused", void 0);
__decorate([
  e9("[part~=input]")
], Input.prototype, "$inputOrTextarea", void 0);

// node_modules/@vollowx/seele/src/base/field.js
var Field = class extends i4 {
};

// node_modules/@vollowx/seele/src/m3/field/field-styles.css.js
var fieldStyles = i3`:host{--_min-height:56px;--_padding-top:16px;--_padding-bottom:16px;cursor:text;-webkit-user-select:none;user-select:none;vertical-align:top;flex-direction:column;display:inline-flex;position:relative}.container{box-sizing:border-box;min-height:var(--_min-height);flex:1;align-items:center;display:flex;position:relative}:host([disabled]){opacity:.38;pointer-events:none}.start,.end{color:var(--md-sys-color-on-surface-variant);justify-content:center;align-items:center;min-width:48px;display:flex}.start[hidden],.end[hidden]{display:none}.middle{flex-direction:column;flex:1;justify-content:center;height:100%;display:flex;position:relative;overflow:hidden}.label{font:var(--md-sys-typography-body-large);pointer-events:none;text-overflow:ellipsis;transform-origin:0 0;max-width:calc(100% - 24px);transition:margin-top var(--md-sys-motion-effects-default-duration) var(--md-sys-motion-effects-default), font-size var(--md-sys-motion-effects-default-duration) var(--md-sys-motion-effects-default);white-space:nowrap}.input-wrapper{padding-block:var(--_padding-top) var(--_padding-bottom);flex:1;align-items:center;display:flex}:host([has-label]:not([focused]):not([populated])) ::slotted(input:placeholder-shown),:host([has-label]:not([focused]):not([populated])) ::slotted(textarea:placeholder-shown){opacity:0}::slotted(*){caret-color:var(--md-sys-color-primary);font:var(--md-sys-typography-body-large)}.supporting-text{color:var(--md-sys-color-on-surface-variant);font:var(--md-sys-typography-body-small);padding-inline:16px;padding-top:4px}:host([error]) ::slotted(*){caret-color:var(--md-sys-color-error)}:host([error]) .supporting-text{color:var(--md-sys-color-error)}@media (forced-colors:active){:host{--md-sys-color-primary:Highlight;--md-sys-color-error:VisitedText}}`;

// node_modules/@vollowx/seele/src/m3/field/field.js
var M3Field = class extends Field {
  constructor() {
    super(...arguments);
    this.label = "";
    this.supportingText = "";
    this.disabled = false;
    this.error = false;
    this.focused = false;
    this.populated = false;
    this.hasLabel = false;
    this.hasStart = false;
    this.hasEnd = false;
  }
  static {
    this.styles = [fieldStyles];
  }
  render() {
    return T`<div class="container">${this.renderContainerContent()}</div>${this.renderSupportingText()}`;
  }
  renderSupportingText() {
    if (!this.supportingText) {
      return "";
    }
    return T`<div class="supporting-text">${this.supportingText}</div>`;
  }
  renderStart() {
    return T`<slot name="start" class="start" ?hidden="${!this.hasStart}" @slotchange="${this.handleSlotChange}"></slot>`;
  }
  renderEnd() {
    return T`<slot name="end" class="end" ?hidden="${!this.hasEnd}" @slotchange="${this.handleSlotChange}"></slot>`;
  }
  update(changedProperties2) {
    if (changedProperties2.has("label")) {
      this.hasLabel = !!this.label;
    }
    super.update(changedProperties2);
  }
  handleSlotChange(e11) {
    const slot = e11.target;
    const hasContent = slot.assignedNodes({ flatten: true }).length > 0;
    if (slot.name === "start")
      this.hasStart = hasContent;
    if (slot.name === "end")
      this.hasEnd = hasContent;
  }
};
__decorate([
  n6({ type: String, reflect: true })
], M3Field.prototype, "label", void 0);
__decorate([
  n6({ type: String, reflect: true, attribute: "supporting-text" })
], M3Field.prototype, "supportingText", void 0);
__decorate([
  n6({ type: Boolean, reflect: true })
], M3Field.prototype, "disabled", void 0);
__decorate([
  n6({ type: Boolean, reflect: true })
], M3Field.prototype, "error", void 0);
__decorate([
  n6({ type: Boolean, reflect: true })
], M3Field.prototype, "focused", void 0);
__decorate([
  n6({ type: Boolean, reflect: true })
], M3Field.prototype, "populated", void 0);
__decorate([
  n6({ type: Boolean, reflect: true, attribute: "has-label" })
], M3Field.prototype, "hasLabel", void 0);
__decorate([
  r8()
], M3Field.prototype, "hasStart", void 0);
__decorate([
  r8()
], M3Field.prototype, "hasEnd", void 0);

// node_modules/@vollowx/seele/src/m3/field/outlined-field-styles.css.js
var outlinedFieldStyles = i3`:host{--_outline-width:1px}.container{border-radius:4px;padding-inline:16px}.outline{border-radius:inherit;color:var(--md-sys-color-outline);pointer-events:none;display:flex;position:absolute;inset:0}.outline-start,.outline-notch,.outline-end{border:var(--_outline-width) solid currentColor;box-sizing:border-box;transition:border-width var(--md-sys-motion-effects-fast-duration) var(--md-sys-motion-effects-fast), border-top-color var(--md-sys-motion-effects-fast-duration) var(--md-sys-motion-effects-fast)}.outline-start{border-radius:inherit;border-inline-end:none;border-start-end-radius:0;border-end-end-radius:0;width:12px}.outline-end{border-radius:inherit;border-inline-start:none;border-start-start-radius:0;border-end-start-radius:0;flex:1}.outline-notch{border-inline:none;align-items:flex-start;max-width:calc(100% - 24px);margin-top:0;padding:0 4px;display:flex}:host(:not([has-label])) .outline-notch{display:none}.label{margin-top:calc(var(--_padding-top) - 1px)}:host(:hover) .label,:host(:hover) .outline{color:var(--md-sys-color-on-surface)}:host([focused]){--_outline-width:3px}:host([focused]) .label,:host([focused]) .outline{color:var(--md-sys-color-primary)}:host([error]) .label,:host([error]) .outline{color:var(--md-sys-color-error)}:host([populated]) .outline-notch,:host([focused]) .outline-notch{border-top-width:0;border-top-color:#0000}:host([populated]) .label,:host([focused]) .label{margin-top:calc(-.75em - 3px);font-size:.75em}:host([disabled]) .outline{color:var(--md-sys-color-outline-variant)}:host([disabled]) .label{color:var(--md-sys-color-on-surface-variant)}`;

// node_modules/@vollowx/seele/src/m3/field/outlined-field.js
var M3OutlinedField = class M3OutlinedField2 extends M3Field {
  static {
    this.styles = [...super.styles, outlinedFieldStyles];
  }
  renderContainerContent() {
    return T`${this.renderOutline()} ${this.renderStart()}<div class="middle"><div class="input-wrapper"><slot></slot></div></div>${this.renderEnd()}`;
  }
  renderOutline() {
    return T`<div class="outline"><div class="outline-start"></div><div class="outline-notch"><span class="label">${this.label}</span></div><div class="outline-end"></div></div>`;
  }
};
M3OutlinedField = __decorate([
  t6("md-outlined-field")
], M3OutlinedField);

// node_modules/@vollowx/seele/src/m3/text-field/text-field-styles.css.js
var textFieldStyles = i3`:host{-webkit-user-select:none;user-select:none;min-width:210px;display:inline-block}md-filled-field,md-outlined-field{width:100%}[part=input]{color:inherit;font:var(--md-sys-typography-body-large);-webkit-tap-highlight-color:transparent;background:0 0;border:none;outline:none;width:100%;height:100%;margin:0;padding:0}`;

// node_modules/@vollowx/seele/src/m3/text-field/outlined-text-field.js
var M3OutlinedTextField = class M3OutlinedTextField2 extends Input {
  constructor() {
    super(...arguments);
    this.label = "";
    this.supportingText = "";
  }
  static {
    this.styles = [textFieldStyles];
  }
  render() {
    return T`<md-outlined-field label="${this.label}" supporting-text="${this.supportingText}" ?populated="${!!this.value}" ?disabled="${this.disabled}" ?focused="${this.focused}" ?error="${this.checkValidity() === false}">${super.render()}<slot slot="start" name="start"></slot><slot slot="end" name="end"></slot></md-outlined-field>`;
  }
};
__decorate([
  n6({ reflect: true })
], M3OutlinedTextField.prototype, "label", void 0);
__decorate([
  n6({ reflect: true, attribute: "supporting-text" })
], M3OutlinedTextField.prototype, "supportingText", void 0);
M3OutlinedTextField = __decorate([
  t6("md-outlined-text-field")
], M3OutlinedTextField);

// node_modules/@vollowx/seele/src/m3/button/common-button-styles.css.js
var commonButtonStyles = i3`@layer main{:host{--_padding:16px;--md-focus-ring-shape:calc(var(--_h) / 2);font:var(--md-sys-typography-label-large);min-inline-size:64px;padding-inline:var(--_padding);transition:box-shadow var(--md-sys-motion-effects-default-duration) var(--md-sys-motion-effects-default), border-radius var(--md-sys-motion-spatial-fast-duration) var(--md-sys-motion-spatial-fast);justify-content:center;align-items:center;gap:8px;display:inline-flex}:host([size=xs]){--_padding:12px;gap:4px}:host([size=m]){--_padding:24px;font:var(--md-sys-typography-title-medium);gap:8px}:host([size=l]){--_padding:48px;font:var(--md-sys-typography-headline-small);gap:12px}:host([size=xl]){--_padding:64px;font:var(--md-sys-typography-headline-medium);gap:16px}:host([trailing-icon]){flex-direction:row-reverse}:host([variant=outlined]){padding-inline:calc(var(--_padding) - 1px)}:host([variant=text]){padding-inline:calc(var(--_padding) / 4 * 3)}::slotted([slot=icon]),::slotted([slot=icon-checked]){fill:currentColor;block-size:1em;font-size:var(--_icon-size);inline-size:1em}}@layer override{:host([variant=elevated]){background-color:var(--md-sys-color-surface-container-low);color:var(--_color);box-shadow:var(--md-sys-elevation-shadow-1)}@media (hover:hover) and (pointer:fine){:host([variant=filled]:hover:not(:active)),:host([variant=tonal]:hover:not(:active)){box-shadow:var(--md-sys-elevation-shadow-1)}:host([variant=elevated]:hover:not(:active)){box-shadow:var(--md-sys-elevation-shadow-2)}}}`;

// node_modules/@vollowx/seele/src/m3/button/common-button.js
var M3Button = class M3Button2 extends Button {
  constructor() {
    super(...arguments);
    this.size = "s";
    this.color = "primary";
    this.variant = "filled";
    this.trailingIcon = false;
  }
  static {
    this.styles = [
      ...super.styles,
      targetStyles,
      sharedButtonStyles,
      commonButtonStyles
    ];
  }
  render() {
    return T`<md-focus-ring></md-focus-ring><md-ripple></md-ripple><span part="target"></span><slot part="icon" name="icon" aria-hidden="true"></slot><slot part="label"></slot>`;
  }
};
__decorate([
  n6({ reflect: true })
], M3Button.prototype, "size", void 0);
__decorate([
  n6({ reflect: true, type: Boolean })
], M3Button.prototype, "square", void 0);
__decorate([
  n6({ reflect: true })
], M3Button.prototype, "color", void 0);
__decorate([
  n6({ reflect: true })
], M3Button.prototype, "variant", void 0);
__decorate([
  n6({ type: Boolean, reflect: true, attribute: "trailing-icon" })
], M3Button.prototype, "trailingIcon", void 0);
M3Button = __decorate([
  t6("md-button")
], M3Button);

// src/components/timezone-dialog.ts
var _dialog, _TimezoneDialog_instances, select_fn, _cancel, offsetLabel_fn2;
var TimezoneDialog = class extends i4 {
  constructor() {
    super();
    __privateAdd(this, _TimezoneDialog_instances);
    __privateAdd(this, _dialog, e10());
    __privateAdd(this, _cancel, () => {
      __privateGet(this, _dialog).value?.close();
      this.query = "";
    });
    this.query = "";
  }
  render() {
    const q = this.query.toLowerCase().trim();
    const filtered = q ? allTimezones().filter(
      (t7) => t7.label.toLowerCase().includes(q) || t7.id.toLowerCase().includes(q)
    ) : allTimezones();
    return T`
      <md-dialog ${n8(__privateGet(this, _dialog))}>
        <span slot="headline">Add location</span>

        <div>
          <md-outlined-text-field
            slot="headline"
            label="Search locations"
            .value=${this.query}
            @input=${(e11) => {
      this.query = e11.target.value;
    }}
          ></md-outlined-text-field>

          <md-list>
            ${filtered.slice(0, 100).map(
      (tz) => T`
                <md-list-item @click=${() => __privateMethod(this, _TimezoneDialog_instances, select_fn).call(this, tz.id)}>
                  <span slot="headline">${tz.label}</span>
                  <span slot="supporting-text"
                    >${__privateMethod(this, _TimezoneDialog_instances, offsetLabel_fn2).call(this, tzOffset(tz.id))}</span
                  >
                  <span slot="end">${tz.id}</span>
                </md-list-item>
              `
    )}
          </md-list>
        </div>

        <div slot="actions">
          <md-button variant="text" @click=${__privateGet(this, _cancel)}>Cancel</md-button>
        </div>
      </md-dialog>
    `;
  }
  show() {
    __privateGet(this, _dialog).value?.show();
  }
};
_dialog = new WeakMap();
_TimezoneDialog_instances = new WeakSet();
select_fn = function(id) {
  timezoneStore.add(id);
  __privateGet(this, _dialog).value?.close();
  this.query = "";
};
_cancel = new WeakMap();
offsetLabel_fn2 = function(minutes) {
  if (minutes === 0) return "UTC";
  const sign = minutes > 0 ? "+" : "-";
  const h6 = Math.abs(Math.floor(minutes / 60));
  const m6 = Math.abs(minutes % 60);
  return `UTC${sign}${h6}${m6 ? `:${String(m6).padStart(2, "0")}` : ""}`;
};
TimezoneDialog.styles = i3`
    :host {
      z-index: 20;
    }
    md-dialog::part(dialog) {
      width: 560px;
    }
    md-outlined-text-field {
      width: 100%;
      margin-block-end: 8px;
    }
    md-list {
      height: 360px;
      width: 100%;
      padding: 0;
      box-sizing: border-box;
    }
  `;
TimezoneDialog.properties = {
  query: { type: String, state: true }
};
TimezoneDialog = __decorateClass([
  wrappedCustomElement("timezone-dialog", false)
], TimezoneDialog);

// src/components/clock-view.ts
var _interval, _onChange2, _ClockView_instances, openDialog_fn;
var ClockView = class extends i4 {
  constructor() {
    super(...arguments);
    __privateAdd(this, _ClockView_instances);
    this.now = Date.now();
    __privateAdd(this, _interval);
    __privateAdd(this, _onChange2, () => this.requestUpdate());
  }
  render() {
    return T`
      <world-map></world-map>

      <div class="list-area">
        <div class="sync">${this.renderSync()}</div>
        <timezone-list .now=${this.now}></timezone-list>
      </div>

      <md-fab @click=${__privateMethod(this, _ClockView_instances, openDialog_fn)}>
        <iconify-icon icon="material-symbols:add"></iconify-icon>
        <span slot="label">Add location</span>
      </md-fab>

      <timezone-dialog></timezone-dialog>
    `;
  }
  renderSync() {
    switch (timeSync.status) {
      case "synced":
        return T`synced. ${formatClockOffset(timeSync.fastByMs)}`;
      case "error":
        return T`<span class="error">sync unavailable</span>`;
      default:
        return T`<md-loading
          aria-label="Syncing accurate time"
        ></md-loading>`;
    }
  }
  connectedCallback() {
    super.connectedCallback();
    settings.addEventListener("change", __privateGet(this, _onChange2));
    timeSync.addEventListener("change", __privateGet(this, _onChange2));
    timezoneStore.addEventListener("change", __privateGet(this, _onChange2));
    __privateSet(this, _interval, window.setInterval(() => {
      this.now = Date.now();
    }, 250));
  }
  disconnectedCallback() {
    settings.removeEventListener("change", __privateGet(this, _onChange2));
    timeSync.removeEventListener("change", __privateGet(this, _onChange2));
    timezoneStore.removeEventListener("change", __privateGet(this, _onChange2));
    if (__privateGet(this, _interval) !== void 0) window.clearInterval(__privateGet(this, _interval));
    super.disconnectedCallback();
  }
};
_interval = new WeakMap();
_onChange2 = new WeakMap();
_ClockView_instances = new WeakSet();
openDialog_fn = function() {
  const dialog = this.shadowRoot?.querySelector(
    "timezone-dialog"
  );
  dialog?.show();
};
ClockView.styles = i3`
    :host {
      position: relative;
      display: flex;
      flex: 1;
      flex-direction: column;
      overflow: hidden;
    }

    world-map {
      position: absolute;
      inset: 0;
    }

    .list-area {
      position: relative;
      margin-top: auto;
      display: flex;
      flex-direction: column;
      padding: 48px 24px 24px;
      max-height: 70%;
    }

    md-fab {
      position: absolute;
      inset-block-end: 24px;
      inset-inline-end: 24px;
      z-index: 10;
    }

    .sync {
      box-sizing: border-box;
      padding-block-end: 8px;
      padding-inline-start: 12px;
      border-radius: 12px;
      font: var(--md-sys-typography-body-small);
      color: var(--md-sys-color-on-surface-variant);
    }
    .error {
      color: var(--md-sys-color-error);
    }
  `;
__decorateClass([
  n6({ type: Number })
], ClockView.prototype, "now", 2);
ClockView = __decorateClass([
  t6("clock-view")
], ClockView);

// src/lib/stopwatch-store.ts
var STORAGE_KEY2 = "timor.stopwatch";
var StopwatchStore = class extends EventTarget {
  constructor() {
    super();
    this.running = false;
    this.elapsedMs = 0;
    this.laps = [];
    this.baseMs = 0;
    this.runningSince = 0;
    this.startedAt = 0;
    this.lastLapTotal = 0;
    this.raf = 0;
    this.tick = () => {
      if (!this.running) return;
      this.elapsedMs = this.baseMs + (performance.now() - this.runningSince);
      this.raf = requestAnimationFrame(this.tick);
      this.#dispatchEvent();
    };
    this.restore();
  }
  get isRunning() {
    return this.running;
  }
  get elapsed() {
    return this.elapsedMs;
  }
  get lapList() {
    return this.laps;
  }
  toggle() {
    if (this.running) {
      this.baseMs = this.elapsedMs;
      this.running = false;
      this.stopRaf();
    } else {
      this.runningSince = performance.now();
      this.startedAt = Date.now();
      this.running = true;
      this.raf = requestAnimationFrame(this.tick);
    }
    this.persist();
    this.#dispatchEvent();
  }
  lap() {
    if (!this.running) return;
    const total = this.elapsedMs;
    const split = total - this.lastLapTotal;
    this.lastLapTotal = total;
    this.laps = [{ n: this.laps.length + 1, split, total }, ...this.laps];
    this.persist();
    this.#dispatchEvent();
  }
  reset() {
    this.running = false;
    this.stopRaf();
    this.baseMs = 0;
    this.startedAt = 0;
    this.lastLapTotal = 0;
    this.elapsedMs = 0;
    this.laps = [];
    this.persist();
    this.#dispatchEvent();
  }
  stopRaf() {
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }
  persist() {
    const data = {
      running: this.running,
      baseMs: this.baseMs,
      startedAt: this.startedAt,
      laps: this.laps,
      lastLapTotal: this.lastLapTotal
    };
    writeJSON(STORAGE_KEY2, data);
  }
  restore() {
    const data = readJSON(STORAGE_KEY2);
    if (!data || typeof data !== "object") return;
    const laps = Array.isArray(data.laps) ? data.laps.filter(
      (l5) => l5 && Number.isFinite(l5.n) && Number.isFinite(l5.split) && Number.isFinite(l5.total)
    ) : [];
    this.laps = laps;
    this.lastLapTotal = Number.isFinite(data.lastLapTotal) ? data.lastLapTotal : laps.length > 0 ? laps[0].total : 0;
    const baseMs = Number.isFinite(data.baseMs) ? Math.max(0, data.baseMs) : 0;
    if (data.running) {
      const now = Date.now();
      const startedAt = Number.isFinite(data.startedAt) ? data.startedAt : now;
      const elapsed = Math.max(0, baseMs + (now - startedAt));
      this.baseMs = elapsed;
      this.elapsedMs = elapsed;
      this.running = true;
      this.startedAt = now;
      this.runningSince = performance.now();
      this.raf = requestAnimationFrame(this.tick);
    } else {
      this.baseMs = baseMs;
      this.elapsedMs = baseMs;
      this.running = false;
    }
  }
  #dispatchEvent() {
    this.dispatchEvent(new Event("change"));
  }
};
var stopwatchStore = new StopwatchStore();

// node_modules/@vollowx/seele/src/base/mixins/button-toggle-mixin.js
var PROPERTY_FROM_ARIA_PRESSED = {
  true: "checked",
  false: "unchecked"
};
var ButtonToggleMixin = (superClass) => {
  class ButtonToggle extends superClass {
    constructor(...args) {
      super();
      this.checked = false;
      this._ignoreClick = false;
      this.checked = this.hasAttribute("checked");
    }
    connectedCallback() {
      super.connectedCallback();
      this.labels.forEach((label) => {
        label.addEventListener("click", this.#handleLabelClick);
      });
    }
    disconnectedCallback() {
      this.labels.forEach((label) => {
        label.removeEventListener("click", this.#handleLabelClick);
      });
      super.disconnectedCallback();
    }
    updated(changed) {
      if (changed.has("checked"))
        this[updateInternals]();
    }
    [updateInternals]() {
      super[updateInternals]();
      this[internals].ariaPressed = this.checked ? "true" : "false";
      this[replaceStates](["unchecked", "checked"], [PROPERTY_FROM_ARIA_PRESSED[this[internals].ariaPressed]]);
      this[internals].setFormValue(this.checked ? "on" : null);
    }
    #handleLabelClick() {
      this._ignoreClick = false;
    }
    _handleClick(e11) {
      e11.stopPropagation();
      e11.preventDefault();
      if (this._ignoreClick) {
        this._ignoreClick = false;
        return;
      }
      this._toggle();
    }
    _toggle() {
      if (this.disabled)
        return;
      this.checked = !this.checked;
      this.dispatchEvent(new CustomEvent("change", {
        bubbles: true,
        composed: true,
        detail: this.checked
      }));
    }
    formResetCallback() {
      this.checked = this.hasAttribute("checked");
    }
    formStateRestoreCallback(state, _reason) {
      this.checked = state === "on";
    }
  }
  __decorate([
    n6({ type: Boolean })
  ], ButtonToggle.prototype, "checked", void 0);
  return ButtonToggle;
};

// node_modules/@vollowx/seele/src/m3/button/shared-button-toggle-styles.css.js
var sharedButtonToggleStyles = i3`@layer shared-toggle{:host{transition:border-radius var(--md-sys-motion-spatial-fast-duration) var(--md-sys-motion-spatial-fast), box-shadow var(--md-sys-motion-effects-default-duration) var(--md-sys-motion-effects-default), background-color var(--md-sys-motion-effects-fast-duration) var(--md-sys-motion-effects-fast), color var(--md-sys-motion-effects-fast-duration) var(--md-sys-motion-effects-fast)}:host(:state(checked)){--md-focus-ring-shape:var(--_rs);border-radius:var(--_rs)}:host(:state(checked)) [part~=unchecked],:host(:not(:state(checked))) [part~=checked]{display:none}:host([variant=filled]:not(:state(checked))){background-color:var(--md-sys-color-surface-container);color:var(--md-sys-color-on-surface-variant)}:host([variant=tonal]:not(:state(checked))){background-color:var(--md-sys-color-surface-container-highest);color:var(--md-sys-color-on-surface-variant)}:host([variant=outlined]:state(checked)){background-color:var(--md-sys-color-inverse-surface);color:var(--md-sys-color-inverse-on-surface);border-width:0}@media (forced-colors:active){:host(:state(checked)){color:highlighttext;background:highlight}}}`;

// node_modules/@vollowx/seele/src/m3/button/icon-button-toggle.js
var M3IconButtonToggle = class M3IconButtonToggle2 extends ButtonToggleMixin(M3IconButton) {
  static {
    this.styles = [...super.styles, sharedButtonToggleStyles];
  }
  render() {
    return T`<md-focus-ring></md-focus-ring><md-ripple enter-behavior="always"></md-ripple><span part="target"></span><slot part="icon unchecked"></slot><slot part="icon checked" name="checked"></slot>`;
  }
};
M3IconButtonToggle = __decorate([
  t6("md-icon-button-toggle")
], M3IconButtonToggle);

// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
var min = Math.min;
var max = Math.max;
var round = Math.round;
var floor = Math.floor;
var createCoords = (v3) => ({
  x: v3,
  y: v3
});
var oppositeSideMap = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function clamp2(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  const firstChar = placement[0];
  return firstChar === "t" || firstChar === "b" ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
}
var lrPlacement = ["left", "right"];
var rlPlacement = ["right", "left"];
var tbPlacement = ["top", "bottom"];
var btPlacement = ["bottom", "top"];
function getSideList(side, isStart, rtl) {
  switch (side) {
    case "top":
    case "bottom":
      if (rtl) return isStart ? rlPlacement : lrPlacement;
      return isStart ? lrPlacement : rlPlacement;
    case "left":
    case "right":
      return isStart ? tbPlacement : btPlacement;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  const side = getSide(placement);
  return oppositeSideMap[side] + placement.slice(side.length);
}
function expandPaddingObject(padding) {
  var _padding$top, _padding$right, _padding$bottom, _padding$left;
  return {
    top: (_padding$top = padding.top) != null ? _padding$top : 0,
    right: (_padding$right = padding.right) != null ? _padding$right : 0,
    bottom: (_padding$bottom = padding.bottom) != null ? _padding$bottom : 0,
    left: (_padding$left = padding.left) != null ? _padding$left : 0
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  const {
    x: x3,
    y: y3,
    width,
    height
  } = rect;
  return {
    width,
    height,
    top: y3,
    left: x3,
    right: x3 + width,
    bottom: y3 + height,
    x: x3,
    y: y3
  };
}

// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  const alignment = getAlignment(placement);
  if (alignment) {
    coords[alignmentAxis] += commonAlign * (alignment === "end" ? 1 : -1) * (rtl && isVertical ? -1 : 1);
  }
  return coords;
}
async function detectOverflow(state, options) {
  var _await$platform$isEle;
  if (options === void 0) {
    options = {};
  }
  const {
    x: x3,
    y: y3,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    x: x3,
    y: y3,
    width: rects.floating.width,
    height: rects.floating.height
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) && await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
var MAX_RESET_COUNT = 50;
var computePosition = async (reference, floating, config) => {
  const {
    placement = "bottom",
    strategy = "absolute",
    middleware = [],
    platform: platform2
  } = config;
  const platformWithDetectOverflow = platform2.detectOverflow ? platform2 : {
    ...platform2,
    detectOverflow
  };
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
  let rects = await platform2.getElementRects({
    reference,
    floating,
    strategy
  });
  let {
    x: x3,
    y: y3
  } = computeCoordsFromPlacement(rects, placement, rtl);
  let statefulPlacement = placement;
  let resetCount = 0;
  const middlewareData = {};
  for (let i8 = 0; i8 < middleware.length; i8++) {
    const currentMiddleware = middleware[i8];
    if (!currentMiddleware) {
      continue;
    }
    const {
      name,
      fn
    } = currentMiddleware;
    const {
      x: nextX,
      y: nextY,
      data,
      reset
    } = await fn({
      x: x3,
      y: y3,
      initialPlacement: placement,
      placement: statefulPlacement,
      strategy,
      middlewareData,
      rects,
      platform: platformWithDetectOverflow,
      elements: {
        reference,
        floating
      }
    });
    x3 = nextX != null ? nextX : x3;
    y3 = nextY != null ? nextY : y3;
    middlewareData[name] = {
      ...middlewareData[name],
      ...data
    };
    if (reset && resetCount < MAX_RESET_COUNT) {
      resetCount++;
      if (typeof reset === "object") {
        if (reset.placement) {
          statefulPlacement = reset.placement;
        }
        if (reset.rects) {
          rects = reset.rects === true ? await platform2.getElementRects({
            reference,
            floating,
            strategy
          }) : reset.rects;
        }
        ({
          x: x3,
          y: y3
        } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
      }
      i8 = -1;
    }
  }
  return {
    x: x3,
    y: y3,
    placement: statefulPlacement,
    strategy,
    middlewareData
  };
};
var arrow = (options) => ({
  name: "arrow",
  options,
  async fn(state) {
    const {
      x: x3,
      y: y3,
      placement,
      rects,
      platform: platform2,
      elements,
      middlewareData
    } = state;
    const {
      element,
      padding = 0
    } = evaluate(options, state) || {};
    if (element == null) {
      return {};
    }
    const paddingObject = getPaddingObject(padding);
    const coords = {
      x: x3,
      y: y3
    };
    const axis = getAlignmentAxis(placement);
    const length = getAxisLength(axis);
    const arrowDimensions = await platform2.getDimensions(element);
    const isYAxis = axis === "y";
    const minProp = isYAxis ? "top" : "left";
    const maxProp = isYAxis ? "bottom" : "right";
    const clientProp = isYAxis ? "clientHeight" : "clientWidth";
    const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
    const startDiff = coords[axis] - rects.reference[axis];
    const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element));
    let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
    if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
      clientSize = elements.floating[clientProp] || rects.floating[length];
    }
    const centerToReference = endDiff / 2 - startDiff / 2;
    const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
    const minPadding = min(paddingObject[minProp], largestPossiblePadding);
    const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
    const max2 = clientSize - arrowDimensions[length] - maxPadding;
    const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
    const offset3 = clamp2(minPadding, center, max2);
    const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset3 && rects.reference[length] / 2 - (center < minPadding ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
    const alignmentOffset = shouldAddOffset ? center < minPadding ? center - minPadding : center - max2 : 0;
    return {
      [axis]: coords[axis] + alignmentOffset,
      data: {
        [axis]: offset3,
        centerOffset: center - offset3 - alignmentOffset,
        ...shouldAddOffset && {
          alignmentOffset
        }
      },
      reset: shouldAddOffset
    };
  }
});
var flip = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "flip",
    options,
    async fn(state) {
      var _middlewareData$arrow, _middlewareData$flip;
      const {
        placement,
        middlewareData,
        rects,
        initialPlacement,
        platform: platform2,
        elements
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = true,
        fallbackPlacements: specifiedFallbackPlacements,
        fallbackStrategy = "bestFit",
        fallbackAxisSideDirection = "none",
        flipAlignment = true,
        ...detectOverflowOptions
      } = evaluate(options, state);
      if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      const side = getSide(placement);
      const initialSideAxis = getSideAxis(initialPlacement);
      const isBasePlacement = getSide(initialPlacement) === initialPlacement;
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
      const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
      const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
      if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
        fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
      }
      const placements2 = [initialPlacement, ...fallbackPlacements];
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const overflows = [];
      let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
      if (checkMainAxis) {
        overflows.push(overflow[side]);
      }
      if (checkCrossAxis) {
        const sides2 = getAlignmentSides(placement, rects, rtl);
        overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
      }
      overflowsData = [...overflowsData, {
        placement,
        overflows
      }];
      if (!overflows.every((side2) => side2 <= 0)) {
        var _middlewareData$flip2, _overflowsData$filter;
        const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
        const nextPlacement = placements2[nextIndex];
        if (nextPlacement) {
          const ignoreCrossAxisOverflow = checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false;
          if (!ignoreCrossAxisOverflow || // We leave the current main axis only if every placement on that axis
          // overflows the main axis.
          overflowsData.every((d5) => getSideAxis(d5.placement) === initialSideAxis ? d5.overflows[0] > 0 : true)) {
            return {
              data: {
                index: nextIndex,
                overflows: overflowsData
              },
              reset: {
                placement: nextPlacement
              }
            };
          }
        }
        let resetPlacement = (_overflowsData$filter = overflowsData.filter((d5) => d5.overflows[0] <= 0).sort((a3, b4) => a3.overflows[1] - b4.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
        if (!resetPlacement) {
          switch (fallbackStrategy) {
            case "bestFit": {
              var _overflowsData$filter2;
              const placement2 = (_overflowsData$filter2 = overflowsData.filter((d5) => {
                if (hasFallbackAxisSideDirection) {
                  const currentSideAxis = getSideAxis(d5.placement);
                  return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  currentSideAxis === "y";
                }
                return true;
              }).map((d5) => [d5.placement, d5.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a3, b4) => a3[1] - b4[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
              if (placement2) {
                resetPlacement = placement2;
              }
              break;
            }
            case "initialPlacement":
              resetPlacement = initialPlacement;
              break;
          }
        }
        if (placement !== resetPlacement) {
          return {
            reset: {
              placement: resetPlacement
            }
          };
        }
      }
      return {};
    }
  };
};
var originSides = /* @__PURE__ */ new Set(["left", "top"]);
async function convertValueToCoords(state, options) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = originSides.has(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: rawValue.mainAxis || 0,
    crossAxis: rawValue.crossAxis || 0,
    alignmentAxis: rawValue.alignmentAxis
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var offset = function(options) {
  if (options === void 0) {
    options = 0;
  }
  return {
    name: "offset",
    options,
    async fn(state) {
      var _middlewareData$offse, _middlewareData$arrow;
      const {
        x: x3,
        y: y3,
        placement,
        middlewareData
      } = state;
      const diffCoords = await convertValueToCoords(state, options);
      if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
        return {};
      }
      return {
        x: x3 + diffCoords.x,
        y: y3 + diffCoords.y,
        data: {
          ...diffCoords,
          placement
        }
      };
    }
  };
};
var shift = function(options) {
  if (options === void 0) {
    options = {};
  }
  return {
    name: "shift",
    options,
    async fn(state) {
      const {
        x: x3,
        y: y3,
        placement,
        platform: platform2
      } = state;
      const {
        mainAxis: checkMainAxis = true,
        crossAxis: checkCrossAxis = false,
        limiter = {
          fn: (_ref) => {
            let {
              x: x4,
              y: y4
            } = _ref;
            return {
              x: x4,
              y: y4
            };
          }
        },
        ...detectOverflowOptions
      } = evaluate(options, state);
      const coords = {
        x: x3,
        y: y3
      };
      const overflow = await platform2.detectOverflow(state, detectOverflowOptions);
      const crossAxis = getSideAxis(placement);
      const mainAxis = getOppositeAxis(crossAxis);
      let mainAxisCoord = coords[mainAxis];
      let crossAxisCoord = coords[crossAxis];
      const clampCoord = (axis, coord) => clamp2(coord + overflow[axis === "y" ? "top" : "left"], coord, coord - overflow[axis === "y" ? "bottom" : "right"]);
      if (checkMainAxis) {
        mainAxisCoord = clampCoord(mainAxis, mainAxisCoord);
      }
      if (checkCrossAxis) {
        crossAxisCoord = clampCoord(crossAxis, crossAxisCoord);
      }
      const limitedCoords = limiter.fn({
        ...state,
        [mainAxis]: mainAxisCoord,
        [crossAxis]: crossAxisCoord
      });
      return {
        ...limitedCoords,
        data: {
          x: limitedCoords.x - x3,
          y: limitedCoords.y - y3,
          enabled: {
            [mainAxis]: checkMainAxis,
            [crossAxis]: checkCrossAxis
          }
        }
      };
    }
  };
};

// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function hasWindow() {
  return typeof window !== "undefined";
}
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow2(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Node || value instanceof getWindow2(value).Node;
}
function isElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof Element || value instanceof getWindow2(value).Element;
}
function isHTMLElement(value) {
  if (!hasWindow()) {
    return false;
  }
  return value instanceof HTMLElement || value instanceof getWindow2(value).HTMLElement;
}
function isShadowRoot(value) {
  if (!hasWindow() || typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow2(value).ShadowRoot;
}
function isOverflowElement(element) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle2(element);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
}
function isTableElement(element) {
  return /^(table|td|th)$/.test(getNodeName(element));
}
function isTopLayer(element) {
  try {
    if (element.matches(":popover-open")) {
      return true;
    }
  } catch (_e) {
  }
  try {
    return element.matches(":modal");
  } catch (_e) {
    return false;
  }
}
var willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
var containRe = /paint|layout|strict|content/;
var isNotNone = (value) => !!value && value !== "none";
var isWebKitValue;
function isContainingBlock(elementOrCss) {
  const css = isElement(elementOrCss) ? getComputedStyle2(elementOrCss) : elementOrCss;
  return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
}
function getContainingBlock(element) {
  let currentNode = getParentNode(element);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else if (isTopLayer(currentNode)) {
      return null;
    }
    currentNode = getParentNode(currentNode);
  }
  return null;
}
function isWebKit() {
  if (isWebKitValue == null) {
    isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
  }
  return isWebKitValue;
}
function isLastTraversableNode(node) {
  return /^(html|body|#document)$/.test(getNodeName(node));
}
function getComputedStyle2(element) {
  return getWindow2(element).getComputedStyle(element);
}
function getNodeScroll(element) {
  if (isElement(element)) {
    return {
      scrollLeft: element.scrollLeft,
      scrollTop: element.scrollTop
    };
  }
  return {
    scrollLeft: element.scrollX,
    scrollTop: element.scrollY
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return (node.ownerDocument || node).body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow2(scrollableAncestor);
  if (isBody) {
    const frameElement = getFrameElement(win);
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
  } else {
    return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
  }
}
function getFrameElement(win) {
  return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
}

// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element) {
  const css = getComputedStyle2(element);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element);
  const offsetWidth = hasOffset ? element.offsetWidth : width;
  const offsetHeight = hasOffset ? element.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element) {
  return !isElement(element) ? element.contextElement : element;
}
function getScale(element) {
  const domElement = unwrapElement(element);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $: $4
  } = getCssDimensions(domElement);
  let x3 = ($4 ? round(rect.width) : rect.width) / width;
  let y3 = ($4 ? round(rect.height) : rect.height) / height;
  if (!x3 || !Number.isFinite(x3)) {
    x3 = 1;
  }
  if (!y3 || !Number.isFinite(y3)) {
    y3 = 1;
  }
  return {
    x: x3,
    y: y3
  };
}
var noOffsets = /* @__PURE__ */ createCoords(0);
function getVisualOffsets(element) {
  const win = getWindow2(element);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  return !!floatingOffsetParent && isFixed && floatingOffsetParent === getWindow2(element);
}
function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element.getBoundingClientRect();
  const domElement = unwrapElement(element);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x3 = (clientRect.left + visualOffsets.x) / scale.x;
  let y3 = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement && offsetParent) {
    const win = getWindow2(domElement);
    const offsetWin = isElement(offsetParent) ? getWindow2(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = getFrameElement(currentWin);
    while (currentIFrame && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle2(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x3 *= iframeScale.x;
      y3 *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x3 += left;
      y3 += top;
      currentWin = getWindow2(currentIFrame);
      currentIFrame = getFrameElement(currentWin);
    }
  }
  return rectToClientRect({
    width,
    height,
    x: x3,
    y: y3
  });
}
function getWindowScrollBarX(element, rect) {
  const leftScroll = getNodeScroll(element).scrollLeft;
  if (!rect) {
    return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
  }
  return rect.left + leftScroll;
}
function getHTMLOffset(documentElement, scroll) {
  const htmlRect = documentElement.getBoundingClientRect();
  const x3 = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
  const y3 = htmlRect.top + scroll.scrollTop;
  return {
    x: x3,
    y: y3
  };
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
  };
}
function getClientRects(element) {
  return element.getClientRects ? Array.from(element.getClientRects()) : [];
}
function getDocumentRect(html) {
  const scroll = getNodeScroll(html);
  const body = html.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
  let x3 = -scroll.scrollLeft + getWindowScrollBarX(html);
  const y3 = -scroll.scrollTop;
  if (getComputedStyle2(body).direction === "rtl") {
    x3 += max(html.clientWidth, body.clientWidth) - width;
  }
  return {
    width,
    height,
    x: x3,
    y: y3
  };
}
var SCROLLBAR_MAX = 25;
function getViewportRect(element, strategy, rootBoundary) {
  if (rootBoundary === void 0) {
    rootBoundary = "viewport";
  }
  const isLayoutViewport = rootBoundary === "layoutViewport";
  const win = getWindow2(element);
  const html = getDocumentElement(element);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x3 = 0;
  let y3 = 0;
  if (visualViewport) {
    const layoutRelativeClientCoords = !isWebKit() || strategy === "fixed";
    if (isLayoutViewport) {
      if (!layoutRelativeClientCoords) {
        x3 = -visualViewport.offsetLeft;
        y3 = -visualViewport.offsetTop;
      }
    } else {
      width = visualViewport.width;
      height = visualViewport.height;
      if (layoutRelativeClientCoords) {
        x3 = visualViewport.offsetLeft;
        y3 = visualViewport.offsetTop;
      }
    }
  }
  const windowScrollbarX = getWindowScrollBarX(html);
  if (windowScrollbarX <= 0) {
    const doc = html.ownerDocument;
    const body = doc.body;
    const bodyStyles = getComputedStyle(body);
    const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
    const reservedWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
    const gutter = getComputedStyle(html).scrollbarGutter === "stable both-edges" ? reservedWidth / 2 : reservedWidth;
    if (gutter <= SCROLLBAR_MAX) {
      width -= gutter;
    }
  }
  return {
    width,
    height,
    x: x3,
    y: y3
  };
}
function getInnerBoundingClientRect(element, strategy) {
  const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
  const top = clientRect.top + element.clientTop;
  const left = clientRect.left + element.clientLeft;
  const scale = getScale(element);
  const width = element.clientWidth * scale.x;
  const height = element.clientHeight * scale.y;
  const x3 = left * scale.x;
  const y3 = top * scale.y;
  return {
    width,
    height,
    x: x3,
    y: y3
  };
}
function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport" || clippingAncestor === "layoutViewport") {
    rect = getViewportRect(element, strategy, clippingAncestor);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element);
    rect = {
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y,
      width: clippingAncestor.width,
      height: clippingAncestor.height
    };
  }
  return rectToClientRect(rect);
}
function getClippingElementAncestors(element, cache) {
  const cachedResult = cache.get(element);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let lastKeptComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element) : element;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    const lastPosition = lastKeptComputedStyle ? lastKeptComputedStyle.position : elementIsFixed ? "fixed" : "";
    const shouldDropCurrentNode = !currentNodeIsContaining && (lastPosition === "fixed" || lastPosition === "absolute" && computedStyle.position === "static");
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      lastKeptComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
  let top = firstRect.top;
  let right = firstRect.right;
  let bottom = firstRect.bottom;
  let left = firstRect.left;
  for (let i8 = 1; i8 < clippingAncestors.length; i8++) {
    const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i8], strategy);
    top = max(rect.top, top);
    right = min(rect.right, right);
    bottom = min(rect.bottom, bottom);
    left = max(rect.left, left);
  }
  return {
    width: right - left,
    height: bottom - top,
    x: left,
    y: top
  };
}
function getDimensions(element) {
  const {
    width,
    height
  } = getCssDimensions(element);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  if (!isOffsetParentAnElement && documentElement) {
    offsets.x = getWindowScrollBarX(documentElement);
  }
  const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
  const x3 = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
  const y3 = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
  return {
    x: x3,
    y: y3,
    width: rect.width,
    height: rect.height
  };
}
function isStaticPositioned(element) {
  return getComputedStyle2(element).position === "static";
}
function getTrueOffsetParent(element, polyfill) {
  if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element);
  }
  let rawOffsetParent = element.offsetParent;
  if (getDocumentElement(element) === rawOffsetParent) {
    rawOffsetParent = rawOffsetParent.ownerDocument.body;
  }
  return rawOffsetParent;
}
function getOffsetParent(element, polyfill) {
  const win = getWindow2(element);
  if (isTopLayer(element)) {
    return win;
  }
  if (!isHTMLElement(element)) {
    let svgOffsetParent = getParentNode(element);
    while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
      if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
        return svgOffsetParent;
      }
      svgOffsetParent = getParentNode(svgOffsetParent);
    }
    return win;
  }
  let offsetParent = getTrueOffsetParent(element, polyfill);
  while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
    return win;
  }
  return offsetParent || getContainingBlock(element) || win;
}
var getElementRects = async function(data) {
  const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
  const getDimensionsFn = this.getDimensions;
  const floatingDimensions = await getDimensionsFn(data.floating);
  return {
    reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
    floating: {
      x: 0,
      y: 0,
      width: floatingDimensions.width,
      height: floatingDimensions.height
    }
  };
};
function isRTL(element) {
  return getComputedStyle2(element).direction === "rtl";
}
var platform = {
  convertOffsetParentRelativeRectToViewportRelativeRect,
  getDocumentElement,
  getClippingRect,
  getOffsetParent,
  getElementRects,
  getClientRects,
  getDimensions,
  getScale,
  isElement,
  isRTL
};
function rectsAreEqual(a3, b4) {
  return a3.x === b4.x && a3.y === b4.y && a3.width === b4.width && a3.height === b4.height;
}
function observeMove(element, onMove, ancestorResize) {
  let io = null;
  let timeoutId;
  const root = getDocumentElement(element);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const elementRectForRootMargin = element.getBoundingClientRect();
    const {
      left,
      top,
      width,
      height
    } = elementRectForRootMargin;
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root.clientWidth - (left + width));
    const insetBottom = floor(root.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (!rectsAreEqual(elementRectForRootMargin, element.getBoundingClientRect())) {
        return refresh();
      }
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 1e3);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options,
        // Handle <iframe>s
        root: root.ownerDocument
      });
    } catch (_e) {
      io = new IntersectionObserver(handleObserve, options);
    }
    io.observe(element);
  }
  const win = getWindow2(element);
  const handleResize = () => refresh(ancestorResize);
  win.addEventListener("resize", handleResize);
  refresh(true);
  return () => {
    win.removeEventListener("resize", handleResize);
    cleanup();
  };
}
function autoUpdate(reference, floating, update, options) {
  if (options === void 0) {
    options = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...floating ? getOverflowAncestors(floating) : []] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update);
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update, ancestorResize) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver && floating) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    if (floating) {
      resizeObserver.observe(floating);
    }
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && !rectsAreEqual(prevRefRect, nextRefRect)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var offset2 = offset;
var shift2 = shift;
var flip2 = flip;
var arrow2 = arrow;
var computePosition2 = (reference, floating, options) => {
  const cache = /* @__PURE__ */ new Map();
  const mergedOptions = options != null ? options : {};
  const platformWithCache = {
    ...platform,
    ...mergedOptions.platform,
    _c: cache
  };
  return computePosition(reference, floating, {
    ...mergedOptions,
    platform: platformWithCache
  });
};

// node_modules/@vollowx/seele/src/base/positioning.js
function transformOriginFromArrow(placement, arrowData) {
  const { x: arrowX, y: arrowY } = arrowData || {};
  const [side] = placement.split("-");
  let originX = "";
  let originY = "";
  if (side === "top") {
    originX = arrowX != null ? `${arrowX}px` : "center";
    originY = "bottom";
  } else if (side === "bottom") {
    originX = arrowX != null ? `${arrowX}px` : "center";
    originY = "top";
  } else if (side === "left") {
    originX = "right";
    originY = arrowY != null ? `${arrowY}px` : "center";
  } else if (side === "right") {
    originX = "left";
    originY = arrowY != null ? `${arrowY}px` : "center";
  }
  return `${originX} ${originY}`;
}

// node_modules/@vollowx/seele/src/base/tooltip-styles.css.js
var tooltipStyles = i3`:host{box-sizing:border-box;border:none;margin:0;padding:0;position:absolute;inset:auto}:host([force-invisible]){display:none!important}`;

// node_modules/@vollowx/seele/src/base/tooltip.js
var lastHidingTime = 0;
var userSelectHolders = { count: 0, prevUserSelect: "" };
var Base3 = Attachable(InternalsAttached(i4));
var Tooltip = class extends Base3 {
  static {
    this.styles = [tooltipStyles];
  }
  render() {
    return T`<slot></slot>`;
  }
  // Used to manage the delay before showing/hiding the tooltip.
  #openTimer;
  #closeTimer;
  #holdingUserSelect;
  constructor() {
    super();
    this._delays = {
      mouse: { show: 500, hide: 0 },
      focus: { show: 100, hide: 0 },
      touch: { show: 700, hide: 1500 },
      recentlyShowed: 800
    };
    this.align = "top";
    this.offset = 4;
    this.windowPadding = 8;
    this.forceInvisible = false;
    this.open = false;
    this.#openTimer = null;
    this.#closeTimer = null;
    this.#holdingUserSelect = false;
    this.#handleFocusIn = () => {
      if (!focusVisible)
        return;
      this.#scheduleShow(this._delays.focus.show, true);
    };
    this.#handleFocusOut = () => {
      this.#scheduleHide(this._delays.focus.hide);
    };
    this.#handlePointerEnter = (e11) => {
      const evt = e11;
      if (evt.pointerType === "touch")
        return;
      this.#scheduleShow(this._delays.mouse.show, true);
    };
    this.#handlePointerLeave = (e11) => {
      const evt = e11;
      if (evt.pointerType === "touch")
        return;
      this.#scheduleHide(this._delays.mouse.hide);
    };
    this.#handleTouchStart = () => {
      this.#editUserSelect();
      this.#scheduleShow(this._delays.touch.show);
    };
    this.#handleTouchEnd = () => {
      this.#restoreUserSelect();
      this.#scheduleHide(this._delays.touch.hide);
    };
    this.#handleGlobalPointerUp = (event) => {
      const trigger = this.$control;
      const path = event.composedPath();
      if (trigger && path.includes(trigger))
        return;
      if (path.includes(this))
        return;
      this.open = false;
    };
    this.#handleGlobalKeyDown = (event) => {
      if (event.key === "Escape")
        this.open = false;
    };
    this.#dummyArrow = o5 ? null : document.createElement("div");
    this[internals].role = "tooltip";
    if (!this.hasAttribute("popover"))
      this.setAttribute("popover", "manual");
  }
  disconnectedCallback() {
    this._cleanup();
    window.removeEventListener("pointerup", this.#handleGlobalPointerUp);
    window.removeEventListener("keydown", this.#handleGlobalKeyDown);
    this.#restoreUserSelect();
    super.disconnectedCallback();
  }
  updated(changedProperties2) {
    if (!changedProperties2.has("open"))
      return;
    if (this.open)
      this.#show();
    else
      this.#hide();
  }
  [handleControlChange](prev = null, next = null) {
    const eventHandlers = {
      focusin: this.#handleFocusIn,
      focusout: this.#handleFocusOut,
      pointerenter: this.#handlePointerEnter,
      pointerleave: this.#handlePointerLeave,
      touchstart: this.#handleTouchStart,
      touchend: this.#handleTouchEnd
    };
    Object.keys(eventHandlers).forEach((key) => {
      prev?.removeEventListener(key, eventHandlers[key]);
      next?.addEventListener(key, eventHandlers[key]);
    });
    if (prev)
      prev.ariaDescribedByElements = [];
    if (next)
      next.ariaDescribedByElements = [this];
  }
  #handleFocusIn;
  #handleFocusOut;
  #handlePointerEnter;
  #handlePointerLeave;
  #handleTouchStart;
  #handleTouchEnd;
  #handleGlobalPointerUp;
  #handleGlobalKeyDown;
  #scheduleShow(delay, allowInstantShow = false) {
    clearTimeout(this.#closeTimer);
    this.#openTimer = setTimeout(() => {
      this.open = true;
    }, allowInstantShow && Date.now() - lastHidingTime < this._delays.recentlyShowed ? 0 : delay);
  }
  #scheduleHide(delay) {
    if (this.open) {
      lastHidingTime = Date.now();
    }
    clearTimeout(this.#openTimer);
    this.#closeTimer = setTimeout(() => {
      this.open = false;
    }, delay);
  }
  async #show() {
    setTimeout(() => {
      if (this.open)
        window.addEventListener("pointerup", this.#handleGlobalPointerUp);
    }, 0);
    window.addEventListener("keydown", this.#handleGlobalKeyDown);
    const trigger = this.$control;
    if (this.isConnected && !this.matches(":popover-open"))
      this.showPopover({ source: trigger ?? void 0 });
    if (trigger) {
      this._cleanup();
      this.#cleanupAutoUpdate = autoUpdate(trigger, this, () => this.reposition());
      await this.reposition();
    }
  }
  #hide() {
    window.removeEventListener("pointerup", this.#handleGlobalPointerUp);
    window.removeEventListener("keydown", this.#handleGlobalKeyDown);
    this._cleanup();
    this.#restoreUserSelect();
    if (this.matches(":popover-open"))
      this.hidePopover();
  }
  #editUserSelect() {
    if (!userSelectHolders.count) {
      userSelectHolders.prevUserSelect = document.body.style.webkitUserSelect;
      document.body.style.webkitUserSelect = "none";
    }
    ++userSelectHolders.count;
    this.#holdingUserSelect = true;
  }
  #restoreUserSelect() {
    if (!this.#holdingUserSelect)
      return;
    this.#holdingUserSelect = false;
    userSelectHolders.count = Math.max(0, userSelectHolders.count - 1);
    if (!userSelectHolders.count)
      document.body.style.webkitUserSelect = userSelectHolders.prevUserSelect;
  }
  #cleanupAutoUpdate;
  #dummyArrow;
  async reposition() {
    const trigger = this.$control;
    if (!trigger)
      return Promise.resolve();
    return computePosition2(trigger, this, {
      placement: this.align,
      strategy: "absolute",
      middleware: [
        offset2(this.offset),
        flip2({ padding: this.windowPadding }),
        shift2({ padding: this.windowPadding, crossAxis: true }),
        arrow2({ element: this.#dummyArrow })
      ]
    }).then(({ x: x3, y: y3, placement, middlewareData }) => {
      Object.assign(this.style, {
        left: `${x3}px`,
        top: `${y3}px`,
        transformOrigin: transformOriginFromArrow(placement, middlewareData.arrow)
      });
    });
  }
  _cleanup() {
    this.#cleanupAutoUpdate?.();
    this.#cleanupAutoUpdate = void 0;
  }
};
__decorate([
  n6({ reflect: true })
], Tooltip.prototype, "align", void 0);
__decorate([
  n6({ type: Number })
], Tooltip.prototype, "offset", void 0);
__decorate([
  n6({ type: Number, attribute: "window-padding" })
], Tooltip.prototype, "windowPadding", void 0);
__decorate([
  n6({ type: Boolean, reflect: true, attribute: "force-invisible" })
], Tooltip.prototype, "forceInvisible", void 0);
__decorate([
  n6({ type: Boolean, reflect: true })
], Tooltip.prototype, "open", void 0);

// node_modules/@vollowx/seele/src/m3/tooltip/tooltip-styles.css.js
var tooltipStyles2 = i3`:host{background-color:var(--md-sys-color-inverse-surface);color:#0000;font:var(--md-sys-typography-body-small);max-width:var(--_max-width,300px);opacity:0;width:max-content;min-height:24px;transition:color linear 67ms, opacity var(--md-sys-motion-effects-fast-duration) var(--md-sys-motion-effects-fast), transform var(--md-sys-motion-spatial-fast-duration) var(--md-sys-motion-spatial-fast), display var(--md-sys-motion-spatial-fast-duration) allow-discrete, overlay var(--md-sys-motion-spatial-fast-duration) allow-discrete;border-radius:4px;align-items:center;padding:4px 8px;display:flex;top:0;left:0;transform:scaleY(.5)}:host(:popover-open){color:var(--md-sys-color-inverse-on-surface);opacity:1;transition:color 67ms linear 67ms, opacity var(--md-sys-motion-effects-fast-duration) var(--md-sys-motion-effects-fast), transform var(--md-sys-motion-spatial-fast-duration) var(--md-sys-motion-spatial-fast);transform:scaleY(1)}@starting-style{:host(:popover-open){color:#0000;opacity:0;transform:scaleY(.5)}}`;

// node_modules/@vollowx/seele/src/m3/tooltip/tooltip.js
var M3Tooltip = class M3Tooltip2 extends Tooltip {
  static {
    this.styles = [...super.styles, tooltipStyles2];
  }
};
M3Tooltip = __decorate([
  wrappedCustomElement("md-tooltip", true)
], M3Tooltip);

// src/components/stopwatch-view.ts
var _onChange3;
var StopwatchView = class extends i4 {
  constructor() {
    super(...arguments);
    __privateAdd(this, _onChange3, () => this.requestUpdate());
  }
  render() {
    const running = stopwatchStore.isRunning;
    const laps = stopwatchStore.lapList;
    return T`
      <div class="stopwatch">
        <div class="display">${formatStopwatch(stopwatchStore.elapsed)}</div>

        <md-button-group class="controls">
          <md-icon-button
            id="lap"
            variant="tonal"
            size="l"
            width="narrow"
            ?disabled=${!running}
            @click=${() => stopwatchStore.lap()}
          >
            <iconify-icon icon="material-symbols:flag"></iconify-icon>
          </md-icon-button>

          <md-icon-button-toggle
            id="start-pause"
            variant="filled"
            size="l"
            width="wide"
            .checked=${!running}
            aria-label="Start or pause"
            @change=${() => stopwatchStore.toggle()}
          >
            <iconify-icon
              slot="checked"
              icon="material-symbols:play-arrow"
            ></iconify-icon>
            <iconify-icon icon="material-symbols:pause"></iconify-icon>
          </md-icon-button-toggle>

          <md-icon-button
            id="reset"
            variant="outlined"
            size="l"
            ?disabled=${!stopwatchStore.elapsed}
            @click=${() => stopwatchStore.reset()}
          >
            <iconify-icon icon="material-symbols:restart-alt"></iconify-icon>
          </md-icon-button>
        </md-button-group>

        <md-tooltip align="bottom" for="lap">Lap</md-tooltip>
        <md-tooltip align="bottom" for="start-pause">
          ${running ? "Pause" : stopwatchStore.elapsed ? "Resume" : "Start"}
        </md-tooltip>
        <md-tooltip align="bottom" for="reset">Reset</md-tooltip>
      </div>

      ${laps.length > 0 ? T`
            <md-list class="laps">
              ${laps.map(
      (lap) => T`
                  <md-list-item>
                    <span slot="overline">Lap ${lap.n}</span>
                    <span slot="supporting-text">
                      Total ${formatDuration(lap.total)}
                    </span>
                    <span class="split" slot="end"
                      >${formatStopwatch(lap.split)}</span
                    >
                  </md-list-item>
                `
    )}
            </md-list>
          ` : T`<p class="empty">Laps will appear here.</p>`}
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    stopwatchStore.addEventListener("change", __privateGet(this, _onChange3));
  }
  disconnectedCallback() {
    stopwatchStore.removeEventListener("change", __privateGet(this, _onChange3));
    super.disconnectedCallback();
  }
};
_onChange3 = new WeakMap();
StopwatchView.styles = i3`
    :host {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      gap: 16px;
    }

    .stopwatch {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 320px;
    }

    .display {
      font: var(--md-sys-typography-display-large);
      font-variant-numeric: tabular-nums;
      letter-spacing: 0.02em;
      padding-block-end: 24px;
    }

    .controls {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 12px;
      margin-bottom: 24px;
    }

    .laps,
    .empty {
      width: 360px;
      height: 320px;
      overflow: auto;
    }

    .laps md-list-item {
      --md-list-item-label-text-color: var(--md-sys-color-on-surface);
    }

    .split {
      font-variant-numeric: tabular-nums;
      font-weight: 500;
    }

    .empty {
      color: var(--md-sys-color-on-surface-variant);
      font: var(--md-sys-typography-body-large);
    }
  `;
StopwatchView = __decorateClass([
  wrappedCustomElement("stopwatch-view")
], StopwatchView);

// src/components/giant-time.ts
var FIT_PADDING = 32;
var _ro2, _ready, _GiantTime_instances, fit_fn;
var GiantTime = class extends i4 {
  constructor() {
    super();
    __privateAdd(this, _GiantTime_instances);
    __privateAdd(this, _ro2);
    __privateAdd(this, _ready, false);
    this.value = "";
    this.ampm = "";
    this.rotation = 15;
    this.fontSize = 200;
  }
  render() {
    return T`
      <div
        class="clock${__privateGet(this, _ready) ? " ready" : ""}"
        style="transform:rotate(-${this.rotation}deg)"
      >
        <div class="row" style="font-size:${this.fontSize}px">
          <span class="time">${this.value}</span>
          ${this.ampm ? T`<span class="ampm">${this.ampm}</span>` : A2}
        </div>
      </div>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    __privateSet(this, _ro2, new ResizeObserver(() => __privateMethod(this, _GiantTime_instances, fit_fn).call(this)));
    __privateGet(this, _ro2).observe(this);
  }
  disconnectedCallback() {
    __privateGet(this, _ro2)?.disconnect();
    super.disconnectedCallback();
  }
  updated() {
    this.updateComplete.then(() => __privateMethod(this, _GiantTime_instances, fit_fn).call(this));
  }
};
_ro2 = new WeakMap();
_ready = new WeakMap();
_GiantTime_instances = new WeakSet();
fit_fn = function() {
  const clock = this.shadowRoot?.querySelector(
    ".clock"
  );
  const time = this.shadowRoot?.querySelector(".time");
  if (!clock || !time) return;
  const w2 = clock.offsetWidth;
  const h6 = clock.offsetHeight;
  const current = parseFloat(getComputedStyle(time).fontSize);
  if (w2 <= 0 || h6 <= 0 || !Number.isFinite(current) || current <= 0) return;
  const cw = this.clientWidth - FIT_PADDING * 2;
  const ch = this.clientHeight - FIT_PADDING * 2;
  if (cw <= 0 || ch <= 0) return;
  const rad = this.rotation * Math.PI / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const sW = cw / (w2 * cos + h6 * sin);
  const sH = ch / (w2 * sin + h6 * cos);
  const s8 = Math.min(sW, sH);
  if (s8 <= 0) return;
  const next = Math.round(current * s8 * 10) / 10;
  if (Math.abs(next - this.fontSize) > 1) {
    this.fontSize = next;
  }
  if (!__privateGet(this, _ready)) {
    __privateSet(this, _ready, true);
    this.requestUpdate();
  }
};
GiantTime.styles = i3`
    :host {
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .clock {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      flex-shrink: 0;
      font-weight: 700;
      font-variation-settings:
        "slnt" 0,
        "wdth" 100,
        "GRAD" 0,
        "ROND" 100;
      opacity: 0;
      transition: opacity var(--md-sys-motion-effects-default-duration)
        var(--md-sys-motion-effects-default);
    }

    .clock.ready {
      opacity: 1;
    }

    .row {
      display: flex;
      align-items: baseline;
    }

    .time {
      font-family: var(--md-ref-typeface-brand);
      font-variant-numeric: tabular-nums;
      line-height: 1;
      white-space: nowrap;
    }

    .ampm {
      font-size: 0.16em;
      letter-spacing: 0.02em;
      line-height: 1;
      margin-inline-start: 8px;
    }
  `;
GiantTime.properties = {
  value: { type: String },
  ampm: { type: String },
  rotation: { type: Number },
  fontSize: { type: Number, state: true }
};
GiantTime = __decorateClass([
  wrappedCustomElement("giant-time")
], GiantTime);

// src/components/timer-view.ts
var _onChange4, _onAddClick;
var TimerView = class extends i4 {
  constructor() {
    super(...arguments);
    __privateAdd(this, _onChange4, () => this.requestUpdate());
    __privateAdd(this, _onAddClick, () => {
      this.dispatchEvent(
        new Event("request-open-timer-dialog", { bubbles: true, composed: true })
      );
    });
  }
  render() {
    return T`
      <div class="timer-page">
        ${timerStore.list.length === 0 ? T`<p class="empty">
              No any timer.<br />
              Add one from the top-left button.
            </p>` : timerStore.list.map((t7) => this.renderTimer(t7))}
      </div>
    `;
  }
  renderTimer(t7) {
    const toggleLabel = t7.done ? "Restart" : t7.running ? "Pause" : "Resume";
    const displayValue = t7.done ? "done" : formatCountdown(t7.remainingMs);
    return T`
      <article class="card">
        <div class="display">
          <giant-time value=${displayValue} rotation="15"></giant-time>
        </div>

        <div class="controls">
          <div class="left">
            <span class="label">${formatDurationLabel(t7.durationMs)}</span>
            <div class="left-buttons">
              <md-button
                size="m"
                variant="filled"
                @click=${() => timerStore.addMinute(t7.id)}
              >
                +1:00
              </md-button>

              <md-icon-button
                id="timer-delete-${t7.id}"
                variant="filled"
                size="m"
                width="wide"
                aria-label="Delete"
                @click=${() => timerStore.removeTimer(t7.id)}
              >
                <iconify-icon icon="material-symbols:delete"></iconify-icon>
              </md-icon-button>
              <md-tooltip for="timer-delete-${t7.id}">Delete</md-tooltip>
            </div>
          </div>

          <div class="right">
            <md-icon-button-toggle
              id="timer-toggle-${t7.id}"
              variant="tonal"
              size="xl"
              .checked=${!t7.running}
              aria-label=${toggleLabel}
              @change=${(e11) => timerStore.toggleTimer(t7.id, !e11.detail)}
            >
              <iconify-icon icon="material-symbols:pause"></iconify-icon>
              <iconify-icon
                slot="checked"
                icon=${t7.done ? "material-symbols:restart-alt" : "material-symbols:play-arrow"}
              ></iconify-icon>
            </md-icon-button-toggle>
            <md-tooltip for="timer-toggle-${t7.id}">${toggleLabel}</md-tooltip>

            <md-icon-button
              id="timer-add-${t7.id}"
              variant="tonal"
              size="xl"
              width="wide"
              aria-label="Add timer"
              @click=${__privateGet(this, _onAddClick)}
            >
              <iconify-icon icon="material-symbols:add"></iconify-icon>
            </md-icon-button>
            <md-tooltip for="timer-add-${t7.id}">Add timer</md-tooltip>
          </div>
        </div>
      </article>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    timerStore.addEventListener("change", __privateGet(this, _onChange4));
  }
  disconnectedCallback() {
    timerStore.removeEventListener("change", __privateGet(this, _onChange4));
    super.disconnectedCallback();
  }
};
_onChange4 = new WeakMap();
_onAddClick = new WeakMap();
TimerView.styles = i3`
    :host {
      display: block;
      flex: 1;
      min-width: 0;
      min-height: 0;
      overflow-y: auto;
      scroll-snap-type: y mandatory;
      box-sizing: border-box;
    }

    .timer-page {
      display: flex;
      flex-direction: column;
      gap: 32px;
      height: 100%;
    }

    .card {
      position: relative;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      padding: 48px;
      background-color: var(--md-sys-color-primary-container);
      color: var(--md-sys-color-on-primary-container);
      border-radius: 28px;
      min-height: 100%;
      scroll-snap-align: start;
    }

    .display {
      position: absolute;
      inset: -48px -48px 72px;
    }

    .display giant-time {
      width: 100%;
      height: 100%;
    }

    .controls {
      display: grid;
      grid-template-columns: 1fr auto;
      align-items: end;
      gap: 16px;
      margin-top: auto;
      position: relative;
      z-index: 1;
    }

    .left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
    }

    .label {
      font: var(--md-sys-typography-display-small);
    }

    .left-buttons {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .right {
      display: flex;
      align-items: flex-end;
      gap: 8px;
    }

    .empty {
      margin: auto;
      color: var(--md-sys-color-on-surface-variant);
      font: var(--md-sys-typography-body-medium);
    }
  `;
TimerView = __decorateClass([
  wrappedCustomElement("timer-view")
], TimerView);

// node_modules/@vollowx/seele/src/base/toggle-button.js
var ToggleButton = class extends ButtonToggleMixin(Button) {
};

// node_modules/@vollowx/seele/src/m3/switch/switch-styles.css.js
var switchStyles = i3`:host{--_outline-color:var(--md-sys-color-outline);--_track-color:var(--md-sys-color-surface-container-highest);--_thumb-color:var(--md-sys-color-outline);--_icon-color:var(--md-sys-color-surface-container-highest);--_ripple-color:var(--md-sys-color-on-surface);background-color:color-mix(in srgb, var(--_track-color) var(--_track-opacity,100%), transparent);border-color:color-mix(in srgb, var(--_outline-color) var(--_outline-opacity,100%), transparent);box-sizing:border-box;cursor:pointer;isolation:isolate;-webkit-tap-highlight-color:transparent;touch-action:none;height:32px;transition:background-color var(--md-sys-motion-effects-fast-duration) var(--md-sys-motion-effects-fast), border-color var(--md-sys-motion-effects-fast-duration) var(--md-sys-motion-effects-fast);-webkit-user-select:none;user-select:none;vertical-align:top;border-style:solid;border-width:2px;border-radius:9999px;outline:0;place-content:center;place-items:center;width:52px;display:inline-grid;position:relative}:host(:state(checked)){--_outline-color:var(--md-sys-color-primary);--_track-color:var(--md-sys-color-primary);--_thumb-color:var(--md-sys-color-on-primary);--_icon-color:var(--md-sys-color-on-primary-container);--_ripple-color:var(--md-sys-color-primary)}:host(:disabled){--_outline-color:var(--md-sys-color-on-surface);--_outline-opacity:12%;--_track-color:var(--md-sys-color-surface-variant);--_track-opacity:12%;--_thumb-color:var(--md-sys-color-on-surface);--_thumb-opacity:38%;--_icon-color:var(--md-sys-color-surface-container-highest);cursor:default;pointer-events:none}:host(:disabled:state(checked)){--_outline-color:var(--md-sys-color-surface);--_track-color:var(--md-sys-color-on-surface);--_thumb-color:var(--md-sys-color-surface);--_thumb-opacity:100%;--_icon-color:var(--md-sys-color-on-surface)}:host([icons]:not(:state(checked)):not([checked-icon-only])) [part~=icon-off],:host([icons]:state(checked)) [part~=icon-on]{--_icon-opacity:100%}:host([icons]:state(checked):disabled) [part~=icon-on]{--_icon-opacity:38%}@media (hover:hover) and (pointer:fine){:host(:hover){--_thumb-color:var(--md-sys-color-on-surface-variant)}:host(:state(checked):hover){--_thumb-color:var(--md-sys-color-primary-container)}}@media (forced-colors:active){:host{forced-color-adjust:none}}[part~=thumb]{--_thumb-diameter:16px;--_thumb-diff-default:20px;background-color:color-mix(in srgb, var(--_thumb-color) var(--_thumb-opacity,100%), transparent);height:var(--_thumb-diameter);transition:background-color var(--md-sys-motion-effects-fast-duration) var(--md-sys-motion-effects-fast), width var(--md-sys-motion-spatial-fast-duration) var(--md-sys-motion-spatial-fast), height var(--md-sys-motion-spatial-fast-duration) var(--md-sys-motion-spatial-fast), margin var(--md-sys-motion-spatial-fast-duration) var(--md-sys-motion-spatial-fast);width:var(--_thumb-diameter);z-index:1;border-radius:50%;place-content:center;place-items:center;margin-inline-start:calc(var(--_thumb-diff-pointer,0px) - var(--_thumb-diff-default));display:grid;position:absolute}:host(:state(checked)) [part~=thumb]{--_thumb-diameter:24px;--_thumb-diff-default:-20px;background-color:var(--_thumb-color)}:host([icons]:not([checked-icon-only])) [part~=thumb]{--_thumb-diameter:24px}:host(:active) [part~=thumb]{--_thumb-color:var(--md-sys-color-on-surface-variant);--_thumb-diameter:28px!important}:host(:state(checked):active) [part~=thumb]{--_thumb-color:var(--md-sys-color-primary-container)}[part~=icons]{fill:color-mix(in srgb, var(--_icon-color) var(--_icon-opacity,0%), transparent);width:16px;height:16px;transition:fill 67ms linear;position:absolute}md-focus-ring{inset:-4px}md-ripple{color:var(--_ripple-color);height:40px;inset:unset;width:40px}@media (forced-colors:active){:host{--md-sys-color-primary:SelectedItem;--md-sys-color-primary-container:SelectedItemText;--md-sys-color-on-primary:SelectedItemText}}`;

// node_modules/@vollowx/seele/src/m3/switch/switch.js
function isRTL2() {
  return document.documentElement.dir === "rtl";
}
var M3Switch = class M3Switch2 extends ToggleButton {
  constructor() {
    super(...arguments);
    this.icons = false;
    this.checkedIconOnly = false;
    this.#pointerDownX = 0;
    this.#handlePointerDown = (e11) => {
      this._ignoreClick = false;
      if (e11.button !== 0)
        return;
      this.#pointerDownX = e11.clientX;
      this.setPointerCapture(e11.pointerId);
      this.addEventListener("pointermove", this.#handlePointerMove);
    };
    this.#handlePointerMove = (e11) => {
      const diff = (isRTL2() ? -1 : 1) * (e11.clientX - this.#pointerDownX);
      this._ignoreClick = true;
      const limitedDiff = this.checked ? Math.min(0, Math.max(-20, diff)) : Math.min(20, Math.max(0, diff));
      this.$thumb.style.setProperty("--_thumb-diff-pointer", `${2 * limitedDiff}px`);
      this.$thumb.style.setProperty("--_thumb-diameter", "28px");
      this.$thumb.style.transitionDuration = "0s";
    };
    this.#handlePointerUp = (e11) => {
      this.removeEventListener("pointermove", this.#handlePointerMove);
      this.releasePointerCapture(e11.pointerId);
      const trackRect = this.getBoundingClientRect();
      const thumbRect = this.$thumb.getBoundingClientRect();
      const diff = thumbRect.left + thumbRect.width / 2 - trackRect.left - trackRect.width / 2;
      const shouldBeChecked = diff >= 0 && !isRTL2() || diff < 0 && isRTL2();
      this.$thumb.style.setProperty("--_thumb-diff-pointer", "");
      this.$thumb.style.setProperty("--_thumb-diameter", "");
      this.$thumb.style.transitionDuration = "";
      if (this.checked != shouldBeChecked)
        this._toggle();
    };
  }
  static {
    this.styles = [targetStyles, switchStyles];
  }
  render() {
    return T`<md-focus-ring></md-focus-ring><div part="thumb"><md-ripple></md-ripple><span part="target"></span> ${this.renderOffIcon()}${this.renderOnIcon()}</div>`;
  }
  renderOnIcon() {
    return T`<svg part="icons icon-on" viewBox="0 0 24 24" aria-hidden="true"><path d="M9.55 18.2 3.65 12.3 5.275 10.675 9.55 14.95 18.725 5.775 20.35 7.4Z"/></svg>`;
  }
  renderOffIcon() {
    return T`<svg part="icons icon-off" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.4 19.2 4.8 17.6 10.4 12 4.8 6.4 6.4 4.8 12 10.4 17.6 4.8 19.2 6.4 13.6 12 19.2 17.6 17.6 19.2 12 13.6Z"/></svg>`;
  }
  connectedCallback() {
    super.connectedCallback();
    this.addEventListener("pointerdown", this.#handlePointerDown);
    this.addEventListener("pointerup", this.#handlePointerUp);
  }
  disconnectedCallback() {
    this.removeEventListener("pointerdown", this.#handlePointerDown);
    this.removeEventListener("pointerup", this.#handlePointerUp);
    super.disconnectedCallback();
  }
  firstUpdated() {
    this.$ripple.attach(this, true);
  }
  #pointerDownX;
  #handlePointerDown;
  #handlePointerMove;
  #handlePointerUp;
};
__decorate([
  n6({ type: Boolean, reflect: true })
], M3Switch.prototype, "icons", void 0);
__decorate([
  n6({ type: Boolean, reflect: true, attribute: "checked-icon-only" })
], M3Switch.prototype, "checkedIconOnly", void 0);
__decorate([
  e9("md-ripple")
], M3Switch.prototype, "$ripple", void 0);
__decorate([
  e9('[part~="thumb"]')
], M3Switch.prototype, "$thumb", void 0);
M3Switch = __decorate([
  t6("md-switch")
], M3Switch);

// node_modules/@vollowx/seele/src/base/radio.js
var _a4;
var Radio = class extends FormAssociated(InternalsAttached(i4)) {
  // Static hidden registry: Scope (Form or RootNode) -> Name -> Set<Radio>
  static #registry = /* @__PURE__ */ new Map();
  #currentScope;
  #currentName;
  constructor() {
    super();
    this.#currentScope = null;
    this.#currentName = "";
    this.checked = false;
    this[internals].role = "radio";
    if (!o5) {
      this.addEventListener("click", this.#handleClick);
      this.addEventListener("keydown", this.#handleKeyDown);
    }
  }
  connectedCallback() {
    super.connectedCallback();
    this.#registerToGroup();
    this[updateInternals]();
  }
  disconnectedCallback() {
    this.#unregisterFromGroup();
    super.disconnectedCallback();
  }
  updated(changedProperties2) {
    super.updated(changedProperties2);
    if (changedProperties2.has("name")) {
      this.#unregisterFromGroup();
      this.#registerToGroup();
    }
    if (changedProperties2.has("checked")) {
      if (this.checked) {
        this.#uncheckSiblings();
      }
      this[internals].setFormValue(this.checked ? this.value : null);
      this.#updateGroupTabIndices();
    }
    if (changedProperties2.has("disabled") || changedProperties2.has("checked"))
      this[updateInternals]();
  }
  #handleClick() {
    if (this.disabled || this.checked)
      return;
    this.checked = true;
    this.focus();
    this.#dispatchEvents();
  }
  #handleKeyDown(event) {
    if (this.disabled)
      return;
    switch (event.key) {
      case " ":
        event.preventDefault();
        if (!this.checked) {
          this.checked = true;
          this.#dispatchEvents();
        }
        break;
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        this.#navigateGroup(1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        this.#navigateGroup(-1);
        break;
    }
  }
  #getScope() {
    return this.form ?? this.getRootNode();
  }
  #registerToGroup() {
    if (!this.name)
      return;
    const scope = this.#getScope();
    this.#currentScope = scope;
    this.#currentName = this.name;
    let scopeMap = _a4.#registry.get(scope);
    if (!scopeMap) {
      scopeMap = /* @__PURE__ */ new Map();
      _a4.#registry.set(scope, scopeMap);
    }
    let group = scopeMap.get(this.name);
    if (!group) {
      group = /* @__PURE__ */ new Set();
      scopeMap.set(this.name, group);
    }
    group.add(this);
    this.#updateGroupTabIndices(group);
  }
  #unregisterFromGroup() {
    if (!this.#currentScope || !this.#currentName)
      return;
    const scopeMap = _a4.#registry.get(this.#currentScope);
    if (scopeMap) {
      const group = scopeMap.get(this.#currentName);
      if (group) {
        group.delete(this);
        if (group.size === 0) {
          scopeMap.delete(this.#currentName);
        } else {
          this.#updateGroupTabIndices(group);
        }
      }
      if (scopeMap.size === 0)
        _a4.#registry.delete(this.#currentScope);
    }
    this.#currentScope = null;
    this.#currentName = "";
  }
  #getGroupRadios() {
    if (!this.#currentName || !this.#currentScope)
      return [this];
    return _a4.#registry.get(this.#currentScope)?.get(this.#currentName) ?? [this];
  }
  #uncheckSiblings() {
    const radios = this.#getGroupRadios();
    for (const radio of radios)
      if (radio !== this && radio.checked)
        radio.checked = false;
  }
  #updateGroupTabIndices(groupSet) {
    const radios = groupSet ?? this.#getGroupRadios();
    let hasChecked = false;
    for (const r10 of radios) {
      if (r10.checked && !r10.disabled) {
        hasChecked = true;
        break;
      }
    }
    let enabledFound = false;
    for (const radio of radios) {
      const active = !radio.disabled && (hasChecked ? radio.checked : !enabledFound);
      if (active)
        enabledFound = true;
      radio.tabIndex = active ? 0 : -1;
    }
  }
  #navigateGroup(direction) {
    const radios = Array.from(this.#getGroupRadios()).filter((r10) => !r10.disabled);
    if (radios.length <= 1)
      return;
    const currentIndex = radios.indexOf(this);
    const nextIndex = (currentIndex + direction + radios.length) % radios.length;
    const targetRadio = radios[nextIndex];
    targetRadio.checked = true;
    targetRadio.focus();
  }
  [updateInternals]() {
    this[internals].ariaChecked = String(this.checked);
    this[internals].ariaDisabled = String(this.disabled);
    this[replaceStates](["checked"], [this.checked ? "checked" : null]);
  }
  #dispatchEvents() {
    this.dispatchEvent(new Event("input", { bubbles: true, composed: true }));
    this.dispatchEvent(new Event("change", { bubbles: true, composed: true }));
  }
  formResetCallback() {
    this.checked = this.hasAttribute("checked");
  }
  formStateRestoreCallback(state) {
    this.checked = state === this.value;
  }
};
_a4 = Radio;
__decorate([
  n6({ type: String })
], Radio.prototype, "value", void 0);
__decorate([
  n6({ type: Boolean })
], Radio.prototype, "checked", void 0);

// node_modules/@vollowx/seele/src/m3/radio/radio-styles.css.js
var radioStyles = i3`:host{--_d:var(--md-sys-motion-effects-default-duration);--_default:var(--_d) var(--md-sys-motion-effects-default);--_slow:var(--md-sys-motion-effects-slow-duration) var(--md-sys-motion-effects-slow);cursor:pointer;isolation:isolate;-webkit-tap-highlight-color:transparent;-webkit-user-select:none;user-select:none;border-radius:20px;outline:0;justify-content:center;align-items:center;width:40px;height:40px;display:inline-flex;position:relative}.icon{z-index:1;width:20px;height:20px}.ring{fill:none;r:9px;stroke:var(--md-sys-color-on-surface-variant);stroke-width:2px;transition:stroke var(--_default);will-change:r, stroke-width}:host(:state(checked)) .ring{stroke:var(--md-sys-color-primary)}.dot{fill:var(--md-sys-color-primary);r:0px;will-change:r}:host(:state(checked)) .dot{r:5px}:host(:state(checking)) .ring{animation:check-ring-1 var(--_default), check-ring-2 var(--_slow) var(--_d)}:host(:state(checking)) .dot{animation:check-dot-1 var(--_default), check-dot-2 var(--_slow) var(--_d)}@keyframes check-ring-1{0%{r:9px;stroke-width:2px}to{r:4.5px;stroke-width:9px}}@keyframes check-ring-2{0%{r:8px;stroke-width:2px}to{r:9px;stroke-width:2px}}@keyframes check-dot-1{0%,to{r:0px}}@keyframes check-dot-2{0%{r:7px}to{r:5px}}:host(:state(unchecking)) .ring{animation:uncheck-ring-1 var(--_default), uncheck-ring-2 var(--_slow) var(--_d)}:host(:state(unchecking)) .dot{animation:uncheck-dot-1 var(--_default)}@keyframes uncheck-ring-1{0%{r:9px;stroke:var(--md-sys-color-primary);stroke-width:2px}to{r:8px;stroke:var(--md-sys-color-on-surface-variant);stroke-width:2px}}@keyframes uncheck-ring-2{0%{r:4.5px;stroke-width:9px}to{r:9px;stroke-width:2px}}@keyframes uncheck-dot-1{0%{fill:var(--md-sys-color-primary);r:5px}to{fill:var(--md-sys-color-on-surface-variant);r:7.5px}}:host([disabled]){pointer-events:none}:host([disabled]) .ring{stroke:oklch(from var(--md-sys-color-on-surface) l c h / 38%)}:host([disabled]) .dot{fill:oklch(from var(--md-sys-color-on-surface) l c h / 38%)}@media (forced-colors:active){:host{--md-sys-color-primary:SelectedItem;--md-sys-color-on-surface-variant:CanvasText}:host(:disabled) .ring{stroke:graytext}:host(:disabled) .dot{fill:graytext}}`;

// node_modules/@vollowx/seele/src/m3/radio/radio.js
var M3Radio = class M3Radio2 extends Radio {
  static {
    this.styles = [targetStyles, radioStyles];
  }
  render() {
    return T`<md-focus-ring></md-focus-ring><md-ripple enter-behavior="none"></md-ripple><span part="target"></span> <svg class="icon" viewBox="0 0 20 20" aria-hidden="true"><circle class="ring" cx="10" cy="10" r="9"/><circle class="dot" cx="10" cy="10" r="0"/></svg>`;
  }
  firstUpdated() {
    this.$ripple.attach(this, true);
  }
  updated(changedProperties2) {
    super.updated(changedProperties2);
    if (changedProperties2.has("checked")) {
      const oldValue = changedProperties2.get("checked");
      if (oldValue === void 0)
        return;
      this[internals].states.delete("checking");
      this[internals].states.delete("unchecking");
      this[internals].states.add(this.checked ? "checking" : "unchecking");
    }
  }
};
__decorate([
  e9("md-ripple")
], M3Radio.prototype, "$ripple", void 0);
M3Radio = __decorate([
  wrappedCustomElement("md-radio")
], M3Radio);

// src/components/settings-view.ts
var _onChange5, _SettingsView_instances, on24h_fn, onTheme_fn;
var SettingsView = class extends i4 {
  constructor() {
    super(...arguments);
    __privateAdd(this, _SettingsView_instances);
    __privateAdd(this, _onChange5, () => this.requestUpdate());
  }
  render() {
    return T`
      <section class="settings">
        <h2>Settings</h2>

        <label class="row">
          <span>24-hour clock</span>
          <md-switch
            aria-label="24-hour clock"
            .checked=${settings.use24h}
            @change=${__privateMethod(this, _SettingsView_instances, on24h_fn)}
          ></md-switch>
        </label>

        <div class="row">
          <span>Theme</span>
          <span @change=${__privateMethod(this, _SettingsView_instances, onTheme_fn)}>
            <label>
              <md-radio
                name="theme"
                value="auto"
                ?checked=${settings.theme === "auto"}
              ></md-radio>
              Automatic
            </label>
            <label>
              <md-radio
                name="theme"
                value="light"
                ?checked=${settings.theme === "light"}
              ></md-radio>
              Light
            </label>
            <label>
              <md-radio
                name="theme"
                value="dark"
                ?checked=${settings.theme === "dark"}
              ></md-radio>
              Dark
            </label>
          </span>
        </div>
      </section>
    `;
  }
  connectedCallback() {
    super.connectedCallback();
    settings.addEventListener("change", __privateGet(this, _onChange5));
  }
  disconnectedCallback() {
    settings.removeEventListener("change", __privateGet(this, _onChange5));
    super.disconnectedCallback();
  }
};
_onChange5 = new WeakMap();
_SettingsView_instances = new WeakSet();
on24h_fn = function(e11) {
  settings.setUse24h(e11.detail);
};
onTheme_fn = function(e11) {
  const value = e11.target.value;
  if (value === "auto" || value === "light" || value === "dark") {
    settings.setTheme(value);
  }
};
SettingsView.styles = i3`
    :host {
      display: flex;
      flex: 1;
    }

    .settings {
      display: flex;
      flex: 1;
      flex-direction: column;
      margin: 24px;
    }

    h2 {
      margin: 0;
      margin-block-end: 32px;
      font: var(--md-sys-typography-headline-medium);
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
      min-height: 48px;
      font: var(--md-sys-typography-label-large);
    }

    label {
      -webkit-tap-highlight-color: transparent;
    }

    label:has(md-radio) {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      margin-inline-start: 8px;
    }
  `;
SettingsView = __decorateClass([
  wrappedCustomElement("settings-view")
], SettingsView);

// src/components/timer-dialog.ts
var PRESETS = [
  { label: "1 min", ms: 6e4 },
  { label: "5 min", ms: 5 * 6e4 },
  { label: "10 min", ms: 10 * 6e4 },
  { label: "15 min", ms: 15 * 6e4 },
  { label: "30 min", ms: 30 * 6e4 },
  { label: "1 hour", ms: 60 * 6e4 }
];
var _dialog2, _TimerDialog_instances, field_fn, _cancel2, add_fn, parseDuration_fn, _onStartClick;
var TimerDialog = class extends i4 {
  constructor() {
    super(...arguments);
    __privateAdd(this, _TimerDialog_instances);
    __privateAdd(this, _dialog2, e10());
    __privateAdd(this, _cancel2, () => {
      __privateGet(this, _dialog2).value?.close();
    });
    __privateAdd(this, _onStartClick, () => {
      __privateMethod(this, _TimerDialog_instances, add_fn).call(this, __privateMethod(this, _TimerDialog_instances, parseDuration_fn).call(this));
    });
  }
  render() {
    return T`
      <md-dialog ${n8(__privateGet(this, _dialog2))}>
        <span slot="headline">New timer</span>

        <div class="form">
          <div class="duration">
            <md-outlined-text-field
              id="hours"
              placeholder="hour"
              type="number"
              min="0"
            ></md-outlined-text-field>
            <md-outlined-text-field
              id="minutes"
              placeholder="min"
              type="number"
              min="0"
            ></md-outlined-text-field>
            <md-outlined-text-field
              id="seconds"
              placeholder="sec"
              type="number"
              min="0"
            ></md-outlined-text-field>
          </div>

          <div class="presets">
            ${PRESETS.map(
      (p5) => T`
                <md-button variant="tonal" @click=${() => __privateMethod(this, _TimerDialog_instances, add_fn).call(this, p5.ms)}>
                  ${p5.label}
                </md-button>
              `
    )}
          </div>
        </div>

        <div slot="actions">
          <md-button variant="text" @click=${__privateGet(this, _cancel2)}>Cancel</md-button>
          <md-button variant="text" @click=${__privateGet(this, _onStartClick)}>
            Start
          </md-button>
        </div>
      </md-dialog>
    `;
  }
  async show() {
    await this.updateComplete;
    __privateMethod(this, _TimerDialog_instances, field_fn).call(this, "hours").value = "";
    __privateMethod(this, _TimerDialog_instances, field_fn).call(this, "minutes").value = "";
    __privateMethod(this, _TimerDialog_instances, field_fn).call(this, "seconds").value = "";
    __privateGet(this, _dialog2).value?.show();
  }
};
_dialog2 = new WeakMap();
_TimerDialog_instances = new WeakSet();
field_fn = function(id) {
  return this.shadowRoot.getElementById(id);
};
_cancel2 = new WeakMap();
add_fn = function(ms) {
  timerStore.addTimer(ms, "");
  __privateGet(this, _cancel2).call(this);
  this.dispatchEvent(
    new Event("timer-added", { bubbles: true, composed: true })
  );
};
parseDuration_fn = function() {
  const hours = parseInt(__privateMethod(this, _TimerDialog_instances, field_fn).call(this, "hours").value, 10) || 0;
  const minutes = parseInt(__privateMethod(this, _TimerDialog_instances, field_fn).call(this, "minutes").value, 10) || 0;
  const seconds = parseInt(__privateMethod(this, _TimerDialog_instances, field_fn).call(this, "seconds").value, 10) || 0;
  return Math.max(0, hours) * 36e5 + Math.max(0, minutes) * 6e4 + Math.max(0, seconds) * 1e3;
};
_onStartClick = new WeakMap();
TimerDialog.styles = i3`
    :host {
      z-index: 20;
    }
    md-dialog::part(dialog) {
      width: 320px;
    }

    .form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .duration {
      display: flex;
      gap: 8px;
    }
    .duration md-outlined-text-field {
      min-width: unset;
    }
    .presets {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
  `;
TimerDialog = __decorateClass([
  wrappedCustomElement("timer-dialog", false)
], TimerDialog);

// src/components/app.ts
var NAV_ITEMS = [
  {
    page: "clock",
    label: "Clock",
    icon: "material-symbols:schedule-outline",
    activeIcon: "material-symbols:schedule"
  },
  {
    page: "timer",
    label: "Timer",
    icon: "material-symbols:alarm-outline",
    activeIcon: "material-symbols:alarm"
  },
  {
    page: "stopwatch",
    label: "Stopwatch",
    icon: "material-symbols:timer-outline",
    activeIcon: "material-symbols:timer"
  }
];
var PAGES = {
  timer: () => T`<timer-view></timer-view>`,
  stopwatch: () => T`<stopwatch-view></stopwatch-view>`,
  settings: () => T`<settings-view></settings-view>`
};
var _mq, _onSystemTheme, _onSettingsChange, _onTimerChange, _TimorApp_instances, updateTitle_fn, applyTheme_fn, onNavClick_fn, onFabClick_fn, _onOpenTimerDialog, _onTimerAdded, openTimerDialog_fn, switchPage_fn;
var TimorApp = class extends i4 {
  constructor() {
    super(...arguments);
    __privateAdd(this, _TimorApp_instances);
    this.page = "clock";
    __privateAdd(this, _mq, null);
    __privateAdd(this, _onSystemTheme, () => {
      if (settings.theme === "auto") __privateMethod(this, _TimorApp_instances, applyTheme_fn).call(this);
    });
    __privateAdd(this, _onSettingsChange, () => {
      __privateMethod(this, _TimorApp_instances, applyTheme_fn).call(this);
      this.requestUpdate();
    });
    __privateAdd(this, _onTimerChange, () => __privateMethod(this, _TimorApp_instances, updateTitle_fn).call(this));
    __privateAdd(this, _onOpenTimerDialog, () => {
      __privateMethod(this, _TimorApp_instances, openTimerDialog_fn).call(this);
    });
    __privateAdd(this, _onTimerAdded, () => {
      if (this.page !== "timer") void __privateMethod(this, _TimorApp_instances, switchPage_fn).call(this, "timer");
    });
  }
  render() {
    return T`
      <md-nav-rail @click=${__privateMethod(this, _TimorApp_instances, onNavClick_fn)}>
        <md-fab
          slot="fab"
          aria-label="Add timer"
          color="primary-container"
          @click=${__privateMethod(this, _TimorApp_instances, onFabClick_fn)}
        >
          <iconify-icon icon="material-symbols:add"></iconify-icon>
        </md-fab>

        ${NAV_ITEMS.map(
      (item) => T`
            <md-nav-rail-item
              label=${item.label}
              data-page=${item.page}
              ?active=${this.page === item.page}
            >
              <iconify-icon icon=${item.icon}></iconify-icon>
              <iconify-icon
                slot="active"
                icon=${item.activeIcon}
              ></iconify-icon>
            </md-nav-rail-item>
          `
    )}

        <md-nav-rail-item
          label="Settings"
          data-page="settings"
          ?active=${this.page === "settings"}
          end
        >
          <iconify-icon icon="material-symbols:settings-outline"></iconify-icon>
          <iconify-icon
            slot="active"
            icon="material-symbols:settings"
          ></iconify-icon>
        </md-nav-rail-item>
      </md-nav-rail>

      <main @request-open-timer-dialog=${__privateGet(this, _onOpenTimerDialog)}>
        <div class="page">${this.renderPage(this.page)}</div>
      </main>

      <timer-dialog @timer-added=${__privateGet(this, _onTimerAdded)}></timer-dialog>
    `;
  }
  renderPage(page) {
    return (PAGES[page] ?? (() => T`<clock-view></clock-view>`))();
  }
  connectedCallback() {
    super.connectedCallback();
    __privateSet(this, _mq, window.matchMedia("(prefers-color-scheme: dark)"));
    __privateGet(this, _mq).addEventListener("change", __privateGet(this, _onSystemTheme));
    settings.addEventListener("change", __privateGet(this, _onSettingsChange));
    timerStore.addEventListener("change", __privateGet(this, _onTimerChange));
    __privateMethod(this, _TimorApp_instances, applyTheme_fn).call(this);
    timeSync.start();
    __privateMethod(this, _TimorApp_instances, updateTitle_fn).call(this);
  }
  disconnectedCallback() {
    __privateGet(this, _mq)?.removeEventListener("change", __privateGet(this, _onSystemTheme));
    settings.removeEventListener("change", __privateGet(this, _onSettingsChange));
    timerStore.removeEventListener("change", __privateGet(this, _onTimerChange));
    timeSync.stop();
    super.disconnectedCallback();
  }
};
_mq = new WeakMap();
_onSystemTheme = new WeakMap();
_onSettingsChange = new WeakMap();
_onTimerChange = new WeakMap();
_TimorApp_instances = new WeakSet();
updateTitle_fn = function() {
  const suffix = timerStore.titleSuffix;
  document.title = suffix ? `${suffix} - Timor` : "Timor";
};
applyTheme_fn = function() {
  const isDark = settings.theme === "auto" ? __privateGet(this, _mq)?.matches ?? false : settings.theme === "dark";
  document.documentElement.dataset.mdColorScheme = isDark ? "dark" : "light";
  const meta = document.querySelector('meta[name="theme-color"]');
  meta?.setAttribute("content", isDark ? "#11140e" : "#f8faf0");
};
onNavClick_fn = function(e11) {
  const item = e11.target.closest(
    "md-nav-rail-item"
  );
  const page = item?.dataset.page;
  if (page) void __privateMethod(this, _TimorApp_instances, switchPage_fn).call(this, page);
};
onFabClick_fn = function() {
  __privateMethod(this, _TimorApp_instances, openTimerDialog_fn).call(this);
};
_onOpenTimerDialog = new WeakMap();
_onTimerAdded = new WeakMap();
openTimerDialog_fn = function() {
  const dialog = this.shadowRoot?.querySelector(
    "timer-dialog"
  );
  dialog?.show();
};
switchPage_fn = async function(page) {
  if (page === this.page) return;
  const el = this.shadowRoot?.querySelector(".page");
  if (!el?.startViewTransition) {
    this.page = page;
    return;
  }
  try {
    const t7 = el.startViewTransition(async () => {
      this.page = page;
      await this.updateComplete;
    });
    await t7.ready;
  } catch {
  }
};
TimorApp.styles = i3`
    :host {
      display: flex;
      height: 100dvh;
    }

    main {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      background-color: var(--md-sys-color-surface-container);
    }

    .page {
      flex: 1;
      display: flex;
      background-color: var(--md-sys-color-background);
      border-radius: 28px;
      margin-block: 16px;
      margin-inline-end: 16px;
      overflow: hidden;
    }

    ::view-transition-old(*) {
      animation: vt-out 500ms linear forwards;
    }

    ::view-transition-new(*) {
      animation: vt-in 500ms linear;
    }

    @keyframes vt-out {
      0% {
        opacity: 1;
        transform: translateY(0);
      }
      5% {
        opacity: 1;
        transform: translateY(-0.7px);
      }
      10% {
        opacity: 1;
        transform: translateY(-2.9px);
      }
      15% {
        opacity: 1;
        transform: translateY(-8.4px);
      }
      20% {
        opacity: 0;
        transform: translateY(-19.3px);
      }
      100% {
        opacity: 0;
        transform: translateY(-30px);
      }
    }

    @keyframes vt-in {
      0% {
        opacity: 0;
        transform: translateY(30px);
      }
      5% {
        opacity: 0;
        transform: translateY(29.3px);
      }
      10% {
        opacity: 0;
        transform: translateY(27.1px);
      }
      15% {
        opacity: 0;
        transform: translateY(21.6px);
      }
      20% {
        opacity: 0.837;
        transform: translateY(10.7px);
      }
      25% {
        opacity: 1;
        transform: translateY(6.7px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
__decorateClass([
  r8()
], TimorApp.prototype, "page", 2);
TimorApp = __decorateClass([
  t6("timor-app")
], TimorApp);

// src/ssr-entrypoint.ts
function renderApp() {
  return collectResult(render(T`<timor-app></timor-app>`));
}
export {
  renderApp
};
/*! Bundled license information:

web-streams-polyfill/dist/ponyfill.es2018.js:
  (**
   * @license
   * web-streams-polyfill v3.3.3
   * Copyright 2024 Mattias Buelens, Diwank Singh Tomer and other contributors.
   * This code is released under the MIT license.
   * SPDX-License-Identifier: MIT
   *)

fetch-blob/index.js:
  (*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> *)

formdata-polyfill/esm.min.js:
  (*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> *)

node-domexception/index.js:
  (*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> *)

@lit-labs/ssr-dom-shim/lib/element-internals.js:
@lit-labs/ssr-dom-shim/lib/events.js:
@lit-labs/ssr/lib/server-template.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit-labs/ssr-dom-shim/lib/css.js:
@lit-labs/ssr-dom-shim/lib/observers.js:
@lit-labs/ssr-dom-shim/register-css-hook.js:
  (**
   * @license
   * Copyright 2024 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit-labs/ssr-dom-shim/index.js:
@lit-labs/ssr/lib/dom-shim.js:
@lit-labs/ssr/lib/install-global-dom-shim.js:
@lit-labs/ssr/lib/element-renderer.js:
@lit/reactive-element/node/css-tag.js:
lit-html/node/private-ssr-support.js:
@lit-labs/ssr-client/directives/render-light.js:
@lit-labs/ssr/lib/reflected-attributes.js:
@lit-labs/ssr/lib/lit-element-renderer.js:
@lit-labs/ssr/lib/render.js:
@lit-labs/ssr/lib/render-lit-html.js:
@lit-labs/ssr/lib/render-with-global-dom-shim.js:
  (**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/node/lit-html.js:
lit-element/lit-element.js:
lit-element/private-ssr-support.js:
lit-html/node/directive.js:
@lit/reactive-element/node/decorators/custom-element.js:
@lit/reactive-element/node/decorators/property.js:
@lit/reactive-element/node/decorators/state.js:
@lit/reactive-element/node/decorators/event-options.js:
@lit/reactive-element/node/decorators/base.js:
@lit/reactive-element/node/decorators/query.js:
@lit/reactive-element/node/decorators/query-all.js:
@lit/reactive-element/node/decorators/query-async.js:
@lit/reactive-element/node/decorators/query-assigned-nodes.js:
lit-html/node/async-directive.js:
  (**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/node/directive-helpers.js:
@lit-labs/ssr/index.js:
lit-html/node/directives/ref.js:
lit-html/node/directives/live.js:
  (**
   * @license
   * Copyright 2020 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

@lit-labs/ssr/lib/util/escape-html.js:
@lit/reactive-element/node/decorators/query-assigned-elements.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

lit-html/node/is-server.js:
@lit-labs/ssr/lib/render-result.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   *)

iconify-icon/dist/iconify-icon.mjs:
  (**
  * (c) Iconify
  *
  * For the full copyright and license information, please view the license.txt
  * files at https://github.com/iconify/iconify
  *
  * Licensed under MIT.
  *
  * @license MIT
  * @version 3.0.3
  *)

@vollowx/seele/src/m3/loading/loading.js:
  (**
   * @license
   * Copyright 2026 brahmkshatriya
   * Modifications Copyright 2026 Lucas X. Zhao
   * SPDX-License-Identifier: Apache-2.0
   *)

@vollowx/seele/src/base/input.js:
  (**
   * @license
   * Copyright 2018-2023 Google, Inc.
   * SPDX-License-Identifier: Apache-2.0
   *)
*/
