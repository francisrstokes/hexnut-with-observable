const { Subject } = require('rxjs');
const { filter } = require('rxjs/operators');

const withObservable = fn => {
  const s = new Subject();
  fn(s).subscribe();
  return (ctx, next) => {
    return s.next({
      ctx,
      next
    });
  }
}

const filterMessages = pred => filter(({ctx, next}) => {
  if (ctx.isMessage && pred(ctx.message)) return true;
  next();
  return false;
});

const filterConnections = filter(({ctx, next}) => {
  if (ctx.isConnection) return true;
  next();
  return false;
});

const filterCloses = filter(({ctx, next}) => {
  if (ctx.isClosing) return true;
  next();
  return false;
});

module.exports = {
  withObservable,
  filterMessages,
  filterConnections,
  filterCloses
};