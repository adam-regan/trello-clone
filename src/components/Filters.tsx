import React, {FunctionComponent, useEffect, useRef} from 'react';
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Button } from '../styles/Button';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			flexDirection: 'column',
			backgroundColor: 'white',
			padding: '2px',
			position: 'fixed',
			zIndex: 1,
			marginLeft: '305px',
			marginTop: '147px'
		}
	}));

export const FILTER_TYPES = {
	ALL: Symbol('ALL'),
	ACTIVE: Symbol('ACTIVE'),
	COMPLETE: Symbol('COMPLETE')
};

export const Filters: FunctionComponent<FiltersProps> = ({ onFilterSelected, currentFilter, closeFilters }) => {
	const classes = useStyles();
	const rootRef = useRef<HTMLDivElement>(null);
	const filters: FilterType[] = [
		{ label: 'All', type: FILTER_TYPES.ALL },
		{ label: 'Active', type: FILTER_TYPES.ACTIVE },
		{ label: 'Completed', type: FILTER_TYPES.COMPLETE },
	];

	useEffect(() => {
		document.addEventListener("mousedown", handleClick);
		return () => {
		  document.removeEventListener("mousedown", handleClick);
		};
	  }, []);

	  function handleClick(e: MouseEvent) {
		if (!(rootRef.current! as any).contains(e.target)) {
			closeFilters()
		  }
	  }


	return (
		<div className={classes.root} ref={rootRef}>
			{filters.map((filter: FilterType, index: number) => {
				return (<Button 
					key={index} 
					type='submit' 
					disabled={filter.type === currentFilter} 
					onClick={() => { onFilterSelected(filter.type); closeFilters(); }} >
						{filter.label}
					</Button>
				)
			})}
		</div>);

}

type FiltersProps = {
	onFilterSelected: (type: symbol) => void,
	currentFilter: symbol,
	closeFilters: ()=> void
}

type FilterType = {
	label: string,
	type: symbol,
}
