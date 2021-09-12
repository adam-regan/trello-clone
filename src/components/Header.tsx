import React from 'react';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			justifyContent: 'center',
			height: '70px',
			backgroundColor: '#0566A2',
		},
		text: {
			color: '#8EB3D1',
		}
	}));

export const Header = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<h1 className={classes.text}>Trello</h1>
		</div>
	);
}

