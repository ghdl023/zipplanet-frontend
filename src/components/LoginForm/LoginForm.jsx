import './LoginForm.scss';
function LoginFrom() {
    return (
        <div className='login__wrapper'>
        <div className="login__box">
            <div className="login__header">
                <h1>로그인</h1>
                <h4>지금 로그인해서 리뷰를 작성해보세요!</h4>
            </div>
            <div className="login__body">
                <form>
                    <div>
                    <input name="user_id" type="text" placeholder="아이디" />
                    </div>
                    <div>
                    <input name="password" type="password" placeholder="비밀번호" />
                    </div>
                    <button>로그인</button>
                </form>
                <div className='search__nav'>
                    <a href="">아이디찾기</a>
                    <a href="">비밀번호찾기</a>
                </div>
            </div>
        </div>
        </div>
    );
}
export default LoginFrom;