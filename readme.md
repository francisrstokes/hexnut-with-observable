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
const withObservable = require('hexnut-with-observable');

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
  filter(({ctx}) => ctx.isMessage),

  // Process messages
  tap(({ctx, next}) => {
    if (ctx.message !== 'skip') {
      ctx.send(`You sent: ${ctx.message}`);
      return;
    }
    next();
  })
)));


app.start();
```
