import React, { useRef, useState } from 'react';
import { Input, ConfigProvider, Button } from 'antd';
import List from '@/components/Listbar';
import SearchForm from '@/components/SearchForm';
import { Exchange } from '@/utils/index';
import qx from '@/assets/images/qx.png';
import baidu from '@/assets/images/baidu.png';
import gov from '@/assets/images/gov.png';
import qcc from '@/assets/images/qcc.png';
// import change from '@/assets/images/fj.png';
import tyc from '@/assets/images/tyc.png';
import './index.less';
const { Search } = Input;
const searchData = [
    {
        icon: tyc,
        key: '天眼查',
        url: 'https://www.tianyancha.com/search'
    },

    {
        icon: qx,
        key: '启信宝',
        url: 'https://www.qixin.com/search'
    },
    {
        icon: qcc,
        key: '企查查',
        url: 'https://www.qcc.com/search'
    },
    {
        icon: baidu,
        key: '百度',
        url: 'https://www.baidu.com/s'
    },
    {
        icon: gov,
        key: '国家網站',
        url: 'https://www.baidu.com/s'
    },
]
const resultPage = [
    {
        cord: 10,
        name: 'Baidu default - 10'
    },
    {
        cord: 30,
        name: '30 results'
    },
    {
        cord: 50,
        name: '50 results'
    }
];
const resultTime = [
    {
        cord: '',
        name: 'Whenever'
    },
    {
        cord: 1,
        name: 'Last Day (24h)'
    },
    {
        cord: 7,
        name: 'Last Week'
    },
    {
        cord: 30,
        name: 'Last Month'
    },
    {
        cord: 365,
        name: 'Last Year'
    }
];
// let searchkey = '';
const Home = () => {
    const mapRef = useRef();
    const [locale, setlocale] = useState(false);
    const [nameKeyword, setNamekeyword] = useState('');
    const [error, setError] = useState(false);
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Expand')
    const onSearchClick = (url, key) => {
        if (mapRef.current) {
            const getFieldValue = mapRef.current.form.getFieldValue();
            const { rn, lm, wd } = getFieldValue;
            if (key === "国家網站") {
                const govSearch = wd && wd.length > 37 ? wd.substring(0, 28) : wd;
                console.log('govSearch', govSearch);
                window.open(`${url}?wd=${govSearch} site:gov.cn &rn=${rn}&lm=${lm}`);
            }
            else if (key === "启信宝" || key === "天眼查" || key === "企查查") {
                window.open(`${url}?key=${nameKeyword}`);
            }
            else {
                const baidu = wd && wd.length > 37 ? wd.substring(0, 38) : wd;
                window.open(`${url}?wd=${baidu}&rn=${rn}&lm=${lm}`);
            }
        } else {
            if (key === "国家網站") {
                window.open(`${url}?wd=${nameKeyword} site:gov.cn`);
            }
            else if (key === "启信宝" || key === "天眼查" || key === "企查查") {
                window.open(`${url}?key=${nameKeyword}`);
            }
            else {
                window.open(`${url}?wd=${nameKeyword}`);
            }
        }
    }
    const onChange = (e) => {
        setNamekeyword(e.target.value);
        if (mapRef.current) {
            mapRef.current.form.setFieldsValue({
                names: e.target.value
            })
            onFinalChange(mapRef.current.form.getFieldValue(), e.target.value)
        }
        console.log('mapRef.current.form', mapRef.current)

    }
    const onReset = () => {
        mapRef.current.form.resetFields();
        setNamekeyword();
    }
    const onChangeSearchel = (val) => {

        setNamekeyword(Exchange(val, locale))
    }
    const onPressEnter = () => {
        window.open(`https://www.baidu.com/s?wd=${nameKeyword}`);
    }
    const SearchGov = () => {
        window.open('http://www.gsxt.gov.cn/index.html');

    }
    const onFinalChange = function (allValues, name) {
        console.log('yyyyyyyyyyyyyyyyyyyyyyy', allValues)
        const { Legal = [], Risk = [], Words = [], otherwords = '', otherkeywords = '', names = '', OmitWords = "" } = allValues;
        const otherk = otherkeywords.replace(/\s+/g, " ");
        const otherW = otherwords.replace(/\s+/g, " ");
        const otherkey = otherk && otherW ? `${otherW} ${otherk}` : (otherk == "" ? otherW : otherk);
        const selectKeys = [...Legal, ...Risk, ...Words];
        const allselect = selectKeys.length > 0 ? selectKeys.join(" ") : [];
        const allKeys = otherkey && allselect.length > 0 ? `${allselect} ${otherkey}` : `${allselect}${otherkey}`;
        const arr = allKeys ? new String(Exchange(allKeys, locale)).split(" ") : [];
        const Omit = OmitWords ? new String(Exchange(OmitWords, locale)).split(" ") : [];
        const keyname = arr.length > 0 && Omit.length > 0 ? `(${arr.join(" | ")}) -(${Omit.join(" | ")}) ` : (arr.length > 0 ? `(${arr.join(" | ")})` : (Omit.length > 0 ? `-(${Omit.join("|")}) ` : ""));
        // searchkey = keyname;
        let all = `“${name === undefined ? nameKeyword : name}” ${keyname}`;
        if (nameKeyword === '' || name === '') {
            all = keyname;
        }
        const keyer = all.length > 38 ? all.substring(0, 38) : all;
        console.log('arr', keyname, keyer);
        setError(all.length > 38 ? true : false)
        setTimeout(() => {
            mapRef.current.form.setFieldsValue({
                wd: `${keyer}`
            })
        }, 0);

    }
    const onValuesChange = (changedValues, allValues) => {
        onFinalChange(allValues);
        // setError(a.length > 38 ? true : false)
    }
    const onISshow = () => {
        setShow(show === true ? false : true);
        setText(text === 'Collapse' ? 'Expand' : 'Collapse');
        // if (mapRef.current) {
        //    console.log('mapRef.current',mapRef.current)
        //     // mapRef.current.form.setFieldsValue({
        //     //     names:nameKeyword
        //     // })
        //     // onFinalChange(mapRef.current.form.getFieldValue(), nameKeyword)
        // }
    }
    const Searchbtn = async () => {
        if (mapRef.current) {
            const getFieldValue = mapRef.current.form.getFieldValue();
            const { rn, lm, wd } = getFieldValue;
            const govSearch = wd.length > 37 ? wd.substring(0, 28) : wd;
            const baidu = wd.length > 37 ? wd.substring(0, 38) : wd;
            // 天眼查
            window.open(`https://www.tianyancha.com/search?key=${nameKeyword}`, 'tyc');
            // 启信宝
            window.open(`https://www.qixin.com/search/search?key=${nameKeyword}`, 'qxb');
            // 企查查
            window.open(`https://www.qcc.com/search?key=${nameKeyword}`, 'qcc');
            // 百度
            window.open(`https://www.baidu.com/s?wd=${baidu}&rn=${rn}&lm=${lm}`, 'baidu');
            // 国家网站
            window.open(`https://www.baidu.com/s?wd=${govSearch} site:gov.cn &rn=${rn}&lm=${lm}`, 'gov');
        } else {
            onlyKey(nameKeyword)
        }
    }
    const onlyKey = (nameKeyword) => {
        // 天眼查
        window.open(`https://www.tianyancha.com/search?key=${nameKeyword}`, 'tyc');
        // 启信宝
        window.open(`https://www.qixin.com/search/search?key=${nameKeyword}`, 'qxb');
        // 企查查
        window.open(`https://www.qcc.com/search?key=${nameKeyword}`, 'qcc');
        // 百度
        window.open(`https://www.baidu.com/s?wd=${nameKeyword}`, 'baidu');
        // 国家网站
        window.open(`https://www.baidu.com/s?wd=${nameKeyword} site:gov.cn`, 'gov');
    }
    return (

        <div className="container">
            <div className="wrapper">
                {/* <Button onClick={onISshow} type="primary">Show</Button> */}
                <div className="search">
                    <Search
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                        className="search-input"
                        onChange={e => onChange(e)}
                        onSearch={Searchbtn}
                    />
                </div>

                <List
                    searchData={searchData}
                    searchClick={onSearchClick}
                    onChangeShow={onISshow}
                    text={text}
                />
                {
                    show === true ? (
                        <SearchForm
                            resultPage={resultPage}
                            resultTime={resultTime}
                            ref={mapRef}
                            onReset={onReset}
                            error={error}
                            onChangeSearch={onSearchClick}
                            onValuesChange={onValuesChange}
                            onSearchel={onChangeSearchel}
                        />
                    ) : null
                }

                <div className="footer">

                    <div className="gov-qx">
                        <h1>Quick Link</h1>
                        <div className="gov-hover" onClick={SearchGov}>
                            <img src={gov} />
                            <p>国家企信</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;