import './UpdateNickname.scss';

function UpdateNickname(props) {
    return (
        <div className='update__nickname__container'>
            <div>닉네임 재설정</div>
            <hr />
            <form>
                <div className='old__nickname'>
                    <div className='update__nickname__header'>
                        <label htmlFor='old__nickname'>닉네임</label>
                        <div className='random__nickname'>
                            <button>랜덤추천</button>
                        </div>
                    </div>
                    <div className='input__nickname'>
                        <input type="text" name='old__nickname' placeholder='닉네임을 입력해주세요.' />
                    </div>
                </div>
                <div className='update__submit__btn'>
                    <button type='button' onClick={() => props.setModalControl(false)}>닫기</button>
                    <button type="submit" disabled={true}>변경</button>
                </div>
            </form>
        </div>
    );
}
export default UpdateNickname;