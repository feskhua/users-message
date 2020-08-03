import React, { PureComponent } from 'react';
import pt from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class ContactInfo extends PureComponent {
  static propTypes = {
    classes: pt.object.isRequired,
    loadContactInfo: pt.func.isRequired,
    match: pt.object.isRequired,
    activeContact: pt.object,
  };
  static defaultProps = {
    activeContact: null,
  };

  componentDidMount() {
    const { match } = this.props;
    this.props.loadContactInfo(match.params.contactId);
  }

  isMatch = () => {
    const { activeContact, match } = this.props;
    return (
      activeContact &&
      activeContact.id.toString() === match.params.contactId.toString()
    );
  };

  render() {
    if (!this.isMatch()) {
      return null;
    }
    const {
      emailAddress = '',
      phoneNumber = '',
      productName = '',
      prospectName = '',
    } = this.props.activeContact;

    return (
      <Card>
        <CardContent>
          <Typography>Email: {emailAddress}</Typography>
          <Typography>Phone number: {phoneNumber}</Typography>
          <Typography>Product name: {productName}</Typography>
          <Typography>Prospect name: {prospectName}</Typography>
        </CardContent>
      </Card>
    );
  }
}

export default ContactInfo;
