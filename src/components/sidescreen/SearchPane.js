// ---------------------------------------- TO DO ----------------------------------------
// inputbox onSubmt prevent default
// duplicate/modify filter_function and render clients on search as well
// unified form of convention among all files => functions vs variable names
// onfocus search item broken

'use babel';

import React from 'react';
import { SelectableGroup, createSelectable } from 'react-selectable';
import SearchItem from './SearchItem';

const SelectableItem = createSelectable(SearchItem);

function filter_function(query){
	return function(obj){
		let max_letter = 2  //option to change on admin panel?
		let concat_name = `${obj.FirstName.toLowerCase()}${obj.LastName.toLowerCase()}`.replace(/ /g,'') // trim this maybe?
		return (obj.AnimalName.toLowerCase().includes(query.toLowerCase()) || obj.FirstName.toLowerCase().includes(query.toLowerCase()) || obj.LastName.toLowerCase().includes(query.toLowerCase()) || concat_name.includes(query.toLowerCase().replace(/ /g,'')))
		&& (query.length > max_letter || (obj.AnimalName === max_letter || obj.FirstName === max_letter || obj.LastName === max_letter))
		&& obj;
		// test to confirm if this works on 2 letter matching queries
	}
}

function query_match(obj, query){
	obj.toLowerCase.includes(query.toLowerCase())
}

export default class SearchPane extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			list : this.props.dogs,
			query : this.props.query,
			test : this.props.test,
			selectedKeys : [],
			fix_css : []
		}

		this.searchHandler = this.searchHandler.bind(this)
		this.handleSelection = this.handleSelection.bind(this)
	}

	handleSelection (selectedKeys) {
		if(this.state.fix_css.length > 0) {
			this.state.fix_css[0].className = "item"
			this.state.fix_css = []
		}
		this.state.selectedKeys = selectedKeys
		this.props.show(this.state.selectedKeys.map(key => this.state.list[key]))
	}

	searchHandler(event){
		this.setState({
			query : event.target.value
		})
	}

	//use property initializer syntax instead!
	handleClick(index, e) {
		//use event.currentTarget.className to manually edit css
		if(this.state.fix_css.length > 0) {
			this.state.fix_css[0].className = "item"
			this.state.fix_css = []
		}
		e.currentTarget.childNodes[0].className += " selected"
		this.state.fix_css.push(e.currentTarget.childNodes[0])
		this.state.selectedKeys = []
		this.state.selectedKeys.push(this.state.list[index])
		this.props.show(this.state.selectedKeys)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps){
			this.setState({
					list: nextProps.dogs,
					query : nextProps.query
			})
		}
	}

	render() {
		let {query, list} = this.state;
		// abbreviation for
		// query = this.state.query
		// list = this.state.list

		if (!list)
			list = []

		//can use array index for as unique div key as well
		//<button className = "searchClose" onClick = {this.props.side}> x </button>
		return (
			<div>
				<div className = "box search"><h3>Search</h3>
					
					<SelectableGroup onSelection={this.handleSelection} >
						{
							list.filter(filter_function(query)).map(obj => //arrow function instead
							 	<div className = "searchItem" tabIndex = {1} key = {obj.AnimalID} onClick = {(e) => this.handleClick(list.indexOf(obj), e)}>
							 	<SelectableItem
									key = {obj.AnimalID}
									selectableKey = {list.indexOf(obj)}
									selected = {this.state.selectedKeys.includes(list.indexOf(obj))}
									FirstName = {obj.FirstName}
									LastName = {obj.LastName}
									AnimalName = {obj.AnimalName}
									Breed = {obj.Breed}/
								>
								</div>
							)
						}
					</SelectableGroup>
				</div>
			</div>
		);
	}
}
