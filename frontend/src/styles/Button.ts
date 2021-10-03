import { styled } from '@material-ui/core/styles';
import MaterialButton from '@material-ui/core/Button';

const defaultStyle = {
	background: '#4B94CC',
	border: 0,
	borderRadius: 3,
	boxShadow: '0 3px 5px 2px rgba(54, 73, 88, .3)',
	color: 'white',
	maxWidth: 120,
	width: 150,
	height: 30,
	margin: 2
};

export const Button = styled(MaterialButton)(defaultStyle);

export const SmallButton = styled(MaterialButton)({
	...defaultStyle,
	maxWidth: 80,
	width: 80,
});