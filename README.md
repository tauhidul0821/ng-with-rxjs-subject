# RxJS Features Explained

This document provides a clean and simple explanation of the RxJS features used in the project, along with examples for better understanding.

---

## **1. RxJS Classes & Subjects**

### **Observable**
An `Observable` is like a stream of data that you can listen to over time.
```typescript
import { Observable } from 'rxjs';

const myObservable = new Observable<number>((observer) => {
  observer.next(1);
  observer.next(2);
  observer.complete(); // Signal that no more values will be emitted
});

myObservable.subscribe((value) => console.log(value));
// Output: 1, 2
```

### **Subject**
A `Subject` is like an `Observable`, but it can also emit values.
```typescript
import { Subject } from 'rxjs';

const mySubject = new Subject<number>();

mySubject.subscribe((value) => console.log('Subscriber 1:', value));
mySubject.subscribe((value) => console.log('Subscriber 2:', value));

mySubject.next(10);
// Output:
// Subscriber 1: 10
// Subscriber 2: 10
```

### **BehaviorSubject**
A `BehaviorSubject` holds a current value and emits the latest value to new subscribers.
```typescript
import { BehaviorSubject } from 'rxjs';

const myBehaviorSubject = new BehaviorSubject<number>(100);

myBehaviorSubject.subscribe((value) => console.log('Subscriber 1:', value));

myBehaviorSubject.next(200);
// Output: Subscriber 1: 100, Subscriber 1: 200

myBehaviorSubject.subscribe((value) => console.log('Subscriber 2:', value));
// Output: Subscriber 2: 200 (gets the latest value immediately)
```

---

## **2. RxJS Operators (Used to Modify Data Streams)**

### **switchMap**
Cancels the previous request and starts a new one when a new value is emitted.
```typescript
import { of, switchMap } from 'rxjs';

of('User123').pipe(
  switchMap((userId) => fetchUserData(userId))
).subscribe(console.log);

function fetchUserData(id: string) {
  return of(`Fetched data for ${id}`);
}
```

### **tap**
Performs a side effect (like logging) without modifying the data.
```typescript
import { of, tap } from 'rxjs';

of('Hello').pipe(
  tap((value) => console.log('Before:', value))
).subscribe(console.log);

// Output:
// Before: Hello
// After: Hello
```

### **map**
Transforms each emitted value.
```typescript
import { of, map } from 'rxjs';

of(2, 4, 6).pipe(
  map((num) => num * 10)
).subscribe(console.log);

// Output: 20, 40, 60
```

### **mergeMap**
Flattens inner `Observable`s but does **not** cancel previous ones.
```typescript
import { of, mergeMap } from 'rxjs';

of('User123').pipe(
  mergeMap((userId) => fetchUserData(userId))
).subscribe(console.log);

function fetchUserData(id: string) {
  return of(`Fetched data for ${id}`);
}
```

### **catchError**
Handles errors inside an `Observable`.
```typescript
import { of, throwError, catchError } from 'rxjs';

throwError(() => new Error('Something went wrong')).pipe(
  catchError((error) => of(`Handled Error: ${error.message}`))
).subscribe(console.log);

// Output: Handled Error: Something went wrong
```

---

## **3. Special Observables**

### **EMPTY**
An `Observable` that emits **nothing** and completes immediately.
```typescript
import { EMPTY } from 'rxjs';

EMPTY.subscribe({
  next: () => console.log('Next'),
  complete: () => console.log('Completed')
});

// Output: Completed
```

---

## **4. Summary Table**

| Feature | Description |
|---------|-------------|
| **Observable** | Creates a stream of data |
| **Subject** | Observable that can emit values |
| **BehaviorSubject** | Holds the last emitted value |
| **switchMap** | Cancels previous observable and switches to a new one |
| **tap** | Executes side effects like logging |
| **map** | Transforms emitted values |
| **mergeMap** | Maps and flattens inner Observables |
| **catchError** | Catches and handles errors |
| **filter** | Filters emitted values |
| **debounceTime** | Delays emissions until no new values arrive within a time frame |
| **distinctUntilChanged** | Ignores consecutive duplicate values |
| **defaultIfEmpty** | Emits a default value if no data comes through |
| **finalize** | Executes code when an Observable completes or errors |
| **forkJoin** | Combines multiple Observables and waits for all to complete |
| **from** | Converts an array, promise, or iterable into an Observable |
| **of** | Creates an Observable from fixed values |
| **EMPTY** | Observable that emits nothing and completes immediately |

---


## **Key RxJS Features and Functions**

### 1. **Core RxJS Concepts**
   - **Observables**: The foundation of RxJS. Used to represent asynchronous data streams.
   - **Subjects**: Special types of Observables that allow multicasting to multiple subscribers.
     - `Subject`: A basic Subject that emits values to all subscribers.
     - `BehaviorSubject`: A Subject that requires an initial value and emits the current value to new subscribers.
   - **Operators**: Functions used to transform, filter, or combine Observables.
   - **Subscriptions**: Used to listen to Observables and handle their emissions.

