import React, {useState, FunctionComponent} from 'react';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Cards } from './';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			paddingLeft: '10px',
			paddingTop: '10px',
			paddingBottom: '10px',
		}
	}));

export const List: FunctionComponent<ListProps> = ({title}) => {
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

	return (
		<div className={classes.root}>
			<Cards
				title={state.title}
				cardsList={state.cards}
				deleteCard={deleteCard}
				editCard={editCard}
				onAddCard={addCard} />
		</div>
	);
}

type State = {
	title: string
	cards: string[]
}

type ListProps = {
	title: string,
	listIndex: number
}