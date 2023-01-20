import React from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';

const HorizontalScrolling = () => {
  	return (
		<ScrollMenu LeftArrow={null} RightArrow={null}>
			{data.map(({ id, name }) => (
				<Card
					id={id}
					name={name}
					key={id}
				/>
			))}
		</ScrollMenu>
  	)
}

const Card = ({ name, id }) => {
  	const visibility = React.useContext(VisibilityContext);
  	return (
		<div style={{width: '160px', height: '200px'}}>
			<div>{name}</div>
			<div>visible: {JSON.stringify(!!visibility.isItemVisible(id))}</div>
		</div>
  	)
}

export default HorizontalScrolling

const data = [
	{
	  "id": 1023345325,
	  "date": "2023-01-20T11:11:55.788805Z",
	  "name": "Test Name 1"
	},
	{
	  "id": 1023345325,
	  "date": "2023-01-20T11:11:55.788805Z",
	  "name": "Test Name 2"
	},
	{
	  "id": 1023345325,
	  "date": "2023-01-20T11:11:55.788805Z",
	  "name": "Test Name 3"
	},
	{
	  "id": 1023345325,
	  "date": "2023-01-20T11:11:55.788805Z",
	  "name": "Test Name 4"
	},
	{
	  "id": 1023345325,
	  "date": "2023-01-20T11:11:55.788805Z",
	  "name": "Test Name 5"
	},
	{
	  "id": 1023345325,
	  "date": "2023-01-20T11:11:55.788805Z",
	  "name": "Test Name 6"
	},
	{
	  "id": 1023345325,
	  "date": "2023-01-20T11:11:55.788805Z",
	  "name": "Test Name 7"
	},
	{
	  "id": 1023345325,
	  "date": "2023-01-20T11:11:55.788805Z",
	  "name": "Test Name 9"
	},
	{
	  "id": 1023345325,
	  "date": "2023-01-20T11:11:55.788805Z",
	  "name": "Test Name 10"
	}
  ]