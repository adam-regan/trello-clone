import React, { useState, FunctionComponent } from 'react';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { TodoType } from '../types';
import { isOnlySpaces } from '../utils';
import { SmallButton } from '../styles/Button';


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

export const Todo: FunctionComponent<TodoProps> = ({ todo, deleteTodo, editTodo, setTodoComplete, index }) => {
	const classes = useStyles();
	const defaultState = {
		editting: false,
		editValue: undefined
	};
	const [state, setState] = useState<State>(defaultState);

	function onClickEdit() {
		setState({ ...state, editting: true, editValue: todo.todo });
	}
	function onClickDelete() {
		deleteTodo(index);
	}
	function onChange(e: React.ChangeEvent<HTMLInputElement>) {
		setState({ ...state, editValue: e.target.value })
	}
	function onSave() {
		editTodo(index, state.editValue as string);
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

	function onCheckboxClicked() {
		setTodoComplete(index, !todo.complete)
	}

	function getStaticView() {
		return (
			<div className={classes.content}>
				<div className={classes.root}>
					<input type="checkbox" id="todo-checkbox" checked={todo.complete} onChange={onCheckboxClicked} />
					<p >{todo.todo}</p>
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
					<input type="text" id="todo-edit-input" onChange={onChange} onKeyDown={handleKeyDown} value={state.editValue}></input>
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

type TodoProps = {
	todo: TodoType,
	deleteTodo: (index: number) => void,
	editTodo: (index: number, value: string) => void,
	setTodoComplete: (index: number, isComplete: boolean) => void,
	index: number
}

type State = {
	editting: boolean,
	editValue: undefined | string
}
