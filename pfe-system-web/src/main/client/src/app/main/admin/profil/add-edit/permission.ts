export const AllPermissions = [
  {
    id:'ouvrage:*',
    description: 'ouvrage',
    checked: false,
    children: [
      { id:'ouvrage:add',description: 'add', checked: false },
      { id:'ouvrage:edit',description: 'edit', checked: false },
      { id:'ouvrage:list',description: 'list', checked: false }
    ]
  },
  {
    id:'chains:*',
    description: 'chaine',
    checked: false,
    children: [
      { id:'chains:add',description: 'add', checked: false },
      { id:'chains:edit',description: 'edit', checked: false },
      { id:'chains:list',description: 'list', checked: false }
    ]
  }
]