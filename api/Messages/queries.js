import Messages from './Messages';

export default {
  messages: (parent, args) => {
    return Messages.find(
      { ticket_id: { $eq: '' } },
      // { sort: { created_time: args.sortBy === 'newestFirst' ? -1 : 1 } },
      { sort: { created_time: -1 }, limit: 10 },
    ).fetch();
  },
  message: (parent, args, context) => {
    console.log('args id', args._id);
    return Messages.findOne({ _id: args._id });
  },
};
