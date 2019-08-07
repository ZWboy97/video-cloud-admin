import {Button, Card, Input,Icon,Table} from 'antd';
import React, {Component} from "react";
import {connectAlita} from 'redux-alita';
import Highlighter from 'react-highlight-words';
import {TESTJYLAPI} from'../../../axios/api'




class VideoTable extends Component {
    state = {
        searchText: '',
        data:[]
    };
    componentWillMount(){
        TESTJYLAPI.get('com/test/resourses/').then(res=>{
            console.log('res',res)
            this.setState({data:res.data.data})
            this.props.setAlitaState({
                stateName:'data_source',
                data:res.data.data
            })
        })
    }
    getColumnSearchProps = dataIndex => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    搜索
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    重置
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: text => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    });

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    };

    handleReset = clearFilters => {
        clearFilters();
        this.setState({ searchText: '' });
    };

    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                const info = {
                    selectedRowKeys:selectedRowKeys,
                    selectedRows:selectedRows
                }
                this.props.setAlitaState({
                    stateName: 'rowSelectedInfo',
                    data: info
                })


            },

        };
        const columns = [
            {
                title:'预览',
                dataIndex:'res_url',
                width:600,
                render:res_url=>(
                    <video  src={res_url} width="320" height='240'  controls="controls" />
                )
            },
            {
                title:'标题',
                dataIndex:'name',
                width:150,
                ...this.getColumnSearchProps('name'),

            },
            {
                title:'所属列表',
                dataIndex:'label',
                ...this.getColumnSearchProps('label'),

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
        const {data_source = {}} = this.props.alitaState;
        const {data =[]} = data_source || {};
        console.log('src',data)
        console.log('source',data_source)
        return (
            <div>
                <Card>
                    <Table  columns={columns} dataSource={data} rowSelection={rowSelection} pagination={{ pageSize: 10 }}/>,
                </Card>
            </div>
        )
    }

}

export default connectAlita()(VideoTable);