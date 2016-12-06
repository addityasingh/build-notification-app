import React from 'react'
import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'
import { darkBlack } from 'material-ui/styles/colors'
import UserAvatar from '../assets/avatar-128.jpg'
import './NotifListView.scss'

export const NotifListView = () => {
  const list = [1, 2, 3, 4, 5]

	return (<List>
        {
            list.map(item => (
                <ListItem
                    key={item}
                    leftAvatar={<Avatar src={UserAvatar} />} 
                    primaryText="Build #2"
                    secondaryText={
                        <p>
                        <span style={{color: darkBlack}}>Brendan Lim</span> --
                        I&apos;ll be in your neighborhood doing errands this weekend. Do you want to grab brunch?
                        </p>
                    }
                />
            ))
        }
    </List>)
}

export default NotifListView
