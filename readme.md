# hexnut-with-observable

`hexnut-with-observable` is a <a href="https://github.com/francisrstokes/hexnut">hexnut</a> middleware for integrating with `rxjs`.

**Note**: Requires peer dependency of `rxjs ^v6.0.0`.

## Installing

```bash
npm i hexnut-with-observable
```

## Usage

```javascript

const Hexnut = require('hexnut');
const {withObservable, filterMessages} = require('hexnut-with-observable');

const { tap, filter } = require('rxjs/operators');
const { pipe } = require('rxjs');

const app = new Hexnut({ port: 8181 });

app.use(withObservable(pipe(
  // Do setup operations here...
  tap(({ctx}) => {
    if (ctx.isConnection) {
      console.log(`[${ctx.ip}] Connection started`);
    }
  }),

  // Filter to only messages
  filterMessages(msg => msg !== 'skip'),

  // Process messages
  tap(({ctx}) => {
    ctx.send(`You sent: ${ctx.message}`);
  })
)));


app.start();
```

## Utility operators

### Filter Messages

**filterMessages(predicateFn)**

Filters to messages that pass the predicate function. Automatically calls the `next()` middleware if event is not a message or does not pass.

#### Example

```javascript
app.use(withObservable(pipe(
  filterMessages(msg => msg.startsWith('!')),
  tap(({ctx}) => {
    ctx.send('Only messages beginning with a ! get here');
  })
)));
```

### Filter Connections

*filterConnections*

Filters connections. Automatically calls the `next()` middleware if event is not a connection.

#### Example

```javascript
app.use(withObservable(pipe(
  filterConnections,
  tap(({ctx}) => {
    ctx.send('This is a connection event.');
  })
)));
```

### Filter Closes

*filterCloses*

Filters close events. Automatically calls the `next()` middleware if event is not a close.

#### Example

```javascript
app.use(withObservable(pipe(
  filterCloses,
  tap(({ctx}) => {
    console.log('Client disconnected');
  })
)));
```