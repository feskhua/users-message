import { drawerWidth } from '../drawer/styles';

export default ({ transitions }) => ({
  appBar: {
    transition: transitions.create(['margin', 'width'], {
      easing: transitions.easing.sharp,
      duration: transitions.duration.leavingScreen,
    }),
  },

  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: transitions.create(['margin', 'width'], {
      easing: transitions.easing.easeOut,
      duration: transitions.duration.enteringScreen,
    }),
  },
});
