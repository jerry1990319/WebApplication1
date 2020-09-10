import React from 'react';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

class List extends React.Component {
    state = {
        actived: false
    }

    searchClick = (url, key, index) => {
        if (this.props.searchClick) {
            this.props.searchClick(url, key)
        }
        this.setState({
            actived: index
        })

    }
    onChangeShow = () => {
        if (this.props.onChangeShow) {
            this.props.onChangeShow()
        }
    }
    render() {
        const { searchData = [] } = this.props;
        const { actived } = this.state;
        // tabindex={index}
        return (
            <div className="search-bar">
                <ul>
                    {
                        searchData.map((item, index) => {
                            return (
                                <li key={item.key}>
                                    <div className='bar-bck' onClick={() => { this.searchClick(item.url, item.key, index) }}>
                                        <img src={item.icon} />
                                        <p className="icon-text">{item.key}</p>
                                    </div>
                                </li>
                            )
                        })
                    }


                </ul>
                <div className="on-off">
                    <span className="parentheses-left" />
                    {/* <span className="text">{this.props.text}</span> */}
                    <DownOutlined className="on-off-icon" />
                    {/* {
                        this.props.text && this.props.text === 'Expand' ? (<DownOutlined className="on-off-icon" />) : <UpOutlined className="on-off-icon2" />
                    } */}
                    <span className="parentheses-right" />
                </div>
            </div>
        )
    }
}
export default List;
