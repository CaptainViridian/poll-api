export default () => (
  {
    'randomId': '5e770df51fb8e0176f2ca746',
    'newPoll': {
      'description': 'Test description',
      'options': ['option7', 'option8', 'option9']
    },
    'poll': {
      '_id': '5e76842478a69c23ffcc01f8',
      'description': 'Test1',
      'options': [
        {
          '_id':'5e76842478a69c23ffcc01f9',
          'description':'option1'
        },
        {
          '_id':'5e76842478a69c23ffcc01fa',
          'description':'option2'
        },
        {
          '_id':'5e76842478a69c23ffcc01fb',
          'description':'options3'
        }
      ]
    },
    otherPoll: {
      _id: '5e76843378a69c23ffcc01fc',
      description: 'Test2',
      views: 15,
      options: [
        {
          '_id':'5e76843378a69c23ffcc01fd',
          'description':'option4',
          'votes':0
        },
        {
          '_id':'5e76843378a69c23ffcc01fe',
          'description':'option5',
          'votes':0
        },
        {
          '_id':'5e76843378a69c23ffcc01ff',
          'description':'options6',
          'votes':0
        },
      ],
    },
    'pollStats': {
      'views': 5,
      'votes': [
        {'optionId': '5e76842478a69c23ffcc01f9', 'qty': 0},
        {'optionId': '5e76842478a69c23ffcc01fa', 'qty': 0},
        {'optionId': '5e76842478a69c23ffcc01fb', 'qty': 0}
      ]
    }
  }
);
