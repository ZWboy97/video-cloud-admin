import React from 'react';

/**
 * 页面容器组件
 */
class Page extends React.Component {
    render() {
        return (
            <div style={{ height: '100%' }}>
                {this.props.children}
            </div>
        )

    }
}

export default Page;