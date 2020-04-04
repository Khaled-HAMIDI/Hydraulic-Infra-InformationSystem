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
  }
]