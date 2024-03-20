import UpdatePassword from '../UpdatePassword';
import UpdateNickname from '../UpdateNickname';
import UpdatePhone from '../UpdatePhone';
import UpdateAdress from '../UpdateAdress';
import './MyPageModalBody.scss';
import DeleteUser from '../DeleteUser/DeleteUser';
import DeleteMyReview from '../DeleteMyReview';

function MyPageModalBody(props) {

    return (
        <div>
            {props.modalNo === 1 ?
            <UpdatePassword setModalControl={props.setModalControl}/> : 
            props.modalNo === 2 ?
            <UpdateNickname setModalControl={props.setModalControl}/> :
            props.modalNo === 3 ?
            <UpdatePhone setModalControl={props.setModalControl}/> :
            props.modalNo === 4 ?
            <UpdateAdress setModalControl={props.setModalControl}/> :
            props.modalNo === 5 ?
            <DeleteUser setModalControl={props.setModalControl}/> : 
            props.modalNo === 6 ?
            <DeleteMyReview setModalControl={props.setModalControl} 
                            review={props.review}
                            onClickDelete={props.onClickDelete}/> : 
            props.modalNo === 7 ? props.children : ''}
        </div>
    );
}
export default MyPageModalBody;