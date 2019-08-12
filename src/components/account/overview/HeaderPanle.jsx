import React from 'react';

class HeaderPanel extends React.Component {
    render() {
        const str = localStorage.getItem('user') || {};
        const { name } = JSON.parse(str);
        return (
            <div className="header-container">
                <div className="header-welcome">您好,用户{name}</div>
            </div>)
    }
}

export default HeaderPanel;
