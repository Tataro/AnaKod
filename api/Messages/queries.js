import Messages from './Messages';

export default {
  messages: (parent, args) => {
    return Messages.find(
      {},
      // { sort: { created_time: args.sortBy === 'newestFirst' ? -1 : 1 } },
      { sort: { created_time: -1 } },
    ).fetch();
  },
};
