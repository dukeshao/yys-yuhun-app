import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

let attrsEnumObj = {
    Attack: { name: "攻击", rate: 1, follow: "" },
    AttackRate: { name: "攻击加成", rate: 100, follow: "%" },
    Speed: { name: "速度", rate: 1, follow: "" },
    Hp: { name: "生命", rate: 1, follow: "" },
    HpRate: { name: "生命加成", rate: 100, follow: "%" },
    Defense: { name: "防御", rate: 1, follow: "" },
    DefenseRate: { name: "防御加成", rate: 100, follow: "%" },
    CritPower: { name: "暴击伤害", rate: 100, follow: "%" },
    EffectHitRate: { name: "效果命中", rate: 100, follow: "%" },
    EffectResistRate: { name: "效果抵抗", rate: 100, follow: "%" },
    CritRate: { name: "暴击", rate: 100, follow: "%" },
}

let typeObj = {
    '300002': '雪幽魂',
    '300003': '地藏像',
    '300004': '蝠翼',
    '300006': '涅槃之火',
    '300007': '三味',
    '300008': '魍魉之匣',
    '300009': '被服',
    '300010': '招财猫',
    '300011': '反枕',
    '300012': '轮入道',
    '300013': '日女巳时',
    '300014': '镜姬',
    '300015': '钟灵',
    '300018': '狰',
    '300019': '火灵',
    '300020': '鸣屋',
    '300021': '薙魂',
    '300022': '心眼',
    '300023': '木魅',
    '300024': '树妖',
    '300026': '网切',
    '300027': '阴摩罗',
    '300029': '伤魂鸟',
    '300030': '破势',
    '300031': '镇墓兽',
    '300032': '珍珠',
    '300033': '骰子鬼',
    '300034': '蚌精',
    '300035': '魅妖',
    '300036': '针女',
    '300039': '返魂香',
    '300048': '狂骨',
    '300049': '幽谷响',
    '300050': '土蜘蛛',
    '300051': '胧车',
    '300052': '荒骷髅',
    '300053': '地震鲶',
    '300054': '蜃气楼',
    '300073': '飞缘魔',
    '300074': '兵主部',
    '300075': '青女房',
    '300076': '涂佛',
    '300077': '鬼灵歌伎'
}

let posArr = ["一号位", "二号位", "三号位", "四号位", "五号位", "六号位"]

function unix_to_datetime(unix) {
    var now = new Date(parseInt(unix) * 1000);
    return now.toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}

class Prehome extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            timeStamp: "",
            fileName: "未选择文件",
            hero_equips: "",
            player: {},
            lists: []
        }
        this.onFileChange = this.onFileChange.bind(this)

    }

    onFileChange() {
        let _this = this;
        // console.log(this.refs.uploader.files);
        // 获取input标签选择的文件,并选择第一条
        let resultFile = this.refs.uploader.files[0]
        // 如果文件存在
        if (resultFile) {
            // 使用 FileReader 来读取文件
            let reader = new FileReader()

            // 读取纯文本文件,且编码格式为 utf-8
            reader.readAsText(resultFile, 'UTF-8')

            // 读取文件,会触发 onload 异步事件,可使用回调函数 来获取最终的值.
            reader.onload = function (e) {
                //获取文件内容
                let fileContent = e.target.result
                //格式化 JSON 字符串
                let res = JSON.parse(fileContent);

                let player = res.data.player;

                let fileDate = new Date(res.timestamp);
                let timeStamp = fileDate.toLocaleDateString() + fileDate.toLocaleTimeString();

                let lists = res.data.hero_equips.filter(m => m.level === 15);
                lists.sort((a, b) => {
                    return b.born - a.born
                })

                _this.setState({
                    player,
                    timeStamp,
                    lists,
                    fileName: player.name + "(" + timeStamp + ")"
                })

                // console.log(res)
            }
        }
    }

    render() {
        return (
            <>
                <Form>
                    <div className="mb-3 mt">
                        <Form.File id="formcheck-api-custom" custom >
                            <Form.File.Input isValid onChange={this.onFileChange} ref="uploader" />
                            <Form.File.Label data-browse="选择">
                                {this.state.fileName}
                            </Form.File.Label>
                        </Form.File>
                    </div>
                </Form>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>时间</th>
                            <th>类型</th>
                            <th>位置</th>
                            <th>主属性</th>
                            <th>副属性</th>
                            <th>副属性</th>
                            <th>副属性</th>
                            <th>副属性</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.lists.map((m, i) => {
                            return (<tr key={i}>
                                <td>{i + 1}</td>
                                <td>{unix_to_datetime(m.born)}</td>
                                <td>{typeObj[m.suit_id]}</td>
                                <td>{posArr[m.pos]}</td>
                                <td>
                                    <p>{attrsEnumObj[m.base_attr.type]["name"]}</p>
                                    <p>{(m.base_attr.value * attrsEnumObj[m.base_attr.type]["rate"]).toFixed(2) + attrsEnumObj[m.base_attr.type]["follow"]}</p>
                                </td>
                                {m.attrs.map((t, idx) => {
                                    return (
                                        <td key={idx}>
                                            <p>{attrsEnumObj[t.type]["name"]}</p>
                                            <p>{(t.value * attrsEnumObj[t.type]["rate"]).toFixed(2) + attrsEnumObj[t.type]["follow"]}</p>
                                        </td>
                                    )
                                })}
                            </tr>)
                        })}

                    </tbody>
                </Table>
            </>
        )
    }
}

export default Prehome;