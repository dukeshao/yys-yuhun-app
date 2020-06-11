import React from 'react';
import "./item.scss";
function Item(props) {
    /******************* 基本数据定义 ************************/
    let attrsSetting = {
        "攻击": { rate: 1, follow: "" },
        "攻击加成": { rate: 100, follow: "%" },
        "速度": { rate: 1, follow: "" },
        "生命": { rate: 1, follow: "" },
        "生命加成": { rate: 100, follow: "%" },
        "防御": { rate: 1, follow: "" },
        "防御加成": { rate: 100, follow: "%" },
        "暴击伤害": { rate: 100, follow: "%" },
        "效果命中": { rate: 100, follow: "%" },
        "效果抵抗": { rate: 100, follow: "%" },
        "暴击": { rate: 100, follow: "%" }
    }
    //6星满级主属性最大值
    let maxObj = {
        "攻击": 486,
        "攻击加成": 0.55,
        "速度": 57,
        "生命": 2052,
        "生命加成": 0.55,
        "防御": 104,
        "防御加成": 0.55,
        "暴击伤害": 0.89,
        "效果命中": 0.55,
        "效果抵抗": 0.55,
        "暴击": 0.55
    }
    //首领御魂固定属性
    let fixAttr = {
        "攻击加成": 0.08,
        "生命加成": 0.08,
        "防御加成": 0.16,
        "效果命中": 0.08,
        "效果抵抗": 0.08,
        "暴击": 0.08
    }
    //御魂 icon
    let yuhunObj = {
        "针女": "zhennv",
        "蚌精": "bangjing",
        "破势": "poshi",
        "狂骨": "kuanggu",
        "胧车": "longche",
        "魍魉之匣": "wangliangzhijia",
        "招财猫": "zhaocaimao",
        "轮入道": "lunrudao",
        "涅槃之火": "niepanzhihuo",
        "木魅": "mumei",
        "土蜘蛛": "tuzhizhu",
        "荒骷髅": "huangkulou",
        "地震鲶": "dizhennian",
        "蜃气楼": "shenqilou",
        "鬼灵歌伎": "guilinggeji",
        "骰子鬼": "saizigui",
        "返魂香": "fanhunxiang",
        "幽谷响": "youguxiang",
        "飞缘魔": "feiyuanmo",
        "火灵": "huoling",
        "珍珠": "zhenzhu",
        "魅妖": "meiyao",
        "雪幽魂": "xueyouhun",
        "阴摩罗": "yinmoluo",
        "心眼": "xinyan",
        "鸣屋": "mingwu",
        "狰": "zheng",
        "伤魂鸟": "shanghunniao",
        "镇墓兽": "zhenmushou",
        "兵主部": "bingzhubu",
        "蝠翼": "fuyi",
        "网切": "wangqie",
        "三味": "sanwei",
        "青女房": "qingnvfang",
        "树妖": "shuyao",
        "被服": "beifu",
        "镜姬": "jingji",
        "钟灵": "zhongling",
        "薙魂": "tihun",
        "反枕": "fanzhen",
        "日女巳时": "rinvsishi",
        "涂佛": "tufo",
        "地藏像": "dizangxiang",
    }
    //御魂位置
    let posArr = [null, "one", "two", "three", "four", "five", "six"]


    /******************* 数据处理 ************************/
    //切割copy出 props 中 obj 的御魂属性对象
    let obj = props.obj;
    let attrObj = Object.assign({}, obj);
    delete (attrObj["御魂ID"]);
    delete (attrObj["御魂类型"]);
    delete (attrObj["位置"]);
    delete (attrObj["御魂等级"]);
    delete (attrObj["御魂星级"]);

    //将御魂属性格式化为二维数组 方便渲染html
    let formatArr = [];
    let keys = Object.keys(attrObj);
    let mainProp = keys.filter(m => attrObj[m] >= maxObj[m])[0];//判断主属性类型
    let mainValue = maxObj[mainProp];
    formatArr.push([mainProp, mainValue]);

    //处理固有属性
    let isBossYuHun = keys.find(m => m === "固有属性");
    let fixArr = [];
    if (isBossYuHun) {
        let val = attrObj["固有属性"];
        fixArr = [val, fixAttr[val]];
        delete (attrObj["固有属性"]);
        if (attrObj[val] > fixAttr[val]) {
            attrObj[val] = attrObj[val] - fixAttr[val];
        } else {
            delete (attrObj[val]);
        }
    }

    //处理副属性
    Object.keys(attrObj).forEach((m, i) => {
        if (m === mainProp) {
            if (attrObj[mainProp] > mainValue) {
                formatArr.push([m, attrObj[m] - mainValue]);
            } else if (attrObj[mainProp] < mainValue) {
                formatArr.push([m, attrObj[m]]);
            }
        } else {
            formatArr.push([m, attrObj[m]]);
        }
    })
    //最后推入固有属性
    if (isBossYuHun) {
        formatArr.push(fixArr);
    }

    return (
        <li className="item-li">
            <div className="top">
                <span className={yuhunObj[obj["御魂类型"]] + " " + posArr[obj["位置"]]}></span>
                <span>{obj["御魂类型"]}</span>
            </div>
            <div className="bottom">
                {
                    formatArr.map((m, i) => {
                        let short = 2;
                        if (i === 0 || i === 5) {
                            short = 0;
                        }
                        return (
                            <p key={m + i}>{m[0]}:{(attrsSetting[m[0]]["rate"] * m[1]).toFixed(short) + attrsSetting[m[0]]["follow"]}</p>
                        )
                    })
                }
            </div>
        </li>
    )
}
export default Item;