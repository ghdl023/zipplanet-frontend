import Header from "../common/Header";
import Main from "../common/Main";
import './DefaultLayout.scss'

function DefaultLayout(){
    return(
        <div className="app-wrapper">
            <Header />
            <Main />
        </div>
    )
}

export default DefaultLayout;