import { lighten } from '@material-ui/core/styles/colorManipulator';

export default theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    flex: '1 0 auto',
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});
