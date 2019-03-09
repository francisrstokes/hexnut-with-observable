const { Subject } = require('rxjs');

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

module.exports = withObservable;