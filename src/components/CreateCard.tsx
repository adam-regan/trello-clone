
import React, { useState, FunctionComponent } from 'react';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { isOnlySpaces } from '../utils';
import {Button, TextField} from '../styles';
import { SmallButton } from '../styles/Button';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			flexDirection: 'row'
		}
	}));

export const CreateCard: FunctionComponent<CreateCardProps> = ({ onAddCard }) => {
	const classes = useStyles();

	const defaultState = {
		input: '',
		adding: false,
	};
	const [state, setState] = useState<State>(defaultState);

	function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		setState({
			...state,
			input: e.target.value
		});
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.code === 'Enter' && !isSubmitDisabled()) {
			onSubmit();
		}
	}

	function onSubmit() {

		onAddCard(state.input);
		setState({
			...state,
			input: '',
		});
	}

	function isSubmitDisabled() {
		return isOnlySpaces(state.input);
	}

	function onAdd() {
		setState({
			...state,
			adding: true
		});
	}

	function onCancel() {
		setState(defaultState);
	}

	function getDefaultView() {
		return (
			<>
				<Button type='submit' onClick={onAdd}>+ Add a Card</Button>
			</>
		);
	}

	function getAddingView() {
		return (
			<>
				<TextField onChange={onChange} onKeyDown={handleKeyDown} value={state.input} autoFocus autoComplete='off'></TextField>
				<Button type='submit' onClick={onSubmit} disabled={isSubmitDisabled()}>Add Card</Button>
				<SmallButton type='submit' onClick={onCancel} >X</SmallButton>
			</>
		);
	}


	return (
		<div className={classes.root}>
			{state.adding ? getAddingView() : getDefaultView()}
		</div>);
}

type CreateCardProps = {
	onAddCard: (value: string) => void
}

type State = {
	input: string,
	adding: boolean
}