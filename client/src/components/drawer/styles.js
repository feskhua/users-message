export const drawerWidth = 240;

export default theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },

  drawerPaper: {
    width: drawerWidth,
  },

  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }
});
