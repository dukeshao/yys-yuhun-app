import React from "react";
import Alert from 'react-bootstrap/Alert';

import "./home.scss";

let msg = "";
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowAlert: false,
            fileName: ""
        }
        this.changeAlertShow = this.changeAlertShow.bind(this)
        this.onFileChange = this.onFileChange.bind(this)
        this.getAttrs = this.getAttrs.bind(this)
        this.goList = this.goList.bind(this)
    }

    changeAlertShow() {
        let _this = this;
        if (this.state.isShowAlert === false) {
            this.setState({ isShowAlert: true });
            setTimeout(function () {
                _this.setState({ isShowAlert: false });
            }, 1000)
        } else {
            return;
        }
    }

    onFileChange() {
        let _this = this;
        // 获取input标签选择的文件,并选择第一条
        let resultFile = this.refs.uploader.files[0];
        this.setState({
            fileName: resultFile.name.slice(0, -5)
        })
        console.log(resultFile.name.slice(0, -5));
        // 如果文件存在
        if (resultFile) {
            // 使用 FileReader 来读取文件
            let reader = new FileReader();

            // 读取纯文本文件,且编码格式为 utf-8
            reader.readAsText(resultFile, 'UTF-8');

            // 读取文件,会触发 onload 异步事件,可使用回调函数 来获取最终的值.
            reader.onload = function (e) {
                //获取文件内容
                let fileContent = e.target.result
                //格式化 JSON 字符串
                let res = JSON.parse(fileContent);
                res.shift();
                _this.getAttrs(res)
                console.log(res)
            }
        }
    }

    getAttrs(arr) {
        // let obj = {
        //     "御魂ID": "5e625e8cfaea704a6bdf6fd5",
        //     "御魂类型": "狂骨",
        //     "位置": 2,
        //     "御魂等级": 15,
        //     "御魂星级": 6,
        //     "速度": 62.41273748874664,
        //     "暴击伤害": 0.10911993980407715,
        //     "暴击": 0.024606823325157165,
        //     "攻击加成": 0.05343937039375305
        // }
        let atts = [];
        arr.forEach(m => {
            if (atts.includes(m["御魂类型"])) {

            } else {
                atts.push(m["御魂类型"])
            }
        })
        console.log("atts=>", atts);
        this.saveData(arr);
    }

    saveData(data) {
        let _this = this;
        let indexedDB = window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
        if (!indexedDB) {
            msg = "你的浏览器不支持IndexedDB";
            this.changeAlertShow();
        } else {
            let timestamp = new Date().getTime();
            let request = indexedDB.open("yuhun", timestamp);
            let fileName = this.state.fileName;

            //数据库版本升级时 || 首次打开
            request.onupgradeneeded = function (e) {
                let db = e.target.result;
                if (!db.objectStoreNames.contains(fileName)) {
                    console.log("我需要创建一个新的存储对象");
                    //如果表格不存在，创建一个新的表格（keyPath，主键 ； autoIncrement,是否自增），会返回一个对象（objectStore）
                    let objectStore = db.createObjectStore(fileName, {
                        keyPath: "御魂ID",
                        autoIncrement: false
                    })

                    //指定可以被索引的字段，unique字段是否唯一
                    objectStore.createIndex("御魂ID", "御魂ID", {
                        unique: true
                    })

                    //批量添加数据
                    let totleLen = data.length;
                    let startNum = 0;
                    addObjToDB();
                    function addObjToDB() {
                        if (startNum < totleLen) {
                            objectStore.add(data[startNum]).onsuccess = addObjToDB;
                            ++startNum;
                        } else {
                            _this.goTo("/list");
                        }
                    }

                } else {
                    _this.changeAlertShow();
                    _this.goTo("/list");
                    return;
                }
                console.log('数据库版本更改为:' + timestamp);
            }
        }
    }

    goTo(path) {
        this.props.history.push(path);
    }

    goList() {
        this.props.history.push("/list");
    }

    render() {
        return (
            <div className="choose-box">
                <Alert variant="info" show={this.state.isShowAlert}>{msg}</Alert>

                <ul className="border-box">
                    <li>
                        导入新文件
                        <input type="file" className="file-input" onChange={this.onFileChange} ref="uploader" />
                    </li>
                    <li onClick={this.goList}>直接进入</li>
                </ul>
                {/* <div>选择新文件</div>
                <div>直接进入</div> */}
            </div>
        )
    }
}

export default Home;