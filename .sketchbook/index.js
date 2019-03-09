
const Hexnut = require('hexnut');
const withObservable = require('../');
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