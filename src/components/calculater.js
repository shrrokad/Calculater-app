import React, { useEffect, useRef, useState } from 'react'
import './style.css'

const Calculater = () => {
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const operators = ["-", "+", "*", "/"];
    const arryvalue = ['=']

    const [numvalue, setNumvalue] = useState("");
    const [Result, setResult] = useState("");

    const stateRef = useRef(numvalue);
    const resultRef = useRef(Result);
    // console.log(stateRef);

    // console.log(numvalue, '----->numvalue');


    const keypress = (e) => {
        handleKeyPress(e.keyCode, e.key)
    }

    const updatevalue = (value) => {
        if (!arryvalue.includes(value)) {
            setNumvalue(numvalue + value)
        }
    }

    const updatevalueoprater = (value) => {
        let newopratore;

        if (!arryvalue.includes(value)) {
            if (!numvalue) return
            const lastChar = numvalue.slice(-1);
            if (!Number(lastChar)) {
                newopratore = numvalue.slice(0, -1)
                setNumvalue(newopratore + value)
            }
            if (operators.includes(lastChar)) return;
            setNumvalue(numvalue + value)
        }
    }

    const fineldata = (value) => {
        if (arryvalue == value) {
            const lastChar = numvalue.slice(-1);
            if (operators.includes(lastChar)) return;
            calculateResult(numvalue)
        }
    }

    const calculateResult = (exp) => {
        if (!exp) {
            setResult("")
            return
        }
        const lastChar = exp.slice(-1);
        // if (!numbers.includes(lastChar)) exp = exp.slice(0, -1);

        const answer = eval(exp) + "";
        setResult(eval(answer));
    };

    const deletevalue = () => {
        setResult(numvalue.slice(0, -1))
        setNumvalue(numvalue.slice(0, -1))
    }
    const clearvalue = () => {
        setNumvalue('')
        setResult('')
    }

    const handleKeyPress = (keyCode, key) => {
        let newopratore;
        if (numbers.includes(key)) {
            if (key === "0") {
                if (stateRef.current.length === 0) return;
            }
            setNumvalue((numvalue) => numvalue + key);
        } else if (operators.includes(key)) {
            if (!stateRef.current) return;

            const lastChar = stateRef.current.slice(-1);
            if (!Number(lastChar)) {
                newopratore = stateRef.current.slice(0, -1)
                setNumvalue(newopratore + key)
            } else{
                if (operators.includes(lastChar)) return
                if (lastChar === ".") return;
                setNumvalue((numvalue) => numvalue + key);
            }

        } else if (key === ".") {
            if (!stateRef.current) return;
            const lastChar = stateRef.current.slice(-1);
            if (!numbers.includes(lastChar)) return;

            setNumvalue((numvalue) => numvalue + key);
        } else if (keyCode === 8) {
            if (!stateRef.current) return;
            setNumvalue((numvalue) => numvalue.slice(0, -1));
        } else if (keyCode === 13) {
            if (!stateRef.current) return;

            const lastChar = stateRef.current.slice(-1);
            if (operators.includes(lastChar)) return;
            calculateResult(stateRef.current);
        }
    }

    useEffect(() => {
        document.addEventListener('keyup', keypress)
    }, [])

    useEffect(() => {
        fineldata(arryvalue)
    }, [numvalue])

    useEffect(() => {
        stateRef.current = numvalue;
        resultRef.current = Result;
    }, [numvalue])


    return (
        <div>
            <div className="container d-flex justify-content-center" style={{ marginTop: '5%' }}>
                <div className='background-colore'>
                    <form className='calculater '>
                        <div className='value row' value={numvalue} >
                            <p>{numvalue}</p>
                            <p>{Result}</p>
                        </div>
                        <div className='row align'>
                            <span className='num clear1 col-2 ' onClick={() => deletevalue("Backspace")}>Delet</span>
                            <span className='num clear col-2' onClick={() => clearvalue("")}>c</span>
                            <span className='num col-2' onClick={() => updatevalueoprater("/")}>/</span>
                            <span className='num col-2' onClick={() => updatevalueoprater("*")}>*</span>
                            <span className='num col-2' onClick={() => updatevalue("7")}>7</span>
                            <span className='num col-2' onClick={() => updatevalue("8")}>8</span>
                            <span className='num col-2' onClick={() => updatevalue("9")}>9</span>
                            <span className='num col-2' onClick={() => updatevalueoprater("-")}>-</span>
                            <span className='num col-2' onClick={() => updatevalue("4")}>4</span>
                            <span className='num col-2' onClick={() => updatevalue("5")}>5</span>
                            <span className='num col-2' onClick={() => updatevalue("6")}>6</span>
                            <span className='num plus col-2' onClick={() => updatevalueoprater("+")}>+</span>
                            <span className='num col-2' onClick={() => updatevalue("1")}>1</span>
                            <span className='num col-2' onClick={() => updatevalue("2")}>2</span>
                            <span className='num col-2' onClick={() => updatevalue("3")}>3</span>
                            <span className='num col-2' onClick={() => updatevalue("0")}>0</span>
                            <span className='num zero col-2' onClick={() => updatevalueoprater(".")}>.</span>
                            <span className='num col-2' onClick={() => fineldata("=")}>=</span>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Calculater
