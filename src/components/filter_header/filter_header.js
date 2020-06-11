import React from 'react';
import "./filter_header.scss";
function FilterHeader() {

    return (
        <div className="filter_header">
            <ul>
                <li>
                    <div>类型</div>
                </li>
                <li>
                    <div>位置</div>
                </li>
                <li>
                    <div>属性</div>
                </li>
            </ul>
        </div>
    )
}
export default FilterHeader;