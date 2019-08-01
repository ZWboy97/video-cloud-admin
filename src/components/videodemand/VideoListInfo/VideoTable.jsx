import {Button, Row, Col, Modal, Card, Form,Select,Input,Icon,Table} from 'antd';
import React, {Component} from "react";
import {connectAlita} from 'redux-alita';
import Highlighter from 'react-highlight-words';

const dataSource = [
    {
        key:1,
        preview:{
            hd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
            },
            sd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
            }},
        name: '测试用名1',
        tag:'测试',
        url:{
            hd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
            },
            sd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
            }},

    },
    {
        key:2,
        preview:{
            hd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
            },
            sd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
            }},
        name: '测试用名2',
        tag:'测试',
        url:{
            hd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
            },
            sd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
            }},

    },
    {
        key:3,
        preview:{
            hd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
            },
            sd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
            }},
        name: '测试用名3',
        tag:'测试',
        url:{
            hd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
            },
            sd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
            }},

    },
    {
        key:4,
        preview:{
            hd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
            },
            sd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
            }},
        name: '测试用名4',
        tag:'测试',
        url:{
            hd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
            },
            sd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
            }},

    },
    {
        key:5,
        preview:{
            hd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
            },
            sd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
            }},
        name: '测试用名5',
        tag:'测试',
        url:{
            hd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
            },
            sd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
            }},

    },
    {
        key:6,
        preview:{
            hd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
            },
            sd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
            }},
        name: '测试用名6',
        tag:'测试',
        url:{
            hd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
            },
            sd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
            }},

    },
    {
        key:7,
        preview:{
            hd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
            },
            sd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
            }},
        name: '测试用名7',
        tag:'测试',
        url:{
            hd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
            },
            sd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
            }},

    },
    {
        key:8,
        preview:{
            hd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
            },
            sd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
            }},
        name: '测试用名8',
        tag:'测试',
        url:{
            hd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
            },
            sd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
            }},

    },    {
        key:9,
        preview:{
            hd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
            },
            sd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
            }},
        name: '测试用名9',
        tag:'测试',
        url:{
            hd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
            },
            sd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
            }},

    },    {
        key:10,
        preview:{
            hd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
            },
            sd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
            }},
        name: '测试用名10',
        tag:'测试',
        url:{
            hd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
            },
            sd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
            }},

    },    {
        key:11,
        preview:{
            hd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
            },
            sd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
            }},
        name: '测试用名11',
        tag:'tag',
        url:{
            hd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_hd.mp4',
            },
            sd: {
                play_url: 'https://zhstatic.zhihu.com/cfe/griffith/zhihu2018_sd.mp4',
            }},

    },


]

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },

};


class VideoTable extends Component {
    state = {
        searchText: '',
    };
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
                    Search
                </Button>
                <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                    Reset
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
        const columns = [
            {
                title:'预览',
                dataIndex:'preview',
                width:600,
                render:preview=>(
                    <video src={preview.hd.play_url} width="320"  controls="controls" />
                )
            },
            {
                title:'名称',
                dataIndex:'name',
            ...this.getColumnSearchProps('name'),

            },
            {
                title:'标签',
                dataIndex:'tag',
                ...this.getColumnSearchProps('tag'),

            },
            {
                title:'链接',
                dataIndex:'url',
                width:150,
                render:url=>(
                    <div style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>
                        <a href={url.hd.play_url}>
                            {url.hd.play_url}
                        </a>
                    </div>
                ),
                // ...this.getColumnSearchProps('url')
            }
        ]
        return (
            <div>
                <Card>
                    <Table  columns={columns} dataSource={dataSource} rowSelection={rowSelection} pagination={{ pageSize: 10 }}/>,
                </Card>
            </div>
        )
    }

}

export default connectAlita()(Form.create()(VideoTable));