import React, { useState, FunctionComponent } from 'react';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { isOnlySpaces } from '../../utils';
import { SmallButton } from '../../styles/Button';


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			minHeight: 50,
			backgroundColor: 'white',
			borderRadius: '5px',
			marginTop: '2px',
			marginBottom: '2px',
		},
			content: {
				display: 'flex',
				justifyContent: 'space-between',
				width: '386px'
			}
	}));

export const Card: FunctionComponent<CardProps> = ({ title, deleteCard, editCard, index }) => {
	const classes = useStyles();
	const defaultState = {
		editting: false,
		editValue: undefined
	};
	const [state, setState] = useState<State>(defaultState);

	function onClickEdit() {
		setState({ ...state, editting: true, editValue: title });
	}
	function onClickDelete() {
		deleteCard(index);
	}
	function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		setState({ ...state, editValue: e.target.value })
	}
	function onSave() {
		editCard(index, state.editValue as string);
		setState(defaultState);
	}

	function onClickCancel() {
		setState({ ...state, editting: false });
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.code === 'Enter') {
			onSave();
		}
	}

	function getStaticView() {
		return (
			<div className={classes.content}>
				<div className={classes.root}>
					<p >{title}</p>
				</div>
				<div className={classes.root}>
					<SmallButton type='submit' onClick={onClickEdit}>Edit</SmallButton>
					<SmallButton type='submit' onClick={onClickDelete}>Delete</SmallButton>
				</div>
			</div>
		);
	}

	function isSaveDisabled() {
		return isOnlySpaces(state.editValue);
	}

	function getEditView() {
		return (
			<div className={classes.content}>
				<div>
					<input type="text" onChange={onChange} onKeyDown={handleKeyDown} value={state.editValue}></input>
				</div>
				<div>
					<SmallButton type='submit' onClick={onSave} disabled={isSaveDisabled()}>Save</SmallButton>
					<SmallButton type='submit' onClick={onClickCancel}>Cancel</SmallButton>
				</div>
			</div>
		);
	}

	return (
		<div className={classes.root}>
			{state.editting ? getEditView() : getStaticView()}
		</div>);
}

type CardProps = {
	index: number,
	title: string,
	deleteCard: (index: number) => void,
	editCard: (index: number, value: string) => void
}

type State = {
	editting: boolean,
	editValue: undefined | string
}
