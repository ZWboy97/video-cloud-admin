import React from 'react';
import { Row, Col,Input } from 'antd';

const {TextArea}=Input;
class Professional extends React.Component {


    render() {
        return (
            <div>
                <Row >
                    <Col span={16} offset={4}>
               <div className="means-title">直播推流地址</div>
               <div className="address-style">
               <TextArea 
               value="hwoeifnskfniowefhjkalsmoiejdbhluiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiid"
               row={5}/>
               </div>
           </Col>
           </Row>
            </div>

        )
    }

}

export default Professional;