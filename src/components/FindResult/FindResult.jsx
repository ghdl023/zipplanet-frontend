import { useEffect, useState } from 'react';
import './FindResult.scss';
import { useNavigate } from 'react-router';
import CopyToClipboard from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';

function FindResult(props) {
    const [result, setResult] = useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        if(Object.keys(props).includes('userId')){
            setResult(props.userId);
        } else if (Object.keys(props).includes('userPwd')){
            setResult(props.userPwd);
        }
    }, [])

    

    return (
        <div className='findResult__wrapper'>
            <div className="findResult__box">
                <div className="findResult__header">
                    <h1>{result}</h1>
                </div>
                <div className="findResult__body">
                    <div className='findResult__form'>
                        <CopyToClipboard text={result}><button className='btn__copy' onClick={()=>toast.success('클립보드 복사 완료!')}>클립보드로 복사</button></CopyToClipboard>
                        <button className='btn__login' onClick={()=>location.href = '/zipplanet-frontend/login'}>로그인 하러가기</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default FindResult;