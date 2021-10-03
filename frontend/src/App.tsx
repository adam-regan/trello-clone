import React, { useEffect, useState } from 'react';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { Header, List, AddList } from './components';
import { addList, getAllLists, deleteList as apiDeleteList } from './lib/api';

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

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const res = await getAllLists();
		setState({
			lists: res.data
		});
	}

	async function addToLists(title: string) {
		await addList(title);
		getData();
	}

	async function deleteList(id: string) {
		await apiDeleteList(id)
		getData();
	}

	return (
		<div className={classes.root}>
			<CssBaseline />
			<Header />
			<div className={classes.lists}>
				{state.lists.map((list, index) => (
					<List
						key={index}
						_id={list._id}
						listIndex={index}
						title={list.list_name}
						deleteList={deleteList} />
				))}
			<AddList onAddList={addToLists}/>
			</div>
		</div>
	);
}

type State = {
	lists: ListType[];
}

type ListType = {_id: string, list_name: string};
