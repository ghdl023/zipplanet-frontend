import { useLocation } from 'react-router';
import './FindIdResult.scss';
import { useEffect, useState } from 'react';
import FindResult from '../../components/FindResult';

function FindIdResult() {
    const location = useLocation();
    const [findResult] = useState(location.state.result["data"]);
    useEffect(() => {
        console.log(location.state.result['data']);
    })

    return (
        <div className='findIdResult__container'>
            <FindResult result={findResult} />
        </div>
    );
}
export default FindIdResult;