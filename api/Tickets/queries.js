import Tickets from './Tickets';

export default {
  tickets: (parent, args) => {
    return Tickets.find(
      {},
      // { sort: { created_time: args.sortBy === 'newestFirst' ? -1 : 1 } },
      { sort: { created_time: -1 } },
    ).fetch();
  },
};
