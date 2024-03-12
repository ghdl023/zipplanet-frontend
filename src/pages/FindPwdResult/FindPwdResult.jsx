import { useLocation } from 'react-router';
import FindResult from '../../components/FindResult';
import './FindPwdResult.scss';
import { useEffect, useState } from 'react';

function FindPwdResult() {
    const location =useLocation();
    const [findResult] = useState(location.state.result["data"]);

    useEffect(() => {
        setTimeout(()=> {
            window.location.href = '/zipplanet-frontend/login';
        }, 10000)
    },[]);

    return(
        <div className='findPwdResult__container'>
            <h3>10초 후 로그인 화면으로 이동합니다.</h3>
            <FindResult userPwd={findResult}/>
        </div>
    );
}
export default FindPwdResult;