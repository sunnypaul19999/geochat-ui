import 'stylesheet/ui-toolbar/ui-toolbar.css';

import geoChatLogo from 'asset/image/geo-chat-logo.png';


import defualtProfilePic from 'asset/image/default-profile-image.png';

export function UIToolbar() {

    return (
        <div className="component-ui-toolbar">
            <div className="card">
                <div className="card-body">
                    <div className="row g-0">
                        <div className="col">
                            <div className="hstack">
                                <span id="geoChatLogo">
                                    <img src={geoChatLogo} title="Geo Chat" />
                                </span>
                                <span id="appName">
                                    <h6 className="card-title text-muted"><b>Geo Chat</b></h6>
                                </span>
                                <span id="userProfile">
                                    <img src={defualtProfilePic} title="Profile" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}