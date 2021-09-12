import React, {FunctionComponent} from 'react';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { TodoType } from '../types';
import { Todo } from './Todo';
import { SmallButton } from '../styles/Button';
import { Filters } from './Filters';
import { useState } from 'react';
import { CreateTodo } from './CreateTodo';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			width: '400px',
			backgroundColor: '#EBECF0',
			borderRadius: '5px',
			paddingBottom: '5px'
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

export const Todos: FunctionComponent<TodosProps> = ({ todoList, deleteTodo, editTodo, setTodoComplete, onFilterSelected, currentFilter, onAddTodo }) => {
	const classes = useStyles();
	const [state, setState] = useState({
		optionsOpen: false
	});

	function onOptionsClick() {
		setState({
			...state,
			optionsOpen: true
		});
	}

	function closeFilters() {
		setState({
			...state,
			optionsOpen: false
		});
	}

	return (
		<div className={classes.root}>
			<div className={classes.title}>
				<h3>To Do</h3>
				<SmallButton type='submit' onClick={onOptionsClick} disabled={state.optionsOpen}>...</SmallButton>
				{state.optionsOpen && <Filters onFilterSelected={onFilterSelected} currentFilter={currentFilter} closeFilters={closeFilters} />}
			</div >
			<div className={classes.todos}>
				{todoList.map((todo, index) => {
					return (<Todo key={index} todo={todo} index={index} deleteTodo={deleteTodo} editTodo={editTodo} setTodoComplete={setTodoComplete} />)
				})}
			</div>
			<CreateTodo onAddTodo={onAddTodo}/>
		</div>);
}

type TodosProps = {
	todoList: TodoType[],
	deleteTodo: (index: number)=> void,
	editTodo: (index: number, value: string) => void,
	setTodoComplete: (index: number, isComplete: boolean) => void,
	onFilterSelected: (type: symbol)=>void,
	currentFilter: symbol,
	onAddTodo: (todo: TodoType) => void
}