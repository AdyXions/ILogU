export default [
  {
    title: 'Home',
    to: { name: 'root' },
    icon: { icon: 'ri-home-smile-line' },
  },
  {
    title: 'Server',
    icon: { icon: 'ri-server-line' },
    children: [
      {
        title: 'Directory',
        to: { name: 'server-directory' },
        icon: { icon: 'ri-folders-line' },
      },
      {
        title: 'Logs',
        to: { name: 'server-logs' },
        icon: { icon: 'ri-file-check-line' },
      },
    ],
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
        title: 'Environment',
        to: { name: 'settings-environment' },
        icon: { icon: 'ri-hard-drive-3-line' },
      },
      {
        title: 'Audit Trail',
        to: { name: 'settings-audit-trail' },
        icon: { icon: 'ri-file-text-line' },
      },
    ],
  },

]
