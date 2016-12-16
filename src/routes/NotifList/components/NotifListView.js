import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'
import { darkBlack } from 'material-ui/styles/colors'
import UserAvatar from '../assets/avatar-128.jpg'
import {
  getBuildForUserRepo,
  getGithubRepos
} from '../../../api/travis-api'
import './NotifListView.scss'

class NotifListView extends Component {
	constructor() {
		super()
		this.state = { data: []};
	}

	componentWillMount () {
		getGithubRepos('addi90', 'build-notification-app')
			.then(data => this.setState({ data }))
			.catch(err => console.log('data fetch failed with error ', err))
	}

	render () {
		const { data } = this.state

		return (<List>
			{
				data.map((item, id) => (
					<ListItem
						key={id}
						leftAvatar={<Avatar src={UserAvatar} />} 
						primaryText={item.name}
						secondaryText={
								<p>
								{item.description}
								</p>
						}
					/>
				))
			}
		</List>)
	}
}

export default NotifListView
