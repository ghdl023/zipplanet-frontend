import './PaginationButton.scss';

function PaginationButton(props) {

    const onClickPage = (e) => {
        props.setPageNo(e.target.value);
    }
    const pageHandler = (e) => {
        e.target.value === '<' && props.pageNo > 1 ? 
        props.setPageNo(parseInt(props.pageNo) - 1) :
        e.target.value === '>' && props.pageNo < props.pageCount ?
        props.setPageNo(parseInt(props.pageNo) + 1) : false;

    }

    return (
        <div className='pagination__container'>
            <input type="button" value={'<'} onClick={pageHandler} />
            <div>
            {[...Array(props.pageCount)].map((n, index) => {
                
                return (
                    <input type="button" 
                    key={index}
                    value={index+1}
                    onClick={onClickPage}
                    />
                );
            })}
            </div>
            <input type="button" value={'>'} onClick={pageHandler} />
        </div>
    );
}
export default PaginationButton;