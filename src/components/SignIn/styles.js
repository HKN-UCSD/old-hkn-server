const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    width: '112px',
    height: '80px',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  signin: {
    marginTop: theme.spacing.unit * 3,
  },
  forgotPassword: {
    textTransform: 'none',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    float: 'right',
    marginTop: theme.spacing.unit,
  },
  signupFooter: {
    marginTop: theme.spacing.unit * 3,
    textTransform: 'none',
    textAlign: 'center',
    flexDirection: 'column',
    display: 'flex',
  },
  signupLink: {
    textDecoration: 'none',
  },
  footer: {
    marginTop: theme.spacing.unit * 3,
    textAlign: 'center',
  },
  footerLink: {
    textDecoration: 'none',
    color: 'inherit',
  },
});

export default styles;
