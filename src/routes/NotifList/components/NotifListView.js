import React, { Component, PropTypes } from 'react'
import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'
import { darkBlack } from 'material-ui/styles/colors'
import AngelIcon from '../../../static/assets/angel.svg'
import UserAvatar from '../assets/avatar-128.jpg'
import {
  getGithubRepos
} from '../../../api/github-api'
import './NotifListView.scss'

class NotifListView extends Component {
	state = { data: []};

	componentWillMount () {
		const { userDetails: { login } } = this.props
		getGithubRepos(login)
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
						primaryText={item.name}
						secondaryText={
								<p>
								{item.html_url}
								</p>
						}
					/>
				))
			}
		</List>)
	}
}

NotifListView.propTypes = {
	userDetails: PropTypes.shape({
		name: PropTypes.string,
		login: PropTypes.string
	})
}

export default NotifListView
