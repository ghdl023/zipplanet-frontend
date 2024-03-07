import './RegisterForm.scss';
function RegisterForm() {
    return (
        <div className='register__wrapper'>
        <div className="register__box">
            <div className="register__header">
                <h1>회원가입</h1>
                <h4>지금 회원가입해서 리뷰를 작성해보세요!</h4>
            </div>
            <div className="register__body">
                <form>
                    <div>
                    <input name="user_id" type="text" placeholder="아이디" />
                    </div>
                    <div>
                    <input name="password" type="password" placeholder="비밀번호" />
                    </div>
                    <div>
                    <input name="password_check" type="password" placeholder="비밀번호 확인" />
                    </div>
                    <div>
                    <input name="phone" type="text" placeholder="휴대폰번호(-제외)" />
                    </div>
                    <button>회원가입</button>
                </form>
            </div>
        </div>
        </div>
    );
}
export default RegisterForm;