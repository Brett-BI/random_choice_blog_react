import React from 'react';

class Loading extends React.Component {
    render() {
        return (
            <div className="d-flex flex-center w-100">
                <div className="w-50 text-center"><p style={{ 'fontSize': '2rem', 'fontWeight': 'bold', 'textAlign': 'center' }}>{ this.props.message ? this.props.message : "Thinking ..."}</p></div>
            </div>
        )
    }
}

export default Loading;