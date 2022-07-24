
export function RightWindow(props) {

    const getChildrens = () => {

        if (props.children) {

            return props.children;

        }


        return <></>;
    }

    return (
        <div className="right-window" id="rightWindow">

            {props.children}

        </div>
    );
}