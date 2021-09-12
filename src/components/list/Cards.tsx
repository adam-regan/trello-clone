import React, {FunctionComponent} from 'react';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { Card } from './Card';
import { CreateCard } from './CreateCard';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			width: '400px',
			backgroundColor: '#EBECF0',
			borderRadius: '5px',
			paddingBottom: '5px',
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

export const Cards: FunctionComponent<CardsProps> = ({ title, cardsList, deleteCard, editCard, onAddCard }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<div className={classes.title}>
				<h3>{title}</h3>
			</div >
			<div className={classes.todos}>
				{cardsList.map((value, index) => {
					return (<Card key={index} title={value} index={index} deleteCard={deleteCard} editCard={editCard} />)
				})}
			</div>
			<CreateCard onAddCard={onAddCard}/>
		</div>);
}

type CardsProps = {
	title: string,
	cardsList: string[],
	deleteCard: (index: number)=> void,
	editCard: (index: number, value: string) => void,
	onAddCard: (cardValue: string) => void
}