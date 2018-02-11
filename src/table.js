import React, { Component } from 'react';

class App extends Component {

	render() {
		console.log(this.props.data);
		var cells;
		return <table>
			<thead>
				<tr>
					<th>reg name</th>
					<th>ID</th>
					<th>Contact</th>
					<th>Longitude</th>
					<th>Latitude</th>
					<th>Timeout</th>
					<th>ETA</th>
				</tr>
			</thead>
			<tbody>{
				this.props.data.map((elem, index) => {
					return <tr key={'row'+index}>
						{
						elem.map(el => {
							return <td key={index++}>{el}</td>
						})
					}
					</tr>
				})
			}
			</tbody>
		</table>
	}
}
export default App;
