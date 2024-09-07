import React, { memo } from 'react'

function Text({name,notes,addNote}) {
  console.log('render text');

  return (
    <div>Text {name.fName}
    <hr />
    <button onClick={addNote}>+add note</button>
    <ul>
        {notes.map(ele => <li>{ele}</li>)}
    </ul>

    <hr />
    </div>
  )
}

export default memo(Text)
