import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import './index.less';

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    onChangeVal = async (e) => {
        await sessionStorage.setItem('val', e.target.value);
        window.location.href = '/list';
    }
    Callback = () => {
        window.location.href = '/';
    }
    render() {
        const { isShow } = this.props;
        return (
            <div className="header">
                <h1>西湖一号纹样搜索系统</h1>
                {
                    isShow ? <span onClick={this.Callback}>首页</span> : null
                }
                {
                    isShow ? (<Input
                        prefix={<SearchOutlined className="site-form-item-icon" />}
                        placeholder={sessionStorage.getItem('val')}
                        onPressEnter={this.onChangeVal}
                        defaultValue={sessionStorage.getItem('val')}
                    />) : null
                }
            </div>
        )
    }
}
export default Header;
