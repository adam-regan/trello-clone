import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import {  Todos, FILTER_TYPES } from './components';
import { TodoType } from './types';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flex: 1,
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			width: '100vw',
			height: '100vh',
			marginLeft: 'auto',
			marginRight: 'auto',
			backgroundColor: '#0479BE',
			borderRadius: '5px'
		}
	}));

export const App = () => {
	const classes = useStyles();
	const [state, setState] = useState<State>({
		todoList: [],
		filteredList: [],
		filter: FILTER_TYPES.ALL
	});

	function setFilteredList(type: symbol) {
		setState({
			...state,
			filteredList: getFilteredList(state.todoList, type),
			filter: type
		});
	}

	function getFilteredList(list = state.todoList, newFilter?: symbol) {
		const filter = newFilter || state.filter;
		switch (filter) {
			case FILTER_TYPES.ALL:
				return list;
			case FILTER_TYPES.ACTIVE:
				return list.filter((todo: TodoType) => !todo.complete);
			case FILTER_TYPES.COMPLETE:
				return list.filter((todo: TodoType) => todo.complete);
			default:
				throw new Error('Not using a genuine filter!');
		}
	}

	function addTodo(todo: TodoType) {
		const newList = state.todoList.concat([todo]);
		setState({
			...state,
			todoList: newList,
			filteredList: getFilteredList(newList)
		});
	}
	function deleteTodo(index: number) {
		const todoListCopy = [...state.todoList];
		todoListCopy.splice(index, 1);
		setState({
			...state,
			todoList: todoListCopy,
			filteredList: getFilteredList(todoListCopy)
		})
	}

	function editTodo(index: number, value: string) {
		const todoListCopy = [...state.todoList];
		todoListCopy[index].todo = value;
		setState({
			...state,
			todoList: todoListCopy
		})
	}

	function setTodoComplete(index: number, isComplete: boolean) {
		const todoListCopy = [...state.todoList];
		todoListCopy[index].complete = isComplete;
		setState({
			...state,
			todoList: todoListCopy,
			filteredList: getFilteredList(todoListCopy)
		})
	}


	return (
		<div className={classes.root}>
			<CssBaseline />
			<Todos 
				todoList={state.filteredList}
				deleteTodo={deleteTodo} 
				editTodo={editTodo} 
				setTodoComplete={setTodoComplete}
				onFilterSelected={setFilteredList}
				currentFilter={state.filter} 
				onAddTodo={addTodo}/>
		</div>
	);
}

type State = {
	todoList: Array<TodoType>,
	filteredList: Array<TodoType>,
	filter: symbol
}
