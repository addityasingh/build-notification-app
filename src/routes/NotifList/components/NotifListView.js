import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'
import { darkBlack } from 'material-ui/styles/colors'
import AngelIcon from '../../../static/assets/angel.svg'
import UserAvatar from '../assets/avatar-128.jpg'
import {
  getBuildForUserRepo,
  getGithubRepos
} from '../../../api/travis-api'
import './NotifListView.scss'

class NotifListView extends Component {
	state = { data: []};

	componentWillMount () {
		getBuildForUserRepo('addi90', 'build-notification-app')
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
						leftAvatar={<Avatar src={AngelIcon} />} 
						primaryText={item.title}
						secondaryText={
								<p>
								{item.state}
								</p>
						}
					/>
				))
			}
		</List>)
	}
}

export default NotifListView
