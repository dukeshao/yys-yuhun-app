import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Item from "./item";
import FilterHeader from "../../components/filter_header/filter_header";
import Footer from "../../components/footer/footer";
import "./list.scss";

function List() {
    let [dataList, setData] = useState([]);
    let history = useHistory();
    //进入页面逻辑
    useEffect(() => {
        let indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
        if (!indexedDB) {
            console.log("你的浏览器不支持IndexedDB")
        } else {
            let request = indexedDB.open("yuhun");
            request.onsuccess = function (e) {
                //获取所有表名称
                let objectStoreList = request.result.objectStoreNames;
                //默认选中第0个表
                let selectedOS = objectStoreList[0];

                //已打开的数据库
                let db = e.target.result;
                //使用读写权限连接指定表
                let transaction = db.transaction([selectedOS], "readwrite");
                //获取指定表对象
                let store = transaction.objectStore(selectedOS);
                //获取表所有数据
                var allRecords = store.getAll();
                //获取数据成功 触发回调
                allRecords.onsuccess = function () {
                    setData(allRecords.result);
                }
            }
        }
    }, []);

    //datalist 变化时逻辑
    useEffect(() => {
        if (dataList.length) {
            let obj = {};
            dataList.forEach((m, i) => {
                Object.keys(m).forEach((t, idx) => {
                    if (!obj[t]) {
                        obj[t] = true;
                    }
                })
            })
        }
    }, [dataList])

    function goto(path) {
        if (history.location.pathname === path) {
            return false;
        }
        history.push(path);
    }

    return (
        <div className="list_page">
            {/* <div className="list_header">御魂列表</div> */}
            <FilterHeader onClick={() => { goto('/home') }}></FilterHeader>
            <div className="list_body">
                <ul>
                    {dataList.map((m, i) => {
                        // if (i < dataList.length && m["御魂星级"] === 6) {
                        if (i < 15 && m["御魂星级"] === 6) {
                            return (<Item obj={m} idx={i} key={m["御魂ID"]}></Item>)
                        } else {
                            return false;
                        }
                    })}
                </ul>
            </div>
            {/* <ul className="list_footer">
                <li onClick={() => { goto('/home') }}>首页</li>
                <li onClick={() => { goto('/list') }}>列表页</li>
            </ul> */}
            <Footer></Footer>
        </div>
    )
}

export default List;