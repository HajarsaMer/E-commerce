import React, { useMemo, useState } from 'react'

export default function Parent() {

    //memoization 
    //use memo  ===> fun return value, {} , [] ==> cashed value 
    //use callback ==> fun ==> cashed fn
    //memo ==> com

    let [counter, setCounter] = useState(0)
    let [notes, setNotes] = useState(['not1'])


    let val = useMemo(() => { return calc(counter) }, [counter])

    function addNote() {
        setNotes([...notes, 'new note'])
    }

    function increase() {
        setCounter(counter => counter + 1)
    }

    function calc(num) {
        console.log('render calc');
        for (let i = 0; i < 1000000000; i++) {
            num += 1
        }
        return num
    }


    return (
        <div className='container'>
            <h1>val{val}</h1>
            <h1>counter:{counter}</h1>
            <button onClick={increase}>+</button>
            <hr />

            <button onClick={addNote}>+add note</button>
            <ul>
                {notes.map(ele => <li>{ele}</li>)}
            </ul>

            <hr />

        </div>
    )
}
