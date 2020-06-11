import React, { useState } from "react";
import './test.scss';
function Test() {
    let initCount = 0;
    const [count, setCount] = useState(initCount);
    function add(n) {
        return setCount(prev => prev + n);
    }
    return (
        <>
            <p>Count:{count}</p>
            <p>
                <button onClick={() => setCount(initCount)}>重置</button>
            </p>
            <p>
                <button onClick={() => { add(1) }}>增加</button>
            </p>
            <p>
                <button onClick={() => setCount(count - 1)}>减少</button>
            </p>
        </>
    )
}

export default Test;