import UpdatePassword from '../UpdatePassword';
import UpdateNickname from '../UpdateNickname';
import UpdatePhone from '../UpdatePhone';
import UpdateAdress from '../UpdateAdress';
import './MyPageModalBody.scss';

function MyPageModalBody(props) {

    return (
        <div>
            {props.modalNo === 1 ?
            <UpdatePassword setModalControl={props.setModalControl}/> : 
            props.modalNo === 2 ?
            <UpdateNickname/> :
            props.modalNo === 3 ?
            <UpdatePhone/> :
            props.modalNo === 4 ?
            <UpdateAdress/> : ''}
        </div>
    );
}
export default MyPageModalBody;