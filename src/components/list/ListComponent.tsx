import React, { useState, FunctionComponent } from 'react';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Card, CreateCard } from './';
import { SmallButton } from '../../styles/Button';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			paddingRight: '10px'
		},
		content: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			width: '400px',
			backgroundColor: '#EBECF0',
			borderRadius: '5px',
			paddingBottom: '5px',
			paddingRight: '10x',
		},
		title: {
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'space-between',
			width: '100%',
			paddingLeft: '8px',
			paddingRight: '5px',
		},
		todos: {
			paddingBottom: '5px'
		}
	}));

export const List: FunctionComponent<ListProps> = ({ title, listIndex, deleteList }) => {
	const classes = useStyles();
	const [state, setState] = useState<State>({
		title: title,
		cards: []
	});

	function addCard(value: string) {
		const newList = state.cards.concat([value]);
		setState({
			...state,
			cards: newList,
		});
	}
	function deleteCard(index: number) {
		const cardsCopy = [...state.cards];
		cardsCopy.splice(index, 1);
		setState({
			...state,
			cards: cardsCopy
		})
	}

	function editCard(index: number, value: string) {
		const cardsCopy = [...state.cards];
		cardsCopy[index] = value;
		setState({
			...state,
			cards: cardsCopy
		})
	}

	function onDeleteSelf() {
		deleteList(listIndex);
	}

	return (
		<div className={classes.root}>
			<div className={classes.content}>
				<div className={classes.title}>
					<h3>{title}</h3>
					<SmallButton onClick={onDeleteSelf}>X</SmallButton>
				</div >
				<div className={classes.todos}>
					{state.cards.map((value, index) => {
						return (<Card key={index} title={value} index={index} deleteCard={deleteCard} editCard={editCard} />)
					})}
				</div>
				<CreateCard onAddCard={addCard} />
			</div>
		</div>
	);
}

type State = {
	title: string
	cards: string[]
}

type ListProps = {
	title: string,
	listIndex: number,
	deleteList: (index:number) => void
}