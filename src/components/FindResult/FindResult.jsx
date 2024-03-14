import { useState } from 'react';
import { useNavigate } from 'react-router';
import CopyToClipboard from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';
import './FindResult.scss';

function FindResult(props) {
    const [result] = useState(props.result);
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    return (
        <div className='login__wrapper'>
            <div className="login__box">
                <div className="login__header">
                    <h1>{result}</h1>
                </div>
                <div className="login__body">
                    <div className='login__form'>
                        <CopyToClipboard text={result}><button className='btn__copy' onClick={()=>toast.success('클립보드 복사 완료!')}>클립보드로 복사</button></CopyToClipboard>
                        <button className='btn__login' onClick={()=>navigate(`${BASE_URL}login`)}>로그인 하러가기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default FindResult;