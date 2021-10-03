import React, { useState, FunctionComponent } from 'react';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Card as CardComponent, CreateCard } from './';
import { SmallButton } from '../../styles/Button';
import { addCard as apiAddCard, deleteCard as apiDeleteCard, editCard as apiEditCard, getCards } from '../../lib/api';
import { useEffect } from 'react';

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

export const List: FunctionComponent<ListProps> = ({ title, _id, listIndex, deleteList }) => {
	const classes = useStyles();
	const [state, setState] = useState<State>({
		title: title,
		cards: []
	});

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const res = await getCards(_id);
		setState({
			...state,
			cards: res.data,
		});
	}

	async function addCard(value: string) {
		await apiAddCard(value, _id);
		getData();
	}
	async function deleteCard(index: number) {
		const cardID = state.cards[index]._id;
		await apiDeleteCard(cardID);
		getData();
	}

	async function editCard(index: number, value: string) {
		const cardID = state.cards[index]._id;
		await apiEditCard(cardID, value);
		getData();
	}

	function onDeleteSelf() {
		deleteList(_id);
	}

	return (
		<div className={classes.root}>
			<div className={classes.content}>
				<div className={classes.title}>
					<h3>{title}</h3>
					<SmallButton onClick={onDeleteSelf}>X</SmallButton>
				</div >
				<div className={classes.todos}>
					{state.cards.map((card, index) => {
						return (<CardComponent key={index} title={card.card_name} index={index} deleteCard={deleteCard} editCard={editCard} />)
					})}
				</div>
				<CreateCard onAddCard={addCard} />
			</div>
		</div>
	);
}

type State = {
	title: string
	cards: Card[]
}

type ListProps = {
	_id: string,
	title: string,
	listIndex: number,
	deleteList: (index:string) => void
}

type Card = {
	_id: string,
	list_id: string,
	card_name: string
}