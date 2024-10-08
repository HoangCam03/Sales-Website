import Header from '../compoents/Header';

function HeaderOnly() {
    return (
        <div>
            <Header></Header>
            <div className="container">
                <div className="content"></div>
            </div>
        </div>
    );
}

export default HeaderOnly;
