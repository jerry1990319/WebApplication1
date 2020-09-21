import React from 'react';
import on from '@/assets/images/on.png';
import off from '@/assets/images/off.png';
class List extends React.Component {
    searchClick = (url, key, index) => {
        if (this.props.searchClick) {
            this.props.searchClick(url, key)
        }

    }
    onChangeShow = () => {
        if (this.props.onChangeShow) {
            this.props.onChangeShow()
        }
    }
    render() {
        const { searchData = [] ,show} = this.props;
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
                    <img src={this.props.show === true ? on : off} className="Curlybraces" onClick={this.onChangeShow} />
                </div>
            </div>
        )
    }
}
export default List;
