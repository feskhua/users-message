export const drawerWidth = 240;

export default theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },

  drawerPaper: {
    width: drawerWidth,
  },

  toolbar: theme.mixins.toolbar,
});
