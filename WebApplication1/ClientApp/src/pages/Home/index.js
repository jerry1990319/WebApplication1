import React, { useRef, useState } from 'react';
import { Input } from 'antd';
import List from '@/components/Listbar';
import SearchForm from '@/components/SearchForm';
import { Exchange, trimSplite, keyReplace } from '@/utils/index';
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
            Allwords: e.target.value
        });
        onFinalChange(mapRef.current.form.getFieldValue());
    }
    // 对表单内的值进行监听合并 
    const onFinalChange = (allValues) => {
        const { Legal = [], Risk = [], News = [], Allwords = '', otherSelect = '', OmitWords = "" } = allValues;
        setNamekeyword(Allwords);
        // NegativeWords整合
        const other = otherSelect ? trimSplite(otherSelect).split(/\s+/g) : null;
        const allselect = other ? [...Legal, ...Risk, ...News, ...other] : [...Legal, ...Risk, ...News];
        // OmitWords整合
        const Omit = OmitWords ? trimSplite(OmitWords).split(/\s+/g) : null;
        // 给关键词加上搜索格式
        const formatKey = allselect && allselect.length > 0 ? `(${keyReplace(allselect)})` : "";
        setTimeout(() => {
            mapRef.current.form.setFieldsValue({
                wd: Exchange(`${Omit ? `${formatKey} -(${keyReplace(Omit)})` : formatKey}`, false),
                NegativeWords: Exchange(allselect, false),
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
        const { rn, lm, wd, Allwords } = getFieldValue;
        // 搜索实体的集合
        const Entity = Allwords ? trimSplite(Exchange(Allwords, false)).split(/[;|；]/g) : [];
        return { Entity, rn, lm, wd }
    }
    // 点击按钮显示页面（单个）
    const onSearchClick = (url, key) => {
        const allKeys = onSearchKeys();
        const { Entity, rn, lm, wd } = allKeys;
        Entity.forEach(element => {
            if (key === "国家網站") {
                const govkey = `"${element}" ${wd} site:gov.cn &rn=${rn}&lm=${lm}`;
                window.open(`${url}?wd=${govkey}`);
            }
            else if (key === "启信宝" || key === "天眼查" || key === "企查查") {
                window.open(`${url}?key=${element}`);
            }
            else {
                const baidukey = `"${element}" ${wd}&rn=${rn}&lm=${lm}`;
                window.open(`${url}?wd=${baidukey}`);
            }
        })
    }
    // 点击Search打开五个页面（多个）
    const Searchbtn = () => {
        const allKeys = onSearchKeys();
        const { Entity, rn, lm, wd } = allKeys;
        Entity.forEach((element) => {
            const govkey = `"${element}" ${wd} site:gov.cn &rn=${rn}&lm=${lm}`;
            const baidukey = `"${element}" ${wd}&rn=${rn}&lm=${lm}`;
            // 天眼查
            window.open(`https://www.tianyancha.com/search?key=${element}`);
            // 启信宝
            window.open(`https://www.qixin.com/search?key=${element}`);
            // 企查查
            window.open(`https://www.qcc.com/search?key=${element}`);
            // 百度
            window.open(`https://www.baidu.com/s?wd=${baidukey}`);
            // 国家网站
            window.open(`https://www.baidu.com/s?wd=${govkey}`);
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