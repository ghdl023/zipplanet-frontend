import { useState } from 'react';
import './FindResult.scss';
import { useNavigate } from 'react-router';
import CopyToClipboard from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';

function FindResult(props) {
    const [result] = useState(props.result);
    const navigate = useNavigate();
    const BASE_URL = import.meta.env.VITE_BASE_URL;

    return (
        <div className='findResult__wrapper'>
            <div className="findResult__box">
                <div className="findResult__header">
                    <h1>{result}</h1>
                </div>
                <div className="findResult__body">
                    <div className='findResult__form'>
                        <CopyToClipboard text={result}><button className='btn__copy' onClick={()=>toast.success('클립보드 복사 완료!')}>클립보드로 복사</button></CopyToClipboard>
                        <button className='btn__login' onClick={()=>navigate(`${BASE_URL}login`)}>로그인 하러가기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default FindResult;