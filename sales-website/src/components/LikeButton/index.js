import { useEffect } from 'react';

function LikeButton(props) {
    const { dataHref } = props;

    useEffect(() => {
        if (window.FB) {
            window.FB.XFBML.parse();
        }
    }, []);

    return (
        <div
            className="fb-like"
            data-href={dataHref}
            data-width=""
            data-layout="standard"
            data-action="like"
            data-size="small"
            data-share="true"
        ></div>
    );
}

export default LikeButton;
