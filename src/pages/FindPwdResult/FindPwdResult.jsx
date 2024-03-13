import { useLocation, useNavigate } from 'react-router';
import FindResult from '../../components/FindResult';
import './FindPwdResult.scss';
import { useEffect, useState } from 'react';

function FindPwdResult() {
    const location =useLocation();
    const [findResult] = useState(location.state.result["data"]);
    const [count, setCount] = useState(10);
    const navigate = useNavigate();

    // setTimeout(()=> {
    //     window.location.href = '/zipplanet-frontend/login';
    // }, 10000)

    useEffect(() => {
        const id = setInterval(() => {
            setCount((count)=>count - 1);
        }, 1000);

        if (count === 0) {
            clearInterval(id);
            navigate('/zipplanet-frontend/login',{replace: true});
        }
        return () => clearInterval(id);
    },[count]);

    return(
        <div className='findPwdResult__container'>
            <h3>{count}초 후 로그인 화면으로 이동합니다.</h3>
            <FindResult result={findResult}/>
        </div>
    );
}
export default FindPwdResult;