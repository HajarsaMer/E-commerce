import React, { useCallback, useMemo, useState } from 'react'
import Text from './Text'

export default function Memory() {
  let [counter, setCounter] = useState(0)

  let name = useMemo(() => { return { fName: 'mayar' } }, [])
  let [notes, setNotes] = useState(['not1'])

  function increase() {
    setCounter(counter => counter + 1)
  }

  let addNote = useCallback(() => { setNotes([...notes, 'new note']) }, [notes])
  return (
    <div className='container'>Memory
      <h1>counter:{counter}</h1>
      <button onClick={increase}>+</button>
      <Text name={name} notes={notes} addNote={addNote} />
    </div>
  )
}
