import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Background from '../assets/produce_spread_mischief.jpg';
import { useHistory } from 'react-router-dom';
import SimpleModal from '../components/SimpleModal'
import GoogleCalendar from '../components/GoogleCalendar'
import DatePicker from '../components/DatePicker'


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  typography: {
    fontFamily: `'Pacifico', cursive`,
  },
  main: {
    backgroundImage: `url(${Background})`
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [{
    id: 1,
    title: 'Korean BBQ Ssam Bundle',
    quantity: 5,
    description: 'All you need for your Korean BBQ at home!  Korean Peppers, perilla leaves and lettuce!',
    image: 'https://www.thespruceeats.com/thmb/q0z-tMrCicv-Zw-gLu99hoj4i0k=/2000x1333/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-647372497-57a754ea3df78cf459087b8e.jpg',
    status: 'available'
}];

export default function Home(props) {
  const classes = useStyles();
  const history = useHistory();
  const [modalIsOpen, setModalIsOpen ] = useState(false)


  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <LocalFloristIcon className={classes.icon} />
          <Typography className={classes.typography} variant="h6" color="inherit" noWrap>
            Farmr
          </Typography>
        </Toolbar>
      </AppBar>
      <main >  
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography className={classes.typography} component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Farmr
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Organic Produce harvested weekly by your local Farmr for delivery or pickup!
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    About Us
                  </Button>
                </Grid>
                <Grid item>
                  <Button onClick={() => history.push(`/signin`)} variant="outlined" color="primary">
                    Login/ Signup
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card.id} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardMedia}
                    image={card.image}
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                     {card.title}
                    </Typography>
                    <Typography>
                      {card.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Details
                    </Button>
                    <Button onClick={() => setModalIsOpen(true)} size="small" color="primary">
                      Schedule Delivery
                    </Button>
                    <SimpleModal isOpen={modalIsOpen} close={() => setModalIsOpen(false)}>
                        <DatePicker close={() => setModalIsOpen(false)}/>
                    </SimpleModal>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <footer className={classes.footer}>
        <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
          Support your local farmr!
        </Typography>
        <Copyright />
      </footer>
      {/* End footer */}
    </React.Fragment>
  );
}