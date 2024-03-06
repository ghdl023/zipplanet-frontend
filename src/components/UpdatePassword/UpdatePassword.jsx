import './UpdatePassword.scss';
function UpdatePassword(props) {
    return (
        <div className='update__password__container'>
            <div>비밀번호 재설정</div>
            <hr />
            <form>
                <div className='old__password'>
                    <label htmlFor='old__password'>현재 비밀번호</label>
                    <div>
                    <input type="password" name='old__password' placeholder='현재 비밀번호'/>
                    </div>
                </div>
                <div className='new__password'>
                    <label htmlFor='new__password'>새로운 비밀번호</label>
                    <div>
                    <input type="password" name='new__password' placeholder='8자리 이상 영문, 숫자, 특수문자 포함'/>
                    </div>
                    <div>
                    <input type="password" name='new__password__check' placeholder='비밀번호 확인'/>
                    </div>
                </div>
                <div className='update__submit__btn'>
                    <button type='button' onClick={()=>props.setModalControl(false)}>닫기</button>
                    <button type="submit" disabled={true}>변경</button>
                </div>
            </form>
        </div>
    )
}
export default UpdatePassword;