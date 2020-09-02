import React from 'react';
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
                                <li key={item.key}  onClick={() => { this.searchClick(item.url, item.key, index) }}>
                                    {/* <div className='bar-bck'> */}
                                        <img src={item.icon} />
                                        <p className="icon-text">{item.key}</p>
                                    {/* </div> */}
                                </li>
                            )
                        })
                    }


                </ul>
                <div className="background"></div>
            </div>
        )
    }
}
export default List;
