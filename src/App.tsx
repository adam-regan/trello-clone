import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { List } from './components';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flex: 1,
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			width: '100vw',
			height: '100vh',
			marginLeft: 'auto',
			marginRight: 'auto',
			backgroundColor: '#0479BE',
			borderRadius: '5px'
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
			{state.lists.map((title, index) => (
				<List
					key={index}
					listIndex={index}
					title={title}/>
			))}
		</div>
	);
}

type State = {
	lists: string[];
}
