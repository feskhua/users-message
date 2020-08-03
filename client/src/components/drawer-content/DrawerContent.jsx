import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ContactsIcon from '@material-ui/icons/Contacts';
import BarChartIcon from '@material-ui/icons/BarChart';
import ChatIcon from '@material-ui/icons/Chat';

const content = [
  { label: 'Conversations', link: '/conversations', icon: ChatIcon },
  { label: 'Contacts', link: '/contacts', icon: ContactsIcon },
  { label: 'Analytics', link: '/analytics', icon: BarChartIcon },
];

function DrawerContent() {
  return (
    <List>
      {content.map(({ label, link, icon: Icon }) => (
        <ListItem button component={Link} to={link} key={label}>
          <ListItemIcon>
            <Icon />
          </ListItemIcon>
          <ListItemText primary={label} />
        </ListItem>
      ))}
    </List>
  );
}

export default memo(DrawerContent);
