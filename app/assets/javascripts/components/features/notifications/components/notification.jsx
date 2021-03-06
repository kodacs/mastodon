import PureRenderMixin from 'react-addons-pure-render-mixin';
import ImmutablePropTypes from 'react-immutable-proptypes';
import StatusContainer from '../../../containers/status_container';
import AccountContainer from '../../../containers/account_container';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router';

const messageStyle = {
  padding: '8px 10px',
  paddingBottom: '0',
  cursor: 'default',
  color: '#d9e1e8',
  fontSize: '15px'
};

const linkStyle = {
  fontWeight: '500'
};

const Notification = React.createClass({

  propTypes: {
    notification: ImmutablePropTypes.map.isRequired
  },

  mixins: [PureRenderMixin],

  renderFollow (account, link) {
    return (
      <div className='notification'>
        <div style={messageStyle}><i className='fa fa-fw fa-user-plus' style={{ color: '#2b90d9' }} /> <FormattedMessage id='notification.follow' defaultMessage='{name} followed you' values={{ name: link }} /></div>
        <AccountContainer id={account.get('id')} withNote={false} />
      </div>
    );
  },

  renderMention (notification) {
    return <StatusContainer id={notification.get('status')} />;
  },

  renderFavourite (notification, link) {
    return (
      <div className='notification'>
        <div style={messageStyle}><i className='fa fa-fw fa-star' style={{ color: '#ca8f04' }} /> <FormattedMessage id='notification.favourite' defaultMessage='{name} favourited your status' values={{ name: link }} /></div>
        <StatusContainer id={notification.get('status')} muted={true} />
      </div>
    );
  },

  renderReblog (notification, link) {
    return (
      <div className='notification'>
        <div style={messageStyle}><i className='fa fa-fw fa-retweet' style={{ color: '#2b90d9' }} /> <FormattedMessage id='notification.reblog' defaultMessage='{name} reblogged your status' values={{ name: link }} /></div>
        <StatusContainer id={notification.get('status')} muted={true} />
      </div>
    );
  },

  render () {
    const { notification } = this.props;
    const account          = notification.get('account');
    const displayName      = account.get('display_name').length > 0 ? account.get('display_name') : account.get('username');
    const link             = <Link className='notification__display-name' style={linkStyle} to={`/accounts/${account.get('id')}`}>{displayName}</Link>;

    switch(notification.get('type')) {
      case 'follow':
        return this.renderFollow(account, link);
      case 'mention':
        return this.renderMention(notification);
      case 'favourite':
        return this.renderFavourite(notification, link);
      case 'reblog':
        return this.renderReblog(notification, link);
    }
  }

});

export default Notification;
