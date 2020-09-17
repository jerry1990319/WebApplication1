import React from 'react';
import Curlybraces from '@/assets/images/Curlybraces.png';
class List extends React.Component {
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
                    <img src={Curlybraces} className="Curlybraces" onClick={this.onChangeShow}/>
                    {/* <div className="Curlybraces"></div> */}
                    {/* <span className="parentheses-left"  onClick={this.onChangeShow}/>
                    <span className="text">{this.props.text}</span>
                    <DownOutlined className="on-off-icon"  onClick={this.onChangeShow}/>
                    {
                        this.props.text && this.props.text === 'Expand' ? (<DownOutlined className="on-off-icon" />) : <UpOutlined className="on-off-icon2" />
                    }
                    <span className="parentheses-right"  onClick={this.onChangeShow}/> */}
                </div>
            </div>
        )
    }
}
export default List;
