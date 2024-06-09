import exp from 'constants';

const users = [
  {
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    name: 'John Doe',
    messageContent: "Hello there! I hope you're having a great day.",
  },
  {
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
    name: 'Jane Smith',
    messageContent: 'Good morning!',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    name: 'Robert Brown',
    messageContent:
      "How's it going? It's been a while since we last caught up.",
  },
  {
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    name: 'Emily Johnson',
    messageContent: 'Nice to meet you!',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    name: 'Michael Davis',
    messageContent: "What's up?",
  },
  {
    avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
    name: 'Sarah Miller',
    messageContent:
      'Hello everyone! Just wanted to say hi and see how everyone is doing today.',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/4.jpg',
    name: 'David Wilson',
    messageContent: 'Hey there!',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    name: 'Laura Moore',
    messageContent: "Good afternoon! I hope you're all enjoying your day.",
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    name: 'James Taylor',
    messageContent: 'Hi!',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    name: 'Jessica Anderson',
    messageContent:
      "How are you? I haven't seen you in a while and was wondering how things are going.",
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    name: 'Christopher Thomas',
    messageContent: 'Good evening!',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    name: 'Amanda Jackson',
    messageContent: 'Nice to see you!',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    name: 'Matthew White',
    messageContent: 'How have you been?',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/women/7.jpg',
    name: 'Elizabeth Harris',
    messageContent:
      'Long time no see! I hope everything is going well on your end.',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
    name: 'Joshua Martin',
    messageContent: "Good to see you! Let's catch up soon.",
  },
  {
    avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
    name: 'Sophia Thompson',
    messageContent: 'Hey!',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/9.jpg',
    name: 'Daniel Garcia',
    messageContent: "What's new? It's been a while since we last spoke.",
  },
  {
    avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
    name: 'Megan Martinez',
    messageContent:
      "Hi everyone! Just dropping by to say hello and see how you're all doing.",
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
    name: 'Andrew Martinez',
    messageContent: 'Hello!',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/women/10.jpg',
    name: 'Ashley Rodriguez',
    messageContent: "Good day! I hope you're having a wonderful time.",
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/11.jpg',
    name: 'William Johnson',
    messageContent: 'Hey everyone!',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
    name: 'Olivia Brown',
    messageContent: 'Good evening, folks!',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    name: 'Noah Wilson',
    messageContent: 'What are you all up to?',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/women/12.jpg',
    name: 'Emma Thomas',
    messageContent: "Just checking in. How's everyone doing?",
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/13.jpg',
    name: 'Liam Davis',
    messageContent: 'Hello friends!',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/women/13.jpg',
    name: 'Ava Martinez',
    messageContent: 'Hi there!',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/14.jpg',
    name: 'James Garcia',
    messageContent: "It's been a while since I joined this chat!",
  },
  {
    avatar: 'https://randomuser.me/api/portraits/women/14.jpg',
    name: 'Charlotte Miller',
    messageContent: 'Nice to meet you all!',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/15.jpg',
    name: 'Benjamin Jackson',
    messageContent: 'Greetings from my side!',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/women/15.jpg',
    name: 'Amelia Harris',
    messageContent: 'How is everyone?',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/16.jpg',
    name: 'Lucas Thompson',
    messageContent: 'Hey folks!',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/women/16.jpg',
    name: 'Mia Jackson',
    messageContent: 'Just wanted to say hi!',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/17.jpg',
    name: 'Henry Wilson',
    messageContent: 'Good day, everyone!',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
    name: 'Evelyn Moore',
    messageContent: 'How are things going?',
  },
  {
    avatar: 'https://randomuser.me/api/portraits/men/18.jpg',
    name: 'Alexander Taylor',
    messageContent: 'Hello, chat buddies!',
  },
];

export default users;
