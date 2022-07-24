import 'stylesheet/ui-toolbar/ui-toolbar.css';

import geoChatLogo from 'asset/image/geo-chat-logo.png';


import defualtProfilePic from 'asset/image/default-profile-image.png';

export function UIToolbar() {

    return (
        <div class="component-ui-toolbar">
            <div class="card">
                <div class="card-body">
                    <div class="row g-0">
                        <div class="col">
                            <div class="hstack">
                                <span id="geoChatLogo">
                                    <img src={geoChatLogo} title="Geo Chat" />
                                </span>
                                <span id="appName">
                                    <h6 class="card-title text-muted"><b>Geo Chat</b></h6>
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