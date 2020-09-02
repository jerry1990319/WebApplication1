import React, { useRef, useState } from 'react';
import { Input, ConfigProvider } from 'antd';
import List from '@/components/Listbar';
import SearchForm from '@/components/SearchForm';
import { Exchange } from '@/utils/index';
import qx from '@/assets/images/qx.jpg';
import baidu from '@/assets/images/baidu.png';
import gov from '@/assets/images/gov.png';
import qcc from '@/assets/images/qcc.jpg';
// import change from '@/assets/images/fj.png';
import tyc from '@/assets/images/tyc.jpg';
import './index.less';
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

const Home = () => {
    const mapRef = useRef();
    const [locale, setlocale] = useState(false);
    const [nameKeyword, setNamekeyword] = useState('');
    const [error, setError] = useState(false)
    const onSearchClick = (url, key) => {
        mapRef.current.form.setFieldsValue({
            wd: nameKeyword
        });
        const getFieldValue = mapRef.current.form.getFieldValue();
        const { rn, lm, Legal = [], Risk = [], Words = [], otherwords = '', otherkeywords = '', wd, OmitWords = "" } = getFieldValue;
        const otherk = otherkeywords.replace(/\s+/g, " ");
        const otherW = otherwords.replace(/\s+/g, " ");
        const otherkey = otherk && otherW ? `${otherW} ${otherk}` : (otherk == "" ? otherW : otherk);
        const name = Exchange(wd, locale);
        const selectKeys = [...Legal, ...Risk, ...Words];
        const allselect = selectKeys.length > 0 ? selectKeys.join(" ") : [];
        const allKeys = otherkey && allselect.length > 0 ? `${allselect} ${otherkey}` : `${allselect}${otherkey}`;
        const arr = allKeys ? new String(Exchange(allKeys, locale)).split(" ") : [];
        const Omit = OmitWords ? new String(Exchange(OmitWords, locale)).split(" ") : [];
        const keyname = arr.length > 0 && Omit.length > 0 ? `(${arr.join(" | ")}) -(${Omit.join(" | ")}) ` : (arr.length > 0 ? `(${arr.join(" | ")})` : (Omit.length > 0 ? `-(${Omit.join("|")}) ` : ""));
        setNamekeyword(Exchange(nameKeyword, locale));
        const a = `“${name}” ${keyname}`;
        const keyer = a.length > 38 ? a.substring(0, 30) : a;
        mapRef.current.form.setFieldsValue({
            wd: name,
            otherwords: Exchange(otherwords, locale),
            otherkeywords: Exchange(otherkeywords, locale),
            // SYS:keyer
        });
        if (key === "国家網站") {

            window.open(`${url}?wd=${keyer} site:gov.cn &rn=${rn}&lm=${lm}`);
        }
        else if (key === "启信宝" || key === "天眼查" || key === "企查查") {
            window.open(`${url}?key=${name}`);
        } else if (url === 'confirm') {
        
            mapRef.current.form.setFieldsValue({
                wd: keyer
            });
            setError(a.length>38?true:false)
        }
        else {
            window.open(`${url}?wd=${keyer}&rn=${rn}&lm=${lm}`);
        }
    }
    const onChange = (e) => {
        const keyword = ['被判', '贪污', '案情', '犯罪'];
        setNamekeyword(e.target.value)
        if (e.target.value.trim()) {
            mapRef.current.form.setFieldsValue({
                wd: e.target.value,
                keywords: keyword.join(" ")
            })

        } else {
            mapRef.current.form.setFieldsValue({
                wd: e.target.value,
                keywords: ""
            })
        }
    }
    const onReset = () => {
        mapRef.current.form.resetFields();
        setNamekeyword();
    }
    const onChangeSearchel = (val) => {
        console.log(val)
        // alert(val)
        setNamekeyword(Exchange(val, locale))
    }
    const onPressEnter = () => {
        window.open(`https://www.baidu.com/s?wd=${nameKeyword}`);
    }
    const SearchGov = () => {
        window.open('http://www.gsxt.gov.cn/index.html');

    }
    console.log('error1', error)

    return (

        <div className="container">
            <div className="wrapper">
                {/* <h1 className="title">Search Engine</h1> */}
                <Input className="search-input" onChange={e => onChange(e)} value={nameKeyword} onPressEnter={onPressEnter} />
                <List
                    searchData={searchData}
                    searchClick={onSearchClick}
                />
                <SearchForm
                    resultPage={resultPage}
                    resultTime={resultTime}
                    ref={mapRef}
                    onReset={onReset}
                    error={error}
                    onChangeSearch={onSearchClick}
                    // onConfirm={onConfirm}
                    onSearchel={onChangeSearchel}
                />
                <div className="footer">

                    <div className="gov-qx" onClick={SearchGov}>
                        <h1>Quick Link</h1>
                        <div className="gov-hover">
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