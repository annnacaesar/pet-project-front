import FriendInfo from '../../data/sponsors.json';
import OurFriendList from 'components/OurFriends/OurFriendsList';

function OurFriendPage() {
  return <OurFriendList info={FriendInfo} />;
}
export default OurFriendPage;