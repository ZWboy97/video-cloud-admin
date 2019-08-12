import {Table} from 'antd';
import React, {Component} from 'react';
import {connectAlita} from 'redux-alita';
import BreadcrumbCustom from "../../BreadcrumbCustom";

const props = {

}
const data_src = []
class PlayList extends Component {
    constructor(props) {
        super(props)
    }
    state = {
        subData:{}

    }
    // onExpand = (expanded, record) => {
    //     if (expanded === false) {
    //
    //         console.log("合并！");
    //         this.setState({
    //             subTabData: {
    //                 ...this.state.subTabData,
    //                 [record.id]: [] ,
    //             }
    //         });
    //     } else {
    //         console.log("展开！");
    //
    //         this.setState({
    //             subTabData: {
    //                 ...this.state.subTabData,
    //                 [record.id]: tmp_data ,
    //             }
    //         });
    //         console.log("返回数据(PlanList):", this.state.subTabData);
    //     }
    // }
    componentDidMount() {
        const {data_source = {}} = this.props.alitaState;
        const {data = []} = data_source || {};
        let tagArray = []
        console.log('data=>',data)
        if (data !== null ) {
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < data[i].label.length; j++) {
                    tagArray.push(data[i].label[j])
                }
            }
            let tagSet = new Set(tagArray)
            tagArray = Array.from(tagSet)
            this.props.setAlitaState({
                stateName: 'play_list_name',
                data: tagArray
            })
            console.log('src1:',data_src)
            if (data_src !== null ) {
                for (let i = 0; i < data_src.length; i++) {
                    data_src.splice(i)
                    console.log('claer',data_src)
                }
            }
            console.log('src2:',data_src)
            for (let i = 0; i < tagArray.length; i++) {
                let data_item = {name: tagArray[i], data: []}
                //console.log('data',data[0])
                for (let j = 0; j < data.length; j++) {
                    if (data[j].label.includes(tagArray[i])) {
                        data_item.data.push(data[j])
                    }
                }
                data_src.push(data_item)
            }
            //console.log("返回数据(PlanList):", this.state.subTabData);
            console.log('data_Src=',data_src)
        }

    }
    render() {
        const {data_source = {}} = this.props.alitaState;
        //console.log('is data_src',data_src)
        const expandedRowRender = (record) => {
            //console.log('能出来吗崽种1')
            const columns= [
                // {
                //     title:'预览',
                //     dataIndex:'res_url',
                //     width:600,
                //     render:res_url=>(
                //         <video  src={res_url} width="320" height='240'  controls="controls" />
                //     )
                // },
                {
                    title:'标题',
                    dataIndex:'name',
                    width:150,
                },
                {
                    title:'链接',
                    dataIndex:'res_url',
                    width:150,
                    render:res_url=>(
                        <div style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>
                            <a href={res_url}>
                                {res_url}
                            </a>
                        </div>
                    ),
                    // ...this.getColumnSearchProps('url')
                }
            ]
            let tmp_data = []
            for (let i = 0;i < data_src.length;i++ ){
                tmp_data.push(data_src[i].data)
            }
            //console.log('tmp能出来吗崽种',tmp_data)

            return <Table columns={columns} dataSource={tmp_data[record.id]} pagination={{ pageSize: 10 }}/>;
        };
        const columns = [{title: '列表名称', dataIndex: 'name'}]
        //console.log('data_src能出来吗崽种',data_src)
        return(
            <div>

                <BreadcrumbCustom first="播放列表"  />
                <Table columns={columns} dataSource={data_src} expandedRowRender={(record)=>{
                    console.log('record',record)
                    const columns= [
                        // {
                        //     title:'预览',
                        //     dataIndex:'res_url',
                        //     width:600,
                        //     render:res_url=>(
                        //         <video  src={res_url} width="320" height='240'  controls="controls" />
                        //     )
                        // },
                        {
                            title:'标题',
                            dataIndex:'name',
                            width:150,
                        },
                        {
                            title:'链接',
                            dataIndex:'res_url',
                            width:150,
                            render:res_url=>(
                                <div style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>
                                    <a href={res_url}>
                                        {res_url}
                                    </a>
                                </div>
                            ),
                            // ...this.getColumnSearchProps('url')
                        }
                    ]


                    return <Table columns={columns} dataSource={record.data} pagination={{ pageSize: 10 }}/>;
                }} pagination={{ pageSize: 10 }} />
            </div>

        )

    }
}

export default connectAlita()(PlayList);