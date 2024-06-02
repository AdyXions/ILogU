export default [
  {
    title: 'Home',
    to: { name: 'root' },
    icon: { icon: 'ri-home-smile-line' },
  },
  
  {
    title: 'Settings',
    icon: { icon: 'ri-settings-6-line' },
    children: [
      {
        title: 'Users',
        to: { name: 'settings-users' },
        icon: { icon: 'ri-user-3-line' },
      },
      
      {
        title: 'Audit Trail',
        to: { name: 'settings-audit-trail' },
        icon: { icon: 'ri-file-text-line' },
      },
    ],
  },

]
