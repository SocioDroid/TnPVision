import React, {useEffect} from 'react';
import { Typography, Grid, Box, ButtonBase, Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './BodyContent.css'
import homepage from '../../static/images/homepage.svg';
import TopBar from '../../layouts/TopBars/TopBarBeforeSignIn';
import Auth from '../../auth';

const useStyles = makeStyles((theme) => ({

    root: {
        flexGrow: 1,
    },	
	//Body Style
	paper: {
		padding: theme.spacing(2),
		margin: 'auto',
		maxWidth: 500,
		height: '100vh'
    },
    image: {
		width: '100%',
		height: '100%',
    },
    img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%',
    },
}));

 function HomePage(props) {

	const classes = useStyles();
	useEffect((props) => {
		if(Auth.isUserAuthenticated){
			console.log("gfhdgifdgohdfoighodfhgodfho             ", Auth.getGroup())
		}	
	}, [])
	
	return (
// ========================================================== HEADER CONTENT =============================================================== 
		<div className={classes.root}>
			<Paper style={{height: '100vh', width: '100%'}}>
				<TopBar />
{/* ========================================================== BODY CONTENT =============================================================== */}
				<Grid item xs={12} container spacing={5} style={{minHeight:'90vh'}} >
				<Grid item xs={false} sm={1} />
					<Grid item sm={5} >
						<ButtonBase className={classes.image} >
							<img className={classes.img} alt="complex" src={homepage}/>
						</ButtonBase>
					</Grid>
					<Grid item sm container direction="column" spacing={2} style={{alignSelf: 'center'}} >
						<Grid item sm >
							<Typography gutterBottom variant="subtitle1">
								<Box 
									fontWeight={500} m={1}
									textAlign='center'
									fontStyle='normal'
									fontSize='35px'
									lineHeight='50px'
									letterSpacing='0.08em'>
									Your one stop solution
								</Box>
								<Box 
									fontWeight={200} m={1}
									textAlign='center'
									fontStyle='normal'
									fontSize='36px'
									lineHeight='42px'
									letterSpacing='0.08em'>
									for
								</Box>
								<Box 
									fontWeight={700} m={1}
									textAlign='center'
									fontStyle='normal'
									fontSize='40px'
									lineHeight='47px'
									letterSpacing='0.08em'>
									Managing Placement
								</Box>
								<Box 
									fontWeight={700} m={1}
									textAlign='center'
									fontStyle='normal'
									fontSize='40px'
									lineHeight='47px'
									letterSpacing='0.08em'>
									Activities
								</Box>
							</Typography>
						</Grid>
					</Grid>
					<Grid item xs={false} sm={1} />
				</Grid>
			</Paper>
		</div>
	);
}

export default HomePage;