export const officialPlugins = [
  {
    name: 'Substation',
    src: '/src/editors/Substation.js',
    icon: 'margin',
    default: true,
    kind: 'editor',
  },
  {
    name: 'Communication',
    src: '/src/editors/Communication.js',
    icon: 'settings_ethernet',
    default: true,
    kind: 'editor',

  },
  {
    name: 'Templates',
    src: '/src/editors/Templates.js',
    icon: 'copy_all',
    default: true,
    kind: 'editor',
  },
  {
    name: 'CoMPAS Versions',
    src: '/src/compas-editors/CompasVersions.js',
    icon: 'copy_all',
    default: true,
    kind: 'editor',
  },
  {
    name: 'Login',
    src: '/src/menu/Login.js',
    icon: 'login',
    default: true,
    kind: 'menu',
    requireDoc: false,
    position: 'top'
  },
  {
    name: 'Open project',
    src: '/src/menu/OpenProject.js',
    icon: 'folder_open',
    default: true,
    kind: 'menu',
    requireDoc: false,
    position: 'top'
  },
  {
    name: 'Open CoMPAS',
    src: '/src/menu/OpenCompas.js',
    icon: 'folder_open',
    default: true,
    kind: 'menu',
    requireDoc: false,
    position: 'top'
  },
  {
    name: 'New project',
    src: '/src/menu/NewProject.js',
    icon: 'create_new_folder',
    default: true,
    kind: 'menu',
    requireDoc: false,
    position: 'top'
  },
  {
    name: 'New project from CIM',
    src: '/src/menu/CompasCimMapping.js',
    icon: 'input',
    default: true,
    kind: 'menu',
    requireDoc: false,
    position: 'top'
  },
  {
    name: 'Save project',
    src: '/src/menu/SaveProject.js',
    icon: 'save',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'top'
  },
  {
    name: 'Save CoMPAS',
    src: '/src/menu/SaveToCompas.js',
    icon: 'folder_open',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'top'
  },
  {
    name: 'Validate project',
    src: '/src/validators/ValidateSchema.js',
    icon: 'rule_folder',
    default: true,
    kind: 'validator',
  },
  {
    name: 'Validate Templates',
    src: '/src/validators/ValidateTemplates.js',
    icon: 'rule_folder',
    default: true,
    kind: 'validator'
  },
  {
    name: 'Import IEDs',
    src: '/src/menu/ImportIEDs.js',
    icon: 'snippet_folder',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'middle'
  },
  {
    name: 'Subscriber Update',
    src: '/src/menu/SubscriberInfo.js',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'middle'
  },
  {
    name: 'Merge Project',
    src: '/src/menu/Merge.js',
    icon: 'merge_type',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'middle'
  },
  {
    name: 'Update Substation',
    src: '/src/menu/UpdateSubstation.js',
    icon: 'merge_type',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'middle'
  },
  {
    name: 'Communication Mapping',
    src: '/src/menu/CommunicationMapping.js',
    icon: 'sync_alt',
    default: true,
    kind: 'menu',
    requireDoc: true,
    position: 'middle'
  },
  {
    name: 'CoMPAS Settings',
    src: '/src/menu/CompasSettings.js',
    icon: 'settings',
    default: true,
    kind: 'menu',
    requireDoc: false,
    position: 'bottom'
  },
  {
    name: 'Help',
    src: '/src/menu/Help.js',
    icon: 'help',
    default: true,
    kind: 'menu',
    requireDoc: false,
    position: 'bottom'
  },
];
