const systems = {
  data: [
    {
      quality: 'Fast and Stupid',
      code: 'black box - can be used but not really modified',
      class: 'Javascipt/Browser',
      examples: 'Local Storage',
      schema: 'string value',
      comp: 0,
      env: 'Browser',
      flow: 'Sync, Immediate',
      org: 'flat key/value',
      test: '"Headful" -- only exists in the browser',
      notes: 'Large Support System, but still in and out of the ER regularly'
    },
    {
      quality: 'Fast and kind of stupid',
      class: 'Javascript/State',
      examples: 'Redux',
      comp: 0,
      schema: 'string value',
      env: '"any", but realistically, React',
      code: 'Saga et.al allows strong observability, at a huge ramp-up in complexity',
      flow: 'Sync, Immediate',
      org: 'any/uncontrolled',
      test: 'Not great; parts can be tested with a bit of cleverness, but most often tested indirectly through UX tests',
      notes: 'Cannot easily separate change from broadcast, which confounds composition and optimization'
    },
    {
      quality: 'Fast and clever',
      class: 'React core system',
      examples: 'hooks',
      comp: 1,
      schema: 'none',
      env: 'React',
      code: 'functional hook library',
      flow: 'event loop driven',
      org: 'inline javascript',
      test: 'buried in closure - can only be "black box tested" with jest et all',
      notes: 'Has basically slaughtered Redux -- but has a hidden cost in that it can complicate direct testing'
    },
    {
      quality: 'Fast',
      examples: 'Redis, other K/V systems, s3',
      code: 'Strong observer pattern, open source(Redis); Amazon aircraft-carrier level support(s3)',
      comp: 3,
      class: 'Server DB',
      schema: '"kind of" - has container types (lists, objects, hierarchy) but content are wholly uncontrolled strings',
      env: 'Server; Amazon (for s3)',
      flow: 'Async (networked)',
      org: 'json-hierarchy (Redis), pseudo file system (s3)',
      test: '"Black Box" - test DBs easy to spin up',
      notes: 'Achieves amazing speed through not giving a crap about what it contains'
    },
    {
      quality: 'Medium',
      examples: 'MongoDB, CouchDB, NoSQL',
      code: 'Open source, strong JS middleware and scripting tools; journaled',
      comp: 4,
      class: 'Server DB',
      schema: 'Minimal, has JSONish data but still no real schema limits',
      flow: 'Async (networked)',
      env: 'Server',
      test: 'Easy to spin up test servers but largely black box',
      notes: 'Makes DBAs want to stop working and move to a farm and raise rabbits',
    },
    {
      quality: 'Medium',
      class: 'Javascript/State',
      examples: 'RxJS',
      comp: '6+',
      env: 'Any Javascript',
      code: 'Functional library of hooks and tools',
      org: 'Arbitrary',
      schema: 'none',
      flow: 'Any kind of flow you want',
      test: 'Easy to test',
      notes: 'initially confusing and terrifying, then amazing, then amazing and kind of terrifying. Tons of docs and features',
    },
    {
      quality: 'Medium',
      class: 'Redux Metasystem',
      examples: 'Saga',
      comp: '7+',
      env: 'Redux',
      code: 'huge interrupt-driven code monster',
      org: 'Arbitrary',
      schema: 'none',
      flow: 'Async/non-linear event',
      test: 'Easy to test',
      notes: 'a series of triggers and event hooks around Redux; generator powered under the hood. Terrifies users. Meant to save Redux, it just as often convinces people to stop using it',
    },
    {
      quality: 'Medium - hard',
      examples: 'MobX',
      comp: '7+',
      class: 'Javascript/State (UX metasystem)',
      env: 'Javascript/State',
      code: 'Substantial OS library',
      org: 'Arbitrary',
      test: 'Tightly bound with view, so, any view testing platform',
      flow: 'Any kind you want; observer pattern',
      notes: 'The only thing that does what it does. Attempts to make EVERYTHING observable. "wraps itself around" existing ux to add observer qualities. Can easily slip into complexity, with code spread through view layer'
    },
    {
      quality: 'Slow and Secure',
      examples: 'SQL: PostGres, MySql, RedShift, etc.',
      env: 'Server',
      class: 'Server DB',
      code: 'Extremely mature ecosystem of views, triggers, etc.',
      test: 'With a good ORM; unit tests began to manage data, historically',
      org: 'Graph - maximum flexibility',
      schema: 'Strong and verbose: the gold standard',
      flow: 'Async, with transactions, temp tables: the best',
      notes: 'So slow people use NoSQL to cache it in production. Simple at its core, but with a giant library of options and settings',
      comp: '5+'
    },
    {
      quality: 'Slow and Secure',
      examples: 'Forest',
      class: 'Javascript/State',
      comp: '4+',
      env: 'Javascript/State (or any JS)',
      code: 'Strong system of hooks, filters',
      schema: 'Javascript tree; fixed structure',
      test: 'Easily testable',
      org: 'tree: graph based system in future releases',
      flow: 'Sync (can interoperate with async)',
      notes: 'Interoperates wiih RxJS; requires custom binding to UX.'
    },
    {
      quality: 'Slowest',
      examples: 'Git/GitHub',
      class: 'Code Repo',
      comp: '6+',
      env: 'Server',
      code: 'Massively observable, open source and extreme journaling',
      schema: 'Blob',
      test: 'so awesome nobody really writes tests for it',
      org: 'file system',
      flow: 'SAS',
      notes: 'Not really a Real-time service - but gives unparalleled ability to inspect data changes over time'
    }
  ],
  cols:
    [
      {
        key: 'quality',
        title: 'Quality', rowSpan: 3
      },
      {
        key: 'class', title: 'Class'
      },
      {
        key: 'examples', title: 'Examples'
      },
      {
        key: 'code', title: 'Codeability'
      },
      {
        key: 'env', title: 'Environment',
        row: 2
      },
      {
        key: 'schema', title: 'Schema',
        row: 2
      },
      {
        key: 'flow', title: 'Flow Control',
        row: 2,
      },
      {
        key: 'test', title: 'Testability',
        row: 3,
      },
      {
        key: 'org', title: 'Organization',
        row: 3,
      },,
      {
        key: 'comp', title: 'Complexity',
        row: 3,
      },
      {
        key: 'notes', title: 'Notes',
        row: 4,
        colSpan: 5,
        decorator: 'notes',
      }
    ]
}
export default systems
