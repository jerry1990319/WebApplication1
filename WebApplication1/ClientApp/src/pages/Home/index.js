import React, { useRef, useState } from 'react';
import { Input } from 'antd';
import List from '@/components/Listbar';
import SearchForm from '@/components/SearchForm';
import { Exchange } from '@/utils/index';
import { searchData, resultPage, resultTime } from '@/utils/configText';
import gov from '@/assets/images/gov.png';
import './index.less';
const { Search } = Input;
const Home = () => {
    const mapRef = useRef();
    // 仅用于search
    const [nameKeyword, setNamekeyword] = useState('');
    // 多余38个字符出提示
    const [error, setError] = useState(false);
    // 表单是否展开
    const [show, setShow] = useState(false);
    const [text, setText] = useState('Expand');
    // 输入框取值替换表单内的namestring
    const onFocus = (e) => {
        setNamekeyword(e.target.value);

        mapRef.current.form.setFieldsValue({
            otherwords: e.target.value
        });
        onFinalChange(mapRef.current.form.getFieldValue());
    }
    // 对表单内的值进行监听合并 
    const onFinalChange = (allValues) => {
        let all = '';
        const { Legal = [], Risk = [], Words = [], otherwords = '', otherkeywords = '', OmitWords = "" } = allValues;
        const otherk = otherkeywords.replace(/\s+/g, " ");
        const otherW = otherwords.replace(/\s+/g, " ");
        const OmitWordVal = OmitWords.replace(/\s+/g, " ");
        setNamekeyword(otherW);
        // const otherkey = otherk && otherW ? `${otherW} ${otherk}` : (otherk == "" ? otherW : otherk);
        const otherkey = otherk;
        const selectKeys = [...Legal, ...Risk, ...Words];
        const allselect = selectKeys.length > 0 ? selectKeys.join(" ") : [];
        const allKeys = otherkey && allselect.length > 0 ? `${allselect} ${otherkey}` : `${allselect}${otherkey}`;
        const arr = allKeys ? new String(Exchange(allKeys, false)).split(" ") : [];
        const Omit = OmitWordVal ? new String(Exchange(OmitWordVal, false)).split(" ") : [];
        const keyname = arr.length > 0 && Omit.length > 0 ? `(${arr.join(" | ")}) -(${Omit.join(" | ")}) ` : (arr.length > 0 ? `(${arr.join(" | ")})` : (Omit.length > 0 ? `-(${Omit.join("|")}) ` : ""));
        // if (otherW === '') {
        //     all = keyname;
        // }
        // else {
        //     all = `“${otherW}” ${keyname}`;
        // }
        all = keyname
        const keyer = all.length > 35 ? all.substring(0, 35) : all;
        setError(all.length > 35 ? true : false);
        setTimeout(() => {
            mapRef.current.form.setFieldsValue({
                wd: `${Exchange(keyer, false)}`
            })
        }, 0);
    }
    // 监听表单值的变化
    const onValuesChange = (changedValues, allValues) => {
        onFinalChange(allValues);
    }
    // 对搜索值字符限制的最后处理
    const onSearchKeys = () => {
        const getFieldValue = mapRef.current.form.getFieldValue();
        const { rn, lm, wd, otherwords } = getFieldValue;
        const key = otherwords ? otherwords.replace(/\s+/g, " ") : '';
        const keyword = Exchange(key, false);
        // const Searchkey = keyword.split('；' || ';');
        const Searchkey = keyword.split(/[\n\s+;|；]/g);
        
        // 
        return { Searchkey, rn, lm, wd }
    }
    // 点击按钮显示页面（单个）
    const onSearchClick = (url, key) => {
        const allKeys = onSearchKeys();
        const { Searchkey, rn, lm, wd } = allKeys;
        Searchkey.forEach(element => {
            if (key === "国家網站") {
                const govkey = `"${element}" ${wd}`;
                const govSearch = govkey && govkey.length > 37 ? govkey.substring(0, 28) : (govkey === undefined ? '' : govkey);
                window.open(`${url}?wd=${Exchange(govSearch, false)} site:gov.cn &rn=${rn}&lm=${lm}`);
            }
            else if (key === "启信宝" || key === "天眼查" || key === "企查查") {
                window.open(`${url}?key=${Exchange(element, false)}`);
            }
            else {
                const baidukey = `"${element}" ${wd}`;
                const baidu = baidukey && baidukey.length > 37 ? baidukey.substring(0, 38) : (baidukey === undefined ? '' : baidukey);
                window.open(`${url}?wd=${Exchange(baidu, false)}&rn=${rn}&lm=${lm}`);
            }
        })
    }
    // 点击Search打开五个页面（多个）
    const Searchbtn = () => {
        const allKeys = onSearchKeys();
        const { Searchkey, rn, lm, wd } = allKeys;
        Searchkey.forEach((element, index) => {
            console.log('element', element);
            const key = `"${element}" ${wd}`;
            const govSearch = key && key.length > 37 ? key.substring(0, 28) : (key === undefined ? '' : key);
            const baidu = key && key.length > 37 ? key.substring(0, 38) : (key === undefined ? '' : key);
            // 天眼查
            window.open(`https://www.tianyancha.com/search?key=${element}`);
            // 启信宝
            window.open(`https://www.qixin.com/search?key=${element}`);
            // 企查查
            window.open(`https://www.qcc.com/search?key=${element}`);
            // 百度
            window.open(`https://www.baidu.com/s?wd=${Exchange(baidu, false)}&rn=${rn}&lm=${lm}`);
            // 国家网站
            window.open(`https://www.baidu.com/s?wd=${Exchange(govSearch, false)} site:gov.cn &rn=${rn}&lm=${lm}`);
        });
    }
    // 重置
    const onReset = () => {
        mapRef.current.form.resetFields();
        setNamekeyword();
        setError(false)
    }
    // Quick Link（国家企信）
    const SearchGov = () => {
        window.open('http://www.gsxt.gov.cn/index.html');
    }
    // 展开隐藏
    const onISshow = () => {
        setShow(show === true ? false : true);
        setText(text === 'Collapse' ? 'Expand' : 'Collapse');
    }
    return (
        <div className="container">
            <div className="wrapper">
                <div className="search">
                    <Search
                        placeholder="input search text"
                        enterButton="Search"
                        size="large"
                        className="search-input"
                        onChange={e => onFocus(e)}
                        onSearch={Searchbtn}
                        value={nameKeyword}
                    />
                </div>
                <List
                    searchData={searchData}
                    searchClick={onSearchClick}
                    onChangeShow={onISshow}
                    text={text}
                    show={show}
                />
                <SearchForm
                    resultPage={resultPage}
                    resultTime={resultTime}
                    ref={mapRef}
                    onReset={onReset}
                    error={error}
                    show={show}
                    onChangeSearch={onSearchClick}
                    onValuesChange={onValuesChange}
                />
                <div className={show === true ? "footer" : "footer fotter-position"}>
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