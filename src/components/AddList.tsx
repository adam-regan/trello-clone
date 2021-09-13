import React, { useState, FunctionComponent } from 'react';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Button, TextField } from '../styles';
import { isOnlySpaces } from '../utils';
import { SmallButton } from '../styles/Button';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			flexDirection: 'column',
		}
	}));

export const AddList: FunctionComponent<AddListProps> = ({ onAddList }) => {
	const classes = useStyles();

	const defaultState = {
		input: '',
		adding: false
	};

	const [state, setState] = useState(defaultState);

	function onAddClicked() {
		setState({
			...state,
			adding: true
		});
	}

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

	function isSubmitDisabled() {
		return isOnlySpaces(state.input);
	}

	function onSubmit() {

		onAddList(state.input);
		setState({
			...state,
			input: '',
		});
	}

	function onCancel() {
		setState(defaultState);
	}

	function getStaticView() {
		return (
			<>
				<Button type='submit' onClick={onAddClicked} >+ Add List</Button>
			</>
		);
	}

	function getAddingView() {
		return (
			<>
				<TextField onChange={onChange} onKeyDown={handleKeyDown} value={state.input} autoFocus autoComplete='off'></TextField>
				<div>

					<Button type='submit' onClick={onSubmit} disabled={isSubmitDisabled()}>Add List</Button>
					<SmallButton type='submit' onClick={onCancel} >X</SmallButton>
				</div>
			</>
		);
	}

	return (
		<div className={classes.root}>
			{state.adding ? getAddingView() : getStaticView()}
		</div>
	);
}

type AddListProps = {
	onAddList: (title: string) => void
}



