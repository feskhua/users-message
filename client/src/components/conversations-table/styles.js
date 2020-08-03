export default theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  spacer: {
    display: 'none',
  },

  table: {
    minWidth: 1020,
  },

  tableWrapper: {
    overflowX: 'auto',
  },

  filterToolbar: {
    paddingRight: theme.spacing.unit,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  menuItem: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: 200,
  },
});
