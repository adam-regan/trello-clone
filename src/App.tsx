import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { Header, List, AddList } from './components';

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
			display: 'flex',
			padding: '10px',
		}
	}));

export const App = () => {
	const classes = useStyles();
	const [state, setState] = useState<State>({
		lists: []
	});

	function addList(title: string) {
		const newLists = state.lists.concat([title]);

		setState({
			...state,
			lists: newLists
		});
	}

	function deleteList(index: number) {
		const newLists = [...state.lists];
		newLists.splice(index, 1);
		setState({
			...state,
			lists: newLists
		})
	}


	return (
		<div className={classes.root}>
			<CssBaseline />
			<Header />
			<div className={classes.lists}>
				{state.lists.map((title, index) => (
					<List
						key={index}
						listIndex={index}
						title={title}
						deleteList={deleteList} />
				))}
			<AddList onAddList={addList}/>
			</div>
		</div>
	);
}

type State = {
	lists: string[];
}
