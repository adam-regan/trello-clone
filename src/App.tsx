import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { Header, List } from './components';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			flexDirection: 'column',
			width: '100vw',
			height: '100vh',
			backgroundColor: '#0479BE',
		},
		lists: {
			display: 'flex'
		}
	}));

export const App = () => {
	const classes = useStyles();
	const [state, setState] = useState<State>({
		lists: ['To Do', 'Done']
	});


	return (
		<div className={classes.root}>
			<CssBaseline />
			<Header />
			<div className={classes.lists}>
				{state.lists.map((title, index) => (
					<List
						key={index}
						listIndex={index}
						title={title} />
				))}
			</div>
		</div>
	);
}

type State = {
	lists: string[];
}