---

### 2. **RxJS Operators Used in the Codebase**

#### **Creation Operators**
   - **`of`**: Creates an Observable that emits a single value or a sequence of values.
     ```typescript
     of([]) // Emits an empty array
     ```
   - **`forkJoin`**: Combines multiple Observables and waits for all of them to complete before emitting a single array of their last values.
     ```typescript
     forkJoin([observable1$, observable2$])
     ```
   - **`Subject`**: Used to create a multicast Observable that can emit values to multiple subscribers.
     ```typescript
     filterChange$ = new Subject<PaidMediaQuery>();
     ```

#### **Transformation Operators**
   - **`map`**: Transforms the items emitted by an Observable by applying a function to each item.
     ```typescript
     map((query) => ({ ...query, channelId: this.channel.id }))
     ```
   - **`switchMap`**: Maps to a new Observable and switches to it, canceling the previous Observable.
     ```typescript
     switchMap((query) => this.paidMediaService.getGraph(query))
     ```
   - **`concatMap`**: Maps to a new Observable and processes them in sequence, one at a time.
     ```typescript
     concatMap(({ node, query }) => this.paidMediaService.getHotels(node.key, query))
     ```
   - **`tap`**: Used for side effects (e.g., logging, updating state) without modifying the stream.
     ```typescript
     tap((response) => this.chartData = this.transformGraphData(response[0]))
     ```

#### **Filtering Operators**
   - **`filter`**: Emits only those items from the source Observable that satisfy a condition.
     ```typescript
     filter((query) => !!(query.from && query.to))
     ```
   - **`distinctUntilChanged`**: Emits only when the current value is different from the previous value.
     ```typescript
     distinctUntilChanged()
     ```
   - **`debounceTime`**: Emits a value only after a specified time has passed without another source emission.
     ```typescript
     debounceTime(300) // Waits 300ms before emitting
     ```

#### **Combination Operators**
   - **`forkJoin`**: Combines multiple Observables and waits for all of them to complete before emitting a single array of their last values.
     ```typescript
     forkJoin([observable1$, observable2$])
     ```

#### **Error Handling Operators**
   - **`catchError`**: Catches errors on the Observable and returns a new Observable or default value.
     ```typescript
     catchError(() => of([])) // Returns an empty array on error
     ```

#### **Utility Operators**
   - **`takeUntilDestroyed`**: Automatically unsubscribes from an Observable when the component is destroyed (Angular-specific).
     ```typescript
     takeUntilDestroyed()
     ```
   - **`defaultIfEmpty`**: Emits a default value if the source Observable completes without emitting any values.
     ```typescript
     defaultIfEmpty(null)
     ```

---

### 3. **RxJS Patterns in the Codebase**

#### **Reactive Data Flow**
   - **Filter Change Pattern**:
     ```typescript
     filterChange$.next(filterQuery); // Emit new filter values
     filterChange$
       .pipe(
         filter((query) => !!query),
         switchMap((query) => this.service.getData(query))
       )
       .subscribe((data) => this.updateUI(data));
     ```

#### **Dynamic Data Loading**
   - **Expandable Tree Table**:
     ```typescript
     loadHotels$
       .pipe(
         switchMap((node) => this.service.getHotels(node.key))
       )
       .subscribe((hotels) => this.updateTreeTable(hotels));
     ```

#### **Error Handling**
   - **Graceful Error Handling**:
     ```typescript
     catchError(() => of([])) // Return empty array on error
     ```

#### **Debounced Search**
   - **Search with Debounce**:
     ```typescript
     filterUser$
       .pipe(
         debounceTime(300),
         distinctUntilChanged(),
         switchMap((search) => this.service.search(search))
       )
       .subscribe((results) => this.updateResults(results));
     ```

---

### 4. **RxJS Features Specific to Angular**

#### **Angular-Specific RxJS Functions**
   - **`takeUntilDestroyed`**: Automatically unsubscribes from Observables when the component is destroyed (Angular 16+).
     ```typescript
     takeUntilDestroyed()
     ```

#### **Router Events**
   - **Listening to Router Events**:
     ```typescript
     this.router.events
       .pipe(
         filter((event) => event instanceof NavigationEnd),
         map(() => this.router.url)
       )
       .subscribe((url) => this.updateTitle(url));
     ```

---

### 5. **RxJS Functions to Learn**

Here’s a prioritized list of RxJS functions to learn based on their usage in the codebase:

#### **High Priority**
   - `Subject`, `BehaviorSubject`
   - `map`, `switchMap`, `concatMap`, `tap`
   - `filter`, `distinctUntilChanged`, `debounceTime`
   - `forkJoin`
   - `catchError`
   - `takeUntilDestroyed` (Angular-specific)

#### **Medium Priority**
   - `of`
   - `defaultIfEmpty`
   - `mergeMap` (not used here but common in RxJS)
   - `combineLatest` (not used here but common in RxJS)

#### **Low Priority**
   - `throttleTime`, `auditTime` (for advanced timing control)
   - `withLatestFrom` (for combining streams)

---

